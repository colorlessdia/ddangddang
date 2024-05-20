


const ProductUpload = () => {

    return (
        <section className="my-content my-upload">
            <div className="inner" >
                <div>
                    <h1>매물 올리기</h1>
                    <hr />
                    <form action="/upload" method="post" enctype="multipart/form-data">
                        <table>
                            <tr>
                                <td>이미지 업로드</td>
                                <td><input type="file" name="image" multiple /></td>
                            </tr>
                            <tr>
                                <td>매물 유형</td>
                                <td>
                                    <select name="property_type" id="property_type">
                                        <option value="원룸">원룸</option>
                                        <option value="펜션">펜션</option>
                                        <option value="호텔">호텔</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>매물 지역</td>
                                <td>
                                    <select name="property_location" id="property_location">
                                        <option value="광주">광주</option>
                                        <option value="전남">전남</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>매물 이름</td>
                                <td><input type="text" name="property_name" placeholder="건물명/간단한 주소를 입력해주세요."/></td>
                            </tr>
                            <tr>
                                <td>매물 주소</td>
                                <td><input type="text" name="property_address" placeholder="매물 주소를 입력해 주세요."/></td>
                            </tr>
                            <tr>
                                <td>매물 소개</td>
                                <td><input type="text" name="property_description" placeholder="간단한 매물 소개를 써주세요."/></td>
                            </tr>
                            <tr>
                                <td>매물 층</td>
                                <td><input type="text" name="property_floor" placeholder="매물의 층수를 입력해 주세요."/></td>
                            </tr>
                            <tr>
                                <td>보증금</td>
                                <td><input type="text" name="security_deposit" placeholder="보증금을 입력해주세요.(만원단위)" /></td>
                            </tr>
                            <tr>
                                <td>시작가</td>
                                <td><input type="text" name="starting_price" placeholder="경매 시작가를 입력해 주세요." /></td>
                            </tr>
                            <tr>
                                <td>상한가</td>
                                <td><input type="text" name="maximum_price" placeholder="경매 상한가를 입력해 주세요." /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button type="submit">매물 올리기</button></td>
                            </tr>
                        </table>
                    </form>


                </div>
            </div>

        </section>
    );
};

export default ProductUpload;