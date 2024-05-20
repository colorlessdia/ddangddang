import { formattedDate } from '../utils/FormattedDate';

const IntervalTime = ({END_DATE, time, setTime}) => {
  const parseTime = (time) => {
    time = formattedDate(time);
    const dateParts = time.split(' ');
    const datePart = dateParts[0];
    const timePart = dateParts[1];
    
    const [year, month, day] = datePart.split('-');
    const [hours, minutes, seconds] = timePart.split(':');
  
    const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);
    const currentTime = new Date().getTime();
  
    const milliseconds = dateObject - currentTime;
    const totalSeconds = Math.floor(milliseconds / 1000);
    const transHours = Math.floor(totalSeconds / 3600);
    const transMinutes = Math.floor((totalSeconds % 3600) / 60);
    const transSeconds = totalSeconds % 60;
  
    return [transHours, transMinutes, transSeconds];
  };
  // use effect?
  setInterval(() => {
    setTime(parseTime(END_DATE));
  }, 1000);

  return (
    <p className="time-area">남은시간 <span className="time">{`${time[0]} : ${time[1]} : ${time[2]}`}</span></p>
  );
};

export default IntervalTime;