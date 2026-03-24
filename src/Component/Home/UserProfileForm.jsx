import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {logoutUser, loadUserProfile, createUserProfile, updateUserProfile} from '../../Util/ServerConnect.js';
import { getAuth } from '../../AuthProvider.jsx';
import styles from './Home.module.css';

export const UserProfileForm = () => {

    const navigate = useNavigate();
    const { user,  checkAuth } = getAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [noProfile, setNoProfile] = useState(true);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [validated, setValidated] = useState(false);
    const [refresh, setRefresh] = useState(false);
    

    
   

    useEffect(() => {
        const getProfile = async () => {
            const loadedProfile = await loadUserProfile();
            if (loadedProfile === null || loadedProfile === undefined) {
                console.log("Fail to load user profile");
                setUserProfile(null);
                setAddress('');
                setEmail('');
                setFirstName('');
                setLastName('');
                setPhoneNumber('');
                setNoProfile(true);
            } else {
                    console.log("Load user profile OK");
                    setUserProfile(loadedProfile);
                    setAddress(loadedProfile.address);
                    
                    setEmail(loadedProfile.email);
                    setFirstName(loadedProfile.first_name);
                    setLastName(loadedProfile.last_name);
                    setPhoneNumber(loadedProfile.phone_number);

                    setNoProfile(false);
                }     
            }   
          getProfile();
    }, []);
     // Function:
    useEffect(() => {
        const getProfile = async () => {
            const loadedProfile = await loadUserProfile();
            if (loadedProfile === null || loadedProfile === undefined) {
                console.log("Fail to load user profile");
                setUserProfile(null);
                setAddress('');
                setEmail('');
                setFirstName('');
                setLastName('');
                setPhoneNumber('');
                setNoProfile(true);
            } else {
                    console.log("Load user profile OK");
                    setUserProfile(loadedProfile);
                    setAddress(loadedProfile.address);
                    
                    setEmail(loadedProfile.email);
                    setFirstName(loadedProfile.first_name);
                    setLastName(loadedProfile.last_name);
                    setPhoneNumber(loadedProfile.phone_number);

                    setNoProfile(false);
                }     
            }   
          getProfile();
    }, [refresh]);
    //  ------

    useEffect(()=>{
        const phoneRegex = new RegExp("[0-9]{10}");
        
        const checkInput = () => {
            setValidated(true);
            if ( firstName.length <3 || firstName.length >50) {
                setValidated(false);
               
                
            }
            if ( lastName.length <3 || lastName.length >50) {
                setValidated(false);
                
            }

            if ( address.length <3 || address.length >100) {
                setValidated(false);
                
            }

            if ( email.length <3 || email.length >100) {
                setValidated(false);
                
            }

            if (!phoneRegex.test(phoneNumber)) {
                setValidated(false);
                
            }

        }
        checkInput();
    }, [firstName, lastName, email, address, phoneNumber])

    const handleLogout = async (e) => {
        e.preventDefault();
        const logoutOK = await logoutUser();
        if (logoutOK) {
            checkAuth();
            navigate("/");
        } else {
            alert("fail to logout");
        }
    }
// -----------
    const handleEditProfile = () => {
        setUpdating(true);
        setCreating(false);
    }
// ----------
    const handleCreateButtonOn = () => {
        setCreating(true);
        setUpdating(false);
    }
// ------------
    const handleCancelCreateOrUpdate = () => {
        setCreating(false);
        setUpdating(false);
        setRefresh((prev) => !prev);
       
    }
// -------------
    const handleCreateSubmit = async () => {
        const createOK = await createUserProfile(lastName, firstName, phoneNumber, email, address);
        if (!createOK) {
            alert("Fail to create new profile");
        } else {
            setCreating(false);
            setUpdating(false);
            setAddress('');
            setEmail('');
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
          
            setNoProfile(false);
            setRefresh((prev) => !prev);
        }
    }

// -======
const handleUpdateSubmit = async () => {
    const updateOK = await updateUserProfile(lastName, firstName, phoneNumber, email, address);
    if (!updateOK) {
        alert("Fail to update profile");
    } else {
        setCreating(false);
        setUpdating(false);
         
        setNoProfile(false);
        setRefresh((prev) => !prev);
    }
}


    return (
        <div className={styles.profile_all}>
            <div className={styles.user_info} >
                <h2>User name: {user.user_name}</h2>
                <h2>User Id: {user.id}</h2>

                <br />
                
                <button onClick={handleLogout} className={styles.button}>
                    
                    Logout
                </button>
                <br />
            </div >

            <div className= {styles.profile_show}>
                <div className={styles.profile_detail} >
                    {
                        noProfile && !creating && !updating && <h2>No Profile</h2>
                    }

                    {
                        (!noProfile && !creating && !updating) && 
                        <div>
                            <h2>First Name: {firstName} </h2>
                            <h2>Last Name: {lastName} </h2>
                            <h2>Phone number: {phoneNumber} </h2>
                            <h2>Email: {email} </h2>
                            <h2>Address: {address} </h2>
                        </div>                                           
                    }
                    {
                        (creating || updating) &&
                        <form className={styles.profile_eidt}>
                            <label 
                                htmlFor="firstNameEdit"
                                
                            >
                                First Name: 
                            </label>
                            <input 
                                type="text"
                                id="firstNameEdit"
                                required
                                minLength={3}
                                maxLength={50}
                                value={firstName}
                                onChange={(e) => {setFirstName(e.target.value)}}
                             />  
                             
                        

                            <label htmlFor="lastNameEdit">Last Name: </label>
                            <input 
                                type="text"
                                id="lastNameEdit"
                                required
                                minLength={3}
                                maxLength={50}
                                value={lastName}
                                onChange={(e) => {setLastName(e.target.value)}}
                             />
                             
                         

                            <label htmlFor="phoneEdit">Phone number: </label>
                            <input 
                                type="tel"
                                id="phoneEdit"
                                required
                                pattern="[0-9]{10}"
                                value={phoneNumber}
                                onChange={(e) => {setPhoneNumber(e.target.value)}}
                             />
                             
                          
                     
                            <label htmlFor="addresEdit">Address: </label>
                            <input 
                                type="text"
                                id="addresEdit"
                                required
                                minLength={3}
                                maxLength={100}
                                value={address}
                                onChange={(e) => {setAddress(e.target.value)}}
                             />
                             
                      

                            <label htmlFor="emailEdit">Email: </label>
                            <input 
                                type="text"
                                id="emailEdit"
                                required
                                minLength={3}
                                maxLength={100}
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                             />
                             
                           
                     
                        </form>
                    }

                </div>
                <div className={styles.profile_data_control}>
                    {
                        (noProfile && !creating && !updating) &&
                        <button onClick={handleCreateButtonOn}>
                            Create Your Profile
                        </button>
                    }

                    {
                        (!noProfile && !creating && !updating) &&
                        <button onClick={handleEditProfile}>
                            Modify Your Profile
                        </button>
                    }

                    {
                        creating && !updating &&
                        <button 
                            disabled={!validated}
                            onClick={handleCreateSubmit}
                        >
                            Create Submit
                        </button>

                    }

                    {
                        updating && !creating &&
                        <button
                            disabled = {!validated}
                            onClick={handleUpdateSubmit}
                        >
                            Apply your change
                        </button>
                    }

                    {
                        (updating || creating) &&
                        <button onClick={handleCancelCreateOrUpdate}>
                            Cancel
                        </button>
                    }

                </div>
            </div>
           
           
        </div>
       
    )
}