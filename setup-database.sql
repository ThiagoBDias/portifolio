-- Script SQL para criar as tabelas necessárias no Supabase
-- Execute estas consultas no SQL Editor do seu painel Supabase

-- 1. Criar tabela de projetos
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image TEXT,
    demo_link TEXT,
    github_link TEXT,
    download_link TEXT,
    technologies TEXT[], -- Array de strings
    category VARCHAR(100),
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'published',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar tabela de posts do blog
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content_markdown TEXT NOT NULL,
    cover_image TEXT,
    tags TEXT[], -- Array de strings
    status VARCHAR(20) DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar tabela de configurações
CREATE TABLE IF NOT EXISTS settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Criar políticas RLS (Row Level Security) para permitir leitura pública

-- Políticas para projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de projetos publicados" ON projects
    FOR SELECT USING (status = 'published');

-- Políticas para posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de posts publicados" ON posts
    FOR SELECT USING (status = 'published');

-- Políticas para settings (somente leitura)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública das configurações" ON settings
    FOR SELECT USING (true);

-- 5. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_published_at ON projects(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

-- 6. Inserir dados de exemplo (opcional)
INSERT INTO projects (title, description, image, github_link, technologies, category, featured, status) 
VALUES 
    (
        'Portfolio Website',
        'Site pessoal desenvolvido com Astro e TailwindCSS',
        '/images/portfolio.jpg',
        'https://github.com/ThiagoBDias/portifolio',
        ARRAY['Astro', 'TailwindCSS', 'TypeScript'],
        'frontend',
        true,
        'published'
    ),
    (
        'Projeto Exemplo',
        'Descrição do projeto exemplo',
        '/images/example.jpg',
        'https://github.com/ThiagoBDias/example',
        ARRAY['JavaScript', 'HTML', 'CSS'],
        'frontend',
        false,
        'published'
    )
ON CONFLICT DO NOTHING;

-- 7. Inserir configuração básica sobre
INSERT INTO settings (key, value) 
VALUES (
    'about',
    '{
        "bio": "Olá! Sou um desenvolvedor full stack apaixonado por criar soluções digitais inovadoras.",
        "profileImage": "",
        "skills": {
            "frontend": ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Vue.js", "Astro"],
            "backend": ["Node.js", "Python", "PHP", "Express.js", "FastAPI", "Laravel"],
            "database": ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Redis"],
            "tools": ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"]
        },
        "experience": [],
        "education": [],
        "certifications": [],
        "socialLinks": {
            "github": "https://github.com/ThiagoBDias",
            "linkedin": "",
            "twitter": "",
            "email": "contato@exemplo.com"
        }
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;