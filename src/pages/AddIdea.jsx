import React, { useState } from 'react';

import {
    Container,
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap';

import { useDispatch } from 'react-redux';

import { addIdea } from '../redux/slices/ideaSlice';

import { useNavigate } from 'react-router-dom';

import { defaultSteps } from '../data/appSteps';

import { technologyOptions } from '../data/technologies';

import {
    generateIdeaData
} from '../utils/generateIdeaData';

function AddIdea() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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


    /* =========================
       TECHNOLOGY SELECTION
    ========================== */

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


    /* =========================
       REGENERATE DESCRIPTION
    ========================== */

    const handleRegenerate = () => {

        const generatedData =
            generateIdeaData(
                title,
                category,
                technologies
            );

        setDescription(
            generatedData.description
        );
    };


    /* =========================
       SAVE IDEA
    ========================== */

    const handleSubmit = (e) => {

        e.preventDefault();

        const newIdea = {

            title,

            category,

            priority,

            status,

            description,

            technologies,

            // Steps are saved automatically
            // but NOT displayed on this page
            steps: defaultSteps.map(
                step => ({
                    ...step
                })
            ),

            important: false
        };

        dispatch(
            addIdea(newIdea)
        );

        navigate('/ideas');
    };


    return (

        <Container
            className="page-container"
        >

            <div className="form-container">

                <h2>
                    Add New Idea
                </h2>

                <p>
                    Capture your idea and
                    start building it.
                </p>


                <Form
                    onSubmit={handleSubmit}
                >

                    {/* TITLE */}

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Idea Title
                        </Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Enter idea title"
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
                                    placeholder="Example: Education"
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

                        <div className="d-flex justify-content-between align-items-center mb-2">

                            <Form.Label className="mb-0">
                                Description
                            </Form.Label>

                            <Button
                                type="button"
                                className="regenerate-btn"
                                onClick={
                                    handleRegenerate
                                }
                            >
                                ↻ Regenerate Data
                            </Button>

                        </div>


                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Describe your idea"
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
                                        key={
                                            technology
                                        }
                                        type="checkbox"
                                        label={
                                            technology
                                        }
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
                            Select all technologies
                            used in your project.
                        </Form.Text>

                    </Form.Group>


                    {/* BUTTONS */}

                    <Button
                        type="submit"
                        variant="dark"
                    >
                        Save Idea
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

                </Form>

            </div>

        </Container>

    );
}

export default AddIdea;