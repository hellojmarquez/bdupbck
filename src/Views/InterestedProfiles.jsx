import React from 'react'
import MenuTop from '../Components/MenuTop/MenuTop'
import ProfileCard from '../Components/ProfileCard/ProfileCard'

const InterestedProfiles = () => {
	return (
		<div className='bg-main_color'>
			<MenuTop />
			<div className='w-11/12 ml-auto mr-auto'>
				<h3 className='font-semibold'>Ellos quieren ser tus amigos</h3>
				<h4 className='mb-2'>Crea una nueva amistad</h4>
				<div className='w-full flex flex-col gap-2'>
					<ProfileCard />
					<ProfileCard />
					<ProfileCard />
					<ProfileCard />
				</div>
			</div>
		</div>
	)
}

export default InterestedProfiles
