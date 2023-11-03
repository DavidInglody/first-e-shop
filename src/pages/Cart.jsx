import { useSelector } from "react-redux"
import { CartItemsList, CartTotals, SectionTitle } from "../components"
import { Link } from "react-router-dom"

const Cart = () => {

  const user = useSelector((state)=> state.userState.user)

  const numbItemsInCart = useSelector((state)=> state.cartState.numItemsInCart)

  if(numbItemsInCart === 0){
    return <SectionTitle text= "Your cart is empty" />
  }

  return <>
  <SectionTitle text="Shopping Cart"/>
  <div className="mt-8 grid gap-8 lg:grid-cols-12">
    <div className="lg:col-span-8">
      <CartItemsList/>
    </div>
    <div className="lg:col-span-4 lg:pl-4">
      <CartTotals/>
      {user ? (
      <Link to="/checkout" className="btn btn-primary btn-block mt-8">
        Proceed to checkout
      </Link>
      ) : (
        <Link to="/login" className="btn btn-primary btn-block mt-8" >
          Please login first
        </Link>
    )}
    </div>
  </div>
  </>
}
export default Cart