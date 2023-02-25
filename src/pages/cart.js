import React from 'react';
import CartComponent from '../components/cartComponent';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { graphql } from 'gatsby';


const CartPage = ({data}) => {


const goods = data.allMysqlGoods.nodes

    return (
        <Layout>
          <CartComponent goods = {goods}/>  
        </Layout>
        
    )
}


export default CartPage;

export const Head = () => <Seo title={"Корзина"} />

export const query = graphql`
query MyQuery {
  allMysqlGoods {
    nodes {
      category
      article
      images
      kinds
      name
      price
    }
  }
}
`
