
import React from 'react'
import { connect } from 'react-redux'

const socket = io.connect('http://localhost:5001');

@connect( 
	state => ({
		news: state.news
	}),
	null
)
export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tally: 0
		}
		this.add = this.add.bind(this);

		socket.on('inc-tally', () => { this.setState({ tally: this.state.tally + 1 })});
	}
	add() { socket.emit('tally') }
	render() {
		console.log(this.props);
		return (
			<div>
				<h1>App Component</h1>
				{this.state.tally}
				<br />
				<button onClick = {this.add}>Add to Tally</button>
			</div>
		);
	}
};