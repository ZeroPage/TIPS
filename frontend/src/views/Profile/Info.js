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
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      member_id: "",
      username: "",
      nickname: "",
      email: "",
      password: "",
      passwordcheck: "",
      created: "",
      isAdmin: false,
      isPrime: false,
      check: ""
    };

    fetch("/api/v1/members", {
    method: 'GET',
    headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
    (result) => {
      if(result.ok)
      {
        result.json().then(data => {
          this.setState({
          isLogin: true,
          member_id: data.member_id,
          username: data.username,
          nickname: data.nickname,
          email: data.email,
          created: data.created,
          isAdmin: data.is_admin,
          isPrime: data.is_prime
          });
        });
      }
    });

    this.handleNickname = this.handleNickname.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordcheck = this.handlePasswordcheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  
  handleNickname(event) {
    this.setState({nickname: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handlePasswordcheck(event) {
    this.setState({passwordcheck: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    //check form
    if(this.state.nickName === "")
    {
      this.setState({check: <><br /><Alert className="alert-danger">닉네임이 비어있습니다.</Alert></>});
      return;
    } 
    if (this.state.password === "" || this.state.password.length < 4) {
      this.setState({check: <><br /><Alert className="alert-danger">암호 길이는 최소 4자 이상이어야 합니다.</Alert></>});
      return;
    }
    else if (this.state.password !== this.state.passwordCheck) {
      this.setState({check: <><br /><Alert className="alert-danger">암호 확인이 일치하지 않습니다.</Alert></>});
      return;
    }

    fetch("/api/v1/members", {
    method: 'PUT',
    headers: {
        "Content-Type": "application/json"
      }
    })
    .then(
    (result) => {
      if(result.ok)
      {
        result.json().then(data => {
          this.setState({
          isLogin: true,
          member_id: data.member_id,
          username: data.username,
          nickname: data.nickname,
          email: data.email,
          created: data.created,
          isAdmin: data.is_admin,
          isPrime: data.is_prime
          });
        });
      }
    });

    fetch("/api/v1/members", {
      method: 'POST',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "nickname": this.state.nickName,
        "password": this.state.password
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.success === "ok")
        {
          this.props.history.push('/');
          return;
        }
        else
        {
          console.log(result);
          return;
        }
      },
      (error) => {
        console.log(error);
      }
    )
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
                <br />
                <h1 className="display-3 text-center">회원정보 수정</h1>
                {this.state.check}
                <br />
                <Form role="form">
                    <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-single-02" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="아이디" type="text" value={this.state.username} />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-circle-08" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="닉네임" type="text" value={this.state.nickname} onChange={this.handleNickname} />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-email-83" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="E-mail" type="email" value={this.state.email} />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="비밀번호"
                            type="password"
                            autoComplete="off"
                            value={this.state.password}
                            onChange={this.handlePassword}
                        />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="비밀번호 확인"
                            type="password"
                            autoComplete="off"
                            value={this.state.passwordcheck}
                            onChange={this.handlePasswordcheck}
                        />
                        </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                        <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        //onClick={this.handleSubmit}
                        >
                        회원정보 수정
                        </Button>
                    </div>
                </Form>
              </div>
              <br />
            </Card>
          </Container>
          <br />
          <br />
        </main>
      </>
    );
  }
}

export default ProfileInfo;
