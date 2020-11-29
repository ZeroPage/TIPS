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
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class DemoNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseClasses: "",
      collapseOpen: false,
      isLogin: false,
      member_id: "",
      username: "",
      nickname: "",
      email: "",
      created: "",
      isAdmin: false,
      isPrime: false
    };

    this.getLogin();
  }

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }

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

  logout = () => {
    fetch("/api/auth/logout", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok)
        {
          alert("로그아웃되었습니다.");
          window.location.reload();
        }
      }
    );
  }

  getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
  }

  getLogin() {
    fetch("/api/v1/members", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok)
        {
          result.json().then(data => {
            this.setState({
              isLogin: true,
              member_id: data.member_id,
              username: data.username,
              nickname: data.nickname,
              email: data.email,
              created: data.created,
              isAdmin: data.is_admin,
              isPrime: data.is_prime
            });
          });
        }
      }
    );
  }

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
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">문제</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/problem-list-page" tag={Link}>
                        전체
                      </DropdownItem>
                      <DropdownItem to="/" tag={Link}>
                        카테고리
                      </DropdownItem>
                      <DropdownItem to="/" tag={Link}>
                        문제집/모의 면접
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">그룹</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">게시판</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/" tag={Link}>
                        공지사항
                      </DropdownItem>
                      <DropdownItem to="/" tag={Link}>
                        자유게시판
                      </DropdownItem>
                      <DropdownItem to="/" tag={Link}>
                        질의응답
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  {
                  !this.state.isLogin && 
                  <>
                    <NavItem className="d-none d-lg-block ml- lg-3">
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
                  </>
                  }
                  {
                  this.state.isLogin && 
                  <>
                    <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                      <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                          <i className="ni ni-collection d-lg-none mr-1" />
                          <span className="nav-link-inner--text">{this.state.nickname}님 환영합니다.</span>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem to="/profile-info-page" tag={Link}>
                            회원 정보
                          </DropdownItem>
                          <DropdownItem to="/profile-activity-page" tag={Link}>
                            활동 내역
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                    <NavItem className="d-none d-lg-block ml-lg-3">
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        onClick={() => this.logout()}
                      >
                        <span className="nav-link-inner--text ml-1">
                          로그아웃
                        </span>
                      </Button>
                    </NavItem>
                  </>
                  }
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
