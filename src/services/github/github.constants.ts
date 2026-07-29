export const GITHUB_API_BASE_URL = 'https://api.github.com';
export const GITHUB_CACHE_FILE = '.cache/github-portfolio.json';
export const GITHUB_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const GITHUB_REPOSITORIES_LIMIT = 100;

export const TECHNOLOGY_DETAILS: Record<string, Pick<import('./github.types').Technology, 'name' | 'icon' | 'color' | 'category'>> = {
  JavaScript: { name: 'JavaScript', icon: 'JS', color: '#f7df1e', category: 'frontend' },
  TypeScript: { name: 'TypeScript', icon: 'TS', color: '#3178c6', category: 'frontend' },
  HTML: { name: 'HTML5', icon: 'HTML', color: '#e34f26', category: 'frontend' },
  CSS: { name: 'CSS3', icon: 'CSS', color: '#1572b6', category: 'frontend' },
  Python: { name: 'Python', icon: 'PY', color: '#3776ab', category: 'backend' },
  Java: { name: 'Java', icon: 'J', color: '#ed8b00', category: 'backend' },
  'C#': { name: 'C#', icon: 'C#', color: '#239120', category: 'backend' },
  PHP: { name: 'PHP', icon: 'PHP', color: '#777bb4', category: 'backend' },
  Go: { name: 'Go', icon: 'GO', color: '#00add8', category: 'backend' },
  Rust: { name: 'Rust', icon: 'RS', color: '#ce422b', category: 'backend' },
  Shell: { name: 'Shell Script', icon: 'SH', color: '#89e051', category: 'devops' },
  Dockerfile: { name: 'Docker', icon: 'D', color: '#2496ed', category: 'devops' }
};
