import OwnerPagesHeader from "../components/OwnerHeader";
import BookingReserved from "../Shop/BookingReserved";

const Booking = () => {
    return (
        <div>
            
         {/**page head -start */}
         <OwnerPagesHeader pageName="Booking" />
         {/**page head - end */}

         <BookingReserved/>

        </div>
    );
};

export default Booking;