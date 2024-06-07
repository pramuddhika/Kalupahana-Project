import { useState } from 'react';
import Select from 'react-select';
import customStyles from '../components/SelectStyle';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Records_Details = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Make selection options
  const options = [
    { value: 'PreRepair', label: 'PreRepair Assessment' },
    { value: 'PostRepair', label: 'PostRepair Assessment' },
    { value: 'MecNote', label: "Mechanic's Note" }
  ];

  // Handle change in selection
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  // Render content based on the selected option
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
    return(
      <p>Content for PreRepair Assessment.</p>
    );
  };

  const PostRepairDoc = () => {
    return(
      <p>Content for PostRepair Assessment.</p>
    );
  };

  const MecNote = () => {
    return(
      <p>Content for PostRepair Assessment.</p>
    );
  };

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light" />
      
      <div className="flex card justify-center mt-1 mx-1">
        <div className="flex p-2 gap-4 mainStyle items-center">
          <p>Vehicle Number:</p>
          <input type="text" readOnly className="input rounded-lg p-1 w-32" />
        </div>
        <div className="flex p-2 gap-4 mainStyle">
          <p>Customer Name:</p>
          <input type="text" readOnly className="input rounded-lg p-1 w-40" />
        </div>
        <div className="flex p-2 gap-4 mainStyle">
          <p>Phone Number:</p>
          <input type="text" readOnly className="input rounded-lg p-1 w-36" />
        </div>
        <div className="flex p-2 gap-4 mainStyle">
          <p>Customer Email:</p>
          <input type="text" readOnly className="input rounded-lg p-1 w-64" />
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
            <button
              className={`btn btn-normal ${selectedOption?.value === 'MecNote' ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={selectedOption?.value === 'MecNote'}
            >
              Email
            </button>
            <button
              className={`btn btn-normal ${selectedOption?.value === 'MecNote' ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={selectedOption?.value === 'MecNote'}
            >
              Download
            </button>
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
                <tr className='text-center'>
                  <td className="border-2 border-black mainStyle">test</td>
                  <td className="border-2 border-black mainStyle">test</td>
                  <td className="border-2 border-black mainStyle">test</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='basis-7/12 card h-[36rem] p-4 mx-1 overflow-auto'>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Records_Details;
