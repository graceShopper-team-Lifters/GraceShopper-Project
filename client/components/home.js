import React from 'react';

export default function Home() {
  return (
    <div className="page-container" style={{ backgroundColor: 'grey', fontFamily: 'Arial, sans-serif' }}>
      <div className="top-left">
        <h1 className="title" style={{ color: 'black' }}>Personality Supplements for all your Situational Needs</h1>
        <hr style={{ borderTop: '1px solid black', width: '50%', margin: '1rem auto' }} />
        <h2 className="subheader" style={{ color: 'black', textAlign: 'center' }}>
          Enhance Your Personality Traits with TraitRate
          <span style={{ fontSize: '0.8em', verticalAlign: 'super' }}>&copy;</span> Supplements
        </h2>
      </div>
      <div className="grid-container">
        <div className="grid-item shadow-border">
          <h3>Patience</h3>
          <p>Great for those who have no tolerance for anything and everything.</p>
        </div>
        <div className="grid-item shadow-border">
          <h3>Charisma</h3>
          <p>Fantastic for you or your friends if you're known to dampen the mood.</p>
        </div>
        <div className="grid-item shadow-border">
          <h3>Attitude</h3>
          <p>Life is short. Feel good about everything, no matter what.</p>
        </div>
        <div className="grid-item shadow-border">
          <h3>Discipline</h3>
          <p>Break those bad habits, guaranteed!</p>
        </div>
        <div className="grid-item shadow-border">
          <h3>Free Delivery</h3>
          <p>Absolutely no charge for delivery.</p>
        </div>
        <div className="grid-item shadow-border">
          <h3>Eco-Friendly</h3>
          <p>TraitRate only uses natural ingredients.</p>
        </div>
      </div>
    </div>
  );
}
