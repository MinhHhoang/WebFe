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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  FormFeedback,
  Label,
  DropdownToggle,
  ButtonDropdown,
  DropdownMenu,
  Dropdown,
  DropdownItem,
} from "reactstrap";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DEFAUL_OBJECT = {
  userName: "",
  passWord: "",
  passWordEr: "",
  userNameEr: "",
  fullName: "",
  fullNameEr: "",
  yearOld: "",
  yearOldEr: "",
  workingParts: "",
  workingPartsEr: "",
  sex: "",
};
const Register = () => {
  const [object, setObject] = useState(DEFAUL_OBJECT);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [listBP, setListBP] = useState([]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleChange = (code) => {
    setObject({ ...object, workingParts: code });
  };
  const validateInput = () => {
    let isValid = true;
    const currentYear = new Date().getFullYear();
    const newData = { ...object };
    if (object.userName === "") {
      newData.userNameEr = "Username không hợp lệ";
      isValid = false;
    } else {
      newData.userNameEr = "";
    }

    if (object.fullName === "") {
      newData.fullNameEr = "Họ và tên không hợp lệ";
      isValid = false;
    } else {
      newData.fullNameEr = "";
    }

    if (object.passWord === "") {
      newData.passWordEr = "Password không hợp lệ";
      isValid = false;
    } else {
      newData.passWordEr = "";
    }

    if (object.workingParts === "") {
      newData.workingPartsEr = "Khu làm việc không hợp lệ";
      isValid = false;
    } else {
      newData.workingPartsEr = "";
    }

    if (Number(object.yearOld) < 1000 || Number(object.yearOld) > currentYear) {
      newData.yearOldEr = "Năm sinh không hợp lệ";
      isValid = false;
    } else {
      newData.yearOldEr = "";
    }
    setObject(newData);

    return isValid;
  };

  useEffect(() => {
    //TODO: FECTDATA LIST USER RANK 2-3// chỗ ni mi call api lấy list về
    const listnew = [
      {
        code: "ABC",
      },
      {
        code: "S13",
      },
      {
        code: "AS12",
      },
      {
        code: "GST",
      },
      {
        code: "G52",
      },
    ];

    setListBP(listnew);
  }, []);

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (validateInput()) {
      //TODO: RESGITER SERVER

      //case suscess
      const user = { username: object.username, role: object.rank };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/admin/index");
    }
  };

  const handleChangeData = (e) => {
    const { name } = e.currentTarget;
    const value = e.currentTarget.value;
    setObject({
      ...object,
      [name]: value,
    });
  };
  console.log(object);
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    name="userName"
                    className={`form-control-alternative ${
                      object.userNameEr ? "is-invalid" : ""
                    }`}
                    value={object.userName}
                    onChange={handleChangeData}
                    type="text"
                  />
                  <FormFeedback>{object.userNameEr}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Họ và tên"
                    name="fullName"
                    className={`form-control-alternative ${
                      object.fullNameEr ? "is-invalid" : ""
                    }`}
                    value={object.fullName}
                    onChange={handleChangeData}
                    type="text"
                  />
                  <FormFeedback>{object.fullNameEr}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mật khẩu"
                    name="passWord"
                    className={`form-control-alternative ${
                      object.passWordEr ? "is-invalid" : ""
                    }`}
                    value={object.passWord}
                    onChange={handleChangeData}
                    type="password"
                  />
                  <FormFeedback>{object.passWordEr}</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-money-coins" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Năm sinh"
                    name="yearOld"
                    className={`form-control-alternative ${
                      object.yearOldEr ? "is-invalid" : ""
                    }`}
                    value={object.yearOld}
                    onChange={handleChangeData}
                    type="number"
                  />
                  <FormFeedback>{object.yearOldEr}</FormFeedback>
                </InputGroup>
              </FormGroup>

              <Row>
                <Col lg="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-sex">
                      Giới tính
                    </label>
                    <FormGroup tag="fieldset">
                      <FormGroup check>
                        <Label check>
                          <Input
                            value={"Nam"}
                            name="sex"
                            onChange={handleChangeData}
                            type="radio"
                            checked={object.sex === "Nam"}
                          />{" "}
                          Nam
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            value={"Nữ"}
                            name="sex"
                            onChange={handleChangeData}
                            type="radio"
                            checked={object.sex === "Nữ"}
                          />{" "}
                          Nữ
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </FormGroup>
                </Col>
                <Col lg="4">
                <FormGroup>
                <label className="form-control-label" htmlFor="input-workpart">
                  Khu vực làm việc
                </label>
                <FormGroup>
                  <ButtonDropdown className="form-control-alternative">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret className="dropdown-toggle">
                        {object.workingParts === ""
                          ? "Select item"
                          : object.workingParts}
                      </DropdownToggle>
                      <DropdownMenu className="currency-dropdown">
                        {listBP.map((data) => (
                          <DropdownItem onClick={() => handleChange(data.code)}>
                            {data.code}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </ButtonDropdown>
                </FormGroup>
              </FormGroup>
                </Col>
              </Row>

              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="text-right" xs="12">
                  <a className="text-light" href="/auth/login">
                    <small>Login with a account</small>
                  </a>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  onClick={handleSubmit}
                  className="mt-4"
                  color="primary"
                  type="button"
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
