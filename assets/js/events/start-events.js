import CartController from "../controllers/CartController.js"
import ProductController from "../controllers/ProductController.js"
import { updateTotalInHTML } from "../utils/utils.js"

class StartEvents {
    onSelectProduct() {
        function insertCartEvents(){
            const carts = document.querySelectorAll(".cart")
            carts.forEach(cart => cart.onclick = cartEvent)
        }
        
        function cartEvent(event){
            const cartIcon = event.currentTarget
            const productCard = cartIcon.parentElement.parentElement
            const id = productCard.id.split("-")[1]
        
            const productObject = ProductController.getProductById(Number(id))
            CartController.addProductToCart(productObject)
        }

        insertCartEvents()
    }
    // @params

    onShoppingCartPage(produtos) {
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
        const updateQuantity = document.querySelector(".update-quantity")

        addButton.forEach(btn => btn.addEventListener("click", e => {
            const button = e.currentTarget
            const id = button.parentElement.id.split("-")[1]
            const input = btn.nextElementSibling

            input.value = Number(input.value) + 1
            CartController.updateProductFromCart(id, Number(input.value))
        }))

        lessButton.forEach(btn => btn.addEventListener("click", e => {
            const button = e.currentTarget
            const id = button.parentElement.id.split("-")[1]
            const input = btn.previousElementSibling

            input.value = Number(input.value) === 1 ? 1 : Number(input.value) - 1
            CartController.updateProductFromCart(id, Number(input.value))
        }))

        updateQuantity.addEventListener("click", _=>{
            CartController.calculateTotalFromCart(updateTotalInHTML)
        })
        // 
        const quantityInputs = document.querySelectorAll(".quantity-input")
        quantityInputs.forEach((input, indice) => {
            input.value = produtos[indice].quantity
        })
    }
}


export default new StartEvents