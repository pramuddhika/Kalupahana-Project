import Details from "../components/Details";
import { useState } from "react";

const Update_MechanicNote = () => {

  const [findMechanic,setFindMechanic] = useState(true);

  const handleSearch = () => {
    setFindMechanic(false)
  };

  const findMech = (
    <div className="flex justify-center mt-10 gap-6">
      <input className="input p-2 rounded-lg" placeholder="Seach by Employee ID"/>
      <button className="btn btn-normal" onClick={handleSearch}>Search</button>
    </div>
    );

  const notePart = (
    <div className="flex gap-8 justify-between">
      <div className="flex gap-10 my-4 ml-8 w-1/2">
        <p>Message: </p>
        <textarea rows={4} placeholder="Type job update" className="input rounded-lg w-72 p-2" />
      </div>

      <div className="mb-4 mr-8 gap-4 w-1/2">

        <div className="flex  items-center justify-center my-4">
          <p className="w-20">Ststus :</p>
          <input className="input p-2 rounded-lg"/>
        </div>

        <div className="flex justify-end gap-4">
          <button className="btn btn-warning">Cancel</button>
          <button className="btn btn-normal">Submit</button>
        </div>

       </div>
    </div>
  );

    return (
        <div className="flex flex-row ">
        
          <div className="flex flex-col justify-center items-center basis-2/3">

          <div className="h-48 card mt-5 w-11/12 p-2">
              <p className="topic">Mechanic Update</p>
              {findMechanic ? findMech : notePart}
            </div>

            {/**table - start */}
            <div className="box-content h-80 card mt-5 w-11/12 p-2">
              <p className="topic">Previous Updates</p>
              <div className="flex justify-center overflow-auto max-h-72">
              <table className="mx-auto font-inter mt-4 w-11/12">
                <tr className='bg-text-primary text-white'>
                  <th className="border-2 border-black w-1/3">Employee ID</th>
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

          </div>

          <div className="basis-1/3">
            <Details/>
          </div>
            
        </div>
    );
};

export default Update_MechanicNote;