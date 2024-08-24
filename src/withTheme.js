import React from 'react';
import { useTheme } from '@mui/material/styles';

const withTheme = (Component) => (props) => {
  const theme = useTheme();
  return <Component {...props} theme={theme} />;
};

export default withTheme;

