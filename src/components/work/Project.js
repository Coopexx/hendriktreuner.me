import classes from './Project.module.scss';
import icons from '../../images/sprite-work.svg';
import Button from './Button';

const SVG = (props) => {
    return (
        <li className={classes['project__technology']}>
            <svg className={classes['project__technology-svg']}>
                <use href={`${icons}#${props.tech}`} />
            </svg>
        </li>
    );
};

const Project = (props) => {
    return (
        <div className={classes.project}>
            <h3 className={classes['project__caption']}>{props.name}</h3>
            <ul className={classes['project__technologies-container']}>
                {props.technology.map((tech) => {
                    return <SVG tech={tech} />;
                })}
            </ul>
            <p className={classes['project__description']}>
                {props.description}
            </p>
            <div className={classes['button-container']}>
                {props.button.map((type, index) => {
                    return (
                        <Button type={type} link={props.link[index]}></Button>
                    );
                })}
            </div>
        </div>
    );
};

export default Project;
