import React, {useEffect, useState} from 'react';
import {ParsedOJ} from "./ParsedOJ";
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import {CircularProgress, Paper} from "@mui/material";
import {OJ_DICT} from "./OrthogonalJones";

const columns = [
    {field: 'originalString', headerName: 'Name', width: 400},
    {field: 'numDirectionChanges', headerName: 'Dir Changes', type: 'number', width: 150},
    {field: 'numFrames', headerName: 'Frames', type: 'number', width: 150},
    {field: 'height', headerName: 'Height', type: 'number', width: 150},
    {field: 'numUp', headerName: 'Total Up', type: 'number', width: 150},
    {field: 'numDown', headerName: 'Total Down', type: 'number', width: 150},
    {field: 'numLeft', headerName: 'Total Left', type: 'number', width: 150},
    {field: 'numRight', headerName: 'Total Right', type: 'number', width: 150},
    {field: 'numNeutral', headerName: 'Total Neutral', type: 'number', width: 150},
    {field: 'numBuffer', headerName: 'Total Buffer', type: 'number', width: 150},
];

function OJTable() {
    const [parsedData, setParsedData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        let newTableData = []
        let newParsedData = []
        for (let i = 0; i < OJ_DICT.length; i++) {
            let inputString = OJ_DICT[i];
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
                    }}
                    pageSizeOptions={[5, 10, 50, 100, 1000]}
                    showCellVerticalBorder={true}
                />
            </Paper>
        </Box>
    );
}

export default OJTable;