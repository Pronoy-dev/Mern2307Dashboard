import Banner from "./components/banner/Banner";
import BestSelling from "./components/BestSellling/BestSelling";
import Category from "./components/Category/Category";
import FlashSale from "./components/FlashSale/FlashSale";
import Product from "./components/Products/Product";
import Subcategory from "./components/Subcategory/Subcategory";
import Home from "./pages/Home";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="/banner" element={<Banner />}></Route>
      <Route path="/category" element={<Category />}></Route>
      <Route path="/subcategory" element={<Subcategory />}></Route>
      <Route path="/flashsale" element={<FlashSale />}></Route>
      <Route path="/bestSelling" element={<BestSelling />}></Route>
      <Route path="/products" element={<Product />}></Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
