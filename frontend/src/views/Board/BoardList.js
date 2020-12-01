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
import queryString from 'query-string';

// reactstrap components
import { Button, Badge, Card, Container, Form, Row, Col,
  FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText,
  ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink, Progress } from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

class BoardList extends React.Component {
  constructor(props) {
    super(props);

    const { search } = this.props.location;
    const queryObj = queryString.parse(search);
    const { category_id, page, order, search_text } = queryObj;

    this.state = {
      board_id: this.props.match.params.id,
      category_id: category_id,
      page: page,
      order: order,
      search: search_text,
      search_text: search_text,
      items: [],
      categories: [],
      count: 0,
      is_admin: false,
      is_prime: false
    };

    this.getLogin();
    this.getCategory();
    this.getDocument();

    this.handleCategoryId = this.handleCategoryId.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleCategoryId(event) {
    this.setState({category_id: event.target.value});
    this.redirect(event.target.value, this.state.page, this.state.order, this.state.search);
  }

  handleSearchText(event) {
    this.setState({search_text: event.target.value});
  }

  redirectUrl(category_id, page, order, search) {
    var redirect_url = "?";
    if(category_id) redirect_url = redirect_url + `category_id=${category_id}&`;
    if(page) redirect_url = redirect_url + `page=${page}&`;
    if(order) redirect_url = redirect_url + `order=${order}&`;
    if(search) redirect_url = redirect_url + `search_text=${search}&`;
    return redirect_url;
  }

  redirect(category_id, page, order, search) {
    this.props.history.push(this.redirectUrl(category_id, page, order, search));
    window.location.reload();
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
        else {
          alert("로그인 후 이용해주세요.");
          this.props.history.push('/');
        }
      }
    );
  }

  getCategory() {
    var fetch_url = "/api/v1/boards/" + this.state.board_id + "/categories";
    console.log(fetch_url);
    fetch(fetch_url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok) {
          result.json().then(data => {
            console.log(data.results);
            this.setState({categories: data.results});
          });
        }
      }
    );
  }

  getDocument() {
    var fetch_url = `/api/v1/documents?board_id=${this.state.board_id}&`;
    if(parseInt(this.state.category_id)) fetch_url = fetch_url + `category_id=${this.state.category_id}&`;
    if(parseInt(this.state.page)) fetch_url = fetch_url + `page=${this.state.page}&`;
    if(this.state.order) fetch_url = fetch_url + `order=${this.state.order}&`;
    if(this.state.search) fetch_url = fetch_url + `search=${this.state.search}&`;

    fetch(fetch_url, {
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
    if(!find_id) return "전체";

    for(var i=0;i<this.state.categories.length;i++) {
      if(this.state.categories[i].category_id === find_id) {
        return this.state.categories[i].name;
      }
    }
    return "";
  }

  getList() {
    var ret = [];
    this.state.items.forEach(item => {
      ret.push(
        <ListGroupItem>
          <Row>
            <Col xs="12">
              <Row>
                <Col xs="3">No. {item.document_id}</Col>
                <Col xs="9">
                  <a href={`/board-view-page/${item.document_id}`}>
                    {item.title}
                  </a>
                </Col>
              </Row>
              <Row>
                <Col xs="8">
                  <Badge className="text-uppercase" color="primary" pill>
                    {this.getCategoryName(parseInt(item.category_id))}
                  </Badge>
                </Col>
                <Col xs="4">
                  <div className="text-right">
                    게시일 : {item.created.substring(0, 10)}
                  </div>
                </Col>
              </Row>
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
    var page_id = parseInt(this.state.page);
    if(!page_id) page_id = 1; //id값이 없으면 기본값 1

    var ret = [];
    ret.push(
      <PaginationItem>
        <PaginationLink first href={this.redirectUrl(this.state.category_id, 1, this.state.order, this.state.search)} />
      </PaginationItem>
    );
    if(page_id != 1) {
      ret.push(
        <PaginationItem>
          <PaginationLink previous href={this.redirectUrl(this.state.category_id, page_id - 1, this.state.order, this.state.search)} />
        </PaginationItem>
      );
    }

    for(var id = Math.max(page_id - PAGE_NUM, 1);id <= Math.min(page_id + PAGE_NUM, TOTAL_PAGE);id++) {
      if(page_id == id) {
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
            <PaginationLink href={this.redirectUrl(this.state.category_id, id, this.state.order, this.state.search)}>
              {id}
            </PaginationLink>
          </PaginationItem>
          );
      }

      if(id % 10 == 0) {
        ret.push(<br />);
      }
    }

    if(page_id != TOTAL_PAGE) {
      ret.push(
        <PaginationItem>
          <PaginationLink next href={this.redirectUrl(this.state.category_id, page_id + 1, this.state.order, this.state.search)} />
        </PaginationItem>
      );
    }
    ret.push(
      <PaginationItem>
        <PaginationLink last href={this.redirectUrl(this.state.category_id, TOTAL_PAGE, this.state.order, this.state.search)} />
      </PaginationItem>
    );

    return ret;
  }

  addCategory() {
    var ret = [];
    
    ret.push(
      <option value={0}>
        전체
      </option>
    );

    for(var i=0;i<this.state.categories.length;i++) {
      ret.push(
        <option key={this.state.categories[i].category_id} value={this.state.categories[i].category_id}>
          {this.state.categories[i].name}
        </option>
      );
    }

    return ret;
  }

  getBoard() {
    if(this.state.board_id == 1) return "공지";
    if(this.state.board_id == 2) return "자유";
    if(this.state.board_id == 3) return "QnA";
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
                  <h1 className="display-3 text-center">{this.getBoard()} 게시글 목록</h1>
                  <Container>
                    <Row>
                      <Col xs="4">
                      <Input type="select" value={this.state.category_id} onChange={this.handleCategoryId}>
                        {this.addCategory()}
                      </Input>
                      </Col>
                      <Col>
                        <div className="text-right">
                          <Button disabled={false}>
                            추천순
                          </Button>
                          <Button disabled={false}>
                            최신순
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <ListGroup>
                      {this.getList()}
                    </ListGroup>
                    <Row>
                      <Col>
                        <br />
                        <Row>
                          <Col xs="8">
                            <FormGroup>
                              <InputGroup className="mb-4">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-zoom-split-in" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Search" type="text" value={this.state.search_text} onChange={this.handleSearchText}/>
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col xs="4">
                            <Button color="default" type="button"
                              href={this.redirectUrl(this.state.category_id, this.state.page, this.state.order, this.state.search_text)}>
                              검색
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                      {
                        (this.state.board_id != 1 || this.state.is_admin || this.state.is_prime) &&
                        <div className="text-right">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            href={"/board-edit-page?board_id=" + this.state.board_id}
                          >
                            게시글 추가
                          </Button>
                        </div>
                      }
                      </Col>
                    </Row>
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

export default BoardList;
