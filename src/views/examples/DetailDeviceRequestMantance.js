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
import { Card, Container, Row, Col, CardBody, Form, Table } from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const DetailDeviceRequestMantance = () => {
  const [lists, setLists] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  if (user === null) {
    navigate("/auth/login");
  }

  const location = useLocation();

  //GET ID DEVICE
  const idrequest = location.state.idrequest;
  const type = location.state.type;
  console.log(type)
 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = {
    headers: {
      Authorization: "Bearer " + user.access_token,
    },
  };

  useEffect(() => {
    if(type !==undefined) {
      setLists(idrequest)
    } else {
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
          const listnew = response.data.result.data.asset_leased;
          console.log(listnew);
          setLists(listnew);
        }
      })
      .catch(console.log);
    }
   

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin chi tiết device
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
                            <th scope="col">asset_code</th>
                            <th scope="col">id</th>
                            <th scope="col">name</th>
                            <th scope="col">status</th>
                            <th scope="col">manager</th>
                            <th scope="col">category</th>
                            <th scope="col">image</th>
                            <th scope="col">management_unit</th>
                            <th scope="col">created_at</th>
                            <th scope="col">updated_at</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((ob) => (
                            <tr key={ob.asset.id}>
                              <td>{ob.asset_code}</td>
                              <td>{ob.asset.id}</td>
                              <td>{ob.asset.name}</td>
                              <td>{ob.asset.status}</td>
                              <td>{ob.asset.manager.full_name}</td>
                              <td>{ob.asset.category.name}</td>
                              <td>
                                <img
                                  src={ob.asset.attachments[0].source}
                                  style={{ "max-width": "120px" }}
                                  alt="..."
                                />
                              </td>
                              <td>{ob.asset.management_unit}</td>
                              <td>
                                {new Date(
                                  Number(ob.asset.created_at)
                                ).toString()}
                              </td>
                              <td>
                                {new Date(
                                  Number(ob.asset.updated_at)
                                ).toString()}
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

export default DetailDeviceRequestMantance;
