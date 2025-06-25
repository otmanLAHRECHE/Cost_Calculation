import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridRowModes, GridRowEditStopReasons, GridToolbar } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import Paper from '@mui/material/Paper';

import Container from '@mui/material/Container';

const initialRows = [
  { id: 1, article: 'حليب', qntMax: 3000, qntMin: 1000, year: 2025, prixUnit: 200, tva: 0 },
{ id: 2, article: 'حليب', qntMax: 3000, qntMin: 1000, year: 2025, prixUnit: 200, tva: 0 },
  { id: 3, article: 'حليب', qntMax: 3000, qntMin: 1000, year: 2025, prixUnit: 200, tva: 0 },
  
];

export default function Cuisine_consomation(){

    const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow };
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const columns = [
    { field: 'article', headerName: 'المواد الغذائية', width: 100, editable: false },
    { field: 'qntMax', headerName: 'القيمة القصوى', type: 'number', width: 100, editable: true },
    { field: 'qntMin', headerName: 'القيمة الدنيا', type: 'number', width: 100, editable: true },
    { field: 'year', headerName: 'السنة', type: 'number', width: 100, editable: true },
    { field: 'prixUnit', headerName: 'التسعيرة الوحدوية', type: 'number', width: 100, editable: true },
    { field: 'tva', headerName: 'TVAضريبة القيمة المصافة', type: 'number', width: 150, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: ({ id }) => {
        const isEditing = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isEditing) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelClick(id)} />,
          ];
        }

        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />,
        ];
      },
    },
  ];

  return (
    <React.Fragment>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
      
                                  components={{
                                    Toolbar: GridToolbar,
                                  }}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        
        disableSelection={true}
      />
    </Box>

    </Paper>

    </Container>

    </React.Fragment>
  );
 
}