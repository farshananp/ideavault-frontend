import React, {
    useEffect,
    useState
} from 'react';

import {
    Container,
    Row,
    Col,
    Form,
    Spinner
} from 'react-bootstrap';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import {
    fetchIdeas
} from '../redux/slices/ideaSlice';

import IdeaCard from '../components/IdeaCard';


function Ideas() {

    const dispatch = useDispatch();


    const {
        ideas,
        loading,
        error
    } = useSelector(
        state => state.idea
    );


    const [search, setSearch] =
        useState('');


    const [status, setStatus] =
        useState('All');


    useEffect(() => {

        dispatch(
            fetchIdeas()
        );

    }, [dispatch]);


    const filteredIdeas =
        ideas.filter(idea => {

            const searchText =
                search.toLowerCase();


            const technologyText =
                Array.isArray(
                    idea.technologies
                )
                    ? idea.technologies.join(' ')
                    : '';


            const matchesSearch =

                (idea.title || '')
                    .toLowerCase()
                    .includes(searchText)

                ||

                (idea.category || '')
                    .toLowerCase()
                    .includes(searchText)

                ||

                (idea.status || '')
                    .toLowerCase()
                    .includes(searchText)

                ||

                (idea.priority || '')
                    .toLowerCase()
                    .includes(searchText)

                ||

                technologyText
                    .toLowerCase()
                    .includes(searchText);


            const matchesStatus =
                status === 'All' ||
                idea.status === status;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    return (

        <Container className="page-container">

            <div className="page-heading">

                <h2>
                    My Ideas
                </h2>

                <p>
                    Manage and track your ideas.
                </p>

            </div>


            {/* SEARCH */}

            <Row className="mb-4">

                <Col
                    md={8}
                    className="mb-2 mb-md-0"
                >

                    <Form.Control
                        type="text"
                        placeholder="Search ideas, category, technology..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </Col>


                <Col md={4}>

                    <Form.Select
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Status
                        </option>

                        <option value="Planning">
                            Planning
                        </option>

                        <option value="Building">
                            Building
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                    </Form.Select>

                </Col>

            </Row>


            {/* LOADING */}

            {loading && (

                <div className="text-center">

                    <Spinner />

                </div>

            )}


            {/* ERROR */}

            {error && (

                <p className="text-danger">
                    {error}
                </p>

            )}


            {/* CARDS */}

            {!loading &&
                filteredIdeas.length > 0 && (

                    <Row className="g-4">

                        {filteredIdeas.map(
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

                )}


            {/* EMPTY */}

            {!loading &&
                filteredIdeas.length === 0 && (

                    <div className="empty-state text-center">

                        <h4>
                            No ideas found
                        </h4>

                        <p>
                            Try another search or add
                            a new idea.
                        </p>

                    </div>

                )}

        </Container>

    );

}

export default Ideas;