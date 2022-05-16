import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
    top: 0,
    left:'50%',
    width: '65%',
    height: '100%',
    objectFit: 'contain',
    position: 'absolute',
    transform:'translateX(-50%)'
});

// ----------------------------------------------------------------------

RelatedProductCard.propTypes = {
    product: PropTypes.object,
};

export default function RelatedProductCard({ product }) {
    const { title, image, price, source } = product;

    return (
        <Card>
            <Box sx={{ pt: '100%', position: 'relative', }}>
                <ProductImgStyle alt={title} src={image} />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap>
                        {title}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                       ₹ {price}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}
