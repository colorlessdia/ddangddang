import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routerInfo from './router/router';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const router = createBrowserRouter(routerInfo);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 2500);
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
