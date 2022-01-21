import classes from './Work.module.scss';
import Project from './Project';
import { v4 as uuid } from 'uuid';

const Work = () => {
    const projects = [
        {
            name: 'Foody',
            description: [
                'Order fresh home-made dishes easily from your sofa (Demo App)',
            ],
            technology: ['react', 'sass'],
            button: ['source', 'visit'],
            link: [
                'https://github.com/Coopexx/foody',
                'https://hendriktreuner.me/foody',
            ],
        },
        {
            name: 'Weather App',
            description: [
                `A simple weather app that won't leave you in the rain`,
            ],
            technology: ['html', 'javascript', 'css'],
            button: ['source', 'visit'],
            link: [
                'https://github.com/Coopexx/weather-app',
                'https://hendriktreuner.me/weather-app',
            ],
        },
        {
            name: 'Personal Website',
            description: [
                'Curious about how I build this website? Find the source files here',
            ],
            technology: ['react', 'sass'],
            button: ['source'],
            link: ['https://github.com/Coopexx/hendriktreuner.me'],
        },
    ];

    for (const project of projects) {
        project.id = uuid();
    }

    return (
        <section className={classes.work}>
            {projects.map((project) => {
                return <Project key={project.id} {...project} />;
            })}
        </section>
    );
};

export default Work;
