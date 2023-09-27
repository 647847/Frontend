import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import {ProtectedRoute} from "./ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import User from "./components/user.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import EventBus from "./common/EventBus";
import { RenewForm } from "./components/pages/RenewForm";
import { ValidationForm } from "./components/pages/ValidateForm";
import { DownloadCertificateForm } from "./components/pages/DownloadCertificateForm";
import { RequestForm } from "./components/pages/RequestForm";
import { Welcome } from "./components/pages/Welcome";
import AppLogout from "./LogOut";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <div>

          <Navbar
            style={{
              backgroundColor:  "skyblue",
            }}
            collapseOnSelect
            expand='lg'
            // bg='#2C2C8B'
            variant='dark'
            className='navbar-responsive textsize mb-5 p-3 '
          >
            <Container>
             
              <Navbar.Brand href='#home'>
                <img alt='' 
                  //src='https://www.edigitalagency.com.au/wp-content/uploads/telstra-logo-purple-background-800x800.png'
                  src='https://e7.pngegg.com/pngimages/974/2/png-clipart-professional-certification-computer-icons-quality-service-quality-icon-service-logo.png'
                  width='70'
                  height='70'
                  className='d-inline-block align-top'
                />
              </Navbar.Brand>
              <Navbar.Brand
                href='/'
                style={{
                  color:"black",
                  fontSize: "35px",
                  fontWeight: "bold",
                  paddingRight: "50px",
                }}
              >
               Certificate Management System
              </Navbar.Brand>

              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                {currentUser ? (
                  <Nav className='me-auto'>
                    <Nav.Link href='/' style={{ color:"black"}}>
                      <h5>Home</h5>
                    </Nav.Link>
                    <Nav.Link href='/generate' style={{ color:"black"}}>                    
                      <h5>Generate</h5>
                    </Nav.Link>
                    <Nav.Link href='/validate' style={{ color:"black"}}>
                      <h5>Validate</h5>
                    </Nav.Link>
                    <Nav.Link href='/download' style={{ color:"black"}}>
                      <h5>Download</h5>
                    </Nav.Link>
                    <Nav.Link href='/renew' style={{ color:"black"}}>
                      <h5>Renew</h5>
                    </Nav.Link>
                  </Nav>
                ) : null}
              
              </Navbar.Collapse>
              {currentUser ? (
                <Navbar.Collapse
                  className='justify-content-end'
                  id='responsive-navbar-nav'
                >
                  <Nav>
                    <Nav.Link href='/profile' style={{ color:"black"}}>
                      <h5>Profile</h5>
                    </Nav.Link>
                    <Nav.Link href='/login' onClick={this.logOut}  style={{ color:"black"}}>
                      <h5>Logout</h5>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              ) : (
                <Navbar.Collapse
                  className='justify-content-end'
                  id='responsive-navbar-nav'
                >
                  <Nav>
                    <Nav.Link href='/login' style={{ color:"black"}}>
                      <h4>Login</h4>
                    </Nav.Link>
                    <Nav.Link href='/register' className='nav-link' style={{ color:"black"}}>
                      <h4>Sign Up</h4>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              )}
            </Container>
          </Navbar>

          <div className='container mt-3'>
            <Switch>
              {/* Unprotected Routes */}
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />

              {/* Protected Routes */}   
              <AppLogout>           
              <ProtectedRoute exact path='/profile' component={Profile} />
              <ProtectedRoute exact path='/user' component={User} />
              <ProtectedRoute exact path='/renew' component={RenewForm} />
              <ProtectedRoute exact path='/validate' component={ValidationForm} />
              <ProtectedRoute exact path='/download' component={DownloadCertificateForm}/>
              <ProtectedRoute exact path='/generate' component={RequestForm} />
              <ProtectedRoute exact path='/' component={Welcome} />
              </AppLogout>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);