import { defineConfig } from 'vite';
import mdx from 'vite-plugin-mdx';

export default defineConfig({
  plugins: [
    mdx(), // Add MDX plugin
  ],
});

