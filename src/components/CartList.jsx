import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems);  

  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.cartId} cartItem={item} />
      })}
    </>
  )
}
export default CartList;