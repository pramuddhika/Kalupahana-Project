import OwnerPagesHeader from "../components/OwnerHeader";
import Booking_Reserved from "../Shop/Booking_Reserved";

const Booking = () => {
    return (
        <div>
            
         {/**page head -start */}
         <OwnerPagesHeader pageName="Booking" />
         {/**page head - end */}

         <Booking_Reserved/>

        </div>
    );
};

export default Booking;