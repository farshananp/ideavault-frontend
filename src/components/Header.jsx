import React from 'react';

import {
    Navbar,
    Container,
    Nav
} from 'react-bootstrap';

import {
    Link
} from 'react-router-dom';


function Header() {

    return (

        <Navbar
            expand="lg"
            className="main-navbar"
        >

            <Container>

                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="brand"
                >
                    ✦ IdeaVault
                </Navbar.Brand>


                <Navbar.Toggle
                    aria-controls="main-navbar"
                />


                <Navbar.Collapse id="main-navbar">

                    <Nav className="ms-auto">

                        <Nav.Link
                            as={Link}
                            to="/"
                        >
                            Dashboard
                        </Nav.Link>


                        <Nav.Link
                            as={Link}
                            to="/ideas"
                        >
                            My Ideas
                        </Nav.Link>


                      <Nav.Link
    as={Link}
    to="/important"
>
    ! Important
</Nav.Link>

                        <Link
                            to="/add"
                            className="btn btn-dark add-btn"
                        >
                            + New Idea
                        </Link>

                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );
}

export default Header;