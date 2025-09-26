# Portfolio Astro com Supabase 🌟

Este é um site de portfolio construído com Astro, utilizando Supabase como backend para gerenciamento de conteúdo.

## 🚀 Tecnologias Utilizadas

- **Astro**: Framework para sites estáticos
- **Supabase**: Backend-as-a-Service (banco de dados)
- **Tailwind CSS**: Framework CSS utilitário
- **Vercel/Netlify**: Plataformas de deploy

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- Conta no Supabase

## ⚙️ Configuração do Ambiente

### 1. Clonagem e Instalação

```bash
git clone https://github.com/ThiagoBDias/portifolio.git
cd portifolio
npm install
```


Copie o arquivo de exemplo e configure suas credenciais:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Supabase:

```bash
SUPABASE_URL=https://[seu-project-ref].supabase.co
SUPABASE_ANON_KEY=[sua-chave-anonima]
```

### 3. Configuração do Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. Vá para Settings → API
3. Copie a URL do projeto e a chave anônima
4. Cole no arquivo `.env.local`

## 🧞 Comandos Disponíveis

| Comando                   | Descrição                                           |
| :------------------------ | :-------------------------------------------------- |
| `npm run dev`             | Inicia servidor de desenvolvimento                  |
| `npm run build`           | Build para produção (verifica env automaticamente) |
| `npm run preview`         | Preview do build local                              |
| `npm run test`            | Executa testes                                      |
| `npm run test:ui`         | Executa testes com interface gráfica                |
| `npm run test:run`        | Executa todos os testes uma vez                     |
| `npm run test:coverage`   | Executa testes com relatório de cobertura           |

## 🚀 Deploy

### Configuração Inicial (Obrigatório)

Antes de fazer deploy, configure os secrets no GitHub:

1. **Acesse seu repositório no GitHub**
2. **Vá para Settings → Secrets and variables → Actions**
3. **Adicione os seguintes secrets:**

| Secret | Onde obter | Descrição |
|--------|------------|-----------|
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens | Token de autenticação |
| `VERCEL_ORG_ID` | Vercel → Account Settings → Teams | ID da organização |
| `VERCEL_PROJECT_ID` | Vercel → Project Settings → General | ID do projeto |
| `SUPABASE_URL` | Supabase → Settings → API → Project URL | URL do Supabase |
| `SUPABASE_ANON_KEY` | Supabase → Settings → API → anon/public | Chave anônima |

### Verificação dos Secrets

Execute este comando para verificar se todos os secrets estão configurados:

```bash
npm run check-secrets
```

### Deploy Automático

Após configurar os secrets:

1. **Faça push para a branch main:**
   ```bash
   git add .
   git commit -m "feat: configurar deploy automático"
   git push origin main
   ```

2. **Monitore o GitHub Actions:**
   - Vá para a aba "Actions" no repositório
   - O workflow fará deploy automático no Vercel

### Deploy Manual (Opcional)

```bash
# Deploy no Vercel
npm run deploy:vercel

# Deploy no Netlify
npm run deploy:netlify
```

## 📁 Estrutura do Projeto

```
/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes Astro
│   ├── layouts/            # Layouts das páginas
│   ├── lib/                # Utilitários e configurações
│   │   ├── supabase.js     # Cliente Supabase
│   │   └── supabase-config.js # Configuração build-time
│   └── pages/              # Páginas do site
├── scripts/                # Scripts utilitários
│   └── check-env.js        # Verificação de ambiente
├── .github/workflows/      # CI/CD GitHub Actions
└── admin/                  # Painel administrativo
```

## 🔧 Solução de Problemas

### Erro "supabaseUrl is required"

Este erro ocorre quando as variáveis de ambiente não estão configuradas:

1. Verifique se o arquivo `.env.local` existe
2. Confirme que as variáveis estão corretas
3. No Vercel/GitHub Actions, verifique se os secrets estão configurados

### Build falhando no CI/CD

O script `check-env.js` é executado automaticamente antes do build e verifica as variáveis de ambiente. Se o build falhar:

1. Verifique os logs do GitHub Actions
2. Confirme que os secrets estão configurados corretamente
3. Teste o build localmente: `npm run build`

## 📚 Documentação Adicional

- [Documentação Astro](https://docs.astro.build)
- [Documentação Supabase](https://supabase.com/docs)
- [Guia de Deploy Vercel](https://vercel.com/docs)

## 📚 Documentação para Estudo

Para facilitar o entendimento e desenvolvimento do projeto, foram criados guias detalhados:

1. **[GUIA_DE_ESTUDO.md](./GUIA_DE_ESTUDO.md)** - Explicação completa da estrutura do projeto
2. **[GUIA_SUPABASE.md](./GUIA_SUPABASE.md)** - Detalhes sobre integração com Supabase
3. **[ARQUIVOS_PARA_LIMPAR.md](./ARQUIVOS_PARA_LIMPAR.md)** - Arquivos que podem ser removidos para simplificar

## ⚡ Início Rápido

Depois de configurar o ambiente:

1. Execute `npm run dev` para iniciar o servidor de desenvolvimento
2. Acesse `http://localhost:4321` no navegador
3. Explore os arquivos em `src/pages` para começar a editar o conteúdo
4. Consulte os guias para entender como personalizar seu portfólio
