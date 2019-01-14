import sqlite3 from "sqlite3";
import * as dbUtils from "../utils/DbUtils"
import bcrypt from "bcrypt"
import { User } from "../models/User";

export class UserStorage {
    private readonly db: sqlite3.Database

    constructor(db: sqlite3.Database) {
        this.db = db
        this.db.serialize(() => {
            this.db.run("CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT, password TEXT)")
            this.addUser("admin", "admin")
        })
    }

    private async addUser(name: string, password: string) {
        const statement = this.db.prepare("INSERT INTO users(name, password) VALUES (?,?)")
        const encryptedPassword = bcrypt.hashSync(password, 10)
        await dbUtils.asyncStatementRunWithResult(statement, [name, encryptedPassword])
    }

    async getUser(name: string): Promise<User> {
        const statement = this.db.prepare("SELECT * FROM users WHERE name = (?)")
        const result = await dbUtils.asyncStatementAll(statement, name)
        if (!result || !result.length) {
            return null
        } else {
            const row = result[0]
            return new User(row.id, row.name, row.password)
        }
    }
}