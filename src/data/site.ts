export const siteConfig = {
  name: 'Thiago Dias',
  title: 'Thiago Dias | Backend C#/.NET Developer',
  description: 'Backend developer focused on C#/.NET, APIs, clean architecture and reliable systems.',
  url: 'https://thiagodias.dev',
  locale: 'pt_BR',
  language: 'pt-BR',
  author: 'Thiago Dias',
  image: '/og-image.png',
  social: {
    github: 'https://github.com/ThiagoBDias',
    linkedin: 'https://linkedin.com/in/thiago-dias'
  },
  keywords: [
    'Backend C#',
    '.NET',
    'ASP.NET Core',
    'Web API',
    'Clean Architecture',
    'SQL Server',
    'Software Architecture'
  ]
} as const;

export type SiteConfig = typeof siteConfig;
