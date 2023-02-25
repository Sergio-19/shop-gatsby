import React, {useContext} from 'react';
import { MainContext } from './layout';
import Loader from './loader';
import CartItem from './cartItem';
import { navigate } from 'gatsby';
import Modal from './modal';



const CartComponent = ({goods}) => {


const {state} = useContext(MainContext)

const {formcontrolls, formValid} = state.personal

function inputValidation(valid, touched) {
    const classes = ['input__normal']
    if(valid && touched){ classes.push('input__valid')}
    if(!valid && touched){classes.push('input__invalid')}

    return classes.join(' ')
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

    cartTotal(state.cart)


 
function cartResult(cart) {
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

async function goToOrderPage() {
    let orderInfo = {
        name: formcontrolls.name.value,
        surname: formcontrolls.surname.value,
        phone: formcontrolls.phone.value,
        email: formcontrolls.email.value,
        address: state.deliveryAddress,
        check: state.deliveryCheck
    }
    let info = JSON.stringify(orderInfo)
    if(localStorage.order){
        localStorage.removeItem('order')
    }
   await localStorage.setItem('order', info)
    navigate(`/order`)
  
}



if(state.cartLoad){
    return (
        <>
        <Modal />
        {cartArray.length === 0 ? <div className="cart__wrap">
            <div className="cart__blocks">
                <div className="cart__blocks-card cart__blocks-good">
                    <div className="cart__blocks-card-title" style={{padding: '40px 0'}}>
                        <h2 id= "cart__block-title">Корзина Пуста</h2>
                        <button onClick = {()=> navigate('/')}>На главную страницу</button>
                    </div>
                </div>
            </div> 
             
        </div> : 
            <div className="cart__wrap">
            <div className="cart__blocks">
                <div className="cart__blocks-card cart__blocks-good">
                    <div className="cart__blocks-card-title">
                        <h2 id= "cart__block-title">Корзина</h2>
                    </div>
                    {cartArray.map((good, i)=> {
                        const images = JSON.parse(goodsObj[good.headArticle].images)
                        const kinds = JSON.parse(goodsObj[good.headArticle].kinds)
                        return (
                           <CartItem  key = {i}
                                      image = {images[0]}  
                                      name = {goodsObj[good.headArticle].name}
                                      option = {kinds[good.article].option}
                                      amount = {good.amount}
                                      price = {kinds[good.article].price * good.amount}
                                      headArticle = {good.headArticle}
                                      article = {good.article}
                                      deleteGood = {state.deleteGood}
                                      goodIncrement = {state.goodIncrement}
                                      goodDecrement = {state.goodDecrement}
                           /> 
                        )
                    })} 
                </div>
                <div className="cart__blocks-card cart__blocks-delivery">
                    <div className="cart__blocks-card-title">
                        <h2>Доставка</h2>
                    </div>
                    <div className="cart__blocks-delivery-content-wrap">
                        <div className="cart__blocks-delivery-content">
                            <div className="cart__blocks-delivery-content-text">
                                <strong>Адрес доставки:</strong>
                                <span>{state.deliveryAddress === '' ? 'Адрес не указан' : state.deliveryAddress}</span>
                                <strong>Способ доставки:</strong>
                                <span>{state.deliveryCheck === 1 ? 'Доставка в пункт выдачи' : "Доставка курьером"}</span>
                            </div>
                            <button onClick = {state.showModalHandler}>Изменить</button>
                        </div>
                    </div>
                </div>
                <div className="cart__blocks-card cart__blocks-personal">
                    <div className="cart__blocks-card-title cart__blocks-personal-title">
                        <h2>Ваши данные</h2>
                        {localStorage.user ? <></> : <p>Уже заказывали у нас? войдите в профиль по e-mail и телефону</p>}
                        {localStorage.user ? <></> : <button onClick = {()=> navigate('/login')}>Войти</button>}
                    </div>
                    <div className="personal__form">
                        <div className="personal__from-item">
                            <label><small>*</small>Телефон</label>
                            <input type = 'number' 
                                   defaultValue={formcontrolls.phone.value}
                                   className = {inputValidation(formcontrolls.phone.valid, formcontrolls.phone.touched)}
                                   onChange = {(event)=> state.changePersonal(event, 'phone')}
                                   />
                        </div>
                        <div className="personal__from-item">
                            <label><small>*</small>E-mail</label>
                            <input type = 'text' 
                                   defaultValue={formcontrolls.email.value} 
                                   className = {inputValidation(formcontrolls.email.valid, formcontrolls.email.touched)}
                                   onChange = {(event)=> state.changePersonal(event, 'email')}
                                   />
                        </div>
                        <div className="personal__from-item">
                            <label><small>*</small>Имя</label>
                            <input type = 'text' 
                                   defaultValue={formcontrolls.name.value} 
                                   className = {inputValidation(formcontrolls.name.valid, formcontrolls.name.touched)}
                                   onChange = {(event)=> state.changePersonal(event, 'name')}
                                   />
                        </div>
                        <div className="personal__from-item">
                            <label>Фамилия</label>
                            <input type = 'text' 
                                   defaultValue={formcontrolls.surname.value} 
                                   onChange = {(event)=> state.changePersonal(event, 'surname')}
                                   className = 'input__normal'
                                   />
                        </div>

                    </div>
                    <div className="cart__blocks-card-title">
                    {formValid && state.deliveryAddress !== "" ? <button onClick = {goToOrderPage}>Оформить заказ</button> : <></>}
                    </div>
                </div>
            </div> 
            <div className="cart__order cart__blocks-card">
                    <div className="cart__order-head">
                        <span>Итого:</span>
                        <span id= "cart__order-result" className="cart__order-head-price">{state.deliveryCheck === 2 && state.deliveryAddress !== '' ? cartTotal(state.cart, state.info)+499 : cartTotal(state.cart, state.info)} ₽</span>
                    </div>                                                                              
                    <div className="cart__order-content">
                        <div className="cart__order-content-item">
                            <span id= "cart__order-amount">Товары: {cartAmount(state.cart)} ед.</span>
                            <span id= "cart__order-sum">{cartTotal(state.cart, state.info)} ₽ </span>
                        </div>
                        <div className="cart__order-content-item">
                            <span>Доставка:</span>
                            <span id= "cart__order-delivery">{state.deliveryCheck === 2 &&  state.deliveryAddress !== ''? 499 : 0} ₽</span>
                        </div>
                    </div>
                    <div className="cart__order-option">
                        <span>Адрес:</span>
                        <p>{state.deliveryAddress === '' ? 'Адрес не указан' : state.deliveryAddress}</p>
                    </div>
                    <div className="cart__order-option">
                       {state.deliveryAddress !== '' ? <><span>Доставка:</span>
                        <p>В течение пяти дней</p></> : <></>}
                    </div>
                    <div className="cart__order-option">
                        <span>Оплата:</span>
                        <p>Картой</p>
                    </div>
                    <div className="cart__order-btn">
                    {formValid && state.deliveryAddress !== "" ? <button onClick = {goToOrderPage}>Оформить заказ</button> : <></>}
                    </div>
                </div> 
        </div>
           }  
        </>
    )
} else {
    return (
        <div>
            <Loader />
        </div>
    )
}

    
}

export default CartComponent;