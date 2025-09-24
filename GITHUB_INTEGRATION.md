# 🚀 Sistema Integrado GitHub + Portfolio

Este documento explica como funciona a integração automática com o GitHub para buscar seus projetos reais.

## 🎯 Como Funciona

### 1. **Fontes de Dados (Hierarquia)**
```
1️⃣ GitHub API (Fonte Principal)
    ↓ (Se falhar)
2️⃣ Supabase Database (Backup) 
    ↓ (Se falhar)
3️⃣ Mock Data (Fallback)
```

### 2. **Fluxo de Busca de Projetos**

```javascript
// Busca todos os projetos
getAllPublishedProjects()
  → fetchGitHubRepositories()     // GitHub API
  → convertGitHubRepoToProject()  // Converte para formato padrão
  → aplicaFiltrosECategorização() // Processa dados
```

## ⚙️ Configuração Rápida

### 1. **Alterar Username**
```javascript
// src/lib/portfolio-config.js
export const PORTFOLIO_CONFIG = {
  github: {
    username: 'SeuUsername', // ⚠️ ALTERE AQUI
```

### 2. **Excluir Repositórios**
```javascript
excludeRepos: [
  'SeuUsername',    // Repo README do perfil
  'dotfiles',       // Configurações pessoais
  'private-notes',  // Notas privadas
  'test-repo'       // Repositórios de teste
],
```

### 3. **Definir Projetos Destacados**
```javascript
featuredKeywords: [
  'portfolio', 'website', 'app', 'platform',
  'dashboard', 'system', 'api', 'fullstack'
],
```

## 🔧 Funcionalidades Automáticas

### **1. Categorização Inteligente**
O sistema analisa automaticamente:
- **Linguagens de programação** do repositório
- **Tópicos/tags** do GitHub
- **Nome e descrição** do projeto

```javascript
// Exemplos de categorização automática:
'React + Node.js' → 'Full Stack'
'JavaScript + HTML' → 'Frontend'  
'Python + Flask' → 'Backend'
'Swift + iOS' → 'Mobile'
```

### **2. Detecção de Tecnologias**
```javascript
// Mapeamento automático:
JavaScript → JavaScript
TypeScript → TypeScript
'react' (tópico) → React
'nodejs' (tópico) → Node.js
'docker' (tópico) → Docker
```

### **3. Projetos em Destaque**
Automaticamente destacados se:
- ⭐ Tem stars no GitHub
- 🍴 Tem forks
- 📝 Contém palavras-chave importantes
- 🔄 Foi atualizado recentemente

## 📊 Dados Extraídos do GitHub

Para cada repositório, o sistema extrai:

```javascript
{
  id: "123456789",
  title: "Meu Projeto",           // Nome formatado
  description: "Descrição...",     // Limitada a 150 chars
  demoLink: "https://demo.com",    // Homepage do repo
  githubLink: "https://github...", // Link do repositório
  technologies: ["React", "Node"], // Linguagens + tópicos
  category: "Full Stack",          // Categorização automática
  featured: true,                  // Se é projeto destacado
  stars: 15,                       // Número de stars
  forks: 3,                        // Número de forks
  language: "JavaScript",          // Linguagem principal
  topics: ["react", "nodejs"]      // Tópicos do GitHub
}
```

## 🎨 Personalização Avançada

### **1. Mapeamento de Tecnologias**
```javascript
// src/lib/portfolio-config.js
techMapping: {
  'react': { name: 'React.js', color: '#61dafb' },
  'vue': { name: 'Vue.js', color: '#4fc08d' },
  // Adicione suas próprias...
}
```

### **2. Regras de Categorização**
```javascript
categoryRules: {
  'Full Stack': {
    requiresBoth: {
      frontend: ['JavaScript', 'React', 'Vue'],
      backend: ['Python', 'Node.js', 'Java']
    }
  },
  'Mobile': {
    languages: ['Swift', 'Kotlin', 'Dart'],
    topics: ['android', 'ios', 'flutter']
  }
}
```

### **3. Configurações de Exibição**
```javascript
display: {
  maxTechnologies: 6,        // Máx tecnologias por projeto
  maxDescriptionLength: 150, // Máx caracteres da descrição
  featuredProjectsCount: 3,  // Projetos na página inicial
  projectsPerPage: 12        // Projetos por página
}
```

## 🚦 Sistema de Cache

Para evitar rate limiting da API do GitHub:

```javascript
// Cache automático por 5 minutos
CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Logs no console:
📦 Usando repositórios do cache
🔄 Buscando repositórios do GitHub...
✅ Encontrados X repositórios relevantes
```

## 📝 Logs e Debugging

O sistema mostra logs detalhados no console:

```bash
🔄 Buscando projetos de todas as fontes...
✅ Encontrados 8 projetos do GitHub
🌟 Buscando projetos em destaque...
✅ Encontrados 3 projetos em destaque do GitHub
🔍 Buscando projeto com ID: 123456789
✅ Projeto encontrado no GitHub: Meu Projeto
```

## 🔄 Fallback Automático

Se algo der errado:

1. **GitHub API falha** → Tenta Supabase
2. **Supabase falha** → Usa dados mock
3. **Tudo falha** → Array vazio (graceful degradation)

```javascript
// Exemplo de fallback:
❌ Erro ao buscar projetos do GitHub: Rate limit exceeded
🔄 Tentando Supabase como backup...
✅ Encontrados 5 projetos no Supabase
```

## 📁 Estrutura de Arquivos

```
src/lib/
├── github-integration.js    # 🔧 Integração principal
├── portfolio-config.js      # ⚙️ Configurações
├── supabase.js             # 🗄️ Integração híbrida
└── projects-data.js        # 📝 Dados mock (fallback)
```

## ⚡ Performance e Otimizações

### **1. Cache Inteligente**
- Cache de 5 minutos para repositórios
- Evita múltiplas chamadas à API
- Logs informativos sobre uso do cache

### **2. Filtros Eficientes**
- Filtra apenas repositórios relevantes
- Remove forks e repositórios arquivados
- Aplica filtros personalizados

### **3. Limit de API Calls**
- Busca máximo 100 repositórios
- Processa apenas os 20 mais relevantes
- Rate limiting respeitado

## 🐛 Solução de Problemas

### **Problema: Nenhum projeto aparece**
```bash
# 1. Verifique o username
console.log(PORTFOLIO_CONFIG.github.username);

# 2. Verifique se os repos são públicos
# 3. Verifique se têm descrição
# 4. Verifique os logs no console do navegador
```

### **Problema: Projetos errados aparecem**
```javascript
// Adicione aos excludeRepos:
excludeRepos: [
  'repo-indesejado',
  'teste',
  'learning'
]
```

### **Problema: Categorização errada**
```javascript
// Personalize as regras:
categoryRules: {
  'Sua Categoria': {
    topics: ['sua-keyword'],
    languages: ['Sua-Linguagem']
  }
}
```

## 🎯 Próximos Passos

1. **Configure seu username** em `portfolio-config.js`
2. **Teste o sistema** acessando `/projetos`
3. **Personalize categorias** conforme seus projetos
4. **Ajuste filtros** para seus repositórios
5. **Configure rate limiting** se necessário

## 📚 Links Úteis

- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Página de Configuração](/config) - Interface visual
- [Astro Documentation](https://docs.astro.build)

---

**🎉 Seu portfolio agora está conectado automaticamente com seus projetos reais do GitHub!**