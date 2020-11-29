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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";

import Login from "views/Profile/Login.js";
import Register from "views/Profile/Register.js";
import ProfileInfo from "views/Profile/Info.js";
import ProfileActivity from "views/Profile/Activity.js";

import ProblemList from "views/Problem/ProblemList.js";
import ProblemView from "views/Problem/ProblemView.js";
import ProblemEdit from "views/Problem/ProblemEdit.js";

import BoardList from "views/Board/BoardList.js";
import BoardView from "views/Board/BoardView.js";
import BoardEdit from "views/Board/BoardEdit.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Index {...props} />} />
      
      <Route path="/login-page" exact render={props => <Login {...props} />} />
      <Route path="/register-page" exact render={props => <Register {...props} />} />
      <Route path="/profile-info-page" exact render={props => <ProfileInfo {...props} />} />
      <Route path="/profile-edit-page" exact render={props => <ProfileActivity {...props} />} />

      <Route path="/problem-list-page" exact render={props => <ProblemList {...props} />} />
      <Route path="/problem-list-page/:id" exact render={props => <ProblemList {...props} />} />
      <Route path="/problem-view-page/:id" exact render={props => <ProblemView {...props} />} />
      <Route path="/problem-edit-page" exact render={props => <ProblemEdit {...props} />} />
      <Route path="/problem-edit-page/:id" exact render={props => <ProblemEdit {...props} />} />

      <Route path="/board-list-page/:id" exact render={props => <BoardList {...props} />} />
      <Route path="/board-view-page/:id" exact render={props => <BoardView {...props} />} />
      <Route path="/board-edit-page" exact render={props => <BoardEdit {...props} />} />
      <Route path="/board-edit-page/:id" exact render={props => <BoardEdit {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
