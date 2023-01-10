const url = () => `http://ec2-18-229-118-157.sa-east-1.compute.amazonaws.com:3000/produtos`

const dishApi = {}

dishApi.groups = {}

dishApi.createGroups = dishList =>{
    dishList.forEach(dish =>{
        const type = dish.type
        if(!(type in dishApi.groups)){
            dishApi.groups[type] = []
        }
        dishApi.groups[type].push({...dish})
    })
    
    return dishApi.groups
}

dishApi.generateDishes = () =>{
    return fetch(url())
            .then(response => response.json())
            .then(dishList => dishList.data)
            .then(dishApi.createGroups)
}

export { dishApi }