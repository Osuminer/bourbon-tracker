// App.jsx
import React, { useState, useEffect } from 'react';
import MyNavbar from '../components/Navbar';
import BourbonList from './BourbonList';
import {Route, Routes, useLocation } from 'react-router-dom';
import BourbonView from './BourbonView';
import './App.scss';

const App = () => {
  // State to store the fetched whiskies
  const [whiskies, setWhiskies] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    // Function to fetch whiskies from backend
    const fetchWhiskies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/whiskies');
        const data = await response.json();
        setWhiskies(data);
      } catch (error) {
        console.error('Error fetching whiskies:', error);
      }
    };

    if (searchQuery) {
      onSearch(searchQuery)
    } else {
      fetchWhiskies();
    }
  }, [searchQuery]);

  const onSearch = async (searchTerm) => {
    try {
      // searchTerm = encodeURIComponent(searchTerm);
      // console.log(searchTerm)
      const response = await fetch(`http://localhost:5000/api/whiskies?q=${searchTerm}`);
      const data = await response.json();
      setWhiskies(data);
    } catch (error) {
      console.error('Error fetching whiskies:', error);
    }
  };

  return (
      <div className="body">
        <MyNavbar onSearch={onSearch} />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<BourbonList whiskies={whiskies} />} />
            <Route path="/:id" element={<BourbonView />} />
          </Routes>
        </div>
      </div>
  );
};

export default App;
