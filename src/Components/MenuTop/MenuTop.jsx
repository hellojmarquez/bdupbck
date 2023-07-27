import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IoCloseSharp } from 'react-icons/io5'
import { RiMenuLine } from 'react-icons/ri'
import { FaSliders } from 'react-icons/fa6'

const MenuTop = () => {
	const [navbar, setNavbar] = useState(false)
	const navigate = useNavigate()
	const handleLogOut = () => {
		setNavbar(!navbar)
		sessionStorage.removeItem('token')
		navigate("/");
		window.location.reload(false);
	}
	return (
		<nav className='sticky h-16 w-full top-0 left-0 z-40 bg-white'>
			<div className='justify-between mx-auto lg:max-w-7xl md:items-center md:flex md:pr-8'>
				<div className='flex items-center justify-between px-4 py-3 md:flex-row md:px-8'>
					<div className='md:hidden'>
						<button className='text-2xl' onClick={() => setNavbar(!navbar)}>
							{navbar ? <IoCloseSharp /> : <RiMenuLine />}
						</button>
					</div>
					<div className='flex items-center'>
						<NavLink to={'/'}>
							<h1>BuddyUp</h1>
						</NavLink>
					</div>
					<div className='md:hidden'>
						<button className='text-2xl'>
							<FaSliders />
						</button>
					</div>
				</div>
				<div>
					<div
						className={`flex-1 justify-self-center text-center pb-3 md:block md:bg-red-400 md:h-fit md:pb-0 ${navbar ? 'h-screen' : 'hidden'
							}`}
					>
						<ul className='items-center justify-center space-y-8 bg-white md:flex md:space-x-6 md:space-y-0'>
							<li className='hover:text-blue-400 transition delay-75'>
								<NavLink
									className={({ isActive }) => {
										return isActive ? 'text-blue-400' : undefined
									}}
									to='#'
									onClick={() => setNavbar(!navbar)}
								>
									<h4>Perfil</h4>
								</NavLink>
							</li>
							<li className='hover:text-blue-400 transition delay-75'>
								<NavLink
									className={({ isActive }) => {
										return isActive ? 'text-blue-400' : undefined
									}}
									to='#'
									onClick={() => setNavbar(!navbar)}
								>
									<h4>Configuración</h4>
								</NavLink>
							</li>
							<li className='hover:text-blue-400 transition delay-75'>
								<NavLink
									className={({ isActive }) => {
										return isActive ? 'text-blue-400' : undefined
									}}
									to='#'
									onClick={() => setNavbar(!navbar)}
								>
									<h4>Nosotros</h4>
								</NavLink>
							</li>
							<li className='hover:text-blue-400 transition delay-75 pb-6 md:pb-0'>
								<NavLink
									className={({ isActive }) => {
										return isActive ? 'text-blue-400' : undefined
									}}
									to='#'
									onClick={handleLogOut}
								>
									<h4>Cerrar sesión</h4>
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	)
}
export default MenuTop
