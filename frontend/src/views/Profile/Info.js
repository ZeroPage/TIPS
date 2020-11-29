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
  Container
} from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

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
    if(this.state.nickname === "")
    {
      this.setState({check: <><br /><Alert className="alert-danger">닉네임이 비어있습니다.</Alert></>});
      return;
    } 
    if (this.state.password === "" || this.state.password.length < 4) {
      this.setState({check: <><br /><Alert className="alert-danger">암호 길이는 최소 4자 이상이어야 합니다.</Alert></>});
      return;
    }
    else if (this.state.password !== this.state.passwordcheck) {
      this.setState({check: <><br /><Alert className="alert-danger">암호 확인이 일치하지 않습니다.</Alert></>});
      return;
    }
    fetch("/api/v1/members", {
      method: 'PUT',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "nickname": this.state.nickname,
        "password": this.state.password
      })
    })
    .then(
      (result) => {
        if(result.ok)
        {
          this.props.history.push('/');
          return;
        }
        else
        {
          this.setState({check: <><br /><Alert className="alert-danger">서버와의 연결이 불안정합니다.</Alert></>});
          return;
        }
      },
      (error) => {
        this.setState({check: <><br /><Alert className="alert-danger">서버와의 연결이 불안정합니다.</Alert></>});
        console.log(error);
      }
    )
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
                        <Input placeholder="아이디" disabled type="text" value={this.state.username} />
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
                        <Input placeholder="E-mail" disabled type="email" value={this.state.email} />
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
                        onClick={this.handleSubmit}
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
