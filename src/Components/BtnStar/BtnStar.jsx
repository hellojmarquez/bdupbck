import React, { Fragment, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { Dialog, Transition } from '@headlessui/react';
import profileUser from "../../images/profile-user.png";
import { useEffect } from 'react';

const BtnStar = ({ id, handleNextUser }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState([]);
  const backgroundImageStyles = {
    backgroundImage: `url("${profileUser}")`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const likes = async (id) => {
    const api = "https://buddyup.azurewebsites.net/api/match/like-with";
    const headerConfig = {
      headers: {
        "Authorization": "Bearer " + JSON.parse((sessionStorage.getItem("token"))),
        "Content-Type": "application/json",
      }
    }
    const body = {
      userToLike: id,
    }

    try {
      const { data } = await axios.post(api, body, headerConfig);
      if (data.status == "OK") {
        handleNextUser();
      } else if (data.status == "Nice") {
        handleNextUser();
        getUserById(id);
        openModal();
      }
    } catch (error) {
      toast.error(
        "¡Ocurrió un error, intentalo otra vez!",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  }

  const getUserById = async (id) => {
    const api = `https://buddyup.azurewebsites.net/api/account/get-by-pid?id=${id}`;
    const headerConfig = {
      headers: {
        "Authorization": "Bearer " + JSON.parse((sessionStorage.getItem("token"))),
        "Content-Type": "application/json",
      }
    }

    try {
      const { data } = await axios.get(api, headerConfig);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          likes(id)
        }}
        className="flex items-center justify-center w-12 h-12 bg-[#D7F854] rounded-full text-white focus:outline-none">
        <FaStar className="text-2xl text-black" />
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-accent2">
                  <div style={backgroundImageStyles} className='flex justify-center items-center h-[384px] '>
                    <div className='flex justify-center items-center mb-16'>
                      <img
                        className='w-[230px] h-[230px] rounded-full border-4 border-solid border-white'
                        src={user.images ? user.images[0].image_url : ""}
                        alt="foto de perfil del usuario" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-center text-black font-nunito font-bold text-2xl mb-4">Nueva amistad encontrada</h3>
                    <div className='flex justify-center flex-wrap gap-2'>
                      {user.tags?.map(tag => (
                        <span className='p-2 rounded-2xl bg-white border border-solid border-[soft_gray]' key={tag.id}>{tag.name}</span>
                      ))}
                    </div>
                    <p className="mt-7 mb-6 font-nunito pointer">¡<span className='font-bold font-nunito'>{user?.pname}</span> ahora es tu nueva amistad, mandale un saludo!</p>
                    <div className='w-full flex justify-center'>
                      <button className='bg-accent1 m-auto px-4 py-2 pointer rounded-2xl mb-6' onClick={() => navigate("/conversations")} type='button'>Chatear con {user?.pname}</button>
                    </div>
                    <p
                      onClick={closeModal}
                      className='text-center text-black text-sm font-nunitosans pointer'
                    >
                      Continua deslizando
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BtnStar;
