import React from 'react';
import Grid from '@mui/material/Grid';
import TopCard from './TopCard';
import { Grid2 } from '@mui/material';

// Array of card data without TypeScript types
const cardsData = [
  {
    id: 1,
    title: 'Save Products',
    value: '50.8K',
    rate: '28.4%',
    isUp: true,
    icon: 'carbon:favorite-filled',
  },
  {
    id: 2,
    title: 'Stock Products',
    value: '23.6K',
    rate: '12.6%',
    isUp: false,
    icon: 'solar:bag-bold',
  },
  {
    id: 3,
    title: 'Sale Products',
    value: '756',
    rate: '3.1%',
    isUp: true,
    icon: 'ph:bag-simple-fill',
  },
  {
    id: 4,
    title: 'Average Revenue',
    value: '2.3K',
    rate: '11.3%',
    isUp: true,
    icon: 'mingcute:currency-dollar-2-line',
  },
];

// TopCards component without TypeScript types
const TopCards = () => {
  return (
    <Grid2 
      container 
      spacing={3} 
      // justifyContent="space-between" // Center the grid items
      gap={5}
      justifyContent="center"
      alignItems="stretch" // Ensure the height of grid items is the same
      marginTop={2}
    >
      {cardsData.map((item) => (
        <TopCard
          key={item.id}
          title={item.title}
          value={item.value}
          rate={item.rate}
          isUp={item.isUp}
          icon={item.icon}
        />
      ))}
    </Grid2>
  );
};

export default TopCards;
