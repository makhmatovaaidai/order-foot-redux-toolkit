import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { BASE_URL } from "./utils/constans/general";
import { uiActions } from "./store/reducers/uiSlice";
import Notification from "./components/UI/Notification";

let isinitial = true;
function App() {
  const { notication, cartVisible } = useSelector((state) => state.ui);
  console.log(notication);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    let timerId;
    if (notication) {
      timerId = setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [notication]);

  // console.log(cart);
  useEffect(() => {
    if (isinitial) {
      isinitial = false;
      return;
    }
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending",
        message: "Sending data",
      })
    );
    fetch(BASE_URL, {
      method: "PUT",
      body: JSON.stringify(cart),
    }).then((response) => {
      // if (!response.ok) {
      //   throw new Error("Setting data failed");
      // }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sending cart data succesfully",
        })
      );
    });
  }, [cart]);
  return (
    <>
      {notication && (
        <Notification
          status={notication.status}
          title={notication.title}
          message={notication.message}
        />
      )}

      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
