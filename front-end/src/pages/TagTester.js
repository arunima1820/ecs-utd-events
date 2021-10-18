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

export default function TagTester() {
    const [tags, setTags] = useState([])
    const orgs = useContext(AllOrgContext)
    const [filteredEvents, setFilteredEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState([])

    useEffect(() => {
        apiProvider.getAll('tags', setTags)
        apiProvider.getAll('events', setFilteredEvents)
    }, [])

    const sorted = tags.sort((a, b) => a.category.toString() < b.category.toString() ? 1 : -1)

    const printList = (list) => {
        <>
        <p> LIST STARTS HERE </p>
            {list.map((item, index) => {
                <div>
                    <p>{item}</p>
                </div>
            })}
        </>
    }

    function handleChange(tags) {
        // TODO get Ids of all the tags and use those to filter
        // Next steps are to get the list of events matching the filters 
        // Lastly, integrate into calendar/homepage


        // TODO figure out org filtering using this component as well
        console.log("VALUE", tags)
        // var filteredOrgs = []
        // for (const tag of tags) {
        //     if (tag.category == 'Organization') 
        //         filteredOrgs.push(orgs.find(org => org.uId === tag.id))
        // }
        // console.log(filteredOrgs)  
        
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
            events={filteredEvents}
            eventClick={(info) => {
            if (selectedEvent == null || info.event.id !== selectedEvent.id) {
                info.el.style.backgroundColor = "var(--primaryshade1)";
                info.el.style.borderColor = "var(--primaryshade1)";
                setTimeout(() => { printList(info.event) }, 100)
            }
            }}
        />
        </div>
        </Row>
        </div>
    )
}



