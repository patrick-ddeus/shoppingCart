
class Router {
    constructor(routes){
        this.routes = routes
    }

    start(){
        const currentPath = location.pathname
        const findRoute = this.routes.find(page => page.path === currentPath)
        
        if(findRoute){
            findRoute.onEnter()
        }
    }

    get(path){
        const findRoute = this.routes.find(page => page.path === path)
        if(findRoute && location.pathname !== path){
            window.location.pathname = `${path}`
            findRoute.onEnter()
        }
    }
}


export default Router