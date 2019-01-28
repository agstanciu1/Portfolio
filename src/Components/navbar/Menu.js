import React, {Component} from 'react';
import './Menu.css';

class Menu extends Component {
	addClass = (e) => {
		if(e.target.classList.contains('active')) {
			e.target.classList.remove('active');
		} else {
			e.target.classList.add('active');
		};
		this.props.Show();
	}

	render() {
		return (
			<div className="menu">
					{/* <div> */}
					{/* 	<button className="massive ui inverted teal button"> */}
					{/* 		About me */}
					{/* 		<i className="fas fa-angle-down"></i> */}
					{/* 	</button> */}
					{/* </div> */}
					<div onClick={this.addClass}>
						<button className="massive ui inverted teal button" >
							Weather App Project
						</button>
					</div>
			</div>
			);
	}
}

export default Menu;