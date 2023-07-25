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
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
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


const DeviceAprovebBoPhan = () => {
  const [list, setList] = useState([]);


  const navigate = useNavigate();
  const navDetailOb = (data) => {
    navigate("/admin/manager-device/device-detail", {state :{ codeDevice: data.codeDevice }});
  };

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
        codeDevice: "XPS172022",
        typeRequest: "Bảo trì",
        tenDevice: "XPS 17 2022 DELL",
        khoiluong: "3.4",
        url: "https://photo-cms-bizlive.epicdn.me/w950/Uploaded/2023/wagtjt/2022_09_20/d4-5836.jpeg",
        nguoidung: "Lê Văn Minh Hoàng",
        batdau: "20/05/2023",
        ketthuc:"20/05/2024"
      },
      {
        codeDevice: "XPS172022",
        typeRequest: "Đăng ký sử dụng",
        tenDevice: "XPS 17 2022 DELL",
        khoiluong: "3.4",
        url: "https://photo-cms-bizlive.epicdn.me/w950/Uploaded/2023/wagtjt/2022_09_20/d4-5836.jpeg",
        nguoidung: "Lê Văn Minh Hoàng",
        batdau: "20/05/2023",
        ketthuc:"20/05/2024"
      },
      {
        codeDevice: "XPS172022",
        typeRequest: "Đăng ký sử dụng",
        tenDevice: "XPS 17 2022 DELL",
        khoiluong: "3.4",
        url: "https://photo-cms-bizlive.epicdn.me/w950/Uploaded/2023/wagtjt/2022_09_20/d4-5836.jpeg",
        nguoidung: "Lê Văn Minh Hoàng",
        batdau: "20/05/2023",
        ketthuc:"20/05/2024"
      },
      {
        codeDevice: "XPS172022",
        typeRequest: "Đăng ký sử dụng",
        tenDevice: "XPS 17 2022 DELL",
        khoiluong: "3.4",
        url: "https://photo-cms-bizlive.epicdn.me/w950/Uploaded/2023/wagtjt/2022_09_20/d4-5836.jpeg",
        nguoidung: "Lê Văn Minh Hoàng",
        batdau: "20/05/2023",
        ketthuc:"20/05/2024"
      },
      {
        codeDevice: "XPS172022",
        typeRequest: "Đăng ký sử dụng",
        tenDevice: "XPS 17 2022 DELL",
        khoiluong: "3.4",
        url: "https://photo-cms-bizlive.epicdn.me/w950/Uploaded/2023/wagtjt/2022_09_20/d4-5836.jpeg",
        nguoidung: "Lê Văn Minh Hoàng",
        batdau: "20/05/2023",
        ketthuc:"20/05/2024"
      }
    ];

    setList(listnew);
  }, []);

  const tuChoiObject = (data) => {
    
    
  };

  const approveObject = (data) => {
    
  };

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
                    Thông tin phê duyệt
                  </h6>
                  <div className="col">
                    <Card className="shadow">
                      <Table className="align-items-center" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Code</th>
                            <th scope="col">Tên thiết bị</th>
                            <th scope="col">Khối lượng</th>
                            <th scope="col">Người dùng</th>
                            <th scope="col">Type request</th>
                            <th scope="col">Bắt đầu</th>
                            <th scope="col">Kết thúc</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((data) => (
                            <tr
                              key={data.codeDevice}
                            >
                              <td onClick={() => navDetailOb(data)}>
                                <img
                                  style={{width:'150px'}}
                                  src={data.url}
                                  className="rounded float-left"
                                  alt="..."
                                />
                              </td>
                              <td onClick={() => navDetailOb(data)}>{data.codeDevice}</td>
                              <td onClick={() => navDetailOb(data)}>{data.tenDevice}</td>
                              <td onClick={() => navDetailOb(data)}>{data.khoiluong} KG</td>
                              <td onClick={() => navDetailOb(data)} style={{ whiteSpace: "unset" }}>
                                {data.nguoidung}
                              </td>
                              <td onClick={() => navDetailOb(data)}>{data.typeRequest}</td>
                              <td onClick={() => navDetailOb(data)}>{data.batdau}</td>
                              <td onClick={() => navDetailOb(data)}>{data.ketthuc}</td>
                              <td className="text-right">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="btn-icon-only text-light"
                                    href="#pablo"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <i className="fas fa-ellipsis-v" />
                                  </DropdownToggle>
                                  <DropdownMenu
                                    className="dropdown-menu-arrow"
                                    right
                                  >
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={() => tuChoiObject(data)}
                                    >
                                      Từ chối
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={() => approveObject(data)}
                                    >
                                      Chấp thuận
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
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

export default DeviceAprovebBoPhan;
