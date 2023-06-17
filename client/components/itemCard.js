import React from 'react';
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
import { useDispatch } from 'react-redux';
import { addToCart } from '../app/store';
import { useIsLoggedIn } from '../hooks';

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

export const ItemCard = ({ title, productId, subheader, image, description }) => {
  const isLoggedIn = useIsLoggedIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [reviewText, setReviewText] = React.useState('');
  const [reviews, setReviews] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim() === '') {
      alert('Please enter a review before submitting.');
      return;
    }

    const newReview = {
      text: reviewText,
      id: Date.now(), // Generate a unique ID for the review
    };

    setReviews([...reviews, newReview]);
    setReviewText('');
  };

  return (
    <div style={{ margin: '10px' }}> {/* Container with spacing around items */}
      <BlackCard sx={{ maxWidth: 345 }}>
        <CardHeader title={title} subheader={subheader} />
        <CardMedia component="img" height="194" image={image} alt={title} />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            aria-label="add to cart"
            onClick={() => {
              if (!isLoggedIn) {
                alert('Must be Logged In to Purchase');
                return;
              }
              dispatch(
                addToCart({
                  name: title,
                  subheader,
                  image,
                  description,
                  id: productId,
                })
              );
              navigate('/cart');
            }}
          >
            <AddShoppingCartIcon />
            <Typography variant="body2" color="text.secondary">
              Add to Cart
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
