import { Button, List, Modal } from "antd";
import {
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import OrderContext from "../../Context/order-context";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [modalListData, setModalListData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const context = useContext(OrderContext);
  useEffect(() => {
    setOrderCount(context.orderCount);
    setModalListData(() => {
      return context.ordering.filter((data) => {
        return data.amount !== 0;
      });
    });
  }, [context]);
  useEffect(() => {
    let total = 0;
    modalListData.forEach((data) => {
      total += parseFloat(data.price, [2]) * data.amount;
    });
    total = total.toFixed(2);
    setTotalPrice(total);
  }, [modalListData]);
  return (
    <div className="Header">
      <div>
        <Title
          style={{ fontFamily: "monospace", color: "aliceblue" }}
          className="HeaderTitle"
          level={1}>
          Kibinesh Shiroo
        </Title>
      </div>
      <div>
        <Button
          type="ghost"
          className="CartButton"
          onClick={() => {
            setOpenModal(true);
          }}>
          <ShoppingCartOutlined /> Your Cart{" "}
          <span
            className="OrderAmountSpan"
            style={{
              marginLeft: 10,
              width: 25,
              borderRadius: "100%",
            }}>
            {orderCount}
          </span>
        </Button>
        <Modal
          className="OrderModal"
          open={openModal}
          onCancel={() => {
            setOpenModal(false);
          }}
          footer={[
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <div style={{ display: "flex" }}>
                <div style={{ fontSize: "18px", fontWeight: 800 }}>
                  Total Amount
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginLeft: 10,
                    height: 25,
                    width: 30,
                    border: "1px solid #ccc",
                    fontSize: 15,
                    fontWeight: 800,
                    borderRadius: 5,
                  }}>
                  {orderCount}
                </div>
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                }}>
                <div>${totalPrice}</div>
                <Button type="ghost" className="AddButton">
                  Order
                </Button>
              </div>
            </div>,
          ]}>
          <List
            style={{ paddingTop: "40px" }}
            dataSource={modalListData}
            renderItem={(item) => (
              <List.Item
                key={Math.random()}
                style={{
                  padding: "20px 0",
                  borderBottom: "2px solid rgb(169, 59, 12)",
                  borderTop: "2px solid rgb(169, 59, 12)",
                }}>
                <div style={{ display: "flex" }}>
                  <div>
                    <span style={{ fontSize: "18px", fontWeight: 800 }}>
                      {item.name}
                    </span>
                  </div>
                  <div
                    style={{
                      marginLeft: 10,
                      color: "rgb(169, 59, 12)",
                      fontSize: 16,
                      fontWeight: 800,
                    }}>
                    ${item.price}
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      marginLeft: 10,
                      height: 25,
                      width: 30,
                      border: "1px solid #ccc",
                      fontSize: 15,
                      fontWeight: 800,
                      borderRadius: 5,
                    }}>
                    x {item.amount}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <Button
                    className="ModalAddAndMinusButton"
                    onClick={() => {
                      const index = modalListData.indexOf(item);
                      if (index >= 0) {
                        if (item.amount === 0) {
                          modalListData.splice(index, 1);
                          setModalListData([...modalListData]);
                          return;
                        }
                        modalListData.splice(index, 1, {
                          name: item.name,
                          price: item.price,
                          amount: item.amount - 1,
                        });
                        setOrderCount(orderCount - 1);
                        setModalListData([...modalListData]);
                      }
                    }}
                    type="ghost"
                    style={{
                      border: "1px solid #ccc",
                    }}>
                    <MinusOutlined />
                  </Button>
                  <Button
                    className="ModalAddAndMinusButton"
                    onClick={() => {
                      const index = modalListData.indexOf(item);
                      if (index >= 0) {
                        modalListData.splice(index, 1, {
                          name: item.name,
                          price: item.price,
                          amount: item.amount + 1,
                        });
                        setOrderCount(orderCount + 1);
                        setModalListData([...modalListData]);
                      }
                    }}
                    type="ghost"
                    style={{
                      marginLeft: 5,
                      border: "1px solid #ccc",
                    }}>
                    <PlusOutlined />
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Header;
