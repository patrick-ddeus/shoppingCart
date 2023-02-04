import ProductDatabase from "../db/product-database.js"
class Render{
    constructor(){
        
    }

    generateProducts = () =>{
        const promisse = new Promise((resolve, reject) =>{
            const products = ProductDatabase.getProducts().reduce((acc, product) =>{
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
            resolve(products)
            reject(new Error("Ocorreu um erro"))
        })
        return promisse
    }
}

export default new Render