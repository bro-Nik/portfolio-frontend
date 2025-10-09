import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, title = '' }) => {
  return (
    <React.Fragment>
      <Sidebar />
      
      <div id="wrapper">
        <div id="content" className="p-5">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
