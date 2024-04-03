import Engine from '../assets/engine.svg';
import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import {Link} from 'react-router-dom'


const Login = () => {
    return (
        <div className="flex w-10/12 mx-auto h-screen">

        <div className="flex justify-center items-center box-context w-1/2">
              <img src={Engine} alt="engine iamge" className='h-96'/>
        </div>

        <div className="flex justify-center items-center box-context w-1/2">
             <form className='w-3/5'>
                
                <div className='flex gap-28 mb-8'>
                  <Link to={'/'}>
                   <ChevronLeftIcon className='h-9 w-9 text-text-primary mt-1 ml-0 cursor-pointer'/>
                  </Link>
                  <p className='text-text-primary text-4xl font-inter font-bold tracking-wide'>
                   Log in
                  </p>
                </div>

                <input type='text' placeholder='User Name' 
                className='border-text-primary-600 border-b-2 w-full my-5 text-xl font-inter'/>

                <input type='text' placeholder='Password' 
                className='border-text-primary-600 border-b-2 w-full my-5 text-xl font-inter'/>

                <p className='flex justify-center font-inter text-red-600 text-lg'>This is the error</p>

                <button className='flex justify-center bg-btn-primary font-inter font-semibold text-white text-lg
                    p-2 rounded-lg w-32 mx-auto mt-5'>
                    Log in
                </button>

             </form>
        </div>

        </div>
    );
};

export default Login;