import React from 'react';
import { Box } from '@mui/material';

// Image component without TypeScript types
const Image = ({ sx, ...rest }) => {
  return <Box component="img" sx={sx} {...rest} />;
};

export default Image;
