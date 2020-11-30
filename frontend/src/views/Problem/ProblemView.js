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
      member_id: 0,
      is_admin: false,
      is_popular: true,
      problems: [],
      categories: [],
      answer_count: 0,
      answers: [],
      content: ""
    };

    this.getLogin();
    this.getCategory();
    this.getProblem();

    this.hanbleShare = this.handleShare.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleAnswerSubmit() {
    fetch("/api/v1/answers/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "problem_id": 0,
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

  handleAnswerDelete() {
    fetch("/api/v1/answers/" + "2", {
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
    )
    console.log(this.value);
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

    fetch("/api/v1/answers", {
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
              answer_count: data.total_count,
              answers: data.results
            });
          });
        }
        else {
          console.log(result.status);
        }
      }
    );
    console.log(this.state.answers);
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
    return member_id;
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
    ret.push(<h1 className="display-3 text-center">{this.state.problems.title}</h1>);
    ret.push(
      <Row>
        <Col xs="4">
          <h5 className="text-left">
            No. {this.state.problem_id}
          </h5>
          출처 : {this.state.problems.reference}
          <br />
          난이도 : {this.getDifficulty()}단계
          <Progress max="5" value={this.getDifficulty()} color="default" />
          <Badge className="text-uppercase" color="primary" pill>
            {this.getCategoryName(this.state.problems.category_id)}
          </Badge>
        </Col>
        <Col xs="4" />
        <Col xs="4">
          <div className="text-right">
            제한 시간 : {this.state.problems.time_limit}초
            <br />
            게시일 : {('' + this.state.problems.created).substring(0, 10)}
            <br />
            작성자 : {this.getMember(this.state.problems.member_id)}
          </div>
          {
            (this.state.member_id === this.state.problems.member_id || this.state.is_admin) &&
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
            <Button color="primary" size="sm" type="button" onClick={this.handleShare} >
              문제 공유
            </Button>
            <Button href='#' color='none'>
              <Row>
                <Col>
                  <i class="fa fa-thumbs-up" aria-hidden="true" />
                  {" "}0
                </Col>
              </Row>
            </Button>
        </div>
    )

    return ret;
  }
  
  getAnswer() {
    var ret = [];

    ret.push(
      <Row xs='2'>
        <Col>
          <h5>총 {this.state.answer_count}개의 답변</h5>
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
    ret.push(<br />);

    this.state.answers.forEach(answer => {
      ret.push(
        <div>
          <Row>
            <Col xs="2">
              <div className="text-center">
                {this.getMember(answer.member_id)}
                <br />
                {('' + answer.created).substring(0, 10)}
                <Button href='#' color='none'>
                  <Row>
                    <Col>
                      <i class="fa fa-thumbs-o-up" aria-hidden="true" />
                      {" "}0
                    </Col>
                  </Row>
                </Button>
              </div>
            </Col>
            <Col xs="9">
              <div class="comment">
                {answer.content}
              </div>
            </Col>
            <Col xs="1">
              {
                this.state.member_id === answer.member_id &&
                <Button value={answer.answer_id} color='none' onClick={this.handleAnswerDelete}>
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
        <Button color="primary" size="lg" href="/problem-solve-page" block>
          답변 더 보기
        </Button>
      );
    }

    ret.push(<hr />);

    if(this.state.member_id !== 0) {
      ret.push(
        <div>
          <h2>풀이작성</h2>
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
                  {this.getAnswer()}
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
