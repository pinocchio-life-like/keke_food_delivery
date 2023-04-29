import { Button, Card, Form, InputNumber, List } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import React, { useContext, useEffect, useState } from "react";
import "./AddBoard.css";
import OrderContext from "../../../Context/order-context";

const data = [
  {
    key: Math.random(),
    name: "Shushi",
    description: "Finest fish!",
    price: "22.09",
  },
  {
    key: Math.random(),
    name: "Borger",
    description: "My moms special!",
    price: "45.09",
  },
  {
    key: Math.random(),
    name: "Shiro Feses",
    description: "Saron special!",
    price: "15.09",
  },
  {
    key: Math.random(),
    name: "Firfir",
    description: "Be injera be dabo!",
    price: "20.09",
  },
  {
    key: Math.random(),
    name: "Kocho",
    description: "Gurage sweet kocho!",
    price: "35.09",
  },
  {
    key: Math.random(),
    name: "Chororsa",
    description: "Wollega best known!",
    price: "28.09",
  },
];

const AddBoard = (props) => {
  // const context = useContext({ orderData: "" });
  const [ordering, setOrdering] = useState(() => {
    return data.map((data) => {
      return { name: data.name, price: data.price, amount: 0 };
    });
  });
  const [orderCount, setOrderCount] = useState(0);
  useEffect(() => {
    props.onOrderChange(ordering, orderCount);
  }, [ordering, orderCount, props]);
  return (
    <div className="MainAddBoard">
      <div className="AddBoard">
        <Card
          style={{
            border: "none",
            backgroundColor: "rgba(99, 99, 99, 0.7)",
          }}
          className="BoardCard">
          <Title
            style={{ marginTop: 0, color: "white", fontFamily: "monospace" }}
            level={2}>
            Delicious Food! Anywhere, Anytime
          </Title>
          <p
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "monospace",
              bottom: 0,
            }}>
            Choose your favorite meal from our broad selection of available
            meals and enjoy a delicious lunch or dinner at the comfort of your
            home!
          </p>
        </Card>
        <Card
          style={{
            border: "none",
            marginTop: 20,
            backgroundColor: "rgba(255, 255, 255, 1)",
          }}
          className="BoardCard">
          <List
            dataSource={data}
            style={{ overflow: "auto", height: 300 }}
            renderItem={(item, whatever) => (
              <List.Item key={Math.random()}>
                <div style={{ textAlign: "left" }}>
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 800 }}>
                      {item.name}
                    </span>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      {item.description}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "rgb(169, 59, 12)",
                      fontSize: 16,
                      fontWeight: 800,
                    }}>
                    ${item.price}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ fontSize: 15, fontWeight: 800 }}>Amount</p>
                  <Form
                    style={{ display: "flex" }}
                    name="ItemListForm"
                    onFinish={() => {
                      ordering.splice(whatever, 1, {
                        name: item.name,
                        price: item.price,
                        amount: ordering[whatever].amount + 1,
                      });
                      setOrdering([...ordering]);
                      let count = 0;
                      ordering.forEach((data) => {
                        count += data.amount;
                      });
                      setOrderCount(count);
                    }}>
                    <Form.Item
                      noStyle
                      name="amount"
                      initialValue={ordering[data.indexOf(item)].amount}>
                      <InputNumber
                        min={1}
                        max={5}
                        onChange={(value) => {
                          ordering.splice(whatever, 1, {
                            name: item.name,
                            price: item.price,
                            amount: value,
                          });
                          setOrdering([...ordering]);
                          let count = 0;
                          ordering.forEach((data) => {
                            count += data.amount;
                          });
                          setOrderCount(count);
                        }}
                        id={data.indexOf(item)}
                        style={{
                          marginLeft: 10,
                          height: 30,
                          width: 50,
                          fontSize: 17,
                          fontWeight: 700,
                          border: "1px solid #ccc",
                          borderRadius: 5,
                          textAlign: "center",
                        }}
                      />
                    </Form.Item>
                    <Form.Item noStyle>
                      <Button
                        type="ghost"
                        htmlType="submit"
                        className="AddButton">
                        <PlusCircleFilled />
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default AddBoard;
