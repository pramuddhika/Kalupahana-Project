import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Web from './pages/Web/Web';
import Login from './pages/Web/Login';
import BookNow from './pages/Web/BookNow';
import FeedbacksSheet from './pages/Web/Feedbacks';

import Booking from './pages/Shop/Booking';
import OpenJob from './pages/Shop/OpenJob';
import UpdateJob from './pages/Shop/UpdateJob';
import Records from './pages/Shop/Records';
import Mechanics from './pages/Shop/Mechanics';
import MechanicsMenu from './pages/Shop/Mechanics_Menu';
import MechanicsAdd from './pages/Shop/Mechanics_Add';
import MechanicsUpdate from './pages/Shop/Mechanics_Update';
import Stock from './pages/Shop/Stock';
import ShopSetting from './pages/Shop/ShopSetting';
import UpdateMenu from './pages/Shop/UpdateJob_Search';
import UpdateJob_Search from './pages/Shop/UpdateJob_Search';
import VehicleDetails from './pages/Shop/OpenJob_VehicleDetails';
import VehicleSearch from './pages/Shop/OpenJob_Search';
import PreRepair from './pages/Shop/PreRepairAssessment';
import MoreData from './pages/Shop/UpdateJob_MoreData';
import Records_Today from './pages/Shop/Records_Today';

import Home from './pages/Admin/Home';
import Security from './pages/Admin/Security';
import StockOwner from './pages/Admin/Stock';
import Summary from './pages/Admin/Summary';
import BookingOwner from './pages/Admin/Booking';

import ProtectedRoute from './pages/components/ProtectedRoute'; 
import ShopLayout from './pages/components/ShopLayout';

const router = createBrowserRouter([
  { path: '/', element: <Web /> },
  { path: '/login', element: <Login /> },
  { path: '/feedback', element: <FeedbacksSheet /> },
  { path: '/booknow', element: <BookNow /> },
  {
    path: '/shop/*',
    element: (
      <ProtectedRoute allowedRoles={['shop']}>
       <ShopLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'booking', element: <Booking /> },
      { path: 'stock', element: <Stock /> },
      { path: 'today', element: <Records_Today/>},
      {
        path: 'mechanics/*',
        element: <Mechanics />,
        children: [
          { path: '', element: <MechanicsMenu /> },
          { path: 'add', element: <MechanicsAdd /> },
          { path: 'update', element: <MechanicsUpdate /> },
        ],
      },
      {
        path: 'openjob/*',
        element: <OpenJob />,
        children: [
          { path: '', element: <VehicleSearch /> },
          { path: 'details', element: <VehicleDetails /> },
          { path: 'prerepair', element: <PreRepair /> },
        ],
      },
      {
        path: 'updatejob/*',
        element: <UpdateJob />,
        children: [
          { path: '', element: <UpdateJob_Search /> },
          { path: 'menu', element: <UpdateMenu /> },
          { path: 'moredata', element: <MoreData /> },
        ],
      },
      { path: 'records', element: <Records /> },
      { path: 'setting', element: <ShopSetting /> },
    ],
  },
  {
    path: '/owner/*',
    element: (
      <ProtectedRoute allowedRoles={['owner']}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Home /> },
      { path: 'security', element: <Security /> },
      { path: 'stock', element: <StockOwner /> },
      { path: 'summary', element: <Summary /> },
      { path: 'booking', element: <BookingOwner /> },
    ],
  },
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
