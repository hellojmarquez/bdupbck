import React, { useEffect, useState } from 'react'
import { RiShieldUserLine } from 'react-icons/ri'
import imgTest from '../../images/userIcon.png'
import imgBU1 from '../../images/imgConversationsBuddyUp1.png'
import imgBU2 from '../../images/img2BuddyUpConversations.png'
import imgBU3 from '../../images/img3BuddyUpConversations.png'
import imgBU4 from '../../images/img4BuddyUpConversations.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Menu } from '@mui/material'
import MenuBtm from '../MenuBtm/MenuBtm'
const Conversations = () => {
	const [conversations, setConversations] = useState([])
	useEffect(() => {
		const getIDMatches = async () => {
			try {
				const endpoint =
					'https://buddyup.azurewebsites.net/api/match/my-matches'
				const token = sessionStorage.getItem('token')
				const tokenWithoutQuotes = token.replace(/^"(.*)"$/, '$1')
				const config = {
					headers: {
						Authorization: `Bearer ${tokenWithoutQuotes}`,
					},
				}

				const response = await axios.get(endpoint, config)
				const ids = response.data

				// Utilizar map para crear un array de promesas
				const userPromises = ids.map(async id => {
					try {
						// Hacer la solicitud utilizando el ID en el endpoint deseado
						const userEndpoint = `https://buddyup.azurewebsites.net/api/account/get-by-pid?id=${id.matchedUserPid}`
						const userConfig = {
							headers: {
								Authorization: `Bearer ${tokenWithoutQuotes}`,
							},
						}

						const userResponse = await axios.get(userEndpoint, userConfig)
						return userResponse.data // Devolver los datos del usuario para el ID actual
					} catch (error) {
						console.error('Error al obtener los datos del usuario:', error)
						throw error
					}
				})

				// Utilizar Promise.all para obtener todos los resultados de las solicitudes en paralelo
				const userDataArray = await Promise.all(userPromises)
				setConversations(userDataArray)

				//   conversations.push(userDataArray);
				//   console.log(conversations)
			} catch (error) {
				console.error('Error al hacer la solicitud:', error)
			}
		}
		getIDMatches()
	}, [])

	const AmistadesNuevas = [
		{ name: 'Fernanda', img: imgBU1 },
		{ name: 'Miley', img: imgBU2 },
		{ name: 'Laura', img: imgBU3 },
		{ name: 'Daniela', img: imgBU4 },
	]
	return (
		<div className='container mx-auto px-4 bg-slate-100 h-100'>
			<div className='flex justify-between p-2'>
				<div>
					<h1>BuddyUp</h1>
				</div>
				<div>
					<p className='text-2xl mt-1'>
						<RiShieldUserLine />
					</p>
				</div>
			</div>
			<div className='mt-2'>
				<input
					type='text'
					className='w-full rounded-xl border-solid border-2 p-2'
					placeholder='buscar nombre'
				/>
				<h2 className='text-left mt-2 font-bold'>Amistades nuevas</h2>
				<div className='flex justify-around gap-2 mt-2'>
					{AmistadesNuevas.map((item, index) => (
						<div key={index}>
							<img src={item.img} alt='' />
							<p className='text-center'>{item.name}</p>
						</div>
					))}
				</div>
			</div>

			<div className='flex flex-col justify-start'>
				<h2 className='text-left mt-2 font-bold'>Mensajes</h2>
				<div>
					{conversations.map((conversation, index) => (
						<Link
							to={`/chat/${conversation.uid}`}
							key={index}
							className='flex items-center mt-2 mb-2'
						>
							<img
								src={conversation.images[0]?.image_url}
								alt='la imagen del usuario'
								className='w-12 h-12 rounded-full mr-4'
							/>
							<h2 className='text-left mt-2 font-semibold'>{conversation.pname}</h2>
						</Link>
					))}
				</div>
			</div>
			<div className='flex justify-center items-center mt-[10rem]'>
			<MenuBtm/>
			</div>
			
		</div>
		
	)
}

export default Conversations
