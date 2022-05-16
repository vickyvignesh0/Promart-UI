import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

export default function Search() {
    const products = JSON.parse(window.sessionStorage.getItem('products'));
    console.log(products);
    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid key={product.uid} item xs={12} sm={6} md={3}>
                    <ShopProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
}
