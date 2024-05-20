
import MyInformation from '../components/MyInformation';
import { useState,useEffect } from 'react';
import axios from 'axios';

const MyInfo = () => {



  return (
    <section className="my-content my-info">
      <div className="inner">
          <MyInformation/>
      </div>
    </section>
  );
};
export default MyInfo;