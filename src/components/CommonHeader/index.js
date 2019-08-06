import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Breadcrumb,
  Image,
} from 'react-bootstrap';

import { GlobalStateConsumer } from '../../utils/globalState';
import ProfileCard from '../ProfileCard';

export default class CommonHeader extends React.Component {
  render() {
    return (
      <GlobalStateConsumer>
        {({ user }) => (
          <React.Fragment>
            <header className="primary">
              <Container>
                <Navbar>
                  <Link className="navbar-brand logo mr-auto" to="/">
                    <Image
                      className="symbol"
                      src="https://www.introlytics.com/images/introlytics.png"
                    />
                    <span className="logotype">
                      Introlytics <small>™</small>
                    </span>
                  </Link>
                  <Nav>
                    <Link to="/">Dashboard</Link>
                  </Nav>
                </Navbar>
              </Container>
            </header>
            <header className="secondary">
              <Container>
                <Row>
                  <Col>
                    <ProfileCard
                      firstName={user.firstName}
                      email={user.email}
                    />
                  </Col>
                  <Col>
                    <Breadcrumb>
                      <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                      </li>
                      <Breadcrumb.Item href="#">Account</Breadcrumb.Item>
                      <Breadcrumb.Item active>Billing</Breadcrumb.Item>
                    </Breadcrumb>
                  </Col>
                </Row>
                <Navbar>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <NavDropdown
                        title="General"
                        id="basic-nav-dropdown-general"
                      >
                        <NavDropdown.Item href="#action/3.1">
                          Action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                          Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">
                          Something
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                          Separated link
                        </NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown
                        title="Account settings"
                        id="basic-nav-dropdown-account-settings"
                      >
                        <NavDropdown.Item href="#action/3.1">
                          Action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                          Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">
                          Something
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                          Separated link
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                    <Nav>
                      <Nav.Link href="#">Logout</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </Container>
            </header>
          </React.Fragment>
        )}
      </GlobalStateConsumer>
    );
  }
}
