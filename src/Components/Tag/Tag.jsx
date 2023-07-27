/*import React, { useEffect, useState } from 'react';

const Tag = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Función para realizar la solicitud al endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('https://buddyup.azurewebsites.net/api/account/get-by-pid?id=1');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const responseData = await response.json();
        setData(responseData); // Guardamos la respuesta en el estado
		console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Realizamos la solicitud al montar el componente
  }, []);

  return (
    <div className='inline-block bg-gray-200 px-3 py-1 rounded-full text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-[#D7F854]'>
      {data && (
        <>
          <p>{data.ptags}</p>
        </>
      )}
    </div>
  );
};

export default Tag;*/
