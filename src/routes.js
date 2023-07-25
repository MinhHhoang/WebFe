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
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import ManagerUser from "views/examples/ManagerUser";
import ManagerDepartement from "views/examples/ManagerDepartement";
import ManagerCategory from "views/examples/ManagerCategory";
import ManagerDevice from "views/examples/ManagerDevice";
import DetailDevice from "views/examples/DetailDevice";
import DetailDeviceRequest from "views/examples/DetailDeviceRequest";
import DetailDeviceRequestMantance from "views/examples/DetailDeviceRequestMantance";
import DeviceAprove from "views/examples/DeviceAprove";
import DeviceAproveMaintance from "views/examples/DeviceAproveMaintance";
// import DeviceAprovebBoPhan from "views/examples/DeviceAprovebBoPhan";
// import ManagerMember from "views/examples/ManagerMember";
import ListDevice from "views/examples/ListDevice";
import ListDeviceRevoke from "views/examples/ListDeviceRevoke";
import ListDeviceMaintance from "views/examples/ListDeviceMaintance";
import StaticAdmin from "views/examples/StaticAdmin";
import StaticManager from "views/examples/StaticManager";
import Index from "views/Index";
import DeviceUsed from "views/examples/DeviceUsed";
import CreateRequest from "views/examples/CreateRequest";
import CreateRequestMaintenance from "views/examples/CreateRequestMaintenance";
import CreateRequestRekove from "views/examples/CreateRequestRekove";
import MyListDeviceRevoke from "views/examples/MyListDeviceRevoke";

