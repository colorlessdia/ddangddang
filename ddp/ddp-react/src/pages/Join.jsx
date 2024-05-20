import React, { useState } from "react";
import UserJoin from "../components/UserJoin";
import UserBusinessJoin from "../components/UserBusinessJoin"

const Join = () => {

  const [changeJoin, setChangeJoin] = useState('');

  const handleButtonClick = (joinType) => {
    setChangeJoin(joinType);
  };

  return (
    <div>
            <main className="join">
              <section>
                <div className="inner">
                  <form action="">
                    <div className="joinBtnDiv">
                      <button onClick={() => handleButtonClick('')}>일반회원</button>
                      <button onClick={() => handleButtonClick('B')}>사업자 회원</button>
                    </div>
                    {changeJoin === '' ? <UserJoin/> : <UserBusinessJoin/>}
                  </form>
                </div>
              </section>
            </main> 
    </div>
  );
};

export default Join;

