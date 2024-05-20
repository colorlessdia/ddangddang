import Root from "../pages/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Filter from "../pages/Filter";
import MyPage from "../pages/MyPage";
import MyInfo from "../pages/MyInfo";
import MyFavorite from "../pages/MyFavorite";
import MyPoint from "../pages/MyPoint";
import MyAuction from "../pages/MyAuction";
import NotFound from "../pages/NotFound";
import ProductUpload from "../pages/ProductUpload";
import MyProduct from "../pages/MyProduct";
import { CheckoutPage } from "../pages/Checkout";

const routerInfo = [
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/join', element: <Join /> },
      { path: '/filter', element: <Filter /> },
      {
        path: '/mypage', element: <MyPage />,
        children: [
          { index: true, element: <MyInfo /> },
          { path: '/mypage/favorite', element: <MyFavorite /> },
          { path: '/mypage/point', element: <MyPoint /> },
          { path: '/mypage/auction', element: <MyAuction /> },
          { path: '/mypage/checkout', element: <CheckoutPage/>},
          { path: '/mypage/productupload', element: <ProductUpload/>},
          { path: '/mypage/myProduct', element: <MyProduct/>},
        ],
      },
    ],
  }
];

export default routerInfo;