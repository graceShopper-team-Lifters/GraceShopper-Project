import React from 'react';
import { ItemCard } from './itemCard';

export default function Attitude() {
  return (
    <>
      <h1>Attitude</h1>

      <ItemCard
        title="Attitude for Manager"
        productId={1}
        subheader="Seem Happy at Work!"
        image="https://img.huffingtonpost.com/asset/5b9d7f3226000033007fe5f5.jpeg?ops=scalefit_720_noupscale&format=webp"
        description={`"Attitude for Manager" is one of our most popular items. This item allows for a 40% increase in your ability to seem like you're happy at work. Along with putting on a happy front, this also enables you to feel excited for meetings.`}
      />
    </>
  );
}
