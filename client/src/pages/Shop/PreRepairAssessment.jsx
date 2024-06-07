import { useEffect, useState, useCallback } from "react";
import ShopHeader from "../components/ShopHeader";
import { useLocation,Link } from "react-router-dom";
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { XCircleIcon } from '@heroicons/react/24/solid';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { validateInputField, validateFileType } from '../Validation/InputFeilds';
import Modal from '../components/Modal';
import PreRepairDocument from "../components/PreRepairDocument";

const PreRepairAssessment = () => {
  const location = useLocation();
  const [vehicleNumber] = useState(location.state?.vehicleNumber);
  const [customerName] = useState(location.state?.customerName);
  const [customerEmail] = useState(location.state?.customerEmail);
  const [customerPhoneNumber] = useState(location.state?.customerPhoneNumber);
  const today = new Date();
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [preDocId, setPreDocId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [files, setFiles] = useState([]);
  const [additionalNote, setAdditionalNote] = useState('');
  const [vehicleFault, setVehicleFault] = useState('');
  const [otherItems, setOtherItems] = useState('');
  const [jobOpenModal,setJobOpenModal] = useState(false);
  const [checkList, setCheckList] = useState({
    spareTire: "no",
    tireJack: "no",
    lugWrench: "no",
    toolBox: "no",
    jumperCable: "no"
  });

  useEffect(() => {
    const fetchPreRepairDocId = async () => {
      try {
        const { data } = await axios.get('/api/openjob/generatePreRepairId');
        setPreDocId(data.PreRepairDocumentId);
      } catch (err) {
        console.error('Error fetching pre-repair document ID:', err);
      }
    };

    const fetchJobId = async () => {
      try {
        const { data } = await axios.get('/api/openjob/generateJobId');
        setJobId(data.JobId);
      } catch (err) {
        console.error('Error fetching job ID:', err);
      }
    };

    fetchPreRepairDocId();
    fetchJobId();
  }, []);

  const onDrop = useCallback(acceptedFiles => {
    if (files.length + acceptedFiles.length > 10) {
      toast.warning('You can only upload up to 10 images.');
      return;
    }
    setFiles(prev => [...prev, ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))]);
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const removeFile = file => () => {
    setFiles(prev => prev.filter(f => f !== file));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckList(prev => ({
      ...prev,
      [name]: checked ? 'yes' : 'no'
    }));
  };

  const handleDataSubmit = async (e) => {
    e.preventDefault();

    const emptyFaultError = validateInputField(vehicleFault);
    const ImageError = validateFileType(files);

    if (ImageError) {
      toast.warning(ImageError);
      return;
    }
    if (emptyFaultError) {
      toast.warning("Vehicle fault is required!");
      return;
    }

    try {
      const { data: checkVehicle } = await axios.get(`/api/openjob/checkVehicleReopeningJob/${vehicleNumber}`);
      if (checkVehicle.message === "ONGOING") {
        toast.warning("This vehicle has an ongoing job.");
        return;
      }

      await axios.post('/api/openjob/addPreRepairData', { preDocId, vehicleFault, additionalNote, checkList });

      if (otherItems.length > 0) {
        await axios.post('/api/openjob/addOtherItemsData', { preDocId, otherItems });
      }

      if (files.length > 0) {
        const formData = new FormData();
        formData.append('preDocId', preDocId);
        files.forEach(file => formData.append('images', file));
        await axios.post('/api/openjob/addImagesData', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      await axios.post('/api/openjob/addRecordData', { jobId, vehicleNumber, dateString, preDocId });
      toast.success("Job open successfully");
      setJobOpenModal(true);
      // handleDataClear();
    } catch (err) {
      console.error("Error submitting data:", err);
      toast.error("An error occurred while submitting the data.");
    }
  };

  const handleDataClear = () => {
    setCheckList({
      spareTire: 'no',
      tireJack: 'no',
      lugWrench: 'no',
      toolBox: 'no',
      jumperCable: 'no'
    });
    setOtherItems('');
    setAdditionalNote('');
    setVehicleFault('');
    setFiles([]);
  };

  return (
    <div>
      <ShopHeader pageName="Pre-repair Assessment" />
      <div className="h-9 bg-side-nav-bg border-b-2" />

      <ToastContainer position='bottom-right' hideProgressBar={false} closeOnClick theme="light" />

      <div className="flex flex-col items-center justify-center mt-7">
        <div className="flex card w-10/12 p-2 mb-7">
          <div className="w-1/2">
            <div className="flex justify-center items-center gap-4">
              <p className="mainStyle w-48 p-2">Vehicle Number:</p>
              <input className="input rounded-lg w-60 p-1 pl-3" value={vehicleNumber} readOnly />
            </div>
            <div className="flex justify-center items-center gap-4">
              <p className="mainStyle w-48 p-2">Customer Name:</p>
              <input className="input rounded-lg w-60 p-1 pl-3" value={customerName} readOnly />
            </div>
            <div className="flex justify-center items-center gap-4">
              <p className="mainStyle w-48 p-2">Customer Email:</p>
              <input className="input rounded-lg w-60 p-1 pl-3" value={customerEmail} readOnly />
            </div>
            <div className="flex justify-center items-center gap-4">
              <p className="mainStyle w-48 p-2">Phone Number:</p>
              <input className="input rounded-lg w-60 p-1 pl-3" value={customerPhoneNumber} readOnly />
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex justify-center items-center gap-4">
              <p className="mainStyle w-48 p-2">Document Number:</p>
              <input className="input rounded-lg w-60 p-1 text-center" value={preDocId} readOnly />
            </div>
            <div className="flex justify-center items-center gap-4">
              <p className="mainStyle w-48 p-2">Repair Job Number:</p>
              <input className="input rounded-lg w-60 p-1 text-center" value={jobId} readOnly />
            </div>
            <div className="flex justify-center items-center gap-4">
              <p className="mainStyle w-48 p-2">Date:</p>
              <input className="input rounded-lg w-60 p-1 text-center" value={dateString} readOnly />
            </div>
          </div>
        </div>

        <div className="card w-10/12 p-2">
          <p className="topic mt-3 mb-1">Check list</p>
          <div className="flex justify-center">
            <div className="flex justify-center w-1/2">
              <div className="w-1/2 ml-12">
                {['spareTire', 'tireJack', 'lugWrench'].map(item => (
                  <div key={item} className="my-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mr-2"
                        onChange={handleCheckboxChange}
                        name={item}
                        checked={checkList[item] === 'yes'}
                      />
                      <p className="mainStyle">{item.replace(/([A-Z])/g, ' $1')}</p>
                    </label>
                  </div>
                ))}
              </div>

              <div className="w-1/2">
                {['toolBox', 'jumperCable'].map(item => (
                  <div key={item} className="my-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mr-2"
                        onChange={handleCheckboxChange}
                        name={item}
                        checked={checkList[item] === 'yes'}
                      />
                      <p className="mainStyle">{item.replace(/([A-Z])/g, ' $1')}</p>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-1/2">
              <p className="mainStyle mb-1">Other items:</p>
              <div className="relative font-inter">
                <textarea
                  rows={3}
                  className="w-10/12 ml-10 rounded-lg input p-2"
                  value={otherItems}
                  onChange={(e) => setOtherItems(e.target.value)}
                  maxLength={100}
                  placeholder="Separate each item by a comma(,)"
                />
                <div className="absolute bottom-2 right-14 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">
                  {otherItems.length}/100
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card w-10/12 p-2 mt-7">
          <p className="topic my-3">Additional note</p>
          <div className="relative flex justify-center">
            <textarea
              rows={3}
              className="input rounded-lg w-11/12 mb-3 p-2"
              maxLength={200}
              placeholder="Not essential"
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
            />
            <div className="absolute bottom-3 right-12 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">
              {additionalNote.length}/200
            </div>
          </div>
        </div>

        <div className="card w-10/12 p-2 mt-7">
          <div className="flex items-center gap-3">
            <p className="topic my-3">Scratch marks in body</p>
            <p className="text-gray-500">{files.length}/10</p>
          </div>
          <div className="flex justify-center">
            <div {...getRootProps()} className="w-11/12 min-h-32 border-dashed border-2 border-gray-400 mb-3">
              <input {...getInputProps()} style={{ display: 'none' }} />
              {files.length === 0 && <p className="text-center text-gray-500 mt-12">Drag & drop images here, or click to select images</p>}
              <aside>
                <div className="flex flex-wrap">
                  {files.map(file => (
                    <div key={file.name} className="w-1/5 p-1">
                      <div className="relative">
                        <img src={file.preview} alt="preview" className="img-thumbnail mt-2" width={200} />
                        <button onClick={removeFile(file)} className="absolute top-0 right-0">
                          <XCircleIcon className="h-9 bg-red-600 p-1 text-white rounded-xl" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div className="card w-10/12 p-2 mt-7">
          <p className="topic my-3">Vehicle fault</p>
          <div className="relative flex justify-center">
            <textarea
              rows={5}
              className="input rounded-lg w-11/12 mb-3 p-2"
              maxLength={300}
              value={vehicleFault}
              onChange={(e) => setVehicleFault(e.target.value)}
              placeholder="Write everything that needs to be repaired here."
            />
            <div className="absolute bottom-3 right-12 bg-white text-end rounded-lg pr-2 text-gray-500 text-sm">
              {vehicleFault.length}/300
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-5 mb-10">
          <button className="btn btn-warning" onClick={handleDataClear}>Clear</button>
          <button className="btn btn-normal" onClick={handleDataSubmit}>Submit</button>
        </div>
      </div>

      <Modal open={jobOpenModal} >
        <div>
          <div onClick={(e) => e.stopPropagation()}>
            <p className="font-bold pb-2 text-text-primary text-2xl text-center">Job Open Successfully</p>
                
            <div className='text-center pt-2'>
              <p className='mainStyle'>Please select an option,</p>
            </div>
                
            <div className="flex justify-center">
              <PreRepairDocument
                vehicleNumber={vehicleNumber}
                customerName={customerName}
                customerEmail={customerEmail}
                customerPhoneNumber={customerPhoneNumber}
                preDocId={preDocId}
                jobId={jobId}
                dateString={dateString}
                checkList={checkList}
                otherItems={otherItems}
                additionalNote={additionalNote}
                vehicleFault={vehicleFault}
              />
            </div>

            <div className="flex justify-center">
              <Link to = {'/shop/updateJob'}>
                <button className="btn btn-normal w-40 mx-auto mt-2">Back</button>
              </Link>
            </div>

          </div>
        </div>
      </Modal>




    </div>

    
  );
};

export default PreRepairAssessment;
