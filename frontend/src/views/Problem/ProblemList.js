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
import { Button, Badge, Card, Container, Form, Row, Col, ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink, Progress } from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
      count: 0,
      is_admin: false,
      is_prime: false,
      is_popular: true
    };

    this.getLogin();
    this.getCategory();
    this.getProblem();
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
              is_admin: data.is_admin,
              is_prime: data.is_prime
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
    fetch("/api/v1/problems", {
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
              items: data.results,
              count: parseInt(data.total_count)
            });
          });
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

  getDifficulty(problem_id) {
    var ret = 0;
    /*fetch("/api/v1/difficulty", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'problem_id': problem_id
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

  getList() {
    var ret = [];
    this.state.items.forEach(item => {
      var difficulty = this.getDifficulty(item.problem_id);
      ret.push(
        <ListGroupItem>
          <Row>
            <Col xs="10">
              <Row>
                <Col xs="3">No. {item.problem_id}</Col>
                <Col xs="9">
                  <a href={"/problem-view-page/" + item.problem_id}>
                    {item.title}
                  </a>
                </Col>
              </Row>
              <Row>
                <Col xs="8">
                  <Badge className="text-uppercase" color="primary" pill>
                    {this.getCategoryName(item.category_id)}
                  </Badge>
                </Col>
                <Col xs="4">게시일 : {item.created.substring(0, 10)}</Col>
              </Row>
            </Col>
            <Col xs="0">
              {/* 성공/실패 여부 넣기 */}
            </Col>
            <Col xs="2">
              난이도 : {difficulty}단계
              <Progress max="5" value={difficulty} color="default" />
            </Col>
          </Row>
        </ListGroupItem>
      );
    });
    return ret;
  }

  getPagination() {
    const TOTAL_PAGE = parseInt(this.state.count / 10) + 1;
    const PAGE_NUM = 2;
    var pageid = parseInt(this.props.match.params.id);
    if(!pageid) pageid = 1; //id값이 없으면 기본값 1

    var ret = [];
    ret.push(
      <PaginationItem>
        <PaginationLink first href={"/problem-list-page/" + 1} />
      </PaginationItem>
    );
    if(pageid != 1) {
      ret.push(
        <PaginationItem>
          <PaginationLink previous href={"/problem-list-page/" + (pageid - 1)} />
        </PaginationItem>
      );
    }

    for(var id = Math.max(pageid - PAGE_NUM, 1);id <= Math.min(pageid + PAGE_NUM, TOTAL_PAGE);id++) {
      if(pageid == id) {
        ret.push(
        <PaginationItem active>
          <PaginationLink>
            {id}
          </PaginationLink>
        </PaginationItem>
        );
      }
      else {
        ret.push(
          <PaginationItem>
            <PaginationLink href={"/problem-list-page/" + id}>
              {id}
            </PaginationLink>
          </PaginationItem>
          );
      }

      if(id % 10 == 0) {
        ret.push(<br />);
      }
    }

    if(pageid != TOTAL_PAGE) {
      ret.push(
        <PaginationItem>
          <PaginationLink next href={"/problem-list-page/" + (pageid + 1)} />
        </PaginationItem>
      );
    }
    ret.push(
      <PaginationItem>
        <PaginationLink last href={"/problem-list-page/" + TOTAL_PAGE} />
      </PaginationItem>
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
              <div className="px-4">
                <Form>
                  <br />
                  <h1 className="display-3 text-center">문제 목록</h1>
                  <Container>
                    <Row xs="3">
                      <Col>
                        <br />
                        <Button disabled={this.state.is_popular}>
                          인기순
                        </Button>
                        <Button disabled={!this.state.is_popular}>
                          최신순
                        </Button>
                      </Col>
                      <Col />
                      <Col>
                      {
                        (this.state.is_admin || this.state.is_prime) &&
                        <div className="text-right">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            href="/problem-edit-page"
                          >
                            문제 추가
                          </Button>
                        </div>
                      }
                      </Col>
                    </Row>
                    <br />
                    <ListGroup>
                      {this.getList()}
                    </ListGroup>
                    <br />
                    <Row xs="3">
                      <Col />
                      <Pagination>
                        {this.getPagination()}
                      </Pagination>
                      <Col />
                    </Row>
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

export default ProblemList;
