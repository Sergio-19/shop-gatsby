import React from 'react';
import { Link } from 'gatsby';



const Footer = () => {

    return(
        <footer>
            <div className='container'>
                <div className="footer__wrap">
                    <div className="footer__item">
                        <h4 className="'footer__item-title'">Покупателям</h4>
                        <ul>
                            <li><Link to ="/info/delivery">Как сделать заказ</Link></li>
                            <li><Link to="/info/delivery">Доставка</Link></li>
                            <li><Link to="/info/delivery">Оплата</Link></li>
                            <li><Link to="/info/delivery">Возврат денежных средств</Link></li>
                            <li><Link to="/info/delivery">Возврат товара</Link></li>
                        </ul>
                    </div>
                     <div className="footer__item">
                        <h4 className="'footer__item-title'">Компания</h4>
                        <ul>
                            <li><Link to="/info/contact">О нас</Link></li>
                            <li><Link to="/info/contact">Контакты</Link></li>
                            <li><Link to="/info/rules">Пользовательское соглашение</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer__sub">
                    <p>Интернет - магазин оптовых продаж бытовых товаров, все права защищены. 2020 год.</p>
                </div>
            </div>
        </footer>
    )
}


export default Footer;