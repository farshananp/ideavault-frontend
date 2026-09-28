import React, {
    useEffect
} from 'react';

import {
    Container,
    Button,
    Badge
} from 'react-bootstrap';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import {
    fetchIdeas,
    deleteIdea
} from '../redux/slices/ideaSlice';

import {
    useNavigate,
    useParams
} from 'react-router-dom';

import jsPDF from 'jspdf';


function IdeaDetails() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const { ideas } = useSelector(
        state => state.idea
    );


    useEffect(() => {

        if (ideas.length === 0) {

            dispatch(
                fetchIdeas()
            );

        }

    }, [dispatch, ideas.length]);


    const idea =
        ideas.find(
            item =>
                String(item.id) === String(id)
        );


    /* PROGRESS */

    const completedSteps =
        idea?.steps?.filter(
            step => step.completed
        ).length || 0;


    const totalSteps =
        idea?.steps?.length || 0;


    const progress =
        totalSteps > 0

            ? Math.round(
                (completedSteps / totalSteps) * 100
            )

            : 0;


    /* DELETE */

    const handleDelete = () => {

        const confirmDelete =
            window.confirm(
                'Are you sure you want to delete this idea?'
            );


        if (confirmDelete) {

            dispatch(
                deleteIdea(id)
            );

            navigate('/ideas');

        }

    };


    /* EXPORT PDF */

    const handleExportPDF = () => {

        if (!idea) {
            return;
        }


        const doc = new jsPDF();


        doc.setFontSize(20);

        doc.text(
            'IdeaVault - Idea Details',
            20,
            20
        );


        doc.setFontSize(13);


        doc.text(
            `Title: ${idea.title}`,
            20,
            40
        );


        doc.text(
            `Category: ${idea.category}`,
            20,
            50
        );


        doc.text(
            `Priority: ${idea.priority}`,
            20,
            60
        );


        doc.text(
            `Status: ${idea.status}`,
            20,
            70
        );


        doc.text(
            `Progress: ${progress}%`,
            20,
            80
        );


        doc.text(
            'Description:',
            20,
            95
        );


        const descriptionLines =
            doc.splitTextToSize(
                idea.description || '',
                170
            );


        doc.text(
            descriptionLines,
            20,
            105
        );


        let y =
            105 +
            descriptionLines.length * 7;


        doc.text(
            'Development Steps:',
            20,
            y + 15
        );


        idea.steps?.forEach(
            (step, index) => {

                doc.text(
                    `${index + 1}. ${
                        step.completed
                            ? '[Completed]'
                            : '[Pending]'
                    } ${step.title}`,
                    20,
                    y + 25 + index * 8
                );

            }
        );


        doc.save(
            `${idea.title}.pdf`
        );

    };


    /* SHARE */

    const handleShare = async () => {

        if (!idea) {
            return;
        }


        const shareText =

`Idea: ${idea.title}

Category: ${idea.category}

Priority: ${idea.priority}

Status: ${idea.status}

Progress: ${progress}%

Description:
${idea.description || ''}

Development Steps:
${idea.steps
    ?.map(
        (step, index) =>
            `${index + 1}. ${
                step.completed
                    ? '✓'
                    : '○'
            } ${step.title}`
    )
    .join('\n')}`;


        try {

            if (navigator.share) {

                await navigator.share({

                    title: idea.title,

                    text: shareText

                });

            } else {

                await navigator.clipboard.writeText(
                    shareText
                );

                alert(
                    'Idea details copied to clipboard.'
                );

            }

        } catch {

            console.log(
                'Share cancelled'
            );

        }

    };


    if (!idea) {

        return (

            <Container
                className="page-container text-center"
            >

                <h3>
                    Idea not found
                </h3>

                <Button
                    variant="dark"
                    onClick={() =>
                        navigate('/ideas')
                    }
                >
                    Back to Ideas
                </Button>

            </Container>

        );

    }


    return (

        <Container className="page-container">

            <div className="details-container">


                {/* CATEGORY */}

                <Badge className="category-badge">

                    {idea.category}

                </Badge>


                {/* STATUS */}

                <Badge
                    bg={
                        idea.status === 'Completed'
                            ? 'success'
                            : idea.status === 'Building'
                                ? 'primary'
                                : 'warning'
                    }
                    className="ms-2"
                >

                    {idea.status}

                </Badge>


                {/* TITLE */}

                <h1 className="mt-3">

                    {idea.title}

                </h1>


                {/* PRIORITY */}

                <p>

                    <strong>
                        Priority:
                    </strong>{' '}

                    {idea.priority}

                </p>


                {/* DESCRIPTION */}

                <div className="mt-4">

                    <h5>
                        Description
                    </h5>

                    <p>
                        {idea.description}
                    </p>

                </div>


                {/* TECHNOLOGIES */}

                <div className="mt-4">

                    <h5>
                        Technologies
                    </h5>


                    <div className="technology-list">

                        {
                            idea.technologies?.map(
                                (technology, index) => (

                                    <span
                                        key={index}
                                        className="technology-tag"
                                    >
                                        {technology}
                                    </span>

                                )
                            )
                        }

                    </div>

                </div>


                {/* PROGRESS */}

                <div className="mt-4">

                    <div className="d-flex justify-content-between">

                        <h5>
                            Development Progress
                        </h5>

                        <strong>
                            {progress}%
                        </strong>

                    </div>


                    <div className="progress mt-2">

                        <div
                            className="progress-bar"
                            style={{
                                width:
                                    `${progress}%`
                            }}
                        />

                    </div>


                    <small className="text-muted">

                        {completedSteps} of {totalSteps} steps completed

                    </small>

                </div>


                {/* STEPS */}

                <div className="mt-4">

                    <h5>
                        Development Steps
                    </h5>


                    <div className="steps-container">

                        {
                            idea.steps?.map(
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

                                        <span className="step-icon">

                                            {
                                                step.completed
                                                    ? '✓'
                                                    : '○'
                                            }

                                        </span>


                                        <span>

                                            {index + 1}. {step.title}

                                        </span>

                                    </div>

                                )
                            )
                        }

                    </div>

                </div>


                {/* BUTTONS */}

                <div className="mt-4 d-flex gap-2 flex-wrap">

                    <Button
                        variant="dark"
                        onClick={() =>
                            navigate(
                                `/edit/${idea.id}`
                            )
                        }
                    >
                        Edit
                    </Button>


                    <Button
                        variant="outline-danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>


                    <Button
                        variant="outline-dark"
                        onClick={handleExportPDF}
                    >
                        Export PDF
                    </Button>


                    <Button
                        variant="outline-dark"
                        onClick={handleShare}
                    >
                        Share Idea
                    </Button>


                    <Button
                        variant="outline-secondary"
                        onClick={() =>
                            navigate('/ideas')
                        }
                    >
                        Back
                    </Button>

                </div>

            </div>

        </Container>

    );

}

export default IdeaDetails;