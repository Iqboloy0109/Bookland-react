import React from "react";
import { Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Book } from "../../../lib/types/product";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";

// REDUX SELECTOR
const ProcessOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { processOrders } = useSelector(ProcessOrdersRetriever);
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();

  // HANDLERS
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      // Payment Process

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you recieved your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        // => Process orders
        setValue("3");
        // Rebuild
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="2">
      <Stack>
        {processOrders.map((order: Order) => {
          return (
            <Box key={order._id} className="order-process-box">
              <Box className="order-box-scroll">
                {order?.orderItems.map((item: OrderItem) => {
                  const product: Book = order.productData.filter(
                    (ele: Book) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.bookImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <img
                        src={imagePath}
                        alt="lavash picture"
                        className="order-dish-image"
                      />
                      <p className="title-dish">{product.bookTitle}</p>
                      <Box className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" alt="CloseIcon" />
                        <p style={{ paddingLeft: "10px" }}>
                          {item.itemQuantity}
                        </p>
                        <img src="/icons/pause.svg" alt="pauseIcon" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Stack
                className="order-box-final"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginLeft: "15px",
                }}
              >
                <p className="final-words">Product price</p>
                <p className="final-numbers">
                  ${order.orderTotal - order.orderDelivery}
                </p>
                <img src="/icons/plus.svg" alt="PlusIcon" />
                <p className="final-words">Delivery cost</p>
                <p className="final-numbers">${order.orderDelivery}</p>
                <img src="/icons/pause.svg" alt="pauseIcon" />
                <p className="final-words">Total</p>
                <p className="final-numbers">${order.orderTotal}</p>
                <p className="data-compl">
                  {moment().format("YY-MM-DD HH:mm")}
                </p>

                <Button
                  value={order._id}
                  className="verify-btn"
                  variant="contained"
                  onClick={finishOrderHandler}
                >
                  VERIFY TO FULFIL
                </Button>
              </Stack>
            </Box>
          );
        })}

        {!processOrders ||
          (processOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src="/icons/noimage-list.svg"
                alt="No Image"
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
