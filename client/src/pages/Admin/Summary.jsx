import { useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement);

const VehicleCharts = () => {
  const [brands, setBrands] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [dates, setDates] = useState({
    startDates: [],
    endDates: [],
    reservedDates: []
  });

  useEffect(() => {
    const fetchVehicleBrands = async () => {
      try {
        const response = await axios.get('/api/summary/vehicleBrands');
        setBrands(response.data.vehicleBrands);
      } catch (err) {
        console.log('Error fetching brands:', err);
      }
    };

    const fetchVehicleFuelTypes = async () => {
      try {
        const response = await axios.get('/api/summary/vehiclegroups');
        setFuelTypes(response.data.vehicleFuleType);
      } catch (err) {
        console.log('Error fetching fuel types:', err);
      }
    };

    const fetchHolidays = async () => {
      try {
        const response = await axios.get('/api/summary/getHolidays');
        setHolidays(response.data.completeJobs);
      } catch (err) {
        console.log('Error fetching complete jobs:', err);
      }
    };

    const fetchDates = async () => {
      try {
        const response = await axios.get('/api/summary/dates');
        setDates(response.data);
      } catch (err) {
        console.log('Error fetching dates:', err);
      }
    };

    fetchVehicleBrands();
    fetchVehicleFuelTypes();
    fetchHolidays();
    fetchDates();
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
        label: 'Start Dates',
        data: labels.map(label => startDateCounts[label] || 0),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'End Dates',
        data: labels.map(label => endDateCounts[label] || 0),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Reserved Dates',
        data: labels.map(label => reservedDateCounts[label] || 0),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
        '#EF4444',
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
        '#EF4444',
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
      label: 'Complete Jobs',
      data: holidays.map(job => job.count),
      backgroundColor: '#3B82F6'
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
    <div className="mx-auto justify-center gap-10 items-center h-screen">
      <div className="w-1/3">
        {brands.length > 0 && <Pie data={brandData} options={pieOptions} />}
      </div>
      <div className="w-1/3">
        {fuelTypes.length > 0 && <Pie data={fuelTypeData} options={pieOptions} />}
      </div>
      <div className="w-1/3">
        {holidays.length > 0 && <div className="h-64"><Bar data={barChartData} options={barOptions} /></div>}
      </div>
      <div className="w-1/2 h-64 mt-8">
        <Line data={lineChartData} options={lineOptions} />
      </div>
    </div>
  );
};

export default VehicleCharts;
