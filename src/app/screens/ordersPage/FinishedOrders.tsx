import React from "react";
import { Stack, Box } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Book } from "../../../lib/types/product";

// REDUX SELECTOR
const FinishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(FinishedOrdersRetriever);

  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders.map((order: Order) => {
          return (
            <Box key={order._id} className="order-finish-box">
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
                  justifyContent: "center",
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
              </Stack>
            </Box>
          );
        })}

        {!finishedOrders ||
          (finishedOrders.length === 0 && (
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
