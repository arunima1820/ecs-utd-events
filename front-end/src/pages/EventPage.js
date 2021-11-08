import { useState } from "react";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Moment from 'moment';

import EventInfoContent from '../components/EventInfoContent'
import { AllOrgContext } from '../providers/AllOrgProvider';
import EventInfoCard from "../components/EventInfoCard";
import { ownerDocument } from "@material-ui/core";
import Button from '@mui/material/Button';
import NavbarComponent from "../components/NavbarComponent";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../styles/index.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import flyer_icon from '../assets/flyer2.png';
import OrgInfoCard from "../components/OrgInfoCard";
import Icon from "@iconify/react";
import { apiProvider } from "../providers/Provider";
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function EventPage(props) {
    //let match = useRouteMatch();
    let { eventID } = useParams();
    const [event, setEvent] = useState({});
    const organizations = useContext(AllOrgContext);

    useEffect(() => {
        try {
            apiProvider.getSingle('events', eventID, setEvent)
            let org_tags = [];
                // console.log(data);
                event.orgs??[].forEach(tag=>{
                    organizations.forEach(org => {
                        if(org.uID == tag) org_tags.push(org.name);
                    })
                })
        } catch (error) {
            console.error('There was an error fetching event!', error);
        }
    }, [])

    return (
        // <div>
        //     <NavbarComponent page='EventPage' />
        //     <div class="container1">
        //         <div class="left-container1">
        //             <center><img id="myImg" class="flyer-img zoom " src={flyer_icon} alt="event flyer" onClick={() => {
        //                 var modal = document.getElementById("myModal");

        //                 // Get the image and insert it inside the modal - use its "alt" text as a caption
        //                 var img = document.getElementById("myImg");
        //                 var modalImg = document.getElementById("img01");
        //                 var captionText = document.getElementById("caption");
        //                 img.onclick = function(){
        //                 modal.style.display = "block";
        //                 modalImg.src = this.src;
        //                 captionText.innerHTML = this.alt;
        //                 }

        //                 // Get the <span> element that closes the modal
        //                 var span = document.getElementsByClassName("close")[0];

        //                 // When the user clicks on <span> (x), close the modal
        //                 span.onclick = function() {
        //                 modal.style.display = "none";
        //                 }
        //             }}/></center>
        //             <div id="myModal" class="modal">
        //                 <span class="close">&times;</span>
        //                 <img class="modal-content" id="img01"/>
        //                 <div id="caption"></div>
        //             </div>
        //             <br></br>
        //                  <center><OrgInfoCard orgName={"PlaceHolder Name"} orgImageUrl={null}></OrgInfoCard></center>
        //         </div>
        //         <div class="right-container1">
        //             <h1 class="event-name"> {event.title} </h1>
        //             <div class="icon-and-txt">
        //                 <LocationOnIcon class="icon"/>
        //                 <h6>{event.location}</h6>
        //             </div>
        //             <div class="icon-and-txt">
        //                 <AccessTimeIcon class="icon"/>
        //                 <h6>{event.startTime}</h6>
        //             </div>
        //             <br/>
        //             <div><center>
        //             <Button className="info-btns" variant="contained">Get Directions</Button>&nbsp;
        //             <Button className="info-btns" variant="contained">Stream Link</Button>&nbsp;
       //             <Button className="info-btns" variant="contained">Add to Calendar</Button>
        //             </center></div>
        //             <br></br>
        //             <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description</h6>
        //             <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{event.description} </p>
        //             <div class="event=tags">
        //                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button class="tag">tag 1</Button>
        //                 <Button class="tag">tag 2</Button>
        //                 <Button class="tag">tag 3</Button>
        //             </div>

        //         </div>
        //     </div>
        // </div> 
        <div>
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"/>
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"/>
        
        
        <section class="relative pt-16 bg-white-50"/>
            <div class="container mx-auto">
                <div class="flex flex-wrap items-center">
                    <div class="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-500">
                            <img id="myImg" src={flyer_icon} alt="event flyer" onClick={() => {
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
                        </div>
                        <div class="px-6 pt-4 pb-2">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                        </div>
                    </div>
                    <div class="md:w-6/12">
                    <p class="text-6x1 text-black font-bold">{event.title}</p>
                    <div class="w-full md:w-3/5 text-left p-6 md:p-4 space-y-2">
                        {/* <p class="text-6xl text-black font-bold">Dany Bailey</p> */}
                        <List>
                            <ListItem>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <LocationOnIcon />
                                </ListItemIcon>
                                <ListItemText primary={event.location} />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemIcon>
                                    <AccessTimeIcon />
                                </ListItemIcon>
                                {/* return(<View> {Moment(startTime).format('d MMM')} </View>) */}
                                <ListItemText primary={`${Moment(event.startTime).format('d MMM, hh:mm A')} - ${Moment(event.endTime).format('hh:mm A')}`}/>
                            </ListItem>
                        </List>
                        <p class="text-base leading-relaxed text-gray-500 font-normal">{event.description}</p>
                        <br/> 
                          <div><borderLeft>
                            <Button style={{backgroundColor: '#E4B1A8'}} className="info-btns" variant="contained">Get Directions</Button>&nbsp;
                            <Button style={{backgroundColor: '#E4B1A8'}} className="info-btns" variant="contained">Stream Link</Button>&nbsp;
                            <Button style={{backgroundColor: '#E4B1A8'}} className="info-btns" variant="contained">Add to Calendar</Button>
                     </borderLeft></div>
                     <br/> <br/> <br/>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    )
}