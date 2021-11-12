import React, { useState, useEffect } from "react"
import QuestionPage from "./components/QuestionPage"
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'


function App() {
 
 



  
  return (
     <div >
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">React-Survey</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#">Function1</Nav.Link>
      <Nav.Link eventKey={2} href="#">Function2</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link href="#">Function3</Nav.Link>
      <Nav.Link eventKey={2} href="#">Function4</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
      <div className="container">
        
      <QuestionPage/>
      </div>
      

        
     </div>
  








  )}
export default App;
