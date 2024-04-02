import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Web from './pages/Web/Web'
import Login from './pages/Web/Login'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Web/>
  },
  {
    path:'/login',
    element:<Login/>
  }
]);

function App() {

  return (
    <div className=''>
       <RouterProvider router = {router}/>
    </div>
  )
}

export default App
