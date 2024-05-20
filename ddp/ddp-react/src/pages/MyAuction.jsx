import MyAcutionBox from "../components/MyAcutionBox";

const MyAuction = () => {
  return (
    <section className="my-content my-auction">
      <div className="inner">
      <div >
        <h1>나의 경매</h1>  
        <hr></hr>
        <div>
        <MyAcutionBox />
        </div>
        </div>
      </div>
    </section>
  );
};

export default MyAuction;