import CartController from "../controllers/CartController.js"
import ProductController from "../controllers/ProductController.js"
import { updatePricesInHtml, validDescount } from "../utils/utils.js"
import { updateButton } from "../utils/buttonHandlers.js"

class StartEvents {
    onSelectProduct() {
        const productsArea = document.querySelector(".productsArea")
        productsArea.addEventListener("click", e => {
            const target = e.target
            if (target.classList.contains("cart")) {
                cartEvent(target)
            }
        })

        function cartEvent(cartIcon) {
            const productCard = cartIcon.parentElement.parentElement
            const id = productCard.id.split("-")[1]

            const productObject = ProductController.getProductById(Number(id))
            CartController.addProductToCart(productObject)
        }
    }
    // @params

    onShoppingCartPage() {
        // Eventos do botão de deletar do carrinho
        const productList = document.querySelector(".products-list")

        productList.addEventListener("click", e => {
            const target = e.target;
            switch (true) {

                case target.matches(".remove-btn"):
                    const tableRow = target.parentElement.parentElement;
                    const id = target.id.split("-")[1];
                    CartController.removeProductsFromCart(id, tableRow);
                    break;

                case target.matches(".button-add"):
                    updateButton(target, true);
                    break;

                case target.matches(".button-rm"):
                    updateButton(target, false);
                    break;

                case target.matches(".update-quantity"):
                    CartController.calculateTotalFromCart((total) => updatePricesInHtml(total, "total"))
                    CartController.calculateSubTotalFromCart((subtotal) => updatePricesInHtml(subtotal, "subtotal"))
                    break;
                    
                default:
                    break;
            }
        })

        // Eventos no botão de desconto
        const applyButton = document.querySelector(".apply-descount")
        const input = applyButton.previousElementSibling;
        const descount = document.querySelector(".descount span")
        applyButton.addEventListener("click", _ => {
            if (input.value === "giveme-stars") {
                descount.innerHTML = `R$ 15,00`
                validDescount(input, "Cupom inserido com sucesso!", true)
            } else {
                descount.innerHTML = `R$ 0,00`
                validDescount(input, "Cupom inválido!", false)
            }
            CartController.calculateTotalFromCart((total) => updatePricesInHtml(total, "total"))
        })
    }
}


export default new StartEvents