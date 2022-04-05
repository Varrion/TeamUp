import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from "@reach/router";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(9),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 3),
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

const Footer = (props) => {
    const classes = useStyles();

    return (
        props.show && <footer className={classes.footer}>
            <Container maxWidth="xl">
                <section className='d-flex justify-content-center justify-content-lg-between p-2 border-bottom'>
                    <div>
                        <Link to='' className='me-4 text-reset'>
                            <i className='fab fa-facebook-f'/>
                        </Link>
                        <Link to='' className='me-4 text-reset'>
                            <i className='fab fa-twitter'/>
                        </Link>
                        <Link to='' className='me-4 text-reset'>
                            <i className='fab fa-google'/>
                        </Link>
                        <Link to='' className='me-4 text-reset'>
                            <i className='fab fa-instagram'/>
                        </Link>
                        <Link to='' className='me-4 text-reset'>
                            <i className='fab fa-linkedin'/>
                        </Link>
                        <Link to='' className='me-4 text-reset'>
                            <i className='fab fa-github'/>
                        </Link>
                    </div>
                </section>

                <section className=''>
                    <div className='container text-center text-md-start mt-5'>
                        <div className='row mt-3'>
                            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    <i className='fas fa-gem me-3'/>Team UP
                                </h6>
                                <p>
                                    Get connected with people near you by playing your favorite sports and have fun!
                                </p>
                            </div>

                            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>

                                <Link to={""} className='me-4 text-reset'>
                                    <h6 className='text-uppercase fw-bold mb-3'>Home</h6>
                                </Link>
                                <Link to={"users"} className='me-4 text-reset'>
                                    <h6 className='text-uppercase fw-bold mb-3'>Users</h6>
                                </Link>
                                <Link to={"teams"} className='me-4 text-reset'>
                                    <h6 className='text-uppercase fw-bold mb-3'>Teams</h6>
                                </Link>
                                <Link to={"/locations"} className='me-4 text-reset'>
                                    <h6 className='text-uppercase fw-bold mb-3'>Locations</h6>
                                </Link>
                            </div>

                            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                                <Link to={"/login"} className='me-4 text-reset'>
                                    <h6 className='text-uppercase fw-bold mb-3'>Login</h6>
                                </Link>

                                <Link to={"/register"} className='me-4 text-reset'>
                                    <h6 className='text-uppercase fw-bold mb-3'>Register</h6>
                                </Link>

                            </div>

                            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p>
                                    <i className='fas fa-home me-3'/> Republic of Macedonia
                                </p>
                                <p>
                                    <i className='fas fa-envelope me-3'/>
                                    info@teamup.com
                                </p>

                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </footer>
    );
}

export default Footer;
