import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './App.css';

const customStyle = {
  headRow: {
    style: {
      backgroundColor: 'blue',
      color: 'white',
    },
  },
  headCells: {
    style: {
      fontSize: '16px',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
  },
  cells: {
    style: {
      fontSize: '15px',
    },
  },
};

function App() {
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email', // Change email to name
      selector: (row) => row.email,
    },
    {
      name: 'Username', // Change username to selector
      selector: (row) => row.username,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        setRecords(res.data);
        setFilterRecords(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) => row.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setRecords(newData);
  };

  return (
    <div style={{ padding: '50px 10%', backgroundColor: 'gray' }}>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <input type="text" placeholder="search..." onChange={handleFilter} style={{ padding: '6px 10px' }} />
      </div>
      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyle} // Use customStyles instead of customStyle
        pagination
        selectableRows
      />
    </div>
  );
}

export default App;
