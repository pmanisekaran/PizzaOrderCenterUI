import {Container, Nav, Navbar as NavBarBs} from "react-bootstrap"
import {NavLink} from "react-router-dom"

export function Navbar()
{
    return (
        <NavBarBs sticky="top" className="bg-white shadow-lg mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to ="/" as ={NavLink}>Home</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link to ="/pizza" as ={NavLink}>Pizza</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link to ="/admin" as ={NavLink}>Admin</Nav.Link>
                </Nav>
              
            </Container>
        </NavBarBs>
    )
}