/**
 * GitHub Integration for Portfolio
 * Automatically fetches repositories from GitHub and converts them to project format
 */

import { PORTFOLIO_CONFIG } from './portfolio-config.js';

const GITHUB_USERNAME = PORTFOLIO_CONFIG.github.username;
const GITHUB_API_BASE = 'https://api.github.com';

// Cache simples para evitar rate limiting
let repositoriesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Mapping de linguagens para tecnologias mais amigáveis (usando config)
const TECH_MAPPING = Object.keys(PORTFOLIO_CONFIG.techMapping).reduce((acc, key) => {
  acc[key] = PORTFOLIO_CONFIG.techMapping[key].name;
  return acc;
}, {});

// Função melhorada para determinar categoria
function determineCategory(languages, topics, repoName) {
  const rules = PORTFOLIO_CONFIG.categoryRules;
  
  // Verifica cada categoria nas regras
  for (const [category, rule] of Object.entries(rules)) {
    if (rule.requiresBoth) {
      // Para Full Stack, precisa ter tanto frontend quanto backend
      const hasFrontend = rule.requiresBoth.frontend.some(tech => 
        languages.includes(tech) || topics.includes(tech.toLowerCase())
      );
      const hasBackend = rule.requiresBoth.backend.some(tech => 
        languages.includes(tech) || topics.includes(tech.toLowerCase())
      );
      
      if (hasFrontend && hasBackend) return category;
    } else {
      // Verifica linguagens
      if (rule.languages?.some(lang => languages.includes(lang))) {
        return category;
      }
      
      // Verifica tópicos
      if (rule.topics?.some(topic => 
        topics.includes(topic) || 
        repoName.toLowerCase().includes(topic.toLowerCase())
      )) {
        return category;
      }
    }
  }
  
  // Categoria padrão
  return 'Outros';
}

// Busca repositórios do usuário GitHub
export async function fetchGitHubRepositories() {
  try {
    // Verifica cache
    if (repositoriesCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
      console.log('📦 Usando repositórios do cache');
      return repositoriesCache;
    }

    console.log('🔄 Buscando repositórios do GitHub...');
    
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    
    // Filtra repositórios relevantes usando configurações
    const filteredRepos = repos.filter(repo => {
      // Filtros básicos
      const basicFilters = (
        !repo.fork &&                           // Não é fork
        !repo.archived &&                       // Não está arquivado  
        repo.description &&                      // Tem descrição
        repo.size > 0 &&                        // Não está vazio
        !repo.name.includes('.github') &&       // Não é repo especial do GitHub
        repo.visibility === 'public'            // É público
      );
      
      // Filtros de configuração personalizados
      const notExcluded = !PORTFOLIO_CONFIG.github.excludeRepos.some(excludePattern => 
        repo.name.toLowerCase().includes(excludePattern.toLowerCase())
      );
      
      return basicFilters && notExcluded;
    });

    console.log(`✅ Encontrados ${filteredRepos.length} repositórios relevantes`);

    // Cache dos resultados
    repositoriesCache = filteredRepos;
    cacheTimestamp = Date.now();

    return filteredRepos;
  } catch (error) {
    console.error('❌ Erro ao buscar repositórios do GitHub:', error);
    return [];
  }
}

// Busca linguagens de um repositório específico
export async function fetchRepositoryLanguages(owner, repo) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        }
      }
    );

    if (!response.ok) return {};
    
    return await response.json();
  } catch (error) {
    console.error(`❌ Erro ao buscar linguagens do ${repo}:`, error);
    return {};
  }
}

// Converte dados do GitHub para formato do projeto (versão melhorada)
export function convertGitHubRepoToProject(repo, languages = {}, index = 0) {
  // Processa linguagens
  const languageNames = Object.keys(languages);
  const technologies = [
    ...languageNames.map(lang => TECH_MAPPING[lang] || lang),
    ...repo.topics.map(topic => TECH_MAPPING[topic]).filter(Boolean)
  ];

  // Remove duplicatas e limita conforme configuração
  const uniqueTechnologies = [...new Set(technologies)]
    .slice(0, PORTFOLIO_CONFIG.display.maxTechnologies);

  // Determina se é projeto destacado usando configuração
  const isFeatured = (
    repo.stargazers_count > 0 || 
    repo.forks_count > 0 || 
    PORTFOLIO_CONFIG.github.featuredKeywords.some(keyword => 
      repo.name.toLowerCase().includes(keyword.toLowerCase()) ||
      repo.description.toLowerCase().includes(keyword.toLowerCase())
    ) ||
    new Date(repo.updated_at) > new Date(Date.now() - PORTFOLIO_CONFIG.github.recentDays * 24 * 60 * 60 * 1000)
  );

  // Limita descrição conforme configuração
  let description = repo.description;
  if (description.length > PORTFOLIO_CONFIG.display.maxDescriptionLength) {
    description = description.substring(0, PORTFOLIO_CONFIG.display.maxDescriptionLength) + '...';
  }

  return {
    id: repo.id.toString(),
    title: repo.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    description,
    image: null, // Poderia ser implementado com OpenGraph ou screenshot service
    demoLink: repo.homepage || PORTFOLIO_CONFIG.links?.urlPatterns?.demo?.(repo) || null,
    githubLink: repo.html_url,
    downloadLink: null,
    technologies: uniqueTechnologies,
    category: determineCategory(languageNames, repo.topics, repo.name),
    featured: isFeatured,
    status: 'published',
    publishedAt: repo.created_at,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    topics: repo.topics
  };
}

// Função principal para buscar todos os projetos do GitHub
export async function getAllGitHubProjects() {
  try {
    const repositories = await fetchGitHubRepositories();
    
    if (repositories.length === 0) {
      console.log('📝 Nenhum repositório encontrado, usando dados mock');
      return [];
    }

    console.log('🔄 Convertendo repositórios para formato de projeto...');
    
    // Para cada repositório, busca as linguagens e converte
    const projects = await Promise.all(
      repositories.slice(0, 20).map(async (repo, index) => {
        const languages = await fetchRepositoryLanguages(repo.owner.login, repo.name);
        return convertGitHubRepoToProject(repo, languages, index);
      })
    );

    console.log(`✅ Convertidos ${projects.length} projetos do GitHub`);
    return projects;
    
  } catch (error) {
    console.error('❌ Erro ao buscar projetos do GitHub:', error);
    return [];
  }
}

// Busca apenas projetos em destaque do GitHub
export async function getFeaturedGitHubProjects(limit = 3) {
  const allProjects = await getAllGitHubProjects();
  
  // Ordena por relevância (stars + forks + atividade recente)
  const sortedProjects = allProjects
    .filter(project => project.featured)
    .sort((a, b) => {
      const scoreA = (a.stars || 0) + (a.forks || 0) + (new Date(a.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? 10 : 0);
      const scoreB = (b.stars || 0) + (b.forks || 0) + (new Date(b.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? 10 : 0);
      return scoreB - scoreA;
    });

  return sortedProjects.slice(0, limit);
}

// Busca projeto específico do GitHub por ID
export async function getGitHubProjectById(projectId) {
  const allProjects = await getAllGitHubProjects();
  return allProjects.find(project => project.id === projectId) || null;
}