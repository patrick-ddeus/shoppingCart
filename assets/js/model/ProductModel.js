import { geraId, SYMBOLS } from "../utils/utils.js"
import ProductBuilder from "../model/ProductBuilderModel.js"

class ProductModel {
    constructor() {
        this[SYMBOLS.PRODUCTS_LIST] = []
    }

    addProduct(productObj) {
        // Verifica se o produto existe, se caso existir para a função
        if (this.getProductById(productObj.getId())) return

        this[SYMBOLS.PRODUCTS_LIST].push(productObj)
        this.saveProducts()
    }

    removeProduct(id) {
        this[SYMBOLS.PRODUCTS_LIST].forEach((product, indice) => {
            if (product.getId() === id) {
                this[SYMBOLS.PRODUCTS_LIST].splice(indice, 1)
                this.saveProducts()
                return
            }
        })
    }

    getProducts() {
        return [...this[SYMBOLS.PRODUCTS_LIST]]
    }

    getProductById(id) {
        const found = this[SYMBOLS.PRODUCTS_LIST].find(product => product.getId() === id)
        if (!found) return
        return found
    }

    saveProducts() {
        const productsForSave = this[SYMBOLS.PRODUCTS_LIST].map(product => {
            return {
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
                brand: product.getBrand(),
                img: product.getImg()
            }
        })

        localStorage.setItem("database", JSON.stringify(productsForSave))
        localStorage.setItem("id", JSON.stringify(geraId._id))
    }

    loadProducts() {
        const database = JSON.parse(localStorage.getItem("database"))
        const id = JSON.parse(localStorage.getItem("id"))

        // Cria novos objetos a partir da classe ProductBuilder para inserir na página novamente
        const newDatabase = database.map(({ id, name, price, brand, img }) => {
            const produto = new ProductBuilder(name, price, brand, img)
            produto.setId(id)
            return produto
        })

        this[SYMBOLS.PRODUCTS_LIST] = newDatabase
        geraId._id = id
    }
}

const PRODUCT_HANDLER = new ProductModel()

PRODUCT_HANDLER.addProduct(new ProductBuilder("Gray Long-Sleeved Shirt", 98, "adidas", "https://images2.imgbox.com/7c/47/FH8vfglm_o.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Clever Land Orange T-Shirt", 90, "nike", "https://images2.imgbox.com/1d/45/CvEIaGXZ_o.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Over Under Pink T-Shirt", 110, "adidas", "https://images2.imgbox.com/4b/f9/KTb2CHQ2_o.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Black Isle T-shirt", 60, "oakley", "https://images2.imgbox.com/fe/f2/mr0aopOi_o.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Long-Sleeved Dress Shirt", 40, "oakley", "https://images2.imgbox.com/fb/1f/Gf6dHd5G_o.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Cartoon Astronaut T-Shirts", 90, "nike", "https://images2.imgbox.com/dc/c8/TvB8LRJF_o.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Black Triple Circle T-Shirt", 110, "adidas", "https://images2.imgbox.com/92/27/UvNoNQ27_o.png"))
PRODUCT_HANDLER.addProduct(new ProductBuilder("Over Under Pink T-Shirt", 78, "adidas", "https://images2.imgbox.com/4b/f9/KTb2CHQ2_o.png"))

export default ProductModel