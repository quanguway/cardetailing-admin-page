import { IconPlus, IconTrash, IconPencil   } from '@tabler/icons';
import '@nosferatu500/react-sortable-tree/style.css';
import SortableTree, { removeNodeAtPath, addNodeUnderParent } from "@nosferatu500/react-sortable-tree";
import { Box, IconButton, TextField } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiConfig } from 'config/app.config';
import DrawerToggle from 'component/DrawerToggle';
import FormToggle from 'component/DrawerToggle/FormToggle';


export default function SortableTreeCustom ({data, setData}) {

    const getNodeKey = ({node, treeIndex}) => node.id
    const [searchString, setSearchString] = useState("");
    const [searchFocusIndex, setSearchFocusIndex] = useState(0);
    const [searchFoundCount, setSearchFoundCount] = useState(null);

    const handleRemoveNode = (rowInfo) => {
        if (
            window.confirm(
              `Bạn có chắc chắn muốn xóa thông tin này ?`
            )
          ) {
            setData((state) => {
                return removeNodeAtPath({
                      treeData: state,
                      path: path,
                      getNodeKey
                    })
                }
            );
          }
    }

    const handleToggle = () => {
      setOPenForm(!openForm);
    };

    const [openForm, setOPenForm] = useState(false);
    const [title, setTitle] = useState();

    // treeFields = [
    //   {
    //       label: 'Tiêu đề',
    //       name: 'title',
    //       useState: [title, setTitle]
    //   },
    // ]

    // const handleEditNode = (rowInfo) => {
    //   <FormToggle 
    //     open={openForm}
    //     handleToggle={handleToggle}
    //     fields={priceLineFields}
    //     handleSubmit={handleSubmitPriceLine}
    //   />
    //   console.log(rowInfo);
    // }

    const handleAddChild = (rowInfo) => {
        setData((state) => {
            return addNodeUnderParent({
              treeData: state,
              parentKey: rowInfo.path[rowInfo.path.length - 1],
              expandParent: true,
              getNodeKey,
              newNode: {
                id: uuid(),
                title: `new title`,
                parent_id: rowInfo.node.id
              },
            }).treeData
        })
    }

    return (
        <Box height={400}>
          <Box my={2}>
            <TextField value={searchString} onChange={(event) => {setSearchString(event.target.value)}} label="Tìm kiếm" variant="outlined" />
          </Box>
           <SortableTree
                
                treeData={data}
                onlyExpandSearchedNodes={true}
                onChange={(treeData, node) => { setData(treeData)}}
                onMoveNode={(nodeMoved) => {
                  const lengthPath = nodeMoved.path.length;
                  const nodes = [];

                  const params = { 
                    node: {
                      id: nodeMoved.node.id,
                      level: lengthPath-1,
                      parent_id: nodeMoved.path[lengthPath-2]
                    }
                  };
                  // console.log(params);
                  axios.post(apiConfig.ADDRESS_API.SAVE, params);
                }}
                getNodeKey={({ node }) => node.id }
                searchQuery={searchString}
                searchFocusOffset={searchFocusIndex}
                searchFinishCallback={(matches) => {
                  setSearchFoundCount(matches.length);
                  setSearchFocusIndex(
                    matches.length > 0 ? searchFocusIndex % matches.length : 0
                  );
                }}
                generateNodeProps={rowInfo => ({
                    buttons: [
                        // add child
                        <IconButton onClick={() => handleAddChild(rowInfo)} variant='contained' color="primary" size='small'><IconPlus /></IconButton >,
                        // edit child
                        <IconButton onClick={() => handleEditNode(rowInfo)} variant='contained' color="warning" size='small'><IconPencil/></IconButton >,
                    //     // remove child
                    //     <IconButton onClick={() => handleRemoveNode(rowInfo)} variant='contained' color="error" size='small'><IconTrash/></IconButton >,
                    ]
                        
                })}
                />
        </Box >
    )
}