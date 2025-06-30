import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridRowModes, GridRowEditStopReasons, GridToolbar } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Container from '@mui/material/Container';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { getAllConsomationByYearByMonth, generateConsomationByYearByMonth, deleteConsomationByMonthByYear, saveStateConsomation } from '../../../actions/consomation_data';

import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Alt from '../../layouts/alert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Cuisine_consomation_ultra(){

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [dateFilter, setDateFilter] = React.useState(dayjs());
  const [dateFilterError, setDateFilterError] = React.useState("");
  
  const [response, setResponse] = React.useState("");
  const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
  const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);
    
  const [loading, setLoading] = React.useState(false);
  const [loadError, setLoadError ] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dataError, setDataError] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

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
    setData((prevRows) =>
      prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };


  const handleChangeFilterDate = (newValue) =>{
          setDateFilter(newValue);

          console.log("filter date...", newValue);

        }

  const sauvQntCov = async() =>{
      
      const token = localStorage.getItem("auth_token");    
      //setResponse(await saveStateQntConvF(token, data));

      setLoading(true);
          for(let i = 0;i<data.length; i++){
            const d = { id: data[i].id,
                        cons: data[i].cons,
                       };

            if(i == data.length - 1){
              setResponse(await saveStateConsomation(token, JSON.stringify(d)));
            }else{
              await saveStateConsomation(token, JSON.stringify(d))
            }
          }


        }


  const deleteQntCovFunc = () =>{
      
    setOpenDelete(true);
  }
  const generateStateQntCov = async() =>{
    const token = localStorage.getItem("auth_token");    
      const year = dateFilter.get('year');  
      const month = dateFilter.get('month') + 1;
      setResponse(await generateConsomationByYearByMonth(token, month, year));
        }

  const columns = [
    { field: 'article', headerName: 'المواد الغذائية', width: 100, editable: false , valueGetter: (params) =>
    `${params.row.qnt_conv.article.article_name || ''}` },
    { field: 'cons', headerName: 'الإستهلاك الشهري', type: 'number', width: 100, editable: true },
    { field: 'qntMin', headerName: 'الكمية الدنيا', type: 'number', width: 100, editable: false , valueGetter: (params) =>
    `${params.row.qnt_conv.qntMin || ''}` },
    { field: 'qntMax', headerName: 'الكمية القصوى', type: 'number', width: 100, editable: false , valueGetter: (params) =>
    `${params.row.qnt_conv.qntMax || ''}` },
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


  React.useEffect(() => {
  
            console.log(response);
      
            if (response == "error"){
              setResponseErrorSignal(true);
            } else if(response != "") {
              setResponseSuccesSignal(true);
            }
      
          }, [response]);



          React.useEffect(() => {
          
                    setLoading(true);
                    setDateFilterError([false, ""]);
          
                    const fetchData = async () => {
                      try {
                        const token = localStorage.getItem("auth_token");
                        const year = dateFilter.get('year');
                        const month = dateFilter.get('month') + 1;
                        setData(await getAllConsomationByYearByMonth(token, month, year));
                        setLoading(false);
                      } catch (error) {
                        console.log("error", error);
                      }
                    };
                
                    
          
                    if (dateFilter.isValid() == false || dateFilter ==""){
                      setDateFilterError([true, "une erreur sur le champ de date"]);
                    
                    }else{
                      fetchData();
                    }
              
                    
              
                  }, [response, dateFilter]);


                      const deleteMedicClose = () => {
                        setOpenDelete(false);
                      };
                  
                  
                      const deleteConfirmation = async () =>{
                  
                        setOpenDelete(false);
                        const token = localStorage.getItem("auth_token");
                        const year = dateFilter.get('year');
                        const month = dateFilter.get('month') + 1;
                        setResponse(await deleteConsomationByMonthByYear(token, month, year)); 
                  
                      };  

  return (
    <React.Fragment>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
<Grid item xs={6}>

              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        views={['year', 'month']}
                                                        label="Selectioner le mois"
                                                        value={dateFilter}
                                                        onChange={handleChangeFilterDate}
                                                        renderInput={(params) => <TextField {...params} error={dateFilterError[0]}
                                                        helperText={dateFilterError[1]} 
                                                        required/>}
                                                />

              </LocalizationProvider>

              </Paper>
                
              </Grid>

              <Grid item xs={6}>

              <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                        m: 1,
                        },
                    }}
                >
                <ButtonGroup variant="outlined" aria-label="outlined primary button group" orientation="vertical">
                  <Button startIcon={<MovieCreationIcon />} onClick={generateStateQntCov}>Creation d'état</Button>
                  <Button startIcon={<SaveAltIcon />} onClick={sauvQntCov}>Sauvgarder</Button>
                  <Button startIcon={<DeleteForeverIcon />} onClick={deleteQntCovFunc}>Supprimer</Button>
                </ButtonGroup>
                </Box>
                
              </Grid>


          <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
      
                                  components={{
                                    Toolbar: GridToolbar,
                                  }}
        rows={data}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        loading={loading}
        
        disableSelection={true}
      />
    </Box>

    </Paper>

    </Grid>

    </Grid>



    <Dialog open={openDelete}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={deleteMedicClose}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>{"Confirmer la suppression d'un article"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-slide-description">
                                  هل انت متأكد من حذف جميع إستهلاك الحصص الخاصة بهذا الشهر           
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={deleteMedicClose}>رجوع</Button>
                                  <Button onClick={deleteConfirmation}>حذف</Button>
                                </DialogActions>
                  </Dialog>

    </Container>

    {dataError ? <Alt type='error' message='La liste des items de bon de sorte est vide!!' onClose={()=> setDataError(false)} /> : null}
    {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
    {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
    {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
                           

    </React.Fragment>
  );
 
}