
import { Link } from 'react-router-dom';

const MyPoint = () => {
    return (
        <section className="my-content my-point">
            <div className="inner">
                <div style={{ padding: "30px" }}>
                    <div className='container'>
                        <h1>나의 경매 포인트</h1>
                        <hr></hr>
                        <div className="wrap">
                            <div className="imgBox">
                                <img src="/images/825512.png" alt="매물 이미지" />
                            </div>
                            <div className="pBox">
                                <p className="h1">사용자님의 포인트</p>
                                <div className='pointBox'>
                                    <p>10,000,000 POINT</p>
                                    <Link to="/mypage/checkout" target='_blank'><button type='button'>충전</button></Link>
                                </div>
                            </div>
                            <div className="pBox">
                                <p className="h1">총 적립포인트</p>
                                <div className="pBoxInDiv">
                                    <p>0</p>
                                    <p>P</p>
                                </div>
                            </div>
                            <div className="pBox">
                                <p className="h1">사용 포인트</p>
                                <div className="pBoxInDiv">
                                    <p>0</p>
                                    <p>P</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyPoint;