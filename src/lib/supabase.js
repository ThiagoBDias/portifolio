// Supabase configuration for Astro build process
import { createClient } from '@supabase/supabase-js';
import { 
  getAllGitHubProjects, 
  getFeaturedGitHubProjects, 
  getGitHubProjectById 
} from './github-integration.js';

// Supabase config - These will be set as environment variables during build
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

// Create Supabase client directly
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for fetching data during build
export async function getAllPublishedPosts() {
    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .eq('status', 'published')
            .order('published_at', { ascending: false });

        if (error) {
            console.error('Error fetching published posts:', error);
            return [];
        }

        return posts.map(post => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            contentMarkdown: post.content_markdown,
            coverImage: post.cover_image,
            tags: post.tags || [],
            publishedAt: post.published_at,
            createdAt: post.created_at
        }));
    } catch (error) {
        console.error('Error fetching published posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug) {
    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'published')
            .single();

        if (error || !posts) {
            return null;
        }

        return {
            id: posts.id,
            title: posts.title,
            slug: posts.slug,
            excerpt: posts.excerpt,
            contentMarkdown: posts.content_markdown,
            coverImage: posts.cover_image,
            tags: posts.tags || [],
            publishedAt: posts.published_at,
            createdAt: posts.created_at
        };
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        return null;
    }
}

export async function getAllPostSlugs() {
    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select('slug')
            .eq('status', 'published');

        if (error) {
            console.error('Error fetching post slugs:', error);
            return [];
        }

        return posts.map(post => post.slug).filter(Boolean);
    } catch (error) {
        console.error('Error fetching post slugs:', error);
        return [];
    }
}

