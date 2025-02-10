import { cookies } from "next/headers";

const CART_COOKIE_NAME = "shopping-cart"

export const cartService = {
  getCart: (): any[] => {
    const cartJson = cookies().get(CART_COOKIE_NAME)
    return cartJson ? JSON.parse(cartJson.value) : []
  },

  addToCart: (item: any) => {
    const currentCart = cartService.getCart()
    const updatedCart = [...currentCart, item]
    cookies().set(CART_COOKIE_NAME, JSON.stringify(updatedCart), { expires: 7 })
    return updatedCart
  },

  updateCart: (cart: any[]) => {
    cookies().set(CART_COOKIE_NAME, JSON.stringify(cart), { expires: 7 })
    return cart
  },

  clearCart: () => {
    cookies().set(CART_COOKIE_NAME, '', { expires: new Date(0) })
    return []
  },
}

