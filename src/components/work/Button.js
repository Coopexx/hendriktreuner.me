import classes from './Button.module.scss';

const Button = (props) => {
    const className = classes[props.type];

    return (
        <button className={`${className} ${classes['button']}`}>
            {props.type}
        </button>
    );
};

export default Button;
