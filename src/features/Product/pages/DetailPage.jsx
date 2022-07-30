import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { addToCart } from '../../Cart/cartSlice';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

DetailPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3)
  },

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
    position: 'relative',
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
  addToCart: {
    // position: 'absolute',
    // bottom: 40,
  }
}));

function DetailPage(props) {
  const classes = useStyles();
  const {
    params: { productId },
    url,
  } = useRouteMatch();
  const dispatch = useDispatch()

  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }
  const handleAddToCartSubmit = ({quantity}) => {
    // console.log('Form submit', formValues);
    const action = addToCart({
      id: product.id,
      product, // = product: product
      quantity, // = quantity: quantity
    })
    // console.log(action);
    dispatch(action)
  };

  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <Box className={classes.addToCart}>
                <AddToCartForm onSubmit={handleAddToCartSubmit} />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />
        <Switch>
          <Route path={url} exact>
            <ProductDescription product={product} />
          </Route>
          <Route path={`${url}/additional`} exact>
            <ProductAdditional product={product} />
          </Route>
          <Route path={`${url}/reviews`} exact>
            <ProductReviews product={product} />
          </Route>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
