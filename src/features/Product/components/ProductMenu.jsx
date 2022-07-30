import { Box, makeStyles, Link } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {
    
};
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',

        padding: 0,
        listStyleType: 'none',

        '& > li': {
            padding: theme.spacing(2, 4),
            fontSize: '20px'
        },
        '& > li > a': {
            color: theme.palette.grey[700],
            textDecoration: 'none',
        },
        '& > li > a:hover': {
            textDecoration: 'none',
        },
        '& > li > a.active': {
            color: '#FE6B8B',
            borderBottom: '5px solid #FE6B8B'
        }
    },
}));

function ProductMenu(props) {
    const classes = useStyles();
    const { url } = useRouteMatch()
    
    return (
        <Box component='ul' className={classes.root}>
            <li>
                <Link component={NavLink} to={url} exact>
                    Mô Tả
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/additional`} exact>
                    Thông Tin Bổ Sung
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/reviews`} exact>
                    Nhận Xét
                </Link>
            </li>
        </Box>
    );
}

export default ProductMenu;