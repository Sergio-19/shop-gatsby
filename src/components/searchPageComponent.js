import React, {useState, useEffect} from 'react';
import Loader from './loader';
import GoodCard from './goodCard';



const SearchPageComponent = ({goods}) => {

    
    const [goodsArr, setGoodsArr] = useState([])
    const [loadGoods, setLoadGoods] = useState(false)
    const [search, setSearch] = useState('')

    function getGoodsArr() {
        const arr = [...goods]
       if(localStorage.search) {
        const newGoodsArr = []
        setSearch(localStorage.search)
        arr.forEach((el)=> {
            if(el.name.toLowerCase().indexOf(localStorage.search.toLowerCase()) !== -1) {
                newGoodsArr.push(el)
            }
        })
        setGoodsArr([...newGoodsArr])
       }
        setLoadGoods(true)
    }

    useEffect(()=> {
        getGoodsArr()
    }, [])


    return (
        <>
         <div className="home__sale-wrap">
         <div className="home__sale">
           <p>Товары для Нового Года со скидкой до 70%!!!</p>
         </div>
         <div className="page__title">
                <h1>{search !== '' && loadGoods ? `Поиск по запросу "${search}" - ${goodsArr.length}`: 'Поиск не дал результата'}</h1>
            </div>
      </div>
   {loadGoods ?    <div className="home__content-wrap">
         <div className="home__content">
        {goodsArr.map((good, i)=> {
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
 
      </div> :
         <div className="home__content-wrap">
            <Loader />
         </div>}
        </>
    )
}

export default SearchPageComponent;