import { navigate } from 'gatsby';
import React, {useContext, useEffect, useState} from 'react'
import { MainContext } from './layout';


const LoginComponent = () => {

    const {state} = useContext(MainContext)
    const [user, setUser] = useState(null   )

    const {formcontrolls, formValid} = state.login


    
    function inputValidation(valid, touched) {
        const classes = ['input__normal']
        if(valid && touched){ classes.push('input__valid')}
        if(!valid && touched){classes.push('input__invalid')}

        return classes.join(' ')
    }


    function isUser() {
        if(localStorage.user){
            const newUser = JSON.parse(localStorage.user)
            setUser(newUser)
        }
    }

    useEffect(()=> {
        isUser()
    }, [])


    if(user){
        return (
            <div>{navigate('/')}</div>
        )
    } else {
        return (
            <div className="order__wrapper">
            <div className="login__title">
                <p>Уже заказывали у нас? Войдите в профиль, для этого введите в форму ваш телефон и E-mail.</p>
            </div>
            <div className="personal__form login__form">
                    <div className="personal__from-item login__form-item">
                        <label><small>*</small>Телефон</label>
                        <input type = 'number' 
                               defaultValue={formcontrolls.phone.value}
                               className = {inputValidation(formcontrolls.phone.valid, formcontrolls.phone.touched)}
                               onChange = {(event)=> state.changeLogin(event, 'phone')}
                               />
                    </div>
                    <div className="personal__from-item login__form-item">
                        <label><small>*</small>E-mail</label>
                        <input type = 'text' 
                               defaultValue={formcontrolls.email.value} 
                               className = {inputValidation(formcontrolls.email.valid, formcontrolls.email.touched)}
                               onChange = {(event)=> state.changeLogin(event, 'email')}
                               />
                    </div>
              
    
                </div>
                <div className="login__message">
                    <p>{state.login.message}</p>
                </div>
                <div className="cart__order-btn order__button">
                    <button onClick = {()=> state.loginHandler(formcontrolls.phone.value, formcontrolls.email.value)} disabled = {!formValid}>Войти</button>
                </div>
        </div>
        )
    }
}


export default LoginComponent;