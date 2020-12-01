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
import './UserGroup.css';

// reactstrap components
import {
    Button, ButtonGroup, Badge, Card, CardText, CardBody,
    CardTitle, CardSubtitle, Container, Form, Row, Col, ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink, Progress, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table
} from "reactstrap";

// core components
import SimpleNavbar from "components/Navbars/SimpleNavbar.js";

class GroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            memberId: "",
            categoryId: "",
            timeLimit: "",
            reference: "",
            content: "",
            difficulty: "",
            vote: "",
            problemId: this.props.match.params.id,
            isShare: false,
            time: "",
            isdropdown: false,
        };
    }

    toggleModal = () => {
        this.setState({
            isShare: !this.state.isShare
        });
    };

    tick = () => {
        if (this.state.time > 0) {
            this.setState({
                time: this.state.time - 1
            });
        }
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;

        fetch("/api/v1/problem/" + this.state.problemId, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.success === "ok") {
                        this.setState({
                            title: result.title,
                            memberId: result.member_id,
                            categoryId: result.category_id,
                            timeLimit: result.time_limit,
                            reference: result.reference,
                            content: result.content,
                            difficulty: result.difficulty,
                            vote: result.vote,
                            time: 0 //result.time_limit
                        });
                    }
                },
                (error) => console.log(error)
            )

        setInterval(() => this.tick(), 1000);
    }

    render() {
        let answerPanel = <br />;
        if (this.state.time === 0) {
            let answer = "";
            console.log(this.state.problemId);
            if (this.state.problemId == 1) {
                answer = "<p>Hello World!</p>";
            }
            else if (this.state.problemId == 2) {
                answer = "<p>1. 표준 프로토콜을 사용"
                    + "<br>2. 작은 소리를 크게 변환 -  리피터 설치 증폭 / 작은 소리도 이해 가능 - 복조기 성능 향상"
                    + "<br>3. 빠른 속도의 조절 필요 - 반송파 신호 조정 / 빠른 속도도 이해 가능 - 반송파 신호 중첩"
                    + "<br>4. 한사람만 발언 허용 - 반이중 기술 적용/ 동시에 발언 가능 - 전이중 기술 적용"
                    + "<br>5.물이 아닌 전송매체 변화 - 무선통신 매체사용 / 물속 에서도 대화 가능 - 음파통신 매체사용<\p>";
            }
            else {
                answer = "답변이 등록 되어있지 않습니다.";
            }

            answerPanel = (
                <div>
                    <h2 className="display-5">답변</h2>
                    <div dangerouslySetInnerHTML={{ __html: answer }}></div>
                </div>
            );
        }
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
                            <div className="px-6">
                                <Form>

                                    <br />
                                    <div className='TITLE'>
                                        <div className='group-name'>
                                            <h1 className="display-3 text-left">Grouppage</h1>
                                            <div className='group-tag'>
                                                <h7><a href='#'>https://깃허브링크.com</a></h7> <h7>||</h7>
                                                <h7><a href='#'>팀 이메일 address</a></h7> <h7>||</h7>
                                                <h7><a href='#'>tag3</a></h7>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <Nav>
                                            <NavItem>
                                                <NavLink href="#">그룹 정보</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">문제 풀이 리스트</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">History - 댓글 정보 등</NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                    <ListGroup flush>
                                        <ListGroupItem disabled tag="a" href="#"><Row>
                                            <Col xs="auto">
                                                <Dropdown isOpen={this.state.isdropdown} toggle={() => this.setState({ isdropdown: !this.state.isdropdown })}>
                                                    <DropdownToggle caret>
                                                        Type : public
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem header>Header</DropdownItem>
                                                        <DropdownItem>Some Action</DropdownItem>
                                                        <DropdownItem text>Dropdown Item Text</DropdownItem>
                                                        <DropdownItem disabled>Action (disabled)</DropdownItem>
                                                        <DropdownItem divider />
                                                        <DropdownItem>Foo Action</DropdownItem>
                                                        <DropdownItem>Bar Action</DropdownItem>
                                                        <DropdownItem>Quo Action</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </Col>
                                        </Row></ListGroupItem>

                                        <Row>
                                            <Col>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col xs="8">
                                                            <a href={"problem-view-page/"}>유저1</a>
                                                            <Row>

                                                                <Col xs='3'>
                                                                    <ButtonGroup size="sm">
                                                                        <Button href='#' color='danger'>팀장</Button>
                                                                    </ButtonGroup></Col>
                                                                <Col xs="8">
                                                                    2020의 유일한 팀장
                                                                </Col>
                                                                <Col xs="4"></Col>

                                                            </Row>

                                                        </Col>
                                                        <Col xs="2">

                                                            <Row>
                                                                <Col>111</Col>
                                                                <Col><Badge color="light">해결문제수</Badge></Col>
                                                            </Row>

                                                        </Col>


                                                    </Row>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col xs="8">
                                                            <a href={"problem-view-page/"}>유저1</a>
                                                            <Row>

                                                                <Col xs='3'>
                                                                    <ButtonGroup size="sm">
                                                                        <Button href='#' color='primary'>부팀장</Button>
                                                                    </ButtonGroup></Col>
                                                                <Col xs="8">
                                                                    부팀장이라 멋있는 말을 써야함
                                                                </Col>
                                                                <Col xs="4"></Col>

                                                            </Row>

                                                        </Col>
                                                        <Col xs="2">

                                                            <Row>
                                                                <Col>222</Col>
                                                                <Col><Badge color="light">해결문제수</Badge></Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>

                                                <ListGroupItem>
                                                    <Row>
                                                        <Col xs="8">
                                                            <a href={"problem-view-page/"}>유저1</a>
                                                            <Row>

                                                                <Col xs='3'>
                                                                    <ButtonGroup size="sm">
                                                                        <Button href='#' color='light'>팀원</Button>
                                                                    </ButtonGroup></Col>
                                                                <Col xs="8">
                                                                    그냥 팀원이라 갈리는 중
                                                                </Col>
                                                                <Col xs="4"></Col>

                                                            </Row>

                                                        </Col>
                                                        <Col xs="2">

                                                            <Row>
                                                                <Col>333</Col>
                                                                <Col><Badge color="light">해결문제수</Badge></Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>

                                                </ListGroupItem>
                                            </Col>
                                            <Col xs='4'>
                                                <div className='rank-group'>
                                                    <Card className="">
                                                        <Form>
                                                            <Table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>그룹랭킹</th>
                                                                        
                                                                    <td></td>
                                                                    <td>
                                                                            문제수
                                                                        </td>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <label for="a1"><span><a href="#">1</a></span></label>
                                                                        </td>
                                                                        <td>
                                                                            유저3
                                                                        </td>
                                                                        <td>
                                                                            <div className='rank-up-font-color'>+1</div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <label for="a1"><span><a href="#">2</a></span></label>
                                                                        </td>
                                                                        <td>
                                                                            유저2
                                                                        </td>
                                                                        <td>
                                                                            <div className='rank-stay-font-color'>-</div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <label for="a1"><span><a href="#">3</a></span></label>
                                                                        </td>
                                                                        <td>
                                                                            유저1
                                                                        </td>
                                                                        <td>
                                                                            <div className='rank-down-font-color'>-1</div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </Form>
                                                    </Card>
                                                </div>
                                            </Col>
                                        </Row>
                                    </ListGroup>


                                </Form>
                            </div>
                        </Card>
                        <br />
                        <br />
                        <Card className="card-profile shadow">
                            <div className="px-6">
                                <Form>
                                    <br />
                                    <br />
                                    <h1 className="display-3 text-left">최근에 그룹원이 푼 문제</h1>
                                    <br />
                                    <br />
                                    <div className='solved-problem-list'>
                                        <div className="card-entity">
                                            <Card>
                                                <CardBody>
                                                    <CardTitle tag="h5">문제 : 132</CardTitle>
                                                    <CardSubtitle tag="h6" className="mb-2 text-muted">매우 큰 수</CardSubtitle>
                                                    <CardText>
                                                        <ButtonGroup size="sm">
                                                            <Button href='#' color='danger'>팀장</Button>
                                                            <Button href='#' color='primary'>부팀장</Button>
                                                        </ButtonGroup></CardText>
                                                    <Button color = 'secondary'>바로가기</Button>
                                                </CardBody>
                                            </Card>
                                        </div>
                                        <div className="card-entity">
                                            <Card>
                                                <CardBody>
                                                    <CardTitle tag="h5">문제 : 132</CardTitle>
                                                    <CardSubtitle tag="h6" className="mb-2 text-muted">매우 큰 수</CardSubtitle>
                                                    <CardText>
                                                        <ButtonGroup size="sm">
                                                            <Button href='#' color='danger'>팀장</Button>
                                                            <Button href='#' color='primary'>부팀장</Button>
                                                        </ButtonGroup></CardText>
                                                    <Button color = 'secondary'>바로가기</Button>
                                                </CardBody>
                                            </Card>
                                        </div>
                                        <div className="card-entity">
                                            <Card>
                                                <CardBody>
                                                    <CardTitle tag="h5">문제 : 132</CardTitle>
                                                    <CardSubtitle tag="h6" className="mb-2 text-muted">매우 큰 수</CardSubtitle>
                                                    <CardText>
                                                        <ButtonGroup size="sm">
                                                            <Button href='#' color='danger'>팀장</Button>
                                                            <Button href='#' color='primary'>부팀장</Button>
                                                        </ButtonGroup></CardText>
                                                    <Button color = 'secondary'>바로가기</Button>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </div>

                                </Form>
                            </div>

                        </Card>

                    </Container>


                </main>
            </>
        );
    }
}

export default GroupList;
