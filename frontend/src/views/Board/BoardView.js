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
import {
  Button, Card, CardImg, CardText, CardBody,
  CardTitle,  ButtonGroup,  Container, Form, Input, Modal, PopoverBody, UncontrolledPopover, Row, Col, ListGroup, ListGroupItem
} from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";

class BoardView extends React.Component {
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
          if (result.success === "ok") {
            this.setState({
              title: result.title,
              memberId: result.member_id,
              categoryId: result.category_id,
              timeLimit: result.time_limit,
              reference: result.reference,
              content: result.content,
              difficulty: result.difficulty,
              vote: result.vote,
              time: 0 //result.time_limit
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
                  <h1 className="display-3">게시판제목</h1>
                  <Row>
                    <Col xs='3'>
                      게시일 : 2015.15.15
                  </Col>
                    <Col xs='3'>
                      답글 수 : 12
                  </Col>
                    <Col xs='3'>
                      조회수 : 1010
                  </Col>
                  <Col>
                  <div>
                    
                    <a href='#'>자료구조</a>
                    -
                    <a href='#'>자료구조</a>
                  </div>
                  </Col>
                  </Row>
                  
                  <hr></hr>

                  <div>버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬버튼위아래가운데정렬</div>
                  <br/>
                  <br/>
                  <div>
                    <Row xs='3'>
                      <Col><a href = "#">공유하기</a></Col>
                      <Col></Col>
                      <Col>
                        <Card body>
                          <CardTitle tag="h9">질문일 : 2015.12.21 22:34</CardTitle>
                          <div><img src = 'https://www.gravatar.com/avatar/b67222dadd40ac3a45ce5048a1e3cdb8?s=328&d=identicon&r=PG&f=1' weight = '30px' height='30px'></img> 작성자 : twice</div>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                  <div border='1px'>
                    <Card>
                      <CardBody>
                        <Row xs='2'>
                          <Col xs='4'></Col>
                          <h1>0</h1>
                          <Button href='#' width='60px' height='60px' color='none'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwt5NJwBuhBx3ky4esSe3itCDGvrx00B8qXQ&usqp=CAU' width='60px' height='60px'></img></Button>
                          <Button href='#' width='60px' height='60px' color='none'><img src='data:image/png;base64,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' width='60px' height='60px'></img></Button>
                          <h1>1</h1>
                          <Col xs='4'></Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </div>
                  <br/>
                    <Row xs = '5'>
                      <Col><h5>4개의 답변</h5></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col>
                        <Col xs="auto">
                          <ButtonGroup size="sm">
                            <Button>인기순</Button>
                            <Button>날짜순</Button>
                          </ButtonGroup>
                        </Col>
                      </Col>
                    </Row>

                    <hr/>
                    



                  <div className="text-center">
                    

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

export default BoardView;
