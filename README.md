# Site Astro com Supabase

Este é um site estático construído com Astro, utilizando Supabase como backend para autenticação e banco de dados.

## 🚀 Tecnologias Utilizadas

- **Astro**: Framework para sites estáticos
- **Supabase**: Backend-as-a-Service (autenticação, banco de dados)
- **Vercel**: Plataforma de deploy
- **Vitest**: Framework de testes
- **GitHub Actions**: CI/CD

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- Conta no Supabase
- Conta no Vercel (opcional)

## ⚙️ Configuração do Ambiente

### 1. Clonagem e Instalação

```bash
git clone <seu-repositorio>
cd site
npm install
```

### 2. Configuração das Variáveis de Ambiente

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

### Vercel (Recomendado)

1. Conecte seu repositório no Vercel
2. Configure as variáveis de ambiente no dashboard do Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
3. Deploy automático será feito a cada push

### Outras Opções

```bash
# Netlify
npm run deploy:netlify

# Firebase Hosting
npm run deploy:firebase
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

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
