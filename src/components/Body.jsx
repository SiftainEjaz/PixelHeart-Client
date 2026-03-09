import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUser = async () => {
        try {
            const res = await axios.get(
                'http://localhost:2222/profile/view',
                { withCredentials: true }
            )
            dispatch(addUser(res.data?.existingUser));
        }
        catch (err) {
            if(err.status === 401){
                return navigate('/login');
            }
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body;