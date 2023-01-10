import { dishApi } from "./api/disheapi.js";
import { insertOnCardEvent } from "./events/oncardEvents.js";

const root = document.getElementById("root")

const sectionTitles = {
    dish:"Primeiro, seu prato",
    drink:"Agora, sua bebida",
    dessert: "Por fim, sua sobremesa"
}

function createSection(type){
    const section = document.createElement("section")
    const h2 = document.createElement("h2")
    const div = document.createElement("div")
    div.classList.add(`${type}List`)
    
    h2.appendChild(document.createTextNode(sectionTitles[type]))
    section.appendChild(h2)
    section.appendChild(div)
    root.appendChild(section)
    return div
}

async function takeGroupsAndDivide(){
    const dishGroups = await dishApi.generateDishes()
    Object.entries(dishGroups).forEach(group =>{
        const [type, foods] = group
        const section = createSection(type)
        section.innerHTML += convertJsonIntoHtml(foods)
    })
}

function convertJsonIntoHtml(foods){
    insertOnCardEvent()
    return foods.reduce((acc, {id, name, price, type}) =>{
        acc +=`
        <div class="${type}-${id} products">
            <h3>${name}</h3>
            <p>${price.toLocaleString("pt-BR", {style:"currency" ,currency:"BRL"})}</p>
        </div>
        `
        return acc
    }, "")
}

takeGroupsAndDivide()