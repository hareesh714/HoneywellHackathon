import { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import AdminComp from './adminPage';
import DeliveryComp from './deliveryPage';

class HWLogin extends Component {

    constructor() {
        super();
        this.state = {
            userName: '',
            password: '',
            loginSuccess: false,
            loginUser: ''
        }
    }

    onUserChange = (event) => {
        this.setState({ userName: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }



    validateSubmit = (event) => {
        if (!(this.state.userName.length > 0 && this.state.password.length > 0)) {
            alert('Email/Password is mandatory')
        }
        else {
            if (this.state.userName == 'Admin@gmail.com') {
                if (this.state.password != 'BoondiLaddu1') {
                    alert('Admin password is not correct');
                } else {
                    this.setState({ loginSuccess: true, loginUser: 'Admin' })
                }
            } else if (this.state.userName == 'Delivery@gmail.com') {
                if (this.state.password != 'BoondiLaddu2') {
                    alert('Delivery password is not correct');
                } else {
                    this.setState({ loginSuccess: true, loginUser: 'Delivery' })
                }
            } else{
                alert('Email/user does not exists');
            }
        }
    }

    render() {

        return (
            <div>

                {
                    (!this.state.loginSuccess)
                        ?
                        (
                            <div className="Login">
                                <Form onSubmit={this.validateSubmit}>
                                    <Form.Group size="lg" controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            type="email"
                                            onChange={this.onUserChange}
                                        />
                                    </Form.Group>
                                    <Form.Group size="lg" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            onChange={this.onPasswordChange}
                                        />
                                    </Form.Group>
                                    <Button block size="lg" type="submit"
                                    >
                                        Login
                                    </Button>
                                </Form>
                            </div>
                        )
                        :
                        (
                            <div>
                                {
                                    (this.state.loginUser == 'Admin')
                                        ? (
                                            <div>
                                                <AdminComp />
                                            </div>
                                        )
                                        : (
                                            <div>
                                                <DeliveryComp/>
                                            </div>
                                        )
                                }
                            </div>
                        )
                }
            </div>
        );
    }
}

export default HWLogin;