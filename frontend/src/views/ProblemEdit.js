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

class ProblemEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      memberId: 1,
      categoryId: 1,
      timeLimit: "",
      reference: "",
      content: "",
      problemId: this.props.match.params.id,
      check: ""
    };

    if(this.state.problemId === undefined) {
      this.state.problemId = 0;
    }

    this.handleTitle = this.handleTitle.bind(this);
    this.handleMemberId = this.handleMemberId.bind(this);
    this.handleCategoryId = this.handleCategoryId.bind(this);
    this.handleTimeLimit = this.handleTimeLimit.bind(this);
    this.handleReference = this.handleReference.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitle(event) {
    this.setState({title: event.target.value});
  }

  handleMemberId(event) {
    this.setState({memberId: event.target.value});
  }
  
  handleCategoryId(event) {
    this.setState({categoryId: event.target.value});
  }

  handleTimeLimit(event) {
    this.setState({timeLimit: event.target.value});
  }

  handleReference(event) {
    this.setState({reference: event.target.value});
  }

  redirect = () => {
    if(this.state.problemId !== 0) {
      this.props.history.push('/problem-view-page/'+this.state.problemId);
    }
    this.props.history.push('/problem-list-page');
  }

  handleSubmit(event) {
    event.preventDefault();

    //check form
    if(this.state.title === "")
    {
      this.setState({check: <><br /><Alert className="alert-danger">제목이 비어있습니다.</Alert></>});
      return;
    }
    if(this.state.categoryId === "")
    {
      this.setState({check: <><br /><Alert className="alert-danger">분류가 비어있습니다.</Alert></>});
      return;
    } 
    if (this.state.timeLimit === "") {
      this.setState({check: <><br /><Alert className="alert-danger">시간 제한이 비어있습니다.</Alert></>});
      return;
    }
    if (this.state.reference === "") {
      this.setState({check: <><br /><Alert className="alert-danger">출처가 비어있습니다.</Alert></>});
      return;
    }

    if(this.state.problemId !== 0) {
      fetch("http://localhost:3000/api/v1/problem/" + this.state.problemId, {
        method: 'PUT',
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'title': this.state.title,
          'category_id': this.state.categoryId,
          'time_limit': this.state.timeLimit,
          'reference': this.state.reference,
          'content': this.state.content
        })
      })
      .then(res => res.json())
      .then(
        (result) => {
          if(result.success === "ok") {
            this.setState({check: <><br /><Alert className="alert-success">문제 수정이 완료되었습니다</Alert></>});
            setInterval(() => this.redirect(), 2000);
            return;
          }
          else {
            this.setState({check: <><br /><Alert className="alert-danger">서버와 연결 과정에서 에러가 발생했습니다.</Alert></>});
            return;
          }
        },
        (error) => {
          this.setState({check: <><br /><Alert className="alert-danger">서버와 연결 과정에서 에러가 발생했습니다.</Alert></>});
          console.log(error);
        }
      )
    }
    else {
      fetch("http://localhost:3000/api/v1/problem", {
        method: 'POST',
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'title': this.state.title,
          'category_id': this.state.categoryId,
          'member_id': this.state.memberId,
          'time_limit': this.state.timeLimit,
          'reference': this.state.reference,
          'content': this.state.content
        })
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          if(result.success === "ok") {
            this.setState({check: <><br /><Alert className="alert-success">문제 추가가 완료되었습니다</Alert></>});
            setInterval(() => this.redirect(), 2000);
            return;
          }
          else {
            this.setState({check: <><br /><Alert className="alert-danger">서버와 연결 과정에서 에러가 발생했습니다.</Alert></>});
            return;
          }
        },
        (error) => {
          this.setState({check: <><br /><Alert className="alert-danger">서버와 연결 과정에서 에러가 발생했습니다.</Alert></>});
          console.log(error);
        }
      )
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    if(this.state.problemId !== 0)
    {
      fetch("http://localhost:3000/api/v1/problem" + this.state.problemId, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          if(result.success === "ok")
          {
            this.setState({
              title: result.title,
              memberId: result.member_id,
              categoryId: result.category_id,
              timeLimit: result.time_limit,
              reference: result.reference,
              content: result.content
            });
            return;
          }
          else return;
        },
        (error) => console.log(error)
      )
    }
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
              <div className="px-4">
                <Form>
                  <Container className="mb-5">
                    <br />
                    {this.state.problemId === 0 && <h1 className="display-3 text-center">문제 추가</h1>}
                    {this.state.problemId !== 0 && <h1 className="display-3 text-center">문제 수정</h1>}
                    {this.state.check}
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
                        <Input placeholder="문제 분야" type="text" value={this.state.categoryId} onChange={this.handleCategoryId} />
                      </Col>
                      <Col lg="4">
                        <Input placeholder="시간 제한" type="text" value={this.state.timeLimit} onChange={this.handleTimeLimit} />
                      </Col>
                      <Col lg="4">
                        <Input placeholder="출처" type="text" value={this.state.reference} onChange={this.handleReference} />
                      </Col>
                    </Row>
                    <br />
                    <CKEditor
                      editor={ ClassicEditor }
                      data={ "문제 내용" }
                      onChange={ ( event, editor ) => {
                          let data = editor.getData();
                          this.setState({content: data});
                      }}
                    />
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
                        href={this.state.problemId === 0 ? "/problem-list-page" : "/problem-view-page/" + this.state.problemId}
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
