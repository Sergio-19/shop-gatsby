import React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import GoodCard from "../../components/goodCard";
import { graphql } from "gatsby";

const PodarkiKhobbi = (props) => {

  const goods = props.data.allMysqlGoods.nodes

    return (
        <Layout>
           <div className="home__sale-wrap">
         <div className="home__sale">
           <p>Прямые поставки товаров из Турции со скидкой до 70%!!!</p>
         </div>
         <div className="page__title">
                <h1>Подарки и хобби</h1>
            </div>
      </div>
      <div className="home__content-wrap">
         <div className="home__content">
        {goods.map((good, i)=> {
          const images = JSON.parse(good.images)
          return (
            <GoodCard 
            article = {good.article}
            image = {images[0]}
            title = {good.name}
            price = {good.price}
            key = {i}
            />
          )
        })}
         </div>
 
      </div> 
        </Layout>
        
    )
}

export const Head = () => <Seo title={"Хобби и творчество"} description={"Товары для хобби и творчества. Мозаики, картины. Алмазные мозаики и картины из страз."} />
export default PodarkiKhobbi;

export const query = graphql`
query MyQuery {
  allMysqlGoods(filter: {category: {eq: "podarki_i_khobbi"}}) {
    nodes {
      category
      article
      images
      price
      name
    }
  }
}
`