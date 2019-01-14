import * as React from "react"
import { withRouter } from "react-router";


class RequiresAuthState {
    hasUser: boolean;
}

class RequiresAuthProps {
    loadUser: () => void;
    user: any;
}

class RequiresAuth extends React.Component<RequiresAuthProps, RequiresAuthState> {
    // _loadUserTask: any = null

    constructor(props: any) {
        super(props)
        this.state = {
            hasUser: false
        }
    }

    componentWillMount = () => {
        this.checkAuth(this.props);
    }

    componentWillReceiveProps = (nextProps: any) => {
        this.checkAuth(nextProps);
    }

    private checkAuth = (props: RequiresAuthProps) => {
        if (!props.user) {
            props.loadUser();
        } else if (!props.user.isAuthenticated) {
            console.log("RequiresAuth:", "user is not auth");
            (this.props as any).history.replace("/login")
        } else {
            this.setState({ hasUser: true });
        }
    }

    render() {
        const { hasUser } = this.state
        if (!hasUser) {
            return <h3>Loading...</h3>
        }
        return this.props.children
    }
}

export const RequiresAuthWithRouter = withRouter(RequiresAuth)