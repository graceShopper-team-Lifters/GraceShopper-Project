import React from 'react';
import { ItemCard } from './itemCard';

export default function Attitude() {
  return (
    <div className="attitude-container">
      <h1>Attitude</h1>

      <div className="item-card-row">
        <ItemCard
          title="Attitude for Managers"
          productId={1}
          subheader="Seem Happy at Work!"
          image="https://img.huffingtonpost.com/asset/5b9d7f3226000033007fe5f5.jpeg?ops=scalefit_720_noupscale&format=webp"
          description={`"Attitude for Managers" is one of our most popular items. This item allows for a 40% increase in your ability to seem like you're happy at work. Along with putting on a happy front, this also enables you to feel excited for meetings.`}
        />

        <ItemCard
          title="Attitude for News Networks "
          productId={2}
          subheader="Appear to Enjoy the News!"
          image="https://cdn-prod.medicalnewstoday.com/content/images/articles/321/321230/man-looking-distressed.jpg"
          description={`Attitude for News Networks" enables you to enjoy all of the depressing news that our world has to offer. This item applies to every news network no matter the size! This attitude item lasts for 2 months.`}
        />

        <ItemCard
          title="Attitude for Teenagers"
          productId={3}
          subheader="Tolerate Your Child's Antics!"
          image="https://expatchild.com/wp-content/uploads/2015/03/expat-parent-teen-relationship.jpg"
          description={`Attitude for Teenagers" is popular among parents who have teenaged children. You may not understand why your teen son and/or daughter does what they do, but with this item, you'll now have a full understanding.`}
        />
      </div>

      <div className="item-card-row">
        <ItemCard
          title="Attitude for Traffic Violations"
          productId={4}
          subheader="Seem Happy in Court!"
          image="https://www.pevansatlaw.com/wp-content/uploads/2020/02/bigstock-Police-Writing-Ticket-3024488.jpg"
          description={`Do you have trouble smiling in front of the judge in traffic court? If so, this item is for you! Use this item in court to smile and convince the judge that it will never happen again. This also applies if you do intend on getting another ticket, anyway.`}
        />

        <ItemCard
          title="Attitude for Studying"
          productId={5}
          subheader="Make Cramming Fun!"
          image="https://static.scientificamerican.com/sciam/cache/file/F9153FF5-1150-480C-957E215D33FBBBDB_source.jpg?w=590&h=800&51EEC77F-AE6D-4B79-842220197A30C887"
          description={`Attitude for Studying" is suitable for those who procrastinate studying until the last minute. Our customers have reported an 80% increase in enjoyment when cramming at night, especially for subjects you won't need in your career.`}
        />

        <ItemCard
          title="Attitude for Exes"
          productId={6}
          subheader="Every Breakup is a Good One!"
          image="https://markmanson.net/wp-content/uploads/2016/04/couple-break-up-broken-heart.jpg"
          description={`This item is highly desired during the holidays, especially Valentine's day. Some breakups are rough, but this item will enable you to only remember the bad times! "Attitude for Exes lasts 6 months.`}
        />
      </div>
    </div>
  );
}
