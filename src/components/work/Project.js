import classes from './Project.module.scss';
import icons from '../../images/sprite-work.svg';
import Button from './Button';

const Project = () => {
    return (
        <div className={classes.project}>
            <h3 className={classes['project__caption']}>Weather App</h3>
            <ul className={classes['project__technologies-container']}>
                <li className={classes['project__technology']}>
                    <svg className={classes['project__technology-svg']}>
                        <use href={`${icons}#html`} />
                    </svg>
                </li>

                <li className={classes['project__technology']}>
                    <svg className={classes['project__technology-svg']}>
                        <use href={`${icons}#javascript`} />
                    </svg>
                </li>
                <li className={classes['project__technology']}>
                    <svg className={classes['project__technology-svg']}>
                        <use href={`${icons}#css`} />
                    </svg>
                </li>
            </ul>
            <p className={classes['project__description']}>
                A simple weather app that displays <br /> the current weather
                and a weekly forecast
            </p>
            <div className={classes['button-container']}>
                <Button type="source">Visit</Button>
                <Button type="visit">Source</Button>
            </div>
        </div>
    );
};

export default Project;
