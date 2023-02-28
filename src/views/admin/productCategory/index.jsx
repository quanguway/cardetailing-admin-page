import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { removeNodeAtPath, toggleExpandedForAll, map } from '@nosferatu500/react-sortable-tree';
import axios from 'axios';
import { apiConfig, appConfig } from 'config/app.config';
import TreeLayout from 'layout/TreeLayout';

const AddressPage = () => {
    return (
        <Box>
            <TreeLayout 
                apiGet={apiConfig.PRODUCT_CATEGORY.GET}
                apiSave={apiConfig.PRODUCT_CATEGORY.SAVE}/>
        </Box>
    );
};

export default AddressPage;
