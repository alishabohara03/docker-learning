import { User } from "../models/users.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(403).json({
                success: false,
                message: "This email id is already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


export const login = async(req, res) =>{
    try {
          const {email, password}  = req.body;
        if (!email || !password) {
            return res.status(403).json({
                sucess: false,
                message: "All fields are required.",
            })
        }
      
        const user = await User.findOne({email});
        if(!user){
            return res.status(403).json({
                sucess: false,
                message: "Incorrect password or password.",
            })
        }
        const isPasswordMatch = await   bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(403).json({
                sucess: false,
                message: "Incorrect password or password.",
            })
        }
        return res.status(200).json({
            sucess:true,
            message:`Welcome back ${user.fullName}`
        })
    } catch (error) {
        
    }
}
