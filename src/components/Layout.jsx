import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, title = '' }) => {
  return (
    <React.Fragment>
      <Navbar />
      
      <div id="wrapper">
        <div id="content" className="p-5">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
