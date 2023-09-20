import React, {useEffect, useState} from 'react';
import {ParsedOJ} from "./ParsedOJ";
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import {CircularProgress, Paper} from "@mui/material";
import {OJ_DICT_ZED} from "./OrthogonalJones";

const columns = [
    {field: 'originalString', headerName: 'Name', width: 400},
    {field: 'frame', headerName: 'Frame', type: 'number', width: 150},
    {field: 'numDirectionChanges', headerName: 'Dir Changes', type: 'number', width: 150},
    {field: 'height', headerName: 'Height', type: 'number', width: 150},
    {field: 'zed0', headerName: 'Zed 1', type: 'number', width: 150},
    {field: 'zed1', headerName: 'Zed 2', type: 'number', width: 150},
    {field: 'zed2', headerName: 'Zed 3', type: 'number', width: 150},
    {field: 'zed3', headerName: 'Zed 4', type: 'number', width: 150},
    {field: 'zed4', headerName: 'Zed 5', type: 'number', width: 150},
    {field: 'numUp', headerName: 'Total Up', type: 'number', width: 150},
    {field: 'numDown', headerName: 'Total Down', type: 'number', width: 150},
    {field: 'numLeft', headerName: 'Total Left', type: 'number', width: 150},
    {field: 'numRight', headerName: 'Total Right', type: 'number', width: 150},
    {field: 'numNeutral', headerName: 'Total Neutral', type: 'number', width: 150},
    {field: 'numBonk', headerName: 'Total Bonks', type: 'number', width: 150},
];

function OJTable() {
    const [parsedData, setParsedData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        let newTableData = []
        let newParsedData = []
        for (let i = 0; i < OJ_DICT_ZED.length; i++) {
            let inputString = OJ_DICT_ZED[i];
            let parsedOj = new ParsedOJ(inputString);
            newParsedData.push(parsedOj);
            newTableData.push(parsedOj.GetTableData());
        }

        setTableData(newTableData);
        setParsedData(newParsedData);
        setIsLoading(false);

        // You can perform actions like data fetching or setting up event listeners here
    }, []); // The empty array [] as the second argument ensures it only runs once on mount

    if (isLoading) return <CircularProgress/>

    return (
        <Box sx={{width: '100%', height: "100%"}}>
            <Paper sx={{width: '100%', height: "100%", mb: 2}}>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    slots={{
                        toolbar: () => <Box>
                            <h4>Orthogonal Jones Table</h4>
                            <text><b><i>Hover cell headers for filtering options</i></b></text>
                        </Box>
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 50},
                        },
                        sorting: {
                            sortModel: [{field: 'frame', sort: 'asc'}]
                        }
                    }}
                    pageSizeOptions={[5, 10, 50, 100, 1000]}
                    showCellVerticalBorder={true}
                />
            </Paper>
        </Box>
    );
}

export default OJTable;