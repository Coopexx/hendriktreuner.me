import classes from './Footer.module.scss';

const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={classes['footer__container']}>
                <div className={classes['footer__text']}>
                    <p className={classes['footer__copyright']}>©</p> 2022 by
                    Hendrik Treuner
                </div>
                <a
                    href="https://hendriktreuner.me/legal"
                    className={classes['footer__link']}
                >
                    Legal Disclosure
                </a>
            </div>
        </div>
    );
};

export default Footer;
