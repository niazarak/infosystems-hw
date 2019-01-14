import * as React from "react"

import { ExibitionEntry } from "../../../common/Entities"
import { Card, Typography, CardContent, CardActions, Button, CardHeader } from "@material-ui/core";
import a, { MoreVert } from "@material-ui/icons";

export interface Props {
    entryObject: ExibitionEntry
    delete: (id: number) => void
}

export class Entry extends React.Component<Props> {
    handleDelete = (event: any) => {
        const id = this.props.entryObject.id
        this.props.delete(id)
    }

    render() {
        const { entryObject } = this.props;
        return <Card>
            <CardHeader
                title={"Заявка #" + entryObject.id}
            />
            <CardContent>
                <Typography variant="h5" component="h2">
                    <span style={{ color: "grey" }}>Собака: </span>
                    {entryObject.dog.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    <span style={{ color: "grey" }}>Владелец: </span>
                    {entryObject.owner.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    <span style={{ color: "grey" }}>Выставка: </span>
                    {entryObject.exibition.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    <span style={{ color: "grey" }}>Дата создания: </span>
                    {new Date(entryObject.date).toLocaleString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={this.handleDelete} size="small" color="primary">Удалить</Button>
            </CardActions>
        </Card>
    }
}
