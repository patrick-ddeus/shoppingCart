import ProductBuilder from "../model/ProductBuilderModel.js"
import { callToast } from "../utils/utils.js"

class CartModel{
    constructor(){
        this.produtos = []
    }

    addProduct = (productObject) => {
        const productExist = this.produtos.find(product => product.getId() === productObject.getId())
        if(productExist) return callToast(`Produto já adicionado`, "#FFDD00", "#FBB034")

        this.removeProducts(productObject.getId())
        
        this.produtos.push(productObject)
        this.saveProducts()
        callToast("Produto adicionado com sucesso!!", "", "", "center")
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
            return produto
        })

        this.produtos = newDatabase
    }
}

export default CartModel