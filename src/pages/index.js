import * as React from "react"
import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import GoodCard from "../components/goodCard"




const IndexPage = (props) => { 
  const goods = props.data.allMysqlGoods.nodes

  

  function getRandomNum(l) {
    let num = Math.floor(Math.random()*l)
    return num
  }

  let randomNumber = []

  for(let i = 0; i < 12; i++){
    randomNumber.push(getRandomNum(1700))
  }
  
  let randomGoods = []

  randomNumber.forEach((num)=> {
    randomGoods.push(goods[num])
  })

 
   return (
  <Layout >
   
      <div className="home__sale-wrap">
          <div className="home__sale">
            <h1 style = {{fontSize: '16px', fontWeight: 'normal'}}>Оптовые поставки товаров из Турции по всей России, скидки до 70%!!!</h1>
          </div>
      </div>
      <div className="home__content-wrap">
          <div className="home__sidebar">
            <p>Категории</p>
            <ul>
              {/* <li><Link href = '/categories/catalog'>Весь каталог</Link></li> */}
              <li><Link to = '/categories/tovary_dlya_doma'>Товары для дома</Link></li>
              <li><Link to = '/categories/krasota_i_zdorove'>Красота и здоровье</Link></li>
              <li><Link to = '/categories/elektronika'>Электроника</Link></li>
              <li><Link to = '/categories/detskie_tovary'>Детские товары</Link></li>
              <li><Link to = '/categories/podarki_i_khobbi'>Подарки и хобби</Link></li>
              <li><Link to = '/categories/tv-tovari'>TV-товары</Link></li>
              <li><Link to = '/categories/sport_i_otdykh'>Спорт и отдых</Link></li>
              <li><Link to = '/categories/avto'>Автотовары</Link></li>
              <li><Link to = '/categories/Noviy_god'>Новый год</Link></li>
              <li><Link to = '/categories/clothes'>Одежда</Link></li>
              {/* <li><Link href = '/categories/sale'>Ликвидация</Link></li> */}
            </ul>
  
  
          </div>
          <div className="home__content">
             {randomGoods.map((good, i)=> {
              let imgArray = JSON.parse(good.images)
              return (
                <GoodCard 
                article = {good.article}
                image = {imgArray[0]}
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

export const Head = () => <Seo title="Главная страница" />

export default IndexPage

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
