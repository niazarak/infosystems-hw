import * as React from "react"
import * as ReactDOM from "react-dom"
import { Link, NavLink } from "react-router-dom"

import { AppBar, Toolbar, Button, Typography } from "@material-ui/core"

interface NavigationProps {
    isAuthenticated: boolean
    logout: () => void
}

const HomeLink = (props: any) => <Link to="/" {...props} />
const DataLink = (props: any) => <Link to="/data" {...props} />
const CreateEntryLink = (props: any) => <Link to="/createEntry" {...props} />
const LoginLink = (props: any) => <Link to="/login" {...props} />
const LogoutLink = (props: any) => <Link to="/logout" {...props} />

export class Navigation extends React.PureComponent<NavigationProps> {
    render() {
        const { isAuthenticated, logout } = this.props
        return <AppBar id="navigation" position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                    Doglovers
                </Typography>
                <Button component={HomeLink} color="inherit">Главная</Button>
                <Button component={DataLink} color="inherit">Данные</Button>
                <Button component={CreateEntryLink} color="inherit">Создать заявку</Button>
                {isAuthenticated ?
                    <Button onClick={logout} color="inherit">Выход</Button> :
                    <Button component={LoginLink} color="inherit">Вход</Button>
                }
            </Toolbar>
        </AppBar>
    }
}