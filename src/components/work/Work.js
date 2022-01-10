import classes from './Work.module.scss';
import Project from './Project';

const Work = () => {
    return (
        <section className={classes.work}>
            <Project />
        </section>
    );
};

export default Work;
