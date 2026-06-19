import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG, hasValidSupabaseConfig } from './supabase-config.js';
import { mockProjects } from './projects-data.js';

const fallbackAboutData = {
  socialLinks: {
    email: 'thiagobatistadiasss@gmail.com',
    city: 'Patrocínio, MG',
    phone: '+55 (34) 99999-9999',
    github: 'https://github.com/ThiagoBDias',
    linkedin: 'https://linkedin.com/in/thiagobdias'
  }
};

const fallbackPosts = [
  {
    id: 'portfolio-classico',
    slug: 'portfolio-classico',
    title: 'Organizando um portfólio clássico',
    excerpt: 'Estrutura visual mais limpa, foco em projetos e narrativa profissional.',
    contentMarkdown: '# Organizando um portfólio clássico\n\nResumo da evolução do site.',
    coverImage: null,
    tags: ['portfolio', 'design', 'astro'],
    publishedAt: '2025-01-10T10:00:00Z'
  },
  {
    id: 'github-api',
    slug: 'github-api',
    title: 'Integração com GitHub no portfólio',
    excerpt: 'Como exibir projetos reais e manter o site sempre atualizado.',
    contentMarkdown: '# Integração com GitHub\n\nComo a vitrine de projetos pode ser automatizada.',
    coverImage: null,
    tags: ['github', 'api', 'portfolio'],
    publishedAt: '2025-01-20T10:00:00Z'
  }
];

function getSupabaseClient() {
  if (!hasValidSupabaseConfig()) {
    return null;
  }

  return createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
}

function normalizeRows(rows) {
  return Array.isArray(rows) ? rows : [];
}

function toPost(post) {
  return {
    ...post,
    contentMarkdown: post.contentMarkdown || '',
    excerpt: post.excerpt || '',
    tags: post.tags || []
  };
}

export async function getAboutData() {
  const client = getSupabaseClient();

  if (!client) {
    return fallbackAboutData;
  }

  const { data, error } = await client.from('about').select('*').limit(1).maybeSingle();

  if (error || !data) {
    return fallbackAboutData;
  }

  return data;
}

export async function getAllPublishedPosts() {
  const client = getSupabaseClient();

  if (!client) {
    return fallbackPosts.map(toPost);
  }

  const { data, error } = await client
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    return fallbackPosts.map(toPost);
  }

  return normalizeRows(data).map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    contentMarkdown: post.content_markdown || post.contentMarkdown || '',
    coverImage: post.cover_image || post.coverImage || null,
    tags: post.tags || [],
    publishedAt: post.published_at || post.publishedAt
  }));
}

export function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function getReadingTime(contentMarkdown) {
  const text = String(contentMarkdown || '').replace(/[#>*_`]/g, '').trim();
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

export async function getAllPublishedProjects() {
  const client = getSupabaseClient();

  if (!client) {
    return mockProjects;
  }

  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    return mockProjects;
  }

  return normalizeRows(data).map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description || '',
    image: project.image || null,
    technologies: project.technologies || [],
    demoLink: project.demo_link || project.demoLink || null,
    githubLink: project.github_link || project.githubLink || null,
    downloadLink: project.download_link || project.downloadLink || null,
    category: project.category || null,
    featured: Boolean(project.featured),
    status: project.status || 'published',
    publishedAt: project.published_at || project.publishedAt || new Date().toISOString(),
    content: project.content || ''
  }));
}

export async function getProjectById(id) {
  const projects = await getAllPublishedProjects();
  return projects.find((project) => String(project.id) === String(id)) || null;
}

export async function getRealtimeGitHubTechnologies() {
  return {
    techsByCategory: {
      frontend: [
        { name: 'JavaScript', icon: 'JS', percentage: 95, color: '#f7df1e', experience: 'expert', repos: 12 },
        { name: 'TypeScript', icon: 'TS', percentage: 88, color: '#3178c6', experience: 'advanced', repos: 8 },
        { name: 'Astro', icon: 'A', percentage: 82, color: '#ff5d01', experience: 'advanced', repos: 4 }
      ],
      backend: [
        { name: 'Node.js', icon: 'N', percentage: 86, color: '#339933', experience: 'advanced', repos: 7 },
        { name: 'Supabase', icon: 'S', percentage: 80, color: '#3ecf8e', experience: 'intermediate', repos: 5 },
        { name: 'SQL', icon: 'SQL', percentage: 84, color: '#336791', experience: 'advanced', repos: 6 }
      ],
      devops: [
        { name: 'GitHub', icon: 'GH', percentage: 92, color: '#6e7681', experience: 'expert', repos: 14 },
        { name: 'Vercel', icon: 'V', percentage: 78, color: '#000000', experience: 'intermediate', repos: 3 },
        { name: 'Docker', icon: 'D', percentage: 70, color: '#2496ed', experience: 'intermediate', repos: 2 }
      ]
    },
    metadata: {
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
      totalTechs: 9
    }
  };
}
