import * as React from "react"
import { Paper, Typography, FormControl, InputLabel, Input, Button } from "@material-ui/core";
import { withRouter } from "react-router";

interface LoginPageState {
    username: string
    password: string
}

interface LoginPageProps {
    login: (username: string, password: string, cb: (err?: string) => void) => void
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: any) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("LoginPage", "submit")
        const { username, password } = this.state

        const that = this
        this.props.login(username, password, (err) => {
            if (err) {
                console.log("Login failed:", err)
            } else {
                console.log("Login successful");
                (that.props as any).history.replace("/")
            }

        })
    }

    handleChange = (e: any) => {
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        } as LoginPageState)
    }

    render() {
        const { username, password } = this.state
        return <Paper className="signin-paper">
            <Typography variant="h4" component="h2" gutterBottom>
                Вход
            </Typography>
            <form onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel>Имя пользователя</InputLabel>
                    <Input
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Пароль</InputLabel>
                    <Input
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    id="signin-submit"
                >
                    Войти
                </Button>
            </form>
        </Paper>
    }
}

export const LoginPageWithRouter = withRouter(LoginPage)