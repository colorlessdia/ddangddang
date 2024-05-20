const Footer = () => {
  return (
    <footer className="footer">
      <div className="inner">
        <ul className="footer-info-list">
          <li className="tel">고객센터 062-123-5678</li>
          <li className="email"><a href="emailto:can@i.coding">이메일: can@i.coding</a></li>
          <li><address>주소: 광주광역시 동구 제봉로92 인공지능사관학교 JS-A</address></li>
        </ul>
        <p className="copy">&copy; 2023. can i coding?. all rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;