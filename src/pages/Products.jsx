import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const AllProductsQuery = (queryParams) => {
  const {search, category, company, sort, price, shipping, page} = queryParams
  return {
    queryKey:[
        "products", 
        search ?? "",
        category ?? "all",
        company ?? "all",
        sort ?? "a-z",
        price ?? 1000,
        shipping ?? false,
        page ?? 1
      ],
    queryFn:()=> customFetch.get("/products", {
      params:queryParams
    })
  }
}

export const loader = (queryClient)=> async ({request})=>{
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
  const response = await queryClient.ensureQueryData(AllProductsQuery(params))
  const products = response.data.data
  const meta = response.data.meta
  return {meta,products, params}
}

const Products = () => {
  return <>
    <Filters/>
    <ProductsContainer/>
    <PaginationContainer/>
  </>
}
export default Products