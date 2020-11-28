import React, { useState, useEffect } from 'react';
import ExpertCard from './Expert/ExpertCard'
import axios from 'axios';

const expertsArr = []


function Dashboard() {
  const [experts, setExperts] = useState(expertsArr)

  useEffect(() => {
    axios.get('http://www.expertstolearnfrom.com/api/expertlist/photography')
      .then((res) => {
        console.log(res.data)
        setExperts(res.data)
        console.log(experts)
      })
  }, []);

  return (
    <div className="dashboard">
        <h1>Experts To Learn From</h1>
        {/* {experts.map(expert => (
          <ExpertCard expert={expert} key={expert.id} />
        ))} */}
    </div>
  );
}

export default Dashboard;
