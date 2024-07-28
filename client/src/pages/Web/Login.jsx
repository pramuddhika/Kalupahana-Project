import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Engine from '../assets/engine.svg';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { login } from '../api/auth';
import PropTypes from 'prop-types';

const CustomInput = ({ type, placeholder, value, onChange, maxLength }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        className='border-text-primary-600 border-b-2 w-full my-5 text-center text-xl font-inter outline-none'
        value={value}
        onChange={onChange}
      />
    );
};

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = async (e) => {
      e.preventDefault();

      // Check if any of the fields are empty
      if (!userName || !password) {
        setErr('All fields must be filled out');
        return;
      }
        
      try {
        const { token, user } = await login(userName, password);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        if (user.type === 'shop') {
            navigate('/shop/booking');
        } else if (user.type === 'owner') {
            navigate('/owner');
        } else {
            setErr('Invalid user type');
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

                    <CustomInput
                      type='text'
                      placeholder='User Name'
                      maxLength={20}
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                    />
                    <CustomInput
                      type='password'
                      placeholder='Password'
                      maxLength={20}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />

                    <button 
                      className='flex justify-center bg-btn-primary font-inter font-semibold text-white text-lg p-2 
                      rounded-lg w-32 mx-auto mt-5' 
                      onClick={handleLoginClick}
                    > 
                      Login
                    </button>
                    <p className='flex justify-center font-inter text-red-600 text-lg mt-4'>{err}</p>
                </form>
            </div>
        </div>
    );
};

export default Login;