import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import basicSsl from '@vitejs/plugin-basic-ssl'
import embeds from 'astro-embed/integration'

// https://astro.build/config
export default defineConfig({
  site: "https://vtsynthsociety.netlify.app",
  output: 'server',
  adapter: netlify(),
  integrations: [embeds(), mdx(), sitemap(), tailwind(), react(), markdoc(), keystatic()],
  vite: {
    plugins: [basicSsl()],
    server: {
      // https on local is necessary for keystatic admin to work with LAN ip addresses (rather than localhost)
      https: true,
    },
  },
});
