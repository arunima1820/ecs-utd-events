//@author: Arunima and Afrida
import { useState, useEffect, useContext, useMemo } from 'react';
import Chip from '@material-ui/core/Chip';
import * as React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { apiProvider } from '../providers/Provider';
import { AllOrgContext } from '../providers/AllOrgProvider';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import { AllEventContext } from '../providers/EventProvider';

export default function TagTester() {
    const [tags, setTags] = useState([])
    const orgs = useContext(AllOrgContext)
    const events = useContext(AllEventContext)
    const [selectedEvent, setSelectedEvent] = useState([])
    const [selectedTags, setSelectedTags] = useState([])


    useEffect(() => {
        apiProvider.getAll('tags', setTags)
    }, [])

    const sorted = tags.sort((a, b) => a.category.toString() < b.category.toString() ? 1 : -1)

    const filteredEvents = []
    if (selectedTags.length !== 0) {
        selectedTags.forEach(tag => {
            events.forEach(event => {
                if (event.tags.includes(tag.id))
                    filteredEvents.push(event)
            })
        })
    } else {
        filteredEvents.push(events)
    }

    const formatted = []
    filteredEvents.forEach(event => {
        formatted.push({
            'allDay': false,
            'end' : event.endTime,
            'id' : event.id,
            'start' : event.startTime,
            'title' : event.title
        })
    })
    
    console.log("form", formatted) // stores and displays all events for now
    console.log("selectedEvent", selectedEvent) // empty

    function handleChange(tags) {
        console.log("VALUE", tags)
        setSelectedTags(tags)
        
    }
    
    return (
        <div>
        <Row className="home-page-filters mx-1 mt-2">
            {/* organizations filter */}
            <Col xs={12} sm={6} className="d-flex align-items-end pl-2 pr-0">
            <Autocomplete
                name="tags"
                options={sorted}
                groupBy={(option) => option.category.toString()}
                getOptionLabel={(option) => (option.acronym.toString() || option.value.toString())}
                onChange={(e, value, _) => handleChange(value)}
                loading={tags.length === 0}
                renderInput={(params) => 
                    <TextField 
                    style={{}} 
                    {...params} 
                    margin="normal" 
                    variant="standard"
                    />}
                getOptionSelected={(option, value) => option.acronym === value.acronym}
                limitTags={1}
                
                // clearOnEscape
                multiple
            />
            </Col>
        </Row>
        <Row>
        <div className="fullcalendar-wrapper d-none d-md-block">
        <FullCalendar
            initialView="upcomingWeek"
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'upcomingWeek,timeGridWeek,dayGridMonth'
            }}
            height="100%"
            scrollTime='10:00:00'
            listDayFormat={{
            weekday: 'long'
            }}
            listDaySideFormat={{
            month: "long",
            day: "numeric"
            }}
            views={{
            upcomingWeek: {
                buttonText: 'upcoming',
                type: 'list',
                duration: { days: 7 },
                dayCount: 7
            }
            }}
            /* TODO figure out why events aren't showing up on calendar here */
            events={formatted} 
            eventClick={(info) => console.log(info.event)}
        />
        </div>
        </Row>
        </div>
    )
}