import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { ReactComponent as ECSLogo } from '../assets/utd-ecs-logo-clipped.svg';

import Spinner from 'react-bootstrap/esm/Spinner';
import {
    Link
} from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react'
import ReactTooltip from 'react-tooltip';

export default function NewOrgSignUp() {
    return (

        <html lang="en">
            <head>
                <title>JavaScript Form Demo</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="css/style.css" />
            </head>
            <body>
                <div className="background-accent">
                    <div class="container">
                        <form action="signup.html" method="post" id="signup">
                            <h1 className="font-weight-bold"><center>UTD Events Organization Sign Up Form</center></h1>
                            <p>Thanks for joining ecs-utdevents! After you submit this form our team will take a look at your information and confirm that you are an SOC-registered organization.Please enter your organization's information as it would show under SOC.
                                You will be able to edit this information in your profile later (EXCEPT for Organization Name).
                            </p>

                            <Card.Body className="pt-3 mx-3">
                                <div class="field"><center>
                                    <label for="name">Email Address:&nbsp;&nbsp;&nbsp;</label>
                                    <input type="text" id="email" name="email" placeholder="Enter " />
                                    <small></small>
                                </center></div>
                                <div class="field"><center>
                                    <label for="email">Position:&nbsp;&nbsp;&nbsp;</label>
                                    <input type="text" id="position" name="position" placeholder="Enter " />
                                    <small></small>
                                </center></div>
                                <div class="field"><center>
                                    <label for="email">Organization Email:&nbsp;&nbsp;&nbsp;</label>
                                    <input type="text" id="orgemail" name="orgemail" placeholder="Enter " />
                                    <small></small>
                                </center></div>
                                <div class="field"><center>
                                    <label for="email">Organization Name:&nbsp;&nbsp;&nbsp;</label>
                                    <input type="text" id="orgname" name="orgname" placeholder="Enter " />
                                    <small></small>
                                </center></div>
                                <div class="field"><center>
                                    <label for="email">Short Name(i.e. ACM, WWC):&nbsp;&nbsp;&nbsp;</label>
                                    <input type="text" id="shortname" name="shortname" placeholder="Enter " />
                                    <small></small>
                                </center></div>
                                <div class="field"><center>
                                    <label for="email">Link for Org Website:&nbsp;&nbsp;&nbsp;</label>
                                    <input type="text" id="link" name="link" placeholder="Enter " />
                                    <small></small>
                                </center></div>
                                <div class="field"><center>
                                    <label for="email">Logo URL link:&nbsp;&nbsp;&nbsp;</label>
                                    <input type="text" id="logo" name="logo" placeholder="Enter " />
                                    <small></small>
                                </center></div>
                                <div class="field"><center>
                                    <label for="email">Social Media Links:&nbsp;&nbsp;&nbsp;</label>
                                    <input type="text" id="social" name="social" placeholder="Enter " />
                                    <small></small>
                                </center></div>
                                <div class="field"><center>
                                    <label for="email">Organization Description:&nbsp;&nbsp;&nbsp;</label>
                                    <input type="text" id="description" name="description" placeholder="Enter " />
                                    <small></small>
                                </center></div>
                                <div class="field"><center>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Link to="/new-org-confirmation" style={{ textAlign: 'center' }}> Submit</Link>
                                            </Col>
                                        </Row>
                                    </Container>
                                </center></div>

                            </Card.Body>
                            <Col className="d-flex align-items-center justify-content-center py-5" xs={{ order: 'first' }} md={{ order: 'last' }}>
                                <Link to="/">
                                    <ECSLogo />
                                </Link>
                            </Col>
                        </form>
                    </div>
                </div>
                <script
                    src="js/app.js">
                </script>
            </body>
        </html>)
}