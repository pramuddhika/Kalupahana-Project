import Details from "../components/Details";

const Update_SendSMS = () => {
    return (
        <div className="flex flex-row ">
        
          <div className="flex flex-col justify-center items-center basis-2/3">
            {/**table - start */}
            <div className="card mt-5 w-11/12 p-2 h-88">
              <p className="topic">Previous Updates</p>
              <div className="flex justify-center overflow-auto max-h-72">
              <table className="mx-auto font-inter mt-4 w-11/12">
                <tr className='bg-text-primary text-white'>
                  <th className="border-2 border-black w-1/3">Date</th>
                  <th className="border-2 border-black w-2/3">Message</th>
                </tr>

                <tr className="text-center">
                  <td className="border-2 border-black"> test data</td>
                  <td className="border-2 border-black text-start pl-2"> test data</td>
                </tr>

              </table>
              </div>
            </div>
            {/**table - end */}


            <div className="card mt-5 w-11/12 p-2">
              <p className="topic">Send SMS Update</p>
              <div className="flex justify-between">
                <div className="flex gap-10 my-4 ml-16">
                  <p>Message: </p>
                  <textarea rows={4} placeholder="Type job update" className="input rounded-lg w-96 p-2" />
                </div>
                <div className="flex items-end mb-4 mr-16">
                   <button className="btn btn-normal">Send</button>
                </div>
              </div>
            </div>

          </div>

          <div className="basis-1/3">
            <Details/>
          </div>
            
        </div>
    );
};

export default Update_SendSMS;