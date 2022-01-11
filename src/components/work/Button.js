import classes from './Button.module.scss';

const Button = (props) => {
    const className = classes[props.type];

    return (
        <a href={props.link}>
            <button className={`${className} ${classes['button']}`}>
                {props.type}
            </button>
        </a>
    );
};

export default Button;
