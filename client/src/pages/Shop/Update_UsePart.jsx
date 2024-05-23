import Details from "../components/Details";

const Update_UsePart = () => {
    return (
        <div className="flex flex-row mt-7">
        
          <div className="flex flex-col justify-center items-center basis-2/3">

            {/**input data form - start */}
            <div className="h-48 card w-11/12 p-2 mt-5">
             
              <p className="topic ">Used Part</p>

              <div className="flex justify-center items-center w-10/12 font-inter gap-2 mt-1">
                <p className="text-text-primary font-semibold w-4/12">Part Name or Id: </p>
                <input type="text" className="input p-2 rounded-lg w-6/12" placeholder="Search by Part Name or Id"/>
              </div>

              <div className="flex justify-center items-center font-inter mt-6">
                <div className="flex items-center w-96">
                 <p className="text-text-primary font-semibold w-40 pl-4">Quantity : </p>
                 <input type="number" className="input p-2 rounded-lg w-32" placeholder="Search by Part Name or Id"/>
                </div>
                <div className="flex items-end w-48 justify-end">
                  <button className="btn btn-normal">Add</button>
                </div>
              </div>

            </div>
            {/**input data form -end */}


            {/**table - start */}
            <div className="box-content h-80 card mt-5 w-11/12 p-2">
              <p className="topic">Add Parts</p>
              <div className="flex justify-center overflow-auto max-h-72">
              <table className="mx-auto font-inter mt-4 w-11/12">
                <tr className='bg-text-primary text-white'>
                  <th className="border-2 border-black w-1/3">Part ID</th>
                  <th className="border-2 border-black w-1/3">Part Name</th>
                  <th className="border-2 border-black w-2/3">Quantity</th>
                </tr>

                <tr className="text-center">
                  <td className="border-2 border-black"> test data</td>
                  <td className="border-2 border-black"> test data</td>
                  <td className="border-2 border-black"> test data</td>
                </tr>             

              </table>
              </div>
            </div>
            {/**table - end */}

          </div>

          <div className="basis-1/3">
            <Details/>
          </div>
            
        </div>
    );
};

export default Update_UsePart;