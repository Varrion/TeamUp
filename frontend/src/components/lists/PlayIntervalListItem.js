import {Divider, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import moment from "moment";
import React from "react";
import {FieldStatus} from "../../services/PlayingFieldService";
import MenuButton from "../buttons/MenuButton";

const PlayIntervalListItem = ({interval, menuOptions}) => {

    return <div className={"d-flex align-baseline m-2 interval-list-item"}>
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
                primary={moment(interval.gameStartTime).format("DD.MM.YYYY HH:mm")}
                secondary={moment(interval.gameEndTime).format("DD.MM.YYYY HH:mm")}
            />
            <ListItemSecondaryAction className={"text-right"}>
                <MenuButton actionParams={interval} menuOptions={menuOptions}/>
            </ListItemSecondaryAction>
        </ListItem>
        <Divider orientation={"vertical"}/>
    </div>
}

export default PlayIntervalListItem;