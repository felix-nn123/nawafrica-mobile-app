import { useContext } from "react"

import AuthContext from "../utils/AuthContext"

export default useAuth=()=>{
const {user, setUser}=useContext(AuthContext)

return {user, setUser}

}