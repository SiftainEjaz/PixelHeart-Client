import axios from 'axios';
import React, { useState } from 'react'
import BASE_URL from '../utils/constants';

const EditPassword = () => {

  const [password, setPassword] = useState('');
  const [oldPassword, setOldPasword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);


  const updatePassword = async () => {
    try {
      setError('');
      const res = await axios.patch(
        BASE_URL + '/profile/password',
        { password },
        { withCredentials: true }
      )
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
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
          <span>Password has been updated.</span>
        </div>
      </div>}
      <div className="flex justify-center my-10">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-xl">Update Password</legend>

          <label className="label">Old Password</label>
          <input type="text" value={oldPassword} onChange={(e) => setOldPasword(e.target.value)} className="input focus:outline-none" placeholder="" />

          <label className="label">New Password</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input focus:outline-none" placeholder="" />

          <p className='text-red-500 flex justify-center'>{error}</p>
          <button className="btn btn-accent btn-outline mt-4" onClick={updatePassword}>Update</button>

        </fieldset>
      </div>
    </>
  )
}

export default EditPassword
