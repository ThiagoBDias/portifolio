# 🚀 Guia de Deploy - Portfolio com Supabase

## ✅ Configuração Completa!

Sua configuração está pronta para deploy! Aqui está o que foi configurado:

### 📋 Checklist de Configuração
- ✅ **Variáveis de ambiente**: Configuradas no `.env`
- ✅ **Conexão Supabase**: Testada e funcionando
- ✅ **Scripts de configuração**: Criados
- ✅ **Configuração de deploy**: Pronta para Vercel

---

## 🗄️ **PASSO 1: Configurar as Tabelas no Supabase**

1. **Acesse seu painel Supabase**: https://supabase.com/dashboard
2. **Vá para o SQL Editor**: https://supabase.com/dashboard/project/cwcgbcndctvgqjdobohf/sql
3. **Cole e execute o script**: Copie todo o conteúdo do arquivo `setup-database.sql`
4. **Execute o script**: Clique em "Run" para criar todas as tabelas

### Tabelas que serão criadas:
- `projects` - Para seus projetos
- `posts` - Para blog posts
- `settings` - Para configurações gerais

---

## 🚀 **PASSO 2: Deploy no Vercel (Recomendado)**

### Opção A: Deploy via GitHub (Mais fácil)

1. **Push do código para GitHub**:
   ```bash
   git add .
   git commit -m "Configuração Supabase completa"
   git push origin main
   ```

2. **Conectar com Vercel**:
   - Acesse: https://vercel.com/new
   - Conecte sua conta GitHub
   - Selecione seu repositório `portifolio`
   - Clique em "Deploy"

3. **Configurar variáveis de ambiente no Vercel**:
   - Vá em: Project Settings > Environment Variables
   - Adicione estas variáveis:
   
   ```
   SUPABASE_URL = https://cwcgbcndctvgqjdobohf.supabase.co
   SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3Y2diY25kY3R2Z3FqZG9ib2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMDQ3MjgsImV4cCI6MjA3MjY4MDcyOH0.DD5CN7hPPXKaFkwNaVR2EMstwNHebXBb6Q11j6S-khw
   
   PUBLIC_SUPABASE_URL = https://cwcgbcndctvgqjdobohf.supabase.co
   PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3Y2diY25kY3R2Z3FqZG9ib2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMDQ3MjgsImV4cCI6MjA3MjY4MDcyOH0.DD5CN7hPPXKaFkwNaVR2EMstwNHebXBb6Q11j6S-khw
   ```

4. **Fazer redeploy**: Clique em "Redeploy" para aplicar as variáveis

### Opção B: Deploy via Vercel CLI

1. **Instalar Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Fazer login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

---

## 🌐 **PASSO 3: Deploy em outras plataformas**

### Netlify
1. Conecte seu repositório GitHub
2. Configure build command: `npm run build`
3. Configure publish directory: `dist`
4. Adicione as mesmas variáveis de ambiente

### GitHub Pages + GitHub Actions
1. Configure GitHub Actions para build automático
2. Use secrets do repositório para as variáveis de ambiente

---

## 🧪 **PASSO 4: Testar a Produção**

Após o deploy, teste estas páginas:
- ✅ **Home**: `/` - Deve carregar projetos do GitHub ou Supabase
- ✅ **Projetos**: `/projetos` - Deve listar todos os projetos
- ✅ **Blog**: `/blog` - Deve funcionar (vazio se não tiver posts)
- ✅ **Sobre**: `/sobre` - Deve carregar informações do Supabase
- ✅ **Configuração**: `/config` - Deve mostrar status da integração

---

## 🔧 **Comandos Úteis**

### Testar localmente:
```bash
npm run dev
```

### Build de produção local:
```bash
npm run build
npm run preview
```

### Testar conexão Supabase:
```bash
node test-supabase.js
```

---

## 📊 **Hierarquia de Dados**

Seu portfolio funciona com esta ordem de prioridade:
1. **GitHub API** (principal) - Carrega seus repositórios automaticamente
2. **Supabase** (backup) - Dados manuais que você adicionar
3. **Mock Data** (fallback) - Dados de exemplo se tudo falhar

---

## 🆘 **Resolução de Problemas**

### Se der erro de build:
1. Verifique se as variáveis de ambiente estão configuradas
2. Execute `npm install` para instalar dependências
3. Teste localmente antes do deploy

### Se a conexão com Supabase falhar:
1. Verifique se executou o script SQL
2. Confirme se as credenciais estão corretas
3. Teste com `node test-supabase.js`

---

## 🎉 **Parabéns!**

Seu portfolio está configurado e pronto para produção! 

**URLs importantes:**
- 🗄️ **Painel Supabase**: https://supabase.com/dashboard/project/cwcgbcndctvgqjdobohf
- 🌐 **Deploy Vercel**: https://vercel.com (após deploy)
- 📁 **Repositório**: https://github.com/ThiagoBDias/portifolio

**Próximos passos:**
1. Execute o script SQL no Supabase
2. Faça o deploy no Vercel
3. Teste tudo funcionando
4. Customize conforme necessário!

---

> 💡 **Dica**: Mantenha o arquivo `.env` no `.gitignore` para não expor suas credenciais!