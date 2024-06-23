import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import {useNavigate,Link} from 'react-router-dom';
import Hero from '../assets/Hero.svg';
import Engine from '../assets/engine.svg';
import { useState } from 'react';
import Modal from '../components/Modal';
import Warning from '../assets/warning.svg';
import ModalContent from '../components/template/ModalContent';
import { checkBookingAvailability } from '../api/Shop-Booking';

const Web = () => {

   const [openErrorModel,setOpenErrorModel] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const navigate = useNavigate();

   const handleBookingButton = async () => {
      try {
        const res = await checkBookingAvailability();
        if (res.message === 'Can') {
          navigate('/booknow');
        } else if (res.message === 'Cannot') {
          setErrorMessage('All were booked!, Try later!');
          setOpenErrorModel(true);
        } else {
          setErrorMessage('Error occurred!');
          setOpenErrorModel(true);
        }
      } catch (err) {
        setErrorMessage('Error occurred!');
        setOpenErrorModel(true);
      }
   };

   return (
      <div>
         {/*hero section -start*/}
         <div className="relative h-screen w-full">
            <img src={Hero} className='h-full w-full object-cover object-top'/>

            <div className='absolute top-0 flex justify-end bg-web-primary w-full'>
               <p className='p-1 font-inter font-semibold cursor-pointer '>
                <Link to={'/login'}>login</Link> 
               </p>
               <ArrowRightEndOnRectangleIcon className='h-7 w-7  mt-1 mr-2'/>
            </div>

            <div className='absolute left-7 top-64'>
               <p className='font-inter text-6xl font-bold text-white'>Kalupahana Motor <br/> Engineering</p>
               <p className='font-inter font-medium mt-3 text-white'>Where Expertise Drives Excellence</p>
               <button className='bg-btn-primary rounded-lg w-36 p-2 mt-4'>
                  <p className='text-white font-inter font-semibold' onClick={handleBookingButton}>Book Now</p>
               </button>
            </div>
         </div>
         {/* hero section -end*/} 

         {/*opening data - start */}
         <div className='flex w-10/12 mx-auto my-10'>

            <div className='flex justify-center items-center box-content h-1/2 w-5/12'>
               <img src={Engine} className='h-96 w-auto'/>
            </div>

            <div className='box-content h-1/2 w-7/12 mt-5'>
               <div className='flex items-center w-full'>
                  <div>
                     <p className='font-inter text-4xl font-bold p-2 ml-7 mr-14'>The Shop</p>
                  </div>
                  <div className='border-l-2 border-gray-400'>
                     <p className='font-inter text-2xl p-5 ml-14'>
                        Mahingoda Junction Bus Stop,<br/>
                        Ratnapura Road,<br/> 
                        Eheliyagoda.<br/>
                        077 388 0154
                     </p>
                  </div>
               </div>

                     
               <div className='border-t-2 border-gray-400'>
                  <div className='flex justify-center font-inter font-bold text-4xl p-6'>
                     <p>Working Hours</p>
                  </div>
                  <div className='text-justify text-2xl font-inter'>
                     <p className='flex justify-center'>Monday - Friday : 8.00 am  - 5.00 pm</p>
                     <p className='flex justify-center'>Saturday : 8.00 am - 7.00 pm</p>
                  </div>
               </div>

            </div>
         </div>
         {/*opening data -end */}

         {/**footer-start */}
         <div className='flex justify-center bg-web-primary w-full '>
            <p className='p-2'>&copy;All Rights Reserved</p>
         </div>
         {/**footer-end */}

          
         <Modal open={openErrorModel}>
            <ModalContent 
              messageStyle = "text-red-700 font-semibold"
              message={errorMessage} 
              image={Warning} 
              buttonLabel="Ok"
              buttonStyles = "btn btn-warning mx-auto mt-2"
              onButtonClick={() => setOpenErrorModel(false)} 
            />
         </Modal>
      </div>
   );
};

export default Web;