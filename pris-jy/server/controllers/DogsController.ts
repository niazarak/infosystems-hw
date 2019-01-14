import { Request, Response } from "express"
import { DogsStorage } from "../storage/DogsStorage"
import sqlite3 from "sqlite3";

export class DogsController {
    private readonly storage: DogsStorage

    constructor(db: sqlite3.Database) {
        this.storage = new DogsStorage(db)
    }

    async createExibitionEntries(req: Request, res: Response) {
        console.log(req.body)

        let dogId = await this.storage.findDog(req.body.dogName, req.body.dogBreed)
        console.log("Dog raw id:", dogId)
        if (dogId == -1) {
            dogId = await this.storage.createDog(req.body.dogName, req.body.dogBreed)
        }
        console.log("Dog result id:", dogId)

        let owner_id = await this.storage.findOwner(req.body.ownerName)
        console.log("Owner raw id:", owner_id)
        if (owner_id == -1) {
            owner_id = await this.storage.createOwner(req.body.ownerName)
        }
        console.log("Owner result id:", owner_id)

        let exibition_id = await this.storage.findExibition(req.body.exibitionName)
        console.log("Exibition raw id:", exibition_id)
        if (exibition_id == -1) {
            exibition_id = await this.storage.createExibition(req.body.exibitionName)
        }
        console.log("Exibition result id:", exibition_id)

        const date = Date.now()
        this.storage.createExibitionEntry(dogId, owner_id, exibition_id, date)
        res.sendStatus(200)
    }

    async getExibitionEntries(req: Request, res: Response) {
        const entries = await this.storage.getExibitionEntries()
        res.send(entries)
    }

    async deleteExibitionEntry(req: Request, res: Response) {
        const entryId = req.body.id
        if (entryId) {
            await this.storage.deleteExibitionEntry(entryId)
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    }

    async getDogs(req: Request, res: Response) {
        const dogs = await this.storage.getDogs()
        res.send(dogs)
    }

    async deleteDog(req: Request, res: Response) {
        const dogId = req.body.id
        if (dogId) {
            await this.storage.deleteDog(dogId)
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    }
    async getOwners(req: Request, res: Response) {
        const owners = await this.storage.getOwners()
        res.send(owners)
    }

    async deleteOwner(req: Request, res: Response) {
        const ownerId = req.body.id
        if (ownerId) {
            await this.storage.deleteOwner(ownerId)
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    }
    async getExibitions(req: Request, res: Response) {
        const exibitions = await this.storage.getExibitions()
        res.send(exibitions)
    }

    async deleteExibition(req: Request, res: Response) {
        const exibitionId = req.body.id
        if (exibitionId) {
            await this.storage.deleteExibition(exibitionId)
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    }
}