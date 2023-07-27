// import addNotification from 'react-push-notification';

const Notification = () => {

  const buttonClick = () => {
    addNotification({
      title: 'BuddyUp',
      subtitle: 'This is a subtitle',
      message: '¡Hay un nuevo match esperandote!',
      theme: 'darkblue',
      native: true
    });
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <button onClick={buttonClick} >
        Click pa' enviar una noti (cuando hagan match se llamará automáticamente a esta función 😉)
      </button>
    </div>
  );
};

export default Notification;