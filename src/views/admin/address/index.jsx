import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { removeNodeAtPath, toggleExpandedForAll, map } from '@nosferatu500/react-sortable-tree';
import axios from 'axios';
import { apiConfig, appConfig } from 'config/app.config';
import TreeLayout from 'layout/TreeLayout';
import { Navigate } from 'react-router';
import { getAuth } from 'utils/auth';

const AddressPage = () => {
    return getAuth() ? (
        <Box>
            <TreeLayout 
                apiGet={apiConfig.ADDRESS_API.GET_ALL}
                apiSave={apiConfig.ADDRESS_API.SAVE}/>
        </Box>
    ) : <Navigate to={{ pathname: '/login' }} />;
};

export default AddressPage;
