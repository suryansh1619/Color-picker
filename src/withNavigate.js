import React from 'react';
import { useNavigate } from 'react-router-dom'; // Adjust the import path as needed
 
const withNavigate = (Component) => (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };

export default withNavigate;
