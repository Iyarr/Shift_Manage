import React from 'react';
import { Calendar } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'


class Calender extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state =
        {
        };
    };

    render() {
        return(
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
          />
        );
    }
}
export default Calender;