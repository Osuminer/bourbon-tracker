// App.jsx
import React, { useState, useEffect } from 'react';
import {Route, Routes, useLocation } from 'react-router-dom';

import MyNavbar from '../components/Navbar/Navbar';
import BourbonView from './BourbonView';
import BourbonList from './BourbonList';
import MyCollection from './MyCollection';
import MyWishlist from './MyWishlist';

import './App.scss';

const App = () => {
  // State to store the fetched whiskies
  const [whiskies, setWhiskies] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');
  const pageNum = new URLSearchParams(location.search).get('p');


  useEffect(() => {
    // Function to fetch whiskies from backend
    const fetchWhiskies = async (pageNum) => {
      try {
        const response = await fetch(`https://api.cstasnet.com/api/whiskies?p=${pageNum}`);
        const data = await response.json();
        setWhiskies(data);
      } catch (error) {
        console.error('Error fetching whiskies:', error);
      }
    };

    if (searchQuery) {
      onSearch(searchQuery, pageNum)
    } else {
      fetchWhiskies(pageNum);
    }
  }, [searchQuery, pageNum]);

  const onSearch = async (searchTerm, pageNum) => {
    try {
      const response = await fetch(`https://api.cstasnet.com/api/whiskies?q=${searchTerm}&p=${pageNum}`);
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
            <Route path='/wishlist' element={<MyWishlist />} />
            <Route path='/collection' element={<MyCollection />} />
          </Routes>
        </div>
      </div>
  );
};

export default App;
