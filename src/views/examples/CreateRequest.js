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
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";


const defaultValue = {
  reason: "",
  revoked_at: "",
  leased_at: "",
  idProduct: -1,
  nameProduct: "",
}

const CreateRequest = () => {
  const [assets, setAssets] = useState([]);
  const [list, setList] = useState([]);
  const [listBP, setListBP] = useState([]);

  const [idc, setIdc] = useState({ code: "", name: "Select Category" });
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState();

  const [dropdownOpenCS, setDropdownOpenCS] = useState(false);

  const toggleCS = () => setDropdownOpenCS((prevState) => !prevState);

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
  if(location.state !== null)
    idrequest = location.state.idrequest;

 
  useEffect(() => {
    axios
      .get("http://localhost:8080/lease-contract/get/"+idrequest, config)
      .then((response) => {
        if(response.data.message === 'Full authentication is required to access this resource') {
          localStorage.removeItem('user');
          navigate("/auth/login");
          return
        } 
        if (response.data.status === 1) {
          const datanew = response.data.result.data;
          setData({...data,reason:datanew.reason,revoked_at:convertDate(datanew.revoked_at),leased_at:convertDate(datanew.leased_at)});

          const newasset = datanew.asset_leased;
          console.log("newasset")
          console.log(newasset[0].asset)
          
          var listnewob = [];
          newasset.map(ob => {
            const ids = ob.asset.id;
            const names = ob.asset.name;
            listnewob.push({asset:{id:ids,name:names}});
          })
          
          setAssets(listnewob);
        }
      })
      .catch(console.log);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const convertDate = (time) =>{
    const dateS = new Date(time).toLocaleString().split(', ');
    const dateK = dateS[0].split('/');
         
    if(dateK[0].length < 2) dateK[0] = '0'+dateK[0];
    if(dateK[1].length < 2) dateK[1] = '0'+dateK[1];

    return dateK[2] + "-" + dateK[0] +"-"+dateK[1];
  }




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

  const handleChangeData = (e) => {
    const { name } = e.currentTarget;
    const value = e.currentTarget.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  console.log(data);

  const handleClick = (e, index) => {
    e.preventDefault();
    setPage(index);
  };

  useEffect(() => {
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
          const totalItem = response.data.result.total;
          const limit = response.data.result.limit;
          const Totalpage = Math.ceil(totalItem / limit);
          setTotalPage(Totalpage);
          setList(listnew);
        }
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, idc]);

 
  const handleChangeDropCSearch = (code, name) => {
    setIdc({ code: code, name: name });
  };

  const addDeviceTmp= (id, state,name) =>{

    if(state !== 0 ) {
      alert("Trạng thái thiết bị không sẵn sàng hoặc đang bảo trì");
      return
    }


    let object = assets.filter(ob => ob.asset.id === id);

   
    if(object.length > 0) {
        alert("Thiết bị này đã chọn rồi")
    } else {
      setAssets([...assets,{asset:{id:id,name:name}}])
    }
  }

  const deleteDevice= (id) =>{
    console.log(id)
    let newList = assets.filter(ob => ob.asset.id !== id);
    setAssets(newList);
  }


  const submitRequest= () =>{
    var dateStart = new Date(data.revoked_at).getTime();
    var dateEnd = new Date(data.leased_at).getTime();
    if(assets.length === 0) {
      alert('Vui lòng chọn tài sản để mượn');
      return
    }

    if(dateStart === null || dateEnd===null) {
      alert('Vui lòng nhập ngày mượn và ngày kết thúc');
      return
    }

    if(dateStart > dateEnd) {
      alert('Ngày trả phải sau ngày mượn , làm ơn.');
      return
    }
    var datasend = {
      id: idrequest,
      reason: data.reason,
      revoked_at: dateStart,
      leased_at: dateEnd,
      asset_leased: assets
    }

    const blob = JSON.stringify(datasend);

    console.log(blob)

    if(idrequest === undefined) {
      axios
        .post("http://localhost:8080/lease-contract/create", blob, config)
        .then((response) => {
          if(response.data.message === 'Full authentication is required to access this resource') {
            localStorage.removeItem('user');
            navigate("/auth/login");
            return
          } 
          if (response.data.status === 1) {
            alert("Gửi request thành công");
            setData(defaultValue)
            setAssets([])

          } else {
            alert(response.data.message);
            return;
          }
        })
        .catch(console.log);
    } else {
      axios
        .put("http://localhost:8080/lease-contract/update/", blob, config)
        .then((response) => {
          if(response.data.message === 'Full authentication is required to access this resource') {
            localStorage.removeItem('user');
            navigate("/auth/login");
            return
          } 
          if (response.data.status === 1) {
            alert("Update request thành công");
            navigate("/admin/list-device");
            setData(defaultValue)
            setAssets([])

          } else {
            alert(response.data.message);
            return;
          }
        })
        .catch(console.log);
    }
}

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row style={{marginBottom:'20px'}}>
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
                            htmlFor="input-password"
                          >
                            Ngày kết thúc
                          </label>
                          <Input
                            name="leased_at"
                            className="form-control-alternative"
                            value={data.leased_at}
                            onChange={handleChangeData}
                            type="date"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
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
                      
                    </Row>
                    <Button color="primary" onClick={()=>submitRequest()}>Submit</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="6">
          <Card className="shadow" style={{height:335}}>
                      <Table className="align-items-center" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {assets.map((ob) => (
                            <tr key={ob.asset.id}>
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
                                  <DropdownMenu
                                    className="dropdown-menu-arrow"
                                    right
                                  >
                                    <DropdownItem
                                      onClick={() =>
                                        deleteDevice(ob.asset.id)
                                      }
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
                  <FormGroup>
                    <ButtonDropdown className="form-control-alternative">
                      <Dropdown isOpen={dropdownOpenCS} toggle={toggleCS}>
                        <DropdownToggle caret className="dropdown-toggle">
                          {idc.name}
                        </DropdownToggle>
                        <DropdownMenu className="currency-dropdown">
                          <DropdownItem
                            onClick={() => handleChangeDropCSearch("", "All")}
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
                            <th style={{'font-weight': '700','color':'#000000'}} scope="col">Name</th>
                           
                            <th scope="col">Image</th>
                            <th scope="col">Category</th>
                            <th  style={{'font-weight': '700','color':'#000000'}}  scope="col">Status</th>
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((data) => (
                            <tr key={data.id}>
                              <td>{data.id}</td>
                              <td style={{'font-weight': '700','color':'#000000'}}>{data.name}</td>
                            
                              <td>
                                <img
                                  src={data.attachments[0].source}
                                  style={{ "max-width": "120px" }}
                                  alt="..."
                                />
                              </td>
                              <td>{data.category.name}</td>
                              <td  style={{'font-weight': '700','color':'#000000'}} >{data.state === 0 ? 'Sẵn sàng' : data.state === 1 ? 'Không sẵn sàng' : 'Bảo trì' }</td>
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
                                        addDeviceTmp(data.id, data.state,data.name)
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

export default CreateRequest;
