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
import { Button, Card, Container, Form, Row, Col } from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isConnect: false,
      isLogin: true
    };
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    fetch("http://localhost:3000/api/v1/problem", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.success === "ok")
        {
          this.setState({
            items: result.problem,
            isConnect: true
          });
          return;
        }
        else return;
      },
      (error) => console.log(error)
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
                <Form>
                  <br />
                    <h1 className="display-3 text-center">문제 목록</h1>
                  <br />
                  <Container>
                    {
                      !this.state.isConnect &&
                      <h1 className="display-3 text-center">로딩 중...</h1>
                    }

                    {
                      this.state.isConnect &&
                      <table class="table-bordered table-striped table">
                      <thead>
                        <tr>
                          <th class="text-center" width="100">No.</th>
                          <th class="text-center">문제 이름</th>
                          <th class="text-center" width="150">분야</th>
                          <th class="text-center" width="100">난이도</th>
                          <th class="text-center" width="200">출제자</th>
                          <th class="text-center" width="100">비고</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.items &&
                        this.state.items.map(item => (
                        <tr>
                          <td>{item.problem_id}</td>
                          <td><a href={"problem-view-page/"+item.problem_id}>{item.title}</a></td>
                          <td>{item.category_id}</td>
                          <td>{item.difficulty}</td>
                          <td>{item.member_id}</td>
                          <td>{}</td>
                        </tr>
                        ))
                      }
                      </tbody>
                      </table>
                    }

                    {
                      this.state.isLogin &&
                      <div className="text-center">
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

export default ProblemList;
