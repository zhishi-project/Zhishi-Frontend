import React from 'react'
import { Link } from 'react-router'

import logo from '../../../img/logo-header.png'
class PageNotFound extends React.Component{

	render(){
		return (
        <div id='pagecontainer'>
        <img  id ="logo" src={logo} alt="Zhishi-Logo" />
        <div id ='content'>
        <h1 id ="number"> 404</h1>
        <p id='text'>Oops!! Page Not Found</p>
        <p className ='home'> <Link id ='home' to='/' >Home</Link></p>
        </div>
		</div>	);
	}
}
export default PageNotFound