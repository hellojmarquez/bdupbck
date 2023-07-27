import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaQuoteRight, FaMars, FaBirthdayCake } from 'react-icons/fa';
import Carrusel from '../Carrusel/Carrusel.jsx';
import MatchButtons from '../MatchButtons/MatchButtons.jsx';
import axios from 'axios';

const PerfilSwipe = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const api = "https://buddyup.azurewebsites.net/buddyup-curated";
    const headerConfig = {
      headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem("token")),
        "Content-Type": "application/json",
      }
    };

    try {
      const response = await axios.get(api, headerConfig);
      const data = response.data;
      setUsersData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleNextUser = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % usersData.length);
  };

  const handlePreviousUser = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  if (loading) {
    return <div className='text-center min-h-screen'>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const currentUser = usersData[currentIndex];

  return (
    <div className='flex flex-col w-full'>
       <div
        className='bg-white border border-gray-400 rounded-xl p-4 m-4 relative'
        style={{
          backgroundImage: currentUser.photos[0].image_url ? `url(${currentUser.photos[0].image_url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '450px',
        }}
      >
        <div className='absolute bottom-10 left-4'>
          <h1 className='text-xl font-bold text-white'>{currentUser.name}</h1>
        </div>
        <div className='absolute bottom-4 left-4'>
          <FaMapMarkerAlt className='w-5 h-5 text-gray-500 mr-1' />
          <p className='text-gray-500'>{currentUser.location}</p>
        </div>
      </div>
      <div className='bg-[#D7F854] border border-gray-400 rounded-xl p-4 m-4'>
        <FaQuoteRight />
        <div className='flex items-start'>
          <p>{currentUser.quote}</p>
        </div>
      </div>
      <div className='bg-white border border-gray-400 rounded-xl p-4 m-4'>
        <p className='pb-3 font-bold'>Mi descripción</p>
        <div className='flex items-start'>
          <p>{currentUser.bio}</p>
        </div>
      </div>
      <div className='bg-white border border-gray-400 rounded-xl p-4 mx-4 mt-4'>
        <p className='font-bold'>Lo esencial</p>
        <div className='mt-4'>
          <div className='flex items-center'>
            <FaMars className='w-5 h-5 text-gray-500 mr-1' />
            {currentUser.gender}
          </div>
          <div className='flex items-center'>
            <FaBirthdayCake className='w-5 h-5 text-gray-500 mr-1' />
            {currentUser.age}
          </div>
        </div>
      </div>
      <Carrusel />
      <div className='bg-white border border-gray-400 rounded-xl p-4 mx-4 mt-4'>
        <p className='font-bold'>Mis intereses</p>
        <div className='mt-4 flex flex-wrap'>
          {currentUser.tags.map((tag, index) => (
            <div key={index} className='px-2 py-1 bg-gray-200 rounded-full inline-block text-sm mr-2 mb-2'>
              {tag}
            </div>
          ))}
        </div>
      </div>
      {/* Mostrar solo en dispositivos móviles */}
      <div className='mt-1 flex flex-col items-center justify-center sticky bottom-20 bg-white md:hidden'>
        <MatchButtons handleNextUser={handleNextUser} handlePreviousUser={handlePreviousUser} id={currentUser.id} />
      </div>
      {/* Mostrar solo en desktop */}
      <div className='sticky bottom-3 bg-white hidden md:block'>
        <MatchButtons handleNextUser={handleNextUser} handlePreviousUser={handlePreviousUser} id={currentUser.id} />
      </div>
    </div>
  )
};

export default PerfilSwipe;
