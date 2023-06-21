import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
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
        sx={{ backgroundColor: blue[600] }}
      >
     <BottomNavigationAction label="Facebook" icon={<FacebookIcon style={{ color: '#3b5998' }} />} />
      <BottomNavigationAction label="Twitter" icon={<TwitterIcon style={{ color: '#1da1f2' }} />} />
      <BottomNavigationAction label="Instagram" icon={<InstagramIcon style={{ color: '#e4405f' }} />} />
      </BottomNavigation>
  );
}