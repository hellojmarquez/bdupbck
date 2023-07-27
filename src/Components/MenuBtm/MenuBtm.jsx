import { NavLink } from 'react-router-dom'
import { AiOutlineStar } from 'react-icons/ai'
import { BsChatDots } from 'react-icons/bs'
import { RxPerson } from 'react-icons/rx'
import { MdShare } from 'react-icons/md'

const MenuBtm = () => {
	return (
		<nav className='bg-white flex justify-between w-11/12 rounded-3xl mt-auto mb-1 bottom-0 lg:hidden'>
			<NavLink to='/categories'>
				<button className='group flex flex-col items-center justify-center w-16 h-16'>
					<MdShare className='text-slate-500 text-2xl' />
				</button>
			</NavLink>
			<NavLink to='/swipe'>
				<button className='group flex flex-col items-center justify-center w-16 h-16'>
					<AiOutlineStar className='text-slate-500 text-2xl' />
				</button>
			</NavLink>
			<NavLink to='/conversations'>
				<button className='group flex flex-col items-center justify-center w-16 h-16'>
					<BsChatDots className='text-slate-500 text-2xl' />
				</button>
			</NavLink>
			{/* <NavLink to='#'>
				<button className='group flex flex-col items-center justify-center w-16 h-16'>
					<RxPerson className='text-white text-2xl' />
				</button>
			</NavLink> */}
		</nav>
	)
}
export default MenuBtm
