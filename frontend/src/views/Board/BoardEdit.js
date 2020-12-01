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
import queryString from "query-string";

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

class BoardEdit extends React.Component {
  constructor(props) {
    super(props);

    const { search } = this.props.location;
    const queryObj = queryString.parse(search);
    const { board_id } = queryObj;

    this.state = {
      board_id: parseInt(board_id),
      document_id: this.props.match.params.id,
      category_id: 1,
      categories: [],
      title: "",
      content: "",
      reference: ""
    };

    this.handleCategoryId = this.handleCategoryId.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleReference = this.handleReference.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleTitle(event) {
    this.setState({title: event.target.value});
  }
  
  handleCategoryId(event) {
    this.setState({category_id: event.target.value});
  }


  handleReference(event) {
    this.setState({reference: event.target.value});
  }

  redirect() {
    if(!this.state.document_id) {
      this.props.history.push('/board-view-page/' + this.state.document_id);
    }
    this.props.history.push('/board-list-page/' + this.state.board_id);
  }

  handleSubmit(event) {
    event.preventDefault();

    //check form
    if(!this.state.title) {
      alert("제목이 비어있습니다.");
      return;
    }
    if(this.state.category_id === "") {
      alert("카테고리가 비어있습니다.");
      return;
    } 
    if (this.state.reference === "") {
      alert("출처가 비어있습니다.");
      return;
    }

    if(this.state.document_id) {
      fetch("/api/v1/documents/" + this.state.document_id, {
        method: 'PUT',
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category_id: this.state.category_id,
          title: this.state.title,
          content: this.state.content,
          reference: this.state.reference
        })
      })
      .then(
        (result) => {
          if(result.ok) {
            alert("게시글 수정이 완료되었습니다.");
            this.redirect();
            return;
          }
          else {
            alert("게시글 수정에 실패하였습니다.");
            return;
          }
        },
        (error) => {
          alert("게시글 수정에 실패하였습니다.");
          console.log(error);
        }
      )
    }
    else {
      fetch("/api/v1/documents", {
        method: 'POST',
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          board_id: this.state.board_id,
          category_id: this.state.category_id,
          title: this.state.title,
          content: this.state.content,
          reference: this.state.reference
        })
      })
      .then(
        (result) => {
          if(result.ok) {
            alert("게시글 추가가 완료되었습니다.");
            this.redirect();
            return;
          }
          else {
            alert("게시글 추가에 실패하였습니다.");
            return;
          }
        },
        (error) => {
          alert("게시글 추가에 실패하였습니다.");
          console.log(error);
        }
      )
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    
    this.getCategory();
    if(this.state.document_id) this.getDocumentData();
  }

  getCategory() {
    fetch(`/api/v1/boards/${this.state.board_id}/categories`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok) {
          result.json().then(data => {
            console.log(data);
            this.setState({categories: data.results});
            return;
          });
        }
      }
    )
  }

  getDocumentData() {
    fetch("/api/v1/documents/" + this.state.document_id, {
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
              board_id: data.board_id,
              document_id: data.document_id,
              category_id: data.category_id,
              title: data.title,
              content: data.content,
              reference: data.reference
            });
            return;
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
                    {!this.state.document_id && <h1 className="display-3 text-center">게시글 추가</h1>}
                    {this.state.document_id && <h1 className="display-3 text-center">게시글 수정</h1>}
                    <br />
                    <Row>
                      <Col lg="3">
                        <Input type="select" name="분류 선택" value={this.state.category_id} onChange={this.handleCategoryId}>
                          {
                            this.state.categories &&
                            this.state.categories.map(item => (
                              <option value={item.category_id}>
                                {item.name}
                              </option>
                            ))
                          }
                        </Input>
                        </Col>
                    </Row>
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
                        <Input placeholder="출처" type="text" value={this.state.reference} onChange={this.handleReference} />
                      </Col>
                    </Row>
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
                        href={this.state.document_id ? ('/board-view-page/' + this.state.document_id) : ('/board-list-page/' + this.state.board_id)}
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

export default BoardEdit;
