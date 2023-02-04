import ProductBuilder from "./product-builder.js"
class ShoppingCart {
    constructor() {
        this.produtos = []
    }

    addProduct = (productObject) => {
        this.removeProducts(productObject.getId())

        this.produtos.push(productObject)
        console.log(this.produtos)
        this.saveProducts()
    }

    removeProducts = (id) => {
        this.produtos.forEach((product, indice) => {
            if (product.getId() === id) {
                this.produtos.splice(indice, 1)
                return
            }
        })
    }

    getProducts = () => {
        return [...this.produtos]
    }

    saveProducts() {
        const productsForSave = this.produtos.map(product => {
            return {
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
                brand: product.getBrand(),
                img: product.getImg()
            }
        })

        localStorage.setItem("cart", JSON.stringify(productsForSave))
    }

    loadProducts() {
        const cart = JSON.parse(localStorage.getItem("cart"))

        // Cria novos objetos a partir da classe ProductBuilder para inserir na página novamente
        const newDatabase = cart.map(({ name, price, brand, img }) => {
            return new ProductBuilder(name, price, brand, img)
        })

        this.produtos = newDatabase
    }
}

const SHOPPING_CART = new ShoppingCart

export default SHOPPING_CART