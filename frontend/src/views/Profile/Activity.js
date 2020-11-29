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
import { Card, Container } from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";
import Template from "views/Template.js";

class ProfileActivity extends React.Component {
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
              <div className="px-4">
                <br />
                <h1 className="display-3 text-center">활동 내역</h1>
                <br />
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

export default ProfileActivity;
