import React, { useEffect, useState } from 'react'

function AllUserView() {

  const [sessionData, setSessionData] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    getSessionData();
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

  return (
    <div>
      {loading ? (
        <div>Loading session data...</div>
      ) : (
        <div>
          {/* Render your content here using sessionData */}
          {/* Example: */}
          <h1>Welcome, {sessionData.userName} to All User View!</h1>
          {/* Add your content components here */}
        </div>
      )}
    </div>
  );
}

export default AllUserView