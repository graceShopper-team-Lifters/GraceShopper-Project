import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from './productsSlice';
import { Link } from "react-router-dom";

const ProductsPage = () => {
   const dispatch = useDispatch();
   const products = useSelector((state) => state.products.itens);
   const loading = useSelector((state) => state.products.loading);

   useEffect(() => {
      dispatch(fetchProducts());
   }, [dispatch]);

   if (loading) {
      return <div>Loading...</div>;
   }

   return (
      <div>
         <h2>Products</h2>
         {products.map((product) => (
            <div key={product.id}>
               <h3>{product.name}</h3>
               <p>{product.description}</p>
               <p>Price: ${product.price/100}</p>
               <Link to={`/products/${product.id}`}>View Details</Link>
            </div>
         ))}
      </div>
   );
};

export default ProductsPage;