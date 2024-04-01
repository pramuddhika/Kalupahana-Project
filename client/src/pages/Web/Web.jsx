import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import Hero from '../assets/Hero.svg'
import Engine from '../assets/engine.svg'

const Web = () => {
    return (
        <div>
           {/*hero section -start*/}
           <div className="relative h-screen w-full">
              <img src={Hero} className='h-full w-full object-cover object-top'/>

              <div className='absolute top-0 flex justify-end bg-web-primary w-full'>
                <p className='p-1 font-inter font-semibold cursor-pointer '>login</p>
                <ArrowRightEndOnRectangleIcon className='h-7 w-7  mt-1 mr-2'/>
              </div>

              <div className='absolute left-7 top-64'>
                 <p className='font-inter text-6xl font-bold text-white'>Kalupahana Motor <br/> Engineering</p>
                 <p className='font-inter font-medium mt-3 text-white'>Where Expertise Drives Excellence</p>
                 <button className='bg-btn-primary rounded-lg w-36 p-2 mt-4'>
                    <p className='text-white font-inter font-semibold'>Book Now</p>
                 </button>
              </div>

           </div>
           {/* hero section -end*/} 

           {/*opening data - start */}
           <div className='flex w-10/12 mx-auto my-10'>

              <div className='flex justify-center items-center box-content h-1/2 w-5/12 border-2'>
                 <img src={Engine} className='h-96 w-auto'/>
              </div>

              <div className='box content h-1/2 w-7/12 border-2'>

                  <div className='flex items-center w-full'>

                     <div className='flex items-center '>
                        <p className='font-inter text-3xl font-bold p-2 w-6/12'>The Shop</p>
                     </div>

                     <div className='w-6/12'>
                        <p className='font-inter text-2xl p-5'>
                           Mahingoda Junction Bus Stop,<br/>
                           Ratnapura Road,<br/> 
                           Eheliyagoda.<br/>
                           077 388 0154
                        </p>
                     </div>

                  </div>

                     
                  <div className=''>
                     <div>
                        <p>Working Hours</p>
                     </div>
                     <div>
                        <p>
                           Monday - Friday : 8.00 am  - 5.00 pm <br/>
                           Saturday : 8.00 am - 7.00 pm
                        </p>
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

        </div>
    );
};

export default Web;