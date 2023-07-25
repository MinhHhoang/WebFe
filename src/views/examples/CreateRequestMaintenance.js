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
  completed_at: "",
  started_at: "",
  note: "",
  idProduct: -1,
  nameProduct: "",
};

const CreateRequestMaintenance = () => {
  const [assets, setAssets] = useState([]);
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

  const convertDate = (time) => {
    const dateS = new Date(time).toLocaleString().split(", ");
    const dateK = dateS[0].split("/");

    if (dateK[0].length < 2) dateK[0] = "0" + dateK[0];
    if (dateK[1].length < 2) dateK[1] = "0" + dateK[1];

    return dateK[2] + "-" + dateK[0] + "-" + dateK[1];
  };

  const location = useLocation();
  var idrequest;
  //GET ID DEVICE
  if (location.state !== null) idrequest = location.state.idrequest;

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/maintenance-asset-leased/get/" + idrequest,
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
          const datanew = response.data.result.data;
          setData({
            ...data,
            note: datanew.note,
            reason: datanew.reason,
            completed_at: convertDate(datanew.completed_at),
            started_at: convertDate(datanew.started_at),
          });

          const newasset = datanew.asset_leased;
          console.log(newasset[0].asset);

          var listnewob = [];
          newasset.map((ob) => {
            const ids = ob.asset.id;
            const names = ob.asset.name;
            listnewob.push({
              asset_code: ob.asset_code,
              asset: { id: ids, name: names },
            });
          });

          setAssets(listnewob);
        }
      })
      .catch(console.log);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeData = (e) => {
    const { name } = e.currentTarget;
    const value = e.currentTarget.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  const deleteDevice = (id) => {
    console.log(id);
    let newList = assets.filter((ob) => ob.asset.id !== id);
    setAssets(newList);
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

          var listtmp = [];
          // eslint-disable-next-line array-callback-return
          listnew.map((ob) => {
            // eslint-disable-next-line array-callback-return
            ob.asset_leased.map((obj) => {
              listtmp.push(obj);
            });
          });

          setList(listtmp.filter((ob) => ob.asset.state === 1));
        }
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateList]);

  const addDeviceTmp = (asset_code, id, name) => {
    let object = assets.filter((ob) => ob.asset.id === id);

    if (object.length > 0) {
      alert("Thiết bị này đã chọn rồi");
    } else {
      setAssets([
        ...assets,
        { asset_code: asset_code, asset: { id: id, name: name } },
      ]);
    }
  };

  const submitRequest = () => {
    var dateStart = new Date(data.started_at).getTime();
    var dateEnd = new Date(data.completed_at).getTime();

    if (dateStart === null || dateEnd === null) {
      alert("Vui lòng nhập ngày bảo trì và ngày kết thúc");
      return;
    }

    if (dateStart > dateEnd) {
      alert("Ngày kết thúc bảo trì phải sau ngày đăng kí bảo trì, làm ơn.");
      return;
    }

    var datasend = {
      id:idrequest,
      reason: data.reason,
      completed_at: dateStart,
      started_at: dateEnd,
      note: data.note,
      asset_leased: assets,
    };

    const blob = JSON.stringify(datasend);

    if (idrequest === undefined) {
      axios
        .post(
          "http://localhost:8080/maintenance-asset-leased/create",
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
            setAssets([]);
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
          "http://localhost:8080/maintenance-asset-leased/update/",
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
            navigate("/admin/list-device-maintance");
            setData(defaultValue);
            setAssets([]);
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
          <Col className="order-xl-1" xl="6">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin request
                  </h6>
                  <div className="pl-lg-4">
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
                            name="started_at"
                            className="form-control-alternative"
                            value={data.started_at}
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
                            name="completed_at"
                            className="form-control-alternative"
                            value={data.completed_at}
                            onChange={handleChangeData}
                            type="date"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
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
                    </Row>
                    <Button color="primary" onClick={() => submitRequest()}>
                      Submit
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="6">
            <Card className="shadow">
              <Table className="align-items-center" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">asset_code</th>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {assets.map((ob) => (
                    <tr key={ob.asset_code}>
                      <td>{ob.asset_code}</td>
                      <td>{ob.asset.id}</td>
                      <td>{ob.asset.name}</td>
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
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              onClick={() => deleteDevice(ob.asset.id)}
                            >
                              Xóa
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
                    Danh sách thiết bị
                  </h6>

                  <div className="col">
                    <Card className="shadow">
                      <Table className="align-items-center" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Image</th>
                            <th scope="col">Category</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((data) => (
                            <tr key={data.asset.id}>
                              <td>{data.asset.id}</td>
                              <td>{data.asset.name}</td>
                              <td>
                                {data.asset.state === 0
                                  ? "Sẵn sàng"
                                  : data.asset.state === 1
                                  ? "Không sẵn sàng"
                                  : "Bảo trì"}
                              </td>
                              <td>
                                <img
                                  src={data.asset.attachments[0].source}
                                  style={{ "max-width": "120px" }}
                                  alt="..."
                                />
                              </td>
                              <td>{data.asset.category.name}</td>
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
                                      onClick={() =>
                                        addDeviceTmp(
                                          data.asset_code,
                                          data.asset.id,
                                          data.asset.name
                                        )
                                      }
                                    >
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

export default CreateRequestMaintenance;