// Helper function to format dates
export function formatDate(timestamp) {
    if (!timestamp) return 'Data não disponível';

    const date = new Date(timestamp);

    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Helper function to get reading time estimate
export function getReadingTime(content) {
    if (!content) return '0 min';

    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    return `${minutes} min`;
}

// About Page Management Functions
export async function getAboutData() {
    try {
        const { data: about, error } = await supabase
            .from('settings')
            .select('*')
            .eq('key', 'about')
            .single();

        if (error || !about) {
            // Return default data if no document exists
            return {
                bio: 'Olá! Sou um desenvolvedor full stack apaixonado por criar soluções digitais inovadoras.',
                profileImage: '',
                skills: {
                    frontend: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Astro'],
                    backend: ['Node.js', 'Python', 'PHP', 'Express.js', 'FastAPI', 'Laravel'],
                    database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis'],
                    tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code']
                },
                experience: [],
                education: [],
                certifications: [],
                socialLinks: {
                    github: 'https://github.com/Ganjamanbr',
                    linkedin: '',
                    twitter: '',
                    email: 'thiagobatistadiasss@gmail.com'
                }
            };
        }

        return about.value;
    } catch (error) {
        console.error('Error fetching about data:', error);
        return null;
    }
}

export async function updateAboutData(data) {
    try {
        const { error } = await supabase
            .from('settings')
            .upsert({
                key: 'about',
                value: {
                    ...data,
                    updatedAt: new Date().toISOString()
                }
            });

        if (error) {
            console.error('Error updating about data:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error updating about data:', error);
        return false;
    }
}

// Projects Management Functions with GitHub Integration
export async function getAllPublishedProjects() {
    console.log('🔄 Buscando projetos de todas as fontes...');
    
    // 1. Primeira tentativa: GitHub (fonte principal)
    try {
        const githubProjects = await getAllGitHubProjects();
        
        if (githubProjects && githubProjects.length > 0) {
            console.log(`✅ Encontrados ${githubProjects.length} projetos do GitHub`);
            return githubProjects;
        }
    } catch (error) {
        console.error('❌ Erro ao buscar projetos do GitHub:', error);
    }
    
    // 2. Segunda tentativa: Supabase
    try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .eq('status', 'published')
            .order('published_at', { ascending: false });

        if (!error && projects && projects.length > 0) {
            console.log(`✅ Encontrados ${projects.length} projetos no Supabase`);
            return projects.map(project => ({
                id: project.id,
                title: project.title,
                description: project.description,
                image: project.image,
                demoLink: project.demo_link,
                githubLink: project.github_link,
                downloadLink: project.download_link,
                technologies: project.technologies || [],
                category: project.category,
                featured: project.featured || false,
                status: project.status,
                publishedAt: project.published_at,
                createdAt: project.created_at
            }));
        }
    } catch (error) {
        console.error('❌ Erro ao buscar projetos do Supabase:', error);
    }

    // 3. Terceira tentativa: Dados Mock (fallback)
    try {
        console.log('📝 Usando dados mock como fallback');
        const { getAllPublishedProjectsMock } = await import('./projects-data.js');
        return getAllPublishedProjectsMock();
    } catch (error) {
        console.error('❌ Erro ao carregar dados mock:', error);
        return [];
    }
}

export async function getFeaturedProjects(limit = 3) {
    console.log('🌟 Buscando projetos em destaque...');
    
    // 1. Primeira tentativa: GitHub (fonte principal)
    try {
        const featuredProjects = await getFeaturedGitHubProjects(limit);
        
        if (featuredProjects && featuredProjects.length > 0) {
            console.log(`✅ Encontrados ${featuredProjects.length} projetos em destaque do GitHub`);
            return featuredProjects;
        }
    } catch (error) {
        console.error('❌ Erro ao buscar projetos em destaque do GitHub:', error);
    }
    
    // 2. Segunda tentativa: Supabase
    try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .eq('status', 'published')
            .eq('featured', true)
            .order('published_at', { ascending: false })
            .limit(limit);

        if (!error && projects && projects.length > 0) {
            console.log(`✅ Encontrados ${projects.length} projetos em destaque no Supabase`);
            return projects.map(project => ({
                id: project.id,
                title: project.title,
                description: project.description,
                image: project.image,
                demoLink: project.demo_link,
                githubLink: project.github_link,
                downloadLink: project.download_link,
                technologies: project.technologies || [],
                category: project.category,
                featured: project.featured || false,
                status: project.status,
                publishedAt: project.published_at,
                createdAt: project.created_at
            }));
        }
    } catch (error) {
        console.error('❌ Erro ao buscar projetos em destaque do Supabase:', error);
    }

    // 3. Terceira tentativa: Dados Mock (fallback)
    try {
        console.log('📝 Usando dados mock como fallback para projetos em destaque');
        const { getFeaturedProjectsMock } = await import('./projects-data.js');
        return getFeaturedProjectsMock(limit);
    } catch (error) {
        console.error('❌ Erro ao carregar dados mock:', error);
        return [];
    }
}

