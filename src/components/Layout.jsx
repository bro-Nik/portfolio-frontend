import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, title = '' }) => {
  return (
    <html lang="ru">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="stylesheet" href="/bootstrap.min.css" />
        <link rel="stylesheet" href="/style.css" />
        
        <title>{title ? `${title} | Portfolios` : 'Portfolios'}</title>
      </head>
      <body className="d-flex flex-nowrap">
        <Navbar />
        
        <div id="wrapper">
          <div id="content" className="p-5">
            {children}
          </div>

          <div id="footer">{/* Footer content will go here */}</div>
        </div>

        {/* <Scripts /> */}
      </body>
    </html>
  );
};

export default Layout;
