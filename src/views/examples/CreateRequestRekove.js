/* eslint-disable array-callback-return */
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
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Row,
  Table,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const defaultValue = {
  reason: "",
  revoked_at: "",
  note: "",
  lease_contract:{
    id:""
  }
};

const CreateRequestRekove = () => {
  const [list, setList] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const [data, setData] = useState(defaultValue);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    navigate("/auth/login");
  }

  const config = {
    headers: {
      Authorization: "Bearer " + user.access_token,
      "content-type": "application/json",
    },
  };

  

  const location = useLocation();
  var idrequest;
  //GET ID DEVICE
  if (location.state !== null) idrequest = location.state.idrequest;


  const handleChangeData = (e) => {
    const { name } = e.currentTarget;
    const value = e.currentTarget.value;
    setData({
      ...data,
      [name]: value,
    });
  };



  useEffect(() => {
    axios
      .get("http://localhost:8080/lease-contract/list-by-user", config)
      .then((response) => {
        if (
          response.data.message ===
          "Full authentication is required to access this resource"
        ) {
          localStorage.removeItem("user");
          navigate("/auth/login");
          return;
        }
        if (response.data.status === 1) {
          const listnew = response.data.result.data.filter(
            (OB) => OB.status === 2
          );
          axios
          .get("http://localhost:8080/revoke-contract/list-by-user", config)
          .then((response) => {
            if (
              response.data.message ===
              "Full authentication is required to access this resource"
            ) {
              localStorage.removeItem("user");
              navigate("/auth/login");
              return;
            }
            if (response.data.status === 1) {
              const listone = response.data.result.data;
              console.log(listone)
              var listFinish = [];   
              listnew.map(ob => {
                var flag = true;
                listone.map(ob1 =>{
                    if(ob.id === ob1.lease_contract.id) {
                      flag=false
                    }
                })
                if(flag) {
                  listFinish.push(ob)
                }
              })
                
              setList(listFinish);
            }
          })
          .catch(console.log);

          
        }
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateList]);

  const selectLeaseContract = (id) => {
    setData({...data,lease_contract:{id:id}});
  };

  const submitRequest = () => {
    var revoked_ats = new Date(data.revoked_at).getTime();
    const newdata = {
      reason: data.reason,
      revoked_at: revoked_ats,
      note: data.note,
      lease_contract:{
        id:data.lease_contract.id
      }
    };

    if (revoked_ats === null ) {
      alert("Vui lòng nhập ngày trả");
      return;
    }

   
    const blob = JSON.stringify(newdata);

    if (idrequest === undefined) {
      axios
        .post(
          "http://localhost:8080/revoke-contract/create",
          blob,
          config
        )
        .then((response) => {
          if (
            response.data.message ===
            "Full authentication is required to access this resource"
          ) {
            localStorage.removeItem("user");
            navigate("/auth/login");
            return;
          }
          if (response.data.status === 1) {
            alert("Gửi request thành công");
            setData(defaultValue);
            setUpdateList(!updateList)
          } else {
            alert(response.data.message);
            return;
          }
        })
        .catch(console.log);
    } else {
      axios
        .put(
          "http://localhost:8080/revoke-contract/update/",
          blob,
          config
        )
        .then((response) => {
          if (
            response.data.message ===
            "Full authentication is required to access this resource"
          ) {
            localStorage.removeItem("user");
            navigate("/auth/login");
            return;
          }
          if (response.data.status === 1) {
            alert("Update request thành công");
            navigate("/admin/list-device");
            setData(defaultValue);
            setUpdateList(!updateList)
          } else {
            alert(response.data.message);
            return;
          }
        })
        .catch(console.log);
    }
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row style={{ marginBottom: "20px" }}>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin request rekove
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Ngày Trả
                          </label>
                          <Input
                            name="revoked_at"
                            className="form-control-alternative"
                            value={data.revoked_at}
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
                            Lý do:
                          </label>
                          <Input
                            name="reason"
                            className="form-control-alternative"
                            value={data.reason}
                            onChange={handleChangeData}
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Note:
                          </label>
                          <Input
                            name="note"
                            className="form-control-alternative"
                            value={data.note}
                            onChange={handleChangeData}
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            lease_contract ID
                          </label>
                          <Input
                            disabled
                            name="note"
                            className="form-control-alternative"
                            value={data.lease_contract.id}
                            onChange={handleChangeData}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="primary" onClick={() => submitRequest()}>
                      Submit
                    </Button>
                  </div>
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
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted">
                    Danh sách lease contract
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
                            <th scope="col">revoked_at</th>
                            <th scope="col">leased_at</th>
                            <th scope="col">created_at</th>
                            <th scope="col">updated_at</th>
                            <th scope="col">status</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((ob) => (
                            <tr key={ob.id}>
                              <td>{ob.id}</td>
                              <td>{ob.reason}</td>

                              <td>{ob.client.full_name}</td>
                              <td>{ob.client.department.name}</td>
                              <td>
                                {new Date(Number(ob.revoked_at)).toLocaleString()}
                              </td>
                              <td>
                                {new Date(Number(ob.leased_at)).toLocaleString()}
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
                                    <DropdownItem onClick={()=>selectLeaseContract(ob.id)}>
                                      Chọn
                                    </DropdownItem>

                                    
                                    
                                  </DropdownMenu>
                                </UncontrolledDropdown>
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

export default CreateRequestRekove;
