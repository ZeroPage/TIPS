import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      category: [],
      isConnect: false,
      isLogin: true,
    };
  }


  render() {
    return (
      <>
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
    </>
    );
  }
}

export default Template;