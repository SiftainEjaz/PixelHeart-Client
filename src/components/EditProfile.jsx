import { useState } from 'react'
import axios from 'axios';
import ProfileCard from './ProfileCard';
import BASE_URL from '../utils/constants.js';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || '');
    const [gender, setGender] = useState(user.gender || '');
    const [about, setAbout] = useState(user.about || '');
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [skills, setSkills] = useState(user.skills || '');
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState('');

    const updateProfile = async () => {
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/update",
                { firstName, lastName, age, gender, about, photoUrl },
                { withCredentials: true }
            )
            dispatch(addUser(res.data.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000)
            setError('');
        }
        catch (err) {
            setError(err?.response?.data?.message);
            console.error(err);
        }
    }

    return (
        <>
            {showToast && <div className="toast toast-center toast-top">
                <div className="alert alert-success">
                    <span>Profile has been updated.</span>
                </div>
            </div>}
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 my-10 px-4">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm border p-4">
                    <legend className="fieldset-legend text-2xl italic">Edit Profile</legend>

                    <label className="label">First Name</label>
                    <input type="email" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input w-full" placeholder="" />

                    <label className="label">Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input w-full" placeholder="" />

                    <label className="label">Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="input w-full" placeholder="" />

                    <label className="label">Gender</label>
                    <div className="dropdown w-full">
                        <div tabIndex={0} className="select select-bordered w-full flex items-center">
                            {gender || "Select Gender"}
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box w-full z-10 shadow">
                            <li><a onClick={() => setGender("Male")}>Male</a></li>
                            <li><a onClick={() => setGender("Female")}>Female</a></li>
                            <li><a onClick={() => setGender("Others")}>Others</a></li>
                        </ul>
                    </div>

                    <label className="label">About</label>
                    <input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="input w-full" placeholder="" />

                    <label className="label">Photo Url</label>
                    <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input w-full" placeholder="" />

                    <p className='text-red-500 flex justify-center'>{error}</p>
                    <button className="btn btn-accent btn-outline mt-4 w-full" onClick={updateProfile}>Save Changes</button>
                </fieldset>
                <div className='flex justify-center'>
                    <ProfileCard user={{ firstName, lastName, about, age, gender, photoUrl }} />
                </div>
            </div>
        </>
    )
}

export default EditProfile