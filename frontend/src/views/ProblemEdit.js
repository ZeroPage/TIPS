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
  Button,
  Card,
  Container,
  Form,
  Input,
  Row,
  Col } from "reactstrap";

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
                  <Container className="mb-5">
                    <br />
                    <h1 className="display-3 text-center">문제 수정</h1>
                    <br />
                    <Row>
                      <Col lg="12">
                        <Input
                          id="exampleFormControlInput1"
                          placeholder="제목"
                          rows="1"
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col lg="6">
                        <Input placeholder="문제 분야" type="text" />
                      </Col>
                      <Col lg="6">
                        <Input placeholder="난이도" type="text" />
                      </Col>
                    </Row>
                    <br />
                    <CKEditor
                      editor={ ClassicEditor }
                      data={"문제 내용"}
                      onInit={ editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log( 'Editor is ready to use!', editor );
                      } }
                      onChange={ ( event, editor ) => {
                          const data = editor.getData();
                          console.log( { event, editor, data } );
                      } }
                      onBlur={ ( event, editor ) => {
                          console.log( 'Blur.', editor );
                      } }
                      onFocus={ ( event, editor ) => {
                          console.log( 'Focus.', editor );
                      } }
                    />
                    <br />
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
                    </div>
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

export default ProblemEdit;
