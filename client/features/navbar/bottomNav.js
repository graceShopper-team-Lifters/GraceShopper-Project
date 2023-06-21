import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import { blue } from '@mui/material/colors';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{
        backgroundColor: blue[600],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <a href="https://www.facebook.com" style={{ margin: '60px' }}>
        <img src="https://www.freepnglogos.com/uploads/facebook-icons/facebook-logos-15.png" alt="Facebook" style={{ width: '24px', height: '24px' }} />
      </a>
      <a href="https://www.twitter.com" style={{ margin: '60px' }}>
        <img src="https://cdn.freebiesupply.com/logos/large/2x/twitter-3-logo-png-transparent.png" alt="Twitter" style={{ width: '24px', height: '24px' }} />
      </a>
      <a href="https://www.instagram.com" style={{ margin: '60px' }}>
        <img src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png" alt="Instagram" style={{ width: '24px', height: '24px' }} />
      </a>
      <span style={{ color: 'white' }}>Copyright 2023 All rights reserved.</span>
    </BottomNavigation>
  );
}
