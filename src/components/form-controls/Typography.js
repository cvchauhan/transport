import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function Types(props) {
  const { text, variant,component,align, sx} = props
  return (
      <Typography variant={variant} component={component} align={align} sx={sx}>
        {text}
      </Typography>
  );
}
