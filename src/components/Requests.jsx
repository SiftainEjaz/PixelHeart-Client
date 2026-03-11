import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice.js';
import axios from 'axios';
import BASE_URL from '../utils/constants.js';

const Requests = () => {

  const dispatch = useDispatch();
  const requests = useSelector(store => store.request);

  const fetchRequest = async () => {
    try {
      if(requests.length > 0)
        return;
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true }
      )
      dispatch(addRequest(res.data?.connectionRequests || []));
    }
    catch (err) {
      console.error(err);
    }
  }

  const reviewRequest = async (status, fromUserId) => {
    try {
      const res = await axios.patch(
        BASE_URL + "/request/review/" + status + "/" + fromUserId,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(fromUserId));
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchRequest();
  }, [])

  if(!requests)
    return;

  if (requests.length === 0) {
    return <h1 className='flex justify-center my-3 text-xl'>No Requests found!</h1>
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className='text-center text-2xl font-bold mb-6'>Connection Requests</h1>
      {requests && requests.map((request) => {
        const { _id, firstName, lastName, about, age, gender, photoUrl } = request.fromUserId;

        return (
          <div key={_id} className="flex items-center gap-4 bg-base-200 rounded-2xl p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
            <img
              src={photoUrl}
              alt={firstName}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold truncate">{firstName + " " + lastName}</h2>
              {(age || gender) && (
                <p className="text-sm text-gray-400">
                  {age}{age && gender && " • "}{gender}
                </p>
              )}
              {about && <p className="text-sm mt-1 line-clamp-2">{about}</p>}
            </div>
            <div className="flex flex-shrink-0 gap-2">
              <button className="btn btn-outline btn-success btn-sm" onClick={() => { reviewRequest("accepted", _id) }}>Accept</button>
              <button className='btn btn-outline btn-error btn-sm' onClick={() => { reviewRequest("rejected", _id) }}>Reject</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Requests