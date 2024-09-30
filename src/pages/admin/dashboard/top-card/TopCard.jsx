import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Grid2 } from '@mui/material';
import IconifyIcon from '../../../../components/base/IconifyIcon';
import RateChip from '../../../../components/chips/RateChip';

// TopCard component without TypeScript types
const TopCard = (props) => {
  const { icon, title, value, rate, isUp } = props;

  return (
    <Grid2 item xs={12} sm={6} xl={3} >
      <Stack
        component={Paper}
        p={2.25}
        pl={2.5}
        className="flex flex-col h-[160px] w-[250px] gap-5 !rounded-2xl"
      >
        {/* Top Section */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <IconifyIcon icon={icon} className="text-primary-main text-lg text-[#B3541E] text-[50px]" />
            <Typography variant="subtitle2" className="text-gray-600 ">
              {title}
            </Typography>
          </div>
          <IconButton
            aria-label="menu"
            size="small"
            className="text-neutral-light text-lg"
          >
            <IconifyIcon icon="solar:menu-dots-bold" />
          </IconButton>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center gap-2">
          <Typography variant="h3" className="font-semibold tracking-wide" style={{fontSize:"50px"}}>
            {value}
          </Typography>
          <RateChip rate={rate} isUp={isUp} />
        </div>
      </Stack>
    </Grid2>
  );
};

export default TopCard;
