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
  Badge, Button, Card, CardBody,
  CardTitle, ButtonGroup, Container, Form, Row, Col, Progress
} from "reactstrap";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ProblemView.css'

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

class ProblemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problem_id: this.props.match.params.id,
      member_id: 0,
      is_admin: false,
      is_popular: true,
      problems: [],
      categories: []
    };

    this.getLogin();
    this.getCategory();
    this.getProblem();

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleDelete() {
    var result = window.confirm(this.state.problem_id + "번 문제를 삭제하시겠습니까?");  
    if(result)
    {
      fetch("/api/v1/problems/" + this.state.problem_id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(
        (result) => {
          if(result.ok) {
            alert("삭제가 완료되었습니다.");
            this.props.history.push('/problem-list-page');
            return;
          }
          else {
            alert("삭제를 실패하였습니다.");
            return;
          }
        },
        (error) => {
          alert("삭제를 실패하였습니다.");
          console.log(error);
          return;
        }
      )
    }
    return;
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
        if(result.ok) {
          result.json().then(data => {
            this.setState({
              member_id: data.member_id,
              is_admin: data.is_admin
            });
          });
        }
      }
    );
  }

  getCategory() {
    fetch("/api/v1/problems/categories", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok) {
          result.json().then(data => {
            this.setState({categories: data.results});
          });
        }
      }
    );
  }

  getProblem() {
    fetch("/api/v1/problems/" + this.state.problem_id, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok) {
          result.json().then(data => {
            this.setState({problems: data});
          });
        }
      }
    );
  }

  getDifficulty() {
    var ret = 0;
    /*fetch("/api/v1/difficulty", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'problem_id': this.state.problem_id
      })
    })
    .then(
      (result) => {
        if(result.ok) {
          result.json().then(data => {
            ret = data.average;
          });
        }
      }
    );*/
    return ret;
  }

  
  getMember(member_id) {
    /*var res = "";

    fetch("/api/v1/members/" + member_id, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok) {
          result.json().then(data => {
            res = data.nickname;
          });
        }
      }
    );
    
    return res;*/
  }

  getCategoryName(find_id) {
    for(var i=0;i<this.state.categories.length;i++) {
      if(this.state.categories[i].category_id === find_id) {
        return this.state.categories[i].name;
      }
    }
    return "";
  }

  getProblemInfo() {
    var ret = [];

    //Header
    ret.push(<br />);
    ret.push(
      <Row>
        <Col xs="3">
          <h5 className="text-left">
            No. {this.state.problem_id}
          </h5>
          난이도 : {this.getDifficulty()}단계
          <Progress max="5" value={this.getDifficulty()} color="default" />
        </Col>
        <Col xs="6">
          <h1 className="display-3 text-center">{this.state.problems.title}</h1>
        </Col>
        <Col xs="3">
          <div className="text-right">
            제한 시간 : {this.state.problems.time_limit}초
            <br />
            게시일 : {('' + this.state.problems.created).substring(0, 10)}
            <br />
            작성자 : {/*this.getMember(this.state.problems.member_id)*/ 'admin'}
          </div>
        </Col>
      </Row>
    );
    console.log();
    ret.push(
      <Row>
        <Col xs="4">
          {
            (this.state.member_id === this.state.problems.member_id || this.state.is_admin) &&
            <div>
              <br />
              <Button color="primary" size="sm" type="button" href={"/problem-edit-page/" + this.state.problem_id}>
                문제 수정
              </Button>
              <Button color="primary" size="sm" type="button" onClick={this.handleDelete}>
                문제 삭제
              </Button>
            </div>
          }
        </Col>
        <Col xs="4" />
        <Col xs="4">
          <div className="text-right">
            출처 : {this.state.problems.reference}
            <br />
            <Badge className="text-uppercase" color="primary" pill>
              {this.getCategoryName(this.state.problems.category_id)}
            </Badge>
          </div>
        </Col>
      </Row>
    );

    ret.push(<hr />);

    //Body
    ret.push(
      <p className="lead">
        <div dangerouslySetInnerHTML={{ __html: this.state.problems.content }} />
      </p>
    );

    ret.push(<br />);
    ret.push(<br />);
    ret.push(<br />);

    ret.push(
      <Row xs='2'>
        <Col xs='4'></Col>
        <h1>0</h1>
        <Button href='#' width='60px' height='60px' color='none'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwt5NJwBuhBx3ky4esSe3itCDGvrx00B8qXQ&usqp=CAU' width='60px' height='60px' />
        </Button>
        <Button href='#' width='60px' height='60px' color='none'>
          <img src='data:image/png;base64,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' width='60px' height='60px' />
        </Button>
        <h1>1</h1>
        <Col xs='4'></Col>
      </Row>
    )

    ret.push(<br />);
    console.log(this.state.is_popular);

    return ret;
  }
  
  getAnswer() {
    var ret = [];

    ret.push(
      <Row xs='2'>
        <Col>
          <h5>총 4개의 답변</h5>
        </Col>
        <Col>
          <div class="text-right">
            <Button size="sm" disabled={this.state.is_popular}>
              인기순
            </Button>
            <Button size="sm" disabled={!this.state.is_popular}>
              최신순
            </Button>
          </div>
        </Col>
      </Row>
    );
    ret.push(
      <Button color="primary" size="lg" href="/problem-solve-page" block>
        답변 더 보기
      </Button>
    );

    return ret;
  }

  render() {
    return (
      <>
        <SimpleNavbar />
        <main ref="main">
          <Template />
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-6">
                <Form>
                  {this.getProblemInfo()}
                  {this.getAnswer()}


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
