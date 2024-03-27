import React, { useState } from 'react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submit logic here
    console.log('Search submitted:', searchQuery);
  };

  return (
    <>
<header className="bg-green-900 p-4 text-white">
  <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
    <div className="logo font-bold text-2xl mb-4 lg:mb-0 lg:mr-4">
      <span className='text-green-700'>&lt;</span>
      Pass
      <span className='text-green-700'>Op/&gt;</span>
    </div>
    <div className="flex flex-col lg:flex-row items-center">
  {/* Mobile navigation */}
  <div className="mb-2 lg:mb-0 my-2 mx-2">
    <a href="https://github.com/yourusername/yourrepository" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-400 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 rounded">
      View on GitHub
    </a>
  </div>
  
</div>

  </div>
</header>

  </>
  );
};

export default Header;
