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

// reactstrap components
import { Button, ButtonGroup, Badge, Card, Container, Form, Row, Col, ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink, Progress } from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      category: [],
      isConnect: false,
      isLogin: true,
    };
  }


  render() {
    return (
      <>
        <SimpleNavbar />
        <main ref="main">
          <section className="section section-lg section-shaped pb-250">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col className="text-center" lg="6">
                    <h1 className="display-3 text-white">&nbsp;</h1>
                  </Col>
                </Row>
              </div>
            </Container>

            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Form>
                  <br />
                  <h1 className="display-3 text-center">문제 목록</h1>
                  <br />
                  <Container>

                    <ListGroup flush>
                      <ListGroupItem disabled tag="a" href="#">
                        <Row>
                        <Col xs="auto">
                          <ButtonGroup size="lg">
                            <Button>인기순</Button>
                            <Button>날짜순</Button>
                          </ButtonGroup>
                        </Col>
                      </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col xs="9">
                            <a href={"problem-view-page/"}>배치가 가운데로 잘 안되는듯</a>
                            <Row>
                              <Col xs="8">
                                <ButtonGroup size="sm">
                                  <Button href = '#'>자료구조</Button>
                                </ButtonGroup>
                              </Col>
                              <Col xs="4">게시일 : 2020.01.02</Col>
                            </Row>
                          </Col>
                          <Col xs="1">111<Badge color="light">추천</Badge></Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col xs="9">
                            <a href={"problem-view-page/"}>배치가 가운데로 잘 안되는듯</a>
                            <Row>
                              <Col xs="8">
                                <ButtonGroup size="sm">
                                  <Button href = '#'>OS</Button>
                                </ButtonGroup>
                              </Col>
                              <Col xs="4"></Col>
                            </Row>
                          </Col>
                          <Col xs="1"><Badge color="primary">성공</Badge></Col>
                          
                          <Col xs="2">
                      난이도 : 1단계
                        <Progress max="5" value="1" color="default" /></Col>
                        </Row>
                      </ListGroupItem>
                      
                      <ListGroupItem>
                        <Row>
                          <Col xs="9">
                            <a href={"problem-view-page/"}>배치가 가운데로 잘 안되는듯</a>
                            <Row>
                              <Col xs="8">
                                <ButtonGroup size="sm">
                                  <Button href = '#'>OS</Button>
                                </ButtonGroup>
                              </Col>
                              <Col xs="4"></Col>
                            </Row>
                          </Col>
                          <Col xs="1"><Badge color="danger">실패</Badge></Col>
                          
                          <Col xs="2">
                      난이도 : 4단계
                        <Progress max="5" value="4" color="default" /></Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>




                    {
                      this.state.isLogin &&
                      <div className="text-center">
                        <Button
                          className="mt-4"
                          color="primary"
                          type="button"
                          href="/problem-edit-page"
                        >
                          문제 추가버튼 : 링크를 위해 남겨놓음
                        </Button>
                      </div>
                    }
                    <br />

                  </Container>
                  <Row xs="3">
                    <Col></Col>
                    <Col>                      
                    <Pagination aria-label="Page navigation example">
                      <PaginationItem disabled>
                        <PaginationLink first href="#" />
                      </PaginationItem>
                      <PaginationItem disabled>
                        <PaginationLink previous href="#" />
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink href="#">
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">
                          4
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">
                          5
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink next href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink last href="#" />
                      </PaginationItem>
                    </Pagination>
                    </Col>
                    <Col></Col>
                  </Row>
                </Form>
              </div>
            </Card>


          </Container>
          <br />
          <br />
        </main>
      </>
    );
  }
}

export default ProblemList;
