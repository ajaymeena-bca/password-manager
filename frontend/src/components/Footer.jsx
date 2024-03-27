import React from 'react';

function Footer() {
  return (
    <footer className="bg-green-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className='flex gap-5'>
           <div className="logo font-bold text-2xl mb-4 lg:mb-0 lg:mr-4">
             <span className='text-green-700'>&lt;</span>
                 Pass
                <span className='text-green-700'>Op/&gt;</span>
            </div>
            <p className='pt-1 font-bold text-xl'>Created By Morax Meena</p>
        </div>
        <div>
          <a href="#" className="text-white mx-2">Privacy Policy</a>
          <a href="#" className="text-white mx-2">Terms of Service</a>
          <a href="#" className="text-white mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
