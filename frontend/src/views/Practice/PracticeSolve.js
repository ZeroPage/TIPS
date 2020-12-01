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
  Badge, Button, Card, Container, Form, ListGroup, ListGroupItem, Row, Col, PopoverBody, Progress, Table, UncontrolledPopover
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
      problem_id: 3,
      problems: [],
      categories: [],
      answer_count: 0,
      answers: [],
      content: "",
      member_nickname:[],
      remain_time: ""
    };

    this.getLogin();
    this.getProblem();
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    setInterval(this.tick, 1000);
  }

  tick = () => {
    if (this.state.remain_time > 0) {
      this.setState({
        remain_time: this.state.remain_time - 1
      });
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
            this.setState({
              problems: data,
              remain_time: data.time_limit
            });
          });
        }
      }
    );
  }

  getProblemList() {
    var ret = [];
    
    ret.push(
    <ListGroupItem>
      <h5 className="text-center">문제풀이 현황</h5>
    </ListGroupItem>
    );

    for(var i=1;i<=5;i++)
    {
      ret.push(
        <ListGroupItem>
          <Row>
            <Col xs="6">
              <input type="checkbox" checked="true" className='check-box' />
            </Col>
            <Col xs="6">{i}</Col>
          </Row>
        </ListGroupItem>
      );
    }

    return ret;
  }

  getProblemInfo() {
    var ret = [];

    //Header
    ret.push(<br />);
    ret.push(<h1 className="display-3 text-center">{this.state.problems.title}</h1>);
    ret.push(
      <Row>
        <Col xs="4">
          <h5 className="text-left">
            No. {this.state.problem_id}
          </h5>
          출처 : {this.state.problems.reference}
          {/*<Badge className="text-uppercase" color="primary" pill>
            {this.getCategoryName(this.state.problems.category_id)}
          </Badge>*/}
        </Col>
        <Col xs="4" />
        <Col xs="4">
          <div className="text-right">
            제한 시간 : {this.state.problems.time_limit}초
            <br />
            난이도 : {this.getDifficulty()}단계
            <Progress max="5" value={this.getDifficulty()} color="default" />
            {/*
            <br />
            게시일 : {('' + this.state.problems.created).substring(0, 10)}
            <br />
            작성자 : {this.getMemberNickname(this.state.problems.member_id)}
            */}
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
                {this.state.problems.hint}
              </PopoverBody>
            </UncontrolledPopover>
        </div>
    )

    ret.push(<hr />);
    ret.push(
      <h3>
        남은 시간 : {this.state.remain_time}초
        <br />
        <Progress max={this.state.problems.time_limit} value={this.state.remain_time} color="danger" />
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
                        onInit={(event, editor) => {
                          editor.resize_minHeight = 500;
                        }}
                        onChange={(event, editor) => {
                          let data = editor.getData();
                          this.setState({ content: data });
                        }}
                      />
                      <br />
                      <div className='right-button'>
                        <Button color='primary' href="/user-group-page">다음 문제</Button>
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
                    <Button color='primary' href="prac-end-page">풀이종료</Button>
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