import React, { useEffect } from 'react';

import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import {
    fetchIdeas
} from '../redux/slices/ideaSlice';

import {
    Link
} from 'react-router-dom';


function Dashboard() {

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


    /* =========================
       STATISTICS
    ========================== */

    const totalIdeas =
        ideas.length;


    const completedIdeas =
        ideas.filter(
            idea =>
                idea.status === 'Completed'
        ).length;


    const buildingIdeas =
        ideas.filter(
            idea =>
                idea.status === 'Building'
        ).length;


    const planningIdeas =
        ideas.filter(
            idea =>
                idea.status === 'Planning'
        ).length;


    const importantIdeas =
        ideas.filter(
            idea =>
                idea.important === true
        ).length;


    return (

        <Container
            fluid
            className="page-container"
        >

            <Container>

                {/* =========================
                    HERO SECTION
                ========================== */}

                <div className="dashboard-hero">

                    <Row className="g-0">

                        {/* HERO TEXT */}

                        <Col lg={6}>

                            <div className="dashboard-hero-content">

                                <h1>
                                    Turn Your Ideas Into{' '}
                                    <span>
                                        Reality
                                    </span>
                                </h1>

                                <p>
                                    Capture, organize and
                                    track your projects
                                    from idea to completion.
                                    IdeaVault helps you turn
                                    your vision into real
                                    projects.
                                </p>


                                <div className="hero-actions">

                                    <Link
                                        to="/add"
                                        className="hero-add-btn"
                                    >
                                        + Add New Idea
                                    </Link>


                                    <Link
                                        to="/ideas"
                                        className="hero-secondary-btn"
                                    >
                                        View My Ideas →
                                    </Link>

                                </div>

                            </div>

                        </Col>


                        {/* HERO IMAGE */}

                        <Col lg={6}>

                            <div className="dashboard-image-wrapper">

                                <img
                                    src="/ideavault-dashboard.png"
                                    alt="IdeaVault workspace"
                                    className="dashboard-image"
                                />

                                <div className="dashboard-image-overlay"></div>

                            </div>

                        </Col>

                    </Row>

                </div>


                {/* =========================
                    PROGRESS HEADER
                ========================== */}

                <div className="section-header">

                    <h3>
                        Your Progress
                    </h3>


                    <Link to="/ideas">
                        View All →
                    </Link>

                </div>


                {/* =========================
                    STAT CARDS
                ========================== */}

                <Row className="g-3">


                    {/* TOTAL IDEAS */}

                    <Col
                        xs={6}
                        md={3}
                    >

                        <Card className="stat-card">

                            <Card.Body>

                                <div className="stat-icon">
                                    💡
                                </div>

                                <h6>
                                    Total Ideas
                                </h6>

                                <h2>
                                    {totalIdeas}
                                </h2>

                            </Card.Body>

                        </Card>

                    </Col>


                    {/* IN PROGRESS */}

                    <Col
                        xs={6}
                        md={3}
                    >

                        <Card className="stat-card">

                            <Card.Body>

                                <div className="stat-icon">
                                    ◷
                                </div>

                                <h6>
                                    In Progress
                                </h6>

                                <h2>
                                    {buildingIdeas}
                                </h2>

                            </Card.Body>

                        </Card>

                    </Col>


                    {/* COMPLETED */}

                    <Col
                        xs={6}
                        md={3}
                    >

                        <Card className="stat-card">

                            <Card.Body>

                                <div className="stat-icon">
                                    ✓
                                </div>

                                <h6>
                                    Completed
                                </h6>

                                <h2>
                                    {completedIdeas}
                                </h2>

                            </Card.Body>

                        </Card>

                    </Col>


                    {/* IMPORTANT */}

                    <Col
                        xs={6}
                        md={3}
                    >

                        <Card className="stat-card">

                            <Card.Body>

                                <div className="stat-icon">
                                    !
                                </div>

                                <h6>
                                    Important
                                </h6>

                                <h2>
                                    {importantIdeas}
                                </h2>

                            </Card.Body>

                        </Card>

                    </Col>


                </Row>


                {/* =========================
                    PLANNING & DEVELOPMENT
                ========================== */}

                <Row className="g-3 mt-4">


                    {/* PLANNING */}

                    <Col md={6}>

                        <Card className="stat-card">

                            <Card.Body>

                                <h6>
                                    Planning
                                </h6>

                                <h2>
                                    {planningIdeas}
                                </h2>

                                <p
                                    style={{
                                        color: '#747c76',
                                        fontSize: '13px',
                                        marginTop: '8px'
                                    }}
                                >
                                    Ideas that are
                                    waiting to be developed.
                                </p>

                            </Card.Body>

                        </Card>

                    </Col>


                    {/* DEVELOPMENT */}

                    <Col md={6}>

                        <Card className="stat-card">

                            <Card.Body>

                                <h6>
                                    Development
                                </h6>

                                <h2>
                                    {buildingIdeas}
                                </h2>

                                <p
                                    style={{
                                        color: '#747c76',
                                        fontSize: '13px',
                                        marginTop: '8px'
                                    }}
                                >
                                    Ideas currently being
                                    built and improved.
                                </p>

                            </Card.Body>

                        </Card>

                    </Col>


                </Row>


            </Container>

        </Container>

    );

}


export default Dashboard;