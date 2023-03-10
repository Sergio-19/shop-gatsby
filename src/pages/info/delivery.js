import React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'


const Delivery = () => {
    return(
        <Layout>
            <div className="info__wrapper">
                <div className="info__title">
                    <h3>Как сделать заказ</h3>
                </div>
                <div className="info__text">
                <p>Для того, чтобы сделать заказ для начала выберите товар, для этого можно воспользоваться формой для поиска по сайту в верхней части страницы или перейдите в раздел Категории и выберите нужную вам категорию. После этого выберите нужный товар и перейдите на страницу товара. На странице товара в галерее вы можете ознакомиться с внешним видом товара, и его описанием. Также на странице товара представлены все вариации данного товара если таковые имеются. Справа от каждой вариации товара путём нажатия кнопок + и - установите необходимое количество единиц товара и нажмите кнопку В корзину. После добавления товара в корзину, перейдите на страницу Корзина путём нажатия соответствующей кнопки в навигационной панели. На странице корзины представлены все товары, добавленные в корзину, общая сумма и другая информация. Далее ниже на странице корзины Необходимо заполнить Адрес доставки, для этого в разделе Доставка нажмите кнопку Изменить. В открывшемся окне выберите тип доставки и запоните адрес. Затем заполните поля Телефон, E-mail и Имя. После того как все обязательные поля будут заполнены нажмите Оформить заказ. После этого вы попадёте на страницу где будет полная информация о вашем заказе, если всё верно нажмите кнопку Перейти к оплате. На сайте платёжной системы произведите платёж, после этого на указанный вами электронный адрес будет отправлено письмо, в котором будет информация о заказе, трек-номер по которому вы сможете отследить заказ, а также чек подтверждающий оплату.
                    </p>
                </div>
                <div className="info__title">
                    <h3>Доставка</h3>
                </div>
                <div className="info__text">
                <p>Доставка заказов по России осуществляется силами транспортной компании СДЭК и почтой России. При оформлении заказа вы можете выбрать ближайший удобный для вас пункт выдачи заказов СДЭК, и заказ будет доставлен в выбранный пункт выдачи заказов в таком случае доставка будет бесплатной, либо вы можете указать нужный вам адрес и заказ будет доставлен курьером до указанного вами адреса в таком случае стоимость доставки будет включена в общую стоимость. Если заказ товара был осуществлён до 17:00 по Московскому времени, то заказ комплектуется на складе с день заказа, если после 17:00, то заказ комплектуется на складе на следующий день. После этого заказ будет доставлен силами транспортных компаний в пункт выдачи заказов СДЭК, либо по адресу указанному вами. При доставке курьером вы оплачиваете исключительно услуги перевозки до вашего региона. На себя мы берем оформление документов и бесплатную транспортировку вашего заказа до терминала ТК. Мы обязуемся отправить Ваш заказ в течение двух РАБОЧИХ дней после оплаты заказа, транспортной компанией или почтой России. Если ни одна из служб доставки не представлена в вашем городе или вас не устраивают сроки, то мы готовы доставить заказ любым удобным вам способом. 
                    </p>
                </div>
                <div className="info__title">
                    <h3>Оплата</h3>
                </div>
                <div className="info__text">
                <p>Оплата усуществляется картой на сайте платёжной системы https://yookassa.ru/ "Яндекс Касса". После оплаты на указанный вами электронный адрес будет отправлен чек, подтверждающий оплату заказа. 
                    </p>
                </div>
                <div className="info__title">
                    <h3>Возврат денежных средств</h3>
                </div>
                <div className="info__text">
                <p>В случае если ваш заказ не будет доставлен в указанные сроки, или по иным объективным причинам, вы всегда можете оформить возврат денежных средств. Для этого перейдите в раздел Контакты и напишите наv, укажите причину по которой необходимо оформить возврат денежных средств, номер заказа, и прикрепите чек, подтверждающий факт оплаты. Денежные средства будут возвращены в установленные сроки.
                    </p>
                </div>
                <div className="info__title">
                    <h3>Возврат товара</h3>
                </div>
                <div className="info__text">
                <p>В случае если доставленный товар оказался бракованным, ненадлежащего качества, либо не соответствует заявленным на сайте характеристикам, вы всегда можете оформить возврат товара. Для возврата товара перейдите в раздел Контакты и напишите нам, далее от наших менеджеров вы получите все необходимые инструкции.
                    </p>
                </div>
           </div>
        </Layout>
    )
}

export default Delivery;

export const Head = () => <Seo title="Как сделать заказ | Как оплатить заказ | Возврат денежных средств | Возврат товара" />