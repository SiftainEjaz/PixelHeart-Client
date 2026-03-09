import React from 'react'

const ProfileCard = ({ user }) => {
    const { firstName, lastName, about, age, gender, photoUrl } = user;

    return (
        <div className="card bg-base-300 w-96 shadow-sm rounded-2xl">
            <figure>
                <img src={photoUrl} alt="DP" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age + " " + gender}</p>
                <p>{about}</p>
            </div>
        </div>
    )
}

export default ProfileCard;
