import axios from 'axios'
import React, { useEffect } from 'react'
import BASE_URL from '../utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice.js';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(state => state.connection);

  const fetchConnections = async () => {
    try {
      if(connections.length > 0)
        return;
      const res = await axios.get(
        BASE_URL + "/user/connections",
        { withCredentials: true }
      );
      dispatch(addConnections(res.data?.connectionsData));
      console.log(res.data?.connectionsData);
      
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if(!connections)
    return;

  if (connections.length === 0) {
    return <h1 className='flex justify-center my-3 text-xl'>No Connections found!</h1>
  }


  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className='text-center text-2xl font-bold mb-6'>Connections</h1>
      {connections && connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } = connection;
        
        return (
          <div key={_id} className="flex items-center gap-4 bg-base-200 rounded-2xl p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
            <img
              src={photoUrl}
              alt={firstName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{firstName + " " + lastName}</h2>
              {(age || gender) && (
                <p className="text-sm text-gray-400">
                  {age}{age && gender && " • "}{gender}
                </p>
              )}
              {about && <p className="text-sm mt-1">{about}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Connections
