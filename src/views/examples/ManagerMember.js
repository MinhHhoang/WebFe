/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Card,
  CardBody,
  Form,
  Container,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ManagerMember = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  if(user === null) {
    navigate("/auth/login");
  } else {
    if(user.position !== "STAFF") {
      navigate("/admin");
    }
  }

  useEffect(() => {
    //TODO: FECTDATA LIST USER RANK 2-3
    const listnew = [
      {
        userName: "hoangcrouch",
        fullName: "LÊ VĂN MINH HOÀNG",
        yearOld: "1998",
        sex: "Nam",
      },
      {
        userName: "hoangcrouch",
        fullName: "LÊ VĂN MINH HOÀNG",
        yearOld: "1998",
        sex: "Nam",
      },
      {
        userName: "hoangcrouch",
        fullName: "LÊ VĂN MINH HOÀNG",
        yearOld: "1998",
        sex: "Nam",
      },
    ];

    setList(listnew);
  }, []);

  


  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  
                  <h6 className="heading-small text-muted mb-4">
                    Danh sách người dùng bộ phân S13
                  </h6>
                  <div className="col">
                    <Card className="shadow">
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Năm sinh</th>
                            <th scope="col">Giới tính</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((data) => (
                            <tr key={data.userName}>
                              <td>{data.userName}</td>
                              <td>{data.fullName}</td>
                              <td>{data.yearOld}</td>
                              <td>{data.sex}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <CardFooter className="py-4">
                        <nav aria-label="...">
                          <Pagination
                            className="pagination justify-content-end mb-0"
                            listClassName="justify-content-end mb-0"
                          >
                            <PaginationItem className="disabled">
                              <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                tabIndex="-1"
                              >
                                <i className="fas fa-angle-left" />
                                <span className="sr-only">Previous</span>
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="active">
                              <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                1
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                2 <span className="sr-only">(current)</span>
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                3
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-angle-right" />
                                <span className="sr-only">Next</span>
                              </PaginationLink>
                            </PaginationItem>
                          </Pagination>
                        </nav>
                      </CardFooter>
                    </Card>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ManagerMember;
