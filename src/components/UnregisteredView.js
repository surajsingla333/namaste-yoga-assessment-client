import React, { Component } from 'react'

import { Container, Row, Col, Table, Button, Card, Alert } from 'react-bootstrap'

import DatePicker from './datePicker/DatePicker';

import axios from 'axios'
import moment from 'moment'

export default class UnregisteredView extends Component {
    render() {
        const {loggedInUser, selectedDate, timeSlots , bookSlot, toggleSlotBooking, onDateChange, highlightDates, usersHightLightedDates, currentDateBookings} = this.props
        return (
            <Container fluid className="p_sm_0">
                            <Row>
                                <Col className="p_sm_0" xs={{ order: 'last' }} sm={{ order: 'last' }} md={{ order: 'first' }}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                {/* <th>Date</th> */}
                                                <th colSpan="4">Schedule of {selectedDate ? selectedDate.toDateString() : ""}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {timeSlots.map(r => {
                                                let arr = currentDateBookings.length && currentDateBookings.filter(booking => booking.booking_time_slot === r);
                                                return (arr.length ?
                                                    <tr>
                                                        <td>{r}</td>
                                                        <td>{arr[0].user_id}</td>
                                                        <td>{arr[0].name}</td>
                                                        <td>{arr[0].email}</td>
                                                    </tr>
                                                    :
                                                    <tr className="cursor-pointer" onClick={() => {
                                                        bookSlot(selectedDate, r)
                                                    }}>
                                                        <td colSpan={arr.length ? "2" : "1"}>{r}</td>
                                                        <td colSpan={arr.length ? "2" : "3"}>This slot is empty, you can book.</td>
                                                        {/* <td><Button onClick={() => {
                                                            this.props.bookSlot(selectedDate, r)
                                                        }}>Book Slot</Button></td> */}
                                                    </tr>
                                                )
                                            }
                                            )}
                                        </tbody>
                                    </Table>
                                    {Object.keys(loggedInUser).length ?
                                        <Row className="text-align-center mb_16">
                                            <Col>
                                                <Button className="button_secondary" onClick={() => toggleSlotBooking(false)}>Goto your details</Button>
                                            </Col>
                                        </Row> : <div></div>}
                                </Col>
                                <Col xs={{ order: 'first' }} sm={{ order: 'first' }} md={{ order: 'last' }} >
                                    <Card className=" align-items-center mb_16" >
                                        <Card.Body>
                                            <Card.Title className="text-align-center">Bookings Calender</Card.Title>
                                            <Card.Text>
                                                <DatePicker
                                                    value={selectedDate !== "" ? selectedDate.toDateString() : new Date()}
                                                    onChange={(date) => {
                                                        onDateChange(date)
                                                    }}
                                                    placeholderText="Move in date"
                                                    open={true}
                                                    shouldCloseOnSelect={false}
                                                    highlightDates={[
                                                        {
                                                            "highlighted-class": highlightDates
                                                        }, {
                                                            "highlighted-today": [new Date()]
                                                        }, {
                                                            "current-user-hightlighted-class": usersHightLightedDates
                                                        }
                                                    ]}
                                                    minDate={new Date()}
                                                />
                                            </Card.Text>
                                            <Card.Text className="d-flex m_0">
                                                <span className="today_color_calender pr_16"></span> <p className="pl_16">Today
                                                </p>
                                            </Card.Text>
                                            <Card.Text className="d-flex m_0">
                                                <span className="current_user_color_calender pr_16"></span> <p className="pl_16">Your booking days</p>
                                            </Card.Text>
                                            <Card.Text className="d-flex m_0">
                                                <span className="other_bookings_color_calender pr_16"></span> <p className="pl_16">Partially booked days</p>
                                            </Card.Text>
                                            <Card.Text className="d-flex m_0">
                                                <span className="selected_date_color_calender pr_16"></span> <p className="pl_16">Selected date</p>
                                            </Card.Text>


                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
        )
    }
}
