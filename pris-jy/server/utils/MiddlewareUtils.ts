import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { secret } from "../consts"

export const authHandler = (req: Request, res: Response, next: any) => {
    console.log("App: auth middleware", req.path)
    const token = req.cookies.token
    if (!token) {
        res.status(401).send({ error: "no_token" })
    } else {
        jwt.verify(token, secret, (err: Error, decoded: object) => {
            if (err) {
                res.status(401).send({ error: "token_invalid" })
            } else {
                next()
            }
        })
    }
}

export const asyncHandler = (fn: (req: Request, res: Response, next: any) => void) => {
    return (req: Request, res: Response, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

