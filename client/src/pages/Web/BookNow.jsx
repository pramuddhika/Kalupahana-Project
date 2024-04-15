import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import { Link} from 'react-router-dom';
import { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/Modal';
import completed from '../assets/completed.svg';
import Warning from '../assets/warning.svg';



// const getNextThreeDays = () => {
//   const dates = [];
//   for (let i = 1; i < 4; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() + i);
//     const formattedDate = date.toISOString().split('T')[0];
//     dates.push({ date, formattedDate });
//   }
//   return dates;
// };



// const BookNow= () => {

//   const [selectedDate, setSelectedDate] = useState('');
//   const [openModal,setOpenModel] = useState(false);
//   const nextThreeDays = getNextThreeDays();
//   const Navigate = useNavigate();

//   const [booking,setBooking] = useState({
//     vehicleNumber:"",
//     customerName :"",
//     contactNumber: "",
//     vehicleCategory:"",
//     message: "",
//     date:""
//   })

//   const handleChange = (e) => {
//     setBooking( (prev) => ({...prev,[e.target.name]: e.target.value}));
//   };

//   const renderModalContent = () => (
//     <Modal open={open} onClose={() => setOpenModel(false)}>
//       <div>
//         <p className="font-bold p-3 mx-auto">SuccesFull!!</p>
//         <p>you are done.</p>
//         <div className="flex gap-10">
//           <button className="btn btn-light">test light</button>
//           <button className="btn btn-normal" onClick={() => setOpenModel(false)}>test danger</button>
//         </div>
//       </div>
//     </Modal>
//   );

//   const handleSubmit = async e => {
//     e.preventDefault();

//     //validate use inputs 
//     if (!/^[A-Z]{2,3}-\d{4}$/.test(booking.vehicleNumber)) {
//       toast.error('Please enter a valid vehicle number in the format XX-0000 or XXX-0000');
//       return;
//     }
//     if (!/^07[0-24-8]\d{7}$/.test(booking.contactNumber)) {
//       toast.error('Please enter a valid contact number.');
//       return;
//     }
//     if (!/^[a-zA-Z\s]*$/.test(booking.customerName)) {
//       toast.error('Customer name can only contain letters and spaces.');
//       return;
//     }
//     try{
//       await axios.post("http://localhost:8000/api/booking/add", booking)
//       renderModalContent();
//       Navigate("/");
//     }catch(err){
//       toast.error(err.response.data);
//     }
//   }

//   const handleSelectChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   // console.log(booking);

//     return (
//         <div className="flex justify-center items-center bg-text-primary h-screen">

//         <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="colored" transition: Bounce/>

//           <div className="box-context bg-white rounded-lg w-1/2 h-4/5">
//             <div className="flex p-3 mt-4">
//               <Link to='/'>
//                 <ChevronLeftIcon className='h-9 w-9 text-text-primary ml-0 cursor-pointer'/>
//               </Link>
//               <p className="font-inter text-3xl text-text-primary font-medium mx-auto">Kalupahana Motors</p>
//             </div>
  
//            <form className='font-inter mt-8'>
             
//             <div className='flex flex-row justify-center mt-2'>
//               <div className='basis-1/4'>
//                   Vehicle Number :
//               </div>
//               <div className='basis-1/2'>
//                  <input type='text' onChange={handleChange} name='vehicleNumber' placeholder='AA-0001 or AAA-0001' className='input border-b-2 w-full'/>
//               </div>
//             </div>

//             <div className='flex flex-row justify-center mt-3'>
//               <div className='basis-1/4'>
//                   Your Name :
//               </div>
//               <div className='basis-1/2'>
//                <input type='text' onChange={handleChange} name='customerName' placeholder='Name' className='input border-b-2 w-full'/>
//               </div>
//             </div>

//             <div className='flex flex-row justify-center mt-3'>
//               <div className='basis-1/4'>
//                   Contact Number :
//               </div>
//               <div className='basis-1/2'>
//                  <input type='text' onChange={handleChange} name='contactNumber' placeholder='07........' className='input border-b-2 w-full'/>
//               </div>
//             </div>

//             <div className='flex flex-row justify-center mt-3'>
//               <div className='basis-1/4'>
//                 Vehicle Category :
//               </div>
//               <div className='basis-1/2'>
//                 <input type='radio' value='petral' onChange={handleChange} name='vehicleCategory' id='Petral'/>
//                 <label htmlFor='Petral'  className='pr-6 pl-2'>Petral</label>

//                 <input type='radio' value='Disel' onChange={handleChange} name='vehicleCategory' id='Disel'/>
//                 <label htmlFor='Disel' className='pr-6 pl-2'>Disel</label>

//                 <input type='radio' value='Hybrid' onChange={handleChange} name='vehicleCategory' id='Hybrid'/>
//                 <label htmlFor='Hybrid' className='pr-6 pl-2'>Hybrid</label>

//                 <input type='radio' value='Electric' onChange={handleChange} name='vehicleCategory' id='Electric'/>
//                 <label htmlFor='Electric' className='pr-6 pl-2'>Electric</label> 
//               </div>
//             </div>

//             <div className='flex flex-row justify-center mt-3'>
//               <div className='basis-1/4'>
//                 <p>Message :</p>
//               </div>
//               <div className='basis-1/2'>
//               <textarea id="message" rows="6" onChange={handleChange} name='message' className="input block p-2.5 w-full rounded-lg border" 
//               placeholder="Write your identify error here..."/>
//               </div>
//             </div>

//             <div className='flex flex-row justify-center mt-3'>
//               <div className='basis-1/4'>
//                 <p>Select Date :</p>
//               </div>
//                 <div className='basis-1/2'>
//                   <select value={selectedDate} name='date' onChange={(event) => {handleSelectChange(event);handleChange(event);}} 
//                   className='border-2 rounded-lg outline-none w-1/2 p-1'>
//                     <option value="">Select a Date</option>
//                     {nextThreeDays.map(({ formattedDate }) => (
//                       <option key={formattedDate} value={formattedDate}>
//                         {formattedDate}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//             </div>

//             <div className='flex justify-center mt-5'> 
//               <button onClick={handleSubmit} className='btn btn-normal'>
//                Submit
//               </button>
//             </div>

//            </form>

//           </div>
//         </div>
//     );
// };

// export default BookNow;



const BookNow = () => {

  const [openModel,setOpenModel] = useState(false);
  const [openErrorModel,setOpenErrorModel] = useState(false);

  return (
    <div className="flex justify-center items-center bg-text-primary h-screen">

      <div className="box-context bg-white rounded-lg w-1/2 h-4/5">
     
        <div className="flex p-3 mt-4">
          <Link to='/'>
           <ChevronLeftIcon className='h-9 w-9 text-text-primary ml-0 cursor-pointer'/>
          </Link>
          <p className="font-inter text-3xl text-text-primary font-medium mx-auto">Kalupahana Motors</p>
        </div>

        <form className='font-inter mt-8' onSubmit={(e) => e.preventDefault()}>

          <div className='flex flex-row justify-center mt-2'>
            <div className='basis-1/4'> Vehicle Number :</div>
             <div className='basis-1/2'>
                <input type='text' name='vehicleNumber' placeholder='AA-0001 or AAA-0001' className='input border-b-2 w-full'/>
             </div>
          </div>

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4'> Your Name :</div>
            <div className='basis-1/2'>
              <input type='text' name='customerName' placeholder='Name' className='input border-b-2 w-full'/>
           </div>
          </div>

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4'>Contact Number :</div>
            <div className='basis-1/2'>
              <input type='text' name='contactNumber' placeholder='07........' className='input border-b-2 w-full'/>
            </div>
          </div>

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4'>Vehicle Category :</div>
            <div className='basis-1/2'>
              <input type='radio' value='petral' name='vehicleCategory' id='Petral'/>
              <label htmlFor='Petral'  className='pr-6 pl-2'>Petral</label>
              <input type='radio' value='Disel' name='vehicleCategory' id='Disel'/>
              <label htmlFor='Disel' className='pr-6 pl-2'>Disel</label>
              <input type='radio' value='Hybrid' name='vehicleCategory' id='Hybrid'/>
              <label htmlFor='Hybrid' className='pr-6 pl-2'>Hybrid</label>
              <input type='radio' value='Electric' name='vehicleCategory' id='Electric'/>
              <label htmlFor='Electric' className='pr-6 pl-2'>Electric</label> 
            </div>
          </div>

          <div className='flex flex-row justify-center mt-3'>
            <div className='basis-1/4'><p>Message :</p></div>
            <div className='basis-1/2'>
              <textarea id="message" rows="6" name='message' className="input block p-2.5 w-full rounded-lg border" placeholder="Write your identify error here..."/>
            </div>
          </div>

            <div className='flex justify-center mt-5'> 
             <button className='btn btn-normal' onClick={() => setOpenModel(true)}>Submit</button>
             <button className='btn btn-normal' onClick={() => setOpenErrorModel(true)}>Error</button>
            </div>

          </form>

          <Modal open={openModel} onClose={ () => setOpenModel(false)}>
            <div onClick={() => setOpenModel(false)}>
             <div onClick={(e) => e.stopPropagation()}>
                <p className="font-bold pb-2 text-text-primary text-2xl text-center">Completed!</p>
                <img src={completed} className='h-44 mx-auto'/>
                <div className='text-center pt-2'>
                  <p>If you need to cancel your reservation for any reason,</p>
                  <p>Please contact the shop directly</p>
                </div>
                <div className="flex justify-center">
                 <button className="btn btn-normal mx-auto mt-2" onClick={() => setOpenModel(false)}>Ok</button>
               </div>
              </div>
            </div>
          </Modal>

          <Modal open={openErrorModel} onClose={ () => setOpenErrorModel(false)}>
            <div onClick={() => setOpenErrorModel(false)}>
             <div onClick={(e) => e.stopPropagation()}>
                <p className="font-bold pb-2 text-red-600 text-2xl text-center">Warning!</p>
                <img src={Warning} className='h-44 mx-auto'/>
                <div className='text-center pt-2'>
                  <p>Something want wrong!,</p>
                  <p>Please try again late.</p>
                </div>
                <div className="flex justify-center">
                 <button className="btn btn-warning mx-auto mt-2" onClick={() => setOpenErrorModel(false)}>Ok</button>
               </div>
              </div>
            </div>
          </Modal>

      </div>
    </div>
  );
};

export default BookNow;