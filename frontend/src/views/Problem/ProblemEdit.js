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
  Alert,
  Button,
  Card,
  Container,
  Form,
  Input,
  Row,
  Col } from "reactstrap";

// CKEditor component
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

class ProblemEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: 1,
      categories: [],
      title: "",
      content: "",
      time_limit: "",
      reference: "",
      hint: "",
      problem_id: this.props.match.params.id
    };
    this.getLogin();

    this.handleTitle = this.handleTitle.bind(this);
    this.handleCategoryId = this.handleCategoryId.bind(this);
    this.handleTimeLimit = this.handleTimeLimit.bind(this);
    this.handleReference = this.handleReference.bind(this);
    this.handleHint = this.handleHint.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    this.getCategory();
    if(this.state.problem_id) this.getProblem();
  }

  handleTitle(event) {
    this.setState({title: event.target.value});
  }
  handleCategoryId(event) {
    this.setState({category_id: event.target.value});
  }
  handleTimeLimit(event) {
    this.setState({time_limit: event.target.value});
  }
  handleReference(event) {
    this.setState({reference: event.target.value});
  }
  handleHint(event) {
    this.setState({hint: event.target.value});
  }

  redirect = () => {
    if(!this.state.problem_id) this.props.history.push('/problem-list-page');
    else this.props.history.push('/problem-view-page/'+this.state.problem_id);
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.title === "")
    {
      alert("제목이 비어있습니다.");
      return;
    }
    if(this.state.category_id === "")
    {
      alert("카테고리가 비어있습니다.");
      return;
    } 
    if (this.state.time_limit === "") {
      alert("시간 제한이 비어있습니다.");
      return;
    }
    if (this.state.reference === "") {
      alert("출처가 비어있습니다.");
      return;
    }

    if(this.state.problem_id) {
      fetch("/api/v1/problems/" + this.state.problem_id, {
        method: 'PUT',
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'category_id': this.state.category_id,
          'title': this.state.title,
          'content': this.state.content,
          'time_limit': this.state.time_limit,
          'reference': this.state.reference,
          'hint': this.state.hint
        })
      })
      .then(
        (result) => {
          if(result.ok) {
            this.redirect();
            return;
          }
          else {
            alert("서버와 연결 과정에서 에러가 발생했습니다.");
            return;
          }
        },
        (error) => {
          alert("서버와 연결 과정에서 에러가 발생했습니다.");
          console.log(error);
        }
      )
    }
    else {
      fetch("/api/v1/problems", {
        method: 'POST',
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'category_id': this.state.category_id,
          'title': this.state.title,
          'content': this.state.content,
          'time_limit': this.state.time_limit,
          'reference': this.state.reference,
          'hint': this.state.hint
        })
      })
      .then(
        (result) => {
          if(result.ok) {
            this.redirect();
            return;
          }
          else {
            alert("서버와 연결 과정에서 에러가 발생했습니다.");
            return;
          }
        },
        (error) => {
          alert("서버와 연결 과정에서 에러가 발생했습니다.");
          console.log(error);
        }
      )
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
            if(!data.is_admin && !data.is_prime) {
              alert("관리자 혹은 명예 회원 계정으로 로그인 바랍니다.");
              this.redirect();
              return;
            }
          });
        }
        else {
          alert("관리자 혹은 명예 회원 계정으로 로그인 바랍니다.");
          this.redirect();
          return;
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
            this.setState({
              title: data.title,
              content: data.content,
              category_id: data.category_id,
              time_limit: data.time_limit,
              reference: data.reference,
              hint: data.hint
            });
          });
        }
      }
    );
  }

  render() {
    return (
      <>
        <SimpleNavbar />
        <main ref="main">
          <Template />
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Form>
                  <Container className="mb-5">
                    <br />
                    {!this.state.problem_id && <h1 className="display-3 text-center">문제 추가</h1>}
                    {this.state.problem_id && <h1 className="display-3 text-center">문제 수정</h1>}
                    <br />
                    <Row>
                      <Col lg="12">
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="제목"
                          rows="1"
                          value={this.state.title}
                          onChange={this.handleTitle} 
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col lg="4">
                        <Input type="select" name="분류 선택" value={this.state.category_id} onChange={this.handleCategoryId}>
                          {
                            this.state.categories.map(item => (
                              <option value={item.category_id}>
                                {item.name}
                              </option>
                            ))
                          }
                        </Input>
                      </Col>
                      <Col lg="4">
                        <Input placeholder="시간 제한" type="text" value={this.state.time_limit} onChange={this.handleTimeLimit} />
                      </Col>
                      <Col lg="4">
                        <Input placeholder="출처" type="text" value={this.state.reference} onChange={this.handleReference} />
                      </Col>
                    </Row>
                    <br />
                    <CKEditor
                      editor={ClassicEditor}
                      data={this.state.content}
                      onChange={(event, editor) => {
                          let data = editor.getData();
                          this.setState({content: data});
                      }}
                    />
                    <br />
                    <Row>
                      <Col lg="12">
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="힌트"
                          rows="1"
                          value={this.state.hint}
                          onChange={this.handleHint} 
                        />
                      </Col>
                    </Row>
                    <br />
                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        onClick={this.handleSubmit}
                      >
                        작성완료
                      </Button>
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        href={this.state.problem_id ? "/problem-view-page/" + this.state.problem_id : "/problem-list-page"}
                      >
                        돌아가기
                      </Button>
                      <br />
                    </div>
                  </Container>
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

export default ProblemEdit;
