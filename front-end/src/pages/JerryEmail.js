import { Card, Col, Container, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';

import { getAPIFormattedISOString, getFormattedDate } from '../components/TimeUtils';
import CustomButton from "../components/CustomButton";
import { useContext, useRef, useState } from "react";
import { AllOrgContext } from "../providers/AllOrgProvider";
import { AllEventContext } from "../providers/EventProvider";

// Helper function to check if two DateTime objects are on the same day
const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

// Helper function to get the string for a single event
const getEventString = (curEvent, orgs) => {
    // Create a list of orgs that are collaborating on this event
    // We must use a for loop as the event only stores an array of orgIds
    // and we must convert orgIds to org shortNames
    let orgString = ''
    for (let j = 0; j < curEvent.orgs.length; j += 1) {
        let curOrg = orgs.find(org => org.uId === curEvent.orgs[j]);
        console.log("shortName", curOrg, "event", curEvent)
        orgString += curOrg.shortName.toString();
        if (j < curEvent.orgs.length - 1) {
            orgString += ' X ';
        }
    }
    const curDate = new Date(curEvent.startTime);

    // build the final event string
    return (curEvent.title + ' -- ' + orgString + '\n' + curDate.toLocaleTimeString() + '\t|\t'
        + curEvent.location + '\n' + curEvent.description
        + (curEvent.link != null ? ('\n' + addProtocol(curEvent.link)) : "") + '\n\n');
}

// In case a link does not inclues "https://" we add it here
function addProtocol(str) {
    var pattern = new RegExp('^(https?:\\/\\/).*');
    if (!pattern.test(str)) {
        return 'https://' + str
    } else {
        return str
    }
}

// this async function takes the apiData and converts it into the email
async function getEmailString(apiData, orgs) {
    if (apiData == null || apiData.length == 0) {
        return 'No Events To Display';
    } else {
        // The textObj is meant to be used if we want to display the email in HTML
        // which might look nicer on the webpage but serve no functional purpose for the email copy button
        // var textObj = {}
        var string = ''
        var i = 0;
        var prevDate = new Date(apiData[0].startTime)
        // textObj.prevDate = [apiData[0]]
        string = prevDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + '\n';
        while (i < apiData.length) {
            const curEvent = apiData[i]
            const curDate = new Date(curEvent.startTime)
            // We must check to see if we need a new Header for a new day
            if (datesAreOnSameDay(curDate, prevDate)) {
                // textObj.prevDate.push(curEvent);
                const eventString = getEventString(curEvent, orgs);
                string += eventString;
            } else {
                // textObj.curDate = [curEvent[i]];
                string += curDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + '\n';
                const eventString = getEventString(curEvent, orgs);
                string += eventString;
            }
            prevDate = curDate;
            i = i + 1;
        }
        return string;
    }
}

// This page supports an auto email generator for a faculty member to send to the ecs.all mailing list
// It is named after Mr. Jerry Alexander, a former Assistant Dean of ECS and head of JCS.
export default function JerryEmail() {

    // today and nextSunday are the default times set for the email generator
    const today = new Date();
    today.setHours(0, 0, 0);
    const formattedStart = getFormattedDate(today);
    const nextSunday = new Date();
    nextSunday.setDate(today.getDate() + (7 + 6 - today.getDay()) % 7);
    nextSunday.setHours(0, 0, 0);
    const formattedEnd = getFormattedDate(nextSunday);

    const { register, handleSubmit } = useForm();
    const [emailString, setEmailString] = useState('');
    const orgs = useContext(AllOrgContext);
    const emailTextRef = useRef(null);
    const eventsList = useContext(AllEventContext);

    const copyToClipboard = (e) => {
        if (emailTextRef == null && emailTextRef.current != null) {
            console.log('failed to copy text')
            return;
        } else {
            navigator.clipboard.writeText(emailString);
            console.log('successfully copied string');
        }
    }

    const getEventsList = (start, end) => {
        eventsList.filter(event => event.startTime >= start && event.endTime <= end);
    }

    const generateEmail = (data, e) => {
        // data comes from the useForm() hook API when we use handleSubmit()
        var startDate = new Date(data.startDate);
        var endDate = new Date(data.endDate);
        // We want startDate and endDate to start from midnight UTC
        // thus we add the timeZoneOffset to these times to adjust the clock back to 00:00:00 UTC
        var timeZoneOffset = startDate.getTimezoneOffset() / 60
        startDate.setHours(startDate.getHours() + timeZoneOffset);
        endDate.setHours(endDate.getHours() + timeZoneOffset);

        const url = `/api/events/date/start=${getAPIFormattedISOString(startDate)}&end=${getAPIFormattedISOString(endDate)}`
        console.log(url)
        fetch(('http://localhost:80') + url)
            .then(response => response.json())
            .then(data => getEmailString(data, orgs))
            .then(string => {
                setEmailString(string)
            })
            .catch(error => {
                console.error('There was an error fetching events for the email!', error);
            });
    }

    return (
        <div className="background" style={{ minHeight: '100vh' }}>
            <Container className="py-4 d-flex justify-content-center">
                <Card className="p-5" style={{ maxWidth: '500px' }}>
                    <Form onSubmit={handleSubmit(generateEmail)}>
                        <Form.Row className="pb-2">
                            <Form.Group as={Col} controlId="startDate">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" placeholder="Start Date" name="startDate" ref={register({ required: true, valueAsDate: true })} defaultValue={formattedStart} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="endDate">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control type="date" placeholder="End Date" name="endDate" ref={register({ required: true, valueAsDate: true })} defaultValue={formattedEnd} />
                            </Form.Group>
                        </Form.Row>
                        <CustomButton type="submit" wide>Generate Email</CustomButton>
                    </Form>
                </Card>
            </Container>

            {emailString != null && emailString !== '' &&
                (
                    <Container>
                        <button onClick={copyToClipboard}>Copy text</button>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{emailString}</p>
                    </Container>
                )
            }
        </div>
    )
}