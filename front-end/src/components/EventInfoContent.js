import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Card from "react-bootstrap/esm/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowMoreText from 'react-show-more-text';
import ShareIcon from '@iconify/icons-mdi/share';
import LinkIcon from '@iconify/icons-mdi/link-variant';
import CalButtonIcon from '@iconify-icons/radix-icons/calendar';
import infoCircleOutlined from '@iconify/icons-ant-design/info-circle-outlined';
import { useContext, useEffect, useState } from "react";
import ICalendarLink from "react-icalendar-link";
import IconButton from '../components/IconButton';
import Tag from "./Tag";
import { ReactComponent as GroupIcon } from './../assets/group.svg';
import { ReactComponent as PlaceholderIcon } from './../assets/placeholder.svg';
import { apiProvider } from '../providers/Provider';
import { AllTagContext } from '../providers/TagProvider';

export function ListItemLayout({ Icon, children }) {
    return (
        <Row>
            <Col xs={2}>
                <Icon className="event-icon" />
            </Col>
            <Col>
                {children}
            </Col>
        </Row>
    )
}

// get the shortName for all orgs that are collaborators on this event
function getRelevantOrgs(allOrgs, event) {
    if (allOrgs == null || event == null || event.extendedProps.org == null || event.extendedProps.org.length === 0) {
        return null;
    }
    var filteredArr = [];
    event.extendedProps.org.forEach(id => {
        filteredArr.push(
            allOrgs.find(item => {
                return item.uId === id
            })
        )
    })
    return filteredArr
}

// A shared component to display event info on large and small screens
export default function EventInfoContent({ event, mobile, orgs }) {
    const [relevantOrgs, setRelevantOrgs] = useState(null);
    const tags = useContext(AllTagContext)
    const [tempTag, setTemp] = useState()
    console.log("event" + event);

    useEffect(() => {
        const filteredOrgs = getRelevantOrgs(orgs, event);
        setRelevantOrgs(filteredOrgs);
    }, [event]);

    const eventTags = []
    event.extendedProps.tags.forEach(eventTag => {
        eventTags.push(tags.find(tag => eventTag.trim() === tag.id))
    })
    console.log("EventInfoContent", event)
    //var lastUpdatedStr = lastUpdatedToString(event.extendedProps.lastUpdated);
    var includedLink = event.extendedProps.link != null ? event.extendedProps.link : "";

    // create .ical/.ics event for downloading
    const formattedICalEvent = {
        title: event.title,
        description: event.extendedProps.description + " " + includedLink,
        startTime: event.start,
        endTime: event.end,
        location: event.extendedProps.location
    }

    return (
        <>
            <Card.Header className="card-header-no-border">
                <h3 className="font-weight-bold card-title mb-0">{event.title}</h3>
            </Card.Header>
            <Card.Body className="pt-2">
                <ListGroup className="list-group-flush text-left">
                    <ListGroupItem className="px-0">
                        {/* <ListItemLayout Icon={CalendarIcon}>
                            {event.start.toDateString()}<br />
                            {!event.allDay ? getFormattedTime(event.start) + " - " + getFormattedTime(event.end) : null}
                        </ListItemLayout> */}
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                        <ListItemLayout Icon={PlaceholderIcon}>
                            {event.extendedProps.location || 'Unspecified Location'}
                        </ListItemLayout>
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                        <ListItemLayout Icon={GroupIcon}>
                            {relevantOrgs != null &&
                                relevantOrgs.map((org, index) =>
                                    <span>
                                        {/* <Link style={{ color: 'var(--gray2)' }} target="_blank" to={`/org/${org.slug}`}>
                                            <b data-tip={org.name}>{org.shortName}</b>
                                            <ReactTooltip backgroundColor="#FFD7BA" textColor="black" clickable={true} effect="solid" offset={{ top: 0 }} html={true} />
                                        </Link> */}
                                        {index !== relevantOrgs.length - 1 ? ', ' : ''}
                                    </span>
                                )
                            }
                        </ListItemLayout>
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                        {(mobile == null || !mobile) &&
                            <ShowMoreText
                                lines={3}
                                more={'Read more'}
                                less={'Read less'}
                                expanded={false}>{event.extendedProps.description}
                            </ShowMoreText>
                        }
                        {mobile &&
                            <p>{event.extendedProps.description}</p>
                        }
                    </ListGroupItem>
                </ListGroup>
            </Card.Body>
            {eventTags != null &&
                <Row>
                    <Col>
                        {eventTags.map((tag, index) => <Tag key={index} type="accent">{tag.acronym.toString() ?? tag.value.toString()}</Tag>)}
                    </Col>
                </Row>
            }
            <Row className="mb-0">
                <Col className="d-flex align-items-end">
                    {/* <p className="text-muted my-0 mb-2 ml-0" style={{ fontSize: '.75rem' }}>Last updated {lastUpdatedStr}</p> */}
                </Col>
                <Col xs={2} className="d-flex align-item-end justify-content-end">
                    <ButtonGroup>
                        <IconButton className= "mr-1 color-black" icon={infoCircleOutlined} href={window.location.href + "events/" + event.id}></IconButton>
                        <IconButton className="mr-1 color-black" icon={LinkIcon} href={event.extendedProps.link} target="_blank"></IconButton>
                        <ICalendarLink event={formattedICalEvent}>
                            <IconButton className="mr-1" icon={CalButtonIcon} />
                        </ICalendarLink>
                        {/* <IconButton className="mr-1" icon={ShareIcon}></IconButton> */}
                    </ButtonGroup>
                </Col>
            </Row>
            <Row className="my-0">
            </Row>
        </>
    )
}