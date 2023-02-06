import ProductBuilder from "../model/ProductBuilderModel.js"
import { callToast } from "../utils/utils.js"

class CartModel{
    constructor(){
        this.produtos = []
    }

    addProduct = (productObject) => {
        const productExist = this.produtos.find(product => product.getId() === productObject.getId())
        if(productExist) return callToast(`Produto já adicionado`, "#FFDD00", "#FBB034")
        productObject.quantity = 1
        this.produtos.push(productObject)
        this.saveProducts()
        callToast("Produto adicionado com sucesso!!", "#0BAB64", "#3BB78F", "center")
    }

    removeProducts = (id) => {
        this.produtos.forEach((product, indice) => {
            if (product.getId() === Number(id)) {
                this.produtos.splice(indice, 1)
                callToast("Produto deletado com sucesso", "#DE3163", "#E0115F", "right")
                return
            }
        })
        this.saveProducts()
    }

    getProducts = () => {
        return [...this.produtos];
    }

    updateQuantity = (id, quantity) =>{
        this.produtos.forEach(product =>{
            if(product.getId() === Number(id)){
                product.quantity = quantity
            }
        })
        this.saveProducts()
    }

    calculateTotal = () =>{
        const sum = this.produtos.reduce((acc, produto) =>{
            acc += (produto.getPrice() * produto.quantity)
            return acc
        }, 0)
        return sum
    }

    saveProducts() {
        const productsForSave = this.produtos.map(product => {
            return {
                quantity:product.quantity,
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
        const newDatabase = cart.map(({id, name, price, brand, img, quantity }) => {
            const produto = new ProductBuilder(name, price, brand, img)
            produto.quantity = quantity
            produto.setId(id)
            return produto
        })

        this.produtos = newDatabase
        return this.produtos
    }
}

export default CartModel