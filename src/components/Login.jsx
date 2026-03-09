import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { addUser } from '../utils/userSlice.js';
import BASE_URL from '../utils/constants.js';

const login = () => {

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setError('');
            const res = await axios.post(
                BASE_URL + '/login',
                { emailId, password },
                { withCredentials: true }
            )
            dispatch(addUser(res.data.user));
            navigate('/');
        }
        catch (err) {
            setError(err?.response?.data?.message);
            console.error(err);
        }
    }

    const handleSignUp = async () => {
        try {
            setError('');
            const res = await axios.post(
                BASE_URL + '/signup',
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            )
            dispatch(addUser(res.data.user));
            navigate('/profile');
            return;
        }
        catch (err) {
            setError(err?.response?.data?.message);
            console.error(err);
        }
    }

    return (
        <div className="flex justify-center my-10">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend text-xl">{isLoginForm ? "Login" : "Signup"}</legend>

                {!isLoginForm && <><label className="label">First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input focus:outline-none" placeholder="First Name" />

                    <label className="label">Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input focus:outline-none" placeholder="Last Name" /></>}

                <label className="label">Email Id</label>
                <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input focus:outline-none" placeholder="Email" />

                <label className="label">Password</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input focus:outline-none" placeholder="Password" />

                <p className='text-red-500 flex justify-center'>{error}</p>
                <button className="btn btn-accent btn-outline mt-4" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Signup"}</button>

                <p className='m-auto py-2 cursor-pointer' onClick={() => setIsLoginForm(value => !value)}>{isLoginForm ? "New User? Register here" : "Already have an account? Login"}</p>

            </fieldset>
        </div>
    )
}

export default login