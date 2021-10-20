import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
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
		<div class="container">
			<form action="signup.html" method="post" id="signup">
				<h1>Organization Sign Up</h1>
				<div class="field">
					<label for="name">Email Address:</label>
					<input type="text" id="email" name="email" placeholder="Enter " />
					
					<small></small>
				</div>
				<div class="field">
					<label for="email">Position:</label>
					<input type="text" id="position" name="position" placeholder="Enter " />
					<small></small>
				</div>
				<div class="field">
					<label for="email">Organization Email:</label>
					<input type="text" id="orgemail" name="orgemail" placeholder="Enter " />
					<small></small>
				</div>
				<div class="field">
					<label for="email">Organization Name:</label>
					<input type="text" id="orgname" name="orgname" placeholder="Enter " />
					<small></small>
				</div>
				<div class="field">
					<label for="email">Short Name:</label>
					<input type="text" id="shortname" name="shortname" placeholder="Enter " />
					<small></small>
				</div>
				<div class="field">
					<label for="email">Link for Org Website:</label>
					<input type="text" id="link" name="link" placeholder="Enter " />
					<small></small>
				</div>
				<div class="field">
					<label for="email">Logo URL link:</label>
					<input type="text" id="logo" name="logo" placeholder="Enter " />
					<small></small>
				</div>
				<div class="field">
					<label for="email">Social Media Links:</label>
					<input type="text" id="social" name="social" placeholder="Enter " />
					<small></small>
				</div>
				<div class="field">
					<label for="email">Description:</label>
					<input type="text" id="description" name="description" placeholder="Enter " />
					<small></small>
				</div>
				

				<div class="field">
				<Container>
                    <Row>
                        <Col>
					<button type="submit">Submit</button>
					<Link to="/new-org-confirmation" style={{ textAlign: 'center' }}> Submit</Link>
					</Col>
					</Row>
				</Container>
				</div>
			</form>
		</div>
		<script 
		
		src="js/app.js">
		
		</script>
	</body>
</html>




	)





  

 

}
