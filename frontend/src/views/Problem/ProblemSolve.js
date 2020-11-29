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
  CardTitle, ButtonGroup, Container, Form, Row, Col, Progress, Nav, NavItem, NavLink
} from "reactstrap";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ProblemView.css'

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
class ProblemSolve extends React.Component {
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
                  <h1 className="display-3">매우큰수</h1>
                  <Row>
                    <Col xs='4'>
                      <div>

                        <a href='#'>컴퓨터</a>
                      -
                        <a href='#'>자료구조</a>
                      </div>
                    </Col>
                    <Col xs='4'></Col>
                    <Col xs='4'>시간 : 100초</Col>
                  </Row>

                  <br />

                  <Row>
                    <Col xs='4'>
                      게시일 : 2015.15.15
                  </Col>
                    <Col xs='4'>
                      조회수 : 1010
                  </Col>
                    <Col xs='4'>
                      난이도 : 1단계
                        <Progress max="5" value="1" color="default" />
                    </Col>
                  </Row>

                  <hr></hr>

                  <div>철수는 매우 큰 수들의 곱을 구하고자 했으나, 오버플로우로 인하여 제대로된 값을 구하지 못했다. 철수를 위해 매우 큰 수들의 곱을 구해주는 프로그램을 만들어 주자.
<br></br>
조건) 1.입력값은 모두 1천만 이하의 자연수로 구성된다. 2.출력값의 형태는 다음을 따른다. 1,234,567,890 또는 1234567890 (부동 소수점 표현법은 불허한다.)
<br></br>
예시) 34566789 * 9989953^ 5 결과 : 3,439,349,130,987,378,995,741,000,108,452,472,269,377,477 (또는) 3439349130987378995741000108452472269377477
<br></br>
242896 * 2345987 * 3948562 * 2673851 * 2349863 * 2 * 9873645 * 5728364 결과: 1,599,200,004,322,211,514,880,952,175,873,148,802,507,070,720 (또는) 1599200004322211514880952175873148802507070720</div>
                  <br />
                  <br />
                  <div>
                    <Row xs='3'>
                      <Col><a href="#">공유하기</a></Col>
                      <Col></Col>
                      <Col>
                        <Card body>
                          <CardTitle tag="h9">질문일 : 2015.12.21 22:34</CardTitle>
                          <div><img src='https://www.gravatar.com/avatar/b67222dadd40ac3a45ce5048a1e3cdb8?s=328&d=identicon&r=PG&f=1' weight='30px' height='30px'></img> 작성자 : twice</div>
                        </Card>
                      </Col>

                    </Row>
                    <nav>
                          <a href='#'>수정</a>
                          |
                          <a href='#'>삭제</a>
                    </nav>
                  </div>

                  <br />


                  <hr color='blue' />
                  <h1>풀이작성</h1>
                  <CKEditor
                    editor={ClassicEditor}
                    data={this.state.content}
                    onInit={(event, editor) => {
                      editor.resize_minHeight = 500;
                    }}
                    onChange={(event, editor) => {
                      let data = editor.getData();
                      this.setState({ content: data });
                    }}
                  />
                  <br />
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

export default ProblemSolve;
