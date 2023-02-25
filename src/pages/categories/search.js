import React from 'react';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import SearchPageComponent from '../../components/searchPageComponent';
import { graphql } from 'gatsby';


const SearchPage = (props) => {

  const goods = props.data.allMysqlGoods.nodes

    return (
      <Layout>
        <SearchPageComponent goods = {goods}/>
     </Layout>
    )
}

export const Head = () => <Seo title={"Страница поиска"} />
export default SearchPage;

export const query = graphql`
query MyQuery {
  allMysqlGoods {
    nodes {
      article
      name
      price
      images
    }
  }
}
`