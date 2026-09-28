import React, { useEffect } from 'react';

import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import {
    fetchIdeas
} from '../redux/slices/ideaSlice';

import IdeaCard from '../components/IdeaCard';


function Important() {

    const dispatch = useDispatch();

    const {
        ideas
    } = useSelector(
        state => state.idea
    );


    useEffect(() => {

        dispatch(
            fetchIdeas()
        );

    }, [dispatch]);


    const importantIdeas =
        ideas.filter(
            idea =>
                idea.important === true
        );


    return (

        <Container className="page-container">

            <div className="page-heading">

                <h2>
                    Important Ideas
                </h2>

                <p>
                    Ideas that you have marked
                    as important.
                </p>

            </div>


            {importantIdeas.length > 0 ? (

                <Row className="g-4">

                    {importantIdeas.map(
                        idea => (

                            <Col
                                key={idea.id}
                                xs={12}
                                md={6}
                                lg={4}
                            >

                                <IdeaCard
                                    idea={idea}
                                />

                            </Col>

                        )
                    )}

                </Row>

            ) : (

                <div className="empty-state text-center">

                    <div
                        style={{
                            fontSize: '35px',
                            color: '#d8e8dd'
                        }}
                    >
                        !
                    </div>

                    <h4>
                        No Important Ideas
                    </h4>

                    <p>
                        Mark an idea as important
                        to see it here.
                    </p>

                </div>

            )}

        </Container>

    );

}


export default Important;