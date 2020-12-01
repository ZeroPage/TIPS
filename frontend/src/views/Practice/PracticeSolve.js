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
import 'views/Practice/PracticeSolve.css';

// reactstrap components
import {
  Badge, Button, Card, Container, Form, ListGroup, ListGroupItem, Row, Col, PopoverBody, Progress, UncontrolledPopover
} from "reactstrap";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

class PracticeSolve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      member_id: 0,
      current_problem: 0,
      problem_id: [3,1,2], //[30, 71, 100, 104, 107],
      problems: [],
      answers: [],
      content: "",
      member_nickname:[],
      remain_time: -1
    };

    this.getLogin();
    this.getProblem();

    this.handleNext = this.handleNext.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    
    setInterval(this.tick, 1000);
  }

  tick = () => {
    if (this.state.current_problem === 0 && this.state.remain_time === -1) {
      this.setState({
        remain_time: this.state.problems[this.state.current_problem].time_limit + 1
      });
    }
    if (this.state.remain_time > 0) {  
      this.setState({
        remain_time: this.state.remain_time - 1
      });
    }
    else {
      if(this.state.current_problem + 1 === this.state.problem_id.length) this.endProblem();
      this.nextProblem();
    }
  }

  nextProblem() {
    if(this.state.current_problem + 1 >= this.state.problems.length) {
      alert("다음 문제가 없습니다.");
      return null;
    }
    this.setState({
      remain_time: this.state.problems[this.state.current_problem + 1].time_limit,
      current_problem: this.state.current_problem + 1
    });
  }

  endProblem() {
    this.props.history.push('/practice-end-page?problem_id=' + this.state.problem_id.join(','));
    window.location.reload();
  }

  handleNext(event) {
    this.nextProblem();
  }

  handleEnd(event) {
    this.endProblem();
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
              member_id: data.member_id
            });
          });
        }
        else {
          alert("로그인 후 이용해주세요.");
          this.props.history.push('/');
        }
      }
    );
  }

  getProblem() {
    var problem_list = [];
    this.state.problem_id.forEach(id => {
      fetch("/api/v1/problems/" + id, {
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
                              data_problem.member_nickname = data_member.nickname;
                              problem_list.push(data_problem);
                              this.setState({problems: problem_list});
                            });
                          }
                        }
                      );
                    });
                  }
                  else {
                    console.log(result.status);
                  }
                }
              );
            });
          }
          else {
            console.log(result.status);
          }
        }
      );
    });
  }

  getProblemList() {
    var ret = [];
    
    ret.push(
    <ListGroupItem>
      <h5 className="text-center">문제풀이 현황</h5>
    </ListGroupItem>
    );

    ret.push(
      <ListGroupItem>
        <h5 className="text-center">{this.state.current_problem + 1} / {this.state.problems.length}</h5>
      </ListGroupItem>
    );

    return ret;
  }

  getProblemInfo() {
    var ret = [];
    if(this.state.current_problem >= this.state.problems.length) {
      return <h1 className="display-3 text-center">로딩 중입니다.</h1>;
    }

    var problem = this.state.problems[this.state.current_problem];
    //Header
    ret.push(<br />);
    //ret.push(<h1 className="display-3 text-center">{this.state.problems.title}</h1>);
    
    ret.push(
      <Row>
        <Col xs="4">
          <h5 className="text-left">
            No. {problem.problem_id}
          </h5>
          출처 : {problem.reference}
          {/*<Badge className="text-uppercase" color="primary" pill>
            {this.getCategoryName(this.state.problems.category_id)}
          </Badge>*/}
        </Col>
        <Col xs="4" />
        <Col xs="4">
          <div className="text-right">
            제한 시간 : {problem.time_limit}초
            <br />
            작성자 : {problem.member_id}
            <br />
            난이도 : {problem.difficulty}단계
            <Progress max="5" value={problem.difficulty} color="default" />
          </div>
        </Col>
      </Row>
    );

    ret.push(<hr />);

    //Body
    ret.push(
      <p className="lead">
        <div dangerouslySetInnerHTML={{ __html: problem.content }} />
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
                {problem.hint}
              </PopoverBody>
            </UncontrolledPopover>
        </div>
    )

    ret.push(<hr />);
    ret.push(
      <h3>
        남은 시간 : {this.state.remain_time}초
        <br />
        <Progress max={problem.time_limit} value={this.state.remain_time} color="danger" />
      </h3>
    );

    return ret;
  }

  render() {
    return (
      <>
        <SimpleNavbar />
        <main ref="main">
          <Template />
          <div className='two'>
            <div className='main'>
              <Container>
                <Card className="card-profile shadow mt--300">
                  <div className="px-6">
                    <Form>
                      <br />
                      {this.getProblemInfo()}
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
                      <div className='right-button'>
                        <Button color='primary' onClick={this.handleNext}>다음 문제</Button>
                      </div>
                      <br />
                    </Form>
                    <br />
                    <br />
                  </div>
                </Card>
              </Container>
            </div>
            <div className='sub'>
              <Card className="card-profile shadow mt--300">
                <Form>
                  <ListGroup>
                    {this.getProblemList()}
                  </ListGroup>
                  <br />
                  <div className='text-center'>
                    <Button color='primary' onClick={this.handleEnd}>풀이종료</Button>
                  </div>
                  <br />
                </Form>
              </Card>
            </div>
          </div>
          <br />
          <br />
        </main>
      </>
    );
  }
}

export default PracticeSolve;