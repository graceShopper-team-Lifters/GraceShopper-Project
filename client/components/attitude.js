import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../app/store';
import { fetchAttitudeProducts, selectProducts } from '../features/products/productsSlice';
import { ItemCard } from './itemCard';

const Attitude = () => {
   const dispatch = useDispatch();
   const username = useSelector((state) => state.auth.me.username);
   const attitudeProducts = useSelector(selectProducts);

   useEffect(() => {
      dispatch(fetchAttitudeProducts());
   }, [dispatch]);

   const handleAddToCart = async (productId) => {
      dispatch(addToCart({ username, productId }));
   };

   return (
      <div className="attitude-container">
         <div className="item-card-row">
            {attitudeProducts?.map((product) => (
               <ItemCard
                  key={product.id}
                  title={
                     <div>
                        {product.name}
                        <br />
                        <small>{product.subHeader}</small>
                     </div>
                  }
                  productId={product.id}
                  subheader={`Product-${product.id}`}
                  image={product.imageURL}
                  description={product.description}
                  price={`$${product.price/100}`}
                  username={username}
                  handleAddToCart={handleAddToCart}
               />
            ))}
         </div>
      </div>
   );
};

export default Attitude;