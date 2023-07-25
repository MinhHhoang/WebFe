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
  Dropdown,
  ButtonDropdown,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManagerDevice = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const DEFAUL_OBJECT = {
    name: "",
    status: "",
    value: "",
    management_unit: "",
    category: {
      id: -1,
      name: "",
    },
    manager: {
      id: -1,
    },
  };
  const [object, setObject] = useState(DEFAUL_OBJECT);
  const [list, setList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [listBP, setListBP] = useState([]);
  const [file, setFile] = useState(null);
  const [updateList, setUpdateList] = useState();

  const [idc, setIdc] = useState({ code: "", name: "Select Category" });
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenC, setDropdownOpenC] = useState(false);
  const [dropdownOpenCS, setDropdownOpenCS] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleC = () => setDropdownOpenC((prevState) => !prevState);
  const toggleCS = () => setDropdownOpenCS((prevState) => !prevState);

  const navigate = useNavigate();
  const navDetailOb = (data) => {
      axios
        .get(
          "http://localhost:8080/asset/get/"+data.id,config
        )
        .then((response) => {
          if(response.data.message === 'Full authentication is required to access this resource') {
            localStorage.removeItem('user');
            navigate("/auth/login");
            return
          } 
          if (response.data.status === 1) {
            const ob = response.data.result.data;
            navigate("/admin/manager-device/device-detail", {
              state: { codeDevice: ob },
            });
          }
        })
        .catch(console.log); 
  };
 
  if (user === null) {
    navigate("/auth/login");
  } else {
    if (user.position === "USER") {
      navigate("/admin");
    }
  }

  const config = {
    headers: {
      Authorization: "Bearer " + user.access_token,
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/category/list", config)
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

  const handleChangeFile = (event, code, name) => {
    setFile(event.target.files[0]);
  };

  const handleChangeData = (e) => {
    const { name } = e.currentTarget;
    const value = e.currentTarget.value;
    setObject({
      ...object,
      [name]: value,
    });
  };

  const handleChange = (code) => {
    setObject({ ...object, status: code });
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    setPage(index);
  };

  const handleSubmit = () => {
    console.log(object);
    const blob = new Blob([JSON.stringify(object)], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("files", file);
    formData.append("assetDto", blob);
    if (isUpdate) {
      // INSERT
      axios
        .put("http://localhost:8080/asset/update", formData, config)
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
      //UPDATE
      axios
        .post("http://localhost:8080/asset/create", formData, config)
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
    console.log(idc)
    axios
      .get(
        "http://localhost:8080/asset/list?page=" +
          page +
          "&limit=5&category_id=" +
          idc.code,
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
          setList(listnew);
        }
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateList, page,idc]);

  const handleChangeDrop = (code, name) => {
    setObject({ ...object, category: { id: code, name: name } });
  };

  const deleteObject = (data) => {
    axios
      .delete("http://localhost:8080/asset/delete/" + data.id, config)
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
    setIsUpdate(true);
    setObject(data);
  };

  const handleAddDevice = (e) => {
    setObject(DEFAUL_OBJECT);
    setIsUpdate(false);
  };

  const handleChangeDropCSearch = (code, name) => {
    setIdc({ code: code, name: name });
  };


  const updateStatus = (id,data) => {
    const formData = new FormData();
    axios
      .put(
        "http://localhost:8080/asset/update-state/" +
        id +
          "?state="+data,
        formData,
        config
      )
      .then((response) => {
        if(response.data.message === 'Full authentication is required to access this resource') {
          localStorage.removeItem('user');
          navigate("/auth/login");
          return
        } 
        if (response.data.status === 1) {
          alert("Cài đặt trạng thái thành công");
          setUpdateList(!updateList);
        } else {
          alert("Lỗi hệ thống:" + response.data.message);
        }
      })
      .catch(console.log);
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
                    Thông tin thiết bị
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Button
                        type="button"
                        onClick={handleAddDevice}
                        color="success"
                        outline
                      >
                        {" "}
                        Thêm thiết bị
                      </Button>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-codeDevice"
                              >
                                Tên thiết bị
                              </label>
                              <Input
                                name="name"
                                className="form-control-alternative"
                                value={object.name}
                                onChange={handleChangeData}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-khoiluong"
                              >
                                Value
                              </label>
                              <Input
                                name="value"
                                className="form-control-alternative"
                                value={object.value}
                                onChange={handleChangeData}
                                type="number"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Trạng thái
                              </label>
                              <FormGroup>
                                <ButtonDropdown className="form-control-alternative">
                                  <Dropdown
                                    isOpen={dropdownOpen}
                                    toggle={toggle}
                                  >
                                    <DropdownToggle
                                      caret
                                      className="dropdown-toggle"
                                    >
                                      {object.status === ""
                                        ? "Select status"
                                        : object.status}
                                    </DropdownToggle>
                                    <DropdownMenu className="currency-dropdown">
                                      <DropdownItem
                                        onClick={() => handleChange("Mới")}
                                      >
                                        Mới
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          handleChange("Cũ")
                                        }
                                      >
                                        Cũ
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </Dropdown>
                                </ButtonDropdown>
                              </FormGroup>
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-workpart"
                              >
                                Management Unit
                              </label>
                              <Input
                                name="management_unit"
                                className="form-control-alternative"
                                value={object.management_unit}
                                onChange={handleChangeData}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-workpart"
                              >
                                Category
                              </label>
                              <FormGroup>
                                <ButtonDropdown className="form-control-alternative">
                                  <Dropdown
                                    isOpen={dropdownOpenC}
                                    toggle={toggleC}
                                  >
                                    <DropdownToggle
                                      caret
                                      className="dropdown-toggle"
                                    >
                                      {object.category.name === ""
                                        ? "Chọn category"
                                        : object.category.name}
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
                        </Row>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Avatar
                          </label>
                          <Input
                            className="form-control-alternative"
                            onChange={handleChangeFile}
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
                            {isUpdate ? "Cập nhật" : "Create New"}
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted">
                    Danh sách thiết bị
                  </h6>
                  <FormGroup>
                    <ButtonDropdown className="form-control-alternative">
                      <Dropdown isOpen={dropdownOpenCS} toggle={toggleCS}>
                        <DropdownToggle caret className="dropdown-toggle">
                          {idc.name}
                        </DropdownToggle>
                        <DropdownMenu className="currency-dropdown">

                        <DropdownItem
                              onClick={() =>
                                handleChangeDropCSearch('', 'All')
                              }
                            >
                              All
                            </DropdownItem>
                          {listBP.map((data) => (
                            <DropdownItem
                              value={data.name}
                              onClick={() =>
                                handleChangeDropCSearch(data.id, data.name)
                              }
                            >
                              {data.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </ButtonDropdown>
                  </FormGroup>
                  <div className="col">
                    <Card className="shadow">
                      <Table className="align-items-center" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Value</th>
                            <th scope="col">Manager</th>
                            <th scope="col">Department</th>
                            <th scope="col">Image</th>
                            <th scope="col">Category</th>
                            <th scope="col">Management unit</th>
                            <th scope="col">created_at</th>
                            <th scope="col">updated_at</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((data) => (
                            <tr key={data.id}>
                              <td>
                                {data.id}
                              </td>
                              <td >
                                {data.name}
                              </td>
                              <td>
                                {data.state === 0 ? 'Sẵn sàng' : data.state === 1 ? 'Không sẵn sàng' : 'Bảo trì' }
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
                                      onClick={() => updateStatus(data.id,0)}
                                    >
                                      Sẵn sàng
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={() => updateStatus(data.id,1)}
                                    >
                                      Không sẵn sàng
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() => updateStatus(data.id,2)}
                                    >
                                      Đang bảo trì
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                              <td >
                                {data.value}
                              </td>
                              <td >
                                {data.manager.full_name}
                              </td>
                              <td >
                                {data.manager.department.name}
                              </td>
                              <td>
                                <img
                                  src={data.attachments[0].source}
                                  style={{ "max-width": "120px" }}
                                  alt="..."
                                />
                              </td>
                              <td >
                                {data.category.name}
                              </td>
                              <td >
                                {data.management_unit}
                              </td>
                              <td>
                                {new Date(Number(data.created_at)).toLocaleString()}
                              </td>
                              <td>
                                {new Date(Number(data.updated_at)).toLocaleString()}
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
                                  <DropdownItem
                                      onClick={() => navDetailOb(data)}
                                    >
                                      Xem thông tin chi tiết thiết bị này
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={() => deleteObject(data)}
                                    >
                                      Xóa Thiết bị này
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={() => updateObject(data)}
                                    >
                                      Chỉnh sửa
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

export default ManagerDevice;
