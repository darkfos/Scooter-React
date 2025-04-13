import { Pagination, Stack } from "@mui/material";
import { useState, Fragment, useEffect } from "react";
import ProductCard from "../../cards/ProductCard";


function PaginationScooter({items, type = "rounded", typePagination='product'}) {
    
    // Продукты
    const [dataItems, setItems] = useState([]);
    
    // Страница
    const [currentPage, setCurrentPage] = useState(1);

    // Настройки
    const spacing = 2;
    const maxLength = typePagination === "product" ? 10 : 4;


    /**
     * Переход между страницами
     * @param {*} e 
     */
    const changePage = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({top: 0, behavior: "smooth"});
    
        let pageList = [];
        let cnt = 0;
        value--;
    
        while (cnt < maxLength) {
          if ((maxLength*value+cnt) >= items.length) {
            break;
          } else {
            pageList.push(items[maxLength*value+cnt]);
          }
          cnt++;
        }
    
        // Установка продуктов на страницу
        setItems(pageList);
    }


    /**
     * Прослушивание изменения items
     */
    useEffect(() => {
        if (items) {
            setItems([...items]);
            changePage(null, currentPage);
        }
    }, [items]);


    return (
        <Fragment>
            {typePagination === "product" ?
                <div className="cards-container">
                    {dataItems.length > 0 ? (
                        dataItems.map((item) => (
                        <ProductCard 
                            id={item.id_product}
                            stock={item.quantity_product}
                            type={item.type_pr}
                            brand={item.brand_mark}
                            category={item.id_sub_category}
                            model={item.models}
                            image={item.photo[0]? item.photo[0].photo_url : null}
                            name={item.title_product}
                            price={item.price_product}
                            article={item.article_product}
                            extra={item.explanation_product}
                            dimensions={item.weight_product}
                            tags={item.label_product}
                        />
                        ))
                    ) : (
                        <div className="no-products">
                        <p>Товаров, соответствующих вашему запросу, не обнаружено.</p>
                        </div>
                    )}
                </div>
            :
                <div className="cards-container">
                    {dataItems.length > 0 ? (
                        dataItems.map((item, index) => (
                            <div key={index} className="order-card">
                            <h3 className="order-title">Заказ №{item.product_data.id}</h3>
                            <div className="order-info">
                              <p>
                                <span>Дата:</span> {item.product_data.date_buy}
                              </p>
                              <p>
                                <span>Статус:</span>{''}
                                <span
                                  style={{
                                    color: ["Доставлен", "В процессе"].includes(item.product_data.type_operation) ? 'green' : 'orange',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {item.product_data.type_operation}
                                </span>
                              </p>
                              <p>
                                <span>Способ доставки:</span> {item.deliveryMethod}
                              </p>
                              <p>
                                <span>Способ оплаты:</span> {'Картой'}
                              </p>
                              <p>
                                <span>Сумма:</span> {item.product_data.price} ₽
                              </p>
                            </div>
                            <h4>Товары:</h4>
                            <ul className="order-items">
                              <li key={item.product_data.title_product}>
                                <span>{item.product_data.title_product}</span> — {item.product_data.count_buy} шт. ({item.product_data.price} ₽/шт)
                              </li>
                            </ul>
                          </div>
                        ))
                    ) : (
                        <div className="no-products">
                        <p>Заказы не были найдены</p>
                        </div>
                    )}
                </div>
            }
            <Stack spacing={spacing} alignItems="center" style={{margin: "auto"}}>
                <Pagination 
                count={Math.round((items.length > dataItems.length ? items.length : dataItems.length) / maxLength)}
                shape={type}
                page={currentPage}
                onChange={(changePage)}
                />
            </Stack>
        </Fragment>
    )
}


export default PaginationScooter;