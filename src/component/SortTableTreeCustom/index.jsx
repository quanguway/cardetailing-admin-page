import { IconPlus, IconTrash, IconPencil   } from '@tabler/icons';
import '@nosferatu500/react-sortable-tree/style.css';
import SortableTree, { removeNodeAtPath, addNodeUnderParent } from "@nosferatu500/react-sortable-tree";
import { Box, IconButton } from '@mui/material';
import { v4 as uuid } from 'uuid';

export default function SortableTreeCustom ({data, setData}) {

    const getNodeKey = ({node, treeIndex}) => node.id

    const handleRemoveNode = (rowInfo) => {
        let {treeIndex, path} = rowInfo;
        console.log(rowInfo);
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
            console.log(rowInfo);
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

    const handleEditNode = (rowInfo) => {
        
    }

    return (
        <Box height={400}>
           <SortableTree
                treeData={data}
                onlyExpandSearchedNodes={true}
                onChange={(treeData) => setData(treeData)}
                getNodeKey={({ node }) => node.id }
                generateNodeProps={rowInfo => ({
                    buttons: [
                        // add child
                        <IconButton onClick={() => handleAddChild(rowInfo)} variant='contained' color="primary" size='small'><IconPlus /></IconButton >,
                        // edit child
                        <IconButton onClick={() => handleEditNode(rowInfo)} variant='contained' color="warning" size='small'><IconPencil/></IconButton >,
                        // remove child
                        <IconButton onClick={() => handleRemoveNode(rowInfo)} variant='contained' color="error" size='small'><IconTrash/></IconButton >,

                        
                    ]
                        
                })}
                />
        </Box >
    )
}