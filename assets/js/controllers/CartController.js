import ProductBuilder from "../model/ProductModel.js"
import { callToast } from "../utils/utils.js"

class CartController {
    constructor() {
        this.produtos = []
    }

    addProduct = (productObject) => {
        const productExist = this.produtos.find(product => product.getId() === productObject.getId())
        if(productExist) return callToast(`Produto já adicionado`, "#FFDD00", "#FBB034")
        
        this.removeProducts(productObject.getId())
        console.log(this.produtos)
        
        this.produtos.push(productObject)
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
        return [...this.produtos];
    }

    saveProducts() {
        console.log("Produto Salvo")
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
        if(!cart) return
        // Cria novos objetos a partir da classe ProductBuilder para inserir na página novamente
        const newDatabase = cart.map(({id, name, price, brand, img }) => {
            const produto = new ProductBuilder(name, price, brand, img)
            produto.setId(id)
            console.log(produto)
            return produto
        })

        this.produtos = newDatabase
    }
}

const SHOPPING_CART = new CartController;

export default SHOPPING_CART