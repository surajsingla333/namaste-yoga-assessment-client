import React, { Component } from 'react'
import { Container, Row, Col, Table, Button, Card, Alert } from 'react-bootstrap'

import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'

import DatePicker from './datePicker/DatePicker';
import {link, dev_live} from '../constants/API'

import axios from 'axios'
import moment from 'moment'
import RegisteredView from './RegisteredView';
import UnregisteredView from './UnregisteredView';


export default class Home extends Component {
    state = {
        selectedDate: '',
        highlightDates: [],
        usersHightLightedDates: [],
        usersBooking: [],
        bookingDate: [],
        currentUser: {},
        slotBooking: false,
        currentDateBookings: []
    }

    timeSlots = ["8:00 AM - 10:00 AM", "12:00 PM - 2:00 PM", "4:00 PM - 6:00 PM", "8:00 PM - 10:00 PM"]
    async componentDidMount() {
        const { getDates, loggedInUser } = this.props
        this.setState({
            selectedDate: new Date()
        })
        try {
            const response = await axios.request({
                url: `${link}/api/book-slot`,
                method: "GET",
            })

            console.log("RESPONSE", response.data.data)

            this.setState({
                highlightDates: typeof response.data.data === 'string' ? [] : response.data.data.map(r => new Date(r.booking_date)),
                bookingDate: response.data.data,
                currentUser: loggedInUser
            })
        } catch (err) {
            console.log("error", err.message, err, err.response);
            const { data } = err.response;
            this.props.setError(true, data.data)
        }

        const body = { date: moment(new Date()).format("YYYY-MM-DD") }
        try {
            const response = await axios.request({
                url: `${link}/api/book-slot-details`,
                method: "POST",
                data: body
            })

            console.log("RESPONSE", response.data.data)
            this.setState({
                currentDateBookings: response.data.data,
                currentUser: loggedInUser
            })
        } catch (err) {
            console.log("error", err.message, err, err.response);
            const { data } = err.response;
            this.props.setError(true, data.data)
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const { loggedInUser } = this.props

        if (this.state.currentUser !== loggedInUser) {
            await this.apiCallFunction(loggedInUser)
        }
    }

    toggleSlotBooking = async (isSlotBooking) => {
        const { currentUser } = this.state

        this.setState({
            slotBooking: isSlotBooking
        }, async () => {
            await this.apiCallFunction(currentUser)
        })
    }

    apiCallFunction = async (currentUser) => {
        if (currentUser && Object.keys(currentUser).length) {
            try {
                const response = await axios.request({
                    url: `${link}/api/book-slot/${currentUser.user_id}`,
                    method: "GET",
                })

                console.log("RESPONSE", response.data.data)

                this.setState({
                    usersBooking: response.data.data,
                    usersHightLightedDates: typeof response.data.data === 'string' ? [] :response.data.data.map(r => new Date(r.booking_date)),
                    currentUser: currentUser
                })
            } catch (err) {
                console.log("error", err.message, err, err.response);
                const { data } = err.response;
                this.props.setError(true, data.data)
            }
        }
        try {
            const response = await axios.request({
                url: `${link}/api/book-slot`,
                method: "GET",
            })

            console.log("RESPONSE", response.data.data)

            this.setState({
                highlightDates: typeof response.data.data === 'string' ? [] : response.data.data.map(r => new Date(r.booking_date)),
                bookingDate: response.data.data,
                currentUser: currentUser
            })
        } catch (err) {
            console.log("error", err.message, err, err.response);
            const { data } = err.response;
            this.props.setError(true, data.data)
        }

        this.onDateChange(this.state.selectedDate)
    }

    onDateChange = async (date) => {
        this.setState({
            selectedDate: date
        })
        const body = { date: moment(date).format("YYYY-MM-DD") }
        try {
            const response = await axios.request({
                url: `${link}/api/book-slot-details`,
                method: "POST",
                data: body
            })

            console.log("RESPONSE", response.data.data)
            this.setState({
                currentDateBookings: response.data.data
            })
        } catch (err) {
            console.log("error", err.message, err, err.response);
            const { data } = err.response;
            this.props.setError(true, data.data)
        }
    }

    render() {
        var date = new Date();
        const { selectedDate, highlightDates, usersBooking, slotBooking, currentDateBookings, usersHightLightedDates, currentUser } = this.state;
        const { getDates, loggedInUser } = this.props
        return (
            <Container fluid>
                <Row>
                    <Col>
                        {Object.keys(currentUser).length ?
                            <div className="p_16">
                                <h1>
                                    Hello! {currentUser.name}</h1>
                                {
                                    !slotBooking ?
                                        <h5>
                                            Here is the list of all your bookings
                                    </h5> :
                                        <h5>
                                            Check the available sessions and make your booking
                                    </h5>
                                }
                            </div> :
                            <div className="p_16">
                                <h1>Hello! User...</h1>
                                <h5>
                                    Check the available sessions and make your booking
                                    </h5>

                            </div>

                        }
                    </Col>
                </Row>
                {
                    Object.keys(currentUser).length && !slotBooking ?
                        <RegisteredView loggedInUser={currentUser} usersBooking={usersBooking} toggleSlotBooking={this.toggleSlotBooking}/>
                        :
                        <UnregisteredView loggedInUser={currentUser} selectedDate={selectedDate} timeSlots={this.timeSlots} currentDateBookings={currentDateBookings} bookSlot={this.props.bookSlot} toggleSlotBooking={this.toggleSlotBooking} onDateChange={this.onDateChange} highlightDates={highlightDates} usersHightLightedDates={usersHightLightedDates}/>
                }
            </Container>
        )
    }
}
