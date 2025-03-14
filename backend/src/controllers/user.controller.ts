import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from '../types/user'

const getUsers = (req: Request, res: Response) => {
    const users = userModel.getUsers()
    res.status(200).json(users)
}
const getUserByUsername = (req: Request, res: Response) => { 
    if (req.session && req.session.username) {
        const user = userModel.findByUserName(req.session.username)
        res.status(200).json(user)
    }
    res.status(500).send('User is not logged in')
}
const loginUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(500).send('Missing credentials')
        return
    }
    const user = await userModel.login(username, password)
    if (!user) {
        res.status(500).send('Incorrect credentials')
        return
    }
    if (req.session) {
        req.session.isLoggedId = true
        req.session.username = user.username
    }
    res.status(200).send('You are logged in')
}
const addUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
    const { username, password, firstname, lastname } = req.body
    if (!username || !password || !firstname || !lastname) {
        res.status(500).json({ error: 'Missing parameters' })
        return
    }
    const user = await userModel.create({ username, password, firstname, lastname })
    if (!user) {
        res.status(409).json({ error: 'Username is taken' })
        return
    }
    res.status(201).json(user)
}

const logout = (req: Request, res: Response) => {
    req.session = null
    res.status(300).send('Cookie cleared')
}

export default {
    getUsers,
    getUserByUsername,
    loginUser,
    addUser,
    logout
}