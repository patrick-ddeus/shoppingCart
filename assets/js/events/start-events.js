import CartController from "../controllers/CartController.js"
import ProductController from "../controllers/ProductController.js"
import { updatePricesInHtml , validDescount } from "../utils/utils.js"
import { updateButton } from "../utils/buttonHandlers.js"

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
        const updateQuantity = document.querySelector(".update-quantity")

        addButton.forEach(btn => btn.addEventListener("click", e => {
            const button = e.currentTarget
            updateButton(button, true)
        }))

        lessButton.forEach(btn => btn.addEventListener("click", e => {
            const button = e.currentTarget
            updateButton(button, false)
        }))

        updateQuantity.addEventListener("click", _=>{
            CartController.calculateTotalFromCart((total) => updatePricesInHtml(total, "total"))
            CartController.calculateSubTotalFromCart((subtotal) => updatePricesInHtml(subtotal, "subtotal"))
        })

        // 

        const applyButton = document.querySelector(".apply-descount")
        const input = applyButton.previousElementSibling;
        const descount = document.querySelector(".descount span")
        applyButton.addEventListener("click", _=>{
            if(input.value === "giveme-stars"){
                descount.innerHTML = `R$ 15,00`
                validDescount(input, "Cupom inserido com sucesso!", true)
            }else{
                descount.innerHTML = `R$ 0,00`
                validDescount(input, "Cupom inválido!", false)
            }
            CartController.calculateTotalFromCart((total) => updatePricesInHtml(total, "total"))
        })
    }
}


export default new StartEvents