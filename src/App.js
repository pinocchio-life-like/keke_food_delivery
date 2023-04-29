import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import AddBoard from "./Components/PageContent/AddBoard/AddBoard";
import OrderContext from "./Context/order-context";

function App() {
  const [ordering, setOrdering] = useState([]);
  const [orderCount, setOnOrderCount] = useState(0);
  const onOrderChange = (ordering, orderCount) => {
    setOrdering(ordering);
    setOnOrderCount(orderCount);
  };
  return (
    <div className="App">
      <OrderContext.Provider
        value={{ ordering: ordering, orderCount: orderCount }}>
        <Header />
        <AddBoard onOrderChange={onOrderChange} />
      </OrderContext.Provider>
    </div>
  );
}

export default App;
