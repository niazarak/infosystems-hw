import * as React from "react"
import { Paper, Input, FormLabel, InputLabel, FormControl, Button, LinearProgress, Typography } from "@material-ui/core";

interface NewEntryPageState {
    dogName: string;
    dogBreed: string;
    exibitionName: string;
    ownerName: string;
    loading: boolean;
}

export class NewEntryPage extends React.Component<any, NewEntryPageState> {
    constructor(props: NewEntryPageState) {
        super(props)
        this.state = { dogName: "", dogBreed: "", exibitionName: "", ownerName: "", loading: false }
    }

    onSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log(this.state)
        this.setState({
            loading: true
        })
        fetch("/api/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then((res) => {
            console.log(res.status)
            if (200 <= res.status && res.status < 300) {
                this.setState({
                    loading: false
                })
            }
        })
    }

    handleInputChange = (event: any) => {
        let name = event.target.name
        this.setState({
            [name]: event.target.value
        } as NewEntryPageState)
    }

    render() {
        const loadingView = this.state.loading ? <LinearProgress variant="query" /> : null
        return <Paper className="create-entry-paper">
            <Typography variant="h4" component="h2" gutterBottom>
                Создать заявку
            </Typography>
            <form onSubmit={this.onSubmit}>
                <div>
                    <FormControl margin="normal" required>
                        <InputLabel>Собака</InputLabel>
                        <Input
                            name="dogName"
                            type="text"
                            value={this.state.dogName}
                            onChange={this.handleInputChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" style={{marginLeft: 30}} required>
                        <InputLabel>Порода</InputLabel>
                        <Input
                            name="dogBreed"
                            type="text"
                            value={this.state.dogBreed}
                            onChange={this.handleInputChange}
                        />
                    </FormControl>
                </div>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel>Владелец</InputLabel>
                    <Input
                        name="ownerName"
                        type="text"
                        value={this.state.ownerName}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel>Выставка</InputLabel>
                    <Input
                        name="exibitionName"
                        type="text"
                        value={this.state.exibitionName}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
                <Button
                    id="create-entry-submit"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="">
                    Отправить
                    </Button>
                {loadingView}
            </form>
        </Paper>
    }
}