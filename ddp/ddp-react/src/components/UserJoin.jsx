import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import React,{ useContext, useState}from "react"
import AddrApi from "./AddrApi";
import axios from 'axios';



const UserJoin = () =>{

    const [addressData, setAddressData] = useState(null);
    const handleAddrApiSelect = (addressData) => {
        // 받은 주소 데이터를 상태로 설정
        setUserAddr(addressData.address);
        setAddressData(addressData);
    };

    <AddrApi onSelectAddress={handleAddrApiSelect} />

    // 아이디 검사
    const [userId, setUserId] = useState("");
    const [userIdError, setUserIdError] = useState("");

    const handleUserIdChange = (event) => {
        const value = event.target.value;
        setUserId(value);
        
        if (value.length < 6 || value.length > 20) {
            setUserIdError("아이디는 6자 이상 20자 이하로 입력해주세요.");
        } else {
            setUserIdError("");
        }
    };

    // 비밀번호 검사
    const [userPw, setUserPw] = useState("");
    const [userPwError, setUserPwError] = useState("");

    const handleUserPwChange = (event) => {
        const value = event.target.value;
        setUserPw(value);
        
        if (value.length == 0) {
            setUserPwError("비밀번호를 입력해주세요.");
        } else {
            setUserPwError("");
        }
    };

    //비밀번호 일치 검사
    const [userPwChk, setuserPwChk] = useState("");
    const [userPwChkError, setUserPwChkError] = useState("");
    const [sameUserPwChk, setSameUserPwChk] = useState("");

    const handleUserPwChkChange = (event) => {
        const value = event.target.value;
        setuserPwChk(value);
        
        if (userPw === value) {
            setUserPwChkError("");
            setSameUserPwChk("비밀번호가 일치합니다.");
        } else {
            setSameUserPwChk("");
            setUserPwChkError("비밀번호가 일치하지 않습니다.");
        }
    };

    // 이름 검사
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");

    const handleUserNameChange = (event) => {
        const value = event.target.value;
        setUserName(value);
        
        if (value.length == 0) {
            setUserNameError("이름을 입력해주세요.");
        } else {
            setUserNameError("");
        }
    };

    // 닉네임 검사
    const [userNick, setUserNick] = useState("");
    const [userNickError, setUserNickError] = useState("");

    const handleUserNickChange = (event) => {
        const value = event.target.value;
        setUserNick(value);
        
        if (value.length == 0) {
            setUserNickError("닉네임을 입력해주세요.");
        } else {
            setUserNickError("");
        }
    };

    // // 생년월일 검사
    // const [userBirth, setUserBirth] = useState("");
    // const [userBirthError, setUserBirthError] = useState("");

    // const handleUserBirthChange = (event) => {
    //     const value = event.target.value;
    //     setUserBirth(value);
        
    //     if (value.length == 0) {
    //         setUserBirthError("생년월일을 입력해주세요.");
    //     } else {
    //         setUserBirthError("");
    //     }
    // };

    //휴대전화번호 검사
    const [userTelNum, setUserTelNum] = useState("");
    const [userTelNumError, setUserTelNumError] = useState("");

    const handleUserTelNumChange = (event) => {
        const value = event.target.value;
        setUserTelNum(value);
        
        if (value.length == 0) {
            setUserTelNumError("휴대전화번호를 입력해주세요.");
        } else {
            setUserTelNumError("");
        }
    };

    // 주소 검사
    const [userAddr, setUserAddr] = useState("");
    const [userAddrError, setUserAddrError] = useState("");

    const handleUserAddrChange = (event) => {
        const value = event.target.value;
        setUserAddr(value);
        
        if (value.length == 0) {
            setUserAddrError("주소를 입력해주세요.");
        } else {
            setUserAddrError("");
        }
    };



    return(
        <div>
        <div className="wrap">
            <div className="login">
                <h2>회원가입</h2>
                    {/* <!-- 아이디 --> */}
                    <input type="text" id="userId" name="MEM_ID" maxLength="20" placeholder="아이디" value={userId} onChange={handleUserIdChange} required/>
                    {userIdError && <p className="error">{userIdError}</p>}
                    
                    {/* <!-- 비밀번호 --> */}
                    <input type="password" id="userPw" name="PASSWD" placeholder=" 비밀번호" value={userPw} onChange={handleUserPwChange} required/>
                    {userPwError && <p className="error">{userPwError}</p>}

                    {/* <!-- 비밀번호 확인 --> */}
                    <input type="password" id="userPwChk" placeholder=" 비밀번호 확인" value={userPwChk} onChange={handleUserPwChkChange} required/>
                    {!sameUserPwChk && userPwChkError && (<p className="error">{userPwChkError}</p>)}
                    {sameUserPwChk && <p className="samePw">{sameUserPwChk}</p>}

                    {/* <!-- 이름 --> */}
                    <input type="text" id="userName" name="MEM_NAME" placeholder="이름" value={userName} onChange={handleUserNameChange} required/>
                    {userNameError && <p className="error">{userNameError}</p>}

                    {/* <!-- 닉네임 --> */}
                    <input type="text" id="userNick" name="MEM_NICK" placeholder="닉네임" value={userNick} onChange={handleUserNickChange} required/>
                    {userNickError && <p className="error">{userNickError}</p>}

                    {/* <!-- 생년월일 -->  
                    <input type="text" id="userBirth" placeholder="생년월일(YYYYMMDD)" maxlength="8" value={userBirth} onChange={handleUserBirthChange} required/>
                    {userBirthError && <p className="error">{userBirthError}</p>} */}

                    {/* <!-- 휴대폰전화번호 --> */}
                    <input type="text" id="userTelNum" name="MEM_TEL" placeholder="휴대폰전화번호" maxlength="12"  value={userTelNum} onChange={handleUserTelNumChange} required/>
                    {userTelNumError && <p className="error">{userTelNumError}</p>}

                    {/* <!-- 주소 --> */}
                    <input type="text" id="userAddr" name="MEM_ADDR1" placeholder="주소" value={userAddr} onChange={handleUserAddrChange} required/>
                    <input type="text" id="userAddr_detail" name="MEM_ADDR2" placeholder="상세주소"/>
                    <div id="addr">
                        <input type="text" id="sample6_postcode" placeholder="우편번호" value={addressData ? addressData.zonecode : ""}/>
                        <AddrApi onSelectAddress={handleAddrApiSelect} />
                    </div>
                    {userAddrError && <p className="error">{userAddrError}</p>}


                    <button type="submit" className='butbut'>회원가입</button>
            </div>
        </div>
        </div>
    )
};

export default UserJoin;



