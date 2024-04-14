import cancel from '../assets/cancel.svg';

const BookingCancel = () => {

  

  
    return (
      <div className='my-6 mx-6'>

        <div className='flex mt-20'>

          <div className='w-1/2'>
            <img src={cancel} className='h-96 ml-10 mt-6'/>
          </div>

          <div className='flex items-center w-1/2'>
             
             <div className='flex items-center gap-12 box-content bg-gray-200 w-2/3 h-32 mt-2 rounded-lg font-inter'>
               <input type='text' placeholder='Enter vehicle number' className='rounded-lg p-2 ml-6 outline-none' />
               <button className='bg-text-primary text-white px-6 py-2 rounded-lg'>Search</button>
             </div>

          </div>

        </div>

        <div className='box-content bg-gray-200 w-4/5 p-2 font-inter rounded-lg'>
               <div className='flex m-2 items-center px-5'>
                 <p className='w-36'>Vehicle Number</p>
                 <input type='text' className='rounded-lg p-2 ml-6 outline-none w-72' />
               </div>
               <div className='flex m-2 items-center px-5'>
                 <p className='w-36'>Customer Name</p>
                 <input type='text' className='rounded-lg p-2 ml-6 outline-none w-72' />
               </div>
               <div className='flex m-2 items-center px-5'>
                 <p className='w-36'>Contact Number</p>
                 <input type='text' className='rounded-lg p-2 ml-6 outline-none w-72' />
               </div>
               <div className='flex m-2 items-center px-5'>
                 <p className='w-36'>Vehicle Category</p>
                 <input type='text' className='rounded-lg p-2 ml-6 outline-none w-72' />
               </div>
               <div className='flex m-2 items-center px-5'>
                 <p className='w-36'>Identify Error</p>
                 <input type='text' className='rounded-lg p-2 ml-6 outline-none w-72' />
               </div>
               <div className='flex m-2 items-center px-5'>
                 <p className='w-36'>Date</p>
                 <input type='text' className='rounded-lg p-2 ml-6 outline-none w-72' />
               </div>

               <div className='flex justify-center gap-6 mt-4'>
                 <button className='bg-red-600 text-white px-6 py-2 rounded-lg'>Clear</button>
                 <button className='bg-green-600 text-white px-6 py-2 rounded-lg'>Cancel</button>
               </div>
             </div>

        
      </div>
    );
};

export default BookingCancel;