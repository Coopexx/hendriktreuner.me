import ReactDOM from 'react-dom';
import classes from './Legal.module.scss';

const Backdrop = () => {
    return <div className={classes.backdrop}></div>;
};

const Legal = () => {
    return (
        <div className={classes.legal}>
            <h1>test</h1>
        </div>
    );
};

const LegalModal = () => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.querySelector('#backdrop-root')
            )}
            {ReactDOM.createPortal(
                <Legal />,
                document.querySelector('#overlay-root')
            )}
        </>
    );
};

export default LegalModal;
