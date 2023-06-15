import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  return (
    <div>
      <h3>Welcome, {isLoggedIn ? `${username}` : 'Guest' }</h3>
      {isLoggedIn && (
         <p>
            You are logged in! Click <Link to='/products'>here</Link> to view our products.
         </p>
      )}
    </div>
  );
};

export default Home;
