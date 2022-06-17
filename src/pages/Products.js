import {useEffect, useState} from 'react';
import {CircularProgress, Container, Stack, Typography} from '@mui/material';
import {Spinner} from 'react-bootstrap';
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import {db} from "../services/FirebaseService";
import './spinner.css'

// ----------------------------------------------------------------------

export default function EcommerceShop() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const productsList = [];
    db.collection("products").get().then((querySnapshot) => {
      querySnapshot.docs.forEach(doc => {
        productsList.push(doc.data());
        setIsLoading(false);
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
        {/* <div className='loading-spinner' id="spinner" style={{display: isLoading? "block":"none"}}>.</div> */}
        <div align={'center'}>
          <CircularProgress style={{display: isLoading? "flex":"none", justifyContent: "center", justifyItems: "center", height: "60vh"}}/>
          <ProductList style={{display: !isLoading? "":"none"}} products={products} />
        </div>
      </Container>
    </Page>
  );
}
