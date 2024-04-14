import { Routes, Route} from 'react-router-dom';

import Home from './Home';
import Security from './Security';
import StockOwner from './Stock';
import Summary from './Summary';
import FeedbacksOwner from './Feedbacks';
import Booking from './Booking';

const Owner = () => {
  return (
    <div>
      
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="security" element={<Security />} />
        <Route path="stock" element={<StockOwner />} />
        <Route path="summary" element={<Summary />} />
        <Route path="feedbacks" element={<FeedbacksOwner />} />
        <Route path="booking" element={<Booking/>}/>
      </Routes>

    </div>
  );
};

export default Owner;
