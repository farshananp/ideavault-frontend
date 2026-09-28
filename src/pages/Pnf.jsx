import React from 'react';

import {
    Container
} from 'react-bootstrap';

import {
    Link
} from 'react-router-dom';


function Pnf() {

    return (

        <Container
            className="page-container text-center"
        >

            <div className="empty-state">

                <div className="empty-icon">
                    !
                </div>

                <h1 className="mt-4">
                    404
                </h1>

                <h3>
                    Page Not Found
                </h3>

                <p>
                    Sorry, the page you are looking
                    for does not exist.
                </p>


                <Link
                    to="/"
                    className="btn btn-dark mt-3"
                >
                    Back to Dashboard
                </Link>

            </div>

        </Container>

    );

}

export default Pnf;