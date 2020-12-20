import React, { Component } from 'react'

import { Container, Row, Col, Table, Button, Card, Alert } from 'react-bootstrap'

import axios from 'axios'
import moment from 'moment'

export default class RegisteredView extends Component {



    render() {
        const {usersBooking, toggleSlotBooking} = this.props
        return (
            <Container className="p_sm_0">
                <Row>
                    <Col className="p_sm_0" >
                        {usersBooking.length ?
                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Time slot</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usersBooking.map((val, idx) => {
                                            return (
                                                <tr>
                                                    <td>{new Date(val.booking_date).toDateString()}</td>
                                                    <td>{val.booking_time_slot}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table> :
                            <Alert variant={'danger'}>
                                You have not book any session
                                  </Alert>
                        }
                    </Col>
                </Row>
                <Row className="text-align-center">
                    <Col>
                        <Button className="button_secondary mb_16" onClick={() => toggleSlotBooking(true)}>Book a slot</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}
