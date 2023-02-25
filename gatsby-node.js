const path = require('path');

exports.createPages = async ({graphql, actions}) => {
    const {data} = await graphql(`
    query MyQuery {
      allMysqlGoods {
        nodes {
          article
        }
      }
    }
    `)
    data.allMysqlGoods.nodes.forEach(element => {
      actions.createPage({
        path: `/good/${element.article}`,
        component: path.resolve('./src/templates/good.js'),
        context: {article: element.article}
      })
    });
}

// exports.createPages = async ({graphql, actions}) => {
//   const {data} = await graphql(`
//   query MyQuery {
//     allMysqlGoods {
//       nodes {
//         category
//       }
//     }
//   }
//   `)
//   data.allMysqlGoods.nodes.forEach(element => {
//     actions.createPage({
//       path: `/categories/${element.category}`,
//       component: path.resolve('./src/templates/category.js'),
//       context: {category: element.category}
//     })
//   });
// }
