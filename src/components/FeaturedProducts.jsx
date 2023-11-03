import ProductsGrid from "./ProductsGrid"
import {SectionTitle} from "./index"

const FeaturedProducts = () => {
  return <div className="pt-24">
    <SectionTitle text="Featured products"/>
    <ProductsGrid/>
  </div>

}
export default FeaturedProducts