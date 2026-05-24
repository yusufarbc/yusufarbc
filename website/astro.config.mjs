import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://yusufarbc.dev",
  trailingSlash: "ignore",
  prefetch: true,
  build: {
    format: "directory",
    assets: "_assets",
  },
  integrations: [sitemap()],
  markdown: {
    gfm: true,
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: false,
    },
  },
});