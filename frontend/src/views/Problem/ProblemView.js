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
                      <a href='#'>댓글</a>
                          |
                          <a href='#'>수정</a>
                          |
                          <a href='#'>삭제</a>
                    </nav>
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
                  <br />
                  <Row xs='5'>
                    <Col><h5>4개의 답변</h5></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <Col xs="auto">
                        <ButtonGroup size="sm">
                          <Button>인기</Button>
                          <Button>날짜</Button>
                        </ButtonGroup>
                      </Col>
                    </Col>
                  </Row>


                  <hr color='blue' />
                  <Button color="primary" size="lg" href="/problem-solve-page" block>6개의 댓글이 있습니다</Button>


                  <br />



                  <Row>

                    <Col xs='2'>
                      <div class='hidden-rec'>
                        <h1>31</h1>
                      </div>
                      <div class='hidden-rec'>
                        <div><Button href='#' width='45px' height='45px' color='none'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwt5NJwBuhBx3ky4esSe3itCDGvrx00B8qXQ&usqp=CAU' width='45px' height='45px'></img></Button></div>
                      </div>
                    </Col>
                    <Col>
                      <div class='comment'>
                        답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글답글
                  </div>


                    </Col>
                  </Row>
                  <Row xs='3'>
                    <Col>

                    </Col>
                    <Col></Col>
                    <Col>
                      <Card body>
                        <CardTitle tag="h9">답변일 : 2015.12.21 22:34</CardTitle>
                        <div><img src='https://www.gravatar.com/avatar/b67222dadd40ac3a45ce5048a1e3cdb8?s=328&d=identicon&r=PG&f=1' weight='30px' height='30px'></img> 작성자 : twice</div>
                      </Card>
                    </Col>
                  </Row>


                  <br />

                  <hr color='blue' />
                  <button className='comment-button'>
                  <Row>

                    <Col xs='2'><img src='https://www.gravatar.com/avatar/b67222dadd40ac3a45ce5048a1e3cdb8?s=328&d=identicon&r=PG&f=1' weight='15px' height='15px'></img> 인천불주먹</Col>
                    <Col>댓글의 내용을 잔뜩 적어주는 착한 요정이 왔다갔어요. 행복한 하루 되세요 댓글의 내용을 잔뜩 적어주는 착한 요정이 왔다갔어요. 행복한 하루 되세요</Col>

                  </Row>
                  </button>
                  <br />
                  <br />
                  <button className='comment-button'>
                  <Row>

                    <Col xs='3'>
                    </Col>
                    
                    <Col>
                    <Card body>
                      <Row>
                        <Col>
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

                          <Button color='primary'>댓글쓰기</Button>

                        </Col>
                      </Row>

                    </Card>
                    </Col>
                  </Row>
                  </button>
                  <hr></hr>
                  <button className='comment-button'>
                  <Row>

                    <Col xs='2'><img src='https://www.gravatar.com/avatar/b67222dadd40ac3a45ce5048a1e3cdb8?s=328&d=identicon&r=PG&f=1' weight='15px' height='15px'></img> 적절한유저명</Col>
                    <Col>댓글의 내용을 잔뜩 적어주는 착한 요정이 왔다갔어요. 행복한 하루 되세요 댓글의 내용을 잔뜩 적어주는 착한 요정이 왔다갔어요. 행복한 하루 되세요</Col>

                  </Row>

                  </button>

                  <br />
                  <br />
                  <button className='comment-button'>
                  <Row>

                    <Col xs='1'>
                    </Col>
                    <Col>
                      <Card body>
                        <Row>
                          <img src='https://www.gravatar.com/avatar/b67222dadd40ac3a45ce5048a1e3cdb8?s=328&d=identicon&r=PG&f=1' weight='15px' height='15px'></img> 팔도비빔면
                      <Col xs='1'></Col>
                          <Col>
                            대댓글의 내용을 잔뜩 적어주는 착한 요정이 왔다갔어요. 행복한 하루 되세요대댓글의 내용을 잔뜩 적어주는 착한 요정이 왔다갔어요. 행복한 하루 되세요대댓글의 내용을 잔뜩 적어주는 착한 요정이 왔다갔어요. 행복한 하루 되세요
                    </Col>
                        </Row>

                      </Card>
                    </Col>
                  </Row>
                  </button>

                  
                  <hr color='blue' />

                  <br />

                  <div>
                    <Card body>
                      <Row>
                        <Col>
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

                          <Button color='primary'>댓글쓰기</Button>

                        </Col>
                      </Row>

                    </Card>
                  </div>


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

export default ProblemView;
