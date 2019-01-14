import * as React from "react"
import { Exibition } from "../../../common/Entities";
import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";

interface ExibitionComponentProps {
    exibitionObject: Exibition
    delete: (id: number) => void
}

export class ExibitionComponent extends React.Component<ExibitionComponentProps> {
    handleDelete = () => {
        const exibitionId = this.props.exibitionObject.id
        this.props.delete(exibitionId)
    }

    render() {
        const { exibitionObject } = this.props
        return <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    <span style={{ color: "grey" }}>Название выставки: </span>
                    {exibitionObject.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={this.handleDelete} size="small" color="primary">Удалить</Button>
            </CardActions>
        </Card>
    }
}