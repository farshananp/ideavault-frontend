import { defaultSteps } from '../data/appSteps';

export function generateIdeaData(
    title,
    category,
    technologies
) {
    const projectTitle =
        title.trim() || 'My New Project';

    const projectCategory =
        category.trim() || 'General';

    const techText =
        technologies.length > 0
            ? technologies.join(', ')
            : 'modern technologies';

    let description = '';

    if (
        projectCategory
            .toLowerCase()
            .includes('education')
    ) {
        description =
            `${projectTitle} is an education application designed to help users manage learning activities, organize information and track their progress. The application uses ${techText} to provide a responsive and user-friendly experience.`;
    }

    else if (
        projectCategory
            .toLowerCase()
            .includes('health')
    ) {
        description =
            `${projectTitle} is a health-focused application designed to help users manage useful health-related information and activities. The application uses ${techText} to provide a simple and responsive experience.`;
    }

    else if (
        projectCategory
            .toLowerCase()
            .includes('business')
    ) {
        description =
            `${projectTitle} is a business application designed to organize information, manage activities and improve productivity. The application is developed using ${techText}.`;
    }

    else {
        description =
            `${projectTitle} is a ${projectCategory.toLowerCase()} application designed to provide a useful solution for users. The project can be developed using ${techText}. It focuses on creating a simple, responsive and user-friendly experience.`;
    }

    const steps =
        defaultSteps.map(
            step => ({
                ...step,
                completed: false
            })
        );

    return {
        description,
        steps
    };
}