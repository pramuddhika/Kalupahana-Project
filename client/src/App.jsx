import {createBrowserRouter,Outlet,RouterProvider} from 'react-router-dom'
import SideNav from './pages/components/SideNav'

import Web from './pages/Web/Web'
import Login from './pages/Web/Login'

import Booking from './pages/Shop/Booking'
import OpenJob from './pages/Shop/OpenJob'
import UpdateJob from './pages/Shop/UpdateJob'
import Records from './pages/Shop/Records'
import Feedbacks from './pages/Shop/Feedbacks'
import Mechanics from './pages/Shop/Mechanics'
import Stock from './pages/Shop/Stock'
import ShopSetting from './pages/Shop/ShopSetting'


const ShopLayout = () => {
  return (
    <div className='flex h-screen '>
        <div className='w-[180px]'>
        <SideNav/>
        </div>
        <div className='w-calc'>
        <Outlet/>
        </div>
    </div>
  );
}

const router = createBrowserRouter([
  { path:'/',                element:<Web/>    },
  { path:'/login' ,          element:<Login/>  },
  { path: '/shop' ,          element:<ShopLayout/> ,  children:[
       {path: 'booking',     element:<Booking/>     },
       {path: 'stock',       element:<Stock/>       },
       {path: 'feedbacks',   element:<Feedbacks/>   },
       {path: 'mechanics',   element:<Mechanics/>   },
       {path: 'OpenJob',     element:<OpenJob/>     },
       {path: 'updateJob',   element:<UpdateJob/>   },
       {path: 'records',     element:<Records/>     },
       {path: 'shopsetting', element:<ShopSetting/> },
  ]} 
]);

function App() {

  return (
    <div className=''>
       <RouterProvider router = {router}/>
    </div>
  )
}

export default App
