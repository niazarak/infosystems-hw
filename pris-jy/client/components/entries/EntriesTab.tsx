import * as React from "react"
import { Typography, Grid } from "@material-ui/core";
import { Entry } from "./Entry";
import { ExibitionEntry } from "../../../common/Entities";

interface EntriesTabState {
    entries: ExibitionEntry[]
}

export class EntriesTab extends React.Component<any, EntriesTabState>{
    constructor(props: any) {
        super(props)
        this.state = {
            entries: [],
        }
    }
    deleteEntry = (id: number) => {
        fetch("/api/entries", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        }).then(res => {
            if (res.status == 200) {
                this.fetchEntries()
            }
        })
    }

    componentDidMount() {
        this.fetchEntries();
    }

    private fetchEntries() {
        fetch("/api/entries")
            .then(res => {
                // console.log(res.body)
                return res.json();
            })
            .then((res: any) => {
                console.log("Entries fetch", res);
                console.log("Entries fetch [0]", res[0]);
                this.setState({ entries: res });
            }).catch(er => {
                console.log("Entries fetch failed", er);
            });
    }

    render() {
        let { entries } = this.state
        return <React.Fragment>
            <Typography variant="h4" component="h2" gutterBottom>
                Заявки
            </Typography>
            <Grid container spacing={40} alignItems="flex-end">
                {entries.map(entry =>
                    <Grid key={entry.id} item xs={12}>
                        <Entry entryObject={entry} delete={this.deleteEntry} />
                    </Grid>
                )}
            </Grid>
        </React.Fragment>
    }
}