import sqlite3, { RunResult } from "sqlite3"
import * as dbUtils from "../utils/DbUtils"
import { Dog, DogOwner, Exibition, ExibitionEntry } from "../../common/Entities"

export class DogsStorage {
    private readonly db: sqlite3.Database

    constructor(db: sqlite3.Database) {
        this.db = db
        this.db.serialize(() => {
            this.db.run("CREATE TABLE dogs (id INTEGER PRIMARY KEY, name TEXT, breed TEXT)")
            this.db.run("CREATE TABLE exibitions (id INTEGER PRIMARY KEY, name TEXT)")
            this.db.run("CREATE TABLE owners (id INTEGER PRIMARY KEY, name TEXT)")
            this.db.run("CREATE TABLE exibition_entries (id INTEGER PRIMARY KEY," +
                "dog_id INTEGER, owner_id INTEGER, exibition_id INTEGER, date DATETIME," +
                "FOREIGN KEY(dog_id) REFERENCES dogs(id)," +
                "FOREIGN KEY(owner_id) REFERENCES owners(id)," +
                "FOREIGN KEY(exibition_id) REFERENCES exibitions(id)" +
                ")"
            )
            this.db.run("CREATE TRIGGER dog_deletion_trigger BEFORE DELETE ON dogs " +
            "BEGIN DELETE FROM exibition_entries WHERE dog_id == OLD.id; END;"
            )
            this.db.run("CREATE TRIGGER owner_deletion_trigger BEFORE DELETE ON owners " +
            "BEGIN DELETE FROM exibition_entries WHERE owner_id == OLD.id; END;"
            )
            this.db.run("CREATE TRIGGER exibition_deletion_trigger BEFORE DELETE ON exibitions " +
            "BEGIN DELETE FROM exibition_entries WHERE exibition_id == OLD.id; END;"
            )
        })
    }

    async findDog(name: string, breed: string): Promise<number> {
        const res: Array<any> = await dbUtils.asyncStatementAll(
            this.db.prepare("SELECT * FROM dogs WHERE name == (?) AND breed == (?)"), [name, breed])
        if (!res || res.length === 0) {
            return -1
        } else {
            return res[0].id
        }
    }

    async createDog(name: string, breed: string): Promise<number> {
        let [rows, res] = await dbUtils.asyncStatementRunWithResult(
            this.db.prepare("insert into dogs(name, breed) values (?, ?)"), [name, breed])
        return res.lastID
    }

    async findOwner(name: string): Promise<number> {
        const res: Array<any> = await dbUtils.asyncStatementAll(
            this.db.prepare("SELECT * FROM owners WHERE name == (?)"), name)
        if (!res || res.length === 0) {
            return -1
        } else {
            return res[0].id
        }
    }

    async createOwner(name: string): Promise<number> {
        let [rows, res] = await dbUtils.asyncStatementRunWithResult(
            this.db.prepare("insert into owners(name) values (?)"), name)
        return res.lastID
    }

    async findExibition(name: string): Promise<number> {
        const res: Array<any> = await dbUtils.asyncStatementAll(
            this.db.prepare("SELECT * FROM exibitions WHERE name == (?)"), name)
        if (!res || res.length === 0) {
            return -1
        } else {
            return res[0].id
        }
    }

    async createExibition(name: string): Promise<number> {
        let [rows, res] = await dbUtils.asyncStatementRunWithResult(
            this.db.prepare("insert into exibitions(name) values (?)"), name)
        return res.lastID
    }

    createExibitionEntry(dog: number, owner: number, exibition: number, date: number) {
        const st = this.db.prepare(
            "insert into exibition_entries(dog_id, owner_id, exibition_id, date) values (?,?,?,?)")
        st.run([dog, owner, exibition, date], (res: RunResult, err: Error) => {
            if (err) {
                console.log("DogsStorage: error create entry", err)
            } else if (res) {
                console.log("DogsStorage: create entry result", res.changes)
            }
        })
        st.finalize((err: Error) => {
            if (err) {
                console.log("DogsStorage: error finalize create entry", err)
            }
        })
    }

    async getExibitionEntries() {
        const rows = await dbUtils.asyncAll(this.db, "SELECT * FROM exibition_entries") as []
        if (rows) {
            console.log("DogsStorage: get entries rows", rows)
            const entries = await Promise.all(rows.map(async (row: any) => {
                const dog = await this.getDog(row.dog_id)
                const owner = await this.getOwner(row.owner_id)
                const exibition = await this.getExibition(row.exibition_id)

                return new ExibitionEntry(row.id, dog, owner, exibition, row.date)
            }));
            console.log("DogsStorage: get entries result", entries)
            return entries
        } else {
            return [new ExibitionEntry(777, null, null, null, 0)]
        }
    }

    async getDog(id: number): Promise<Dog> {
        const res: Array<any> = await dbUtils.asyncStatementAll(
            this.db.prepare("SELECT * FROM dogs WHERE id == (?)"), id)

        if (res && res.length) {
            const dogRow = res[0]
            return { id: dogRow.id, name: dogRow.name, breed: dogRow.breed }
        } else {
            return null
        }
    }

    async getOwner(id: number): Promise<DogOwner> {
        const res: Array<any> = await dbUtils.asyncStatementAll(
            this.db.prepare("SELECT * FROM owners WHERE id == (?)"), id)

        if (res && res.length) {
            const ownerRow = res[0]
            return { id: ownerRow.id, name: ownerRow.name }
        } else {
            return null
        }
    }

    async getExibition(id: number): Promise<Exibition> {
        const res: Array<any> = await dbUtils.asyncStatementAll(
            this.db.prepare("SELECT * FROM exibitions WHERE id == (?)"), id)

        if (res && res.length) {
            const exibitionRow = res[0]
            return { id: exibitionRow.id, name: exibitionRow.name }
        } else {
            return null
        }
    }
    
    async deleteExibitionEntry(id: number): Promise<void> {
        const statement = this.db.prepare("DELETE FROM exibition_entries WHERE id == (?)")
        await dbUtils.asyncStatementRunWithResult(statement, id)
    }

    // dogs
    async getDogs(): Promise<Dog[]> {
        const rows = await dbUtils.asyncAll(this.db, "SELECT * FROM dogs") as []
        return rows.map((row: any) => {
            return { id: row.id, name: row.name, breed: row.breed }
        })
    }

    async deleteDog(id: number): Promise<void> {
        const statement = this.db.prepare("DELETE FROM dogs WHERE id == (?)")
        await dbUtils.asyncStatementRunWithResult(statement, id)
    }

    // owners
    async getOwners(): Promise<DogOwner[]> {
        const rows = await dbUtils.asyncAll(this.db, "SELECT * FROM owners") as []
        return rows.map((row: any) => {
            return { id: row.id, name: row.name }
        })
    }

    async deleteOwner(id: number): Promise<void> {
        const statement = this.db.prepare("DELETE FROM owners WHERE id == (?)")
        await dbUtils.asyncStatementRunWithResult(statement, id)
    }

    // exibitions
    async getExibitions(): Promise<Exibition[]> {
        const rows = await dbUtils.asyncAll(this.db, "SELECT * FROM exibitions") as []
        return rows.map((row: any) => {
            return { id: row.id, name: row.name }
        })
    }

    async deleteExibition(id: number): Promise<void> {
        const statement = this.db.prepare("DELETE FROM exibitions WHERE id == (?)")
        await dbUtils.asyncStatementRunWithResult(statement, id)
    }
}
