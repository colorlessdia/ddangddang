const TopButton = ({ isActive }) => {
  const clickHandler = (e) => {
    e.preventDefault();

    document.documentElement.scrollIntoView({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`top-button ${isActive}`}
      onClick={clickHandler}
    >
      Top
    </button>
  );
};

export default TopButton;