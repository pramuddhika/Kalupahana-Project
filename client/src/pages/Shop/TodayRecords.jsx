import { useEffect, useState } from 'react';
import Select from 'react-select';
import customStyles from '../components/SelectStyle';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import ShopHeader from '../components/ShopHeader';
import { useNavigate } from 'react-router-dom';


const TodayRecords = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [data, setData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedVehicleNumber, setSelectedVehicleNumber] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        const result = await axios('/api/settings/getNextDateNumbers');
        setNumbers(result.data.numbers.map(item => ({ value: item.numbers, label: item.numbers })));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedVehicleNumber) {
      const fetchData = async () => {
        const res = await axios.get(`/api/records/getData/${selectedVehicleNumber}`);
        setData(res.data.record);
      };
      fetchData();
    }
  }, [selectedVehicleNumber]);

  const options = [
    { value: 'PreRepair', label: 'PreRepair Assessment' },
    { value: 'PostRepair', label: 'PostRepair Assessment' },
    { value: 'MecNote', label: "Mechanic's Note" }
  ];

  const handleChange = (selectedOption) => {
    if (!selectedRow) {
      toast.warning('Please select a job');
      return;
    }
    setSelectedOption(selectedOption);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleVehicleNumberChange = (selectedOption) => {
    setSelectedVehicleNumber(selectedOption ? selectedOption.value : null);
  };

  const renderContent = () => {
    if (!selectedOption) {
      return <p>No selection made.</p>;
    }

    switch (selectedOption.value) {
      case 'PreRepair':
        return PreRepairDoc();
      case 'PostRepair':
        return PostRepairDoc();
      case 'MecNote':
        return MecNote();
      default:
        return <p className='text-center'>No selection made.</p>;
    }
  };

  const PreRepairDoc = () => {
    return (
      <>
        <p className='topic'>PreRepair Assessment</p>
        <table className='mx-auto font-inter mt-4 w-11/12'>
          <tbody>
            <tr className='text-center'>
              <td className='tableh w-1/4'>Document Id</td>
              <td className='w-1/4 tabled'>{selectedRow?.preDoc || 'On going job'}</td>
              <td className='tableh w-1/4'>Date</td>
              <td className='w-1/4 tabled'>{selectedRow?.startDate || 'On going job'}</td>
            </tr>
            <tr><td></td></tr>

            <tr>
              <td colSpan={4} className='text-start pt-4'>Check List</td>
            </tr>
            <tr className='text-center'>
              <td className='tableh'>Spare Tire</td>
              <td className='tabled'>{selectedRow?.spareTire || 'Not checked'}</td>
              <td className='tableh'>Tire Jack</td>
              <td className='tabled'>{selectedRow?.tireJack || 'Not checked'}</td>
            </tr>
            <tr className='text-center'>
              <td className='tableh'>Lug Wrench</td>
              <td className='tabled'>{selectedRow?.lugWrench || 'Not checked'}</td>
              <td className='tableh'>Tool Box</td>
              <td className='tabled'>{selectedRow?.toolBox || 'Not checked'}</td>
            </tr>
            <tr className='text-center'>
              <td className='tableh'>Jumper Cables</td>
              <td className='tabled'>{selectedRow?.jumperCables || 'Not checked'}</td>
            </tr>
            <tr><td></td></tr><tr><td></td></tr>
           
            <tr>
              <td colSpan={4} className='text-start pt-4'>Other Items</td>
            </tr>
            <tr>
              <td colSpan={4} className='tabled py-2'>{(selectedRow?.otheritems && selectedRow.otheritems.length > 0) ? selectedRow.otheritems : 'No items'}</td>
            </tr>
         
            <tr>
              <td colSpan={4} className='text-start pt-4'>Additional Note</td>
            </tr>
            <tr>
              <td colSpan={4} className='tabled py-2'>{selectedRow?.additionalNote || 'No note'}</td>
            </tr>
     
            <tr>
              <td colSpan={4} className='text-start pt-4'>vehicleFaultehicle Fault</td>
            </tr>
            <tr>
              <td colSpan={4} className='tabled py-2'>{selectedRow?.vehicleFault || 'No note'}</td>
            </tr>
           
            <tr>
              <td colSpan={4} className='text-start pt-4'>Scratch Marks</td>
            </tr>
            <tr>
              <td colSpan={4} className='tabled py-2'>
              {
               (selectedRow?.scratchMarks && selectedRow.scratchMarks.length > 0)
               ? <>
                   <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      {selectedRow.scratchMarks.split(',').slice(0, 5).map((url, index) => 
                      <img key={index} src={url.trim()} style={{width: '20%'}}/>
                      )}
                   </div>
                   <div style={{display: 'flex', justifyContent: 'space-between'}}>
                     {selectedRow.scratchMarks.split(',').slice(5, 10).map((url, index) => 
                     <img key={index+5} src={url.trim()} style={{width: '20%'}} />
                     )}
                   </div>
                 </>
               : 'No images'
              }
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  const PostRepairDoc = () => {
    return (
      <>
        <p className='topic'>PostRepair Assessment</p>
        <table className='mx-auto font-inter mt-4 w-11/12'>
          <tbody>
            <tr className='text-center'>
              <td className='tableh w-1/4'>Document Id</td>
              <td className='w-1/4 tabled'>{selectedRow?.postDoc || 'On going job'}</td>
              <td className='tableh w-1/4'>Date</td>
              <td className='w-1/4 tabled'>{selectedRow?.endDate || 'On going job'}</td>
            </tr>
            <tr><td></td></tr>
            <tr>
              <td colSpan={4} className='text-start pt-4'>Vehicle State</td>
            </tr>
            <tr className='text-center'>
              <td className='tableh'>Battery Health</td>
              <td className='tabled'>{selectedRow?.batteryHealth || 'Not checked'}</td>
              <td className='tableh'>Engine Performance</td>
              <td className='tabled'>{selectedRow?.enginePerformance || 'Not checked'}</td>
            </tr>
            <tr className='text-center'>
              <td className='tableh'>Fluid Levels</td>
              <td className='tabled'>{selectedRow?.fluidLevels || 'Not checked'}</td>
              <td className='tableh'>Tire Condition</td>
              <td className='tabled'>{selectedRow?.tireCondition || 'Not checked'}</td>
            </tr>
            <tr><td></td></tr>

            <tr>
              <td colSpan={4} className='text-start pt-4'>Mechanic Instruction</td>
            </tr>
            <tr>
              <td colSpan={4} className='tabled py-2'>{selectedRow?.mechanicInstruction || 'No note'}</td>
            </tr>

            <tr>
              <td colSpan={4} className='text-start pt-4'>Shop Owner Note</td>
            </tr>
            <tr>
              <td colSpan={4} className='tabled py-2'>{selectedRow?.shopOwnerNote || 'No note'}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  const MecNote = () => {
    return (
      <>
        <p className='topic'>Mechanic&#39;s Note</p>
        <table className="mx-auto font-inter mt-4 w-11/12">
        <thead>
         <tr className="bg-text-primary text-white">
           <th className="border-2 border-black w-48">Employee ID</th>
           <th className="border-2 border-black">Note</th>
         </tr>
        </thead>
        <tbody>
          {selectedRow?.workAllocation.length === 0 ? (
          <tr>
            <td colSpan="2" className="text-center tabled">No notes</td>
          </tr>
          ) : (
          selectedRow?.workAllocation.map((work, index) => (
          <tr key={index} className="text-center mainStyle">
            <td className="border-2 border-black">{work.employeeId}</td>
            <td className="border-2 border-black text-start pl-2">{work.mechNote}</td>
          </tr>
          ))
         )}
        </tbody>
       </table>
      </>
    );
  };
  
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light" />

      <ShopHeader pageName='Today Vehicle Records'/>
      <div className="h-9 bg-side-nav-bg border-b-2"/>

      <div className="flex card justify-center gap-20 mt-1 mx-1 p-1">
        <button className='btn btn-normal'>
           <ArrowUturnLeftIcon className='h-6 w-6 ' onClick={() => navigate(-1)}/>
        </button>
        <div className="flex p-2 gap-4 mainStyle items-center">
          <p>Vehicle Number:</p>
          <Select className='w-56'
            isClearable
            options={numbers}
            styles={customStyles}
            onChange={handleVehicleNumberChange}
          />
        </div>
        <div className="flex items-center p-2 gap-4 mainStyle">
          <p>Customer Name:</p>
          <input type="text" readOnly value={data && data[0].customer} className="input rounded-lg p-1 w-56 text-center" />
        </div>
      </div>

      <div className="flex my-1 mx-1 mainStyle">
        <div className="basis-5/12 card h-[36rem]">
          <div className='flex justify-center items-center gap-2 p-2 mt-2'>
            <Select
              className='w-60'
              options={options}
              isClearable
              styles={customStyles}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center overflow-auto max-h-[30rem] mt-2">
            <table className="mx-auto font-inter mt-4 w-11/12">
              <thead>
                <tr className='bg-text-primary text-white'>
                  <th className="border-2 border-black w-1/3">Job ID</th>
                  <th className="border-2 border-black w-1/3">PreRepair Doc</th>
                  <th className="border-2 border-black w-1/3">PostRepair Doc</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(item)}
                      className={selectedRow === item ? 'bg-gray-400' : ''}
                    >
                      <td className="border-2 border-black mainStyle text-center">{item.jobId}</td>
                      <td className="border-2 border-black mainStyle text-center">{item.preDoc}</td>
                      <td className="border-2 border-black mainStyle text-center">{item.postDoc}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">No records</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className='basis-7/12 card h-[36rem] p-4 mx-1 overflow-auto'>
          <div className={`${selectedOption?.value === 'PreRepair' ? 'PreRepairDoc' : ''} ${selectedOption?.value === 'PostRepair' ? 'PostRepairDoc' : ''} ${selectedOption?.value === 'MecNote' ? 'MecNote' : ''}`}>
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodayRecords;
