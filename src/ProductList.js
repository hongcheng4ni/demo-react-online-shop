import styles from './ProductList.module.css'
import React, { useState, useEffect } from 'react' //react hook
import {Link} from "react-router-dom"
import { Title } from './Title'
import QtyBtn from './QtyBtn'

export default function ProductList(){

    //let productList = [
    //    {"id":1, "name":"Apple", "price":5, "image":"apple.jpg", "description":"desc of apple"},
    //    {"id":2, "name":"Orange", "price":3, "image":"orange.jpg", "description":"desc of orange"},
    //    {"id":3, "name":"Mango", "price":4, "image":"mango.jpg", "description":"desc of mango"},
    //    {"id":4, "name":"Watermelon", "price":20, "image":"watermelon.jpg", "description":"desc of watermelon"},
    //    {"id":5, "name":"Blueberry", "price":10, "image":"blueberry.jpg", "description":"desc of blueberry"},
    //     {"id":6, "name":"White Carrot", "price":5, "image":"white-carrot.jpg", "description":"desc of white carrot"}
    // ]
    let [productList, setProductList] = useState([])

    console.log(productList)

    // fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
    //     .then(response => response.json())
    //     .then(data => setProductList(data))
    //useEffect
    useEffect(()=>{
        //1 : no other params, component every render
        //2 : dependency array is empty array, only when first render
        //3 : depentdency array is not empty, when first render or when params change
        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
            .then(response => response.json())
            .then(data => setProductList(data))
    },[]) //dependency array

    return(
        <>
            <Title mainTitle="React Basic Online Shop Demo"/>
            <div className='container'>
                {
                    productList.map((product)=>(
                            <React.Fragment key={product.id}>
                                <div className='containerItem'>

                                    <Link to={"/product/"+product.id}>
                                        <img src={process.env.PUBLIC_URL+'/image/'+product.image}/>
                                    </Link>

                                    <div className='productName'>
                                        {product.name} - ${product.price} <br/><br/>
                                    </div>

                                    <QtyBtn productInfo={product}/>
                                </div>
                            </React.Fragment>
                        )
                    )
                }
            </div>
        </>
    )
}