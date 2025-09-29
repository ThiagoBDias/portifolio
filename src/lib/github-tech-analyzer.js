/**
 * Analisador de Tecnologias GitHub em Tempo Real
 * Busca dados reais dos repositórios e calcula percentuais automaticamente
 */

// Mapeamento de tecnologias com cores e ícones
const TECH_MAPPING = {
  // Frontend
  'JavaScript': { name: 'JavaScript', category: 'frontend', color: '#f7df1e', icon: '⚡', weight: 1.2 },
  'TypeScript': { name: 'TypeScript', category: 'frontend', color: '#3178c6', icon: '🔷', weight: 1.3 },
  'HTML': { name: 'HTML5', category: 'frontend', color: '#e34f26', icon: '🌐', weight: 0.8 },
  'CSS': { name: 'CSS3', category: 'frontend', color: '#1572b6', icon: '🎨', weight: 0.9 },
  'SCSS': { name: 'Sass', category: 'frontend', color: '#cc6699', icon: '🎨', weight: 0.9 },
  'Vue': { name: 'Vue.js', category: 'frontend', color: '#4fc08d', icon: '💚', weight: 1.2 },
  'Svelte': { name: 'Svelte', category: 'frontend', color: '#ff3e00', icon: '🔥', weight: 1.1 },
  
  // Backend
  'Python': { name: 'Python', category: 'backend', color: '#3776ab', icon: '🐍', weight: 1.2 },
  'Java': { name: 'Java', category: 'backend', color: '#ed8b00', icon: '☕', weight: 1.2 },
  'C#': { name: 'C#', category: 'backend', color: '#239120', icon: '🔷', weight: 1.2 },
  'PHP': { name: 'PHP', category: 'backend', color: '#777bb4', icon: '🐘', weight: 1.1 },
  'Go': { name: 'Go', category: 'backend', color: '#00add8', icon: '🐹', weight: 1.2 },
  'Rust': { name: 'Rust', category: 'backend', color: '#ce422b', icon: '🦀', weight: 1.3 },
  'C++': { name: 'C++', category: 'backend', color: '#00599c', icon: '⚙️', weight: 1.2 },
  'C': { name: 'C', category: 'backend', color: '#a8b9cc', icon: '🔧', weight: 1.1 },
  'Ruby': { name: 'Ruby', category: 'backend', color: '#cc342d', icon: '💎', weight: 1.1 },
  
  // Mobile
  'Swift': { name: 'Swift', category: 'mobile', color: '#fa7343', icon: '📱', weight: 1.2 },
  'Kotlin': { name: 'Kotlin', category: 'mobile', color: '#7f52ff', icon: '📱', weight: 1.2 },
  'Dart': { name: 'Flutter', category: 'mobile', color: '#02569b', icon: '📱', weight: 1.3 },
  'Objective-C': { name: 'Objective-C', category: 'mobile', color: '#438eff', icon: '📱', weight: 1.0 },
  
  // DevOps e Tools
  'Shell': { name: 'Shell Script', category: 'devops', color: '#89e051', icon: '🐚', weight: 0.9 },
  'PowerShell': { name: 'PowerShell', category: 'devops', color: '#012456', icon: '💙', weight: 0.9 },
  'Dockerfile': { name: 'Docker', category: 'devops', color: '#2496ed', icon: '🐳', weight: 1.2 },
  'YAML': { name: 'YAML', category: 'devops', color: '#cb171e', icon: '⚙️', weight: 0.8 },
  'JSON': { name: 'JSON', category: 'config', color: '#000000', icon: '📄', weight: 0.7 },
  
  // Dados
  'R': { name: 'R', category: 'data', color: '#276dc3', icon: '📊', weight: 1.1 },
  'MATLAB': { name: 'MATLAB', category: 'data', color: '#e16737', icon: '📈', weight: 1.0 },
  'Jupyter Notebook': { name: 'Jupyter', category: 'data', color: '#da5b0b', icon: '📓', weight: 1.1 }
};

