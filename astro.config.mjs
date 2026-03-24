// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  site: "https://richparrish.dev",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx()],
});
