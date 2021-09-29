import { useState } from "react";
import { useEffect, useContext } from "react";
import {useParams} from "react-router-dom";
import EventInfoContent from '../components/EventInfoContent'
import { AllOrgContext } from '../providers/AllOrgProvider';

export default function EventPage( props ){
    //let match = useRouteMatch();
    let { eventID } = useParams();
    const [event, setEvent] = useState({});
    const organizations = useContext(AllOrgContext);

    useEffect(() => {
        fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/' + eventID)
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => {
                console.error('There was an error fetching event!', error);
            });
    }, [])

    console.log(event)

    return (
        <div>
            <h1>{event.title}</h1>
            <h2>{event.description}</h2>
            <h3>{event.link}</h3>
            <h3>{event.location}</h3>
            <h3>{event.startTime}</h3>
        </div>
    )
}