import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "../../components/divider";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import "../../../css/order.css";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { authMember, orderBuilder } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderstatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...orderInquiry, orderstatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderstatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderstatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  // HANDLERS
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");
  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table-list"
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
              <Divider width="690" height="2" bg="#E0E0E7" />
            </Box>
            <Stack className="order-main-content">
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order-right">
          <Stack className="user-box">
            <img
              src={
                authMember?.memberImage
                  ? `${serverApi}/${authMember.memberImage}`
                  : "/icons/default-user.svg"
              }
              alt="User Image"
              className="user-image"
            />
            <Box className="badge-font">
              <img
                src={
                  authMember?.memberType === MemberType.RESTAURANT
                    ? "/icons/restaurant.svg"
                    : "/icons/user-badge.svg"
                }
                alt="userBadge"
                className="user-badge"
              />
            </Box>
            <Box className="user-name"> {authMember?.memberNick}</Box>
            <Box className="user-status"> {authMember?.memberType}</Box>
            <Divider width="332" height="2" bg="#A1A1A1" />
            <Stack className="adress-section">
              <LocationOnIcon />
              <Box className="adress">
                {authMember?.memberAddress
                  ? authMember?.memberAddress
                  : "Do not exist"}
              </Box>
            </Stack>
          </Stack>
          <Stack className="card-box">
            <input
              type="number"
              className="card-number"
              placeholder="Card number : 5243 4090 2002 7495"
            />
            <Stack className="card-datas">
              <input type="text" placeholder="07 / 24" />
              <input type="text" placeholder="CVV : 010" />
            </Stack>
            <input
              type="text"
              className="card-user-name"
              placeholder="Justin Robertson"
            />
            <Stack
              className="card-holder"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <img src="/icons/western-card.svg" alt="" />
              <img src="/icons/master-card.svg" alt="" />
              <img src="/icons/paypal-card.svg" alt="" />
              <img src="/icons/visa-card.svg" alt="" />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
