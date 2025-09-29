# 📊 Guia de Configuração: Analytics & Monitoramento

Este guia te ajudará a configurar completamente o sistema de analytics e monitoramento do seu portfólio.

## 🔧 1. Google Analytics 4 (GA4)

### Configuração Inicial:
1. **Acessar Google Analytics**: [analytics.google.com](https://analytics.google.com)
2. **Criar Conta**: 
   - Nome da conta: "Portfolio Thiago Dias"
   - Nome da propriedade: "thiagodias.dev"
   - Fuso horário: America/São_Paulo
3. **Configurar Stream de Dados**:
   - Plataforma: Web
   - URL do site: https://thiagodias.dev
   - Nome do stream: "Portfolio Web"

### Obter Measurement ID:
1. Vá em **Admin** > **Streams de dados**
2. Clique no seu stream web
3. Copie o **Measurement ID** (formato: G-XXXXXXXXXX)
4. **SUBSTITUA no código**: `src/layouts/Layout.astro` linha 56

```astro
<CustomAnalytics googleAnalyticsId="SEU_MEASUREMENT_ID_AQUI" />
```

### Eventos Personalizados Incluídos:
- ✅ `project_click` - Cliques em projetos
- ✅ `project_demo` - Cliques em demos
- ✅ `project_github` - Cliques no GitHub
- ✅ `social_click` - Cliques em redes sociais
- ✅ `cv_download` - Download do CV
- ✅ `form_submit` - Envio de formulários
- ✅ `scroll_depth` - Profundidade de scroll
- ✅ `time_on_page` - Tempo na página
- ✅ `web_vital` - Core Web Vitals
- ✅ `javascript_error` - Erros JavaScript

## 🔍 2. Google Search Console

### Configuração:
1. **Acessar**: [search.google.com/search-console](https://search.google.com/search-console)
2. **Adicionar Propriedade**:
   - Tipo: Prefixo de URL
   - URL: https://thiagodias.dev
3. **Verificação de Propriedade** (escolha um método):

#### Método 1: Arquivo HTML
1. Baixe o arquivo de verificação
2. Coloque em `public/google[código].html`
3. Acesse: https://thiagodias.dev/google[código].html
4. Clique em "Verificar"

#### Método 2: Meta Tag (Recomendado)
1. Copie a meta tag fornecida
2. Adicione no `src/components/SEOHead.astro`:
```astro
<meta name="google-site-verification" content="SEU_CODIGO_AQUI" />
```

### Submeter Sitemap:
1. No Search Console, vá em **Sitemaps**
2. Adicione o URL: `https://thiagodias.dev/sitemap-index.xml`
3. Clique em "Enviar"

## 📈 3. Configuração de Eventos Avançados

### Para rastrear downloads de CV:
```html
<a href="/cv.pdf" data-cv-download>Download CV</a>
```

### Para rastrear links sociais:
```html
<a href="https://github.com/ThiagoBDias" data-social="github">GitHub</a>
<a href="https://linkedin.com/in/thiago" data-social="linkedin">LinkedIn</a>
```

### Para rastrear formulários:
```html
<form data-contact-form>
  <!-- campos do formulário -->
</form>
```

## 🎯 4. Métricas Importantes para Acompanhar

### No Google Analytics:
- **Usuários únicos** vs **Visualizações de página**
- **Taxa de rejeição** (idealmente < 50%)
- **Tempo médio na página** (idealmente > 2 minutos)
- **Páginas mais visitadas**
- **Origem do tráfego** (Organic, Direct, Referral, Social)
- **Dispositivos** (Desktop vs Mobile)
- **Localização geográfica** dos visitantes

### Eventos Customizados:
- **Cliques em projetos** - quais projetos geram mais interesse
- **Downloads de CV** - quantas pessoas baixam seu currículo
- **Cliques em redes sociais** - qual plataforma tem mais engajamento
- **Formulário de contato** - taxa de conversão

### Core Web Vitals:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms  
- **CLS** (Cumulative Layout Shift): < 0.1

## 🚨 5. Monitoramento de Erros

### Erros Automáticos Rastreados:
- **JavaScript errors** - erros de código
- **Promise rejections** - promessas não tratadas
- **Performance issues** - problemas de carregamento

### Como Visualizar:
1. No GA4: **Eventos** > Filtrar por "javascript_error"
2. Analise: mensagem, arquivo, linha do erro

## 🎛️ 6. Dashboard Personalizado (Opcional)

### No Google Analytics:
1. Vá em **Relatórios** > **Biblioteca**
2. Crie um **Relatório personalizado**
3. Adicione as métricas:
   - Usuários ativos
   - Visualizações de página
   - Taxa de engajamento
   - Eventos de conversão (CV download, contato)

### Widgets Recomendados:
- **Gráfico de linha**: Usuários por dia
- **Tabela**: Páginas mais visitadas  
- **Cartões de métrica**: Taxa de rejeição, tempo médio
- **Gráfico de pizza**: Dispositivos (Desktop/Mobile)

## 🔧 7. Configurações Avançadas

### Privacy e LGPD:
- Os analytics só são carregados em produção
- Dados são anonimizados por padrão
- IP é mascarado automaticamente

### Debug Mode:
Em desenvolvimento, ative o debug:
```astro
<CustomAnalytics enableDebug={true} />
```

### Hotjar (Opcional):
Para heatmaps e gravações de sessão:
1. Crie conta em [hotjar.com](https://hotjar.com)
2. Descomente e configure o código em `src/components/Analytics.astro`

## ✅ 8. Checklist de Validação

### Antes do Go-Live:
- [ ] Google Analytics ID configurado
- [ ] Search Console verificado
- [ ] Sitemap submetido
- [ ] Eventos customizados testados
- [ ] Meta tag de verificação adicionada
- [ ] URLs canônicas funcionando
- [ ] Analytics carregando apenas em produção

### Teste de Eventos:
1. **Abra o site** em modo incógnito
2. **Abra DevTools** > Console
3. **Navegue pelo site** e observe os eventos no console (se debug ativo)
4. **Acesse GA4** em tempo real para ver os eventos

### Depois do Deploy:
- [ ] Verificar dados chegando no GA4 (Tempo Real)
- [ ] Confirmar sitemap indexado no Search Console
- [ ] Monitorar Core Web Vitals
- [ ] Configurar alertas para erros críticos

## 📞 Suporte

Se você encontrar problemas:
1. Verifique o console do navegador
2. Confira se o Measurement ID está correto
3. Teste em modo incógnito
4. Aguarde até 24h para dados aparecerem completamente

---

**🎉 Pronto! Seu portfólio agora tem analytics profissionais configurados!**