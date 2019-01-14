import * as React from "react"
import { Exibition } from "../../../common/Entities";
import { Typography, Grid } from "@material-ui/core";
import { DogComponent } from "../dogs/Dog";
import { ExibitionComponent } from "./Exibition";

interface ExibitionsTabState {
    exibitions: Exibition[]
}
export class ExibitionsTab extends React.Component<any, ExibitionsTabState> {
    constructor(props: any) {
        super(props)
        this.state = {
            exibitions: []
        }
    }

    deleteExibition = (id: number) => {
        fetch("/api/exibitions", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        }).then(res => {
            if (res.status == 200) {
                this.fetchExibitions();
            }
        })
    }

    componentDidMount() {
        this.fetchExibitions();
    }

    private fetchExibitions() {
        fetch("/api/exibitions")
            .then(res => {
                // console.log(res.body)
                return res.json();
            })
            .then((res: any) => {
                console.log("Exibitions fetch", res);
                this.setState({ exibitions: res });
            }).catch(er => {
                console.log("Exibitions fetch failed", er);
            });
    }

    render() {
        const { exibitions } = this.state
        return <React.Fragment>
            <Typography variant="h4" component="h2" gutterBottom>
                Выставки
            </Typography>
            <Grid container spacing={40} alignItems="flex-end">
                {exibitions.map(exibition =>
                    <Grid key={exibition.id} item xs={12}>
                        <ExibitionComponent exibitionObject={exibition} delete={this.deleteExibition} />
                    </Grid>
                )}
            </Grid>
        </React.Fragment>
    }
}