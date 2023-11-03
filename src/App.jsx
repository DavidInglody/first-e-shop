import {ErrorElement} from "./components/index";
import {About,Cart,Checkout,Error, HomeLayout,Landing,Login, Orders, Products, Register, SingleProduct} from "./pages/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Loaders
import {loader as landingLoader} from "./pages/Landing"
import {loader as singleLoader} from "./pages/SingleProduct"
import {loader as productsLoader} from "./pages/Products"
import {loader as checkoutLoader} from "./pages/Checkout"
import {loader as orderLoader} from "./pages/Orders"

// actions
import{action as registerAction} from "./pages/Register"
import{action as loginAction} from "./pages/Login"
import{action as checkoutAction} from "./components/CheckoutForm"
import {store} from "./store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:1000 * 60 *5
    }
  }
})


const router = createBrowserRouter([
  {
    path: "/",
    element:<HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing/>,
        errorElement: <ErrorElement/>,
        loader:landingLoader(queryClient)
      },
      {
        path:"products",
        loader: productsLoader(queryClient),
        element:<Products/>
      },
      {
        path:"products/:id",
        loader:singleLoader(queryClient),
        element:<SingleProduct/>
      },
      {
        path: "about",
        element:<About/>
      },
      {
        path: "cart",
        element:<Cart/>
      },
      {
        path: "checkout",
        element:<Checkout/>,
        loader:checkoutLoader(store),
        action:checkoutAction(store,queryClient)
      },
      {
        path: "orders",
        element:<Orders/>,
        loader: orderLoader(store,queryClient),
      },
    ]
  },
  {
  path: "/login",
  element:<Login/>,
  errorElement:<Error/>,
  action:loginAction(store),
  },
  {
  path: "/register",
  element:<Register/>,
  errorElement:<Error/>,
  action:registerAction,
  },
])

const App = () => {
  return  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    <ReactQueryDevtools initialIsOpen={false}/>
  </QueryClientProvider>

}
export default App