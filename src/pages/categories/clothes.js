import React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import GoodCard from "../../components/goodCard";
import { graphql } from "gatsby";

const Clothes = (props) => {
  const goods = props.data.allMysqlGoods.nodes
    return (
        <Layout>
           <div className="home__sale-wrap">
         <div className="home__sale">
           <p>Прямые поставки товаров из Турции со скидкой до 70%!!!</p>
         </div>
         <div className="page__title">
                <h1>Аксессуары и текстиль</h1>
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

export const Head = () => <Seo title={"Нашивки, шевроны, текстиль и аксессуары"} description={"Нашивки и патчи на одежду. Текстиль и аксессуары. Нашивки: 'Вежливые люди', 'солдат Z' и другие популярные нашивки, все товары в наличии, доставка в течение пяти дней."} />
export default Clothes;

export const query = graphql`
query MyQuery {
  allMysqlGoods(filter: {category: {eq: "clothes"}}) {
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