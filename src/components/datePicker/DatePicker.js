import moment from 'moment'
// Date formate in YYYY-MM-DD
// Reference:https://reactdatepicker.com/
import React, { useState, useEffect } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import './DatePicker.css'


export default function DatePicker(props) {
    const [selected, setSelected] = useState(props.selected ? props.selected : null)
    const { isIconFirst, ownborder, customIcon, onChange, hasIcon, customContainerClass, customCalenderClass } = props
    let _calendar;
    const oldValue = (selected ?
        (moment(selected).format(props.timeCaption == 'Time' ? 'HH:mm' : 'DD-MM-YYYY')) :
        (props.value ? props.value : '')).toString()
    useEffect(() => {
        let arr = document.getElementsByClassName("react-datepicker__input-container")
        Array.prototype.forEach.call(arr, function (el) {
            el.getElementsByTagName("input")[0].setAttribute("readonly", "readonly")
        });
    })

    const isWeekday = date => {
        const day = date;
        return day !== 0 && day !== 6;
    };

    return (
        <div
            className={`${ownborder ? 'border radius_8' : ''} ${customContainerClass ? customContainerClass : ''
                } d-flex custom-calender ion-align-items-center ${isIconFirst ? 'flex-direction-reverse' : ''}`}
        >
            <ReactDatePicker
                {...props}
                selected={selected}
                onChange={(date) => {
                    setSelected(date)
                    onChange(date)
                }}
                showPopperArrow={false}
                calendarClassName={`pl_calender`}
                filterDate={isWeekday}
            />
        </div>
    )
}
