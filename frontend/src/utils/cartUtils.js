const addDecimal = (num) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state) => {
  //calculate items price
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );
  // calculate shipping price if(shipping price <400 ? 0 : 100 )
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

  //calculate tax price (0.15%)
  state.taxPrice = addDecimal(0.15 * state.itemsPrice);

  //calculate total price(items price + shipping price + tax price)
  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
