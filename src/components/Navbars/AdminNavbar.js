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
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
} from "reactstrap";

import {  useNavigate } from "react-router-dom";

const AdminNavbar = (props) => {

  const logout = () =>{
    localStorage.removeItem('user');
    navigate("/auth/login");
  }

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  if(user === null) {
    navigate("/auth/login");
  }


  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <span>
                  <i className="ni ni-bullet-list-67" />
                  </span>
              </DropdownToggle>
              <DropdownMenu right className="dropdown-menu-right">
                {user.position === 'USER' ? <>
                <DropdownItem to="/admin/create-device-request" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Create request device</span>
                </DropdownItem>
                <DropdownItem to="/admin/list-device" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Danh sách request device</span>
                </DropdownItem>
                <DropdownItem to="/admin/create-device-maintance" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Create maintance device</span>
                </DropdownItem>
                <DropdownItem to="/admin/list-device-maintance" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Danh sách maintance device</span>
                </DropdownItem>
                <DropdownItem to="/admin/create-device-rekove" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Create request revoke</span>
                </DropdownItem>
                <DropdownItem to="/admin/my-list-device-revoke" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Danh sách revoke device</span>
                </DropdownItem>
                <DropdownItem divider /></> : <></>}
                <DropdownItem href="#pablo" onClick={() => logout()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
