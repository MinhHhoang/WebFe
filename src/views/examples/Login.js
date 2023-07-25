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
import {  useEffect,useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from 'axios';
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
} from "reactstrap";

const Login = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    error: "",
  });

  const token = !!JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) 
    navigate("/admin/index")
    else
    <Outlet/>
  }, [navigate, token]);

  const handleChangeData = (e) => {
    const { name } = e.currentTarget;
    const value = e.currentTarget.value;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:8080/auth/login",account)
    .then(res => {
      if(res.data.status === 1) {
        const user = res.data.result.data
        localStorage.setItem('user',JSON.stringify(user));
        navigate("/admin/")
      } else {
        setAccount({
          ...account,
          error: "Tên tài khoản hoặc mật khẩu không đúng"
        })
      }
    })

    
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={account.username}
                    invalid={account.error.length > 0}
                    onChange={handleChangeData}
                  />
                  <FormFeedback>
                  {account.error}
                  </FormFeedback>
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
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={account.password}
                    onChange={handleChangeData}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button onClick={handleSubmit} className="my-4" color="primary" type="button">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-right" xs="12">
            <a className="text-light" href="/auth/register">
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
