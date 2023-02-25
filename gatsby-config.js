/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Hopastore - Товары из турции, оптом с доставкой по России`,
    description: `Hopastore.ru - интернет-магазин, по продаже товаров из Турции с доставкой по России. Товары для дома, для спорта и развлечений, автотовары, одежда, электроника, детские товары, игрушки, подарки, товары для праздников и многое другое, оптом и в розницу, с доставкой по России`,
    author: ``,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    "gatsby-plugin-use-query-params",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: 'stended3.beget.tech',
          user: 'stended3_rudemy',
          password: 'Se549297',
          database: 'stended3_rudemy'
        },
        queries: [
          {
            statement: 'SELECT * FROM goods',
            idFieldName: 'article',
            name: 'goods'
          },
          {
            statement: 'SELECT * FROM points',
            idFieldName: 'article',
            name: 'points'
          }
        ]
      }
    }
  ],
}
