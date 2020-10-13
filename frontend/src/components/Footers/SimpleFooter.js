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
/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer>
          <br />
          <Container>
            <Row className=" row-grid align-items-center mb-5">
              <Col lg="6">
                <h3 className=" text-primary font-weight-light mb-2">
                  기술면접 서비스 TIPS입니다.
                </h3>
                <h4 className=" mb-0 font-weight-light">
                  이용 후 많은 피드백 부탁드립니다.
                </h4>
              </Col>
            </Row>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="4">
                <div className=" copyright">
                  © {new Date().getFullYear()}{" "} TIPS
                </div>
              </Col>
              <Col md="8">
                <Nav className="nav-footer justify-content-end">
                  <NavItem>
                    <NavLink
                      //href="https://www.creative-tim.com?ref=adsr-footer"
                      target="_blank">
                      팀원 소개
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      //href="https://www.creative-tim.com?ref=adsr-footer"
                      target="_blank">
                      박인서
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      //href="https://www.creative-tim.com/presentation?ref=adsr-footer"
                      target="_blank">
                      양운천
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      //href="http://blog.creative-tim.com?ref=adsr-footer"
                      target="_blank">
                      김웅수
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://github.com/ZeroPage/TIPS"
                      target="_blank">
                      Source Code
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
