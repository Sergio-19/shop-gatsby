import React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { graphql } from "gatsby";
import GoodCard from "../../components/goodCard";

const Avto = (props) => {

  const goods = props.data.allMysqlGoods.nodes
  
    return (
        <Layout>
           <div className="home__sale-wrap">
         <div className="home__sale">
           <p>Прямые поставки товаров из Турции со скидкой до 70%!!!</p>
         </div>
         <div className="page__title">
                <h1>Автотовары</h1>
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

export const Head = () => <Seo title={"Авто товары, товары для ухода за автомобилем и аксессуары для автомобиля"} description = {"Товары для автолюбителей, средства и принадлежности для ухода за овтомобилем. Автомобильная электроника и аксессуары для автомобиля. Доставка товаров для автомобиля по всей России в течение пяти дней"}/>

export default Avto;

export const query = graphql`
query MyQuery {
  allMysqlGoods(filter: {category: {eq: "avto"}}) {
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