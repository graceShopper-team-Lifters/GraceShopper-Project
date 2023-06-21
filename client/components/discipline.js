import React from 'react';
import { ItemCard } from './itemCard';

export default function Discipline() {
  return (
    <div className="discipline-container">
      <div className="item-card-row">
        <ItemCard
          title="Discipline for Weight Loss"
          productId={1}
          subheader="Throw Away That Scale!"
          image="https://images.huffingtonpost.com/2015-01-29-FotoliaBeforeandafter-thumb.jpg"
          description={`Weight loss can be tough, and sticking to it is often very difficult. Using this item will enable you to instantly hate all of your favorite foods. Use with caution, though, because using too much will cause you hate all of your favorite people. `}
        />

        <ItemCard
          title="Discipline for Alarm Clocks"
          productId={2}
          subheader="Hit the Snooze Button Just Once!"
          image="https://www.dreams.co.uk/sleep-matters-club/wp-content/uploads/shutterstock_162882851.jpg"
          description={`Many people report hitting the snooze button several times before getting out of bed. After using "Discipline for Alarm Clocks," you'll hit the snooze button once and fly out of bed! Note: this item does not work if alarm clock is smashed.`}
        />

        <ItemCard
          title="Discipline for Elevators"
          productId={3}
          subheader="Hold the Door Open for Everyone!"
          image="https://www.etiquetteschoolofamerica.com/wp-content/uploads/2013/09/Going-Up__-The-Top-7-Savvy-Tips-for-Riding-Elevators-scaled.jpeg"
          description={`This item is for those who push the "close" button on elevators to avoid waiting for others. Use this product to assist in developing a reputation for being patient with those slow walkers.`}
        />
      </div>

      <div className="item-card-row">
        <ItemCard
          title="Discipline for Commuters"
          productId={4}
          subheader="Every Commute is Peaceful!"
          image="https://st2.depositphotos.com/2117297/7573/i/950/depositphotos_75733473-stock-photo-happy-best-friends-in-subway.jpg"
          description={`Often, commuting can be a hassle. This is due to traffic, unruly passengers, and other avoidable obstacles. Take this product immediately after an inconvience to achieve tolerance for rude commuters.`}
        />

        <ItemCard
          title="Discipline for Punctuality"
          productId={5}
          subheader="Get. There. Now."
          image="https://www.exboyfriendrecovery.com/wp-content/uploads/2015/10/Dollarphotoclub_91705243-copy.jpg"
          description={`This item is popular with those who tend to be "fashionably late" to important events. Use this item when someone tells you they'll be late. After item use, you won't mind their lateness and may even prefer they don't arrive at all!`}
        />

        <ItemCard
          title="Discipline for Procrastination"
          productId={6}
          subheader="Later is Not an Option."
          image="https://images.theconversation.com/files/503789/original/file-20230110-21-ai5g6x.jpg?ixlib=rb-1.1.0&rect=0%2C9%2C6553%2C4352&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"
          description={`Procrastination is a problem we all have, or are currently dealing with at some point. Fortunately, this product exists to prevent procrastination for urgent tasks. This item is popular among those who do not contrubite to group work.`}
        />
      </div>
    </div>
  );
}