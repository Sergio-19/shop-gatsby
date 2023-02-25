import React, {useContext, useState} from 'react';
import GoodKind from './goodKind';
import { MainContext } from './layout';
import Galery from './galery';




const GoodPageComponent = ({good, article}) => {

        const images = JSON.parse(good.images)
        const kinds = JSON.parse(good.kinds)

        const {state} = useContext(MainContext)

        const [count, setCount] = useState(0)
        const [overlay, setOverlay] = useState(false)
      
       function next(count, arr) {
        if(count >= arr.length-1){
            setCount(0)
        } else {
            setCount(count+1)
        }
    }
    
    function prev(count, arr) {
        if(count <= 0){
            setCount(0)
        } else {
            setCount(count-1)
        }
    }
    
    function showOverlay() {
        setOverlay(true)
    }
    
    function hideOverlay() {
        setOverlay(false)
    }



    return (
        <>
        <Galery images={images} 
                    next = {next} 
                    prev = {prev}
                    count = {count} 
                    hideOverlay = {hideOverlay}
                    arr = {images}
                    overlay = {overlay}
                    />
            <div className="goodpage__wrapper">
                <div className="goodpage__title">
                    <h1>{good.name}</h1>
                </div>
                <div className="goodpage__content-wrap">
                    <div className="goodpage__galery">
                        <img src= {images[0]} onClick = {showOverlay} />
                        <div className="goodpage__galery-small">
                            {images.map((image, i)=> {
                            return (
                                <div className="goodpage__galery-small-item" 
                                     key = {i}
                                     onClick = {showOverlay}
                                     >
                                    <img src= {image}/>
                                </div>
                            )
                        })}
                    </div>
                    </div>
                    <div className="goodpage__options">
                      {
                      state.cart[article] ? 
                      Object.keys(kinds).map((el, i)=> {
                                               
                                                return (
                                                <GoodKind article = {el} 
                                                          headArticle = {good.article}
                                                          option = {kinds[el].option}
                                                          price = {kinds[el].price}
                                                          key = {i}
                                                          addGood = {state.addGood}
                                                          cart = {state.cart}
                                                          sum = {state.cart[good.article][el] ? state.cart[good.article][el].amount : 1}
                                                          add = {state.cart[good.article][el] ? true : false}
                                                          />
                                                        )}) 
                                            : Object.keys(kinds).map((el, i)=> {
                                                return (
                                                    <GoodKind article = {el} 
                                                              headArticle = {good.article}
                                                              option = {kinds[el].option}
                                                              price = {kinds[el].price}
                                                              key = {i}
                                                              addGood = {state.addGood}
                                                              cart = {state.cart}
                                                              sum = {1}
                                                              add = {false}
                                                    />
                                                        )})
                                                        }
                        <div className="goodpage__price-wrap">
                            {/* <div className="goodpage__price goodpage__oldprice">
                                {oldprice ? <span>{oldprice + ' ' + '₽'}</span> : <></>} 
                            </div> */}
                            {/* <div className="goodpage__price ">
                                <span><small>Цена:</small> {good.price} ₽</span>
                            </div> */}
                        </div>
                      

                    </div>
                </div>
                <div className="goodpage__descr-title">
                    <div className="goodpage__descr-title-item">
                      <i className="fa fa-info-circle"/>  
                      <span>Описание</span>  
                    </div>
                    
                </div>
                <div className="goodpage__descr-text">
                    <p>{good.description}</p>
              
                 

                </div>

            </div>
        </>
    )

}

export default GoodPageComponent;