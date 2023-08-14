import React, { useEffect } from 'react';
import { preLoaderAnim } from '../animations';
import '../styles/PreLoader.css';

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className='preloader'>
      <div className='texts-container'>
        <span>Mesto,</span>
        <span>Project,</span>
        <span>React.</span>
      </div>
    </div>
  );
};

export default PreLoader;
