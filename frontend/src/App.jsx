import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import './index.css';



// import components
import Footer from './components/Footer';
import Header from './components/Header';
import Manger from './components/Manger';





// import pages
const Home = lazy(()=>import("./page/home"));


function App() {
  return (
        <Router>
          <Suspense fallback={<div>Loading.....</div>}>
           <Header />
           <div className='bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]' >
           <Manger />
           </div>
            
          
            <Routes>
                 <Route path='/' element={<Home />} />
            </Routes>
            <Footer/>
            </Suspense>
            <Toaster position="bottom-center" />
        </Router>    
  );
}

export default App;
