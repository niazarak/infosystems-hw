import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom"
import "react-router"
import { Navigation } from "./Navigation"
import { DataPage } from "./pages/DataPage"
import { CssBaseline, Typography } from "@material-ui/core";
import { LoginPageWithRouter } from "./pages/LoginPage";
import { RequiresAuthWithRouter } from "./RequiresAuth";
import { HomePage } from "./pages/HomePage";
import { NewEntryPage } from "./pages/NewEntryPage";

const TitleHome = (props: any) => { return <h1>Home</h1> }

export class App extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentWillMount = () => {
        this.loadUser()
    }

    loadUser = () => {
        console.log("Load user!")
        fetch("/checkToken")
            .then(res => {
                const isAuthenticated = res.status == 200;
                this.setState({
                    user: { isAuthenticated: isAuthenticated }
                })
            })
    }
    login = (username: string, password: string, cb: (err?: string) => void) => {
        console.log("Log me in with:", username, password)
        if (true) {
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username, password: password })
            }).then(res => {
                const isAuthenticated = res.status == 200
                if (isAuthenticated) {
                    this.setState({
                        user: { isAuthenticated: true }
                    })
                    cb()
                } else {
                    res.json().then(res => {
                        cb(res.error)
                    })
                }
            })

        }
    }

    logout = () => {
        fetch("/api/logout", {
            method: "POST",
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    user: { isAuthenticated: false }
                })
            }
        })
    }

    render() {
        const { user } = this.state as any
        return <Router>
            <React.Fragment>
                <CssBaseline />
                <Navigation isAuthenticated={user && user.isAuthenticated} logout={this.logout} />
                <main id="main_app" style={{ width: 900, marginLeft: 'auto', marginRight: 'auto', }}>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/data" component={DataPage} />
                        <Route path="/login" >
                            <LoginPageWithRouter login={this.login} />
                        </Route>
                        <Route path="/createEntry" >
                            <RequiresAuthWithRouter loadUser={this.loadUser} user={user}>
                                <NewEntryPage />
                            </RequiresAuthWithRouter>
                        </Route>
                    </Switch>
                </main>
            </React.Fragment>
        </Router>
    }
}