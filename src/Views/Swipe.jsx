import React, { useState } from 'react'
import MenuTop from '../Components/MenuTop/MenuTop'
import PerfilSwipe from '../Components/PerfilSwipe/PerfilSwipe'
import MenuBtm from '../Components/MenuBtm/MenuBtm'
//import axios from "axios"

const Swipe = () => {
  /*const [user, setUser] = useState([]);

  const getUsers = async () => {
    const api = "https://buddyup.azurewebsites.net/buddyup-curated";
    const headerConfig = {
      headers: {
        "Authorization": "Bearer " + JSON.parse((sessionStorage.getItem("token"))),
        "Content-Type": "application/json",
      }
    }
    try {
      const { data } = await axios.get(api, headerConfig);
      console.log(data);
      setUser(data)
    } catch (error) {
      console.error(error);
    }
  }


      <div className='flex'>
        {
          user.map(user => (


         ))
        }
      </div>

      id={user.id}
  getUsers();*/

  return (
    <>
      <MenuTop />

            <PerfilSwipe  />
 
      <div className='pt-3 flex flex-col items-center justify-center sticky bottom-0 bg-white'>
        <MenuBtm />
      </div>
    </>
  )
}

export default Swipe