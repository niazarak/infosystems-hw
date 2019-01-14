import * as React from "react"
import { Typography, Grid } from "@material-ui/core";
import { OwnerComponent } from "./Owner";
import { DogOwner } from "../../../common/Entities";

interface OwnersTabState {
    owners: DogOwner[]
}
export class OwnersTab extends React.Component<any, OwnersTabState> {
    constructor(props: any) {
        super(props)
        this.state = {
            owners: []
        }
    }

    deleteOwner = (id: number) => {
        fetch("/api/owners", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        }).then(res => {
            if (res.status == 200) {
                this.fetchOwners();
            }
        })
    }

    componentDidMount() {
        this.fetchOwners();
    }

    private fetchOwners() {
        fetch("/api/owners")
            .then(res => {
                // console.log(res.body)
                return res.json();
            })
            .then((res: any) => {
                console.log("Owners fetch", res);
                this.setState({ owners: res });
            }).catch(er => {
                console.log("Owners fetch failed", er);
            });
    }

    render() {
        const { owners } = this.state
        return <React.Fragment>
            <Typography variant="h4" component="h2" gutterBottom>
                Владельцы
            </Typography>
            <Grid container spacing={40} alignItems="flex-end">
                {owners.map(owner =>
                    <Grid key={owner.id} item xs={12}>
                        <OwnerComponent ownerObject={owner} delete={this.deleteOwner} />
                    </Grid>
                )}
            </Grid>
        </React.Fragment>
    }
}