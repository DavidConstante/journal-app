import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from "@mui/icons-material"
import { setActiveNote } from '../../store/journal'


export const SideBarItem = ({ id, title, body, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 15 ? `${title.substring(0, 20)}...` : title
    }, [title])

    const onSelect = () => {
        dispatch(setActiveNote({ id, title, body, date, imageUrls }));
    }

    return (
        <ListItem disablePadding  >
            <ListItemButton onClick={onSelect}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
