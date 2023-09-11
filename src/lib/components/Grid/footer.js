import {
    GridFooterContainer,
    GridFooter
} from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

const Footer = ({ pagination, apiRef }) => {
    const page = apiRef.current.state.pagination.paginationModel.page;
    const [pageNumber, setPageNumber] = useState(page + 1);
    const handleChange = function (e) {
        setPageNumber(parseInt(e.target?.value));
    }
    const onPageChange = function () {
        apiRef.current.setPage(pageNumber - 1);
    }
    return (
        <GridFooterContainer>
            <Box sx={{ pl: 5 }}>
                {pagination &&
                    <>
                        <Typography variant="p">Jump to page</Typography>
                        <TextField
                            sx={{ width: 70, pl: 1 }}
                            variant="standard"
                            type='number'
                            min={1}
                            value={pageNumber}
                            onChange={handleChange}
                        />
                        <Button size='small' onClick={onPageChange}>Go</Button>
                    </>
                }
            </Box>
            <GridFooter />
        </GridFooterContainer>
    );
}
export { Footer };