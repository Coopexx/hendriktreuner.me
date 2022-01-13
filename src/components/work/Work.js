import classes from './Work.module.scss';
import Project from './Project';
import { v4 as uuid } from 'uuid';

const Work = () => {
    const projects = [
        {
            name: 'Food Order App',
            description: [
                'Friday night and nothing to eat? No worries. Order food with the convenience of a finger press',
            ],
            technology: ['react', 'sass'],
            button: ['source', 'visit'],
            link: [
                'https://github.com/Coopexx/food-order-app',
                'https://hendriktreuner.me/food-order-app',
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

        {
            name: 'Weather App',
            description: [
                'A simple weather app that displays the current weather and a weekly forecast',
            ],
            technology: ['html', 'react', 'css'],
            button: ['source', 'visit'],
            link: [
                'https://github.com/Coopexx/weather-app',
                'https://hendriktreuner.me/weather-app',
            ],
        },
        {
            name: 'Portfolio Manager',
            description: [
                'Track your expenses and assets easily and get an overview by visualizing your data',
            ],
            technology: ['react', 'sass'],
            button: ['source', 'visit'],
            link: [
                'https://github.com/Coopexx/portfolio-manager',
                'https://hendriktreuner.me/portfolio-manager',
            ],
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
