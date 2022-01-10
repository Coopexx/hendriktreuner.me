import classes from './App.module.scss';
import github from './images/github.svg';
import linkedIn from './images/linkedin.svg';
import email from './images/email.svg';

function App() {
    return (
        <>
            <section className={classes.overview}>
                <h1 className={classes['overview__caption']}>
                    <span className={classes['overview__caption-1']}>
                        Hendrik
                    </span>
                    <span className={classes['overview__caption-2']}>
                        Treuner
                    </span>
                </h1>
                <h2 className={classes['overview__sub-caption']}>
                    Front-End Web Developer
                </h2>
                <div className={classes['icon-container']}>
                    <img
                        src={github}
                        alt="GitHub"
                        className={classes['icon-container__icon']}
                    ></img>
                    <img
                        src={email}
                        alt="Email"
                        className={classes['icon-container__icon']}
                    ></img>
                    <img
                        src={linkedIn}
                        alt="LinkedIn"
                        className={classes['icon-container__icon']}
                    ></img>
                </div>
            </section>
        </>
    );
}

export default App;
