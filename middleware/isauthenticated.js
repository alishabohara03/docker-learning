
import jwt from "jsonwebtoken";
const  isauthenticated = async (req, resizeBy, next) => {
    try {
        const token = req.cookie.token
        if(!token){
            return resizeBy.status(401).json({
                sucess:false,
                message:"User not authenticated"
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        
    }
}