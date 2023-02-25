import React, {useContext} from 'react'
import { navigate, Link } from 'gatsby';
import { MainContext } from './layout';





const Header = () => {

    const {state} = useContext(MainContext)

    

    
    
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


   async function searchHandler(event, query) {
        if(event.code === 'Enter'){
            await localStorage.setItem('search', query)
            await state.cleanSearch()
            if(window.location.pathname === "/categories/search/") {
                window.location.reload()
            }
            navigate(`/categories/search`)
        }
    }

    async function searchMouseHandler(event, query) {
        await localStorage.setItem('search', query)
            await state.cleanSearch()
            if(window.location.pathname === "/categories/search/") {
                window.location.reload()
            }
            navigate(`/categories/search`)
    }



    return (
        <>
        <header>
            <div className="container">
                <div className="header__content">
                    <div className="header__logo">
                        <Link to="/">Hopa_Store</Link>
                    </div>
                    <div className="header__search">
                        <div className="header__search__wrap">
                           <i className="fa fa-search" onClick = {(event)=> searchMouseHandler(event, state.search)}/>  
                           <input type= 'text' 
                                  placeholder='Поиск' 
                                  defaultValue={state.search}
                                  onChange = {(event)=> state.changeSearch(event)}
                                  onKeyDown = {(event)=> searchHandler(event, state.search)}
                                  />       
                        </div>
                    </div>
                    <div className="header__icons">
                        <div className="header__icons-item" onClick = {()=> navigate('/login')}>
                            <i className="fa fa-user"/>
                            <span>Профиль</span>
                        </div>
                        <div className="header__icons-item" onClick = {()=> navigate('/allcategories')}>
                            <i className="fa fa-folder"/>
                            <span>Категории</span>
                        </div>
                        <div className="header__icons-item header__icons-cart" onClick = {()=> navigate('/cart')}>
                            <small className="header__cart-round">{cartResult(state.cart)}</small>
                            <i className="fa fa-shopping-cart"/>
                            <span>Корзина</span>
                        </div>
                    </div>
                </div>
            </div>    
        </header>
        <div className="navpanel">
            <div className="container">
                <div className="navpanel__content">
                    <div className="header__icons-item" onClick = {()=> navigate('/')}>
                            <i className="fa fa-home"/>
                            <span>Главная</span>
                    </div>
                    <div className="header__icons-item" onClick = {()=> navigate('/allcategories')}>
                            <i className="fa fa-folder"/>
                            <span>Категории</span>
                    </div>
                    <div className="header__icons-item" onClick = {()=> navigate('/login')}>
                            <i className="fa fa-user"/>
                            <span>Профиль</span>
                    </div>
                    <div className="header__icons-item header__icons-cart" onClick = {()=> navigate('/cart')}>
                            {/* <small className="header__cart-round">{cartResult(state.cart)}</small> */}
                            <small className="header__cart-round">{cartResult(state.cart)}</small>
                            <i className="fa fa-shopping-cart"/>
                            <span>Корзина</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header;