import { IconPlus, IconTrash, IconPencil   } from '@tabler/icons';
import '@nosferatu500/react-sortable-tree/style.css';
import SortableTree, { removeNodeAtPath, addNodeUnderParent } from "@nosferatu500/react-sortable-tree";
import { Box, IconButton, TextField } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';


export default function SortableTreeCustom ({data, setData}) {

    const getNodeKey = ({node, treeIndex}) => node.id
    const [searchString, setSearchString] = useState("");
    const [searchFocusIndex, setSearchFocusIndex] = useState(0);
    const [searchFoundCount, setSearchFoundCount] = useState(null);

    const handleRemoveNode = (rowInfo) => {
        if (
            window.confirm(
              `Are you sure you want to delete this node?`
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
            <TextField value={searchString} onChange={(event) => {setSearchString(event.target.value)}} label="Search" variant="outlined" />
          </Box>
           <SortableTree
                treeData={data}
                onlyExpandSearchedNodes={true}
                onChange={(treeData, node) => {setData(treeData)}}
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
                    // buttons: [
                    //     // add child
                    //     <IconButton onClick={() => handleAddChild(rowInfo)} variant='contained' color="primary" size='small'><IconPlus /></IconButton >,
                    //     // edit child
                    //     <IconButton onClick={() => handleEditNode(rowInfo)} variant='contained' color="warning" size='small'><IconPencil/></IconButton >,
                    //     // remove child
                    //     <IconButton onClick={() => handleRemoveNode(rowInfo)} variant='contained' color="error" size='small'><IconTrash/></IconButton >,
                    // ]
                        
                })}
                />
        </Box >
    )
}