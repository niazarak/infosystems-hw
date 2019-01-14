import sqlite3 from "sqlite3";
import bcrypt from "bcrypt"
import { UserStorage } from "../storage/UserStorage";

export class UserController {
    private readonly storage: UserStorage

    constructor(db: sqlite3.Database) {
        this.storage = new UserStorage(db)
    }

    async authenticate(name: string, password: string): Promise<boolean> {
        console.log("UserController authenticate:", name, password)
        const user = await this.storage.getUser(name)
        if (user && bcrypt.compareSync(password, user.password)) {
            console.log("UserController authenticate success")
            return true
        } else {
            console.log("UserController authenticate fail")
            return false
        }
    }
}