import styles from "./Items.module.css";
import { useEffect, useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from "../../store/item";
import {
  fetchCart,
  myCartThunk,
  addCartItem,
  removeCartItem,
  createCart,
  cartClear,
} from "../../store/cart";

const Item = ({ cart }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const allItems = useSelector((state) => state.items);
  const itemValues = Object.values(allItems);
  const user = useSelector((state) => state.session.user);
  const myCart = useSelector((state) => state.cart);
  const cartExist = useSelector((state) => state.my_cart);
  // console.log(cartExist, "HERE");
  // console.log(myCart, "HERE");

  // const filtered = useMemo(() => {
  //   return allItems?.filter((item) => {
  //     return item.toLowerCase().includes(search.toLowerCase());
  //   });
  // }, [allItems, search]);

  // const cartAdd = (item) => {
  //   let newCart = [...cart];
  //   let cartItems = newCart.find((product) => item.name == product.name);
  //   // console.log(cart, "CARTITEMS");
  //   {
  //     if (cartItems) {
  //       cartItems.quantity++;
  //     } else {
  //       cartItems = {
  //         ...item,
  //         quantity: 1,
  //       };
  //       newCart.push(cartItems);
  //     }
  //     setCart(newCart);
  //   }
  // };

  // const cartAdd = async (item) => {
  //   // console.log(item, "ITEM");
  //   // console.log(cart, "CART");
  //   // e.preventDefault();
  //   let payload = {
  //     cart_id: user?.id,
  //     item_id: item?.id,
  //   };

  //   let newCart = [...cart];
  //   let cartItems = newCart.find((product) => item.name == product.name);

  //   {
  //     if (cartItems) {
  //       cartItems.quantity++;
  //     } else {
  //       cartItems = {
  //         ...item,
  //         quantity: 1,
  //       };
  //       newCart.push(cartItems);
  //     }
  //     // setCart(newCart);
  //     await dispatch(addCartItem(payload));
  //   }
  // };
  const cartFetch = async () => {
    await dispatch(myCartThunk());
  };

  const cartCreate = async () => {
    await dispatch(createCart(user?.id));
  };

  const cartAdd = async (item) => {
    // console.log(item, "ITEMID");
    // e.preventDefault();
    let payload = {
      cart_id: user?.id,
      item_id: item?.id,
      // quantity: 1
    };

    let newCart = [...cart];
    const itemNames = newCart.map((item) => item?.item_id);
    let cartItems = itemNames.find((product) => item?.id == product);
    let cartItemName = newCart.find((item) => item?.item_id === cartItems);
    // console.log(newCart, "cart");
    // console.log(item, "ITEM");
    // console.log(itemNames, "itemnames");
    // console.log(cartItems, "cartitems");
    // console.log(cartItemName, "cartItemName");

    {
      // if (cartItemName) {
      //   cartItemName.quantity += 1;
      //   console.log("HAT");
      // } else {
      //   // console.log("HIT");
      //   // cartItems = {
      //   //   ...item,
      //   //   quantity: 1,
      //   // };
      //   cartItemName.quantity = 1;
      //   newCart.push(cartItemName);
      // }
      await dispatch(addCartItem(payload));
    }
  };

  useEffect(() => {
    const getItems = async () => {
      await dispatch(getItemsThunk());
    };
    getItems();
  }, [dispatch]);

  useEffect(() => {
    const getCart = async () => {
      await dispatch(fetchCart(user.id));
    };
    getCart();
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchMyCart = async () => {
  //     await dispatch(myCartThunk(user.id));
  //   };
  //   fetchMyCart();
  // }, [dispatch]);

  // useEffect(() => {
  //   const newCart = async () => {
  //     await dispatch(createCart());
  //   };
  //   newCart();
  // }, [dispatch]);

  return (
    <div className={styles.itemsContainer}>
      <div className={styles.itemsList}>
        {itemValues?.map((item, index) => {
          const itemId = itemValues[index].id;

          return (
            <div key={item.id} className={styles.product}>
              <NavLink
                key={item.id}
                className={styles.image}
                to={`/items/${itemId}`}
              >
                <img className={styles.image} src={item.image} alt="image" />
                <div className={styles.name}>{item.name}</div>
              </NavLink>

              <div className={styles.footer}>
                <div className={styles.price}>${item.price}</div>
                <button className={styles.cart} onClick={() => cartAdd(item)}>
                  <span className={styles.cart}> Add to Cart</span>
                  <i className={`${styles.check}fa-sharp fa-solid fa-check`}>
                    {/* Successfully added */}
                  </i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Item;
