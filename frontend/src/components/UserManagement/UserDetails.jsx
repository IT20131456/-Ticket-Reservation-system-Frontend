import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function UserDetails() {

    const { id, type } = useParams();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetchUserData();
    }, [id]);

    function deactivateAccount() {
        // Implement the logic to deactivate the traveler's account
    }

    function activateAccount() {
        // Implement the logic to activate the traveler's account
    }

    const fetchUserData = async () => {
        let url = "http://localhost:5041/api/";
        switch (type) {
            case "staff":
                url = url + "Staff/";
                break;

            case "travelagent":
                url = url + "TravelAgent/";
                break;

            case "traveler":
                url = url + "Traveler/";
                break;

            default:
                break;
        }

        try {
            const response = await fetch(url + `${id}`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    // Render different views based on the user type
    let userDetailsView;

    switch (type) {
        case "staff":
            userDetailsView = (
                <div>
                    <h2>Staff Details</h2>
                    <p>Staff ID: {userData.staffId}</p>
                    <p>NIC: {userData.nic}</p>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Mobile Number: {userData.mobileNumber}</p>
                    <p>Username: {userData.userName}</p>
                    <p>Admin: <input type='checkbox' checked={userData.isAdmin}></input></p>
                </div>
            );
            break;

        case "travelagent":
            userDetailsView = (
                <div>
                    <h2>Travel Agent Details</h2>
                    <p>Registration No.: {userData.regNo}</p>
                    <p>NIC: {userData.nic}</p>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Mobile Number: {userData.mobileNumber}</p>
                    <p>Username: {userData.userName}</p>
                </div>
            );
            break;

        case "traveler":
            userDetailsView = (
                <div>
                    <h2>Traveler Details</h2>
                    <p>NIC: {userData.nic}</p>
                    <p>Full Name: {userData.fullName}</p>
                    <p>Date of Birth: {userData.dob}</p>
                    <p>Gender: {userData.gender}</p>
                    <p>Contact: {userData.contact}</p>
                    <p>Email: {userData.email}</p>
                    <p>Address: {userData.address}</p>
                    <p>Username: {userData.username}</p>
                    <p>Traveler Type: {userData.travelerType}</p>
                    <p>Account Status: {userData.accountStatus}</p>
                    {userData.AccountStatus === "Active" ? (
                        <button onClick={deactivateAccount}>Deactivate</button>
                    ) : (
                        <button onClick={activateAccount}>Activate</button>
                    )
                    }
                </div>
            );
            break;

        default:
            userDetailsView = (
                <div>
                    <p>Invalid user type: {type}</p>
                </div>
            );
            break;
    }

    return (
        <div>
            {userDetailsView}
        </div>
    );
}

export default UserDetails