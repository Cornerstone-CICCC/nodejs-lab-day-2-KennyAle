import { Router, Request, Response } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/users', userController.getUsers)
userRouter.get('/check-auth', userController.getUserByUsername)
userRouter.post('/login', userController.loginUser)
userRouter.post('/signup', userController.addUser)
userRouter.get('/logout', userController.logout)
userRouter.get('/check-cookie', userController.checkCookie)
userRouter.get('/clear-cookie', userController.clearCookie)

export default userRouter