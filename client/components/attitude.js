import React from 'react';
import { ItemCard } from './itemCard';

export default function Attitude() {
  return (
    <div className="attitude-container">
      <h1>Attitude</h1>

      <div className="item-card-row">
        <ItemCard
          title="Attitude for Manager"
          productId={1}
          subheader="Seem Happy at Work!"
          image="https://img.huffingtonpost.com/asset/5b9d7f3226000033007fe5f5.jpeg?ops=scalefit_720_noupscale&format=webp"
          description={`"Attitude for Manager" is one of our most popular items. This item allows for a 40% increase in your ability to seem like you're happy at work. Along with putting on a happy front, this also enables you to feel excited for meetings.`}
        />

        <ItemCard
          title="Attitude for Manager"
          productId={2}
          subheader="Seem Happy at Work!"
          image="https://img.huffingtonpost.com/asset/5b9d7f3226000033007fe5f5.jpeg?ops=scalefit_720_noupscale&format=webp"
          description={`"Attitude for Manager" is one of our most popular items. This item allows for a 40% increase in your ability to seem like you're happy at work. Along with putting on a happy front, this also enables you to feel excited for meetings.`}
        />

        <ItemCard
          title="Attitude for Manager"
          productId={3}
          subheader="Seem Happy at Work!"
          image="https://img.huffingtonpost.com/asset/5b9d7f3226000033007fe5f5.jpeg?ops=scalefit_720_noupscale&format=webp"
          description={`"Attitude for Manager" is one of our most popular items. This item allows for a 40% increase in your ability to seem like you're happy at work. Along with putting on a happy front, this also enables you to feel excited for meetings.`}
        />
      </div>

      <div className="item-card-row">
        <ItemCard
          title="Attitude for Manager"
          productId={4}
          subheader="Seem Happy at Work!"
          image="https://img.huffingtonpost.com/asset/5b9d7f3226000033007fe5f5.jpeg?ops=scalefit_720_noupscale&format=webp"
          description={`"Attitude for Manager" is one of our most popular items. This item allows for a 40% increase in your ability to seem like you're happy at work. Along with putting on a happy front, this also enables you to feel excited for meetings.`}
        />

        <ItemCard
          title="Attitude for Manager"
          productId={5}
          subheader="Seem Happy at Work!"
          image="https://img.huffingtonpost.com/asset/5b9d7f3226000033007fe5f5.jpeg?ops=scalefit_720_noupscale&format=webp"
          description={`"Attitude for Manager" is one of our most popular items. This item allows for a 40% increase in your ability to seem like you're happy at work. Along with putting on a happy front, this also enables you to feel excited for meetings.`}
        />

        <ItemCard
          title="Attitude for Manager"
          productId={6}
          subheader="Seem Happy at Work!"
          image="https://img.huffingtonpost.com/asset/5b9d7f3226000033007fe5f5.jpeg?ops=scalefit_720_noupscale&format=webp"
          description={`"Attitude for Manager" is one of our most popular items. This item allows for a 40% increase in your ability to seem like you're happy at work. Along with putting on a happy front, this also enables you to feel excited for meetings.`}
        />
      </div>
    </div>
  );
}
