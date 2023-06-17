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
  // TODO: fix
  // transition: theme.transitions.create('transform', {
  //   duration: theme.transitions.duration.shortest,
  // }),
}));

export const ItemCard = ({ title, productId, subheader, image, description }) => {
  const isLoggedIn = useIsLoggedIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <BlackCard sx={{ maxWidth: 345 }}>
      <CardHeader title={title} subheader={subheader} />
      <CardMedia component="img" height="194" image={image} alt={title} />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to cart">
          <AddShoppingCartIcon />

          <Typography variant="body2" color="text.secondary" onClick={() => {
            if (!isLoggedIn) {
              alert('Must be Logged In to Purchase');
              return;
            }
            dispatch(addToCart({
              name: title,
              subheader,
              image,
              description,
              id: productId,
            }));
            navigate('/cart');
          }}>
            Add to Cart
          </Typography>
        </IconButton>

        <IconButton aria-label="write a review">
          <CreateIcon />
          <Typography variant="body2" color="text.secondary" onClick={() => {
            if (!isLoggedIn) {
              alert('Must be Logged In to Write a Review');
              return;
            }
            dispatch(addToCart({
              name: title,
              subheader,
              image,
              description,
              id: productId,
            }));
            navigate('/cart');
          }}>
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
          <Typography paragraph>Review 1</Typography>
          <Typography paragraph>Review 2</Typography>
        </CardContent>
      </Collapse>
    </BlackCard>
  );
};