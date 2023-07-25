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
import { Card, Container, Row, Col, CardHeader } from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useLocation, useNavigate } from "react-router-dom";

const DetailDevice = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  if (user === null) {
    navigate("/auth/login");
  }

  const location = useLocation();

  //GET ID DEVICE
  const object = location.state.codeDevice;

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="center card-profile shadow">
              <img alt="..." src={object.attachments[0].source} />
            </Card>
          </Col>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="8">
            <Card className="card-profile shadow" style={{ height: 700 }}>
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image"></div>
                </Col>
              </Row>
              <CardHeader className="border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <h3>
                  <span>TÊN THIẾT BỊ : </span>
                  {object.name}
                </h3>
                <h3>
                  <span>MÃ THIẾT BỊ : </span>
                  {object.id}
                </h3>
                <h3>
                  <span>TRẠNG THÁI : </span>
                  {object.status}
                </h3>
                <h3>
                  <span>CATEGORY: </span>
                  {object.category.name}
                </h3>

                <h3>
                  <span>MANAGER: </span>
                  {object.manager.full_name}
                </h3>

                <h3>
                  <span>MANAGER-UNIT: </span>
                  {object.management_unit}
                </h3>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetailDevice;
