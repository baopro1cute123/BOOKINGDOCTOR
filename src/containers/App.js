import { ConnectedRouter as Router } from 'connected-react-router';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { history } from '../redux';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils';

import Home from '../routes/Home';
// import Login from '../routes/Login';
import CustomScrollbars from '../components/CustomScrollbars';
import System from '../routes/System';
import Login from './Auth/Login';
import HomePage from './HomePage/HomePage';
import DetailDoctor from './Patient/Doctor/DetailDoctor';

import Doctor from '../routes/Doctor';
import Chatbot from './Patient/Chat/Chatbot';
import DetailClinic from './Patient/Clinic/DetailClinic';
import Search from './Patient/Search/Search';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import verifyEmail from './Patient/verifyEmail';
import DoneEmail from './Patient/DoneEmail';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                        <CustomScrollbars style={{height: '100vh', width:'%'}}>
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={'/doctor'} component={userIsAuthenticated(Doctor)} />

                                <Route path={path.HOMEPAGE} component={HomePage} />
                                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor}/>
                                <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty}/>
                                <Route path={path.DETAIL_CLINIC} component={DetailClinic}/>
                                <Route path={path.VERIFY_EMAIL_BOOKING} component={verifyEmail}/>
                                <Route path={path.DONE_PAYMENT} component={DoneEmail}/>

                                <Route path={path.SEARCH} component={Search}/>
                                <Route path={path.CHATBOT} component={Chatbot}/>


                            </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            
                        />
                        <ToastContainer />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);