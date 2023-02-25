import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { graphql } from 'gatsby'
import GoodPageComponent from '../components/goodPageComponent'

const GoodPage = (props) => {
        const good = props.data.mysqlGoods

    return (
        <Layout>
            <GoodPageComponent good = {good} article = {props.pageContext.article}/>
        </Layout>
    )
}

export const Head = (props) => {
  return(
  <Seo title={props.data.mysqlGoods.name} description={props.data.mysqlGoods.description} />
)} 

export default GoodPage;

export const query = graphql`
query MyQuery($article: Date) {
    mysqlGoods(article: {eq: $article}) {
      name
      article
      category
      description
      images
      kinds
      price
    }
  }
`