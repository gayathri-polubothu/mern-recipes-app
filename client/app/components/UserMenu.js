'use client'
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {ListItemButton, ListItemIcon, ListItemText, Menu, Typography, useTheme} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {signOut} from "next-auth/react";
import Link from 'next/link'
import menuConfigs from "../config/menu.configs";
import {useCookies} from "react-cookie";
import Avatar from "@mui/material/Avatar";
import {setUser} from "../redux/reducers/userState";
import {useRouter} from "next/router";
import {setAppState} from "../redux/reducers/appState";

const UserMenu = () => {
    const { user } = useSelector((state) => state.user);
    const [cookies, setCookies] = useCookies('access_token')
    const router = useRouter()
    const theme = useTheme();

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const toggleMenu = (e) => setAnchorEl(e.currentTarget);
    const logout = () =>{
        dispatch(setUser(null))
        dispatch(setAppState('login'))
        setCookies("access_token", "")
        window.localStorage.removeItem("userID")
        signOut().then(()=>{
            dispatch(setUser(null))
            router.push("/")
        })
    }
    return (
        <>
            {user && (
                <>
                    <Typography
                        variant="h6"
                        sx={{ cursor: "pointer", userSelect: "none" }}
                        onClick={toggleMenu}
                    >
                        {user?.name ? (
                            <Avatar
                                alt={user?.name}
                                src={user?.image}
                                sx={{ width: 30, height: 30}}
                            />
                        ) : (
                            <Avatar children={`${user?.name || user?.username[0].toUpperCase()}`} sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}}/>
                        )
                        }
                    </Typography>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        PaperProps={{ sx: { padding: 0 } }}
                    >
                        {menuConfigs.userMenu.map((item, index) => (
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                href={item.path}
                                key={index}
                                onClick={() => setAnchorEl(null)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText disableTypography primary={
                                    <Typography textTransform="uppercase">{item.display}</Typography>
                                } />
                            </ListItemButton>
                        ))}
                        <ListItemButton
                            sx={{ borderRadius: "10px" }}
                            onClick={logout}
                        >
                            <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
                            <ListItemText disableTypography primary={
                                <Typography textTransform="uppercase">sign out</Typography>
                            } />
                        </ListItemButton>
                    </Menu>
                </>
            )}
        </>
    );
};

export default UserMenu;