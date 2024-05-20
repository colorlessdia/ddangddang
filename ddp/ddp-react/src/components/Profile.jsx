import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import Alarm from './Alarm';

const Profile = () => {
  const userData = useContext(userContext);
  const navigate = useNavigate();

  // logout: remove localStorage && navigate
  const logoutHandler = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userImg');
    localStorage.removeItem('userNick');
    userData.setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <ul className="user-panel profile">
      <Alarm />
      <li>
        <span className="profile-nick">{localStorage.getItem('userNick')}</span>
      </li>
      <li>
        <div></div>
        <div className="profile-img">
          <Link to="/mypage">
            <img src={localStorage.getItem('userImg')} alt="" />
          </Link>
        </div>
      </li>
      <li>
        <button 
          className="logout-button"
          onClick={logoutHandler}
        >로그아웃</button>
      </li>
    </ul>
  );
};

export default Profile;