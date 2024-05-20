import MyFavoriteBox from "../components/MyFavoriteBox"

const MyFavorite = () => {


  
  return (
    <section className="my-content my-favorite">
      <div className="inner">
      <div >
        <h1>나의 찜목록</h1>  
        <hr></hr>
        <div>
        <MyFavoriteBox />
        </div>
        </div>
      </div>
    </section>
  );
};

export default MyFavorite;