export const isAuth = () =>{
    const jwt = localStorage.getItem('token-info')
    if(jwt){
      return JSON.parse(jwt)
    }
    return false
  }