// Detecção de tecnologias por arquivos
const FILE_TECH_PATTERNS = {
  'package.json': ['Node.js', 'JavaScript'],
  'requirements.txt': ['Python'],
  'Dockerfile': ['Docker'],
  'docker-compose.yml': ['Docker'],
  'astro.config.mjs': ['Astro'],
  'vite.config.js': ['Vite'],
  'tailwind.config.js': ['Tailwind CSS'],
  'next.config.js': ['Next.js'],
  'nuxt.config.js': ['Nuxt.js'],
  'vue.config.js': ['Vue.js'],
  'angular.json': ['Angular'],
  'pubspec.yaml': ['Flutter'],
  'Cargo.toml': ['Rust'],
  'go.mod': ['Go'],
  'composer.json': ['PHP'],
  'pom.xml': ['Java'],
  '.csproj': ['C#'],
  'Gemfile': ['Ruby']
};

class GitHubTechAnalyzer {
  constructor(username, token = null) {
    this.username = username;
    this.token = token;
    this.baseUrl = 'https://api.github.com';
    this.cache = new Map();
    this.cacheTime = 5 * 60 * 1000; // 5 minutos
  }

  /**
   * Headers para requisições
   */
  getHeaders() {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Tech-Analyzer'
    };
    
    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }
    
    return headers;
  }

  /**
   * Buscar repositórios do usuário
   */
  async fetchRepositories() {
    const cacheKey = `repos_${this.username}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTime) {
      console.log('📦 Usando repositórios do cache');
      return cached.data;
    }

    try {
      console.log(`🔍 Buscando repositórios de ${this.username}...`);
      
      const response = await fetch(
        `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`,
        { headers: this.getHeaders() }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos = await response.json();
      
      // Filtrar repositórios relevantes
      const filteredRepos = repos.filter(repo => 
        !repo.fork && 
        !repo.archived && 
        repo.size > 0 &&
        repo.language
      );

      console.log(`✅ Encontrados ${filteredRepos.length} repositórios relevantes`);

      this.cache.set(cacheKey, {
        data: filteredRepos,
        timestamp: Date.now()
      });

      return filteredRepos;
    } catch (error) {
      console.error('❌ Erro ao buscar repositórios:', error);
      return cached?.data || [];
    }
  }

  /**
   * Analisar linguagens dos repositórios
   */
  async analyzeLanguages() {
    try {
      const repos = await this.fetchRepositories();
      
      if (!repos || repos.length === 0) {
        throw new Error('Nenhum repositório encontrado');
      }

      const languageStats = {};
      let totalBytes = 0;
      let processedRepos = 0;

      console.log('🔄 Analisando linguagens dos repositórios...');

      // Buscar estatísticas de linguagens para cada repo
      for (const repo of repos.slice(0, 20)) { // Limitar para performance
        try {
          const response = await fetch(
            `${this.baseUrl}/repos/${this.username}/${repo.name}/languages`,
            { headers: this.getHeaders() }
          );

          if (response.ok) {
            const languages = await response.json();
            processedRepos++;
            
            Object.entries(languages).forEach(([lang, bytes]) => {
              if (!languageStats[lang]) {
                languageStats[lang] = {
                  bytes: 0,
                  repos: 0
                };
              }
              languageStats[lang].bytes += bytes;
              languageStats[lang].repos += 1;
              totalBytes += bytes;
            });
          }
          
          // Pequeno delay para não sobrecarregar a API
          await new Promise(resolve => setTimeout(resolve, 50));
          
        } catch (error) {
          console.warn(`⚠️ Erro ao buscar linguagens do repo ${repo.name}:`, error);
        }
      }

      console.log(`📊 Processados ${processedRepos} repositórios`);

      // Calcular percentuais
      const technologies = Object.entries(languageStats)
        .map(([language, stats]) => {
          const percentage = totalBytes > 0 ? (stats.bytes / totalBytes) * 100 : 0;
          const techInfo = TECH_MAPPING[language] || {
            name: language,
            category: 'other',
            color: '#6b7280',
            icon: '🔧',
            weight: 1
          };

          return {
            ...techInfo,
            percentage: Math.round(percentage * 10) / 10,
            bytes: stats.bytes,
            repos: stats.repos,
            experience: this.calculateExperience(percentage, stats.repos)
          };
        })
        .filter(tech => tech.percentage > 0.5) // Filtrar tecnologias muito pequenas
        .sort((a, b) => b.percentage - a.percentage);

      console.log(`✅ Análise concluída: ${technologies.length} tecnologias encontradas`);
      
      return technologies;

    } catch (error) {
      console.error('❌ Erro na análise de linguagens:', error);
      return [];
    }
  }

  /**
   * Detectar tecnologias por arquivos
   */
  async detectTechnologiesByFiles() {
    try {
      const repos = await this.fetchRepositories();
      const detectedTechs = new Set();
      let processedRepos = 0;

      console.log('🔍 Detectando tecnologias por arquivos...');

      for (const repo of repos.slice(0, 15)) { // Limitar para performance
        try {
          const response = await fetch(
            `${this.baseUrl}/repos/${this.username}/${repo.name}/contents`,
            { headers: this.getHeaders() }
          );

          if (response.ok) {
            const contents = await response.json();
            processedRepos++;
            
            contents.forEach(file => {
              const fileName = file.name.toLowerCase();
              
              Object.entries(FILE_TECH_PATTERNS).forEach(([pattern, techs]) => {
                if (fileName === pattern.toLowerCase()) {
                  techs.forEach(tech => detectedTechs.add(tech));
                }
              });
            });
          }
          
          await new Promise(resolve => setTimeout(resolve, 50));
          
        } catch (error) {
          console.warn(`⚠️ Erro ao analisar arquivos do repo ${repo.name}:`, error);
        }
      }

      console.log(`🔧 Detectadas ${detectedTechs.size} tecnologias por arquivos`);

      return Array.from(detectedTechs).map(tech => {
        const techInfo = Object.values(TECH_MAPPING).find(t => t.name === tech) || {
          name: tech,
          category: 'tools',
          color: '#6b7280',
          icon: '🔧'
        };
        
        return {
          ...techInfo,
          detectedBy: 'files',
          percentage: 15, // Valor padrão para techs detectadas por arquivo
          repos: 1,
          experience: 'intermediate'
        };
      });

    } catch (error) {
      console.error('❌ Erro ao detectar tecnologias por arquivos:', error);
      return [];
    }
  }

  /**
   * Calcular nível de experiência
   */
  calculateExperience(percentage, repos) {
    if (percentage > 25 && repos > 4) return 'expert';
    if (percentage > 15 && repos > 2) return 'advanced';
    if (percentage > 5 && repos > 1) return 'intermediate';
    return 'beginner';
  }

  /**
   * Análise completa das tecnologias
   */
  async getCompleteTechAnalysis() {
    try {
      console.log('🚀 Iniciando análise completa de tecnologias...');
      
      const [languages, fileDetectedTechs] = await Promise.all([
        this.analyzeLanguages(),
        this.detectTechnologiesByFiles()
      ]);

      // Combinar tecnologias
      const techMap = new Map();
      
      // Adicionar linguagens (prioridade)
      languages.forEach(tech => {
        techMap.set(tech.name, {
          ...tech,
          source: 'languages'
        });
      });
      
      // Adicionar tecnologias detectadas por arquivos
      fileDetectedTechs.forEach(tech => {
        if (!techMap.has(tech.name)) {
          techMap.set(tech.name, {
            ...tech,
            source: 'files'
          });
        }
      });

      // Organizar por categoria
      const techsByCategory = {
        frontend: [],
        backend: [],
        devops: [],
        mobile: [],
        data: [],
        tools: []
      };

      Array.from(techMap.values()).forEach(tech => {
        const category = tech.category || 'tools';
        if (techsByCategory[category]) {
          techsByCategory[category].push(tech);
        }
      });

      // Ordenar por percentual dentro de cada categoria
      Object.keys(techsByCategory).forEach(category => {
        techsByCategory[category].sort((a, b) => b.percentage - a.percentage);
      });

      const result = {
        languages: languages.slice(0, 8),
        technologies: Array.from(techMap.values())
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 15),
        techsByCategory,
        metadata: {
          totalTechs: techMap.size,
          lastUpdate: new Date().toISOString(),
          source: 'github_api_realtime',
          username: this.username
        }
      };

      console.log('✅ Análise completa finalizada!', {
        totalTechs: result.technologies.length,
        categories: Object.keys(techsByCategory).filter(cat => techsByCategory[cat].length > 0).length
      });

      return result;

    } catch (error) {
      console.error('❌ Erro na análise completa:', error);
      return null;
    }
  }
}

export { GitHubTechAnalyzer, TECH_MAPPING };