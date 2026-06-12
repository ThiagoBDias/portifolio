# 💻 Thiago Dias | Engenheiro de Software & Analista de Sistemas

> Portfólio focado em performance, entrega estática otimizada e arquitetura limpa. Disponível em: [www.thiagodias.dev](https://www.thiagodias.dev)

Este repositório contém o código-fonte da minha aplicação de apresentação técnica. O objetivo aqui não é o espetáculo visual, mas a demonstração de pragmatismo. Como profissional focado em ecossistemas densos (C#, .NET, Java e integrações ERP), construí esta interface para ser um catálogo rápido, direto e de alta disponibilidade para os meus projetos.

## 🏗️ Arquitetura e Decisões Técnicas

A stack foi escolhida com foco em baixo overhead e entrega rápida de conteúdo estático:

* **Framework Core:** Astro (SSG - Static Site Generation para zero JavaScript client-side desnecessário).
* **Estilização:** Tailwind CSS (Arquitetura utilitária e eliminação de CSS não utilizado no build).
* **BaaS (Backend as a Service):** Supabase (Utilizado estritamente para gestão serverless de estado/contatos).
* **Infraestrutura / CI-CD:** Deploy automatizado via Vercel com GitHub Actions.

## 🚀 Projetos em Destaque

Neste portfólio, detalho lógicas de negócio reais e ferramentas de gestão. Meu foco técnico orbita desenvolvimento backend, análise de dados e infraestrutura:

1. **T-Control (App de Gestão):** Aplicação para gestão de tarefas e controle financeiro. Foco em regras de negócio consistentes e usabilidade.
2. **Integrações e ERP Sankhya:** Experiência com suporte técnico, análise de negócios e operação de ERPs robustos no setor corporativo.
3. **C# Fundamentals:** Repositório dedicado à consolidação técnica, algoritmos e boas práticas de orientação a objetos em .NET.

## ⚙️ Execução Local

Para auditar o código ou rodar a interface localmente:

```bash
# Clone o repositório
git clone [https://github.com/ThiagoBDias/portifolio.git](https://github.com/ThiagoBDias/portifolio.git)

# Instale as dependências
cd portifolio
npm install

# Execute o servidor de desenvolvimento local
npm run dev
