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
import { Button, Card, Container, Form, Input, Modal, PopoverBody, UncontrolledPopover, Row, Col } from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";

class ProblemView extends React.Component {
  state = {
    exampleModal: false,
    time: 10
  };

  toggleModal = () => {
    this.setState({
      exampleModal: !this.state.exampleModal
    });
  };

  tick = () => {
    if (this.state.time > 0) {
      this.setState({
        time: this.state.time - 1
      });
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    setInterval(() => this.tick(), 1000);
  }

  render() {
    let answer = <br />;
    if (this.state.time == 0) {
      answer = <div>
        <h2 className="display-5">답변</h2>
        <p className="lead">Hello World!</p>
      </div>;
    }
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
              <div className="px-6">
                <Form>
                  <br />
                  <h1 className="display-3 text-center">문제 보기</h1>
                  <h2 className="display-5 text-center">No.1 - Hello World</h2>
                  <br />
                  <h2 className="display-5">문제</h2>
                  <p className="lead">
                    Hello World!
                  </p>
                  <p className="text-center">
                    남은 시간 : {this.state.time} sec
                  </p>
                  <div className="text-center">
                      <Button color="default" id="HintButton" type="button">
                      힌트 보기
                      </Button>
                      <UncontrolledPopover
                        placement="bottom"
                        target="HintButton"
                        className="popover-default"
                      >
                        <PopoverBody>
                          Hello World!
                        </PopoverBody>
                      </UncontrolledPopover>
                      <Button color="default" type="button" href="/problem-edit-page">
                        문제 수정
                      </Button>
                      <Button color="default" type="button" onClick={() => this.toggleModal()}>
                        공유 하기
                      </Button>
                      <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.exampleModal}
                        toggle={() => this.toggleModal()}
                      >
                        <div className="modal-header">
                          <h5 className="modal-title">
                            현재 페이지 공유하기
                          </h5>
                          <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal()}
                          >
                            <span aria-hidden={true}>×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <Input defaultValue={window.location.href} type="text" readOnly="true" />
                        </div>
                      </Modal>
                  </div>
                  {answer}
                  <br />
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

export default ProblemView;
