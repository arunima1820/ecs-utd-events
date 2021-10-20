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
				<h1>Sign Up</h1>
				<div class="field">
					<label for="name">Name:</label>
					<input type="text" id="name" name="name" placeholder="Enter your fullname" />
					<small></small>
				</div>
				<div class="field">
					<label for="email">Email:</label>
					<input type="text" id="email" name="email" placeholder="Enter your email address" />
					<small></small>
				</div>
				<div class="field">
					<button type="submit" class="full">Subscribe</button>
				</div>
			</form>
		</div>
		<script src="js/app.js"></script>
	</body>
</html>






  )
    

}
