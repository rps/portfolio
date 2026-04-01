import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    order: z.number(),
    icon: z.string(),
    tags: z.array(z.string()),
    thumbnail: z.string().optional(),
    stack: z.array(z.string()),
    architecture: z.string().optional(),
    metrics: z.array(z.string()).optional(),
    keyDecisions: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .optional(),
    keyAchievements: z.array(z.string()).optional(),
    links: z.object({
      demo: z.string().optional(),
      github: z.string().optional(),
      betaAccess: z.boolean().optional(),
      blog: z.string().optional(),
    }),
  }),
});

export const collections = { projects };
