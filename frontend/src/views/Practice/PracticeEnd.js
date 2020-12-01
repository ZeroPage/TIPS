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
import {
  Button, Card, Container, Form, ListGroup, ListGroupItem, Row, Col
} from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

class PracticeEnd extends React.Component {
  constructor(props) {
    super(props);
    const { search } = this.props.location;
    const queryObj = queryString.parse(search);
    const { problem_id } = queryObj;

    this.state = {
      problem_id: problem_id.split(',')
    };

    console.log(problem_id.split(','));
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  getProblemList() {
    var ret = [];
    var cnt = 1;
    this.state.problem_id.forEach(id => {
      ret.push(
        <ListGroupItem>
          <h5 className="text-center">
            <a href={"/problem-view-page/" + id}>
              {cnt}번 문제 풀러가기
            </a>
          </h5>
        </ListGroupItem>
      );
      cnt++;
    });
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
                  <br />
                  <br />
                  <h1 className="text-center">
                    수고하셨습니다!
                  </h1>
                  <h5 className="text-center">
                    문제의 정답을 확인해보세요.
                  </h5>
                  <br/>
                  <Row>
                    <Col xs="3" />
                    <Col xs="6">
                      <ListGroup>
                        {this.getProblemList()}
                      </ListGroup>
                    </Col>
                    <Col xs="3" />
                  </Row>
                  <br />
                  <div className='end-button text-center'>
                    <Button color = 'primary' href="/">모의고사 종료</Button>
                  </div>
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

export default PracticeEnd;