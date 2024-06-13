import { useEffect, useState } from 'react';
import OwnerPagesHeader from "../components/OwnerPagesHeader";
import securityIm from '../assets/security.svg';
import customStyles from '../components/SelectStyle';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Security = () => {
    const [data, setData] = useState(null);
    const [ownerEmail, setOwnerEmail] = useState('');
    const [ownerStep, setOwnerStep] = useState(null);
    const [shopStep, setShopStep] = useState(null);
    const [accountType, setAccountType] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');

    useEffect(() => {
        fetch('/api/auth/getSecuritydata')
            .then(response => response.json())
            .then(data => {
                setData(data.secuData);
                const ownerData = data.secuData.find(item => item.user === 'owner');
                const shopData = data.secuData.find(item => item.user === 'shop');
                setOwnerEmail(ownerData.email);
                setOwnerStep({ value: ownerData.step, label: ownerData.step === 'yes' ? 'Yes' : 'No' });
                setShopStep({ value: shopData.step, label: shopData.step === 'yes' ? 'Yes' : 'No' });
            })
            .catch(error => console.error('Error fetching security data:', error));
    }, []);

    const handleEmailChange = (e) => {
        setOwnerEmail(e.target.value);
    };

    const handlePasswordChange = () => {
        if (newPassword !== reEnteredPassword) {
            toast.error('New password and re-entered password do not match');
        } else {
            console.log(`Account Type: ${accountType.value}, New Password: ${newPassword}`);
            handleClear();
        }
    };

    const handleEmailSubmit = () => {
        if (data && ownerEmail === data.find(item => item.user === 'owner').email) {
            toast.info("No changes to use");
        } else {
            console.log("New Owner Email:", ownerEmail);
        }
    };

    const handleStepSubmit = () => {
        const ownerStepOriginal = data.find(item => item.user === 'owner').step;
        const shopStepOriginal = data.find(item => item.user === 'shop').step;

        if (ownerStep.value === ownerStepOriginal && shopStep.value === shopStepOriginal) {
            toast.info("No changes to update");
        } else {
            console.log("New Owner Step:", ownerStep.value);
            console.log("New Shop Step:", shopStep.value);
        }
    };

    const TwoFactorOptions = [
        { value: 'no', label: "No" },
        { value: 'yes', label: 'Yes' }
    ];

    const Accounts = [
        { value: 'owner', label: "Owner Account" },
        { value: 'shop', label: 'Shop Account' }
    ];

    const handleClear = () => {
        setAccountType(null);
        setNewPassword('');
        setReEnteredPassword('');
    };

    return (
        <div>
            <OwnerPagesHeader pageName="Security" />
            <div className="flex justify-center">
                <div className="w-1/2">
                    <img src={securityIm} className="mt-40 ml-28 h-80" />
                </div>
                <div className="w-1/2 mainStyle">
                    <div className="flex justify-center items-center w-11/12">
                        <div className="box-content w-10/12 card mt-6 p-6">
                            <p className="topic text-xl">Change password</p>

                            <div className="ml-12 mt-2">
                                <div className="flex items-center ml-3 my-2">
                                    <p className="basis-1/3 text-text-primary font-semibold">Account Type</p>
                                    <Select className="w-56 text-center"
                                      options={Accounts}
                                      isClearable
                                      styles={customStyles}
                                      value={accountType}
                                      onChange={selectedOption => setAccountType(selectedOption)}
                                    />
                                </div>
                                <div className="flex items-center ml-3 my-2">
                                    <p className="basis-1/3 text-text-primary font-semibold">New password </p>
                                    <input type="text" className="input rounded-lg p-2 w-56" maxLength={20} 
                                    required onChange={e => setNewPassword(e.target.value)} />
                                </div>
                                <div className="flex items-center ml-3 my-1">
                                    <p className="basis-1/3 text-text-primary font-semibold">Re-enter passsword</p>
                                    <input type="text" className="input rounded-lg p-2 w-56" maxLength={20} 
                                    required onChange={e => setReEnteredPassword(e.target.value)}  />
                                </div>
                                <div className="flex justify-center my-3 gap-5">
                                    <button className="btn btn-warning" onClick={handleClear}>Clear</button>
                                    <button className="btn btn-normal" onClick={handlePasswordChange}>Change password</button>
                                </div>
                            </div>

                            <p className="topic text-xl">Two-step Verification</p>
                            <div className="ml-12">
                                <div className="flex items-center ml-3 my-3">
                                    <p className="basis-1/3 text-text-primary font-semibold">Owner account</p>
                                    <Select className="w-56 text-center"
                                        options={TwoFactorOptions}
                                        isClearable
                                        styles={customStyles}
                                        name="ownerStep"
                                        value={ownerStep}
                                        onChange={setOwnerStep}
                                    />
                                </div>
                                <div className="flex items-center ml-3 my-3">
                                    <p className="basis-1/3 text-text-primary font-semibold">Shop account</p>
                                    <Select className="w-56 text-center"
                                        options={TwoFactorOptions}
                                        isClearable
                                        styles={customStyles}
                                        name="shopStep"
                                        value={shopStep}
                                        onChange={setShopStep}
                                    />
                                </div>
                                <div className="flex justify-center gap-5">
                                    <button name="stepbtn" className="btn btn-normal" onClick={handleStepSubmit}>Apply Changes</button>
                                </div>
                            </div>
                            <p className="topic text-xl">Email owner</p>
                            <div className="ml-12">
                                <div className="flex items-center ml-3 my-3">
                                    <p className="basis-1/3 text-text-primary font-semibold">Owner email</p>
                                    <input type="text" name="email" className="input rounded-lg p-2 w-56" maxLength={45} required value={ownerEmail} onChange={handleEmailChange} />
                                </div>
                                <div className="flex justify-center gap-5">
                                    <button name="emailbtn" className="btn btn-normal" onClick={handleEmailSubmit}>Apply Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Security;
