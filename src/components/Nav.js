import React, { useState, useContext } from 'react'
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth'
import { faSignOutAlt, faFont } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Nav() {

    const { user, logout } = useContext(AuthContext)
    const t = user ? (
        <span>
            <Icon name='user' /> Hey , {user.username}
        </span>
    ) : ""

    const pathname = window.location.pathname;

    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActive] = useState(path);

    const handleclick = (e, { name }) => {
        setActive(name);
    }

    const Nav = user ? (
        <Menu pointing secondary size="huge" color="black" >
            <Menu.Item icon="globe" onClick={handleclick} as={Link} to='/' />
            <Menu.Item icon="home" onClick={handleclick} as={Link} to='/follow' />
            <Menu.Menu position="right">

                <Dropdown item trigger={t} onClick={handleclick} >

                    <Dropdown.Menu >
                        <Dropdown.Item name='post' active={activeItem === 'post'} onClick={handleclick} as={Link} to='/post'>
                            <FontAwesomeIcon icon={faFont} size="1x" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Posts</Dropdown.Item>
                        <Dropdown.Item name='Logout' onClick={logout} as={Link} to='/login'>
                            <FontAwesomeIcon icon={faSignOutAlt} size="1x" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size="huge" color="teal" >
            <Menu.Item icon="globe" name='home' active={activeItem === 'home'} onClick={handleclick} as={Link} to='/' />
            <Menu.Menu position="right">
                <Menu.Item icon="user secret" name='login' active={activeItem === 'login'} onClick={handleclick} as={Link} to='/login' />
                <Menu.Item icon="add user" name='register' active={activeItem === 'register'} onClick={handleclick} as={Link} to='/register' />
            </Menu.Menu>
        </Menu>
    )
    return Nav
}

export default Nav;