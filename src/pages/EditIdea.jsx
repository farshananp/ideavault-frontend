import React, {
    useEffect,
    useState
} from 'react';

import {
    Container,
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import {
    fetchIdeas,
    updateIdea
} from '../redux/slices/ideaSlice';

import {
    useNavigate,
    useParams
} from 'react-router-dom';

import {
    defaultSteps
} from '../data/appSteps';

import {
    technologyOptions
} from '../data/technologies';


function EditIdea() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const { ideas } =
        useSelector(
            state => state.idea
        );


    const [title, setTitle] =
        useState('');


    const [category, setCategory] =
        useState('');


    const [priority, setPriority] =
        useState('Medium');


    const [status, setStatus] =
        useState('Planning');


    const [description, setDescription] =
        useState('');


    const [technologies, setTechnologies] =
        useState([]);


    const [steps, setSteps] =
        useState([]);


    useEffect(() => {

        if (ideas.length === 0) {

            dispatch(
                fetchIdeas()
            );

        }

    }, [
        dispatch,
        ideas.length
    ]);


    useEffect(() => {

        const existingIdea =
            ideas.find(
                idea =>
                    String(idea.id) ===
                    String(id)
            );


        if (existingIdea) {

            setTitle(
                existingIdea.title || ''
            );


            setCategory(
                existingIdea.category || ''
            );


            setPriority(
                existingIdea.priority ||
                'Medium'
            );


            setStatus(
                existingIdea.status ||
                'Planning'
            );


            setDescription(
                existingIdea.description ||
                ''
            );


            const savedTechnologies =
                Array.isArray(
                    existingIdea.technologies
                )
                    ? existingIdea.technologies
                    : [];


            setTechnologies(
                savedTechnologies
            );


            setSteps(
                existingIdea.steps &&
                existingIdea.steps.length > 0

                    ? existingIdea.steps

                    : defaultSteps.map(
                        step => ({
                            ...step
                        })
                    )
            );

        }

    }, [
        ideas,
        id
    ]);


    const handleTechnologyChange = (
        technology,
        checked
    ) => {

        if (checked) {

            setTechnologies([
                ...technologies,
                technology
            ]);

        } else {

            setTechnologies(
                technologies.filter(
                    item =>
                        item !== technology
                )
            );

        }

    };


    const handleStepChange = (
        stepId
    ) => {

        const updatedSteps =
            steps.map(step =>
                step.id === stepId

                    ? {
                        ...step,
                        completed:
                            !step.completed
                    }

                    : step
            );


        setSteps(
            updatedSteps
        );

    };


    const handleSubmit = (e) => {

        e.preventDefault();


        const existingIdea =
            ideas.find(
                idea =>
                    String(idea.id) ===
                    String(id)
            );


        if (!existingIdea) {
            return;
        }


        const updatedIdea = {

            ...existingIdea,

            title,

            category,

            priority,

            status,

            description,

            technologies,

            steps

        };


        dispatch(
            updateIdea(
                updatedIdea
            )
        );


        navigate('/ideas');

    };


    return (

        <Container className="page-container">

            <div className="form-container">

                <h2>
                    Edit Idea
                </h2>

                <p>
                    Update your idea and track your
                    development progress.
                </p>


                <Form onSubmit={handleSubmit}>

                    {/* TITLE */}

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Idea Title
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </Form.Group>


                    {/* CATEGORY + PRIORITY */}

                    <Row>

                        <Col md={6}>

                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Category
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </Form.Group>

                        </Col>


                        <Col md={6}>

                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Priority
                                </Form.Label>

                                <Form.Select
                                    value={priority}
                                    onChange={(e) =>
                                        setPriority(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="Low">
                                        Low
                                    </option>

                                    <option value="Medium">
                                        Medium
                                    </option>

                                    <option value="High">
                                        High
                                    </option>

                                </Form.Select>

                            </Form.Group>

                        </Col>

                    </Row>


                    {/* STATUS */}

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Status
                        </Form.Label>

                        <Form.Select
                            value={status}
                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
                            }
                        >

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

                    </Form.Group>


                    {/* DESCRIPTION */}

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Description
                        </Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </Form.Group>


                    {/* TECHNOLOGIES */}

                    <Form.Group className="mb-4">

                        <Form.Label>
                            Technologies
                        </Form.Label>


                        <div className="technology-options">

                            {technologyOptions.map(
                                technology => (

                                    <Form.Check
                                        key={technology}
                                        type="checkbox"
                                        label={technology}
                                        checked={
                                            technologies.includes(
                                                technology
                                            )
                                        }
                                        onChange={(e) =>
                                            handleTechnologyChange(
                                                technology,
                                                e.target.checked
                                            )
                                        }
                                    />

                                )
                            )}

                        </div>


                        <Form.Text>
                            Select all technologies used
                            in your project.
                        </Form.Text>

                    </Form.Group>


                    {/* DEVELOPMENT STEPS */}

                    <div className="development-steps">

                        <div className="steps-header">

                            <h5>
                                Development Progress
                            </h5>

                            <p>
                                Mark each step when you
                                complete it.
                            </p>

                        </div>


                        <div className="steps-list">

                            {steps.map(
                                (step, index) => (

                                    <div
                                        key={step.id}
                                        className={
                                            `step-item ${
                                                step.completed
                                                    ? 'completed-step'
                                                    : ''
                                            }`
                                        }
                                    >

                                        <Form.Check
                                            type="checkbox"
                                            id={`step-${step.id}`}
                                            checked={
                                                step.completed
                                            }
                                            onChange={() =>
                                                handleStepChange(
                                                    step.id
                                                )
                                            }
                                            label={
                                                `${index + 1}. ${step.title}`
                                            }
                                        />

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* BUTTONS */}

                    <div className="mt-4">

                        <Button
                            type="submit"
                            variant="dark"
                        >
                            Update Idea
                        </Button>


                        <Button
                            type="button"
                            variant="outline-secondary"
                            className="ms-2"
                            onClick={() =>
                                navigate('/ideas')
                            }
                        >
                            Cancel
                        </Button>

                    </div>

                </Form>

            </div>

        </Container>

    );

}

export default EditIdea;