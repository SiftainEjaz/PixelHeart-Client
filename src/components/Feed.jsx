import React, { useEffect } from 'react';
import UserCard from './UserCard.jsx';
import BASE_URL from '../utils/constants.js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUsersToFeed } from '../utils/feedSlice.js';

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);
  
  const fetchFeed = async () => {
    if(feed)
      return;
    try {
      const res = await axios.get(
        BASE_URL + '/user/feed',
        { withCredentials: true }
      )
      dispatch(addUsersToFeed(res.data));    
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchFeed();
  }, [])

  if(!feed || feed.length == 0){
    return <h1 className='flex justify-center my-10 text-2xl'>No more users!</h1>;
  }

  return (
    feed && <div className='flex justify-center my-10'>
      <UserCard user = {feed[0]}/>
    </div>
  )
}

export default Feed
