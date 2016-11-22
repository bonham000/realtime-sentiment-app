
import React from 'react'

const socket = io.connect('http://localhost:5001');

export default class App extends React.Component {
	componentDidMount() {

	}
	constructor() {
		super();
		this.state = {
			tally: 0
		}

		socket.on('inc-tally', () => {
			this.setState({
				tally: this.state.tally + 1
			});
		});

		this.add = this.add.bind(this);
	}
	add() { socket.emit('tally') }
	render() {
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