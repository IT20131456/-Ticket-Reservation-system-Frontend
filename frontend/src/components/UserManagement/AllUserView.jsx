// This page will display all the users to backend office staff
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Backoffice from '../Navbar/Backoffice';
import "./styles.css";

function AllUserView() {
  const [sessionData, setSessionData] = useState({});
  const [loading, setLoading] = useState(true);
  const [staffList, setStaffList] = useState([]);
  const [travelAgentList, setTravelAgentList] = useState([]);
  const [travelerList, setTravelerList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getSessionData();
    fetchStaffData();
    fetchTravelAgentData();
    fetchTravelerData();
  }, []);

  async function getSessionData() {
    const storedSessionData = localStorage.getItem('sessionData');
    if (storedSessionData) {
      const sessionData = JSON.parse(storedSessionData);
      setSessionData(sessionData);
      setLoading(false); // Set loading to false when data is available
    } else {
      // Handle the case where no session data is found in localStorage
      console.error('Session data not found');
      setLoading(false); // Set loading to false when data is not found
    }
  }

  async function fetchStaffData() {
    try {
      const response = await fetch('http://localhost:5041/api/Staff');
      if (response.ok) {
        const data = await response.json();
        setStaffList(data);
      } else {
        console.error('Failed to fetch Staff data');
      }
    } catch (error) {
      console.error('Error fetching Staff data:', error);
    }
  }

  async function fetchTravelAgentData() {
    try {
      const response = await fetch('http://localhost:5041/api/TravelAgent');
      if (response.ok) {
        const data = await response.json();
        setTravelAgentList(data);
      } else {
        console.error('Failed to fetch Travel Agent data');
      }
    } catch (error) {
      console.error('Error fetching Travel Agent data:', error);
    }
  }

  async function fetchTravelerData() {
    try {
      const response = await fetch('http://localhost:5041/api/Traveler');
      if (response.ok) {
        const data = await response.json();
        setTravelerList(data);
      } else {
        console.error('Failed to fetch Traveler data');
      }
    } catch (error) {
      console.error('Error fetching Traveler data:', error);
    }
  }

  return (
    <div className="body">
      <Backoffice />
      <div className="custom-container-bg-white">
        {loading ? (
          <div>Loading session data...</div>
        ) : (
          <div>
            <h1 style={{ textAlign: 'center', color: '#191970' }}>All Accounts</h1>
            <Tabs defaultActiveKey="staff" id="user-tabs">
              <Tab eventKey="staff" title="Staff">
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Staff ID</th>
                      <th>NIC</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Admin</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffList.map((user) => (
                      <tr key={user.staffId}>
                        <td>{user.staffId}</td>
                        <td>{user.nic}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.userName}</td>
                        <td><input type='checkbox' checked={user.isAdmin} readOnly /></td>
                        <td><Button variant="light" onClick={() => navigate(`/user-details/${user.staffId}/staff`)}>More Details</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="travelAgent" title="Travel Agent">
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Registration No.</th>
                      <th>NIC</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {travelAgentList.map((user) => (
                      <tr key={user.regNo}>
                        <td>{user.regNo}</td>
                        <td>{user.nic}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.userName}</td>
                        <td><Button variant="light" onClick={() => navigate(`/user-details/${user.regNo}/travelagent`)}>More Details</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="traveler" title="Traveler">
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>NIC</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Account Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {travelerList.map((user) => (
                      <tr key={user.nic}>
                        <td>{user.nic}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.accountStatus}</td>
                        <td><Button variant="light" onClick={() => navigate(`/user-details/${user.nic}/traveler`)}>More Details</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllUserView;