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
  Badge, Button, Card, Container, Form, Progress, PopoverBody, UncontrolledPopover, Row, Col
} from "reactstrap";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

class ProblemView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problem_id: this.props.match.params.id,
      problem: "",
      member_id: 0,
      is_admin: false,
      categories: [],
      answer_count: 0,
      answer_page: 1,
      answers: [],
      content: "",
      member_nickname:[]
    };

    this.getLogin();
    this.getCategory();
    this.getProblem();
    this.getAnswer();
    
    this.hanbleShare = this.handleShare.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleProblemVote = this.handleProblemVote.bind(this);
    this.handleAnswerVote = this.handleAnswerVote.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    this.handleAnswerDelete = this.handleAnswerDelete.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleShare() {
    prompt("현재 문제 링크를 공유하세요.", window.location.href);
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

  handleProblemVote() {
    fetch("/api/v1/votes", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "problem_id": this.state.problem_id,
        "type": "u"
      })
    })
    .then(
      (result) => {
        if(result.ok) {
          alert("추천이 완료되었습니다.");
          window.location.reload();
          return;
        }
        else {
          alert("추천에 실패하였습니다.");
          return;
        }
      },
      (error) => {
        alert("추천에 실패하였습니다.");
        console.log(error);
        return;
      }
    )
  }

  handleAnswerVote(event) {
    fetch("/api/v1/votes", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "answer_id": event.target.id,
        "type": "u"
      })
    })
    .then(
      (result) => {
        if(result.ok) {
          alert("추천이 완료되었습니다.");
          window.location.reload();
          return;
        }
        else {
          alert("추천에 실패하였습니다.");
          return;
        }
      },
      (error) => {
        alert("추천에 실패하였습니다.");
        console.log(error);
        return;
      }
    )
  }

  handleAnswerSubmit() {
    fetch("/api/v1/answers", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "problem_id": this.state.problem_id,
        "content": this.state.content,
        "reference": ""
      })
    })
    .then(
      (result) => {
        if(result.ok) {
          alert("풀이 등록이 완료되었습니다.");
          window.location.reload();
          return;
        }
        else {
          alert("풀이 등록에 실패하였습니다.");
          return;
        }
      },
      (error) => {
        alert("풀이 등록에 실패하였습니다.");
        console.log(error);
        return;
      }
    )
  }

  handleAnswerDelete(event) {
    var result = window.confirm("풀이를 삭제하시겠습니까?");  
    if(result)
    {
      fetch("/api/v1/answers/" + event.target.id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(
        (result) => {
          if(result.ok) {
            alert("풀이 삭제가 완료되었습니다.");
            window.location.reload();
            return;
          }
          else {
            alert("풀이 삭제에 실패하였습니다.");
            return;
          }
        },
        (error) => {
          alert("풀이 삭제에 실패하였습니다.");
          console.log(error);
          return;
        }
      );
    }
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
          result.json().then(data_problem => {
            fetch("/api/v1/members/" + data_problem.member_id, {
              method: 'GET',
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(
              (result) => {
                if(result.ok) {
                  result.json().then(data_member => {
                    fetch("/api/v1/votes?problem_id=" + this.state.problem_id, {
                      method: 'GET',
                      headers: {
                        "Content-Type": "application/json"
                      }
                    })
                    .then(
                      (result) => {
                        if(result.ok) {
                          result.json().then(data_vote => {
                            fetch("/api/v1/difficulty?problem_id=" + data_problem.problem_id, {
                              method: 'GET',
                              headers: {
                                "Content-Type": "application/json"
                              }
                            })
                            .then(
                              (result) => {
                                if(result.ok) {
                                  result.json().then(data_difficulty => {
                                    data_problem.difficulty = parseInt(data_difficulty.average);
                                    if(!data_problem.difficulty) data_problem.difficulty = 0;
                                    data_problem.vote = data_vote.u;
                                    data_problem.member_nickname = data_member.nickname;
                                    this.setState({problem: data_problem});
                                  });
                                }
                              }
                            );
                          });
                        }
                      }
                    );
                  });
                }
              }
            );
          });
        }
      }
    );
  }

  getAnswer() {
    var answer_info = this.state.answers;
    var page = parseInt(this.state.answers.length / 5) + 1;

    fetch(`/api/v1/answers?problem_id=${this.state.problem_id}&page=${page}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok) {
          result.json().then(data => {
            this.setState({answer_count: data.total_count});
            data.results.forEach(data_answer => {
              fetch("/api/v1/members/" + data_answer.member_id, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json"
                }
              })
              .then(
                (result) => {
                  if(result.ok) {
                    result.json().then(data_member => {
                      fetch("/api/v1/votes?answer_id=" + data_answer.answer_id, {
                        method: 'GET',
                        headers: {
                          "Content-Type": "application/json"
                        }
                      })
                      .then(
                        (result) => {
                          if(result.ok) {
                            result.json().then(data_vote => {
                              data_answer.vote = data_vote.u;
                              data_answer.member_nickname = data_member.nickname;
                              answer_info.push(data_answer);
                              this.setState({answers: answer_info});
                            });
                          }
                        }
                      );
                      
                    });
                  }
                }
              );
            });
          });
        }
        else {
          console.log(result.status);
        }
      }
    );
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
    ret.push(<h1 className="display-3 text-center">{this.state.problem.title}</h1>);
    ret.push(
      <Row>
        <Col xs="4">
          <h5 className="text-left">
            No. {this.state.problem_id}
          </h5>
          출처 : {this.state.problem.reference}
          <br />
          난이도 : {this.state.problem.difficulty}단계
          <Progress max="5" value={this.state.problem.difficulty} color="default" />
          <Badge className="text-uppercase" color="primary" pill>
            {this.getCategoryName(this.state.problem.category_id)}
          </Badge>
        </Col>
        <Col xs="4" />
        <Col xs="4">
          <div className="text-right">
            제한 시간 : {this.state.problem.time_limit}초
            <br />
            게시일 : {('' + this.state.problem.created).substring(0, 10)}
            <br />
            작성자 : {this.state.problem.member_nickname}
          </div>
          {
            (this.state.member_id === this.state.problem.member_id || this.state.is_admin) &&
            <div className="text-right">
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
      </Row>
    );

    ret.push(<hr />);

    //Body
    ret.push(
      <p className="lead">
        <div dangerouslySetInnerHTML={{ __html: this.state.problem.content }} />
      </p>
    );

    ret.push(<br />);
    ret.push(<br />);
    ret.push(<br />);

    ret.push(
        <div className="text-center">
            <Button color="primary" size="sm" id="HintButton" type="button">
              힌트 보기
            </Button>
            <UncontrolledPopover
              placement="bottom"
              target="HintButton"
              className="popover-primary"
            >
              <PopoverBody>
                {this.state.problem.hint}
              </PopoverBody>
            </UncontrolledPopover>
            <Button color="primary" size="sm" type="button" onClick={this.handleShare} >
              문제 공유
            </Button>
            <Button id={this.state.problem_id} color='none' onClick={this.handleProblemVote}>
              <Row>
                <Col>
                {
                  parseInt(this.state.member_id) !== 0 &&
                  <div>
                    <i class="fa fa-thumbs-o-up" aria-hidden="true" />
                    {" " + this.state.problem.vote}
                  </div>
                }
                </Col>
              </Row>
            </Button>
        </div>
    )

    return ret;
  }
  
  getAnswerInfo() {
    var ret = [];

    ret.push(
      <Row xs='2'>
        <Col>
          <h5>총 {this.state.answer_count}개의 풀이</h5>
        </Col>
        <Col>
          {/*<div class="text-right">
            <Button size="sm" disabled={false}>
              추천순
            </Button>
            <Button size="sm" disabled={false}>
              최신순
            </Button>
          </div>*/}
        </Col>
      </Row>
    );
    ret.push(<br />);

    this.state.answers.forEach(answer => {
      ret.push(
        <div>
          <Row>
            <Col xs="2">
              <div className="text-center">
                {answer.member_nickname}
                <br />
                {('' + answer.created).substring(0, 10)}
                <Button id={answer.answer_id} color='none' onClick={this.handleAnswerVote}>
                  <Row>
                    {
                      parseInt(this.state.member_id) !== 0 &&
                      <Col id={answer.answer_id}>
                        <i id={answer.answer_id} class="fa fa-thumbs-o-up" aria-hidden="true" />
                        {" " + answer.vote}
                      </Col>
                    }
                  </Row>
                </Button>
              </div>
            </Col>
            <Col xs="9">
              <div dangerouslySetInnerHTML={{ __html: answer.content }} />
            </Col>
            <Col xs="1">
              {
                this.state.member_id === answer.member_id &&
                <Button id={answer.answer_id} color='none' onClick={this.handleAnswerDelete}>
                  ×
                </Button>
              }
            </Col>
          </Row>
          <br />
        </div>
      );
    });

    if(this.state.answer_count !== this.state.answers.length) {
      ret.push(
        <Button color="primary" size="lg" onClick={this.getAnswer.bind(this)} block>
          풀이 더 보기
        </Button>
      );
    }

    ret.push(<hr />);

    if(this.state.member_id !== 0) {
      ret.push(
        <div className="text-center">
          <h2>풀이작성</h2>
          <br />
          <CKEditor
            editor={ClassicEditor}
            data={this.state.content}
            onChange={(event, editor) => {
              let data = editor.getData();
              this.setState({ content: data });
            }}
          />
          <br />
          <Button color='primary' onClick={this.handleAnswerSubmit}>
            작성완료
          </Button>
        </div>
      );
    }
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
                  <hr />
                  {this.getAnswerInfo()}
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
