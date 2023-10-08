// import React, { useState } from 'react';

// function TravelerManagement() {
//   const [travelers, setTravelers] = useState([]);
//   const [newTraveler, setNewTraveler] = useState({ NIC: '', name: '', isActive: true });

//   // Function to create a new traveler profile
//   const createTraveler = () => {
//     // Validate and add the new traveler to the list
//     if (newTraveler.NIC && newTraveler.name) {
//       setTravelers([...travelers, newTraveler]);
//       setNewTraveler({ NIC: '', name: '', isActive: true });
//     }
//   };

//   // Function to update a traveler's profile
//   const updateTraveler = (updatedTraveler) => {
//     // Find the traveler by NIC and update their information
//     const updatedTravelers = travelers.map((traveler) =>
//       traveler.NIC === updatedTraveler.NIC ? updatedTraveler : traveler
//     );
//     setTravelers(updatedTravelers);
//   };

//   // Function to delete a traveler's profile
//   const deleteTraveler = (NIC) => {
//     // Filter out the traveler with the given NIC
//     const updatedTravelers = travelers.filter((traveler) => traveler.NIC !== NIC);
//     setTravelers(updatedTravelers);
//   };

//   // Function to toggle activation status
//   const toggleActivation = (NIC) => {
//     // Find the traveler by NIC and toggle their isActive status
//     const updatedTravelers = travelers.map((traveler) =>
//       traveler.NIC === NIC ? { ...traveler, isActive: !traveler.isActive } : traveler
//     );
//     setTravelers(updatedTravelers);
//   };

//   return (
//     <div>
//       <h2>Traveler Management</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="NIC"
//           value={newTraveler.NIC}
//           onChange={(e) => setNewTraveler({ ...newTraveler, NIC: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Name"
//           value={newTraveler.name}
//           onChange={(e) => setNewTraveler({ ...newTraveler, name: e.target.value })}
//         />
//         <button onClick={createTraveler}>Create</button>
//       </div>
//       <ul>
//         {travelers.map((traveler) => (
//           <li key={traveler.NIC}>
//             {traveler.name} ({traveler.NIC}) -{' '}
//             {traveler.isActive ? 'Active' : 'Inactive'}
//             <button onClick={() => updateTraveler({ ...traveler, name: 'Updated Name' })}>
//               Update
//             </button>
//             <button onClick={() => deleteTraveler(traveler.NIC)}>Delete</button>
//             <button onClick={() => toggleActivation(traveler.NIC)}>
//               {traveler.isActive ? 'Deactivate' : 'Activate'}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TravelerManagement;

import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./register.module.css";

function TravelerManagement() {
  const [travelers, setTravelers] = useState([]);
  const [newTraveler, setNewTraveler] = useState({
    NIC: "",
    name: "",
    isActive: true,
  });

  // Function to create a new traveler profile
  const createTraveler = () => {
    // Validate and add the new traveler to the list
    if (newTraveler.NIC && newTraveler.name) {
      setTravelers([...travelers, newTraveler]);
      setNewTraveler({ NIC: "", name: "", isActive: true });
    }
  };

  // Function to update a traveler's profile
  const updateTraveler = (updatedTraveler) => {
    // Find the traveler by NIC and update their information
    const updatedTravelers = travelers.map((traveler) =>
      traveler.NIC === updatedTraveler.NIC ? updatedTraveler : traveler
    );
    setTravelers(updatedTravelers);
  };

  // Function to delete a traveler's profile
  const deleteTraveler = (NIC) => {
    // Filter out the traveler with the given NIC
    const updatedTravelers = travelers.filter(
      (traveler) => traveler.NIC !== NIC
    );
    setTravelers(updatedTravelers);
  };

  // Function to toggle activation status
  const toggleActivation = (NIC) => {
    // Find the traveler by NIC and toggle their isActive status
    const updatedTravelers = travelers.map((traveler) =>
      traveler.NIC === NIC
        ? { ...traveler, isActive: !traveler.isActive }
        : traveler
    );
    setTravelers(updatedTravelers);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    field: "not selected yet",
    address: "",
    type: "not selected yet",
    password: "",
    nic: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  

  const onSubmit = async (e) => {
    e.preventDefault();
  
    // Create an object with the desired structure
    const requestBody = {
      Id: "", // You can leave it empty or set a default value
      NIC: formData.nic,
      FullName: formData.name,
      Contact: formData.mobile,
      Email: formData.email,
      Address: formData.address,
      TravelerType: formData.type,
      PasswordHash: formData.password,
    };
  
    try {
      // Make an HTTP POST request to your ASP.NET REST API
      const response = await fetch('http://localhost:5041/api/Traveler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Convert the object to JSON
      });
  
      if (response.ok) {
        // Request was successful, handle the response

        const data = await response.json();
        console.log('Response data:', data);
        if (data) {
          alert('Traveler Registered Successfully');
        }

        // Clear the form fields by resetting the formData state
        setFormData({
          nic: "",
          name: "",
          mobile: "",
          email: "",
          address: "",
          type: "",
          password: "",
        });
   
      } else {
        // Request failed, handle the error
        console.error('Request failed:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error:', error.message);
    }
  };
  

  return (
 

    <div>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h5>Manage Travelers</h5>
            <Link to="/user/login">
              <button type="button" className={styles.white_btn}>
                Travelers
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form className={styles.form_container}>
              <h3><strong>Register Traveler</strong></h3>

              <input
                type="text"
                placeholder="Full Name"
                name="name"
                onChange={onChange}
                value={formData.name}
                required
                className="form-control mt-2 mb-2"
              />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={onChange}
                value={formData.email}
                required
                className="form-control mt-2 mb-2"
              />

              <input
                type="text"
                placeholder="Mobile Number"
                name="mobile"
                onChange={onChange}
                value={formData.mobile}
                required
                className="form-control mt-2 mb-2"
              />

              <select
                className="form-select mt-2 mb-2"
                name="type"
                value={formData.type}
                onChange={onChange}
                required
              >
                <option fieldofinterest="not selected yet" selected>
                  Traveler Type
                </option>
                <option fieldofinterest="Regular Traveler">
                Regular Traveler
                </option>
                <option fieldofinterest="Frequent Traveler">
                Frequent Traveler
                </option>
                <option fieldofinterest="Business Traveler">
                Business Traveler
                </option>
                <option fieldofinterest="Student Traveler">
                Student Traveler
                </option>
              </select>

              <textarea
                placeholder="Address"
                name="address"
                onChange={onChange}
                value={formData.address}
                required
                className="form-control mt-2 mb-2"
              />

              {/* <select
              className="form-select mt-2 mb-2"
              name="type"
              value={formData.type}
              onChange={onChange}
              required
            >
              <option type="not selected yet" selected>
                Type
              </option>
              <option type="Job Seeker">Job Seeker</option>
              <option type="Job Recruiter">Job Recruiter</option>
            </select> */}

              <input
                type="text"
                placeholder="NIC"
                name="nic"
                onChange={onChange}
                value={formData.nic}
                required
                className="form-control mt-2 mb-2"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChange}
                value={formData.password}
                required
                className="form-control mt-2 mb-2"
              />

              <button
                type="submit"
                onClick={onSubmit}
                className={styles.green_btn}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelerManagement;
