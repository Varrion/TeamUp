import {Card, CardContent, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {navigate} from "@reach/router";
import {FileType, GetLastFilePath} from '../../services/FileService'
import {UserRole} from "../../services/UserService";
import React from "react";

const UserCard = ({user}) => {
    return (
        <Card onClick={() => navigate(`/users/${user.username}`)}
            className={`card-zoom cursor-pointer card-height m-3 text-center`}>
            <CardContent>
                <Avatar className={"profile-avatar-extra-large mb-4"}
                    src={GetLastFilePath(user.files, "https://i.pravatar.cc/300")}
                    alt={FileType.Profile}
                />
                <Typography color={"textSecondary"} className={"mt-3 mb-2"} variant={"h6"}>
                    @{user.username}
                </Typography>
                <Typography variant={"h5"}
                    className={"font-weight-bold m-0 mb-2"}>{user.name.toUpperCase() + " " + user.surname.toUpperCase()}</Typography>
                <Typography
                    variant={"button"}
                    className="badge badge-dark">{user.role === UserRole.User ? "Sportist" : "Location Owner"}
                </Typography>
            </CardContent>
        </Card >
    )
}

export default UserCard;
