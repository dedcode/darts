const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
});

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'mdx'], // Ensures Next.js treats .mdx as pages
});

