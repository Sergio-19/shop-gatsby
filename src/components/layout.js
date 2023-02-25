
import React, {createContext, useState, useEffect} from "react";
import Header from "./header";
import Footer from "./footer";
import "../styles/app.scss";
import axios from "axios";
import generatePassword from '../generate.password';
import { navigate } from "gatsby";



export const MainContext = createContext()


const Layout = (props) => {

//STATE  

const [cart, setCart] = useState({})
const [cartLoad, setCartLoad] = useState(false)
const [deliveryAddress, setDeliveryAddress] = useState('')
const [deliveryCheck, setDeliveryCheck] = useState(1)
const [personal, setPersonal] = useState({formcontrolls: { phone: {value: '', valid: false, touched: false},
                                                           email: {value: '', valid: false, touched: false},
                                                           name: {value: '', valid: false, touched: false},
                                                           surname: {value: '', valid: true}
                                                         },
                                          formValid: false                
                                          })

const [login, setLogin] = useState({formcontrolls: {phone: {value: '', valid: false, touched: false},
                                                      email: {value: '', valid: false, touched: false}
                                                    },
                                                    formValid: false,
                                                    message: ''
                                                  })                                          
const [showModal, setShowModal] = useState(false)  

const [points, setPoints] = useState({})
const [loadPoints, setLoadPoints] = useState(true)  
const [pointsMessage, setPointsMessage] = useState('') 
const [searchPointsValue, setSearchPointsValue] = useState('') 
const [order, setOrder] = useState('')//номер заказа
const [orderInfo, setOrderInfo] = useState({})  
const [search, setSearch] = useState('')                                 

//STATE



useEffect(()=> {
  getLocalStorage()
  getOrder()
  
}, [])

//функция для получения номера заказа

function getOrder() {
  setOrder(generatePassword(10))
}


//очистка корзины после оплаты
function cleanCart() {
  localStorage.removeItem('cart')
  localStorage.removeItem('order')
}

function clearOrder() {
    setOrder('')
}

 //функция выборки из localStorage

async function getLocalStorage() {
  setCartLoad(false)
 await Object.keys(localStorage).forEach((el)=> {
    if(el === 'cart') {
      const localCart = JSON.parse(localStorage[el])
      setCart(localCart)
    }
    if(el === 'order') {
      const localOrder = JSON.parse(localStorage[el])
      setOrderInfo(localOrder)
    }
    if(el === 'user') {
      const localUser = JSON.parse(localStorage[el])
      const personalCopy = {...personal}
      personalCopy.formcontrolls.email.touched = true
      personalCopy.formcontrolls.email.valid = true
      personalCopy.formcontrolls.email.value = localUser.email
      personalCopy.formcontrolls.name.touched = true
      personalCopy.formcontrolls.name.valid = true
      personalCopy.formcontrolls.name.value = localUser.name
      personalCopy.formcontrolls.phone.touched = true
      personalCopy.formcontrolls.phone.valid = true
      personalCopy.formcontrolls.phone.value = localUser.phone
    }
  })
  setCartLoad(true)
 }


  //функция добавления товара в корзину
  async function cartStringify(cart) {
    let local = {}
    Object.keys(cart).forEach((el)=> {
        local[el] = JSON.stringify(cart[el])
     }) 
    await addLocaleStorage(local)  
  }

  function addLocaleStorage(cart) {
    const newCart = {...cart}
    const copyNewCart = JSON.stringify(newCart)
    localStorage.cart = copyNewCart
  }
  
  function addGood(headArticle, article, amount) {
    let newCart = {...cart}
    if(newCart[headArticle]){
      newCart[headArticle] = {...cart[headArticle], [article]: {article, amount}} 
      setCart({...newCart})
    } else {
      newCart[headArticle] = {[article]: {article, amount}}
      setCart({...newCart})
    }
   
    addLocaleStorage(newCart)
   
  }


    //функция удаления товара из корзины

    function deleteGood(headArticle ,article) {
      let cartCopy = {...cart}

      if(Object.keys(cartCopy[headArticle]).length > 1){
        delete cartCopy[headArticle][article]
        setCart({...cartCopy})
        localStorage.removeItem('cart')
        const copyNewCart = JSON.stringify(cartCopy)
        localStorage.cart = copyNewCart
      } else {
        delete cartCopy[headArticle]
        setCart({...cartCopy})
        localStorage.removeItem('cart')
        const copyNewCart = JSON.stringify(cartCopy)
        localStorage.cart = copyNewCart
      
      }
      
    }


    //изменение количества товаров в корзине

  function goodIncrement(headArticle ,article) {
    let cartCopy = {...cart}
    let amount = cartCopy[headArticle][article].amount
    cartCopy[headArticle][article].amount = amount + 1
    setCart({...cartCopy})
    localStorage.removeItem('cart')
        const copyNewCart = JSON.stringify(cartCopy)
        localStorage.cart = copyNewCart
    
  }

  function goodDecrement(headArticle ,article) {
    let cartCopy = {...cart}
    let amount = cartCopy[headArticle][article].amount
    cartCopy[headArticle][article].amount = amount === 1 ? amount : amount - 1
    setCart({...cartCopy})
    localStorage.removeItem('cart')
    const copyNewCart = JSON.stringify(cartCopy)
    localStorage.cart = copyNewCart
    
  }

  function showModalHandler() {
    setShowModal(true)
  }
  
  function hideModalHandler() {
    setShowModal(false)
  }
  
  function deliveryCheckHandler(num) {
    setDeliveryCheck(num)
  }

    //функция запрос для поиска пунктов 

    async function getPoints(search) {
      setLoadPoints(false)
      setPointsMessage('')
      setPoints({})
      const response = await axios.post('https://sergio19.store/store/deliverypoints', {search})
        if(response.data.success) {
          let arr = response.data.points
          let points = {}
          arr.forEach((point)=>{
          points = {...points, [point.article]: {...point}}
          })
          setPoints(points)
      setLoadPoints(true)    
        } else {
          setPointsMessage('Поиск не дал результатов, проверьте правильность запроса...')
        }
  }

  //функция ввода в инпут
  function changeInputPoints(e) {
    setSearchPointsValue(e.target.value)
  }

  //функция сохранения адреса пункта выдачи
function saveAddress(address) {
  setDeliveryAddress(address)
  hideModalHandler()
}

//функция для валидации поля email
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//валидация полей ввода
function fieldValidator(value, type) {
    switch(type) {
        case 'phone':
          let valid = value.length < 9 ? false : true
          return valid
        case 'email':
          let emailValid = validateEmail(value) ? true : false
          return emailValid
        case 'name':
          let nameValid = value.length < 3 ? false : true
          return nameValid
      default:
        return false
    }
}

//изменение полей ввода персональных данных и валидация

function changePersonal(event, type) {
  let personalCopy = {...personal}
  personalCopy.formcontrolls[type].touched = true
  personalCopy.formcontrolls[type].value = event.target.value
  personalCopy.formcontrolls[type].valid = fieldValidator(event.target.value, type)
  personalCopy.formValid = allValidation(personal)
  setPersonal({...personalCopy})
}

//функция общей валидации формы
function allValidation(personalCopy){
  let validator = false
  if(personalCopy.formcontrolls.phone.valid && personalCopy.formcontrolls.email.valid && personalCopy.formcontrolls.name.valid){
    validator = true
  }
  return validator
}


//функция валидации формы на странице login
function loginValidation(copy) {
  let validator = false
  if(copy.formcontrolls.phone.valid && copy.formcontrolls.email.valid){
    validator = true
  }
  return validator
}

//изменение полей ввода на странице login
function changeLogin(event, type) {
  let loginCopy = {...login}
  loginCopy.formcontrolls[type].touched = true
  loginCopy.formcontrolls[type].value = event.target.value
  loginCopy.formcontrolls[type].valid = fieldValidator(event.target.value, type)
  loginCopy.formValid = loginValidation(login)
  setLogin({...loginCopy})
}

//вход в профиль
async function loginHandler(phone, email) {
  const data = {phone, email}

  const response = await axios.post(`https://sergio19.store/store/login`, {data})
  if(response.data.success) {
    const loginCopy = {...login}
    loginCopy.message = response.data.message
    setLogin({...loginCopy})
    const user = response.data.user
    const userStr = JSON.stringify(user)
    localStorage.setItem('user', userStr)

    setTimeout(()=> {
      navigate('/')
    }, 1500)
  } else {
    const loginCopy = {...login}
    loginCopy.message = response.data.message
    setLogin({...loginCopy})
  }

}

//поиск по сайту

function changeSearch(event) {
  setSearch(event.target.value)
}

function cleanSearch() {
  setSearch('')
}


  return (
    <MainContext.Provider value = {{state: {
      cart,
      cartLoad,
      deliveryAddress,
      deliveryCheck,
      showModal,
      points, //пункты выдачи
      loadPoints, // пункты выдачи загрузились или нет
      pointsMessage, // Сообщение если пункты выдачи не найдены 
      searchPointsValue, //запрос поиску пунктов выдачи
      personal,
      order, //номер заказа
      orderInfo,
      login,
      search,
      changeInputPoints,
      getPoints, // запрос на поиск пунктов выдачи
      addGood,
      deleteGood,
      goodIncrement,
      goodDecrement,
      showModalHandler,
      hideModalHandler,
      deliveryCheckHandler,
      saveAddress,
      changePersonal,
      cleanCart,
      clearOrder,
      changeLogin,
      loginHandler,
      changeSearch,
      cleanSearch
    }}}>
      <div className="main">
            <Header />
            <div className='container'>
                {props.children}
            </div>
            <Footer />        
        </div>
    </MainContext.Provider>
    
  )
}

export default Layout;


