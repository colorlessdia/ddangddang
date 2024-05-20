import { Link } from 'react-router-dom';

const Sign = () => {
  return (
    <ul className="user-panel sign">
      <li>
        <Link to="/login">로그인</Link>
      </li>
      <li>
        <Link to="/join">회원가입</Link>
      </li>
    </ul>
  );
};

export default Sign;