

import FlatwareIcon from '@mui/icons-material/Flatware';
import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridRowModes, GridRowEditStopReasons, GridToolbar } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
import { getAllServicesNames } from '../../../actions/services_data';
import { getAllRepasByYearByMonth, addRepas, updateRepas, deleteRepas } from '../../../actions/repas_data';
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

export default function Cuisine_repas(){

  const [dateFilter, setDateFilter] = React.useState(dayjs());
  const [dateFilterError, setDateFilterError] = React.useState("");
  const [rowData, setRowData] = React.useState("");
  const [response, setResponse] = React.useState("");
  const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
  const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);
    
  const [dateRepas, setDateRepas] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [loadError, setLoadError ] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dataError, setDataError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);


  const [repasMalade, setRepasMalade] = React.useState("");
  const [repasAutre, setRepasAutre] = React.useState("");
  const [repasPers, setRepasPers] = React.useState("");

  const [repasMaladeError, setRepasMaladeError] = React.useState([false, ""]);
  const [repasAutreError, setRepasAutreError] = React.useState([false, ""]);
  const [repasPersError, setRepasPersError] = React.useState([false, ""]);
  
  const [serviceError, setServiceError] = React.useState([false, ""]);
  const [service, setService] = React.useState(null);
  
  const [allServices, setAllServices] = React.useState([]);
  const [serviceData, setServiceData] = React.useState([]);
  
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [selectionError, setSelectionError] = React.useState(false);

  const [dateRepasError, setDateRepasError] = React.useState([false, ""]);


  const handleChangeFilterDate = (newValue) =>{
          setDateFilter(newValue);

          console.log("filter date...", newValue);

        }

  const edit_repas = async() =>{
      
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


  const delete_repas = () =>{
      if(selectionModel.length == 0){
          setSelectionError(true);
        }else{   
          setOpenDelete(true);
        }
  }
  const add_repas = async() =>{
    const token = localStorage.getItem("auth_token");

    setService(null);
    setDateRepas(null);
    setRepasAutre("");
    setRepasMalade("");
    setRepasPers("");

    setServiceError([false, ""]);
    setDateRepasError([false, ""]);
    setRepasAutreError([false, ""]);
    setRepasMaladeError([false, ""]);
    setRepasPersError([false, ""]);


    setServiceData(await getAllServicesNames(token));

  }

  const addRepasSave = async() =>{
    
  }

  const addRepasClose = () =>{
    setOpen(false);
  }

  

  const columns = [
    { field: 'service', headerName: 'المصلحة او المستفيد', width: 220, valueGetter: (params) =>
    `${params.row.service.name|| ''}` },
    { field: 'repas_malade', headerName: 'عدد الوجبات الخاصة بالمرضى', type: 'number', width: 200},
    { field: 'repas_pers', headerName: 'عدد الوجبات الخاصة بالمناوبين', type: 'number', width: 200},
    { field: 'repas_autre', headerName: 'أخرى', type: 'number', width: 130},
  ];


  React.useEffect(() => {
  
            console.log(response);
      
            if (response == "error"){
              setResponseErrorSignal(true);
            } else if(response != "") {
              setResponseSuccesSignal(true);
            }
      
          }, [response]);


          React.useEffect(() =>{
                  try{
                    if (serviceData == "no data"){
                      setResponseErrorSignal(true);
                    } else if(serviceData != "") {
                      setAllServices(serviceData);
                      setOpen(true);
                    }
                  }catch(e){
                    console.log(e);
                  }
                }, [serviceData]);



          React.useEffect(() => {
          
                    setLoading(true);
                    setDateFilterError([false, ""]);
          
                    const fetchData = async () => {
                      try {
                        const token = localStorage.getItem("auth_token");
                        const year = dateFilter.get('year');
                        const month = dateFilter.get('month') + 1;
                        setData(await getAllRepasByYearByMonth(token, month, year));
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
                        setResponse(await deleteRepas(token, selectionModel[0])); 
                      };  



                      const handleChangeDateRepas = (newValue) => {
                               setDateRepas(newValue);
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
                  <Button startIcon={<AddCircleOutlineIcon />} onClick={add_repas}>Ajouter</Button>
                  <Button startIcon={<EditIcon />} onClick={edit_repas}>Editer</Button>
                  <Button startIcon={<DeleteForeverIcon />} onClick={delete_repas}>Supprimer</Button>
                </ButtonGroup>
                </Box>
                
              </Grid>


          <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <div style={{ height: 800, width: '100%' }}>
                            <DataGrid
                              components={{
                                Toolbar: GridToolbar,
                              }}
                                rows={data}
                                columns={columns}
                                pageSize={15}
                                checkboxSelection = {false}
                                loading={loading}
                                disableMultipleSelection={true}
                                onSelectionModelChange={(newSelectionModel) => {
                                  setSelectionModel(newSelectionModel);
                                }}
                                selectionModel={selectionModel}
                                
                                
                            />
                      </div> 

    </Paper>

    </Grid>

    </Grid>


     <Dialog open={open} onClose={addRepasClose}  maxWidth="md" fullWidth={true}>
                              <DialogTitle>Ajouter repas record</DialogTitle>
                                  <DialogContent>
    
                                  
                                  <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                            <Autocomplete
                                                disablePortal
                                                value={service}
                                                onChange={async (event, newVlue) =>{
                                                    setService(newVlue);
                                                    console.log(newVlue.id);
                                                }}
                                                id="combo-box-demo"
                                                options={allNames}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} error={serviceError[0]}
                                                helperText={serviceError[1]} fullWidth variant="standard" label="Service" 
                                                required/>}
                                            />
    
                                            </Grid>
                                            <Grid item xs={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DesktopDatePicker
                                                            label="Mois"
                                                            inputFormat="MM/YYYY"
                                                            value={dateRepas}
                                                            onChange={handleChangeDateRepas}
                                                            renderInput={(params) => <TextField {...params} error={dateRepasError[0]}
                                                            helperText={dateRepasError[1]} 
                                                            required/>}
                                                    />
    
                                                </LocalizationProvider> 
                                            
                                            </Grid>
    
                                  </Grid>
    
                                  <br></br>
                                  
                                  
                                    
    
                                <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                           <TextField
                                                error={repasMaladeError[0]}
                                                helperText={repasMaladeError[1]}
                                                required
                                                margin="dense"
                                                label="Repas malade"
                                                fullWidth
                                                variant="standard"
                                                value = {repasMalade}
                                                onChange={(event) => {setRepasMalade(event.target.value)}}
                                              />
    
                                                </Grid>
    
                                                <Grid item xs={4}>
                                           <TextField
                                                error={repasPersError[0]}
                                                helperText={repasPersError[1]}
                                                required
                                                margin="dense"
                                                label="Repas Pers de garde"
                                                fullWidth
                                                variant="standard"
                                                value = {repasPers}
                                                onChange={(event) => {setRepasPers(event.target.value)}}
                                              />
    
                                                </Grid>

                                                 <Grid item xs={4}>
                                           <TextField
                                                error={repasAutreError[0]}
                                                helperText={repasAutreError[1]}
                                                required
                                                margin="dense"
                                                label="Autre"
                                                fullWidth
                                                variant="standard"
                                                value = {repasAutre}
                                                onChange={(event) => {setRepasAutre(event.target.value)}}
                                              />
    
                                                </Grid>
                                </Grid>

                               
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={addRepasClose}>Anuller</Button>
                                    <Button onClick={addRepasSave}>Sauvgarder</Button>
                                  </DialogActions>
                </Dialog>



    <Dialog open={openDelete}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={deleteMedicClose}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>{"Confirmer la suppression d'un article"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-slide-description">
                                  هل انت متأكد من حذف سجل الوجبات الخاص بالمصلحة                
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