import ShopHeader from "../components/ShopHeader";
import { UpdateJobContext } from './UpdateJobContext';
import { useContext } from "react";
import { useNavigate} from 'react-router-dom';

const Update_MoreDetails = () => {

  const {updateJobData} = useContext(UpdateJobContext);
  const navigate = useNavigate();

  return (
    <div>
      <ShopHeader pageName="More Details"/>
      <div className="h-9 bg-side-nav-bg border-b-2"/>
          
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="flex card justify-center w-10/12 p-8">
          <div className="w-1/2">

            <p className="topic">Vehicle Details</p>

            <div className="flex justify-center items-center p-2 mainStyle">
              <div className="basis-1/4"><p className="font-semibold">Vehicle Number:</p></div>
              <div className="basis-1/2">
                <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={updateJobData[0].vehicleNumber} readOnly/>
              </div>
            </div>

            <div className="flex justify-center items-center p-2 mainStyle">
              <div className="basis-1/4"><p className="font-semibold">Model:</p></div>
              <div className="basis-1/2">
                <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={updateJobData[0].model} readOnly/>
              </div>
            </div>

            <div className="flex justify-center items-center p-2 mainStyle">
              <div className="basis-1/4"><p className="font-semibold">Fule Type:</p></div>
              <div className="basis-1/2">
                <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={updateJobData[0].fule} readOnly/>
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <p className="topic">Customer Details</p>

            <div className="flex justify-center items-center p-2 mainStyle">
              <div className="w-36"><p className="font-semibold">Customer Name:</p></div>
              <div className="basis-1/2">
                <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={updateJobData[0].customer} readOnly/>
              </div>
            </div>

            <div className="flex justify-center items-center p-2 mainStyle">
              <div className="w-36"><p className="font-semibold">Email:</p></div>
              <div className="basis-1/2">
                <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={updateJobData[0].email} readOnly/>
              </div>
            </div>

            <div className="flex justify-center items-center p-2 mainStyle">
              <div className="w-36"><p className="font-semibold">Contact Number:</p></div>
              <div className="basis-1/2">
                <input type="text" className="input rounded-lg ml-4 p-2 w-60" value={updateJobData[0].phoneNumber} readOnly/>
              </div>
            </div>
          </div>
        </div>

        <div className="card w-10/12 p-8 mt-2">
          <p className="topic">Job Details</p>

          <div className="flex items-center p-2 mainStyle">
            <div className="ml-16 w-32"><p className="font-semibold">Job Id:</p></div>
            <div className="basis-1/2">
              <input type="text" className="input rounded-lg ml-5 p-2 w-60" value={updateJobData[0].jobId} readOnly/>
            </div>
          </div>

          <div className="flex items-center p-2 mainStyle">
            <div className="ml-16 w-32"><p className="font-semibold">Vehicle Fault:</p></div>
            <div className="w-9/12">
              <textarea rows={3} className="input rounded-lg ml-5 p-2 w-full" value={updateJobData[0].fault} readOnly/>
            </div>
          </div>
          
          <div className="flex justify-end mr-14">
            <button className="btn btn-warning" onClick={ () => navigate(-1)} >Back</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Update_MoreDetails;