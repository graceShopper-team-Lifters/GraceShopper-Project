import React from 'react';
import { ItemCard } from './itemCard';

export default function Charisma() {
  return (
    <div className="charisma-container">
      <div className="item-card-row">
        <ItemCard
          title="Charisma for Speeches"
          productId={1}
          subheader="Make it Memorable for All!"
          image="https://assets.entrepreneur.com/content/3x2/2000/20160303162410-businesswoman-speaker-speech-presentation-meeting-conference-talk-seminar-guest.jpeg"
          description={`This item is for those who dread making speeches. After using "Charisma for Speeches," you'll love getting up and speaking through the heart! Our introverts have experienced best results. `}
        />

        <ItemCard
          title="Charisma for Parties"
          productId={2}
          subheader="Become the Life of the Party!"
          image="https://www.mpcevents.com/images/BlogPics/lifeoftheparty_16x9.jpg"
          description={`At some point in your life, you've probably gone to a party because you had to. After using this item, you'll become the life of the party anywhere you go. This item contains no alcohol but mimics someone who's six drinks in! `}
        />

        <ItemCard
          title="Charisma for Holidays"
          productId={3}
          subheader="You'll be the one Celebrated!"
          image="https://thedacare.org/wp-content/uploads/2021/10/friends-and-family-enjoying-holiday-dinner.jpg?w=1424&h=900&crop=1"
          description={`The holidays are a time of year that often brings people together to celebrate different faiths. After taking this item, you'll have enough charisma to draw all of the attention. Take this with food for best results. `}
        />
      </div>

      <div className="item-card-row">
        <ItemCard
          title="Charisma for Interviews"
          productId={4}
          subheader="Personality Comes First!"
          image="https://insightglobal.com/wp-content/uploads/2022/10/man-interviewing-scaled-e1665689472861-900x600.jpg"
          description={`Interviews of all types can be stressful. If you lack any confidence or interest in sitting through the interview, then this item is for you. "Charisma for Interviews" brightens your smile and allows you to shine no matter the topic.`}
        />

        <ItemCard
          title="Charisma for Climate"
          productId={5}
          subheader="It's Always Sunny in..."
          image="https://livepurposefullynow.com/wp-content/uploads/2013/08/bigstock-Woman-in-raincoat-smiling-as-s-35505551-e1375633792254.jpg"
          description={`This item is for those whose mood is affected by inclement weather. After using this product, you'll be the most outgoing person in the room during all storms, dangerous or not. This item is perfect for those living in Seattle.`}
        />

        <ItemCard
          title="Charisma for Accidents"
          productId={6}
          subheader="It's Never Your Fault!"
          image="https://previews.123rf.com/images/kadmy/kadmy1403/kadmy140300239/27895401-woman-behind-steering-wheel-happy-unguilty-female-driver-after-car-crash-accident-collision-in-city.jpg"
          description={`Nobody is perfect, and those who claim to be are wrong. However, using this item, you'll always feel and look like you're innocent, even when you're not. This item works instantly, so take right before accident for best results. `}
        />
      </div>
    </div>
  );
}