import { Box, Button, ButtonBase, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';


import { removeNodeAtPath, toggleExpandedForAll, map } from '@nosferatu500/react-sortable-tree';
import axios from 'axios';
import { apiConfig, appConfig } from 'config/app.config';
import SortableTreeCustom from 'component/SortTableTreeCustom';

export default function TreeLayout({apiGet, apiSave}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(false);
        axios.get(apiGet).then((value) => {
            setData(value.data) ;
        })
    }, []);


    const handleSaveData = async () => {
        toggleNodeExpansion(false);
        const params = { treeData: data };
        await axios.post(apiSave, params)
    }

    const toggleNodeExpansion = (expanded) => {
        setData((prevState) => (
           toggleExpandedForAll({
            treeData: prevState,
            expanded
           })
        ));
      };

    return (
        <Box>
            <Button onClick={handleSaveData} variant='contained'>Lưu thông tin</Button>
            <SortableTreeCustom 
                data={data}
                setData={setData} />
        </Box>
        
    );
};
