import * as React from "react"
import { Dog } from "../../../common/Entities";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";

interface DogProps {
    dogObject: Dog
    delete: (id: number) => void
}

export class DogComponent extends React.Component<DogProps> {
    handleDelete = () => {
        const dogId = this.props.dogObject.id
        this.props.delete(dogId)
    }

    render() {
        const { dogObject } = this.props
        return <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    <span style={{ color: "grey" }}>Имя: </span>
                    {dogObject.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    <span style={{ color: "grey" }}>Порода: </span>
                    {dogObject.breed}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={this.handleDelete} size="small" color="primary">Удалить</Button>
            </CardActions>
        </Card>
    }
}