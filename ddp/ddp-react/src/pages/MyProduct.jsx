import MyProductBox from "../components/MyProductBox"


const MyProduct = () => {
    return (
        <section className="my-content my-product">
            <div className="inner">
                <div >
                    <h1>내 매물</h1>
                    <hr></hr>
                    <div>
                        <MyProductBox />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyProduct