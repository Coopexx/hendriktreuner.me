import classes from './Overview.module.scss';
import icons from '../../images/sprite-overview.svg';

const Overview = () => {
    return (
        <section className={classes.overview}>
            <h1 className={classes['overview__caption']}>
                <span className={classes['overview__caption-1']}>Hendrik</span>
                <span className={classes['overview__caption-2']}>Treuner</span>
            </h1>
            <h2 className={classes['overview__sub-caption']}>
                Front-End Web Developer
            </h2>
            <div className={classes['icon-container']}>
                <a href="https://github.com/Coopexx">
                    <svg className={classes['icon__svg']}>
                        <use href={`${icons}#github`} />
                    </svg>
                </a>
                <a href="mailto:hendrik.treuner@googlemail.com">
                    <svg className={classes['icon__svg']}>
                        <use href={`${icons}#email`} />
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/hendriktreuner">
                    <svg className={classes['icon__svg']}>
                        <use href={`${icons}#linkedin`} />
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default Overview;
