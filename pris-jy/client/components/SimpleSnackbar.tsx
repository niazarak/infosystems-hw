import * as React from "react"
import { Button, Snackbar } from "@material-ui/core";

interface SimpleSnackbarProps {
    message: string
}

export class SimpleSnackbar extends React.Component<SimpleSnackbarProps> {
    constructor(props: any) {
        super(props)
        this.state = {
            open: false,
        }
    }

    handleClick = (event: any) => {
        this.setState({ open: true });
    };

    handleClose = (event: any, reason: any) => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state as any
        return (
            <div>
                <Button onClick={this.handleClick}>Some snack</Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Message!</span>}
                />
            </div>
        );
    }
}
