import sqlite3 from "sqlite3"

export function asyncAll(db: sqlite3.Database, query: string) {
    return new Promise(function (resolve: any, reject: any) {
        db.all(query, (err: Error, rows: []) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }

        })
    })
}

export function asyncStatementRunWithResult(statement: sqlite3.Statement, params: any): Promise<[any[], sqlite3.RunResult]> {
    return new Promise(function (resolve: any, reject: any) {
        statement.run(params, function (err: Error, rows: []) {
            if (err) {
                reject(err)
            } else {
                this.finalize()
                resolve([rows, this])
            }
        })
    })
}

export function asyncStatementAllWithResult(statement: sqlite3.Statement, params: any): Promise<[any[], sqlite3.RunResult]> {
    return new Promise(function (resolve: any, reject: any) {
        statement.all(params, function (err: Error, rows: []) {
            if (err) {
                reject(err)
            } else {
                this.finalize()
                resolve([rows, this])
            }
        })
    })
}

export async function asyncStatementAll(statement: sqlite3.Statement, params: any): Promise<any[]> {
    const [value, res] = await asyncStatementAllWithResult(statement, params);
    return value;
}
