import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../cart/cartSlice";
import { fetchProductDetails } from "./productsSlice";

const ProductDetailsPage = () => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const product = useSelector((state) => state.products.details);
   const loading = useSelector((state) => state.products.detailsLoading);

   useEffect(() => {
      dispatch(fetchProductDetails(id))
   }, [dispatch, id]);

   if (loading) {
      return <div>Loading...</div>;
   }

   const handleAddToCart = () => {
      dispatch(addToCart(product));
   }

   return (
      <div>
         <h2>Product Details</h2>
         <h3>{product.name}</h3>
         <p>{product.description}</p>
         <p>Price: ${product.price/100}</p>
         <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
   );
};

export default ProductDetailsPage;