import React from 'react'
import axios from 'axios';
import BASE_URL from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeUsersFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {

    const dispatch = useDispatch();

    const handleSendRequest = async (status, toUserId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + toUserId,
                {},
                { withCredentials: true }
            );

            dispatch(removeUsersFromFeed(toUserId));
        }
        catch (err) {
            console.error(err);
        }
    }

    const { _id, firstName, lastName, about, age, gender, skills, photoUrl } = user;
    return (
        <div className="card bg-base-300 w-96 shadow-sm rounded-2xl">
            <figure>
                <img
                    src={photoUrl}
                    alt="DP" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{about}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-soft btn-info" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                    <button className="btn btn-soft btn-error" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
