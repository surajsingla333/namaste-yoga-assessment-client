import React, { Component } from 'react'

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import {link, dev_live} from '../constants/API'

export default class SignupModal extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        errorMessage: ""
    }

    onSubmitForm = async (e) => {
        e.preventDefault();
            
        const { name, email, password } = this.state;
        try {
            const body = { name, email, password };
            const response = await axios.request({
                url: `${link}/api/user-signup`,
                method: "POST",
                data: body
            });

            console.log("response", response)
            this.props.setUser(response.data.data)
        } catch (err) {
            console.log("error", err.message, err, err.response);
            const { data } = err.response;
            this.setState({
                errorMessage: data.data === `duplicate key value violates unique constraint "users_email_key"` ? "Email already exists" : data.data
            })
        }
    };


    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={this.onSubmitForm}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your name" onChange={(e) => {
                                    this.setState({
                                        name: e.target.value,
                                        errorMessage: ""
                                    })
                                }} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
                                    this.setState({
                                        email: e.target.value,
                                        errorMessage: ""
                                    })
                                }} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                    onChange={(e) => {
                                        this.setState({
                                            password: e.target.value,
                                            errorMessage: ""
                                        })
                                    }} />
                            </Form.Group>
                            <Button className="button_primary" type="submit">
                                Submit </Button>
                                {this.state.errorMessage !== "" ?
                                <Form.Text className="text-muted text-danger">
                                    {this.state.errorMessage}
                                </Form.Text> : <></>}

                            <p className=" pt_16 cursor-pointer text_underline text_dark" onClick={() => { this.props.showLoginFn() }}>Already have an account? Login</p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
