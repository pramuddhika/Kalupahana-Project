import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Engine from '../assets/engine.svg';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('/api/auth/login', { userName, password });
        const { token, user } = response.data;
        
        // Save token and user info in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Navigate based on user type
        if (user.type === 'shop') {
            navigate('/shop/booking');
        } else if (user.type === 'owner') {
            navigate('/owner');
        }
    } catch (err) {
        setErr(err.response.data.message);
    }
};

    return (
        <div className="flex w-10/12 mx-auto h-screen">
            <div className="flex justify-center items-center box-context w-1/2">
                <img src={Engine} alt="engine image" className='h-96' />
            </div>
            <div className="flex justify-center items-center box-context w-1/2">
                <form className='w-3/5'>
                    <div className='flex gap-28 mb-8'>
                        <Link to={'/'}>
                            <ChevronLeftIcon className='h-9 w-9 text-text-primary mt-1 ml-0 cursor-pointer' />
                        </Link>
                        <p className='text-text-primary text-4xl font-inter font-bold tracking-wide'>
                            Log in
                        </p>
                    </div>
                    <input 
                        type='text' 
                        placeholder='User Name' 
                        maxLength={20}
                        className='border-text-primary-600 border-b-2 w-full my-5 text-center text-xl font-inter outline-none'
                        value={userName} 
                        onChange={e => setUserName(e.target.value)}
                    />
                    <input 
                        type='password' 
                        placeholder='Password' 
                        maxLength={20}
                        className='border-text-primary-600 border-b-2 w-full my-5 text-xl text-center font-inter outline-none'
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button 
                        className='flex justify-center bg-btn-primary font-inter font-semibold text-white text-lg p-2 rounded-lg w-32 mx-auto mt-5' 
                        onClick={handleLoginClick}
                    >
                        Log in
                    </button>
                    <p className='flex justify-center font-inter text-red-600 text-lg mt-4'>{err}</p>
                </form>
            </div>
        </div>
    );
};

export default Login;
