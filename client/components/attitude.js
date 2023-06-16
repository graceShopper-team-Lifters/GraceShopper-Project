import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CreateIcon from '@mui/icons-material/Create';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BlackCard = styled(Card)({
  border: '1px solid black',
});

export default function Attitude() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <h1>Attitude</h1>
      <BlackCard sx={{ maxWidth: 345 }}>
        <CardHeader
          title="Attitude for Manager"
          subheader="Seem Happy at Work!"
        />
        <CardMedia
          component="img"
          height="194"
          image="https://img.huffingtonpost.com/asset/5b9d7f3226000033007fe5f5.jpeg?ops=scalefit_720_noupscale&format=webp"
          alt="Attitude for Manager"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            "Attitude for Manager" is one of our most popular items. This item allows for a 40% increase in your ability to seem like you're happy at work. Along with putting on a happy front, this also enables you to feel excited for meetings.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to cart">
            <AddShoppingCartIcon />
            <Typography variant="body2" color="text.secondary">
              Add to Cart
            </Typography>
          </IconButton>
          <IconButton aria-label="write a review">
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
            <Typography paragraph>
              Review1
            </Typography>
            <Typography paragraph>
              Review 2
            </Typography>
          </CardContent>
        </Collapse>
      </BlackCard>
    </>
  );
}
