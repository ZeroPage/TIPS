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
import { Button, Card, Container, Form, Input, Row, Col } from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleSearch(event) {
    this.setState({search: event.target.value});
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
                    <h1 className="display-3 text-center">문제 검색</h1>
                  <br />
                  <Input placeholder="검색할 단어를 입력하세요." type="text" value={this.state.search} onChange={this.handleSearch} />
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      href="/"
                    >
                      검색
                    </Button>
                  </div>
                  <br />
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

export default ProblemList;
