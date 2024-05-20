import { Outlet } from 'react-router-dom';
import MyPageBar from '../components/MyPageBar';

const MyPage = () => {
  return (
    <>
      <main className="mypage">
        <div className="inner">
          <MyPageBar />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MyPage;