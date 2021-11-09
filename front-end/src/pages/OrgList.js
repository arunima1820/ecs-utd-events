import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import FooterComponent from '../components/FooterComponent';
import {
    Link
} from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react'
import ReactTooltip from 'react-tooltip';
import OrgInfoCard from '../components/OrgInfoCard'
import NavbarComponent from '../components/NavbarComponent';
import { AllOrgContext } from '../providers/AllOrgProvider';
import SearchBar from '../components/SearchBar'
import { apiProvider } from '../providers/Provider';

/* Randomize array in-place using Durstenfeld shuffle algorithm. We use this
to randomize the order of presented organizations. 
See: https://researchonresearch.blog/2018/11/28/theres-lots-in-a-name/ for bias in 
alphabetical ordering. */
function shuffleArray(array) {
    var newArr = array;
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

export default function OrgList() {
    const organizations = useContext(AllOrgContext);
    //const [organizations, setOrgs] = useState([])

    return (
        <div className="App">
            <NavbarComponent page='Home' />
            <div className="background">
                <h1 className="font-weight-bold" style={{ display: "inline" }}>Organizations</h1>
                <h3 style={{ display: "inline", verticalAlign: "2px", color: "var(--gray3)" }}
                    data-tip="Randomized ordering. See <a target=&quot _blank &quot href=https://researchonresearch.blog/2018/11/28/theres-lots-in-a-name/>here</a> for the dangers of alphabetical order."
                    className="font-weight-bold"> ⓘ</h3>
                {/* backgroundColor = var(--primary4) from App.css. */}
                <ReactTooltip backgroundColor="#D8E2DC" textColor="black" clickable={true} delayHide={500} effect="solid" offset={{ top: 0 }} html={true} />
                <Container fluid style={{ paddingLeft: "5.5vw", paddingRight: "5.5vw" }}>
                    <Row style={{ paddingBottom: "3.5vw", paddingTop: "3.5vw" }}>
                        <Col md={3}>
                        </Col>
                        <Col md={6}>
                            <SearchBar />
                        </Col>
                    </Row>
                    <Row>
                        {
                            shuffleArray(organizations).map(org => {
                                return (
                                    <Col md={4} key={org.slug} className='align-items-stretch'>
                                        <Container style={{ paddingTop: 20 }}>
                                            <Link to={`org/${org.slug}`} style={{ textDecoration: 'none' }}>
                                                <OrgInfoCard orgName={org.name} orgImageUrl={org.imageUrl} />
                                            </Link>
                                        </Container>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </Container>
            </div>
            <FooterComponent page='Home' />
        </div >
    )
}
