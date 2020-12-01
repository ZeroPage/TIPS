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

class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board_id: 0,
      document_id: this.props.match.params.id,
      document: [],
      categories: [],
      comments: [],
      member_id: 0,
      is_admin: false
    };

    this.getLogin();
    this.getDocument();
    this.getCategory();
    this.getComment();
    
    this.hanbleShare = this.handleShare.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDocumentVote = this.handleDocumentVote.bind(this);
    this.handleCommentVote = this.handleCommentVote.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
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
    var result = window.confirm(this.state.document_id + "번 게시물을 삭제하시겠습니까?");  
    if(result)
    {
      fetch("/api/v1/documents/" + this.state.document_id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(
        (result) => {
          if(result.ok) {
            alert("삭제가 완료되었습니다.");
            this.props.history.push('/board-list-page/' + this.state.document.board_id);
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

  handleDocumentVote() {
    fetch("/api/v1/votes", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "document_id": this.state.document_id,
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

  handleCommentVote(event) {
    fetch("/api/v1/votes", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "comment_id": event.target.id,
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

  handleCommentSubmit() {
    fetch("/api/v1/comments", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "document_id": this.state.document_id,
        "content": this.state.content
      })
    })
    .then(
      (result) => {
        if(result.ok) {
          alert("댓글 등록이 완료되었습니다.");
          window.location.reload();
          return;
        }
        else {
          alert("댓글 등록에 실패하였습니다.");
          return;
        }
      },
      (error) => {
        alert("댓글 등록에 실패하였습니다.");
        console.log(error);
        return;
      }
    )
  }

  handleCommentDelete(event) {
    var result = window.confirm("댓글을 삭제하시겠습니까?");  
    if(result)
    {
      fetch("/api/v1/comments/" + event.target.id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(
        (result) => {
          if(result.ok) {
            alert("댓글 삭제가 완료되었습니다.");
            window.location.reload();
            return;
          }
          else {
            alert("댓글 삭제에 실패하였습니다.");
            return;
          }
        },
        (error) => {
          alert("댓글 삭제에 실패하였습니다.");
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
    fetch("/api/v1/boards/" + this.state.document.board_id + "/categories", {
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

  getDocument() {
    fetch("/api/v1/documents/" + this.state.document_id, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok) {
          result.json().then(data_document => {
            fetch("/api/v1/members/" + data_document.member_id, {
              method: 'GET',
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(result => {
              if(result.ok) {
                result.json().then(data_member => {
                  fetch("/api/v1/votes?document_id=" + this.state.document_id, {
                    method: 'GET',
                    headers: {
                      "Content-Type": "application/json"
                    }
                  })
                  .then(
                    (result) => {
                      if(result.ok) {
                        result.json().then(data_vote => {
                          data_document.vote = data_vote.u;
                          data_document.member_nickname = data_member.nickname;
                          this.setState({document: data_document});
                        });
                      }
                    }
                  );
                });
              }
            });
          });
        };
      }
    );
  }

  getComment() {
    var comment_info = [];

    fetch(`/api/v1/comments?document_id=${this.state.document_id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok) {
          result.json().then(data => {
            data.results.forEach(data_comment => {
              fetch("/api/v1/members/" + data_comment.member_id, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json"
                }
              })
              .then(
                (result) => {
                  if(result.ok) {
                    result.json().then(data_member => {
                      fetch("/api/v1/votes?comment_id=" + data_comment.comment_id, {
                        method: 'GET',
                        headers: {
                          "Content-Type": "application/json"
                        }
                      })
                      .then(
                        (result) => {
                          if(result.ok) {
                            result.json().then(data_vote => {
                              data_comment.vote = data_vote.u;
                              data_comment.member_nickname = data_member.nickname;
                              comment_info.push(data_comment);
                              this.setState({comments: comment_info});
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
    console.log(find_id);
    for(var i=0;i<this.state.categories.length;i++) {
      if(this.state.categories[i].category_id === find_id) {
        return this.state.categories[i].name;
      }
    }
  }

  getProblemInfo() {
    var ret = [];

    //Header
    ret.push(<br />);
    ret.push(<h1 className="display-3 text-center">{this.state.document.title}</h1>);
    ret.push(
      <Row>
        <Col xs="4">
          <h5 className="text-left">
            No. {this.state.document_id}
          </h5>
          출처 : {this.state.document.reference}
          <Badge className="text-uppercase" color="primary" pill>
            {this.getCategoryName(this.state.document.category_id)}
          </Badge>
        </Col>
        <Col xs="4" />
        <Col xs="4">
          <div className="text-right">
            게시일 : {('' + this.state.document.created).substring(0, 10)}
            <br />
            작성자 : {this.state.document.member_nickname}
          </div>
          {
            (this.state.member_id === this.state.document.member_id || this.state.is_admin) &&
            <div className="text-right">
              <br />
              <Button color="primary" size="sm" type="button"
                href={"/board-edit-page/" + this.state.document_id + "?board_id=" + this.state.document.board_id}>
                게시물 수정
              </Button>
              <Button color="primary" size="sm" type="button" onClick={this.handleDelete}>
                게시물 삭제
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
        <div dangerouslySetInnerHTML={{ __html: this.state.document.content }} />
      </p>
    );

    ret.push(<br />);
    ret.push(<br />);
    ret.push(<br />);

    ret.push(
        <div className="text-center">
            <Button color="primary" size="sm" type="button" onClick={this.handleShare} >
              게시글 공유
            </Button>
            {
              parseInt(this.state.member_id) !== 0 &&
              <Button id={this.state.document_id} color='none' onClick={this.handleDocumentVote}>
                <Row>
                  <Col>
                    <div>
                      <i class="fa fa-thumbs-o-up" aria-hidden="true" />
                      {" " + this.state.document.vote}
                    </div>
                  </Col>
                </Row>
              </Button>
            }
        </div>
    )

    return ret;
  }
  
  getAnswerInfo() {
    var ret = [];

    ret.push(
      <Row xs='2'>
        <Col>
          <h5>총 {this.state.comments.length}개의 답변</h5>
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

    this.state.comments.forEach(comment => {
      ret.push(
        <div>
          <Row>
            <Col xs="2">
              <div className="text-center">
                {comment.member_nickname}
                <br />
                {('' + comment.created).substring(0, 10)}
                <Button id={comment.comment_id} color='none' onClick={this.handleCommentVote}>
                  <Row>
                    {
                      parseInt(this.state.member_id) !== 0 &&
                      <Col id={comment.comment_id}>
                        <i id={comment.comment_id} class="fa fa-thumbs-o-up" aria-hidden="true" />
                        {" " + comment.vote}
                      </Col>
                    }
                  </Row>
                </Button>
              </div>
            </Col>
            <Col xs="9">
              <div dangerouslySetInnerHTML={{ __html: comment.content }} />
            </Col>
            <Col xs="1">
              {
                this.state.member_id === comment.member_id &&
                <Button id={comment.comment_id} color='none' onClick={this.handleCommentDelete}>
                  ×
                </Button>
              }
            </Col>
          </Row>
          <br />
        </div>
      );
    });

    ret.push(<hr />);

    if(this.state.member_id !== 0) {
      ret.push(
        <div className="text-center">
          <h2>답변 작성</h2>
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
          <Button color='primary' onClick={this.handleCommentSubmit}>
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

export default BoardView;
