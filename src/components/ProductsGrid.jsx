import { Link, useLoaderData } from "react-router-dom"
import {formatPrice} from "../utils/index"

const ProductsGrid = () => {
    const {products} = useLoaderData()

  return <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {products.map((product)=>{
        const{id} = product
        const {title,image,price} = product.attributes
        const  eurosAmount =  formatPrice(price)
        return <Link to ={`/products/${id}`} key={id} className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition duration-300" >
            <figure>
                <img className="h-64 w-full object-cover" src={image} alt="" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title capitalize tracking-wider">{title}</h2>
                <span className="text-secondary">{eurosAmount}</span>
            </div>
            </Link>
    })}
  </div>
}
export default ProductsGrid