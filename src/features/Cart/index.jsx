import { Box, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CartCheckout from './components/CartCheckout';
import CartList from './components/CartList';
import { cartItemsCountSelector } from './selectors';

CartFeature.propTypes = {
    
};

function CartFeature(props) {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartCount = useSelector(cartItemsCountSelector)
    return (
        <Box pt={4}>
            <Container>
                <Typography component="h6">
                    GIỎ HÀNG
                    <Box component="span"> ({cartCount} sản phẩm)</Box>
                </Typography>
        
                <Grid container spacing={2}>
                    <Grid item md={9}>
                        <CartList data={cartItems} />
                    </Grid>
            
                    <Grid item md={3}>
                        <CartCheckout />
                    </Grid>
            </Grid>
        </Container>
        </Box>
    );
}

export default CartFeature;