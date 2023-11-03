import axios from "axios"
import {Hero} from "../components/index"
import { customFetch } from "../utils"
import { useLoaderData } from "react-router-dom"
import ProductsGrid from "../components/ProductsGrid"
import FeaturedProducts from "../components/FeaturedProducts"

const featuredProductsQuery = {
  queryKey:["featuredProducts"],
  queryFn:()=> customFetch.get("/products?featured=true")
}

export const loader =(queryClient)=> async() =>{
  const response = await queryClient.ensureQueryData(featuredProductsQuery)
  const products =  response.data.data
  return {products}
}

const Landing = () => {
  const data = useLoaderData()

  return <>
    <Hero/>
    <FeaturedProducts/>
  </>
}
export default Landing