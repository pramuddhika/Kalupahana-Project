import ShopHeader from "../components/ShopHeader";



const ShopSetting = () => {

    return (
        <div>
            <ShopHeader pageName="Settings" />
            
            <div className="h-9 bg-side-nav-bg border-b-2"/>

            {/**space change settigns - start */}
            <div className="bg-gray-100 w-11/12 mx-auto my-5 p-4 rounded-lg font-inter">
                <p className="text-text-primary text-lg font-bold">Repairing Spaces</p>

                <div className="flex gap-8 mt-3 ml-6">

                    <div className="flex gap-3">
                      <p>Total Spaces</p>  
                      <input type="number" className="w-16 rounded-lg outline-none border-2 pl-4"/>
                    </div>

                    <div className="flex gap-3">
                       <p>Spaces for Online Booking</p>
                       <input type="number" className="w-16 rounded-lg outline-none text-justify border-2 pl-4"/>
                    </div>

                    <div className="flex gap-3">
                       <p>Spaces for Emergency repairs</p>
                       <input className="w-16 bg-white rounded-lg outline-none border-2 pl-4"/>
                    </div>
                    
                </div>
                <div className="flex justify-end">
                     <button className="px-4 py-1 bg-blue-600 text-white rounded-lg">Update</button>
                </div>
            </div>
            {/**space change settigns - end */}


        </div>
    );
};

export default ShopSetting;