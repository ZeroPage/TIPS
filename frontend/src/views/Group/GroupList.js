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
  Button, Card, Container, Form, Input, ListGroup, ListGroupItem, Row, Col
} from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      group_name: "",
      group_desc: "",
      is_login: false,
      is_edit: false
    };

    this.getLogin();
    this.getGroup();

    this.changeAdd = this.changeAdd.bind(this);
    this.handleGroupName = this.handleGroupName.bind(this);
    this.handleGroupDesc = this.handleGroupDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleGroupName(event) {
    this.setState({group_name: event.target.value});
  }
  handleGroupDesc(event) {
    this.setState({group_desc: event.target.value});
  }

  handleSubmit(event) {
    fetch("/api/v1/classes", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": this.state.group_name,
        "description": this.state.group_desc
      })
    })
    .then(
      (result) => {
        if(result.ok) {
          alert("그룹 추가가 완료되었습니다.");
          window.location.reload();
        }
        else {
          alert("그룹을 추가할 수 없습니다.");
          console.log(result.statusText);
        }
      }
    );
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
              is_login: true
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

  getGroup() {
    fetch("/api/v1/classes", {
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
              items: data.results
            });
          });
        }
      }
    );
  }

  getList() {
    var ret = [];
    this.state.items.forEach(item => {
      ret.push(
        <ListGroupItem>
          <Row>
            <Col xs="3">No. {item.class_id}</Col>
            <Col xs="9">
              <a href={"/group-view-page/" + item.class_id}>
                {item.name}
              </a>
              <Row>
                <Col xs="8">{item.description}</Col>
                <Col xs="4">게시일 : {item.created.substring(0, 10)}</Col>
              </Row>
            </Col>
          </Row>
          
        </ListGroupItem>
      );
    });
    return ret;
  }

  changeAdd() {
    this.setState({is_edit: true});
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
                  <h1 className="display-3 text-center">그룹 목록</h1>
                  <Container>
                    <br />
                    <ListGroup>
                      {this.getList()}
                    </ListGroup>
                    <hr />
                    <Button color="primary" size="lg" onClick={this.changeAdd} block>
                      그룹 추가하기
                    </Button>
                    {
                      this.state.is_edit &&
                      <Row>
                        <Col xs="10">
                          <br />
                          <Input placeholder="그룹명" type="text" value={this.state.group_name} onChange={this.handleGroupName} />
                          <br />
                          <Input placeholder="그룹 설명" type="text" value={this.state.group_desc} onChange={this.handleGroupDesc} />
                        </Col>
                        <Col xs="2">
                          <div className="text-right">
                            <Button
                              className="mt-4"
                              color="default"
                              type="button"
                              onClick={this.handleSubmit}
                            >
                              그룹 추가
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    }
                    <br />
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

export default GroupList;
