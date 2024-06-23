import { useEffect, useState } from "react";
import { fetchNumberOfBooking, fetchOngoingJobNumber, fetchNumberOfFreeBlocks } from '../api/DashBoard';
import PropTypes from 'prop-types';

const DashboardBoxItem = ({ title, value, bgColor, textColor }) => {
  return (
    <div className={`box-content h-36 w-80 ${bgColor} rounded-3xl`}>
      <p className={`text-4xl font-bold ${textColor} pl-4 pt-6 italic`}>{title}</p>
      {value !== null &&
        <p className={`flex justify-end pr-5 text-6xl italic font-bold ${textColor} pb-6`}>{value}</p>}
    </div>
  );
};

DashboardBoxItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired
};

const DashBoardBox = () => {
  const [numBooks, setNumBooks] = useState(null);
  const [onGoingJobs, setInGoingJobs] = useState(null);
  const [freeBlocks, setFreeBlocks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numBooks = await fetchNumberOfBooking();
        setNumBooks(numBooks);

        const onGoingJobs = await fetchOngoingJobNumber();
        setInGoingJobs(onGoingJobs);

        const freeBlocks = await fetchNumberOfFreeBlocks();
        setFreeBlocks(freeBlocks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex gap-16 justify-center my-6 font-inter">

      <DashboardBoxItem 
        title="Ongoing Jobs" 
        value={onGoingJobs} 
        bgColor="bg-yellow-100" 
        textColor="text-yellow-600" 
      />
      <DashboardBoxItem 
        title="Reserved by" 
        value={numBooks} 
        bgColor="bg-emerald-100" 
        textColor="text-emerald-900" 
      />
      <DashboardBoxItem 
        title="Free Blocks" 
        value={freeBlocks} 
        bgColor="bg-red-200" 
        textColor="text-red-600" 
      />

    </div>
  );
};

export default DashBoardBox;
