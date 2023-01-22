import "./App.css";
import React from "react";
import Globals from "./Globals";

class Message extends React.PureComponent {
	constructor(props) {
		super(props);

		/* Changeable */
		this.state = {
			client: {
				username: "",
			}
		};

		/* Refs */
		this.self = React.createRef();

		/* Static */
		this.suid = this.props.client;
		this.profilePicture = Globals.accountManager + "profile/image/" + this.props.client
	}

	componentDidMount() {
		this.getClientData();
		console.log(this.state.client.profilePicture);

		if (this.self) {
			this.self.current.animate([
				{ transform: "translateX(100px)", opacity: 0 },
				{ transform: "translateX(0px)", opacity: 1 }
			], {
				duration: 200,
				easing: "ease-in-out"
			});
		};
	}

	/* Get client data */
	getClientData = () => {
		fetch(Globals.accountManager + "profile/data/by_suid/" + this.suid).then(e => {
			if (e.status === 200) {
				e.json().then(data => {
					this.setState({ client: data });
				});
			};
		});
	}

	/* Render */
	render() {
		return (
            <div ref={this.self} className="message">
                <div className="user-profile">
                    <img src={this.profilePicture} alt="profile" />
                </div>
                <div className="main">
                    <p className="data">@{this.state.client.username} - {new Date(this.props.date).toDateString()}</p>
                    <p className="content">{this.props.content}</p>
                </div>
            </div>
		);
	}
}

export default Message;
