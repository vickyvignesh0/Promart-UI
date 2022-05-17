import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Product.css'

const ProductImgStyle = styled('img')({
  top: 0,
  marginTop:'10px',
  left:'50%',
  width: '65%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
  transform:'translateX(-50%)'
});


ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  // eslint-disable-next-line camelcase
  const { title, image, img, price, best_offer, uid } = product;
  let pr = '';
  // eslint-disable-next-line camelcase
  if(best_offer){
    // eslint-disable-next-line camelcase
    pr = `₹ ${best_offer.price}`;
  }else{
    pr = `₹ ${price}`;
  }
  let im = '';
  if(image){
    im = image;
  }else{
    im = img;
  }
  function handleClick(){
    sessionStorage.setItem('uid', uid);
    window.location.href = '/dashboard/products'
  }

  return (
      // eslint-disable-next-line react/jsx-no-bind
    <Card className='product' onClick={handleClick}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={title} src={im} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            {pr}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
