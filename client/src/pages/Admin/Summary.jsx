import { useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import OwnerPagesHeader from "../components/Owner-Pages-Header";
import { Chart as ChartJS, 
         ArcElement, Tooltip, 
         Legend, BarElement, 
         CategoryScale, 
         LinearScale, 
         PointElement, 
         LineElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement);

const VehicleCharts = () => {
  const [brands, setBrands] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [dates, setDates] = useState({startDates: [],endDates: [],reservedDates: []});
  const [mechNotes,setMechNote] = useState('');
  const [activeDays,setActiveDays]= useState('');
  const [mechanicData,setMechanicData] = useState('');
  const [completeJobs,setCompleteJobs] = useState('');
  const [mechanicNumber,setMechanicNumber] = useState('');

  useEffect(() => {
      const fetchVehicleBrands = async () => {
         try {
             const res = await axios.get('/api/summary/vehicleBrands');
        setBrands(res.data.vehicleBrands);
      } catch (err) {
        console.log('Error fetching brands:', err);
      }
    };

    const fetchVehicleFuelTypes = async () => {
      try {
        const res = await axios.get('/api/summary/vehiclegroups');
        setFuelTypes(res.data.vehicleFuleType);
      } catch (err) {
        console.log('Error fetching fuel types:', err);
      }
    };

    const fetchHolidays = async () => {
      try {
        const res = await axios.get('/api/summary/getHolidays');
        setHolidays(res.data.completeJobs);
      } catch (err) {
        console.log('Error fetching complete jobs:', err);
      }
    };

    const fetchDates = async () => {
      try {
        const res = await axios.get('/api/summary/dates');
        setDates(res.data);
      } catch (err) {
        console.log('Error fetching dates:', err);
      }
    };

    const fectMechNote = async () => {
        try{
            const res = await axios.get('/api/summary/mechanicsNotes');
            setMechNote(res.data.mechanicNotes);
        }catch(err){
            console.log('Error fetching mech notes:',err);
        }
    }

    const fectActiveDates = async () => {
        try{
            const res = await axios.get('/api/summary/getJobdates');
            setActiveDays(res.data.jobDetails);           
        }catch(err){
            console.log('Error fetching Active days:',err);
        }
    }

    const fectMechanicData = async () => {
        try{
            const res = await axios.get('/api/summary/detailEmployee');
            setMechanicData(res.data.employeeCount);           
        }catch(err){
            console.log('Error fetching Active days:',err);
        }
    }

    const fectCompleteJobs = async () => {
        try{
            const res = await axios.get('/api/summary/completeJobs');
            setCompleteJobs(res.data.completeJobs[0]);           
        }catch(err){
            console.log('Error fetching Active days:',err);
        }
    }

    const fectMechanicNumber = async () => {
        try{
            const res = await axios.get('/api/summary/employeeCount');
            setMechanicNumber(res.data.employeeCount);           
        }catch(err){
            console.log('Error fetching Active days:',err);
        }
    }


    fetchVehicleBrands();
    fetchVehicleFuelTypes();
    fetchHolidays();
    fetchDates();
    fectMechNote();
    fectActiveDates();
    fectMechanicData();
    fectCompleteJobs();
    fectMechanicNumber();
  }, []);

  const processData = (dates) => {
    const counts = {};
    dates.forEach(date => {
      counts[date] = (counts[date] || 0) + 1;
    });
    return counts;
  };

  const startDateCounts = processData(dates.startDates);
  const endDateCounts = processData(dates.endDates);
  const reservedDateCounts = processData(dates.reservedDates);

  const labels = Array.from(new Set([...Object.keys(startDateCounts), ...Object.keys(endDateCounts), ...Object.keys(reservedDateCounts)])).sort();

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Job start',
        data: labels.map(label => startDateCounts[label] || 0),
        borderColor: 'rgba(70, 219, 80, 1)',
        backgroundColor: 'rgba(70, 219, 80, 0.2)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Job end',
        data: labels.map(label => endDateCounts[label] || 0),
        borderColor: 'rgba(227, 36, 36, 1)',
        backgroundColor: 'rgba(227, 36, 36, 0.2)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Online booked',
        data: labels.map(label => reservedDateCounts[label] || 0),
        borderColor: 'rgba(38, 15, 242, 1)',
        backgroundColor: 'rgba(38, 15, 242, 0.2)',
        borderWidth: 1,
        fill: false,
      }
    ]
  };

  const brandData = {
    labels: brands.map(brand => brand.brand),
    datasets: [{
      label: 'Vehicle Brands',
      data: brands.map(brand => brand.count),
      backgroundColor: [
        '#5ad93b',
        '#3B82F6',
        '#FBBF24',
        '#10B981',
        '#A78BFA',
        '#F59E0B'
      ],
      hoverOffset: 4
    }]
  };

  const fuelTypeData = {
    labels: fuelTypes.map(fuel => fuel.fuleType),
    datasets: [{
      label: 'Vehicle Fuel Types',
      data: fuelTypes.map(fuel => fuel.count),
      backgroundColor: [
        '#5ad93b',
        '#3B82F6',
        '#FBBF24',
        '#10B981',
        '#A78BFA',
        '#F59E0B'
      ],
      hoverOffset: 4
    }]
  };

  const barChartData = {
    labels: holidays.map(job => `${job.month}`),
    datasets: [{
      label: 'Holidays',
      data: holidays.map(job => job.count),
      backgroundColor: '#b73bd9'
    }]
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right'
      }
    },
    aspectRatio: 1,
    cutout: '0%',
    animation: {
      animateRotate: true
    }
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div>
      
      <OwnerPagesHeader pageName="Summary" />

        <div className='flex justify-center items-center gap-1 mt-5'>
          <div className='w-1/2'>
            <div className='h-64 ring-1 rounded-lg shadow-2xl shadow-blue-200 ring-gray-400 ml-8 p-4'>
              <Line data={lineChartData} options={lineOptions} />
            </div>   
          </div>

          <div className='w-1/2 flex justify-center gap-5'>
            <div className=' relative box-content w-80 h-64 ring-1 rounded-lg shadow-2xl shadow-blue-200 ring-gray-400'>
              <p className='absolute top-0 left-20  mainStyle text-lg pt-4'>Brand classification</p>
              <div className='absolute top-1 left-2'>
                 {brands.length > 0 && <Pie data={brandData} options={pieOptions}/>}
              </div>
            </div>

            <div className=' relative box-content w-80 h-64 ring-1 rounded-lg shadow-2xl shadow-blue-200 ring-gray-400'>
              <p className='absolute top-0 left-16  mainStyle text-lg pt-4'>Flue type classification</p>
              <div className='absolute top-0 left-2'>
                 {fuelTypes.length > 0 && <Pie data={fuelTypeData} options={pieOptions} />}
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center gap-16 items-center mt-5'>
          <div className='w-6/12'>
            <div className="box-content h-80 ring-1 rounded-lg shadow-2xl shadow-blue-200 ring-gray-400 w-full p-2">
                <p className="topic">Repair job State</p>
                <div className="flex justify-center overflow-auto max-h-72">
                    <table className="mx-auto font-inter mt-3 w-full">
                        <tr className='bg-text-primary text-white'>
                            <th className="border-2 border-black w-36">Employee ID</th>
                            <th className="border-2 border-black w-36">Vehicle Number</th>
                            <th className="border-2 border-black w-32">Status</th>
                            <th className="border-2 border-black w-">Note</th>
                        </tr>

                        { (mechNotes === null || mechNotes.length === 0) ? (
                        <tr>
                         <td colSpan="4" className='text-center border-2 border-black py-2 mainStyle'>
                           No data available!
                         </td>
                        </tr>
                        ):(
                        mechNotes && mechNotes.map ( (mechanicNotes,index) => (
                         <tr key={index} className="text-center mainStyle">
                           <td className="border-2 border-black">{mechanicNotes.employeeId}</td>
                           <td className="border-2 border-black">{mechanicNotes.vehicleNumber}</td>
                           <td className={`border-2 border-black 
                           ${mechanicNotes.status === 'waiting' ? 'bg-yellow-400 text-black' : ''}`}>
                             {mechanicNotes.status}
                           </td>
                           <td className="border-2 border-black">{mechanicNotes.mechanicNote}</td>
                         </tr>
                        )))}          
                    </table>
                </div>
            </div>
          </div>

          <div className='w-4/12'>
             <div className="box-content h-80 ring-1 rounded-lg shadow-2xl shadow-blue-200 ring-gray-400 w-full p-2">
               <p className="topic">Repair duration</p>
               <div className="flex justify-center overflow-auto max-h-72">
                  <table className="mx-auto font-inter mt-3 w-full">
                    <tr className='bg-text-primary text-white'>
                     <th className="border-2 border-black w-28">Job Id</th>
                     <th className="border-2 border-black w-28">Vehicle Number</th>
                     <th className="border-2 border-black w-16">Dates</th>
                    </tr>
                    { (activeDays === null || activeDays.length === 0) ? (
                    <tr>
                     <td colSpan="3" className='text-center border-2 border-black py-2 mainStyle'>
                       No data available!
                     </td>
                    </tr>
                    ):(activeDays && activeDays.map ( (activeDays,index) => (
                    <tr key={index} className="text-center mainStyle">
                      <td className="border-2 border-black">{activeDays.jobId}</td>
                      <td className="border-2 border-black">{activeDays.vehicleNumber}</td>
                      <td className="border-2 border-black">{activeDays.activeDays}</td>
                    </tr>
                    )))}          
                  </table>
                </div>
              </div>
            </div>
        </div>

        <div className='flex justify-center items-center gap-8 mx-8 mt-5 mb-6'>
    
         <div className='w-4/12'>
           <div className=' relative box-content w-full h-72 p-2 ring-1 rounded-lg shadow-2xl shadow-blue-200 ring-gray-400'>
           <p className='absolute top-0 left-16  mainStyle text-lg pt-4 topic'>Holidays for this year</p>
           <div className='absolute bottom-5 left-14 w-96 h-56'>
             <Bar data={barChartData} options={barOptions} />
           </div>
           </div>
         </div>

         <div className='w-4/12'>
           <div className="box-content h-72 ring-1 rounded-lg shadow-2xl shadow-blue-200 ring-gray-400 w-full p-2">
             <p className="topic">Mechanic availability</p>
             <div className="flex justify-center overflow-auto max-h-64">
                <table className="mx-auto font-inter mt-3 w-full">
                  <tr className='bg-text-primary text-white'>
                     <th className="border-2 border-black w-64">Specialist area</th>
                     <th className="border-2 border-black w-16">Working</th>
                     <th className="border-2 border-black w-16">Resign</th>
                  </tr>
                  { (mechanicData === null || mechanicData.length === 0) ? (
                  <tr>
                     <td colSpan="3" className='text-center border-2 border-black py-2 mainStyle'>
                       No data available!
                     </td>
                  </tr>
                  ):(mechanicData && mechanicData.map ( (mechanicData,index) => (
                  <tr key={index} className="text-center mainStyle">
                     <td className="border-2 border-black text-start pl-1">{mechanicData.mainArea}</td>
                     <td className="border-2 border-black">{mechanicData.in}</td>
                     <td className="border-2 border-black">{mechanicData.out}</td>
                  </tr>
                  )))}          
               </table>
             </div>
          </div>
         </div>

         <div className='w-4/12'>
           <div className='flex box-content w-full h-72 p-2 ring-1 rounded-lg shadow-2xl shadow-blue-200 ring-gray-400'>

             <div className='flex flex-col items-center justify-center w-1/2 border-r-2'>
               <p className='text-9xl font-semibold text-green-600'>{completeJobs.jobs}</p>
               <p className='mainStyle'>Completed Jobs</p>
             </div>

             <div className='w-1/2'>
               <div className='h-36 border-b-2'>
                 <p className='mainStyle pt-3 italic pl-2'>Currently working mechanics</p>
                 <p className='text-end text-8xl italic mt-1 font-semibold text-blue-400 mr-7'>{mechanicNumber.in}</p>
               </div>

               <div className='h-36 border-t-2'>
                 <p className='mainStyle pt-3 italic pl-2'>Resign mechanics</p>
                 <p className='text-end text-8xl italic mt-1 font-semibold text-red-400 mr-7'>{mechanicNumber.out}</p>
               </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default VehicleCharts;
