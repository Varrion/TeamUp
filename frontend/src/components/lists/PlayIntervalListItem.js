import {Divider, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import moment from "moment";
import React from "react";
import {FieldStatus} from "../../services/PlayingFieldService";
import MenuButton from "../buttons/MenuButton";

const PlayIntervalListItem = ({interval, menuOptions, setSelectedElement}) => {
    return <div className={"d-flex align-baseline justify-content-center m-2 interval-list-item"}>
        <Divider orientation={"vertical"}/>
        <ListItem divider>
            <span
                className={`badge badge-pill text-center mr-3 
                ${interval.fieldStatus === FieldStatus.Open
                    ? 'badge-success'
                    : interval.fieldStatus === FieldStatus.Closed
                        ? 'badge-danger'
                        : 'badge-warning'}`}> {interval.fieldStatus}
            </span>
            <ListItemText
                primary={moment(interval.gameStartTime).utc().format("DD.MM.YYYY HH:mm")}
                secondary={moment(interval.gameEndTime).utc().format("DD.MM.YYYY HH:mm")}
            />
            <ListItemSecondaryAction className={"text-right"}>
                {menuOptions && <MenuButton actionParams={interval} menuOptions={menuOptions}
                                            setSelectedItem={setSelectedElement}/>}
            </ListItemSecondaryAction>
        </ListItem>
        <Divider orientation={"vertical"}/>
    </div>
}

export default PlayIntervalListItem;