var React = require('react');

var LoginPage = React.createClass({

	login() {
		var email = this.refs.loginEmail.value;
		var password = this.refs.loginPassword.value;
	},

	signup() {
		var username = this.refs.signupUsername.value;
		var email = this.refs.signupEmail.value;
		var pw = this.refs.signupPassword.value;
		var cpw = this.refs.signupConfirmPassword.value;
		var password = (pw === cpw) ? pw : null;
		var subsribed = this.refs.subscribe.checked;

		if (email && password) {
			console.log('Good to go!');
			this.props.emit('create-user', {
				username: username,
				email: email,
				password: password
			});
		} else {
			console.log('Something was invalid');
		}

	},

	render() {
		return (
			<div>
				
				<h3>Login</h3>
				<form action="javascript:void(0)" onSubmit={this.login}>
					
					<label htmlFor="email">

						<input ref="loginEmail"
							   name="email" 
							   id="email" 
							   type="e-mail" 
							   className="form-control" />

							E-mail

					</label>

					<br />

					<label htmlFor="password">

						<input ref="loginPassword"
							   name="password" 
							   id="password" 
							   type="password" 
							   className="form-control" />

							Password

					</label>

					<br />

					<button className="btn btn-success">Login</button>
				</form>

				<h3>Sign up</h3>
				<form action="javascript:void(0)" onSubmit={this.signup}>

					<input ref="signupUsername"
						   name="signup-username" 
						   type="text" 
						   className="form-control"
						   placeholder="Name (or preferred username)" />

					<br />

					<input ref="signupEmail"
						   name="email" 
						   type="e-mail" 
						   className="form-control"
						   placeholder="E-mail" />

					<br />

					<input ref="signupPassword"
						   name="password" 
						   id="signup-password" 
						   type="password" 
						   className="form-control" />

					<br />

					<input ref="signupConfirmPassword"
						   name="password" 
						   type="password" 
						   className="form-control"
						   placeholder="Confirm password" />

					<br />

					<label htmlFor="subscribe">

						<input ref="subscribe"
							   name="subscribe"
							   id="subscribe"
							   type="checkbox"
							   defaultChecked />

						Subscribe to mailing list

					</label>

					<br />

					<button className="btn btn-success">Sign up</button>
				</form>

			</div>
		);
	}
});

module.exports = LoginPage;