var routes = [
  {
    path: "/detail-request-device",
    name: "Detail Device",
    icon: "ni ni-tv-2 text-primary",
    component: <DetailDeviceRequest />,
    layout: "/admin",
    hidden: true,
    permison: "0",
  },

  {
    path: "/detail-request-device-maintance",
    name: "Detail Device",
    icon: "ni ni-tv-2 text-primary",
    component: <DetailDeviceRequestMantance />,
    layout: "/admin",
    hidden: true,
    permison: "0",
  },

  {
    path: "/manager-device/device-detail",
    name: "Detail Device",
    icon: "ni ni-tv-2 text-primary",
    component: <DetailDevice />,
    layout: "/admin",
    hidden: true,
    permison: "0",
  },

  {
    path: "/list-used",
    name: "Danh sách thiết bị sử dụng",
    icon: "ni ni-tv-2 text-primary",
    component: <DeviceUsed />,
    layout: "/admin",
    hidden: true,
    permison: "USER",
  },
  {
    path: "/",
    name: "Trang chủ",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    hidden: true,
    permison: "0",
  },
  {
    path: "/manager-user",
    name: "Quản lý User",
    icon: "ni ni-circle-08 text-pink",
    component: <ManagerUser />,
    layout: "/admin",
    hidden: false,
    permison: "ADMIN",
  },
  {
    path: "/manager-category",
    name: "Quản lý category",
    icon: "ni ni-circle-08 text-pink",
    component: <ManagerCategory />,
    layout: "/admin",
    hidden: false,
    permison: "ADMIN",
  },
  {
    path: "/manager-category",
    name: "Quản lý category",
    icon: "ni ni-circle-08 text-pink",
    component: <ManagerCategory />,
    layout: "/admin",
    hidden: false,
    permison: "STAFF",
  },
  {
    path: "/manager-departement",
    name: "Quản lý departement",
    icon: "ni ni-circle-08 text-pink",
    component: <ManagerDepartement />,
    layout: "/admin",
    hidden: false,
    permison: "ADMIN",
  },
  {
    path: "/manager-device",
    name: "Quản lý thiết bị",
    icon: "ni ni-laptop text-info",
    component: <ManagerDevice />,
    layout: "/admin",
    hidden: false,
    permison: "ADMIN",
  },
  {
    path: "/manager-device",
    name: "Quản lý thiết bị",
    icon: "ni ni-laptop text-info",
    component: <ManagerDevice />,
    layout: "/admin",
    hidden: false,
    permison: "STAFF",
  },

  {
    path: "/create-device-request",
    name: "Request device",
    icon: "ni ni-circle-08 text-pink",
    component: <CreateRequest />,
    layout: "/admin",
    hidden: false,
    permison: "0",
  },

  {
    path: "/list-device",
    name: "My Danh sách thiết bị request",
    icon: "ni ni-circle-08 text-pink",
    component: <ListDevice />,
    layout: "/admin",
    hidden: false,
    permison: "0",
  },

  {
    path: "/create-device-maintance",
    name: "Request device maintance",
    icon: "ni ni-circle-08 text-pink",
    component: <CreateRequestMaintenance />,
    layout: "/admin",
    hidden: false,
    permison: "0",
  },
  {
    path: "/list-device-maintance",
    name: "My Danh sách thiết bị request maintance",
    icon: "ni ni-circle-08 text-pink",
    component: <ListDeviceMaintance />,
    layout: "/admin",
    hidden: false,
    permison: "0",
  },

  {
    path: "/create-device-rekove",
    name: "Request device rekove",
    icon: "ni ni-circle-08 text-pink",
    component: <CreateRequestRekove />,
    layout: "/admin",
    hidden: false,
    permison: "0",
  },
  {
    path: "/my-list-device-revoke",
    name: "My Danh sách thiết bị revoke",
    icon: "ni ni-circle-08 text-pink",
    component: <MyListDeviceRevoke />,
    layout: "/admin",
    hidden: false,
    permison: "0",
  },
  // {
  //   path: "/manager-member",
  //   name: "Quản lý thành viên",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <ManagerMember />,
  //   layout: "/admin",
  //   hidden:false,
  //   permison: "STAFF"
  // },

  {
    path: "/manager-device-request",
    name: "Quản lý phê duyệt thiết bị",
    icon: "ni ni-favourite-28 text-pink",
    component: <DeviceAprove />,
    layout: "/admin",
    hidden: false,
    permison: "ADMIN",
  },
  {
    path: "/manager-device-request",
    name: "Quản lý phê duyệt thiết bị",
    icon: "ni ni-favourite-28 text-pink",
    component: <DeviceAprove />,
    layout: "/admin",
    hidden: false,
    permison: "STAFF",
  },

  {
    path: "/manager-maintance-request",
    name: "Quản lý phê duyệt bảo trì",
    icon: "ni ni-favourite-28 text-pink",
    component: <DeviceAproveMaintance />,
    layout: "/admin",
    hidden: false,
    permison: "ADMIN",
  },
  {
    path: "/manager-maintance-request",
    name: "Quản lý phê duyệt bảo trì",
    icon: "ni ni-favourite-28 text-pink",
    component: <DeviceAproveMaintance />,
    layout: "/admin",
    hidden: false,
    permison: "STAFF",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-pink",
    component: <Login />,
    layout: "/auth",
    hidden: false,
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
    hidden: false,
  },

  {
    path: "/list-device-revoke",
    name: "Danh sách device revoke",
    icon: "ni ni-circle-08 text-pink",
    component: <ListDeviceRevoke />,
    layout: "/admin",
    hidden: false,
    permison: "ADMIN",
  },

  {
    path: "/list-device-revoke",
    name: "Danh sách device revoke",
    icon: "ni ni-circle-08 text-pink",
    component: <ListDeviceRevoke />,
    layout: "/admin",
    hidden: false,
    permison: "STAFF",
  },

  {
    path: "/static",
    name: "Thống kê tài sản",
    icon: "ni ni-books text-info",
    component: <StaticAdmin />,
    layout: "/admin",
    hidden: false,
    permison: "ADMIN",
  },
  {
    path: "/static-manager",
    name: "Thống kê tài sản",
    icon: "ni ni-books text-info",
    component: <StaticManager />,
    layout: "/admin",
    hidden: false,
    permison: "STAFF",
  },
];
export default routes;
