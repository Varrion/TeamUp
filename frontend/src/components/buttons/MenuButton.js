import {useRef, useState} from 'react';
import {Button, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';

const MenuButton = ({actionParams, menuOptions, setSelectedItem, isIconButton = true}) => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const ITEM_HEIGHT = 48;

    const handleToggleMenu = (event) => {
        anchorRef.current = event.currentTarget;
        setSelectedItem && setSelectedItem(actionParams);
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
            {isIconButton ? <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggleMenu}
            >
                <MoreVertIcon/>
            </IconButton> :
                <Button aria-controls="long-menu" aria-haspopup="true" onClick={handleToggleMenu}>
                Open Menu
            </Button>}

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorRef.current}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {menuOptions && menuOptions.length > 0 && menuOptions.filter(option => option != null).map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={()  => option.action && option.action(actionParams)}
                    >
                        {option.text}
                    </MenuItem>
                ))}
            </Menu>

        </div>
    );
}

export default MenuButton
