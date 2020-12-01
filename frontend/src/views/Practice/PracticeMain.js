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
  Button, Card, Container, Form
} from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

class PracticeMain extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
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
                <br />
                <br />
                <h1 className="text-center">모의고사 페이지</h1>
                <br />
                <h5 className="text-center">
                  면접 문제들을 시간 제한과 함께 풀어볼 수 있는 모의고사 페이지입니다.
                </h5>
                <br />
                <br />
                </Form>
              </div>
              <Button color = 'primary' href="/practice-solve-page">
                모의고사 시작
              </Button>
            </Card>
          </Container>
        </main>
      </>
    );
  }
}

export default PracticeMain;