import React from 'react';

import {
    Card,
    Badge,
    Button
} from 'react-bootstrap';

import {
    Link
} from 'react-router-dom';

import {
    useDispatch
} from 'react-redux';

import {
    updateIdea,
    deleteIdea
} from '../redux/slices/ideaSlice';


function IdeaCard({ idea }) {

    const dispatch = useDispatch();


    const completedSteps =
        idea.steps?.filter(
            step => step.completed
        ).length || 0;


    const totalSteps =
        idea.steps?.length || 0;


    const progress =
        totalSteps > 0
            ? Math.round(
                (completedSteps / totalSteps) * 100
            )
            : 0;


    const handleDelete = () => {

        const confirmDelete =
            window.confirm(
                'Are you sure you want to delete this idea?'
            );


        if (confirmDelete) {

            dispatch(
                deleteIdea(idea.id)
            );

        }

    };

const handleImportant = () => {
    dispatch(
        updateIdea({
            ...idea,
            important: !idea.important
        })
    );
};
    

    return (

        <Card className="idea-card h-100">

            <Card.Body>

                <div className="idea-card-top">

                    <Badge className="category-badge">
                        {idea.category}
                    </Badge>


                   <button
    className="important-button"
    onClick={handleImportant}
    title={
        idea.important
            ? 'Remove from important'
            : 'Mark as important'
    }
>
    {idea.important ? '!' : '○'}
</button>
                </div>


                <Badge
                    bg={
                        idea.status === 'Completed'
                            ? 'success'
                            : idea.status === 'Building'
                                ? 'primary'
                                : 'warning'
                    }
                    className="mt-3"
                >
                    {idea.status}
                </Badge>


                <Card.Title className="idea-title mt-3">

                    {idea.title}

                </Card.Title>


                <Card.Text className="idea-description">

                    {idea.description}

                </Card.Text>


                {/* TECHNOLOGIES */}

                {idea.technologies?.length > 0 && (

                    <div className="technology-list">

                        {idea.technologies.map(
                            technology => (

                                <span
                                    key={technology}
                                    className="technology-tag"
                                >
                                    {technology}
                                </span>

                            )
                        )}

                    </div>

                )}


                {/* PROGRESS */}

                <div className="mt-4">

                    <div className="d-flex justify-content-between">

                        <small>
                            Development Progress
                        </small>

                        <small>
                            {progress}%
                        </small>

                    </div>


                    <div className="progress mt-2">

                        <div
                            className="progress-bar"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>


                    <small>
                        {completedSteps} of {totalSteps}
                        {' '}steps completed
                    </small>

                </div>


                {/* BUTTONS */}

                <div className="card-actions mt-4">

                    <Link
                        to={`/idea/${idea.id}`}
                        className="btn btn-dark"
                    >
                        View
                    </Link>


                    <Link
                        to={`/edit/${idea.id}`}
                        className="btn btn-outline-dark"
                    >
                        Edit
                    </Link>


                    <Button
                        variant="outline-danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>

                </div>

            </Card.Body>

        </Card>

    );

}

export default IdeaCard;