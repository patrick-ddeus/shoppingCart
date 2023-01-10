import { dishApi } from "../api/disheapi.js"
import { orders } from "../db/orders.js"

const getDishById = (type, id) =>{
    dishApi.groups[type].forEach((dish) =>{
        if(dish.id === Number(id)){
            return dish
        }
    })
    // console.log(dishApi.groups)
}

function onCardClick(event){
    let target = event.currentTarget
    const targetClass = target.classList[0]
    const [type, id] = targetClass.split("-")
    // console.log(type, id)
    const produto = getDishById(type, id)
    console.log(produto)
    // orders.insertOrder(produto)
}

function insertOnCardEvent(){
    const cards = document.querySelectorAll(".products")
    console.log(cards.length)
    cards.forEach(card => card.onclick = onCardClick)
}

export {insertOnCardEvent}