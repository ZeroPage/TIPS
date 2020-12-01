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
  Button, Card, Container, Form, ListGroup, ListGroupItem, Row, Col
} from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_id: parseInt(this.props.match.params.id),
      member_id: 0,
      items: [],
      members: [],
      group_name: "",
      group_desc: "",
      is_login: false,
      is_edit: false
    };

    this.getLogin();
    this.getGroup();

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
    fetch("/api/v1/classes/" + this.state.group_id + "/members", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok) {
          alert("그룹 가입이 완료되었습니다.");
          window.location.reload();
        }
        else {
          alert("그룹 가입에 실패하였습니다.");
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
              member_id: data.member_id,
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
            for(var i=0;i<data.results.length;i++)
            {
              
              if(this.state.group_id === data.results[i].class_id) {
                this.setState({
                  group_name: data.results[i].name,
                  group_desc: data.results[i].description
                });

                break;
              }
            }
          });
        }
      }
    );

    var answer_info = [];
    fetch("/api/v1/classes/" + this.state.group_id + "/members", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
      (result) => {
        if(result.ok) {
          result.json().then(data => {
            data.results.forEach(data_class => {
              fetch("/api/v1/members/" + data_class.member_id, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json"
                }
              })
              .then(
                (result) => {
                  if(result.ok) {
                    result.json().then(member_data => {
                      console.log(data_class);
                      data_class.member_nickname = member_data.nickname;
                      answer_info.push(data_class);
                      this.setState({items: answer_info});
                    });
                  }
                }
              );
            });
          });
        }
      }
    );
  }

  getList() {
    var list = [];
    var is_join = false;

    this.state.items.forEach(item => {
      if(this.state.member_id === item.member_id) {
        is_join = true;
      }

      list.push(
      <ListGroupItem>
        <Row>
          <Col xs="8">{item.member_nickname}</Col>
          <Col xs="4">가입일 : {item.created.substring(0, 10)}</Col>
        </Row>
      </ListGroupItem>
      );
      /*fetch("/api/v1/members/" + item.member_id, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(
        (result) => {
          if(result.ok) {
            result.json().then(data => {
              ret.push(
              <ListGroupItem>
                <Row>
                  <Col xs="8">{data.nickname}</Col>
                  <Col xs="4">가입일 : {item.created.substring(0, 10)}</Col>
                </Row>
              </ListGroupItem>
              );
            });
          }
        }
      );*/
    });

    var ret = [];
    if(!is_join) {
      ret.push(
        <div className="text-right">
          <Button
            className="mt-4"
            color="primary"
            type="button"
            onClick={this.handleSubmit}
          >
            그룹 가입
          </Button>
        </div>
      );
    }

    ret.push(<br />);
    ret.push(
      <ListGroup>
       {list}
      </ListGroup>
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
                  <h1 className="display-3 text-center">{this.state.group_name}</h1>
                  <h5 className="text-center">{this.state.group_desc}</h5>
                  <Container>
                    <br />
                    {this.getList()}
                    <br />
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

export default GroupView;
