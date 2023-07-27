import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { VscSend } from 'react-icons/vsc'
import backgroundImage from '../../../images/Chat-bg.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const Chat = () => {
	const [message, setMessage] = useState('')
	const [chatLog, setChatLog] = useState([])
	const [dataUser, setDataUser] = useState({})
	const { id } = useParams()
	const socket = io('https://bdwckt.vercel.app/', {
		transports: ['websocket'],
		// timeout: 600000,
	})
	useEffect(() => {
		socket.on('connect', () => {
			console.log('Conectado al servidor de Socket.IO')
		})

		socket.on('connect_error', error => {
			console.error('Error de conexión:', error.message)
		})

		socket.on('error', error => {
			console.error('Error en la conexión:', error.message)
		})

		const handleReceiveMessage = data => {
			console.log('Mensaje recibido del servidor:', data)
			setChatLog(prevChatLog => [...prevChatLog, data])
		}

		socket.on('message', handleReceiveMessage)

		// Limpieza: desuscribirse del evento al desmontar el componente

		return () => {
			socket.off('message', handleReceiveMessage)
		}
	}, [])
	useEffect(() => {
		// Realizar la solicitud POST utilizando Axios
		const fetchUserData = async () => {
			try {
				const endpoint =
					'https://buddyup.azurewebsites.net/api/account/get-by-id-or-email'
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
				}
				const postData = {
					description: id, // Enviamos el id en el formato esperado por el backend
				}

				const response = await axios.post(endpoint, postData, config)

				saveUserData(response.data)
			} catch (error) {
				console.error('Error al hacer la solicitud POST:', error)
			}
		}

		fetchUserData()
	}, [id])

	const saveUserData = res => {
		setDataUser({
			name: res.pname,
			img: res.images[0].image_url,
			tags: res.tags,
		})
	}

	const handleSendMessage = e => {
		e.preventDefault()
		if (message.trim() !== '') {
			socket.emit('message', { fromUserId: 'user 1', message }) // Cambia 'user 1' por el ID del usuario actual
			setMessage('')
		}
	}
	const SaveMessageInDB = async () => {
		const endpoint = 'https://buddyup.azurewebsites.net/api/messages/add'
		const config = {}
	}
	return (
		<div
			className='h-screen bg-white text-white flex items-center justify-center'
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
			}}
		>
			<form onSubmit={handleSendMessage}>
				<div className='flex flex-col justify-center items-center'>
					<p className='text-center text-black'>Nueva amistad</p>
					<div className='w-18 h-18'>
						<img
							src={dataUser.img}
							alt='imagen del match'
							className='rounded-full fill-gray-300 stroke-current filter drop-shadow-md w-16 h-16'
						/>
					</div>
					<h1 className='text-black'>{dataUser.name}</h1>
					<div className='flex justify-center items-center flex-wrap flex-row gap-2'>
						{dataUser.tags?.map((item, index) => (
							<div
								className='text-black  px-8 items-start gap-1  rounded-xl border border-gray-700 bg-white'
								key={index}
							>
								<p>{item.name}</p>
							</div>
						))}
					</div>
				</div>
				<ul className='h-80 overflow-y-auto'>
					{chatLog.map((msj, index) => (
						<li
							key={index}
							className={`my-2 p-2 text-sm rounded-md table ${
								msj.user === 'user 1' ? 'bg-sky-700 ml-auto' : 'bg-black'
							}`}
						>
							<p>{msj.message}</p>
							<p className='text-xs text-gray-500'>{msj.timestamp}</p>{' '}
							{/* Muestra la hora del servidor sin modificar */}
						</li>
					))}
				</ul>
				<input
					type='text'
					value={message}
					onChange={e => setMessage(e.target.value)}
					className='w-full rounded-xl border border-gray-700 bg-white p-2 pl-16 text-start text-black'
					placeholder='Ingrese su mensaje aquí'
				/>
				<div className='w-5 h-5 flex-shrink-0 ml-2 relative'>
					<button
						type='submit'
						className='bg-black rounded-full text-white flex absolute bottom-6 left-64 p-2'
					>
						<VscSend />
					</button>
				</div>
			</form>
		</div>
	)
}

export default Chat
