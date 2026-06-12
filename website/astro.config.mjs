import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://yusufarbc.dev",
  trailingSlash: "always",
  prefetch: true,
  build: {
    format: "directory",
    assets: "_assets",
  },
  image: {
    domains: ["cdn-images-1.medium.com"],
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const pathname = url.pathname;
        if (pathname === "/" || pathname === "") {
          return false;
        }
        if (pathname.includes("/posts/")) {
          return false;
        }
        if (pathname.includes("/series/")) {
          return false;
        }
        return true;
      },
    }),
  ],
  markdown: {
    gfm: true,
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: false,
    },
  },
});