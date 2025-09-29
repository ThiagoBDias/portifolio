// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Carregar variáveis de ambiente para garantir que estejam disponíveis
import dotenv from 'dotenv';
dotenv.config();

// Imprimir valores para debug
console.log('🔍 Variáveis de ambiente carregadas:');
console.log('- SUPABASE_URL:', process.env.SUPABASE_URL ? 'definido ✅' : 'não definido ❌');
console.log('- SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'definido ✅' : 'não definido ❌');
console.log('- PUBLIC_SUPABASE_URL:', process.env.PUBLIC_SUPABASE_URL ? 'definido ✅' : 'não definido ❌');
console.log('- PUBLIC_SUPABASE_ANON_KEY:', process.env.PUBLIC_SUPABASE_ANON_KEY ? 'definido ✅' : 'não definido ❌');

// https://astro.build/config
export default defineConfig({
  // Configuração otimizada para Vercel
  output: 'static',

  // Base URL configuration - ALTERE AQUI PARA SUA URL REAL
  site: 'https://thiagodias.dev', // Substitua pela sua URL real

  // Configurações de integração
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      // Customize sitemap entries
      customPages: [
        'https://thiagodias.dev/', // Homepage
        'https://thiagodias.dev/sobre',
        'https://thiagodias.dev/projetos',
        'https://thiagodias.dev/contato'
      ]
    })
  ],

  // Configurações de build otimizadas
  build: {
    format: 'file',
    inlineStylesheets: 'auto'
  },
  
  // Configurações de Vite para melhor performance
  vite: {
    define: {
      'import.meta.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL),
      'import.meta.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY),
      'import.meta.env.PUBLIC_SUPABASE_URL': JSON.stringify(process.env.PUBLIC_SUPABASE_URL),
      'import.meta.env.PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(process.env.PUBLIC_SUPABASE_ANON_KEY),
    },
    build: {
      cssMinify: true,
      minify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            supabase: ['@supabase/supabase-js']
          }
        }
      }
    },
    optimizeDeps: {
      include: ['@supabase/supabase-js', 'marked']
    }
  }
});
