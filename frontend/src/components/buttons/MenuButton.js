import {useRef, useState} from 'react';
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';

const MenuButton = ({actionParams, menuOptions}) => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const ITEM_HEIGHT = 48;

    const handleToggleMenu = (event) => {
        anchorRef.current = event.currentTarget;
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggleMenu}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorRef.current}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {menuOptions && menuOptions.length > 0 && menuOptions.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => option.action(actionParams)}
                    >
                        {option.text}
                    </MenuItem>
                ))}
            </Menu>

        </div>
    );
}

export default MenuButton
