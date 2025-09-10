# Guia de Estudo do Portfólio com Astro e Supabase

Este documento serve como guia para entender a estrutura do seu projeto de portfólio construído com Astro e Supabase. Ele explica os componentes principais, a arquitetura e como tudo funciona em conjunto.

## 1. Visão Geral da Estrutura

```
portifolio/
├── src/                      # Código-fonte principal
│   ├── assets/               # Recursos estáticos (imagens, etc.)
│   ├── components/           # Componentes reutilizáveis
│   ├── layouts/              # Layouts de página
│   ├── lib/                  # Bibliotecas e utilitários
│   └── pages/                # Páginas do site
├── public/                   # Arquivos públicos estáticos
├── scripts/                  # Scripts de utilitários
├── astro.config.mjs          # Configuração do Astro
├── tailwind.config.mjs       # Configuração do Tailwind CSS
└── package.json              # Dependências e scripts
```

## 2. Tecnologias Principais

- **Astro**: Framework web rápido que permite renderização em múltiplos modos
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **Supabase**: Backend como serviço para armazenar e gerenciar dados
- **Node.js**: Ambiente de execução JavaScript

## 3. Páginas Principais

### 3.1 Página Inicial (index.astro)
- Apresenta uma introdução pessoal
- Exibe projetos destacados
- Mostra postagens recentes do blog
- Inclui seções de formação e certificações

### 3.2 Sobre (sobre.astro)
- Informações biográficas
- Experiência profissional
- Habilidades técnicas

### 3.3 Projetos (projetos.astro)
- Lista de projetos
- Cada projeto tem sua própria página detalhada ([id].astro)

### 3.4 Blog (blog.astro)
- Listagem de artigos do blog
- Cada artigo tem sua própria página ([slug].astro)

### 3.5 Contato (contato.astro)
- Formulário de contato
- Informações de contato
- FAQ (Perguntas Frequentes)

## 4. Componentes Principais

### 4.1 Layout.astro
Este é o layout principal que contém:
- Cabeçalho com navegação
- Rodapé
- Metatags e configurações gerais

### 4.2 Componentes Reutilizáveis
- **SkillsHighlight.astro**: Exibe habilidades técnicas com barras de progresso
- **StatsCounter.astro**: Mostra estatísticas numéricas como projetos concluídos
- **ContactFAQ.astro**: Seção de perguntas frequentes na página de contato
- **Welcome.astro**: Componente de boas-vindas

## 5. Integração com Supabase

### 5.1 Configuração (lib/supabase.js)
```javascript
// Cria o cliente Supabase com as credenciais de ambiente
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 5.2 Funções Principais
- `getAllPublishedPosts()`: Busca todos os posts publicados
- `getAllPublishedProjects()`: Busca todos os projetos publicados
- `getProjectById(id)`: Busca um projeto específico pelo ID
- `getPostBySlug(slug)`: Busca um post específico pelo slug

### 5.3 Tabelas no Supabase
- **posts**: Armazena artigos do blog
- **projects**: Armazena informações sobre projetos
- **settings**: Configurações do site

## 6. Tailwind CSS

O projeto usa Tailwind CSS para estilização. As principais classes são organizadas para:
- Layout responsivo (`container`, `grid`, `flex`)
- Cores e temas (combinações de `bg-`, `text-`, `border-`)
- Animações e transições (`transition`, `hover:`, `animate-`)

## 7. Fluxos de Trabalho

### 7.1 Desenvolvimento Local
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### 7.2 Build e Deploy
```bash
# Build do projeto
npm run build

# Preview da versão de produção
npm run preview

# Deploy para Vercel
npm run deploy:vercel
```

## 8. Arquivos Críticos e Suas Funções

### 8.1 Configuração
- **astro.config.mjs**: Configuração principal do Astro
- **tailwind.config.mjs**: Personalização do Tailwind CSS
- **.env**: Variáveis de ambiente (credenciais Supabase)

### 8.2 Funções de Dados
- **lib/supabase.js**: Interface principal para comunicação com Supabase
- **lib/supabase-config.js**: Configurações do cliente Supabase

## 9. Áreas Potenciais para Personalização

1. **Conteúdo**: Atualize as informações pessoais, projetos e posts
2. **Estilo**: Modifique as cores, fontes e layout em:
   - tailwind.config.mjs (tema global)
   - Layout.astro (estrutura geral)
   - Componentes individuais
3. **Funcionalidades**: Adicione novas seções ou recursos

## 10. Como Adicionar Conteúdo

### 10.1 Adicionar um Novo Projeto
1. Insira um novo registro na tabela `projects` do Supabase
2. Campos necessários: title, description, image_url, tags, status, etc.

### 10.2 Adicionar um Novo Post de Blog
1. Insira um novo registro na tabela `posts` do Supabase
2. Campos necessários: title, content, excerpt, slug, status, etc.

## 11. Dicas para Modificações

1. **Comece pequeno**: Faça alterações incrementais e teste-as
2. **Use o hot reload**: As mudanças são visíveis instantaneamente durante o desenvolvimento
3. **Consulte a documentação**:
   - [Astro Docs](https://docs.astro.build)
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)
   - [Supabase Docs](https://supabase.com/docs)

---

Esse guia deve ajudar você a entender e modificar seu site de portfólio. À medida que você se familiariza com a estrutura, poderá fazer alterações mais avançadas e personalizá-lo completamente para suas necessidades.
