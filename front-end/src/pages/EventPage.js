import { useState } from "react";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import EventInfoContent from '../components/EventInfoContent'
import { AllOrgContext } from '../providers/AllOrgProvider';
import EventInfoCard from "../components/EventInfoCard";
import { ownerDocument } from "@material-ui/core";
import Button from '@mui/material/Button';
import NavbarComponent from "../components/NavbarComponent";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../styles/index.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import flyer_icon from '../assets/flyer.png';
import OrgInfoCard from "../components/OrgInfoCard";
import Icon from "@iconify/react";

export default function EventPage(props) {
    //let match = useRouteMatch();
    let { eventID } = useParams();
    const [event, setEvent] = useState({});
    const organizations = useContext(AllOrgContext);

    useEffect(() => {
        fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/' + eventID)
            .then(response => response.json())
            .then(data => {
                let org_tags = [];
                // console.log(data);
                data.orgs??[].forEach(tag=>{
                    organizations.forEach(org => {
                        if(org.uID == tag) org_tags.push(org.name);
                        
                    })
                })
                // data.tags = org_tags;
                setEvent(data);})
            .catch(error => {
                console.error('There was an error fetching event!', error);
            });
    }, [])

    return (
        <div>
            <NavbarComponent page='EventPage' />
            <div class="container1">
                <div class="left-container1">
                    <img id="myImg" class="flyer-img zoom " src={flyer_icon} alt="event flyer" onClick={() => {
                        var modal = document.getElementById("myModal");

                        // Get the image and insert it inside the modal - use its "alt" text as a caption
                        var img = document.getElementById("myImg");
                        var modalImg = document.getElementById("img01");
                        var captionText = document.getElementById("caption");
                        img.onclick = function(){
                        modal.style.display = "block";
                        modalImg.src = this.src;
                        captionText.innerHTML = this.alt;
                        }

                        // Get the <span> element that closes the modal
                        var span = document.getElementsByClassName("close")[0];

                        // When the user clicks on <span> (x), close the modal
                        span.onclick = function() {
                        modal.style.display = "none";
                        }
                    }}/>
                    <div id="myModal" class="modal">
                        <span class="close">&times;</span>
                        <img class="modal-content" id="img01"/>
                        <div id="caption"></div>
                    </div>
                         <OrgInfoCard orgName={"PlaceHolder Name"} orgImageUrl={null}></OrgInfoCard>
                </div>
                <div class="right-container1">
                    <h1 class="event-name"> {event.title} </h1>
                    <div class="icon-and-txt">
                        <LocationOnIcon class="icon"/>
                        <h6>{event.location}</h6>
                    </div>
                    <div class="icon-and-txt">
                        <AccessTimeIcon class="icon"/>
                        <h6>{event.startTime}</h6>
                    </div>
                    <br/>
                    <div>
                    <Button className="info-btns" variant="contained">Get Directions</Button>
                    <Button className="info-btns" variant="contained">Stream Link</Button>
                    <Button className="info-btns" variant="contained">Add to Calendar</Button>
                    </div>
                    <h2> Description </h2>
                    <p> {event.description} </p>
                    <div class="event=tags">
                        <Button class="tag">tag 1</Button>
                        <Button class="tag">tag 2</Button>
                        <Button class="tag">tag 3</Button>
                    </div>

                </div>
            </div>
        {/* <img src={loc_logo} class="icon" alt="Logo"/>
            <h6>Location</h6>
        </div>
        <div class="container">
            <img src={time_logo} class="icon" alt="Logo"/>
            <h6>Date and Time</h6> */}
        {/* <EventInfoCard event={{
            ...event, start: event.startTime, extendedProps: {
                description:  event.description,
                org: event.org,
                location: event.location,
                link: event.link,
                tags: event.tags,
                lastUpdated:event.lastUpdated
            }
        }} orgs={organizations} animateCard={null} setAnimateCard={null} /> */}
        </div>
        
    )
}