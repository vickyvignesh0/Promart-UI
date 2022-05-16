import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Compare from './pages/Compare';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Search from "./sections/@dashboard/products/Search";

// ----------------------------------------------------------------------

// const product = {
//   title:'OPPO A31 (Mystery Black, 6GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers',
//   image:"https://m.media-amazon.com/images/I/71KCwNV6MuL._SX679_.jpg",
//   price:"₹ 13999",
//   specifications_flat:"Enjoy the immersive sound and optimal comfort with the Apple AirPods Pro with Wireless Charging Case, sweat- and water-resistant wireless Bluetooth earphones that use optical sensors and a motion accelerometer to detect when they're in your ears. The all-new, lightweight, in-ear design boasts a customizable fit while providing complete sonic performance. Use Active Noise Cancellation to keep you focused on enjoying your content, or switch to Transparency Mode to stay aware of what's going on in the environment around you. To ensure a rewarding listening experience, the AirPods Pro utilizes Adaptive EQ to automatically sculpt the tonal output to suit your unique ear shape.",
//   best_shop:"Amazon.in  ",
//   ratings_breakdown:{
//     five_star:856,
//     four_star:1235,
//     three_star:286,
//     two_star:203,
//     one_star:152
//   },
//   offer:[
//     {
//       price:17999,
//       shop:'RelianceDigital'
//     },
//     {
//       price:17999,
//       shop:'Poorvika'
//     },
//     {
//       price:16999,
//       shop:'GadgetsNow'
//     },
//     {
//       price:26999,
//       shop:'VijaySales'
//     },
//     {
//       price:26999,
//       shop:'RelianceDigital'
//     },
//     {
//       price:26990,
//       shop:'Poorvika'
//     },
//   ],
//   analysis: {
//     positive:5457,
//     negative:1235,
//     neutral:2585
//   },
//   specifications:{
//
//   }
// }

export default function Router() {

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <Products /> },
        { path: 'compare', element: <Compare /> },
        { path: 'products', element: <DashboardApp /> },
        { path: 'search', element: <Search /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
