import * as React from "react"
import { Typography } from "@material-ui/core";

export class HomePage extends React.Component {
    render() {
        return <React.Fragment>
            <Typography component="h1" variant="h2" align="center" color="textPrimary"
                style={{ marginTop: 60 }} gutterBottom>
                Клуб собаководства
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Здесь можно зарегистрировать показ вашей собаки на выставке
            </Typography>
        </React.Fragment>
    }
}