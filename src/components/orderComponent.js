import React, {useContext, useState} from 'react';
import { navigate } from 'gatsby';
import { MainContext } from './layout';
import MiniLoader from './miniLoader';
import axios from 'axios';


const OrderComponent = ({goods}) => {
    

    const {state} = useContext(MainContext)
   

    const [miniLoader, setMiniLoader] = useState(false)

    function getTemplate(miniLoader) {
        if(miniLoader){
            return <MiniLoader/>
        } else {
            return <button onClick = {()=> postOrder(orderObj)}>Перейти к оплате</button>
        }
    }

    let goodsObj = {}
    goods.forEach((el)=> {
        goodsObj[el.article] = el
    })



    function cartTotal(cart) {
        let total = 0
        let keys = Object.keys(cart)

        let arr = []

        keys.forEach((k)=>{
            let x = Object.values(cart[k])
            x.map((item)=>{
                item.headArticle = k
            })
            arr = [...arr, ...x]
        })
    
        arr.forEach((el)=> {
            let kinds = JSON.parse(goodsObj[el.headArticle].kinds)
            total += (Number(kinds[el.article].price) * el.amount)
        })
        
        return total
    }


    function cartAmount(cart) {
        let amount = 0
        let keys = Object.keys(cart)

        let arr = []

        keys.forEach((k)=>{
            let x = Object.entries(cart[k])
            arr = [...arr, ...x]
        })

        arr.forEach((el)=> {
          amount+=el[1].amount
        })
        return amount
    } 


    function getCartArray(cart) {
        let keys = Object.keys(cart)
    
        let arr = []
    
        keys.forEach((k)=>{
            let x = Object.values(cart[k])
            x.map((item)=>{
                item.headArticle = k
            })
            arr = [...arr, ...x]
        })
        return arr
    }
    
    let cartArray =  getCartArray(state.cart)

    let orderObj = { order: state.order.toUpperCase(),
        name: `${state.orderInfo.name} ${state.orderInfo.surname || ''}`,
        phone: state.orderInfo.phone || '',
        email: state.orderInfo.email || '',
        address: state.orderInfo.address || '',
        delivery: state.orderInfo.check === 1 ? 'Доставка в пункт выдачи' : 'Доставка курьером',
        sum: state.orderInfo.check === 2 && state.orderInfo.address !== '' ? cartTotal(state.cart)+499 : cartTotal(state.cart),
        shop: 'hopastore',
        goods: {}
      }

      async function postOrder(obj) {
        setMiniLoader(true)
        try {
            // let order = JSON.stringify(obj)
            let order = {...obj}
            const response = await axios.post(`https://sergio19.store/pay/makepayment`, {order})
            
            if(response.data.payment){
              const {payment} = response.data
            const confirmationURL = payment.confirmation.confirmation_url
            state.cleanCart()
            window.location.href = confirmationURL 
            } else {
                state.clearOrder()
                setMiniLoader(false)
            }

        } catch(e){
            console.log('Что-то пошло не так при переходе к оплате', e)
        }
         
    

        }




    if(state.orderInfo.name && state.orderInfo.name !== '' && state.orderInfo.phone && state.orderInfo.phone !== '' && state.orderInfo.email && state.orderInfo.email !== '' && state.orderInfo.address && state.orderInfo.address !== '') {
        return (
            <>
            <div className="order__title">
                <h2>Заказ № <strong style={{textTransform: 'uppercase', fontSize: '22px'}}>{state.order}</strong></h2>
            </div>
            <div className="cart__blocks-card cart__blocks-delivery">
                    <div className="cart__blocks-card-title">
                        <h2>Покупатель</h2>
                    </div>
                    <div className="cart__blocks-delivery-content-wrap">
                        <div className="cart__blocks-delivery-content">
                            <div className="cart__blocks-delivery-content-text">
                                 <span>Имя:</span>
                                <strong>{`${state.orderInfo.name} ${state.orderInfo.surname || ''}` || 'Не указано'}</strong>
                                <span>Телефон:</span>
                                <strong>{state.orderInfo.phone || 'Не указано'}</strong>
                                <span>E-mail:</span>
                                <strong>{state.orderInfo.email || 'Не указано'}</strong>
                                <span>Адрес доставки:</span>
                                <strong>{state.orderInfo.address || 'Не указано'}</strong>
                                <span>Способ доставки:</span>
                                <strong>{state.orderInfo.check === 1 ? 'Доставка в пункт выдачи' : "Доставка курьером"}</strong>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div className="cart__blocks-card cart__blocks-delivery">
                    <div className="cart__blocks-card-title">
                        <h2>Товары</h2>
                    </div>
                    <div className="cart__blocks-delivery-content-wrap">
                       {cartArray.map((good, i)=> {
                            let kinds = JSON.parse(goodsObj[good.headArticle].kinds)
                            orderObj.goods[good.headArticle] = {name: goodsObj[good.headArticle].name,
                                                                article: good.article,
                                                                amount: good.amount,
                                                                price: kinds[good.article].price || ''
                                                            }
                         return (
                            <div className="order__good-item" key = {i}>
                                <small>{i+1}.</small>
                                <div>
                                <span>{goodsObj[good.headArticle].name} &nbsp;
                                {kinds[good.article].option === 'Пустое поле' ? '' : (kinds[good.article].option)}
                                </span>
                                </div>
                                <span>{good.amount} ед.</span>
                            </div>
                           
                         )
                       })}
                    </div>
                </div>
                <div className="cart__order cart__blocks-card" style = {{width: '100%', marginLeft: 0}}>
                    <div className="cart__order-head">
                        <span>Итого:</span>
                        <span id= "cart__order-result" className="cart__order-head-price">{state.orderInfo.check === 2 && state.orderInfo.address !== '' ? cartTotal(state.cart)+499 : cartTotal(state.cart)} ₽</span>
                    </div>                                                                              
                    <div className="cart__order-content">
                        <div className="cart__order-content-item">
                            <span id= "cart__order-amount">Товары: {cartAmount(state.cart)} шт.</span>
                            <span id= "cart__order-sum">{cartTotal(state.cart)} ₽ </span>
                        </div>
                        <div className="cart__order-content-item">
                            <span>Доставка:</span>
                            <span id= "cart__order-delivery">{state.orderInfo.check === 1 ? 0 : 499} ₽</span>
                        </div>
                    </div>
                    <div className="cart__order-btn order__button">
                        {Object.keys(state.cart).length === 0 ? <></> : getTemplate(miniLoader)}
                    </div>
                </div> 
            </>
        ) 
    } else {
          return (
            <div className="order__wrapper">
            <div className="order__title">
                <h2>Похоже такого заказа не существует...</h2>
                <button onClick = {()=> navigate('/')}>На главную страницу</button>
            </div>
        </div>
    ) 
    }

     
    
    
}


export default OrderComponent;