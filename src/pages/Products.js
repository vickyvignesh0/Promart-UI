import {useEffect, useState} from 'react';
import { Container, Stack, Typography } from '@mui/material';

import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import {db} from "../services/FirebaseService";

// ----------------------------------------------------------------------

export default function EcommerceShop() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsList = [];
    db.collection("products").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
        productsList.push(doc.data());
      });
      setProducts(productsList)
    });
  },[]);
    
  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Latest & Available Products
        </Typography>
        <ProductList products={products} />
      </Container>
    </Page>
  );
}
