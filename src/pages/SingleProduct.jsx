import { Link, useLoaderData } from "react-router-dom"
import { customFetch, formatPrice } from "../utils";
import { useState } from "react";
import {generateAmountOptions} from "../utils/index"
import {useDispatch} from "react-redux"
import {addItem} from "../features/cart/cartSlice"

const singleProductQuery = (id)=> {
  return {
    queryKey:["singleProduct", id],
    queryFn:()=>customFetch.get(`/products/${id}`) 
  }
}

  export const loader =(queryClient)=> async({params}) =>{
    const response = await queryClient.ensureQueryData(singleProductQuery(params.id))
    return {product:response.data.data}
  }

const SingleProduct = () => {

    const {product} = useLoaderData()

    const {title,company,description,image,price,colors}= product.attributes
    const euros =  formatPrice(price)
    const [productColor,setProductColor] = useState(colors[0])
    const [amount,setAmount]=useState(1)

    const handleAmount = (e)=>{
      setAmount(parseInt(e.target.value))
    }

    const cartProduct = {
      cartID: product.id + productColor,
      productID:product.id,
      image,
      title,
      price,
      company,
      productColor,
      amount,
      company
    }

    const dispatch= useDispatch()

    const addToCart = ()=>{
      dispatch(addItem({product:cartProduct}))
    }

  return <section>
    <div className="text-md breadcrumbs">
      <ul>
        <li><Link to="/">Home</Link></li> 
        <li><Link to="/products">Products</Link></li> 
      </ul>
    </div>
    {/* PRODUCT */}
    <div className="grid gap-y-8 lg:grid-cols-2 px-24">
      <img className="w-96" src={image} alt={title} />
        {/* text */}
      <div className=" flex flex-col gap-4">
        <h2 className="capitalize tracking-wider text-secondary font-bold text-3xl ">{title}</h2>
        <h4 className="font-bold primary-content uppercase">{company}</h4>
        <span className="text-xl">{euros}</span>
        <p className=" tracking-wider ">{description}</p>
          {/* COLORS */}
        <p className="font-bold ">Colors :</p>
        <div className="">
          {colors.map((singleColor)=>{
            return <button 
            key={singleColor} 
            className={`badge w-6 h-6 mr-2 ${singleColor === productColor && 'border-2 border-secondary' } `}
            style={{ backgroundColor: singleColor }}
            onClick={() => setProductColor(singleColor)}
            ></button>
          })}
          {/* AMOUNT */}
          <div className="flex flex-col max-w-xs">
             <label className='label' htmlFor="amount">
              <h4 className='text-md font-medium tracking-wider capitalize'>
                amount
              </h4>
            </label>
            <select id="amount" className="select select-secondary select-bordered select-md" value={amount} onChange={handleAmount}>
              {generateAmountOptions(10)}
            </select>
          </div>
          <div className="mt-10">
            <button className="btn btn-primary" onClick={addToCart}>Add to Bag</button>
          </div>
        </div>
      </div>
    </div>

  </section>
}
export default SingleProduct