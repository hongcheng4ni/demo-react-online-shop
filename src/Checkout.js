import styles from './ProductList.module.css'
import { Title } from "./Title";
import {Link} from "react-router-dom"
import QtyBtn from "./QtyBtn";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export function Checkout(){
    let {cartItems} = useContext(CartContext)
    let cartEmpty = cartItems.length <= 0 ? true : false

    let grandTotal = cartItems.reduce((total, product)=>{
        return total += product.price*product.qty
    },0)
    const freeShippingPrice = 99

    return(
        <>
            <Title mainTitle="Shopping Cart"/>

            {
                cartEmpty &&
                <div>
                    <div className='nothingInCart'>
                        No product in Shopping Cart<br/><br/>
                        <Link to="/">Back to Main Page</Link>
                    </div>
                </div>
            }

            {
                !cartEmpty &&
                <div className='container'>
                    <div className='cartSection'>
                        <table className='checkoutTable'>
                            <tbody>
                                {
                                    cartItems.map(product=>(
                                        <tr key={product.id}>
                                            <td>
                                                <Link to={'/product/'+product.id}>
                                                <img src={process.env.PUBLIC_URL+"/image/"+product.image} alt={product.name}/>
                                                </Link>
                                            </td>
                                            <td>
                                                <p>Name : {product.name}</p>
                                                <p>Price : {product.price}</p>
                                                <p>Description : {product.description}</p>
                                            </td>
                                            <td width="200">
                                                <QtyBtn productInfo={product}/>
                                            </td>
                                            <td>
                                                <div className='productSubTotal'>
                                                    ${product.price*product.qty}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='checkoutSection'>
                        <div>Total amount</div>
                        <div className='grandTotal'>${grandTotal}</div>
                        {
                            grandTotal >= freeShippingPrice ?
                            <div className='freeShipping'>✔️Free delivery</div> :
                            <div className='noShipping'>
                                Spend ${freeShippingPrice} for free delivery<br/>
                                ${freeShippingPrice - grandTotal} to go
                            </div>
                        }

                        <button>Pay</button>
                    </div>
                </div>
            }
        </>
    )
}