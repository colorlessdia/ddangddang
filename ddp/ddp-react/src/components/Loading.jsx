import { useEffect, useState } from "react";

const Loading = ({isLoading}) => {
  const [percent, setPercent] = useState(0);
  
  useEffect(() => {
    let currentPercent = 0;
    const increasePercent = setInterval(() => {
      setPercent(currentPercent);
      currentPercent += 1;

      if (100 < currentPercent) {
        clearInterval(increasePercent);
      }
    }, 20);
    return (() => {
      clearInterval(increasePercent);
    });
  }, []);

  return (
    <div className={`loading ${isLoading && 'loaded'}`}>
      <div className="text-area">
        <p className="text">땅땅</p>
        <p className="percent">{percent}</p>
      </div>
    </div>
  );
};

export default Loading;