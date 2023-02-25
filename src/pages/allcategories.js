import React from 'react';
import CategoryCard from '../components/categoryCard';
import Layout from '../components/layout';
import Seo from '../components/seo';
import cat1 from '../images/tovaridlyadoma.png'
import cat2 from '../images/krasota_i_zdorove.png'
import cat3 from '../images/elektronika.png'
import cat4 from '../images/detskie_tovary.png'
import cat5 from '../images/podarki_i_khobbi.png'
import cat6 from '../images/tv-tovari.jpg'
import cat7 from '../images/sport_i_otdykh.png'
import cat8 from '../images/avto.png'
import cat9 from '../images/Noviy_god.png'
import cat10 from '../images/clothes.png'


const AllCategories = () => {

    const categories = [
        {title: 'Товары для дома',
         category: 'tovary_dlya_doma',
         image: cat1
        },
        {title:'Красота и здоровье',
         category: 'krasota_i_zdorove',
         image: cat2
        },
        {title: 'Электроника',
         category: 'elektronika', 
         image: cat3
        },
        {title: 'Детские товары',
         category: 'detskie_tovary',
         image: cat4
        },
        {title: 'Подарки и хобби',
         category: 'podarki_i_khobbi', 
         image: cat5
        },
        {title: 'TV-товары',
         category: 'tv-tovari', 
         image: cat6
        },
        {title: 'Спорт и отдых',
         category: 'sport_i_otdykh', 
         image: cat7
        },
        {title: 'Автотовары',
        category: 'avto',
        image: cat8
        },
        {title: 'Товары к празднику',
         category: 'Noviy_god', 
         image: cat9
        },
        {title: 'Текстиль и аксессуары',
         category: 'clothes', 
         image: cat10
        }
  
     ]

    return (
        <Layout>
         <div className="home__sale-wrap">
            <div className="home__sale">
              <p>Товары для Нового Года со скидкой до 70%!!!</p>
            </div>
         </div>
         <div className="page__title">
                <h3>Категории</h3>
            </div>
         <div className="home__content-wrap">
            <div className="home__content">
            {categories.map((el, i)=> {
               const {title, category, image} = el
               return (
                  <CategoryCard  title = {title}
                                 category = {category}
                                 image = {image}
                                 key = {i}
                  />
               )
             })}
            </div>
    
         </div>
        </Layout>
      )
}

export const Head = () => <Seo title="Все категории" description = "Hopastore. В Интернет-магазине hopastore вы найдёте товары в категориях: товары для дома, товары для красоты и здоровья, электроника, товары для детей, игрушки, подарки, хобби творчество и развлечения, спортивные и автотовары, товары для праздников, одежда, текстиль и аксессуары."/>

export default AllCategories;