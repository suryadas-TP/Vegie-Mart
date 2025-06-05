import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const User = useSelector((state) => state.user.userInfo);
    // console.log("User from redux:", User);


    const [user,setUser]= useState(null);

    const [error,setError]=useState('');

    useEffect(()=>{
        const fetchUser = async()=>{
            const userId = localStorage.getItem('userId');
            console.log(user);
            
             if (!userId) {
                setError("User ID not found. Please log in.");
                return;
            }
            try{
                 const response = await axios.get(`http://localhost:3000/me/${userId}`);
                setUser(response.data);
            }catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to fetch user data.");
            }
        }
        fetchUser();
    },[]);
    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-emerald-100">
                {user ? (
                    <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
                        <h2 className="text-4xl font-bold text-emerald-700 mb-6">
                            Welcome, {user.userName}!
                        </h2>
                        <div className="text-lg text-gray-700 space-y-4">
                            <p>
                                <span className="font-semibold text-emerald-600">Name:</span> {user.userName}
                            </p>
                            <p>
                                <span className="font-semibold text-emerald-600">Email:</span> {user.email}
                            </p>
                        </div>
                    </div>
                ) :error ? (
                    <div className="text-red-500 text-xl font-semibold">
                        {error}
                    </div>
                ) : (
                    <div className="text-red-500 text-xl font-semibold">
                        User not found. Please log in.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
