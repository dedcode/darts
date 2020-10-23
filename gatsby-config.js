const path = require('path');

module.exports = {
  siteMetadata: {
    siteUrl: 'https://dlibin.net',
    title: 'Danny Libin Personal Website',
    description: 'Danny Libin Personal Website',
    author: 'Danny Libin'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/content/assets`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-code-titles',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000
            }
          },
          'gatsby-remark-prismjs'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-46730596-2',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false
        // Avoids sending pageview hits from custom paths
        //exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        //pageTransitionDelay: 0,
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Danny Libin',
        short_name: 'Danny Libin',
        start_url: '/',
        background_color: '#white',
        theme_color: '#006aff',
        display: 'minimal-ui',
        icon: 'src/content/assets/images/dl-favicon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require(`tailwindcss`),
          ...(process.env.NODE_ENV === 'production'
            ? [require(`autoprefixer`), require(`cssnano`)]
            : [])
        ]
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        content: [
          path.join(process.cwd(), 'src/**/!(*.d).{ts,js,jsx,tsx,md,mdx}')
        ]
        //purgeOnly: [`src/css/style.css`]
      }
    },
    // Support for downloading or pre-caching pages, needed for PWAs
    'gatsby-plugin-offline'
  ]
};
