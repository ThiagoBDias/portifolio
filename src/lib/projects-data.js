// Mock data baseado nos repositorios reais do ThiagoBDias
// Este sera usado como fallback quando a API do GitHub estiver com rate limiting

export const mockProjects = [
  {
    id: 1,
    title: "T-Control – Gestão Financeira e Produtividade",
    description: "Aplicativo desenvolvido para unificar o controle de gastos pessoais e a gestão de tarefas diárias em uma única interface, eliminando a necessidade de múltiplas planilhas. Em fase de desenvolvimento focado na otimização da arquitetura de dados e interface fluida para o usuário.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    technologies: ["Android", "C#", "Arquitetura de Banco de Dados", ".NET"],
    demoLink: null,
    githubLink: null,
    category: "Backend",
    featured: true,
    publishedAt: "2025-02-01T10:00:00Z",
    status: "published"
  },
  {
    id: 2,
    title: "Sistema ERP Sankhya",
    description: "Customizações e sustentação de ERP Sankhya. Análise de dados com SQL, automações operacionais, relatórios e integração com sistemas críticos. Experiência prática em resolução de incidentes em ambientes de alta criticidade.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["Sankhya ERP", "SQL", "JavaScript", "Análise de Dados"],
    demoLink: null,
    githubLink: null,
    category: "Backend",
    featured: true,
    publishedAt: "2024-12-01T14:30:00Z",
    status: "published"
  },
  {
    id: 3,
    title: "Analise de Dados com Power BI",
    description: "Dashboards interativos e relatórios com Power BI para análise empresarial e KPIs. Contribuindo para tomadas de decisão estratégicas com dados em tempo real e visualizações inteligentes.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["Power BI", "SQL", "DAX", "Power Query", "Data Analysis"],
    demoLink: null,
    githubLink: null,
    category: "Data Science",
    featured: true,
    publishedAt: "2024-11-15T09:00:00Z",
    status: "published"
  }
];

export function getAllPublishedProjectsMock() {
  return mockProjects;
}

export function getFeaturedProjectsMock(limit = 3) {
  return mockProjects.filter(p => p.featured).slice(0, limit);
}

export function getProjectByIdMock(id) {
  return mockProjects.find(p => p.id === parseInt(id));
}