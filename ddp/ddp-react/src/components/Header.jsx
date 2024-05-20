import { useContext } from 'react';
import { userContext } from '../context/userContext';
import Logo from "./Logo";
import Sign from "./Sign";
import Profile from "./Profile";

const Header = ({ isActive }) => {
  const userData = useContext(userContext);

  return (
    <header
      className={`header ${isActive}`}
    >
      <div className="inner">
        <Logo />
        {userData.isLoggedIn ? <Profile /> : <Sign />}
      </div>
    </header>
  );
};

export default Header;