import { useSelector } from "react-redux";
import { formatPrice } from "../utils";

const CartTotal = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector((state) => state.cartState);

  return (
    <div className="card bg-base-200">
      <div className="card-body">
       
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">          
          <span>Részösszeg</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>

        <p className="flex justify-between text-xs border-b border-base-300 pb-2">          
          <span>Szállítási díj</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>

        <p className="flex justify-between text-xs border-b border-base-300 pb-2">          
          <span>ÁFA</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>

        <p className="flex justify-between text-sm mt-4 pb-1">          
          <span>Fizetendő összeg</span>
          <span className="font-bold">{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  )
}
export default CartTotal;