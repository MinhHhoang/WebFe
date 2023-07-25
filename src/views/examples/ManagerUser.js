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
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
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
  Label,
  ButtonDropdown,
  Dropdown,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DEFAUL_OBJECT = {
  full_name: "",
  address: "",
  email: "",
  mobile: "",
  sex: "true",
  date_of_birth: "",
  avatar: "",
  username: "",
  password: "",
  position: "",
  department: {
    id: -1,
    name: "",
  },
};

const ManagerUser = () => {
  const [object, setObject] = useState(DEFAUL_OBJECT);
  const [list, setList] = useState([]);
  const [listBP, setListBP] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateList, setUpdateList] = useState();
  const [file, setFile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [keySearh, setKeySearh] = useState('');
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleChange = (event, code, name) => {
    setFile(event.target.files[0]);
  };

  const handleChangeDrop = (code, name) => {
    setObject({ ...object, department: { id: code, name: name } });
  };

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    navigate("/auth/login");
  } else {
    if (user.position !== "ADMIN") {
      navigate("/admin");
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = {
    headers: {
      Authorization: "Bearer " + user.access_token,
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/department/list", config)
      .then((response) => {
        if(response.data.message === 'Full authentication is required to access this resource') {
          localStorage.removeItem('user');
          navigate("/auth/login");
          return
        }
        if (response.data.status === 1) {
          const listnew = response.data.result.data;
          setListBP(listnew);
        }
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeData = (e) => {
    const { name } = e.currentTarget;
    const value = e.currentTarget.value;
    setObject({
      ...object,
      [name]: value,
    });
  };


  const handleClick = (e, index) => {
    e.preventDefault();
    setPage(index)
  };


  const handleAddUser = (e) => {
    const cleardata = {
      full_name: "",
      address: "",
      email: "",
      mobile: "",
      sex: "true",
      date_of_birth: "",
      avatar: "",
      username: "",
      password: "",
      position: "",
      department: {
        id: -1,
        name: "",
      },
    };
    setObject(cleardata);
    setIsUpdate(false);
  };

  const handleSubmit = async () => {
    var dArr = object.date_of_birth.toString().split("-"); // ex input: "2010-01-18"
    // eslint-disable-next-line no-const-assign
    var values = dArr[2] + "/" + dArr[1] + "/" + dArr[0];
    const dataOb = {
      username: object.username,
      password: object.password,
      id: object.id,
      full_name: object.full_name,
      address: object.address,
      email: object.email,
      mobile: object.mobile,
      sex: object.sex,
      date_of_birth: values,
      position: object.position,
      department: {
        id: object.department.id,
      },
    };

    const blob = new Blob([JSON.stringify(dataOb)], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", blob);

    if (isUpdate) {
      axios
        .put("http://localhost:8080/user/update", formData, config)
        .then((response) => {
          if(response.data.message === 'Full authentication is required to access this resource') {
            localStorage.removeItem('user');
            navigate("/auth/login");
            return
          }
          if (response.data.status === 1) {
            alert("Cập nhật thành công");
            setIsUpdate(false);
            setUpdateList(!updateList);
            setObject(DEFAUL_OBJECT);
          } else {
            alert(response.data.message);
            return;
          }
        })
        .catch(console.log);
    } else {
      axios
        .post("http://localhost:8080/user/create", formData, config)
        .then((response) => {
          if(response.data.message === 'Full authentication is required to access this resource') {
            localStorage.removeItem('user');
            navigate("/auth/login");
            return
          }
          if (response.data.status === 1) {
            alert("Thêm thành công");
            setUpdateList(!updateList);
            setObject(DEFAUL_OBJECT);
          } else {
            alert(response.data.message);
            return;
          }
        })
        .catch(console.log);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/list?page="+page+"&key="+keySearh, config)
      .then((response) => {
        if(response.data.message === 'Full authentication is required to access this resource') {
          localStorage.removeItem('user');
          navigate("/auth/login");
          return
        }
        if (response.data.status === 1) {
          const listnew = response.data.result.data;
          const totalItem = response.data.result.total;
          const limit =  response.data.result.limit;
          const Totalpage = Math.ceil(totalItem / limit);
          setTotalPage(Totalpage)
          setList(listnew);
        }
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateList]);

  const deleteObject = (data) => {
    axios
      .delete("http://localhost:8080/user/delete/" + data.id, config)
      .then((response) => {
        if(response.data.message === 'Full authentication is required to access this resource') {
          localStorage.removeItem('user');
          navigate("/auth/login");
          return
        }
        if (response.data.status === 1) {
          alert("Xóa thành công");
          setUpdateList(!updateList);
        } else {
          alert(response.data.message);
        }
      })
      .catch(console.log);
  };

  const updateObject = (data) => {
    window.scrollTo(0, 0)
    var dArr = data.date_of_birth.toString().split("/"); // ex input: "2010-01-18"
    // eslint-disable-next-line no-const-assign
    var value = dArr[2] + "-" + dArr[1] + "-" + dArr[0];
    setIsUpdate(true);
    setObject({ ...data, date_of_birth: value });
  };


  const handleSearch = (e) => {
    setKeySearh(e.currentTarget.value);
    setUpdateList(!updateList)
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
                    Thông tin người dùng
                  </h6>

                  <div className="pl-lg-4">
                    <Row>
                      <Button
                        type="button"
                        onClick={handleAddUser}
                        color="success"
                        outline
                      >
                        {" "}
                        Thêm người dùng
                      </Button>
                    </Row>
                    <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            User Name
                          </label>
                          <Input
                            disabled={isUpdate}
                            name="username"
                            className="form-control-alternative"
                            value={object.username}
                            onChange={handleChangeData}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-password"
                          >
                            Password
                          </label>
                          <Input
                            name="password"
                            className="form-control-alternative"
                            value={object.password}
                            onChange={handleChangeData}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Họ và tên
                          </label>
                          <Input
                            disabled={isUpdate}
                            name="full_name"
                            className="form-control-alternative"
                            value={object.full_name}
                            onChange={handleChangeData}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="2">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Năm sinh
                          </label>
                          <Input
                            name="date_of_birth"
                            className="form-control-alternative"
                            value={object.date_of_birth}
                            onChange={handleChangeData}
                            type="date"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-workpart"
                          >
                            Khu vực làm việc
                          </label>
                          <FormGroup>
                            <ButtonDropdown className="form-control-alternative">
                              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle
                                  caret
                                  className="dropdown-toggle"
                                >
                                  {object.department.name === ""
                                    ? "Chọn bộ phận"
                                    : object.department.name}
                                </DropdownToggle>
                                <DropdownMenu className="currency-dropdown">
                                  {listBP.map((data) => (
                                    <DropdownItem
                                      value={data.name}
                                      onClick={() =>
                                        handleChangeDrop(data.id, data.name)
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
                      <Col lg="2">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-sex"
                          >
                            Giới tính
                          </label>
                          <FormGroup tag="fieldset">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  value={"true"}
                                  name="sex"
                                  onChange={handleChangeData}
                                  type="radio"
                                  checked={object.sex === "true"}
                                />{" "}
                                Nam
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  value={"false"}
                                  name="sex"
                                  onChange={handleChangeData}
                                  type="radio"
                                  checked={object.sex === "false"}
                                />{" "}
                                Nữ
                              </Label>
                            </FormGroup>
                          </FormGroup>
                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-workpart"
                          >
                            Chức vụ
                          </label>
                          <FormGroup tag="fieldset">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  value={"STAFF"}
                                  name="position"
                                  onChange={handleChangeData}
                                  type="radio"
                                  checked={object.position === "STAFF"}
                                />{" "}
                                Quản lý
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  value={"USER"}
                                  name="position"
                                  onChange={handleChangeData}
                                  type="radio"
                                  checked={object.position === "USER"}
                                />{" "}
                                Người dùng
                              </Label>
                            </FormGroup>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Địa chỉ
                          </label>
                          <Input
                            name="address"
                            className="form-control-alternative"
                            value={object.address}
                            onChange={handleChangeData}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Email
                          </label>
                          <Input
                            name="email"
                            className="form-control-alternative"
                            value={object.email}
                            onChange={handleChangeData}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="2">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Số điện thoại
                          </label>
                          <Input
                            name="mobile"
                            className="form-control-alternative"
                            value={object.mobile}
                            onChange={handleChangeData}
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="2">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Avatar
                          </label>
                          <Input
                            className="form-control-alternative"
                            onChange={handleChange}
                            type="file"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="2">
                        <FormGroup>
                          <Button
                            type="button"
                            onClick={handleSubmit}
                            color="primary"
                          >
                            {" "}
                            {!isUpdate ? "Bổ sung" : "Cập nhật"}
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Danh sách người dùng
                  </h6>
                  <div className="col">
                    <Row className="m-2">
                      <Input
                        name="keysearch"
                        className="m-2 form-control w-50"
                        onChange={handleSearch}
                        type="text"
                        value={keySearh}
                        placeholder="Tìm kiếm"
                      />
                      
                    </Row>
                    <Card className="shadow">
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">id</th>
                            <th scope="col" style={{'font-weight': '700','color':'#000000'}}>username</th>
                            <th scope="col">address</th>
                            <th scope="col">email</th>
                            <th scope="col">mobile</th>
                            <th scope="col">sex</th>
                            <th scope="col" style={{'font-weight': '700','color':'#000000'}}>position</th>
                            <th scope="col">date_of_birth</th>
                            <th scope="col">avatar</th>
                            <th scope="col" style={{'font-weight': '700','color':'#000000'}}>department</th>
                            <th scope="col">full_name</th>
                            <th scope="col">created_at</th>
                            <th scope="col">updated_at</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((data) => (
                            <tr key={data.id}>
                              <td>{data.id}</td>
                              <td style={{'font-weight': '700','color':'#000000'}}>{data.username}</td>
                              <td>{data.address}</td>
                              <td>{data.email}</td>
                              <td>{data.mobile}</td>
                              <td>{data.sex === true ? "Male" : "Female"}</td>
                              <td style={{'font-weight': '700','color':'#000000'}}>{data.position}</td>
                              <td>{data.date_of_birth}</td>
                              <td>
                                <img
                                  src={data.avatar}
                                  style={{ "max-width": "120px" }}
                                  alt="..."
                                />
                              </td>
                              <td style={{'font-weight': '700','color':'#000000'}}>{data.department.name}</td>
                              <td>{data.full_name}</td>
                              <td>
                                {new Date(Number(data.created_at)).toLocaleString()}
                              </td>
                              <td>
                                {new Date(Number(data.updated_at)).toLocaleString()}
                              </td>

                              <td className="text-right">
                                {data.position !== "ADMIN" ? (
                                  <>
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
                                          onClick={() => deleteObject(data)}
                                        >
                                          Xóa user này
                                        </DropdownItem>
                                        <DropdownItem 
                                          onClick={() => updateObject(data)}
                                        >
                                          Chỉnh sửa
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </>
                                ) : (
                                  <></>
                                )}
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


                        {[...Array(totalPage)].map((x, i) =>
                          <PaginationItem key={i} active={page === i ? true : false}>
                          <PaginationLink onClick={e =>handleClick(e, i)} href="#">
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                          )}
                         
                            
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

export default ManagerUser;
