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
  CardBody,
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

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      nickName: "",
      email: "",
      password: "",
      passwordCheck: ""
    };

    this.handleUserName = this.handleUserName.bind(this);
    this.handleNickName = this.handleNickName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordCheck = this.handlePasswordCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleUserName(event) {
    this.setState({userName: event.target.value});
  }
  
  handleNickName(event) {
    this.setState({nickName: event.target.value});
  }

  handleEmail(event) {
    this.setState({email: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handlePasswordCheck(event) {
    this.setState({passwordCheck: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    //check form
    if(this.state.userName === "")
    {
      alert("아이디가 비어있습니다.");
      return;
    }
    if(this.state.nickName === "")
    {
      alert("닉네임이 비어있습니다.");
      return;
    } 
    if(this.state.email === "")
    {
      alert("이메일이 비어있습니다.");
      return;
    } 
    if (this.state.password === "" || this.state.password.length < 4) {
      alert("암호 길이는 4자 이상이어야 합니다.");
      return;
    }
    else if (this.state.password !== this.state.passwordCheck) {
      alert("암호 확인이 일치하지 않습니다.");
      return;
    }

    fetch("/api/v1/members", {
      method: 'POST',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": this.state.userName,
        "nickname": this.state.nickName,
        "email": this.state.email,
        "password": this.state.password
      })
    })
    .then(
      (result) => {
        if(result.ok)
        {
          alert("회원가입이 완료되었습니다.");
          this.props.history.push('/');
          return;
        }
        else
        {
          alert("회원가입에 실패하였습니다.");
          console.log(result);
          return;
        }
      },
      (error) => {
        this.setState({check: <><br /><Alert className="alert-danger">서버와 연결 과정에서 에러가 발생했습니다.</Alert></>});
        console.log(error);
      }
    )
  }

  render() {
    let password = () => {
      if (this.state.password === "" || this.state.password.length < 4) {
        return <small className="text-danger">암호 길이는 최소 4자 이상이어야 합니다.</small>;
      }
      else if (this.state.password !== this.state.passwordCheck) {
        return <small className="text-danger">암호 확인이 일치하지 않습니다.</small>;
      }
      return <small className="text-success">암호 확인이 일치합니다.</small>;
    };
    return (
      <>
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <h1 className="display-3 text-center">TIPS 회원가입</h1>
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
                            <Input placeholder="아이디" type="text" value={this.state.userName} onChange={this.handleUserName} onBlur={} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="닉네임" type="text" value={this.state.nickName} onChange={this.handleNickName} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="E-mail" type="email" value={this.state.email} onChange={this.handleEmail} />
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
                              value={this.state.passwordCheck}
                              onChange={this.handlePasswordCheck}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-muted font-italic">
                          {password()}
                        </div>
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            onClick={this.handleSubmit}
                          >
                            회원가입
                          </Button>
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            href="/"
                          >
                            메인으로
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Register;
