// Mock data for projects until Supabase is properly connected
// This will be used as fallback data for development and demo purposes

export const mockProjects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Plataforma completa de e-commerce com React, Node.js e PostgreSQL. Sistema de pagamentos integrado, gestão de inventário em tempo real, painel administrativo completo com analytics e relatórios detalhados.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'JWT', 'Express'],
    demoLink: 'https://ecommerce-demo-thiago.vercel.app',
    githubLink: 'https://github.com/ThiagoBDias/ecommerce-platform',
    category: 'Full Stack',
    featured: true,
    publishedAt: '2024-03-15T10:00:00Z',
    status: 'published'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Aplicação moderna de gerenciamento de tarefas com Vue.js e Firebase. Inclui colaboração em tempo real, notificações push, integração com calendário e sistema de prioridades avançado.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS', 'Vuex', 'PWA', 'Push Notifications'],
    demoLink: 'https://taskmanager-thiago.vercel.app',
    githubLink: 'https://github.com/ThiagoBDias/task-manager',
    category: 'Frontend',
    featured: true,
    publishedAt: '2024-02-20T14:30:00Z',
    status: 'published'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Dashboard interativo e responsivo de clima com JavaScript vanilla. Inclui previsões detalhadas, mapas interativos, dados históricos e alertas meteorológicos personalizados.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
    technologies: ['JavaScript', 'Chart.js', 'OpenWeather API', 'CSS3', 'LocalStorage', 'Service Worker'],
    demoLink: 'https://weather-dashboard-thiago.vercel.app',
    githubLink: 'https://github.com/ThiagoBDias/weather-dashboard',
    category: 'Frontend',
    featured: false,
    publishedAt: '2024-01-10T09:15:00Z',
    status: 'published'
  },
  {
    id: 4,
    title: 'Learning Management System',
    description: 'Sistema completo de gestão de aprendizagem com Next.js, MongoDB e Prisma. Inclui cursos online, progresso de alunos, certificados digitais e sistema de avaliações.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    technologies: ['Next.js', 'MongoDB', 'Prisma', 'Stripe', 'Tailwind CSS', 'NextAuth.js'],
    demoLink: 'https://lms-thiago.vercel.app',
    githubLink: 'https://github.com/ThiagoBDias/lms-platform',
    category: 'Full Stack',
    featured: true,
    publishedAt: '2024-04-05T16:45:00Z',
    status: 'published'
  },
  {
    id: 5,
    title: 'Real-time Chat App',
    description: 'Aplicação de chat em tempo real com React e Socket.io. Recursos incluem salas privadas, emojis personalizados, compartilhamento de arquivos e criptografia end-to-end.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop',
    technologies: ['React', 'Socket.io', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
    demoLink: 'https://chat-thiago.vercel.app',
    githubLink: 'https://github.com/ThiagoBDias/realtime-chat',
    category: 'Full Stack',
    featured: false,
    publishedAt: '2024-01-25T11:20:00Z',
    status: 'published'
  },
  {
    id: 6,
    title: 'Analytics Dashboard',
    description: 'Dashboard avançado de analytics com React, D3.js e Python FastAPI. Visualizações de dados interativas, relatórios automáticos, exportação em múltiplos formatos e AI insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'],
    demoLink: 'https://analytics-thiago.vercel.app',
    githubLink: 'https://github.com/ThiagoBDias/analytics-dashboard',
    category: 'Full Stack',
    featured: false,
    publishedAt: '2024-02-10T13:10:00Z',
    status: 'published'
  },
  {
    id: 7,
    title: 'Portfolio Website Generator',
    description: 'Gerador automático de portfólios com Astro e Tailwind CSS. Interface drag-and-drop, templates personalizáveis, otimização SEO automática e deploy com um clique.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    technologies: ['Astro', 'Tailwind CSS', 'TypeScript', 'Vercel', 'GitHub API'],
    demoLink: 'https://portfolio-generator-thiago.vercel.app',
    githubLink: 'https://github.com/ThiagoBDias/portfolio-generator',
    category: 'Frontend',
    featured: false,
    publishedAt: '2024-03-01T08:30:00Z',
    status: 'published'
  },
  {
    id: 8,
    title: 'AI Content Generator',
    description: 'Plataforma de geração de conteúdo com IA usando OpenAI GPT-4. Interface intuitiva, templates personalizados, histórico de gerações e integração com redes sociais.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    technologies: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Stripe'],
    demoLink: 'https://ai-content-thiago.vercel.app',
    githubLink: 'https://github.com/ThiagoBDias/ai-content-generator',
    category: 'Full Stack',
    featured: false,
    publishedAt: '2024-04-20T15:00:00Z',
    status: 'published'
  }
];

// Helper functions to work with mock data
export function getAllPublishedProjectsMock() {
  return mockProjects
    .filter(project => project.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedProjectsMock(limit = 3) {
  return mockProjects
    .filter(project => project.status === 'published' && project.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getProjectByIdMock(id) {
  return mockProjects.find(project => project.id === parseInt(id)) || null;
}

export function getProjectsByCategory(category) {
  return mockProjects
    .filter(project => project.status === 'published' && project.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}