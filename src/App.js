import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import moment from 'moment'

import {link, dev_live} from './constants/API'

//components

import { Button, Container, Modal, Row, Col } from 'react-bootstrap';
import SignupModal from "./components/SignupModal";
import LoginModal from "./components/LoginModal";
import Home from "./components/Home";
import Header from "./components/Header";

import axios from 'axios'

function App() {

    const [show, setShow] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [userDetails, setUserDetails] = useState({})
    const [showCondition, setShowCondition] = useState(false);

    const [bookingDetails, setBookingDetails] = useState({})
    const [slotBookingConfirmation, setSlotBookingConfirmation] = useState(false)

    const [errorPopup, setErrorPopup] = useState(false)
    const [errorPopupMessage, setErrorPopupMessage] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [input, setInput] = useState([])

    const childRef = React.useRef()

    const bookSlot = (date, slot) => {
        if (date && slot.length) {
            setBookingDetails({ date: moment(date).format("YYYY-MM-DD"), slot })
            if (!Object.keys(userDetails).length) {
                setShowCondition(true)
                setTimeout(() => {
                    setShow(true);
                    setShowLogin(true);
                    setShowCondition(false)
                }, 5000);
            } else {
                setSlotBookingConfirmation(true)
            }
        } else {
            setError(true, "No date or slot selected to book")
        }
    }

    const setError = (isError, errorMsg) => {
        setErrorPopup(isError)
        setErrorPopupMessage(errorMsg ? errorMsg : "")
    }

    const setUser = (userData) => {
        setUserDetails(userData)
        setShow(false);
        setShowLogin(false);

        if (Object.keys(bookingDetails).length) {
            setSlotBookingConfirmation(true)
        }
    }

    const confirmBookin = async () => {
        console.log("LINK", link)
        console.log("process.env.daalink", process.env.API_LINK)
        try {
            let body = { booking_time_slot: bookingDetails.slot, booking_date: bookingDetails.date, user_id: userDetails.user_id }
            const response = await axios.request({
                url: `${link}/api/book-slot`,
                method: "POST",
                data: body
            });

            console.log("response", response)
        } catch (err) {
            console.log("error", err.message, err, err.response);
            const { data } = err.response;
            setError(true, data.data)
        }
        setBookingDetails({})
        setSlotBookingConfirmation(false)
        childRef.current.apiCallFunction(userDetails)
    }

    useEffect(async () => {
        console.log("LINK", link)
        console.log("process.env.daalink", process.env.API_LINK)
        try {
            const response = await axios.request({
                url: `${link}/api/book-slot`,
                method: "GET",
            })

            console.log("RESPONSE", response.data.data)

            setInput(response.data.data)
        } catch (err) {
            console.log("error", err.message, err, err.response);
            const { data } = err.response;
            setError(true, data.data)
        }

    }, [])

    const toggleModalFromHeader = (isOpen) => {
        setShow(isOpen)
        setShowLogin(isOpen)
    }

    return (
        <Container fluid>
            <Row>
                <Col className="p_0">
                    <Header toggleLoginModal={toggleModalFromHeader} loggedInUser={userDetails} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Home bookSlot={bookSlot} getDates={input} loggedInUser={userDetails} ref={childRef} setError={setError} />
                    {/* <Button onClick={handleShow}>ModalButton</Button> */}

                    {/* error popup */}
                    <Modal show={errorPopup} onHide={() => { setError(false) }} className="modal-z-99999">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {errorPopupMessage !== "" ? errorPopupMessage : "Something went wrong!"}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Please reload and login again to continue
                    </Modal.Body>
                    </Modal>

                    {/* Booking confirmation popup */}
                    <Modal show={slotBookingConfirmation} onHide={() => setSlotBookingConfirmation(false)} className="modal-z-99999">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Final confirmation
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to book this slot?
                    </Modal.Body>
                        <Modal.Footer>
                            <Button className="button_secondary" onClick={() => setSlotBookingConfirmation(false)}>
                                No</Button>
                            <Button className="button_primary" onClick={confirmBookin}>
                                Confirm</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* user not logged in try to book popup */}
                    <Modal show={showCondition} onHide={() => { setShowCondition(false) }} className="modal-z-99999">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                You need to login before booking a slot.
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            You will be redirected to the login popup in 5 seconds.
                    </Modal.Body>
                    </Modal>

                    {/* Login signup popup */}
                    <Modal show={show} onHide={() => {
                        setShow(false)
                        setShowLogin(false)
                    }} className="modal-z-99999">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {!showLogin ?
                                    "Sign up" :
                                    "Login"
                                }
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {!showLogin ?
                                <SignupModal showLoginFn={() => { setShowLogin(true) }} setUser={setUser} /> :
                                <LoginModal hideLogin={() => { setShowLogin(false) }} setUser={setUser} />
                            }
                        </Modal.Body>
                    </Modal>

                </Col>
            </Row>
        </Container>
    );
}

export default App;
