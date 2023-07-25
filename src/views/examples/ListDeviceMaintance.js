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
  FormGroup,
  Input,
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
  ButtonDropdown,
  Dropdown,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListDeviceMaintance = () => {
  const [lists, setLists] = useState([]);
  const [updateList, setUpdateList] = useState();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const listBP = [
    { status: 0, name: "Đang xử lý" },
    { status: 1, name: "Đồng ý" },
    { status: 2, name: "Reject" },
  ];

  const [keySearh, setKeySearh] = useState({
    from: "",
    to: "",
    key: "",
    status: "",
    statusname: "",
    revoked_at: "",
    leased_at: "",
  });

  const navigate = useNavigate();
  const navDetailOb = (data) => {
    navigate("/admin/detail-request-device-maintance/", {
      state: { idrequest: data.id },
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    navigate("/auth/login");
  } 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = {
    headers: {
      Authorization: "Bearer " + user.access_token,
    },
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/maintenance-asset-leased/list-by-user?page=" +
          page +
          "&key=" +
          keySearh.key +
          "&from=" +
          keySearh.from +
          "&to=" +
          keySearh.to +
          "&status=" +
          keySearh.status,
        config
      )
      .then((response) => {
        if(response.data.message === 'Full authentication is required to access this resource') {
          localStorage.removeItem('user');
          navigate("/auth/login");
          return
        } 
        if (response.data.status === 1) {
          const listnew = response.data.result.data;
          console.log(listnew)
          const totalItem = response.data.result.total;
          const limit = response.data.result.limit;
          const Totalpage = Math.ceil(totalItem / limit);
          setTotalPage(Totalpage);
          setLists(listnew);
        }
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateList, keySearh, page]);

  const handleChangeData = (e) => {
    const { name } = e.currentTarget;
    if (name === "revoked_at") {
      const value = e.currentTarget.value;
      var dateStart = new Date(value).getTime();
      setKeySearh({
        ...keySearh,
        from: dateStart,
        revoked_at: value,
      });
    } else if (name === "leased_at") {
      const value = e.currentTarget.value;
      var dateEnd = new Date(value).getTime();
      setKeySearh({
        ...keySearh,
        to: dateEnd,
        leased_at: value,
      });
    } else {
      const value = e.currentTarget.value;
      setKeySearh({
        ...keySearh,
        [name]: value,
      });
    }
  };

  const handleChangeDrop = (code, name) => {
    setKeySearh({ ...keySearh, status: code, statusname: name });
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    setPage(index);
  };

  
  const updateRequest = (data) => {
    navigate("/admin/create-device-maintance", {
      state: { idrequest: data.id },
    });
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1 mb-2" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <Row>
                    <Col lg="3">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Ngày Bắt đầu
                        </label>
                        <Input
                          name="revoked_at"
                          className="form-control-alternative"
                          value={keySearh.revoked_at}
                          onChange={handleChangeData}
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-password"
                        >
                          Ngày kết thúc
                        </label>
                        <Input
                          name="leased_at"
                          className="form-control-alternative"
                          value={keySearh.leased_at}
                          onChange={handleChangeData}
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Tìm kiếm
                        </label>
                        <Input
                          name="key"
                          className="form-control-alternative"
                          value={keySearh.key}
                          onChange={handleChangeData}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="3">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-workpart"
                        >
                          Status
                        </label>
                        <FormGroup>
                          <ButtonDropdown className="form-control-alternative">
                            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                              <DropdownToggle caret className="dropdown-toggle">
                                {keySearh.status === ""
                                  ? "All"
                                  : keySearh.statusname}
                              </DropdownToggle>
                              <DropdownMenu className="currency-dropdown">
                                <DropdownItem
                                  onClick={() => handleChangeDrop("", "All")}
                                >
                                  All
                                </DropdownItem>
                                {listBP.map((data) => (
                                  <DropdownItem
                                    value={data.name}
                                    onClick={() =>
                                      handleChangeDrop(data.status, data.name)
                                    }
                                  >
                                    {data.name}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </ButtonDropdown>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
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
                      <Table
                        className="align-items-center"
                        style={{ "overflow-x": "scroll" }}
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">id</th>
                            <th scope="col">reason</th>
                            <th scope="col">client</th>
                            <th scope="col">department</th>
                            <th scope="col">started_at</th>
                            <th scope="col">completed_at</th>
                            <th scope="col">created_at</th>
                            <th scope="col">updated_at</th>
                            <th scope="col">status</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((ob) => (
                            <tr key={ob.id}>
                              <td>{ob.id}</td>
                              <td>{ob.reason}</td>

                              <td>{ob.client.full_name}</td>
                              <td>{ob.client.department.name}</td>
                              <td>
                                {new Date(Number(ob.started_at)).toLocaleString()}
                              </td>
                              <td>
                                {new Date(Number(ob.completed_at)).toLocaleString()}
                              </td>
                              <td>
                                {new Date(Number(ob.created_at)).toLocaleString()}
                              </td>
                              <td>
                                {new Date(Number(ob.updated_at)).toLocaleString()}
                              </td>
                              <td>
                                {ob.status === 0
                                  ? "Đang xử lý"
                                  : ob.status === 2
                                  ? "Đồng ý"
                                  : "Từ chối"}
                              </td>
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
                                    <DropdownItem onClick={() => navDetailOb(ob)}>
                                      Xem chi tiết device
                                    </DropdownItem>

                                    {ob.status === 0 ? (
                                      <>
                                        {" "}
                                        <DropdownItem  onClick={() => updateRequest(ob)}>
                                      Update request
                                    </DropdownItem>
                                        
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                 
                                    
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
                            {[...Array(totalPage)].map((x, i) => (
                              <PaginationItem
                                key={i}
                                active={page === i ? true : false}
                              >
                                <PaginationLink
                                  onClick={(e) => handleClick(e, i)}
                                  href="#"
                                >
                                  {i + 1}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
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

export default ListDeviceMaintance;
