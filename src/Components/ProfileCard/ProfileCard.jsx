import React from 'react'
import image from '../../images/imageTest.jpg'

import { IoMdLocate } from 'react-icons/io'
const ProfileCard = () => {
	return (
		<div className='w-full rounded-md gap-2 p-2 flex flex-row bg-white border-2 border-strong_gray h-28'>
			<div className='w-1/5 h-full rounded-md overflow-hidden'>
				<img src={image} className='h-full' alt='' />
			</div>
			<div className='w-4/5 h-full rounded-md p-2'>
				<h3 className='text-sm font-semibold'>alex sanchez</h3>
				<div>
					<div className='flex items-center gap-2'>
						<IoMdLocate />
						<p className='text-[12px]'>Lima / San Isidro</p>
					</div>
					<div className='flex flex-row gap-1 mb-[4px]'>
						<div className='bg-accent2 rounded-md max-w-fit px-2'>
							<p className='text-[10px]'>aprender a cocinar</p>
						</div>
						<div className='bg-white rounded-md border-strong_gray border-[1px] max-w-fit px-2'>
							<p className='text-[10px]'>recet@s</p>
						</div>
					</div>
					<div className='flex flex-row gap-1'>
						<div className=' rounded-md border-strong_gray border-[1px] max-w-fit px-2'>
							<p className='text-[10px]'>recet@s</p>
						</div>
						<div className=' rounded-md border-strong_gray border-[1px] max-w-fit px-2'>
							<p className='text-[10px]'>recet@s</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileCard
