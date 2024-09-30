import React from 'react';
import { Box } from '@mui/material';
import { Icon } from '@iconify/react';

// IconifyIcon component without TypeScript types
const IconifyIcon = ({ icon, ...rest }) => {
  return <Box component={Icon} icon={icon} {...rest} />;
};

export default IconifyIcon;
