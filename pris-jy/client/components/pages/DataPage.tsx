import * as React from "react"
import { Tabs, Tab } from "@material-ui/core";
import { EntriesTab } from "../entries/EntriesTab";
import { DogsTab } from "../dogs/DogsTab";
import { ExibitionsTab } from "../exibitions/ExibitionsTab";
import { OwnersTab } from "../owners/OwnersTab";

interface EntriesState {
    selectedTab: number
}

export class DataPage extends React.Component<any, EntriesState> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedTab: 0
        }
    }

    handleTabChange = (event: any, selectedTab: number) => {
        this.setState({
            selectedTab: selectedTab
        })
    }

    render() {
        let { selectedTab } = this.state
        return <React.Fragment>
            <Tabs value={selectedTab}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Заявки" />
                <Tab label="Собаки" />
                <Tab label="Владельцы" />
                <Tab label="Выставки" />
            </Tabs>
            {selectedTab == 0 && <EntriesTab />}
            {selectedTab == 1 && <DogsTab />}
            {selectedTab == 2 && <OwnersTab />}
            {selectedTab == 3 && <ExibitionsTab />}
        </React.Fragment >
    }
}