# Guia para Supabase no Projeto de Portfólio

Este documento explica como funciona a integração com Supabase no projeto e como você pode gerenciar, atualizar e expandir os dados armazenados.

## 1. O que é o Supabase?

Supabase é uma alternativa de código aberto ao Firebase que fornece:
- Banco de dados PostgreSQL
- Autenticação
- Armazenamento
- APIs geradas automaticamente
- Funções serverless

No seu projeto, o Supabase é usado principalmente para:
1. Armazenar informações sobre projetos
2. Armazenar posts do blog
3. Gerenciar configurações do site

## 2. Estrutura das Tabelas

### 2.1 Tabela `projects`

Esta tabela armazena informações sobre seus projetos:

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | Identificador único (chave primária) |
| title | text | Título do projeto |
| description | text | Descrição detalhada |
| short_description | text | Resumo breve |
| image_url | text | URL da imagem principal |
| gallery | text[] | Array de URLs de imagens adicionais |
| tags | text[] | Tecnologias/categorias do projeto |
| repo_url | text | URL do repositório (GitHub, etc.) |
| live_url | text | URL do site/demo ao vivo |
| status | text | Estado (published, draft) |
| featured | boolean | Se o projeto deve ser destacado |
| created_at | timestamp | Data de criação do registro |

### 2.2 Tabela `posts`

Esta tabela armazena artigos do blog:

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | Identificador único (chave primária) |
| title | text | Título do post |
| slug | text | URL amigável (único) |
| content | text | Conteúdo completo (Markdown) |
| excerpt | text | Resumo curto |
| cover_image | text | URL da imagem de capa |
| tags | text[] | Categorias/tags do post |
| status | text | Estado (published, draft) |
| author | text | Nome do autor |
| published_at | timestamp | Data de publicação |
| created_at | timestamp | Data de criação do registro |

## 3. Funções de Acesso aos Dados (src/lib/supabase.js)

### 3.1 Buscar Todos os Projetos Publicados
```javascript
export async function getAllPublishedProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    return [];
  }
}
```

### 3.2 Buscar um Projeto Específico
```javascript
export async function getProjectById(id) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Erro ao buscar projeto ${id}:`, error);
    return null;
  }
}
```

### 3.3 Buscar Todos os Posts Publicados
```javascript
export async function getAllPublishedPosts() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
}
```

## 4. Como Acessar o Dashboard do Supabase

1. Acesse https://app.supabase.io/
2. Faça login com suas credenciais
3. Selecione o projeto relacionado ao seu portfólio
4. Use a interface do Supabase para:
   - Gerenciar tabelas e dados
   - Configurar autenticação
   - Gerenciar armazenamento
   - Verificar logs e métricas

## 5. Como Adicionar Novos Dados

### 5.1 Adicionar um Novo Projeto

1. No Dashboard do Supabase, vá para a seção "Table Editor"
2. Selecione a tabela "projects"
3. Clique em "Insert Row" ou "+"
4. Preencha os campos:
   - title: Nome do projeto
   - description: Descrição detalhada (pode usar markdown)
   - short_description: Resumo breve
   - image_url: URL da imagem principal
   - tags: Array de tecnologias (ex: ["React", "Node.js", "MongoDB"])
   - repo_url: Link para o código fonte (GitHub)
   - live_url: Link para o site/aplicação em produção
   - status: "published" para projetos visíveis
   - featured: true/false para destacar na página inicial
5. Clique em "Save"

### 5.2 Adicionar um Novo Post de Blog

1. No Dashboard do Supabase, vá para a seção "Table Editor"
2. Selecione a tabela "posts"
3. Clique em "Insert Row" ou "+"
4. Preencha os campos:
   - title: Título do post
   - slug: URL amigável (ex: "meu-primeiro-post")
   - content: Conteúdo completo em markdown
   - excerpt: Resumo curto
   - cover_image: URL da imagem de capa
   - tags: Array de categorias (ex: ["Web Development", "React"])
   - status: "published" para posts visíveis
   - author: Seu nome
   - published_at: Data de publicação
5. Clique em "Save"

## 6. Configurações de Segurança e RLS (Row Level Security)

O Supabase usa RLS para controlar o acesso aos dados. Por padrão:
- Todos podem ler dados com status "published"
- Apenas usuários autenticados podem criar, atualizar ou excluir dados

## 7. Solução de Problemas Comuns

### 7.1 Dados não aparecem no site
- Verifique se o status está definido como "published"
- Confirme se as variáveis de ambiente do Supabase estão configuradas corretamente
- Verifique os erros no console do navegador

### 7.2 Erro de conexão com o Supabase
- Verifique se as variáveis SUPABASE_URL e SUPABASE_ANON_KEY estão corretas no arquivo .env
- Confirme se o projeto Supabase está ativo

### 7.3 Erro ao fazer upload de imagens
- Verifique as permissões de armazenamento no Supabase
- Confirme se o bucket de armazenamento existe e está configurado corretamente

## 8. Melhorias Futuras Possíveis

1. **Sistema de comentários**: Adicione uma tabela para comentários em posts
2. **Sistema de categorias**: Crie uma tabela separada para categorias
3. **Métricas de visualização**: Rastreie quantas vezes um projeto ou post foi visualizado
4. **Sistema de avaliação**: Permita que visitantes avaliem projetos

---

Este guia deve ajudar você a entender e trabalhar com o Supabase no seu projeto de portfólio. À medida que você se familiariza com o sistema, poderá expandir as funcionalidades e personalizar conforme suas necessidades.
