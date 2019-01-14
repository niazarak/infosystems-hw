import * as React from "react"
import { Dog } from "../../../common/Entities";
import { Typography, Grid } from "@material-ui/core";
import { DogComponent } from "./Dog";

interface DogsTabInterface {
    dogs: Dog[]
}

export class DogsTab extends React.Component<any, DogsTabInterface> {
    constructor(props: any) {
        super(props)
        this.state = {
            dogs: []
        }
    }

    deleteDog = (id: number) => {
        fetch("/api/dogs", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id})
        }).then(res => {
            if (res.status == 200) {
                this.fetchDogs();
            }
        })
    }
 
    componentDidMount() {
        this.fetchDogs();
    }

    private fetchDogs() {
        fetch("/api/dogs")
            .then(res => {
                // console.log(res.body)
                return res.json();
            })
            .then((res: any) => {
                console.log("Dogs fetch", res);
                this.setState({ dogs: res });
            }).catch(er => {
                console.log("Dogs fetch failed", er);
            });
    }

    render() {
        const { dogs } = this.state
        return <React.Fragment>
            <Typography variant="h4" component="h2" gutterBottom>
                Собаки
            </Typography>
            <Grid container spacing={40} alignItems="flex-end">
                {dogs.map(dog =>
                    <Grid key={dog.id} item xs={12}>
                        <DogComponent dogObject={dog} delete={this.deleteDog} />
                    </Grid>
                )}
            </Grid>
        </React.Fragment>
    }
}