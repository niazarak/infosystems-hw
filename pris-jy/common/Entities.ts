export class Dog {
    id: number
    name: string
    breed: string

    constructor(name: string) {
        this.name = name
    }
}

export class Exibition {
    id: number
    name: string
}

export class DogOwner {
    id: number
    name: string
}

export class ExibitionEntry {
    id: number
    dog: Dog
    exibition: Exibition
    owner: DogOwner
    date: number

    constructor(id: number, dog: Dog, owner: DogOwner, exibition: Exibition, creationDate: number) {
        this.id = id
        this.dog = dog
        this.date = creationDate
        this.owner = owner
        this.exibition = exibition
    }
}