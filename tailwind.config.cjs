/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				black: '#101010',
				accent1: '#BF9CFA',
				accent2: '#E4FD59',
				main_color: '#F4F4F4',
				soft_gray: '#F2F4F5',
				strong_gray: '#9DABB6',
				error: '#EA6C56',
				true: '#63EE71',
			},
			inset: {
				'1/2': '50%',
				'full': '100%',
			},
			spacing: {
				'64': '17rem',
			},
			fontFamily: {
				nunito: ['Nunito', 'sans-serif'],
				nunitosans: ['Nunito Sans', 'sans-serif'],
				opensans: ["Open Sans", "sans-serif"],
			}
		},
	},

	plugins: [],
}
