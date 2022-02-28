import React, { useState } from 'react';

import Navigation from '../Navigation';

function Header() {
  const [currentPage, handlePageChange] = useState('About');

  return (
    <div>
      <Navigation/>
    </div>
  );
}

export default Header;
