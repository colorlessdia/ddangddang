// import { useRef, useState, useEffect, useContext } from 'react';
// import { FiBell } from "react-icons/fi";
// import { userContext } from '../context/userContext';

// const Alarm = () => {
//   const alarmRef = useRef(null);
//   const [alarmList, setAlarmList] = useState([]);
//   const [alarmToggle, setAlarmToggle] = useState(false);
//   const [alarmNew, setAlarmNew] = useState(false);
//   const userData = useContext(userContext);

//   useEffect(() => {
//     if (userData.alarmMsg) {
//       setAlarmList(prev => [...prev, userData.alarmMsg]);
//       setAlarmNew(true);
//     }
//   }, [userData.alarmMsg]);

//   const alarmHandler = (e) => {
//     e.preventDefault();

//     setAlarmToggle(prev => !prev);
//     setAlarmNew(false);
//   };

//   return (
//     <li className="profile-alarm">
//       <button className={`alarm-button ${alarmNew && 'new'}`} onClick={alarmHandler}><FiBell /></button>
//       <ul className={`alarm-list ${alarmToggle && 'active'}`} ref={alarmRef}>
//         {alarmList.map((message, index) => (
//           <li className="alarm-item" key={index}>{message}</li>
//         ))}
//       </ul>
//     </li>
//   );
// };

// export default Alarm;

import { useRef, useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import io from "socket.io-client";

const Alarm = () => {
  const alarmRef = useRef(null);
  const [alarmToggle, setAlarmToggle] = useState(false);
  const [alarmNew, setAlarmNew] = useState(false);
  const [notifications, setNotifications] = useState([]); // 알림 데이터 배열 추가

  const alarmHandler = (e) => {
    e.preventDefault();
    setAlarmToggle((prev) => !prev);
    setAlarmNew(false);
  };

  useEffect(() => {
    const socket = io.connect("http://localhost:3333", {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.on("news", (data) => {
      console.log(data);
      socket.emit("reply", "Hello Node.JS");

      // 새 알림을 알림 데이터에 추가
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        "다른 사용자가 입찰에 참여하였습니다!", // 실제 데이터의 내용에 맞게 수정
      ]);
      setAlarmNew(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <li className="profile-alarm">
      <button className={`alarm-button ${alarmNew && 'new'}`} onClick={alarmHandler}>
        <FiBell />
      </button>
      <ul className={`alarm-list ${alarmToggle && "active"}`} ref={alarmRef}>
        {notifications.map((notification, index) => (
          <li className="alarm-item" key={index}>
            {notification}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Alarm;