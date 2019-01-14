import express from "express";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import path from "path"
import sqlite3 from "sqlite3"

import { Request, Response } from "express";
import { asyncHandler, authHandler } from "./utils/MiddlewareUtils"
import { secret } from "./consts"
import { DogsController } from "./controllers/DogsController"
import { UserController } from "./controllers/UserController";

const app = express()
const db = new sqlite3.Database(":memory:", (err: Error) => {
    if (err) {
        throw new Error("Opening database failed")
    }
})
const dogsController = new DogsController(db)
const userController = new UserController(db)

app.use((req: Request, res: Response, next) => {
    console.log("App:", req.method, req.path)
    next()
})

app.get("/", (req: Request, res) => {
    res.sendFile(path.resolve(__dirname, "../client/index.html"))
})

app.use(express.static(path.resolve(__dirname, "../client")))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

// Entries
app.get("/api/entries", asyncHandler((req: Request, res: Response, next: any) => {
    dogsController.getExibitionEntries(req, res)
}))
app.delete("/api/entries", authHandler, asyncHandler((req: Request, res: Response, next: any) => {
    dogsController.deleteExibitionEntry(req, res)
}))
app.post("/api/entries", authHandler, asyncHandler((req: Request, res: Response) => {
    dogsController.createExibitionEntries(req, res)
}))
// Dogs
app.get("/api/dogs", asyncHandler((req: Request, res: Response, next: any) => {
    dogsController.getDogs(req, res)
}))
app.delete("/api/dogs", authHandler, asyncHandler((req: Request, res: Response) => {
    dogsController.deleteDog(req, res)
}))
// Owners
app.get("/api/owners", asyncHandler((req: Request, res: Response, next: any) => {
    dogsController.getOwners(req, res)
}))
app.delete("/api/owners", authHandler, asyncHandler((req: Request, res: Response) => {
    dogsController.deleteOwner(req, res)
}))
// Exibitions
app.get("/api/exibitions", asyncHandler((req: Request, res: Response, next: any) => {
    dogsController.getExibitions(req, res)
}))
app.delete("/api/exibitions", authHandler, asyncHandler((req: Request, res: Response) => {
    dogsController.deleteExibition(req, res)
}))

// Auth stuff
app.post("/api/login", asyncHandler(async (req: Request, res: Response, next: any) => {
    const user = req.body.username
    const password = req.body.password
    console.log("App: try auth with: ", user, password)
    if (user && password) {
        const authenticated = await userController.authenticate(user, password)
        if (authenticated) {
            const token = jwt.sign(user, secret)
            res.cookie("token", token).sendStatus(200)
        } else {
            res.status(401).send({ error: "password_incorrect" })
        }
    } else {
        res.status(401).send({ error: "password_incorrect" })
    }
}))

app.post("/api/logout", (req: Request, res: Response) => {
    res.clearCookie("token", { path: "/" }).sendStatus(200)
})

app.get("/checkToken", authHandler, (req: Request, res: Response) => {
    res.sendStatus(200)
})


app.get('/*', function (req: Request, res) {
    res.sendFile(path.resolve(__dirname, "../client/index.html"))
})

app.listen(3000, () => console.log("Listening on 3000..."))