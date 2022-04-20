import { useState, useContext } from "react"
import { CartContext } from "./CartContext";

export default function QtyBtn({productInfo}){

    const {cartItems, setCartItems} = useContext(CartContext)

    //check if cart has the product
    let productIndexInCart = cartItems.findIndex((element)=>{
        return element.id === productInfo.id
    })
    //findIndex
    //if find the product in the cart by the index => return index of array, else return -1
    
    
    let [numInCart, setNumInCart] = useState(
        (productIndexInCart===-1) ? 0 : cartItems[productIndexInCart].qty
    );

    const handleAdd = ()=>{
        if(productIndexInCart===-1){
            setCartItems(
                [{
                id : productInfo.id,
                name : productInfo.name,
                image : productInfo.image,
                price : productInfo.price,
                description : productInfo.description,
                qty : 1
                },
                ...cartItems]
            )
        }
        else{
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].qty++
            setCartItems(newCartArray)
        }
        setNumInCart(numInCart+1)
    }

    const handleSubtract = ()=>{
        if(cartItems[productIndexInCart].qty===1){
            let newCartArray = [...cartItems]
            newCartArray.splice(productIndexInCart,1)
            setCartItems(newCartArray)
        }
        else{
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].qty--
            setCartItems(newCartArray)
        }
        setNumInCart(numInCart-1)
    }

    return (
        <div clasName='addToCart'>
            {
                (numInCart === 0) ?
                <span className="addToCartBtn" onClick={handleAdd}>Add to Cart</span> :
                <div>
                    <span className="subtractBtn" onClick={handleSubtract}>-</span>
                    {numInCart}
                    <span className="addBtn" onClick={handleAdd}>+</span>
                </div>
            }
        </div>
    )
}