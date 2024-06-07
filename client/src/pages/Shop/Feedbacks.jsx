import ShopHeader from '../components/ShopHeader';
import axios from 'axios';
import { useState } from 'react';

const Feedbacks = () => {

    const preDocId = 'PRE-DOC-0000006';
    const [imageUrls, setImageUrls] = useState([]);


    const handlebtn = async() => {
        try{
            const res = await axios.get(`/api/openjob/getImages/${preDocId}`)
            setImageUrls(res.data.imageUrls)
        }catch(err){
            console.log(err);
        }
    }


    return (
        <div>
            <ShopHeader pageName="Feedbacks"/>

            <button className='btn btn-normal' onClick={handlebtn}>check</button>
            {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} />
            ))}



            
            
        </div>
    );
};

export default Feedbacks;
