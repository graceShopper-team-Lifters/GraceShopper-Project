import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../app/store';
import { fetchCharismaProducts, selectProducts } from '../features/products/productsSlice';
import { ItemCard } from './itemCard';

const Charisma = () => {
   const dispatch = useDispatch();
   const username = useSelector((state) => state.auth.me.username);
   const charismaProducts = useSelector(selectProducts);

   useEffect(() => {
      dispatch(fetchCharismaProducts());
   }, [dispatch]);

   const handleAddToCart = async (productId) => {
      dispatch(addToCart({ username, productId }));
   };

   return (
      <div className="charisma-container">
         <div className="item-card-row">
            {charismaProducts?.map((product) => (
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
                  subheader={``}
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

export default Charisma;