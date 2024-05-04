

const StockAddPurchases = () => {
    return (
        <div className="flex justify-center gap-8">

          <div className="card w-5/12 p-6 mt-28 h-84">
            <p className="topic text-xl mb-4">Purchases Details</p>

            <div className="flex justify-center fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Part Id:</p>
              <input type="text" required className="input basis-1/2 rounded-lg p-2 pl-4"/>
            </div>

            <div className="flex justify-center fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Part Name:</p>
              <input type="text" required className="input basis-1/2 rounded-lg p-2 pl-4"/>
            </div>

            <div className="flex justify-center fornt-inter items-center mb-4">
              <p className="basis-1/4 text-text-primary font-semibold">Date:</p>
              <input type="date" required className="input basis-1/2 rounded-lg p-2 pl-4"/>
            </div>

            <div className="flex justify-center fornt-inter">
              <p className="basis-1/4 text-text-primary font-semibold mt-3">Quantity:</p>
              <input type="number" required className="input basis-1/2 rounded-lg p-2 pl-4"/>
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <button className="btn btn-warning">Clear</button>
              <button className="btn btn-normal">Submit</button>
            </div>

          </div>

          <div className="card w-5/12 mt-28 p-6 h-84">
             <p className="topic text-xl mb-4">Today Purchases</p>

             <div className="flex justify-center overflow-auto max-h-80">
              <table className="border-separate border-spacing-2 border border-slate-500 w-11/12">
                <tr>
                  <th className="border border-slate-600 ">Part ID</th>
                  <th className="border border-slate-600 ">Quantity</th>
                </tr>

                <tr className="text-center">
                  <td className="border border-slate-600"> hi</td>
                  <td className="border border-slate-600"> hu</td>
                </tr>
    
              </table>
              </div>

          </div>
        </div>
    );
};

export default StockAddPurchases;
