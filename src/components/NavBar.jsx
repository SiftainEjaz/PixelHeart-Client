import { removeUser } from '../utils/userSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { removeConnections } from '../utils/connectionSlice';
import { removeRequest } from '../utils/requestSlice.js';
import BASE_URL from '../utils/constants.js';
import { removeFeed } from '../utils/feedSlice.js';

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const handleLogout = async () => {
        try {
            const res = await axios.post(
                BASE_URL +'/logout',
                {},
                { withCredentials: true }
            )
            dispatch(removeUser());
            dispatch(removeConnections());
            dispatch(removeRequest());
            dispatch(removeFeed());
            return navigate('/login');
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link className="btn btn-ghost text-2xl" to={'/'}> 👩🏻‍❤️‍👨🏽 PixelHeart</Link>
            </div>
            {user && <Link className='btn btn-accent mx-5' to={'/connections'}>Connections</Link>}
            {user && <Link className='btn btn-accent' to={'/requests'}>Requests</Link>}
            <div className="flex gap-2">
                {user && <div className="dropdown dropdown-end mx-4">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Photo"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-neutral-700 border border-neutral-500 rounded-box z-50 mt-3 w-52 p-2 shadow-lg right-2"
                        onClick={() => document.activeElement.blur()}>
                        <li>
                            <Link to={'/profile'}>Update Profile</Link>
                        </li>
                        <li>
                            <Link to={'/password'}>Change Password</Link>
                        </li>
                        <li onClick={handleLogout}><a>Logout</a></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default Navbar;
