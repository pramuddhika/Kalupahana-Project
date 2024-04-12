import cancel from '../assets/cancel.svg'

const BookingCancel = () => {
    return (
        <div className='mt-6 ml-3'>
            
            <div className='flex justify-center items-center'>
                <div className='w-1/2'>
                  <div className='box-context bg-web-primary w-2/3 h-1/3'>
                     <p>hjgkhg</p>
                  </div>
                  <img src={cancel} className='h-80'/>
                </div>
                <div className='w-1/2'>
                  <p>This is the content for CancelBooking.</p>
                </div>
            </div>
        </div>
    );
};

export default BookingCancel;