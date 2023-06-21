import React from 'react';
import { ItemCard } from './itemCard';

export default function Patience() {
  return (
    <div className="patience-container">
      <h1>Patience</h1>

      <div className="item-card-row">
        <ItemCard
          title="Patience for Colleagues"
          productId={1}
          subheader="Enjoy Conversing with All Colleagues!"
          image="https://nycofficesuites.com/wp-content/uploads/2018/04/Woman-frustrated-by-annoying-coworker.jpg"
          description={`This item is bought and often used on Monday mornings. Our customers have reported a large increase in patience at work and seem more interested in how their colleague's weekend actually went.`}
        />

        <ItemCard
          title="Patience for Wrong Orders"
          productId={2}
          subheader="Every Order is the Right One!"
          image="https://www.postscanmail.com/wp-content/uploads/2021/11/Wrong-Shipping-Address-on-an-Online-Order.jpg"
          description={`Whether it's at a restaurant, e-commerce site, or anything else, this item enables the user to love all orders that comes their way. After using this item, users will smile and enjoy the situation. This item is most effective in restaurants.`}
        />

        <ItemCard
          title="Patience for Long Lines"
          productId={3}
          subheader="Great for Annoying Conversations!"
          image="https://learningspanishlikecrazy.com/wp-content/uploads/2015/08/waiting-long-lines-supermarket.png"
          description={`We all end up waiting in long lines eventually. Have you ever been held up because of a customer's conversation with the cashier? If so, this is for you! Use this item to enjoy, and even contribute to things holding up lines.`}
        />
      </div>

      <div className="item-card-row">
        <ItemCard
          title="Patience for Parents"
          productId={4}
          subheader="Every Child is an Angel!"
          image="https://jeanawhitaker.com/wp-content/uploads/2022/09/stressed-teacher-scaled.jpg"
          description={`Attention educators! If you've ever dealt with insane students' parents, this item is for you! After using "Patience for Parents," every parent's child will be considered an angel and can do no wrong. `}
        />

        <ItemCard
          title="Patience for In-Laws"
          productId={5}
          subheader="Every Interaction is Pleasant!"
          image="https://static.scientificamerican.com/sciam/cache/file/F9153FF5-1150-480C-957E215D33FBBBDB_source.jpg?w=590&h=800&51EEC77F-AE6D-4B79-842220197A30C887"
          description={`"Patience for In-Laws" is most used during family gatherings, and even during interrogation-like coversations. Use this item before, and after, the encounter for best results. This item lasts for five encounters!`}
        />

        <ItemCard
          title="Patience for Traffic"
          productId={6}
          subheader="Rush Hour is Prime Time!"
          image="https://png.pngtree.com/background/20230401/original/pngtree-bored-man-in-car-waiting-in-traffic-jam-vector-picture-image_2240547.jpg"
          description={`This item is highly popular among those who leave work at rush hour. Before using this item, you'll hate traffic and everyone in front of you. After using this item, you'll love everyone on the road and may even cause traffic yourself!`}
        />
      </div>
    </div>
  );
}
