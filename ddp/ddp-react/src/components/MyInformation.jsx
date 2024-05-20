import axios from "axios";
import { useEffect, useState } from "react";


const MyInformation = () => {
  const [ModifyData, setModifyData] = useState("")


  useEffect(() => {
    axios.get("http://localhost:3333/Modify")
      .then((res) => {
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
        console.log(res.data.row)
        setModifyData(res.data.row)
      })
      .catch((Error) => {
        console.log(Error);
      })
  }, [])

  console.log(ModifyData)

  const data = ModifyData.length > 0 ? ModifyData[0] : {};

  return (
    <div className="container">
      <h2 className="info-title">내정보</h2>
      <div>
        <div className="wrap">
          <p>고객님께서 가입하신 땅땅 회원 정보입니다.</p>
          <p>회원정보 변경은 닉네임,비밀번호,전화번호,주소만 가능합니다.</p>
          <br/>
          <hr/>
          <div className="profileWrap">
            <div className="profileDiv">
              <div className="imgBox">
                <img src={data.MEM_IMG_PATH} alt="" />
              </div>
            </div>
            <div className="inputWrap">
              <div className="nameDiv firstDiv">
                <div className="text">이름</div>
                <div className="serverValue">{data.MEM_NAME}</div>
              </div>
              <div className="nickDiv firstDiv">
                <div className="text">닉네임</div>
                <div className="serverValue">{data.MEM_NICK}</div>
              </div>
              <div className="idDiv firstDiv">
                <div className="text">아이디</div>
                <div className="serverValue" >{data.MEM_ID}</div>
              </div>
              {/* <div className="pwDiv firstDiv">
                <div className="text">비밀번호</div>
                <div className="serverValue"></div>
              </div> */}
              <div className="telDiv firstDiv">
                <div className="text">전화번호</div>
                <div className="serverValue">{data.MEM_TEL}</div>
              </div>
              <div className="addrDiv firstDiv">
                <div className="text">주소</div>
                <div className="serverValue">{data.MEM_ADDR}</div>
              </div>
              <div className="typeDiv firstDiv">
                <div className="text">회원타입</div>
                <div className="serverValue">{data.MEM_TYPE}</div>
              </div>
            </div>
          </div>
            <div className="buttonDiv">
              <button>변경하기</button>
            </div>
        </div>
      </div>
    </div>
  )
};

export default MyInformation;