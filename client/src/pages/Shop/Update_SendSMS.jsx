import { useState,useContext, useEffect } from "react";
import { UpdateJobContext } from "./UpdateJobContext";
import Details from "../components/Details";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Update_SendSMS = () => {

  const [message,setMessage] = useState('');
  const { updateJobData } = useContext(UpdateJobContext);
  const [messageId,setMessageId] = useState(null);
  const [refresh,setRefresh] = useState(false);
  const [tableData,settableData] = useState(null);

  const updateJobId = updateJobData[0].jobId;
  const updateCustomerMail = updateJobData[0].email;
  
  //get data from db
  useEffect(() => {
    const fetchMessageId = async () => {
      try {
        const messageId = await axios.get('/api/updatejob/generateMessageId');
        setMessageId(messageId.data.MessageId);
      } catch (err) {
        console.log("Error fetching messageId:", err);
      }
    }
  
    const fetchMessage = async () => {
      try {
        const message = await axios.get(`/api/updatejob/getSendMessage/${updateJobId}`);
        settableData(message.data.message);
      } catch (err) {
        console.log("Error fetching message:", err);
      }
    }
    fetchMessageId();
    fetchMessage();
  }, [refresh, updateJobId]);
  

  const handelMessageChange = (e) =>{
    setMessage(e.target.value);
  }
  
  //clear the message
  const handelClearButton = () => {
    setMessage('');
  }

  //handle submit 
  const handleSubmitButton = async() =>{
    //stop empty mesage sending
    if(message.length === 0){
      toast.warning("Can't send empty message!");
      return;
    }
    
    try{
      const sendEmail = await axios.post('/api/updatejob/sendUpdates',{updateCustomerMail, message});
      if (sendEmail.data.message === "success!"){
        try{
          const sendTodb = await axios.post('/api/updatejob/addMessage',{messageId,updateJobId,message});
          toast.success(sendTodb.data.message);
          handelClearButton();
          setRefresh(!refresh);
        }catch(err){
          console.log(err)
          toast.error(err.response.data.message);
        }
      }
    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="flex flex-row mt-7">
      <div className="flex flex-col justify-center items-center basis-2/3">
        <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light" />

        <div className="h-48 card mt-5 w-11/12 p-2">
          <p className="topic">Send SMS Update</p>
          <div className="flex justify-between ">
            <div className="relative flex gap-10 my-4 ml-16 mainStyle">
              <p>Message: </p>
              <textarea rows={4} value={message} onChange={handelMessageChange} maxLength={80} 
              placeholder="Type job update" className="input rounded-lg w-96 p-2" />
              <div onChange className="absolute bottom-0.5 right-0.5 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">
                {message.length}/80
              </div>
            </div>

            <div className="flex items-end mb-4 mr-8 gap-4">
              <button className="btn btn-warning" onClick={handelClearButton}>Clear</button>
              <button className="btn btn-normal" onClick={handleSubmitButton}>Send</button>
            </div>

          </div>
        </div>

        {/**table - start */}
        <div className="box-content h-80 card mt-5 w-11/12 p-2">
          <p className="topic">Previous Updates</p>
          <div className="flex justify-center overflow-auto max-h-72">
            <table className="mx-auto font-inter mt-4 w-11/12">
             <thead>
              <tr className='bg-text-primary text-white'>
                <th className="border-2 border-black w-1/3">Meaasge ID</th>
                <th className="border-2 border-black w-2/3">Message</th>
              </tr>
             </thead>

              <tbody>
                {
                  (tableData === null || tableData.length === 0) ? (
                    <tr>
                      <td colSpan="2" className='text-center border-2 border-black py-2 mainStyle'>
                        No Note Available
                      </td>
                    </tr>
                  ) : (
                    tableData && tableData.map((message, index) => (
                      <tr key={index} className="text-center mainStyle">
                        <td className="border-2 border-black">{message.messageId}</td>
                        <td className="border-2 border-black text-start pl-2">{message.message}</td>
                      </tr>
                    ))
                  )
                }
              </tbody>         
            </table>
          </div>
        </div>
        {/**table - end */}
      </div>

      <div className="basis-1/3">
        <Details/>
      </div>    
    </div>
  );
};

export default Update_SendSMS;