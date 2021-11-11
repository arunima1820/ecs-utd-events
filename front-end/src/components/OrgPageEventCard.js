import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tag from './Tag';
import { getFormattedTime } from './TimeUtils';
import CalendarIcon from '@iconify-icons/radix-icons/calendar';
import LinkIcon from '@iconify/icons-mdi/link-variant';
import ICalendarLink from "react-icalendar-link";
import IconButton from '../components/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';

// This functional component renders an event card for an Org Profile page
// It expects "event" prop to be in the FullCalendar format!
export default function OrgPageEventCard({ event, pastEvent, orgs, loading }) {

    if (loading) {
        return (
            <Card className="drop-shadow mb-4">
                <Row>
                    <Col style={{ textAlign: 'left', wordBreak: 'break-all' }}>
                        <h5 className="font-weight-bold"><Skeleton animation="wave" /></h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={2} style={{ textAlign: 'left', paddingBottom: '5px' }}>
                        {/* <p className="mb-0">{event.start.toDateString()}</p> */}
                        <p className="mb-0"><Skeleton animation="wave" /></p>
                        <p className="mb-0"><Skeleton animation="wave" /></p>
                        <p className="mb-0"><Skeleton animation="wave" /></p>
                        <p className="mb-0"><Skeleton animation="wave" /></p>
                    </Col>
                    <Col style={{ textAlign: 'left' }} className="d-flex">
                        <Row className="d-flex flex-grow-1">
                            <Col className="mr-3">
                                <Skeleton animation="wave" height="100%" />
                            </Col>
                        </Row>
                        <Row className="d-flex">
                            <Col className="d-flex flex-grow-1 justify-content-end align-items-end m-0">
                                <Skeleton className="mr-2" width="40px" height="40px" variant="circle" />
                                <Skeleton className="mr-2" width="40px" height="40px" variant="circle" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        )
    }

    // change background color styles if we have past vs. future event
    const backgroundColor = pastEvent === true ? "org-page-past-event-card" : "";
    if (event != null && orgs != null) {

        var includedLink = event.link != null ? " " + event.link : "";
        // create .ical/.ics event for downloading
        const formattedICalEvent = {
            title: event.title,
            description: event.description + includedLink,
            startTime: event.startTime,
            endTime: event.endTime,
            location: event.location
        }
        // Get the relevant organizations for this event
        var relevantOrgs = orgs.filter(org => event.orgs.includes(org.uId));
        return (
            <Card className={"drop-shadow mb-4 " + backgroundColor}>
                <Row>
                    <Col style={{ textAlign: 'left', wordBreak: 'break-all' }}>
                        <h5 className="font-weight-bold">{event.title}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={2} style={{ textAlign: 'left', paddingBottom: '5px' }}>
                        <p className="mb-0">{(new Date(event.startTime)).toDateString()}</p>
                        <p className="mb-0">{!event.allDay ? getFormattedTime(new Date(event.startTime)) + " - " + getFormattedTime(new Date(event.endTime)) : null}</p>
                        <p className="mb-0">{event.location}</p>
                        <p className="mb-0">{relevantOrgs != null && relevantOrgs.map(org => org.shortName).join(", ")}</p>
                    </Col>
                    <Col style={{ textAlign: 'left' }} className="d-flex">
                        <Row>
                            <p>{event.description}</p>
                        </Row>
                        {event.tags == null &&
                            <Row className="d-flex flex-grow-1">
                                <Col className="d-flex flex-grow-1 justify-content-end align-items-end m-0">
                                    {event.link != null &&
                                        <IconButton className="m-0 mr-1 color-black" icon={LinkIcon} href={event.link} target="_blank"></IconButton>
                                    }
                                    <ICalendarLink event={formattedICalEvent}>
                                        <IconButton className="m-0" icon={CalendarIcon} />
                                    </ICalendarLink>
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>
                {event.tags != null &&
                    <Row className="mb-0">
                        <Col xs={12} sm={8} md={6} className="d-flex justify-content-start align-items-end m-0" style={{ wordBreak: 'break-word' }}>
                            <Row className="m-0">
                                {
                                    event.tags.map((label, index) =>
                                        <Tag
                                            key={index}
                                            type={pastEvent ? "" : "accent"}
                                            style={{ backgroundColor: pastEvent && 'var(--secondary3)', margin: '2px' }}>
                                            {label}
                                        </Tag>
                                    )
                                }
                            </Row>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-end m-0">
                            {event.link != null &&
                                <IconButton className="m-0 mr-1 color-black" icon={LinkIcon} href={event.link} target="_blank"></IconButton>
                            }
                            <ICalendarLink event={formattedICalEvent}>
                                <IconButton className="m-0 mr-1" icon={CalendarIcon} />
                            </ICalendarLink>
                        </Col>
                    </Row>}
            </Card>
        )
    } else {
        return (
            null
        );
    }
}