export async function getProjectById(projectId) {
    console.log(`🔍 Buscando projeto com ID: ${projectId}`);
    
    // 1. Primeira tentativa: GitHub (fonte principal)
    try {
        const githubProject = await getGitHubProjectById(projectId);
        
        if (githubProject) {
            console.log(`✅ Projeto encontrado no GitHub: ${githubProject.title}`);
            return githubProject;
        }
    } catch (error) {
        console.error('❌ Erro ao buscar projeto no GitHub:', error);
    }
    
    // 2. Segunda tentativa: Supabase
    try {
        const { data: project, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .single();

        if (!error && project) {
            console.log(`✅ Projeto encontrado no Supabase: ${project.title}`);
            return {
                id: project.id,
                title: project.title,
                description: project.description,
                image: project.image,
                demoLink: project.demo_link,
                githubLink: project.github_link,
                downloadLink: project.download_link,
                technologies: project.technologies || [],
                category: project.category,
                featured: project.featured || false,
                status: project.status,
                publishedAt: project.published_at,
                createdAt: project.created_at
            };
        }
    } catch (error) {
        console.error('❌ Erro ao buscar projeto no Supabase:', error);
    }

    // 3. Terceira tentativa: Dados Mock (fallback)
    try {
        console.log('📝 Buscando em dados mock como fallback');
        const { getProjectByIdMock } = await import('./projects-data.js');
        return getProjectByIdMock(projectId);
    } catch (error) {
        console.error('❌ Erro ao buscar em dados mock:', error);
        return null;
    }
}

// Storage helper functions for images
export async function uploadImage(file, bucket = 'images') {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (error) {
            console.error('Error uploading image:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (error) {
        console.error('Error uploading image:', error);
        return { data: null, error };
    }
}

export function getImageUrl(path, bucket = 'images') {
    if (!path) return '';

    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

    return data.publicUrl;
}

// Real-time GitHub Technologies Analysis
export async function getRealtimeGitHubTechnologies() {
    try {
        console.log('🔄 Carregando tecnologias em tempo real do GitHub...');
        
        // Import the GitHub analyzer
        const { GitHubTechAnalyzer } = await import('./github-tech-analyzer.js');
        
        // Create analyzer instance
        const analyzer = new GitHubTechAnalyzer('ThiagoBDias');
        
        // Get complete tech analysis
        const analysis = await analyzer.getCompleteTechAnalysis();
        
        if (!analysis || !analysis.technologies || analysis.technologies.length === 0) {
            console.log('⚠️ Análise retornou dados vazios ou sem tecnologias, usando fallback');
            return getStaticTechnologies();
        }
        
        // Organize technologies by category
        const techsByCategory = {
            frontend: analysis.technologies.filter(tech => tech.category === 'frontend'),
            backend: analysis.technologies.filter(tech => tech.category === 'backend'),
            devops: analysis.technologies.filter(tech => tech.category === 'devops')
        };
        
        const metadata = {
            source: 'github_realtime',
            totalTechs: analysis.technologies.length,
            categories: analysis.categories,
            lastUpdated: new Date().toISOString()
        };
        
        console.log(`📊 Dados de tecnologias carregados:`, {
            source: metadata.source,
            totalTechs: metadata.totalTechs,
            categories: metadata.categories
        });
        
        return { techsByCategory, metadata };
        
    } catch (error) {
        console.error('❌ Erro ao carregar tecnologias do GitHub:', error);
        return getStaticTechnologies();
    }
}

// Static fallback data for technologies
function getStaticTechnologies() {
    console.log('📊 Carregando dados estáticos de tecnologias...');
    
    const technologies = [
        // Frontend
        { name: 'React', category: 'frontend', percentage: 85, color: '#61dafb' },
        { name: 'JavaScript', category: 'frontend', percentage: 90, color: '#f7df1e' },
        { name: 'TypeScript', category: 'frontend', percentage: 80, color: '#3178c6' },
        { name: 'Vue.js', category: 'frontend', percentage: 75, color: '#4fc08d' },
        { name: 'Astro', category: 'frontend', percentage: 70, color: '#ff5d01' },
        
        // Backend
        { name: 'Node.js', category: 'backend', percentage: 85, color: '#339933' },
        { name: 'Python', category: 'backend', percentage: 80, color: '#3776ab' },
        { name: 'Express.js', category: 'backend', percentage: 75, color: '#000000' },
        { name: 'FastAPI', category: 'backend', percentage: 70, color: '#009688' },
        { name: 'PostgreSQL', category: 'backend', percentage: 80, color: '#336791' },
        
        // DevOps
        { name: 'Docker', category: 'devops', percentage: 75, color: '#2496ed' },
        { name: 'Git', category: 'devops', percentage: 90, color: '#f05032' },
        { name: 'AWS', category: 'devops', percentage: 70, color: '#ff9900' },
        { name: 'Vercel', category: 'devops', percentage: 80, color: '#000000' },
        { name: 'Linux', category: 'devops', percentage: 75, color: '#fcc624' }
    ];
    
    // Organize technologies by category
    const techsByCategory = {
        frontend: technologies.filter(tech => tech.category === 'frontend'),
        backend: technologies.filter(tech => tech.category === 'backend'),
        devops: technologies.filter(tech => tech.category === 'devops')
    };
    
    const metadata = {
        source: 'static_fallback',
        totalTechs: technologies.length,
        categories: ['frontend', 'backend', 'devops'],
        lastUpdated: new Date().toISOString()
    };
    
    console.log(`📊 Dados de tecnologias carregados:`, {
        source: metadata.source,
        totalTechs: metadata.totalTechs,
        categories: metadata.categories
    });
    
    return { techsByCategory, metadata };
}
