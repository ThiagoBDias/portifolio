/**
 * Configurações do Portfolio GitHub Integration
 * Personalize essas configurações para seu perfil
 */

export const PORTFOLIO_CONFIG = {
  // Configurações do GitHub
  github: {
    username: 'ThiagoBDias', // ⚠️ ALTERE PARA SEU USERNAME
    
    // Repositórios que devem ser ignorados (mesmo se públicos)
    excludeRepos: [
      'ThiagoBDias', // Repo README do perfil
      'dotfiles',    // Arquivos de configuração
      'learning',    // Repositórios de estudo
      'test',        // Repositórios de teste
      'template'     // Templates
    ],
    
    // Keywords que tornam um projeto "destacado"
    featuredKeywords: [
      'portfolio', 'website', 'app', 'platform', 
      'dashboard', 'system', 'api', 'fullstack'
    ],
    
    // Número mínimo de commits para considerar um projeto relevante
    minCommits: 3,
    
    // Projetos são considerados "recentes" se atualizados nos últimos X dias
    recentDays: 90
  },

  // Mapeamento personalizado de tecnologias
  techMapping: {
    // Linguagens de programação
    'JavaScript': { name: 'JavaScript', color: '#f7df1e' },
    'TypeScript': { name: 'TypeScript', color: '#3178c6' },
    'Python': { name: 'Python', color: '#3776ab' },
    'Java': { name: 'Java', color: '#ed8b00' },
    'C#': { name: 'C#', color: '#239120' },
    'PHP': { name: 'PHP', color: '#777bb4' },
    'Go': { name: 'Go', color: '#00add8' },
    'Rust': { name: 'Rust', color: '#000000' },
    'Swift': { name: 'Swift', color: '#fa7343' },
    'Kotlin': { name: 'Kotlin', color: '#7f52ff' },
    
    // Frameworks e bibliotecas (baseado em tópicos/keywords)
    'react': { name: 'React', color: '#61dafb' },
    'nextjs': { name: 'Next.js', color: '#000000' },
    'vuejs': { name: 'Vue.js', color: '#4fc08d' },
    'angular': { name: 'Angular', color: '#dd0031' },
    'svelte': { name: 'Svelte', color: '#ff3e00' },
    'nodejs': { name: 'Node.js', color: '#339933' },
    'express': { name: 'Express.js', color: '#000000' },
    'django': { name: 'Django', color: '#092e20' },
    'flask': { name: 'Flask', color: '#000000' },
    'fastapi': { name: 'FastAPI', color: '#009688' },
    
    // Bancos de dados
    'mongodb': { name: 'MongoDB', color: '#47a248' },
    'postgresql': { name: 'PostgreSQL', color: '#336791' },
    'mysql': { name: 'MySQL', color: '#4479a1' },
    'sqlite': { name: 'SQLite', color: '#003b57' },
    
    // Ferramentas e serviços
    'docker': { name: 'Docker', color: '#2496ed' },
    'kubernetes': { name: 'Kubernetes', color: '#326ce5' },
    'aws': { name: 'AWS', color: '#ff9900' },
    'vercel': { name: 'Vercel', color: '#000000' },
    'netlify': { name: 'Netlify', color: '#00c7b7' },
    'firebase': { name: 'Firebase', color: '#ffca28' },
    'supabase': { name: 'Supabase', color: '#3ecf8e' }
  },

  // Regras para categorização automática
  categoryRules: {
    'Mobile': {
      languages: ['Swift', 'Kotlin', 'Dart'],
      topics: ['android', 'ios', 'flutter', 'react-native', 'mobile', 'ionic']
    },
    'Full Stack': {
      // Projetos que têm tanto frontend quanto backend
      requiresBoth: {
        frontend: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Vue', 'Angular'],
        backend: ['Python', 'Node.js', 'Java', 'C#', 'PHP', 'Go', 'Ruby']
      }
    },
    'Frontend': {
      languages: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
      topics: ['frontend', 'react', 'vue', 'angular', 'svelte', 'website', 'ui', 'css']
    },
    'Backend': {
      languages: ['Python', 'Java', 'C#', 'PHP', 'Go', 'Rust', 'Ruby'],
      topics: ['backend', 'api', 'server', 'database', 'microservices']
    },
    'DevOps': {
      topics: ['docker', 'kubernetes', 'ci-cd', 'deployment', 'infrastructure', 'aws', 'gcp', 'azure']
    },
    'Data Science': {
      languages: ['Python', 'R', 'Julia'],
      topics: ['machine-learning', 'data-science', 'ai', 'analytics', 'jupyter', 'tensorflow', 'pytorch']
    },
    'Game Development': {
      languages: ['C#', 'C++', 'JavaScript'],
      topics: ['game', 'unity', 'unreal', 'godot', 'gamedev']
    }
  },

  // Configurações de exibição
  display: {
    // Número máximo de tecnologias a mostrar por projeto
    maxTechnologies: 6,
    
    // Tamanho máximo da descrição (em caracteres)
    maxDescriptionLength: 150,
    
    // Número de projetos destacados na página inicial
    featuredProjectsCount: 3,
    
    // Número máximo de projetos por página
    projectsPerPage: 12
  },

  // URLs e links personalizados
  links: {
    // URL base para demos (se você hospeda demos em um domínio específico)
    demoBaseUrl: null, // ex: 'https://demos.seusite.com'
    
    // URL base para documentação
    docsBaseUrl: null, // ex: 'https://docs.seusite.com'
    
    // Padrões de URL para diferentes tipos de projeto
    urlPatterns: {
      // Se o repo tem um padrão específico para demos
      demo: repo => repo.homepage || `https://${repo.name}.vercel.app`,
      
      // Padrão para documentação
      docs: repo => `https://github.com/${repo.full_name}#readme`
    }
  }
};

// Função helper para obter configuração específica
export function getConfig(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], PORTFOLIO_CONFIG);
}

// Função para atualizar configuração dinamicamente
export function updateConfig(path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((obj, key) => obj[key], PORTFOLIO_CONFIG);
  target[lastKey] = value;
}