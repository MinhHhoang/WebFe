/* eslint-disable react-hooks/exhaustive-deps */
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
  Container,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Chart } from "react-google-charts";


export const options = {
  title: "Thống kê status tài sản",
  is3D: true,
};

const StaticAdmin = () => {
  const [lists, setLists] = useState([]);
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    navigate("/auth/login");
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = {
    headers: {
      Authorization: "Bearer " + user.access_token,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/asset/list", config)
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
          const listnew = response.data.result.data;
          const ss = listnew.filter((x) => x.state === 0).length;
          const nss = listnew.filter((x) => x.state === 1).length;
          const bt = listnew.filter((x) => x.state === 2).length;
          
          const datas = [
            [ "Task", "Hours per Day" ],
            [ "Sẵn sàng", ss ],
            ["Không sẵn sàng",nss ],
            ["Bảo trì", bt ]
          ];

          setData(datas)
        }
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sample data

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container>
      <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"600px"}
        />
      </Container>
     
    </>
  );
};

export default StaticAdmin;
