import {createBrowserRouter,Outlet,RouterProvider} from 'react-router-dom'
import SideNav from './pages/components/SideNav'

import Web from './pages/Web/Web'
import Login from './pages/Web/Login'
import BookNow from './pages/Web/BookNow'

import Booking from './pages/Shop/Booking'
import OpenJob from './pages/Shop/OpenJob'
import UpdateJob from './pages/Shop/UpdateJob'
import Records from './pages/Shop/Records'
import Feedbacks from './pages/Shop/Feedbacks'
import Mechanics from './pages/Shop/Mechanics'
import MechanicsMenu from './pages/Shop/MechanicsMenu'
import MechanicsAdd from './pages/Shop/MechanicsAdd'
import MechanicsUpdate from './pages/Shop/MechanicsUpdate'
import Stock from './pages/Shop/Stock'
import ShopSetting from './pages/Shop/ShopSetting'
import UpdateMenu from './pages/Shop/Update_Search'
import Update_Search from './pages/Shop/Update_Search'
import VehicleDetails from './pages/Shop/OpenJob_VehicleDetails';
import VehicleSearch from './pages/Shop/OpenJob_Search';
import PreRepair from './pages/Shop/PreRepairAssessment';
import Edit from './pages/Shop/Update_EditDetails';

import Owner from './pages/Admin/Owner'
import Home from './pages/Admin/Home'
import Security from './pages/Admin/Security'
import StockOwner from './pages/Admin/Stock'
import Summary from './pages/Admin/Summary'
import FeedbacksOwner from './pages/Admin/Feedbacks'
import BookingOwner from './pages/Admin/Booking'


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
  { path:'/booknow',         element:<BookNow/>},
  { path: '/shop' ,          element:<ShopLayout/> ,  
    children:[
       {path: 'booking',     element:<Booking/>     },
       {path: 'stock',       element:<Stock/>       },
       {path: 'feedbacks',   element:<Feedbacks/>   },
       {path: 'mechanics/*',   element:<Mechanics/>, children:[
              { path:'' ,      element:<MechanicsMenu/>       },
              { path:'add'  ,      element:<MechanicsAdd/>        },
              { path: 'update',    element:<MechanicsUpdate/>     }      
       ]},
       {path: 'OpenJob/*',   element:<OpenJob/>  , children:[
              {path:'' ,           element:<VehicleSearch/>       },
              {path:'details',     element:<VehicleDetails/>      },
              {path:'prerepair',   element:<PreRepair/>           }
       ]},
       {path: 'updateJob/*',   element:<UpdateJob/>, children:[ 
              {path:'',            element:<Update_Search/>       },
              {path:'menu',        element:<UpdateMenu/>          },
              {path:'edit',        element:<Edit/>                }
      ]},
       {path: 'records',     element:<Records/>     },
       {path: 'setting',     element:<ShopSetting/> }    ]
  },
  { path:'/owner/*',           element: <Owner/>,
       children: [
         {path: '' ,           element:<Home/>        },
         {path: 'security',    element:<Security/>    },
         {path: 'stock',       element:<StockOwner/>  },
         {path: 'summary' ,    element:<Summary/>     },
         {path: 'feedbacks' ,  element:<FeedbacksOwner/>},
         {path: 'booking',     element:<BookingOwner/>}
       ]
  },
]);

function App() {

  return (
    <div className=''>
       <RouterProvider router = {router}/>
    </div>
  )
}

export default App
