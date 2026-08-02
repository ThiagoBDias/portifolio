export const siteConfig = {
  name: "Thiago Dias",

  role: "Desenvolvedor Backend C#/.NET",

  title: "Thiago Dias | Desenvolvedor Backend C#/.NET",

  description:
    "Desenvolvedor Backend com foco em C#, .NET, APIs REST e SQL, aplicando boas práticas de arquitetura para construir soluções confiáveis.",

  author: "Thiago Dias",

  url: "https://www.thiagodias.dev",

  image: "/og-image.png",

  locale: "pt_BR",

  keywords: [
    "C#",
    ".NET",
    "ASP.NET Core",
    "Backend",
    "API REST",
    "SQL",
    "SQL Server",
    "Entity Framework Core",
    "Sankhya ERP"
  ],

  social: {
    github: "https://github.com/ThiagoBDias",
    linkedin: "https://www.linkedin.com/in/thiago-batista-dias/"
  }
} as const;

/**
 * Alias mantido para consumo simplificado
 * em componentes e layouts.
 */
export const site = siteConfig;