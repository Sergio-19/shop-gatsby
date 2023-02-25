import React from 'react';
import Seo from '../components/seo';
import Layout from '../components/layout';
import OrderComponent from '../components/orderComponent';
import { graphql } from 'gatsby';


const OrderPage = ({data}) => {

    const goods = data.allMysqlGoods.nodes

    return (
        <Layout>
            <OrderComponent goods = {goods}/>
        </Layout>
    )
}

export default OrderPage;

export const Head = () => <Seo title={"Страница подтверждения заказа"} />

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