# Portfolio Astro Moderno com Sistema Integrado de Projetos

Este é um site de portfólio moderno e responsivo construído com Astro, utilizando um sistema híbrido de dados com Supabase e fallback para dados mock, garantindo que o site funcione mesmo sem configuração de banco de dados.

## 🚀 Tecnologias Utilizadas

- **Astro**: Framework para sites estáticos e dinâmicos
- **TypeScript**: Tipagem estática para melhor desenvolvimento
- **Tailwind CSS**: Framework CSS utilitário moderno
- **Supabase**: Backend-as-a-Service (opcional) para gerenciamento de conteúdo
- **Sistema Híbrido**: Dados mock para desenvolvimento sem dependências

## ✨ Características Principais

### 🎨 Design Moderno
- **Paleta Clean & Elegant**: Cores masculinas (azul, laranja, dourado)
- **Design Responsivo**: Funciona perfeitamente em todos os dispositivos
- **Animações Suaves**: Transições e hover effects profissionais
- **Gradientes Modernos**: Visual contemporâneo com efeitos visuais

### 📱 Funcionalidades
- **Projetos em Destaque**: Sistema de projetos destacados na página inicial
- **Filtros por Categoria**: Navegação intuitiva por tipo de projeto
- **Páginas Detalhadas**: Página individual para cada projeto
- **Sistema Híbrido**: Funciona com Supabase ou dados mock
- **SEO Otimizado**: Meta tags e estrutura otimizada para buscadores

### 🔧 Sistema de Projetos
- **Suporte a Múltiplas Fontes**: Supabase (produção) + Mock Data (desenvolvimento)
- **Categorização Automática**: Full Stack, Frontend, Backend, Mobile
- **Links Dinâmicos**: Demo, GitHub, Download automáticos
- **Tecnologias Destacadas**: Tags visuais para stack tecnológica

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- NPM ou Yarn
- Conta no Supabase (opcional - funciona sem)

## ⚙️ Configuração Rápida

### 1. Clonagem e Instalação

```bash
git clone https://github.com/seu-usuario/portifolio.git
cd portifolio
npm install
```

### 2. Configuração das Variáveis de Ambiente

O projeto inclui um arquivo `.env` com valores padrão que permite execução imediata:

```bash
# As variáveis já estão configuradas no .env
# Para usar Supabase real, edite os valores:
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Execução Imediata

```bash
npm run dev
```

**🎉 Pronto! Seu portfólio está rodando em http://localhost:4321**

## 🧞 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build para produção |
| `npm run preview` | Preview do build |
| `npm run check-env` | Verifica configurações |

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Button.astro     # Botão com variantes (primary, secondary, outline)
│   ├── ProjectCard.astro # Card de projeto com hover effects
│   └── SkillsSection.astro # Seção de habilidades
├── layouts/
│   └── Layout.astro     # Layout principal com nova paleta
├── lib/
│   ├── supabase.js      # Cliente Supabase com fallback
│   └── projects-data.js # Dados mock para desenvolvimento
├── pages/
│   ├── index.astro      # Página inicial com projetos destacados
│   ├── projetos.astro   # Galeria com filtros por categoria
│   └── projetos/
│       └── [id].astro   # Página detalhada do projeto
└── assets/              # Recursos estáticos
```

## 🎨 Sistema de Cores (Clean & Elegant)

```css
/* Paleta Principal */
Primary: #3b82f6   (Azul profissional)
Secondary: #f97316 (Laranja energético)  
Accent: #f59e0b    (Dourado sofisticado)
Cyan: #06b6d4      (Ciano moderno)

/* Tons de Cinza */
Gray: #1f2937 → #f9fafb (9 variações)
```

## 🚀 Sistema Híbrido de Dados

### Como Funciona

1. **Primeira Tentativa**: Busca dados do Supabase
2. **Fallback Automático**: Se Supabase não disponível, usa dados mock
3. **Desenvolvimento Sem Dependências**: Funciona imediatamente após clone

### Dados Mock Inclusos

O projeto inclui 8 projetos mock completos:
- E-commerce Platform (Full Stack)
- Task Management App (Frontend)  
- Weather Dashboard (Frontend)
- Learning Management System (Full Stack)
- Real-time Chat App (Full Stack)
- Analytics Dashboard (Full Stack)
- Blog Platform (Full Stack)
- Mobile Fitness App (Mobile)

### Configuração do Supabase (Opcional)

Para usar dados reais do Supabase, crie as tabelas:

```sql
-- Tabela de projetos
create table projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  image text,
  demo_link text,
  github_link text,
  download_link text,
  technologies text[],
  category text,
  featured boolean default false,
  status text default 'published',
  published_at timestamp default now(),
  created_at timestamp default now()
);
```

## 📱 Funcionalidades do Sistema de Projetos

### Página Inicial (`/`)
- **Projetos em Destaque**: 3 projetos principais
- **Integração Automática**: Usa `getFeaturedProjects(3)`
- **Cards Responsivos**: Layout adaptável

### Página de Projetos (`/projetos`)
- **Filtros por Categoria**: Todos, Full Stack, Frontend, Backend, Mobile
- **Contador Dinâmico**: Mostra quantidade por categoria
- **Animações**: Transições suaves entre filtros

### Página Detalhada (`/projetos/[id]`)
- **Layout Moderno**: Header com gradiente e badges
- **Botões de Ação**: Demo, GitHub, Download
- **Conteúdo Rico**: Suporte a markdown/HTML
- **Navegação**: Botão voltar estilizado

## 🎯 Personalização

### Adicionando Novos Projetos

Edite `src/lib/projects-data.js`:

```javascript
const newProject = {
  id: '9',
  title: 'Meu Novo Projeto',
  description: 'Descrição detalhada...',
  technologies: ['React', 'Node.js'],
  category: 'Full Stack',
  featured: true, // Para aparecer na página inicial
  demoLink: 'https://demo.com',
  githubLink: 'https://github.com/user/projeto',
  status: 'published'
};
```

### Mudando Cores

Edite `tailwind.config.mjs`:

```javascript
colors: {
  primary: { /* suas cores */ },
  secondary: { /* suas cores */ },
  accent: { /* suas cores */ }
}
```

## 🔧 Solução de Problemas

### Site não carrega projetos
✅ **Solução**: O sistema usa dados mock automaticamente

### Erro de variáveis de ambiente  
✅ **Solução**: Execute `npm run check-env`

### Problemas de build
✅ **Solução**: Verifique os logs com `npm run build`

## 📚 Documentação para Estudo

- **Astro**: [docs.astro.build](https://docs.astro.build)
- **Tailwind**: [tailwindcss.com](https://tailwindcss.com)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build
npm run build

# Deploy pasta dist/
```

## 📈 Próximas Funcionalidades

- [ ] Sistema de blog integrado
- [ ] Modo escuro/claro
- [ ] Animações mais avançadas
- [ ] PWA support
- [ ] Internacionalização (i18n)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**🎨 Portfolio Astro Moderno** - Um sistema completo de portfólio com design profissional e funcionalidades avançadas.