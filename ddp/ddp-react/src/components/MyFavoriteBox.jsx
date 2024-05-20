import React, { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';

const MyFavoriteBox = () => {
    const [wishData, setwishData] = useState([])


    useEffect(() => {
        axios.get("http://localhost:3333/Wishlist")
            .then((res) => {
                console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
                console.log(res.data.row)
                setwishData(res.data.row)
            })
            .catch((Error) => {
                console.log(Error);
            })

    }, [])

    return (
        <section className="my-content myFavoriteBox">
            <div className="inner">
                <div className="wrap">
                    {wishData.map((item, index) => (
                        <div className="box1" key={index}>
                            <div className="imgBox">
                                <img src={`${item.IMG_PATH_1}`} alt="매물 이미지" />
                            </div>
                            <div className="text">
                                <p>매물이름 : {`${item.PRD_NAME}`}</p>
                                <p>매물주소 : {`${item.PRD_LOCA}`}</p>
                                <p>매물소개 : {`${item.PRD_INTRO}`}</p>
                                <p>최대 입찰가 : {`${item.AUC_FEE}`}</p>
                            </div>
                            <div className="button">
                                <button>삭제하기</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


export default MyFavoriteBox;