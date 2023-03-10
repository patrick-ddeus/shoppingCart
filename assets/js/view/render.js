import ProductController from "../controllers/ProductController.js"
import CartController from "../controllers/CartController.js"

class Render {
    generateProducts = () => {
        const productArea = document.querySelector(".productsArea")
            const products = ProductController.getProductsFromDataBase().reduce((acc, product) => {
                return acc += `
                <div class="productCard" id="product-${product.getId()}">
                    <div class="image-area">
                    <a href="${product.getImg()}"><img src="${product.getImg()}" alt=""></a>
                    </div>
                    <div class="desc-area">
                        <span>${product.getBrand()}</span>
                        <p>${product.getName()}</p>
                        <div class="starArea">
                            <i class="fa fa-star star"></i>
                            <i class="fa fa-star star"></i>
                            <i class="fa fa-star star"></i>
                            <i class="fa fa-star star"></i>
                            <i class="fa fa-star star"></i>
                        </div>
                        <h4>$${product.getPrice()}</h4>
                        <ion-icon name="cart-outline" class="cart"></ion-icon>
                    </div>
                </div>
                `
            }, "")
        productArea.innerHTML = products
    }

    generateProductsIntoCart = () => {
        const productAreaCart = document.querySelector(".products-list")
        const products = CartController.getProductsFromCart().reduce((acc, product) => {
            acc += `
            <tr class="product-row">
                <td>
                    <div class="product-description">
                        <img src="${product.getImg()}" alt="" width="90">
                        <p>${product.getName()}</p>
                    </div>
                </td>
                <td>R$ ${product.getPrice()}</td>
                <td>
                    <div class="buttons-block" id="quantity-${product.getId()}">
                        <button class="button-add"></button>
                        <input type="number" value="1" min="1" disabled class="quantity-input">
                        <button class="button-rm"></button>
                    </div>
                </td>
                <td>
                    <button class="remove-btn" id="remove-${product.getId()}">Remover</button>
                </td>
            </tr>
            `
            return acc
        }, "")
        productAreaCart.innerHTML += products
    }
}

export default new Render