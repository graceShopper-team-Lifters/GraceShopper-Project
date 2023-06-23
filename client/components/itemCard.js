import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CreateIcon from '@mui/icons-material/Create';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { userIsLoggedIn } from '../hooks';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlackCard = styled(Card)({
  border: '1px solid black',
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
}));

const customToastErrorStyle = {
   position: 'top-center',
   autoClose: 3000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   className: 'custom-toast-error',
   toastClassName: 'custom-toast-error-message',
   bodyClassName: 'custom-toast-error-body',
   style: {
      background: '#f44336',
      color: '#fff',
      fontWeight: 'bold',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      padding: '12px 16px',
      width: '280px',
   },
};

export const ItemCard = ({ title, productId, subheader, image, description, price, handleAddToCart }) => {
   const isLoggedIn = userIsLoggedIn();
   const navigate = useNavigate();
   const [expanded, setExpanded] = React.useState(false);
   const [reviewText, setReviewText] = React.useState('');
   const [reviews, setReviews] = React.useState([]);

   const [isAddingToCart, setIsAddingToCart] = useState(false);

   const handleExpandClick = () => {
      if (!isLoggedIn) {
         toast.error('Must Be Logged In to Write a Review.', customToastErrorStyle);
      return;
      }

      setExpanded(!expanded);
   };

   const handleReviewSubmit = () => {
      if (reviewText.trim() === '') {
         toast.error('Please Enter a Review Before Submitting.', customToastErrorStyle);
         return;
      }

      const newReview = {
         text: reviewText,
         id: Date.now(), // Generate a unique ID for the review
      };

      setReviews([...reviews, newReview]);
      setReviewText('');
   };

   const handleAddToCartClick = () => {
      if (!isLoggedIn) {
         toast.error('Must be Logged In to Purchase.', customToastErrorStyle);
         return;
      }

      setIsAddingToCart(true);
      setTimeout(() => {
         handleAddToCart(productId);
         setIsAddingToCart(false);
         navigate('/cart');
      }, 1000)
   };

  return (
    <div style={{ margin: '10px' }}> {/* Container with spacing around items */}
      <ToastContainer />
      <BlackCard sx={{ maxWidth: 345 }}>
        <CardHeader title={title} />
        <CardHeader subheader={subheader} />
        <CardMedia component="img" height="194" image={image} alt={title} />

        <CardContent>
          <Typography variant="body2" color="text.secondary" style={{ fontSize: '1.2em' }}>
            {description}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography variant="body1" color="text.secondary" style={{ fontSize: '1.5em' }}>
            <strong>{price}</strong>
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to cart" onClick={handleAddToCartClick} disabled={isAddingToCart}>
            <AddShoppingCartIcon />
            <Typography variant="body2" color="text.secondary">
            {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
            </Typography>
          </IconButton>

          <IconButton aria-label="write a review" onClick={handleExpandClick}>
            <CreateIcon />
            <Typography variant="body2" color="text.secondary">
              Write a Review
            </Typography>
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Customer Reviews</Typography>
            {reviews.map((review) => (
              <Typography key={review.id} paragraph>
                {review.text}
              </Typography>
            ))}

            {/* New review input */}
            <input
              type="text"
              placeholder="Write your review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            {/* Submit review button */}
            <button onClick={handleReviewSubmit}>Submit Review</button>
          </CardContent>
        </Collapse>
      </BlackCard>
    </div>
  );
};
