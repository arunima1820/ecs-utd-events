import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/esm/Spinner';
import { ReactComponent as ECSLogo } from '../assets/utd-ecs-logo-clipped.svg';
import {
  Link
} from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react'
import ReactTooltip from 'react-tooltip';


export default function NewOrgConfirmation(){
    
    return(
        <Container>
                    <Row>
                        <Col>
                            <Card className="pt-3">
                                <Card.Header className="card-header-no-border"></Card.Header>
                                <Card.Body className="pt-3 mx-2">
        <html lang="en">
        <head>
        
            <title>JavaScript Form Demo</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="css/style.css" />
        </head>
        <body>
            <div class="container">
            <div class="field"><center>
                <form action="signup.html" method="post" id="signup">
                    <h1>Thanks for signing up!</h1>
                    <p>Our team will get back to you shortly</p>
                    
                </form>
                </center></div>
            </div>
            <script src="js/app.js"></script>
        </body>
    </html>
    </Card.Body>
    <Col className="d-flex align-items-center justify-content-center py-5" xs={{ order: 'first' }} md={{ order: 'last' }}>
                            <Link to="/">
                                <ECSLogo />
                            </Link>
                        </Col>

                            </Card>
                            
                        </Col>
                        
                    </Row>
                </Container>

  ) 

}