import CartController from "../controllers/CartController.js"
import { updatePricesInHtml } from "./utils.js"

export function updateButton(button, increment){
    const id = button.parentElement.id.split("-")[1]
    const input = increment ? button.nextElementSibling : button.previousElementSibling

    input.value = Number(input.value) + (increment ? 1 : -1)
    input.value = input.value <= 1 ? 1 : input.value

    CartController.updateQuantityFromCart(id, Number(input.value))
    CartController.calculateTotalFromCart((total) => updatePricesInHtml(total, "total"))
    CartController.calculateSubTotalFromCart((subtotal) => updatePricesInHtml(subtotal, "subtotal"))
}
