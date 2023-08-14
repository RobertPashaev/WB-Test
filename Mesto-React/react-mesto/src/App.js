import React, { useState } from 'react';
import './styles/App.css';
import PreLoader from './components/PreLoader.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Main from './components/Main';

function App() {
  return (
    <>
      <PreLoader />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
