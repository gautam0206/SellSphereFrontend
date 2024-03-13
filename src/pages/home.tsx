import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"

import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { Skeleton } from "../components/loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import cover from '../assets/cover.jpg';

const Home = () => {


  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");


  return (
    <div>
   
      <section>
        <img src={cover} alt=""  width="100%" height="400px"/>
      </section>

      <div className="home">

      <h1>
        Latest Products
        <Link to="/search" className="findmore">More</Link>
      </h1>

       <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
            />
          ))
        )}
      </main>
    </div>
    </div>
  )
}

export default Home
