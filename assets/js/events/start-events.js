import { insertCartEvents } from "./on-cart-events.js"
import { updateTotalInHTML } from "../utils/utils.js"
import CartController from "../controllers/CartController.js"

class StartEvents {
    onSelectProduct() {
        insertCartEvents()
    }

    onShoppingCartPage() {
        // Eventos do botão de deletar do carrinho
        const removeBtn = document.querySelectorAll(".remove-btn")
        removeBtn.forEach(btn => {
            btn.addEventListener("click", e => {
                const button = e.currentTarget;
                const tableRow = button.parentElement.parentElement
                const id = button.id.split("-")[1]
                CartController.removeProductsFromCart(id, tableRow)
            })
        })

        // Eventos nos botões de quantidade
        const addButton = document.querySelectorAll(".button-add")
        const lessButton = document.querySelectorAll(".button-rm")
        const totalSpan = document.querySelector(".total span")
        addButton.forEach(btn => btn.addEventListener("click", _ => {
            const input = btn.nextElementSibling
            input.value = Number(input.value) + 1
            CartController.calculateTotalFromCart(updateTotalInHTML)
        }))

        lessButton.forEach(btn => btn.addEventListener("click", _ => {
            const input = btn.previousElementSibling
            input.value = Number(input.value) === 1 ? 1 : Number(input.value) - 1
            CartController.calculateTotalFromCart(updateTotalInHTML)
        }))
    }
}


export default new StartEvents