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

// CKEditor component
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";

class ProblemEdit extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <SimpleNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
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
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Form>
                    <br />
                    <br />
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="제목"
                      rows="1"
                      type="text"
                    />
                    <br />
                    <CKEditor
                      id="exampleFormControlEditor"
                      editor={ ClassicEditor }
                    />
                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                      >
                        작성완료
                      </Button>
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        href="/"
                      >
                        돌아가기
                      </Button>
                      <br />
                      <br />
                    </div>
                  </Form>
                </div>
              </Card>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default ProblemEdit;
