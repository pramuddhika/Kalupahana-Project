import {TrashIcon,PencilSquareIcon} from '@heroicons/react/24/solid';

const StockAddPart = () => {
    return (
        <div  className="flex justify-center gap-8">
            
            <div className="card w-4/12 p-6 mt-28">
            <p className="topic text-xl mb-4">Part Details</p>

            <div className="flex fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Part Id:</p>
              <input type="text" required className="input basis-1/2 rounded-lg p-2 pl-4" placeholder='Add part ID'/>
            </div>

            <div className="flex fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Part Name:</p>
              <input type="text" required className="input basis-1/2 rounded-lg p-2 pl-4" placeholder='Add Part Name'/>
            </div>

            <div className="flex fornt-inter">
              <p className="basis-1/4 text-text-primary font-semibold mt-3">Description:</p>
              <textarea rows={6} required className="input w-60 rounded-lg p-2 pl-4" placeholder='Note about part'/>
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <button className="btn btn-warning">Clear</button>
              <button className="btn btn-normal">Submit</button>
            </div>

          </div>
        
          <div className="card w-6/12 mt-28 p-6 h-92">
            
            <div className='flex justify-center mb-3 gap-6'>
              <input type='text' className='input  rounded-lg pl-2' placeholder='Add part name or part ID'/>
              <button className='btn btn-normal'>Search</button>
            </div>

             <div className="flex justify-center overflow-auto max-h-80">
              <table className="mx-auto font-inter mt-4 w-11/12">
                <tr className='bg-text-primary text-white'>
                  <th className="border-2 border-black">Part ID</th>
                  <th className="border-2 border-black">Part Name</th>
                  <th className="border-2 border-black">Description</th>
                  <th colSpan="2" className="border-2 border-black">Action</th>
                </tr>

                <tr className="text-center">
                  <td className="border-2 border-black overflow-hidden overflow-ellipsis">test data</td>
                  <td className="border-2 border-black overflow-hidden overflow-ellipsis">test data</td>
                  <td className="border-2 border-black overflow-hidden overflow-ellipsis">test data</td>
                   <td className="border-2 border-black cursor-pointer">
                     <PencilSquareIcon className='text-green-700 h-5 mx-auto'/>
                   </td>
                  <td className="border-2 border-black cursor-pointer">
                    <TrashIcon className='text-red-600 h-5 mx-auto'/>
                  </td>
                </tr>
    
              </table>
              </div>

          </div>

        </div>
    );
};

export default StockAddPart;