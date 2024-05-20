import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { userContext } from '../context/userContext';
import { saleContext } from '../context/saleContext';
import Header from "../components/Header";
import TopButton from "../components/TopButton";
import axios from 'axios';
import io from 'socket.io-client';

const Root = () => {
  let scrollY = window.scrollY;
  const [saleItem, setSaleItem] = useState([]);
  const [selectItem, setSelectItem] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState('');
  const [alarmMsg, setAlarmMsg] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  // /sale item call
  useEffect(() => {
    const saleItemCall = async () => {
      try {
        const res = await axios.get('http://localhost:3333/sale');
        setSaleItem(res.data.saleInfo);
      } catch (err) {
        console.log(err);
      }
    };

    saleItemCall();
  }, [isUpdate]);

  // login check
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      setIsLoggedIn(true);
    }
  }, []);

  // alarm
  useEffect(() => {
    const socket = io.connect('http://localhost:3333', {
      path: '/socket.io',
      transports: ['websocket'],
    });
    console.log(alarmMsg);
    socket.on('news', (data) => {
      socket.emit('reply', alarmMsg);
    });
  }, [alarmMsg]);

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;

    (0 < scrollY) ? setIsActive('active') : setIsActive('');
  });

  return (
    <userContext.Provider value={{isLoggedIn, setIsLoggedIn, alarmMsg, setAlarmMsg}}>
      <saleContext.Provider value={{saleItem, setSaleItem, selectItem, setSelectItem, isUpdate, setIsUpdate}}>
        <Header isActive={isActive} setIsActive={setIsActive} />
        <Outlet />
        <TopButton isActive={isActive} />
      </saleContext.Provider>
    </userContext.Provider>
  );
};

export default Root;