import {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const SplitButton = ({text, buttonVariant, buttonColor, mainOption, menuOptions, classes}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggleMenu = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes}>
            <ButtonGroup color={buttonColor}
                         size="small"
                         variant={buttonVariant} ref={anchorRef} aria-label="split button">
                <Button onClick={mainOption}>{text}
                </Button>
                <Button
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggleMenu}
                >
                    <ArrowDropDownIcon/>
                </Button>
            </ButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {menuOptions && menuOptions.length > 0 && menuOptions.map((option, index) => (
                                        <Grow {...TransitionProps}
                                              key={index}
                                              style={{
                                                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                              }} {...(open ? {timeout: 1000} : {})}>
                                            <MenuItem

                                                onClick={option.action}
                                            >
                                                {option.text}
                                            </MenuItem>
                                        </Grow>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

export default SplitButton;
