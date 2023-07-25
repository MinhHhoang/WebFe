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
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DEFAUL_OBJECT = {
  id:-1,
  name: "",
};

const ManagerCategory = () => {
  const [object, setObject] = useState(DEFAUL_OBJECT);
  const [list, setList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateList, setUpdateList] = useState();



  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    navigate("/auth/login");
  } else {
    if (user.position === "USER") {
      navigate("/admin");
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = {
    headers: {
      Authorization: "Bearer " + user.access_token  
    },
  };



  const handleChangeData = (e) => {
    const { name } = e.currentTarget;
    const value = e.currentTarget.value;
    setObject({
      ...object,
      [name]: value,
    });
  };

  const handleAddCaregory = (e) => {
    setObject(DEFAUL_OBJECT);
    setIsUpdate(false);
  };

  const handleSubmit = async () => {
    if (isUpdate) {
      axios
        .put("http://localhost:8080/category/update", object, config)
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
        .post("http://localhost:8080/category/create", object, config)
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
      .get("http://localhost:8080/category/list", config)
      .then((response) => {
        if(response.data.message === 'Full authentication is required to access this resource') {
          localStorage.removeItem('user');
          navigate("/auth/login");
          return
        }
        if (response.data.status === 1) {
          const listnew = response.data.result.data;
          setList(listnew);
        }
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateList]);

  const deleteObject = (data) => {
    axios
      .delete("http://localhost:8080/category/delete/" + data.id, config)
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
                    Thông tin category
                  </h6>

                  <div className="pl-lg-4">
                    <Row>
                      <Button
                        type="button"
                        onClick={handleAddCaregory}
                        color="success"
                        outline
                      >
                        {" "}
                        Thêm category
                      </Button>
                    </Row>
                    <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Category Name
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
                    Danh sách category
                  </h6>
                  <div className="col">
                  <Card className="shadow">
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">id</th>
                            <th style={{'font-weight': '700','color':'#000000'}} scope="col">name</th>
                            <th scope="col">created_at</th>
                            <th scope="col">updated_at</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((data) => (
                            <tr key={data.id}>
                              <td>{data.id}</td>
                              <td style={{'font-weight': '700','color':'#000000'}}>{data.name}</td>
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
                                          Xóa category này
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

export default ManagerCategory;
