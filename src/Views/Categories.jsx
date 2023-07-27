import React from 'react'
import Category from '../Components/Category/Category'
import MenuBtm from '../Components/MenuBtm/MenuBtm'
const Categories = () => {
	return (
		<div className=' flex flex-col w-full px-4 pt-4'>
			<h1 className='text-center mb-2'>BuddyUp</h1>
			<h2>Buscas alguna actividad o intrés</h2>
			<h3 className='mb-2'>Encuentra tu amistad ideal</h3>
			<div className=' w-full flex flex-row flex-wrap justify-between pb-16'>
				<Category text='aprender musica' />
				<Category text='Manejar bicicleta' />
				<Category text='Jugar ajedréz' />
				<Category text='Matematicas' />
				<Category text='Ir al gimnasio' />
				<Category text='Jugar baloncesto' />
				<Category text='Jugar baloncesto' />
				<Category text='aprender futbol' />
				<Category text='Jugar baloncesto' />
				<Category text='aprender futbol' />
				<Category text='Jugar baloncesto' />
				<Category text='aprender futbol' />
				<Category text='Jugar baloncesto' />
				<Category text='aprender futbol' />
			</div>
			<MenuBtm />
		</div>
	)
}
export default Categories
