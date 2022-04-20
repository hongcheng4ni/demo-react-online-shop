import { useState, useEffect } from "react"
import {useParams, Link} from "react-router-dom"
import QtyBtn from "./QtyBtn"
import { Title } from "./Title"

export default function ProductDetail(){
    let params = useParams()
    let [productDetail, setProductDetail] = useState(null)

    useEffect(()=>{
        //1 : no other params, component every render
        //2 : dependency array is empty array, only when first render
        //3 : depentdency array is not empty, when first render or when params change
        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
            .then(response => response.json())
            .then(data => {
                let productInfo = data.find((element)=>{
                    return element.id === parseInt(params.id)
                })
                setProductDetail(productInfo)
            })
    },[])

    return(
        <>
            {
                productDetail &&
                <div className='ProductDetail'>
                    <Title mainTitle={"#"+productDetail.name+"Product Information"}/>

                    <table width='100%'>
                        <tbody>
                            <tr>
                                <td align='right'>
                                    <img src={process.env.PUBLIC_URL+'/image/'+productDetail.image} alt={productDetail.name} width="400"/>
                                </td>
                                <td width='45%' padding='10'>
                                    <p>Name : {productDetail.name}</p>
                                    <p>Price : {productDetail.price}</p>
                                    <p>Description : {productDetail.description}</p>
                                    <QtyBtn productInfo={productDetail}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

            <Link to="/">
                <div className='backToGoodsListBtn'>
                    ↩️ Back to Main Page
                </div>
            </Link>
        </>
    )
}