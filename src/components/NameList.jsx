import React from "react";
import axios from "axios";

export default class NameList extends React.Component {
	state = {
		names: [],
	};


	componentDidMount() {
		axios.get("http://localhost:3000/names")
			.then(res => {
				this.setState({ names: res.data });
			})
			.catch(err => {
				console.log("Failed to fetch data:", err);
			});
	}

	async submitName(name) {
		const res = await axios.post("http://localhost:3000/names", { name });
		if (res.status === 201) {
			this.setState(prev => ({
				names: [{ name }].concat(prev.names),
			}));
		} else console.log(res.status);
	}

	async handle(e) {
		if (e.key === "Enter") {
			await this.submitName(e.target.value);
			e.target.value = "";
		}
	}

	render() {
		return (
			<ul>
				<input onKeyUp={(e) => this.handle(e)} />
				{this.state.names.map(
					name => <li key={name.id}>{name.name}</li>
				)}
			</ul>
		);
	}
}
