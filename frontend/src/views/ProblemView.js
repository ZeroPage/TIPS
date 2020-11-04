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
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      memberId: "",
      categoryId: "",
      timeLimit: "",
      reference: "",
      content: "",
      difficulty: "",
      vote: "",
      problemId: this.props.match.params.id,
      isShare: false,
      time: ""
    };
  }

  toggleModal = () => {
    this.setState({
      isShare: !this.state.isShare
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

    fetch("/api/v1/problem/" + this.state.problemId, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.success === "ok")
        {
          this.setState({
            title: result.title,
            memberId: result.member_id,
            categoryId: result.category_id,
            timeLimit: result.time_limit,
            reference: result.reference,
            content: result.content,
            difficulty: result.difficulty,
            vote: result.vote,
            time: result.time_limit
          });
        }
      },
      (error) => console.log(error)
    )

    setInterval(() => this.tick(), 1000);
  }

  render() {
    let answerPanel = <br />;
    if (this.state.time === 0) {
      let answer = "";
      console.log(this.state.problemId);
      if (this.state.problemId == 1) {
        answer = "<p>Hello World!</p>";
      }
      else if (this.state.problemId == 2) {
        answer = "<p>1. 표준 프로토콜을 사용"
        + "<br>2. 작은 소리를 크게 변환 -  리피터 설치 증폭 / 작은 소리도 이해 가능 - 복조기 성능 향상"
        + "<br>3. 빠른 속도의 조절 필요 - 반송파 신호 조정 / 빠른 속도도 이해 가능 - 반송파 신호 중첩"
        + "<br>4. 한사람만 발언 허용 - 반이중 기술 적용/ 동시에 발언 가능 - 전이중 기술 적용"
        + "<br>5.물이 아닌 전송매체 변화 - 무선통신 매체사용 / 물속 에서도 대화 가능 - 음파통신 매체사용<\p>";
      }
      else {
        answer = "답변이 등록 되어있지 않습니다.";
      }

      answerPanel = (
        <div>
          <h2 className="display-5">답변</h2>
          <div dangerouslySetInnerHTML={{ __html: answer }}></div>
        </div>
      );
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
                  <h2 className="display-5 text-center">No.{this.state.problemId} - {this.state.title}</h2>
                  <br />
                  <h2 className="display-5">문제</h2>
                  <p className="lead">
                    <div dangerouslySetInnerHTML={{ __html: this.state.content }}>
                    </div>
                  </p>
                  <p className="text-center">
                    출처 : {this.state.reference}
                  <br />
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
                      <Button color="default" type="button" href={"/problem-edit-page/" + this.state.problemId}>
                        문제 수정
                      </Button>
                      <Button color="default" type="button" onClick={() => this.toggleModal()}>
                        공유 하기
                      </Button>
                      <Button color="default" type="button" onClick={() => this.setState({time:0})}>
                        답안 확인
                      </Button>
                      <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.isShare}
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
                  {answerPanel}
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
