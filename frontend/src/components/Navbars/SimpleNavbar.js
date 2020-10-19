/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-4" to="/" tag={Link}>
                <img
                  alt="..."
                  src="https://raw.githubusercontent.com/ZeroPage/TIPS/develop/tmp/tips-logo-tmp.png"
                  style={{ width: "75px", height: "75px" }}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          className="img-fluid"
                          src="https://raw.githubusercontent.com/ZeroPage/TIPS/develop/tmp/tips-logo-tmp.png"
                          style={{ width: "75px", height: "75px" }}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <span>&emsp;</span>
                  <UncontrolledDropdown nav>
                    <i className="ni ni-ui-04 d-lg-none mr-1" />
                    <span className="nav-link-inner--text">
                      <a href="/problem-list-page" className="text-white">문제 보기</a>
                    </span>
                  </UncontrolledDropdown>
                  <span>&emsp;&emsp;</span>
                  <UncontrolledDropdown nav>
                    <i className="ni ni-ui-04 d-lg-none mr-1" />
                    <span className="nav-link-inner--text">
                      <a href="" className="text-white">문제 검색</a>
                    </span>
                  </UncontrolledDropdown>
                  <span>&emsp;&emsp;</span>
                  <UncontrolledDropdown nav>
                    <i className="ni ni-ui-04 d-lg-none mr-1" />
                    <span className="nav-link-inner--text">
                      <a href="" className="text-white">그룹 보기</a>
                    </span>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="d-none d-lg-block ml-lg-3">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="/login-page"
                      target="_self"
                    >
                      <span className="nav-link-inner--text ml-1">
                        로그인
                      </span>
                    </Button>
                  </NavItem>
                  <NavItem className="d-none d-lg-block ml-lg-3">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href="/register-page"
                      target="_self"
                    >
                      <span className="nav-link-inner--text ml-1">
                        회원가입
                      </span>
                    </Button>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
