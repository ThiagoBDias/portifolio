# Arquivos que podem ser removidos para simplificar o projeto

Este documento lista arquivos e diretórios que não são essenciais para o funcionamento básico do site e podem ser removidos para simplificar o projeto.

## Scripts de Diagnóstico e Teste

Estes scripts são úteis para debugging, mas não são necessários para o funcionamento do site:

- `scripts/diagnose-build-deploy.js`
- `scripts/diagnose-supabase-connection.js`
- `scripts/test-node.js`
- `scripts/test-supabase.js`
- `scripts/test-direct-login.js`
- `scripts/test-admin-login.js`

## Arquivos de Administração

Os arquivos administrativos podem ser removidos se você não precisar da funcionalidade de admin:

- `admin/` (diretório completo)
- `public/admin/` (diretório completo)
- `src/pages/admin.astro`
- `src/pages/admin-test.astro`

## Arquivos de Teste

Arquivos de teste podem ser removidos se você não estiver focando em testes:

- `src/simple.test.ts`
- `src/components/Welcome.test.tsx`
- `src/lib/supabase.test.ts`
- `src/test/` (diretório completo)

## Arquivos Temporários ou de Exemplo

- `src/pages/teste.astro` (página de teste)

## Scripts de Batch e Deployment

Estes scripts são específicos para certos ambientes e podem não ser necessários:

- `build.bat`
- `deploy.bat`
- `test-build-deploy.bat`
- `simulate-deploy.bat`
- `simulate-vercel-deploy.bat`

## Como proceder com a limpeza:

1. **Faça backup**: Antes de remover qualquer arquivo, faça um backup completo do projeto
2. **Remova gradualmente**: Remova um grupo de arquivos por vez e teste se o site ainda funciona
3. **Verifique dependências**: Alguns arquivos podem ser referenciados por outros

**Importante**: Não remova os seguintes arquivos e diretórios essenciais:
- `src/pages/` (páginas principais: index.astro, sobre.astro, projetos.astro, blog.astro, contato.astro)
- `src/layouts/Layout.astro` (layout principal)
- `src/components/` (componentes principais)
- `src/lib/supabase.js` (conexão com Supabase)
- `astro.config.mjs` (configuração do Astro)
- `tailwind.config.mjs` (configuração do Tailwind)
- `package.json` (dependências e scripts)
- `.env` ou `.env.local` (variáveis de ambiente)
