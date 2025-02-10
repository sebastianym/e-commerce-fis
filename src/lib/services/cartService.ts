export const cartService = {
  getCart: (): any[] => {
    if (typeof window === "undefined") return []; // Evita errores en SSR
    const cartJson = localStorage.getItem("shopping-cart");
    return cartJson ? JSON.parse(cartJson) : [];
  },

  addToCart: (item: any) => {
    const currentCart = cartService.getCart();
    const updatedCart = [...currentCart, item];
    localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
    return updatedCart;
  },

  updateCart: (cart: any[]) => {
    localStorage.setItem("shopping-cart", JSON.stringify(cart));
    return cart;
  },

  clearCart: () => {
    localStorage.removeItem("shopping-cart");
    return [];
  },
};
