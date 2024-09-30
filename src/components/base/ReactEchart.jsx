import React, { forwardRef } from 'react';
import { Box } from '@mui/material';
import ReactEChartsCore from 'echarts-for-react/lib/core';

// ReactEchart component without TypeScript types
const ReactEchart = forwardRef((props, ref) => {
  const { option, ...rest } = props;
  return (
    <Box
      component={ReactEChartsCore}
      ref={ref}
      option={{
        ...option,
        tooltip: {
          ...option.tooltip,
          confine: true,
        },
      }}
      {...rest}
    />
  );
});

export default ReactEchart;
