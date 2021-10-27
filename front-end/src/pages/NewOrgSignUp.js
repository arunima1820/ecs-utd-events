import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/esm/Spinner';
import {
  Link
} from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react'
import ReactTooltip from 'react-tooltip';
export default function NewOrgSignUp(){
    return(
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
                <h1 className="font-weight-bold"><center>Organization Sign Up</center></h1>
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
                    <label for="email">Short Name:&nbsp;&nbsp;&nbsp;</label>
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
                    <label for="email">Description:&nbsp;&nbsp;&nbsp;</label>
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
            </form>
        </div>
        </div>
        <script 
        src="js/app.js">
        </script>
    </body>
</html>)}