import * as React from "react"
import { DogOwner } from "../../../common/Entities";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";

interface OwnerComponentProps {
    ownerObject: DogOwner
    delete: (id: number) => void
}

export class OwnerComponent extends React.Component<OwnerComponentProps> {
    handleDelete = () => {
        const ownerId = this.props.ownerObject.id
        this.props.delete(ownerId)
    }

    render() {
        const { ownerObject: exibitionObject } = this.props
        return <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    <span style={{ color: "grey" }}>Владелец: </span>
                    {exibitionObject.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={this.handleDelete} size="small" color="primary">Удалить</Button>
            </CardActions>
        </Card>
    }
}