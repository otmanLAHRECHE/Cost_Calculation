import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar, GridActionsCellItem,GridToolbarContainer,GridToolbarFilterButton,} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import Alt from '../layouts/alert';
import ArivageItemsTable from '../layouts/arr_items_table';
import { getAllArrivageOfMedic, getAllMedicNames } from '../../actions/medicament_data';
import { getSelectedStock } from '../../actions/stock_data';
import { internal_processStyles } from '@mui/styled-engine';

import { addBonArrivage, addBonArrivageItem, deleteBonArrivage, getAllBonArrivageOfMonth, getSelectedBonArrivage, updateBonArrivage, getAllFournForSelect, addBonArrivageItemCustom } from '../../actions/arrivage_stock';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const columns = [
    { field: 'id', headerName: 'Id', width: 60, hide: true },
    { field: 'bon_arrivage_nbr', headerName: 'Nbr de bon', width: 100},
    { field: 'four', headerName: 'Fournisseur', width: 200, valueGetter: (params) =>
    `${params.row.fourn.name || ''}` },
    { field: 'date', headerName: 'Date', width: 140 },
    { field: 'arr', headerName: 'Les item arrivée',width: 640 , renderCell: (params) => (
      <ArivageItemsTable rows={params.row.arivage_items_set}/>
    ),
   },
  ];

  

  
  var arrItemsTableData = [];


  

  export default function Bon_entree(){

    const [bonNbr, setBonNbr] = React.useState("");
    const [fourn, setFourn] = React.useState(null);
    const [date, setDate] = React.useState("");
    const [dateFilter, setDateFilter] = React.useState(dayjs());

    const [medicName, setMedicName] = React.useState(null);
    const [arivage, setArivage] = React.useState(null);
    const [qnt, setQnt] = React.useState("");
    
    const [dateArived, setDateArived] = React.useState("");
    const [dateExpired, setDateExpired] = React.useState("");
    const [lot, setLot] = React.useState("");

    const [medicNameError, setMedicNameError] = React.useState([false, ""]);
    const [arivageError, setArivageError] = React.useState([false, ""]);
    const [qntError, setQntError] = React.useState([false, ""]);


    const [datePickersState,setDatePickersState] = React.useState(false);
    const [lotState,setLotState] = React.useState(false);
    const [arrivageState, setArrivageState] = React.useState(true);

    const [dateArivedError, setDateArivedError] = React.useState([false, ""]);
    const [dateExpiredError, setDateExpiredError] = React.useState([false, ""]);
    const [lotError, setLotError] = React.useState([false, ""]);

    const [callBack, setCallBack] = React.useState("");

    const [dateFilterNotErr, setDateFilterNotErr] = React.useState(false);
    

    const [bonNbrError, setBonNbrError] = React.useState([false, ""]);
    const [fournError, setFournError] = React.useState([false, ""]);
    const [dateError, setDateError] = React.useState([false, ""]);

    const [dateFilterError, setDateFilterError] = React.useState("");

    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);
    const [sortieQntError, setSortieQntError] = React.useState(false);

    const [allNames, setAllNames] = React.useState([]);
    const [allFourns, setAllFourns] = React.useState([]);
    const [allArivage, setAllArivage] = React.useState([{"label":"Nouveau arrivage"}]);

    const [currentStockItem, setCurrentStockItem] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [dataSortie, setDataSortie] = React.useState([]);
    const [namesData, setNamesData] = React.useState([]);
    const [fournData, setFournData] = React.useState([]);
    const [arrivageData, setArrivageData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [selectionModelItems, setSelectionModelItems] = React.useState([]);
    const [rowData, setRowData] = React.useState("");
    const [loadingSortieItem, setLoadingSortieItem] = React.useState(false);

    const [dataError, setDataError] = React.useState(false);


    const theme = useTheme

    function CustomToolbar() {
      return (
        <GridToolbarContainer>
          <GridToolbarFilterButton />
          <Button startIcon={<DeleteForeverIcon />} onClick={deleteItem}>
            Supprimer
          </Button>
        </GridToolbarContainer>
      );
    }

      function Copyright(props) {
          return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
              {'Copyright © '}
              <Link color="inherit" href="https://github.com/otmanLAHRECHE">
              EHS GUEDDI BAKIR GHARDAIA V2.0  
              </Link>{' '}
              -- created by otman LAHRECHE
              {'.'}
            </Typography>
          );
        }

        const addBonSortieOpen = async () =>{

          arrItemsTableData = [];
          setDataSortie(arrItemsTableData);
          setBonNbr("");
          setMedicName(null);
          setArivage(null);
          setDateArived(null);
          setDateExpired(null);
          setLot("");
          setQnt("");
          setDate("");
          setFourn(null);


          setMedicNameError([false, ""]);
          setArivageError([false, ""]);
          setQntError([false, ""]);
          setDateError([false, ""]);
          setDateArivedError([false, ""]);
          setDateExpiredError([false, ""]);
          setLotError([false, ""]);
          setBonNbrError([false, ""]);
          setFournError([false, ""]);


          const token = localStorage.getItem("auth_token");

          setFournData(await getAllFournForSelect(token));

          setNamesData(await getAllMedicNames(token));

        };

        const addBonSortieClose = () =>{
          setOpen(false);
        }



        const handleChangeDate = (newValue) =>{
          setDate(newValue);

        }

        const handleChangeDateArived = (newValue) => {
          setDateArived(newValue);
        };
  
        const handleChangeDateExpired = (newValue) => {
          setDateExpired(newValue);
        };

        const handleChangeFilterDate = (newValue) =>{
          setDateFilter(newValue);

          console.log("filter date...", newValue);

        }

        const editBonSortieOpen = async () =>{
          if(selectionModel.length == 0){
            setSelectionError(true);
          }else{    
            const token = localStorage.getItem("auth_token");

            setFournData(await getAllFournForSelect(token));
    
            setRowData(await getSelectedBonArrivage(token, selectionModel[0])); 
          }


        };

        const addBonSortieSave = async () =>{
          var test = true;

          
          setDateError([false, ""]);
          setBonNbrError([false, ""]);
          setFournError([false, ""]);
          setDateArivedError([false, ""]);
          setDateExpiredError([false, ""]);
          setQntError([false, ""]);
          setMedicNameError([false, ""]);
          setArivageError([false, ""]);

          if (bonNbr == ""){
            test = false;
            setBonNbrError([true, "champ est obligatoire"]);
          }

          if(fourn == null || fourn == ""){
            test = false;
            setFournError([true, "champ est obligatoire"]);
          }

          if(date == null || date == ""){
            test = false;
            setDateError([true, "champ est obligatoire"]);
          }else if(date.isValid() == false){
            test = false;
            setDateError([true, "date n est pas valide"]);
          }
          if(arrItemsTableData.length == 0){
            test = false;
            setDataError(true);
          }

          if(test){
            var m = date.get('month')+1;
            const d = date.get('date') +"/"+m +"/"+date.get('year');

            const data = {
              "bon_arrivage_nbr":Number(bonNbr),
              "id":fourn.id,
              "date":d,
            }

            const token = localStorage.getItem("auth_token");
            setCallBack(await addBonArrivage(token, JSON.stringify(data)));                        

          }else{
            console.log("error");
            setLoadError(true);

          }


        }

        const addSortieIem = async () =>{
          var test = true;
          var mode = 0;

          
          setDateArivedError([false, ""]);
          setDateExpiredError([false, ""]);
          setQntError([false, ""]);
          setMedicNameError([false, ""]);
          setArivageError([false, ""]);
          setLotError([false, ""]);
          


          if(qnt == null || qnt == "" || qnt == "0"){
            test = false;
            setQntError([true, "champ est obligatoire"]);
          }

          if(medicName == null || medicName == ""){
            test = false;
            setMedicNameError([true, "champ est obligatoire"]);
          }
          if(arivage == null || arivage == ""){
            test = false;
          setArivageError([true, "champ est obligatoire"]);

          if(dateArived == null || dateArived == ""){
              test = false;
              setDateArivedError([true, "champ est obligatoire"]);
    
            }else if(dateArived.isValid() == false){
              test = false;
              setDateArivedError([true, "date n est pas valide"]);
    
            }
  
            if(lot == null || lot == "" || lot == "0"){
              test = false;
              setLotError([true, "champ est obligatoire"]);
            }
            
            if(dateExpired == null || dateExpired == ""){
              test = false;
              setDateExpiredError([true, "champ est obligatoire"]);
    
            }else if(dateExpired.isValid() == false){
              test = false;
              setDateExpiredError([true, "date n est pas valide"]);
    
            }

          }else if(arivage.label == "Nouveau arrivage"){
            mode = 0;
            if(dateArived == null || dateArived == ""){
              test = false;
              setDateArivedError([true, "champ est obligatoire"]);
    
            }else if(dateArived.isValid() == false){
              test = false;
              setDateArivedError([true, "date n est pas valide"]);
    
            }
  
            if(lot == null || lot == "" || lot == "0"){
              test = false;
              setLotError([true, "champ est obligatoire"]);
            }
  
            
            if(dateExpired == null || dateExpired == ""){
              test = false;
              setDateExpiredError([true, "champ est obligatoire"]);
    
            }else if(dateExpired.isValid() == false){
              test = false;
              setDateExpiredError([true, "date n est pas valide"]);
    
            }
    
            if(dateArived>= dateExpired){
              setDateArivedError([true, "problem sur la date"]);
              setDateExpiredError([true, "problem sur la date"]);
              test = false
            }
  
          }else{
            mode = 1;
  
          }


          if(test){
            console.log("good to go");

            if(mode == 0){

              
            console.log("mode 0");

                var m = dateArived.get('month')+1;
                const date_a = dateArived.get('date') +"/"+m +"/"+dateArived.get('year');
                m = dateExpired.get('month')+1
                const date_e = dateExpired.get('date') +"/"+m+"/"+dateExpired.get('year');

                    const data = {
                      
                    "id": Math.random(),
                    "mode":0,
                    "date_arrived":date_a,
                    "date_expired":date_e,
                    "stock_qte":qnt,
                    "id_medic": medicName.id,
                    "medic_name": medicName.label,
                    "lot_number":lot,
                    "medic_lot_price":"0.00"
                    }

                    arrItemsTableData = Object.assign([], arrItemsTableData);
                    arrItemsTableData.push(data);
                    setDataSortie(arrItemsTableData);
                    setMedicName(null);
                    setArivage(null);
                    setQnt("");
                    setDateArived(null);
                    setDateExpired(null);
                    setLot("");
                    console.log(arrItemsTableData);


            }else{
              console.log("mode 1");


                const data = {
                    "id": Math.random(),
                    "mode":1,
                    "stock_qte":qnt,
                    "lot_number":currentStockItem.lot_number,
                    "medic_lot_price":"0.00",
                    "id_stock": currentStockItem.id,
                    "medic_name": medicName.label,
                    
                    }

                    arrItemsTableData = Object.assign([], arrItemsTableData);
                    arrItemsTableData.push(data);
                    setDataSortie(arrItemsTableData);
                    setMedicName(null);
                    setArivage(null);
                    setQnt("");
                    setDateArived(null);
                    setDateExpired(null);
                    setLot("");
                    
                    setDatePickersState(false);
                    setLotState(false);
                    console.log(arrItemsTableData);

                

            }
          }


        }


        React.useEffect(() => {
          console.log(rowData);
          try{
    
            if (rowData == "no data"){
              setResponseErrorSignal(true);
            } else if(rowData != "") {
      
            setOpenUpdate(true);
      
            setBonNbr(rowData.bon_arrivage_nbr);
            setFourn({"id":rowData.fourn.id, "label":rowData.fourn.name});
            setFourn(allFourns[0]);
            setDate(dayjs(rowData.date, 'YYYY-MM-DD'));
    
            setBonNbrError([false, ""]);
            setFournError([false, ""]);
            setDateError([false, ""]);
    
            }
          }catch(e){
            console.log(e)
          }
    
        }, [rowData]);

        React.useEffect(() =>{
          try{
            if (fournData == "no data"){
              setResponseErrorSignal(true);
            } else if(fournData != "") {
              setAllFourns(fournData);
            }
          }catch(e){
            console.log(e);
          }
        }, [fournData]);

        React.useEffect(() =>{
          try{
            if (namesData == "no data"){
              setResponseErrorSignal(true);
            } else if(namesData != "") {
              setAllNames(namesData);
              setOpen(true);
            }
          }catch(e){
            console.log(e);
          }
        }, [namesData]);

        React.useEffect(() =>{
          try{
            if (arrivageData == "no data"){
              setResponseErrorSignal(true);
            } else if(arrivageData != "") {
              arrivageData.push({"label":"Nouveau arrivage"})
              setAllArivage(arrivageData);
            }
          }catch(e){
            console.log(e);
          }
        }, [arrivageData]);

        React.useEffect(() =>{
          
          try{
            if (currentStockItem == "no data"){
              setResponseErrorSignal(true);
            } else if(currentStockItem != "") {
              console.log(currentStockItem);
            }
          }catch(e){
            console.log(e);
          }
        }, [currentStockItem]);

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
              var month = dateFilter.get("month")+1
              var year = dateFilter.get('year')
              setData(await getAllBonArrivageOfMonth(token, month, year));
              setLoading(false);
            } catch (error) {
              console.log("error", error);
            }
          };
      
          

          if (dateFilter.isValid() == false || dateFilter ==""){
            setDateFilterError([true, "une erreur sur le champ de date"]);
            setDateFilterNotErr(true);
          }else{
            fetchData();
          }
    
          
    
        }, [response, dateFilter]);

        React.useEffect(() => {

          const uploadS = async (da) =>{
            const token = localStorage.getItem("auth_token");
              await addBonArrivageItemCustom(token, JSON.stringify(da));
          }

          const uploadS2 = async (da) =>{
            const token = localStorage.getItem("auth_token");           
              setResponse(await addBonArrivageItemCustom(token, JSON.stringify(da)));
          }



          const uploadSA = async (da) =>{
            const token = localStorage.getItem("auth_token");
              await addBonArrivageItem(token, JSON.stringify(da));
          }

          const uploadSA2 = async (da) =>{
            const token = localStorage.getItem("auth_token");           
              setResponse(await addBonArrivageItem(token, JSON.stringify(da)));
          }

    
          if (callBack == ""){

          } else{

            console.log("callback..........", callBack.id_bon_arrivage);
            console.log("length..........", arrItemsTableData.length);

            for(var i=0; i<arrItemsTableData.length; i++){

              if(i != arrItemsTableData.length - 1){

                if(arrItemsTableData[i].mode == 0 ){
                 
                  const data = {
                    "id_bon_arrivage":Number(callBack.id_bon_arrivage),
                    "date_arrived":arrItemsTableData[i].date_arrived,
                    "date_expired":arrItemsTableData[i].date_expired,
                    "stock_qte":arrItemsTableData[i].stock_qte,
                    "id_medic": arrItemsTableData[i].id_medic,
                    "lot_number":arrItemsTableData[i].lot_number,
                    "medic_lot_price":arrItemsTableData[i].medic_lot_price
                  }

                  uploadS(data);
                   console.log("uploadS:",data);

                }else{

                  const data = {
                    "id_bon_arrivage":Number(callBack.id_bon_arrivage),
                    "id_stock":arrItemsTableData[i].id_stock,
                    "stock_qte":arrItemsTableData[i].stock_qte

                   }

                   uploadSA(data);
                   
                   console.log("uploadSA:",data);

                }

                
              }else{
                if(arrItemsTableData[i].mode == 0 ){
                 
                  const data = {
                    "id_bon_arrivage":Number(callBack.id_bon_arrivage),
                    "date_arrived":arrItemsTableData[i].date_arrived,
                    "date_expired":arrItemsTableData[i].date_expired,
                    "stock_qte":arrItemsTableData[i].stock_qte,
                    "id_medic": arrItemsTableData[i].id_medic,
                    "lot_number":arrItemsTableData[i].lot_number,
                    "medic_lot_price":arrItemsTableData[i].medic_lot_price
                  }

                  uploadS2(data);
                  
                  console.log("uploadS2:",data);

                }else{

                  const data = {
                    "id_bon_arrivage":Number(callBack.id_bon_arrivage),
                    "id_stock":arrItemsTableData[i].id_stock,
                    "stock_qte":arrItemsTableData[i].stock_qte

                   }

                   uploadSA2(data);
                   console.log("uploadSA2:",data);

                }
                

              }                    
            }
            setResponseSuccesSignal(true);
            setCallBack("");
            setOpen(false);
          }
    
        }, [callBack]);


        const deleteItem = () =>{
          var index = null;
          var table = [];
          for (var i =0; i< arrItemsTableData.length; i++){
            if (arrItemsTableData[i].id == selectionModelItems[0]){
              index = i; 
            }else{
              table.push(arrItemsTableData[i])
            }
          }
          if (index != null){
            arrItemsTableData = table;
            setDataSortie(arrItemsTableData);
          }
        }

        const deleteBonSortieOpen = () =>{

          if(selectionModel.length == 0){
            setSelectionError(true);
          }else{   
            setOpenDelete(true);
          }
          
        }

        const deleteBonSortieClose = () =>{
          setOpenDelete(false);
        }
  
        const deleteConfirmation = async () =>{
  
          setOpenDelete(false);
          const token = localStorage.getItem("auth_token");
          setResponse(await deleteBonArrivage(token, selectionModel[0])); 
        }

        const editBonSortieClose = () =>{
          setOpenUpdate(false);
        }

        const editBonSortieSave = async () =>{
          var test = true;

          setBonNbrError([false, ""]);
          setFournError([false, ""]);
          setDateError([false, ""]);


          if (bonNbr == ""){
            test = false;
            setBonNbrError([true, "champ est obligatoire"]);
          }

          if(fourn == null || fourn == ""){
            test = false;
            setFournError([true, "champ est obligatoire"]);
          }

          if(date == null || date == ""){
            test = false;
            setDateError([true, "champ est obligatoire"]);
          }else if(date.isValid() == false){
            test = false;
            setDateError([true, "date n est pas valide"]);
          }

          if(test){
            setOpenUpdate(false);

            var m = date.get('month')+1;
            const d = date.get('date') +"/"+m +"/"+date.get('year');

            const data = {
              "bon_arrivage_nbr":Number(bonNbr),
              "id":fourn.id,
              "date":d,
            }

            const token = localStorage.getItem("auth_token");
            setResponse(await updateBonArrivage(token, JSON.stringify(data), rowData.id)); 

          }else{
            console.log("error");
          setLoadError(true)
          }


        }


        const columnsSortie = [
          { field: 'id', headerName: 'Id', width: 60, hide: true },
          { field: 'medic_name', headerName: 'nom de medicament', width: 280},
          { field: 'lot_number', headerName: 'Num lot', width: 220},
          { field: 'stock_qte', headerName: 'Qnt arrivée', width: 100},
         
        ];

        return(

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
                  <Button startIcon={<AddCircleOutlineIcon />} onClick={addBonSortieOpen}>Ajouter bon de d'arivage</Button>
                  <Button startIcon={<EditAttributesIcon />} onClick={editBonSortieOpen}>Modifier bon de d'arivage</Button>
                  <Button startIcon={<DeleteForeverIcon />} onClick={deleteBonSortieOpen}>Supprimer bon de d'arivage</Button>
                </ButtonGroup>
                </Box>
                
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 700, width: '100%' }}>
                          <DataGrid
                            components={{
                              Toolbar: GridToolbar,
                            }}
                              rows={data}
                              columns={columns}
                              pageSize={15}
                              checkboxSelection = {false}
                              loading={loading}
                              getRowHeight={() => 'auto'}
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
            <Copyright sx={{ pt: 4 }} />

            <Dialog open={open} onClose={addBonSortieClose}  maxWidth="lg" fullWidth={true}>
                  <DialogTitle>Ajouter un bon d'arivage</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                          <TextField
                                                  error={bonNbrError[0]}
                                                  helperText={bonNbrError[1]}
                                                  margin="dense"
                                                  id="bon_sortie_nbr"
                                                  label="Bon de arivage Nbr"
                                                  fullWidth
                                                  variant="standard"
                                                  type="number"
                                                  onChange={(event) => {setBonNbr(event.target.value)}}
                                          />

                                        </Grid>
                                        <Grid item xs={4}>
                                                <Autocomplete
                                                    disablePortal
                                                    value={fourn}
                                                    onChange={(event, newVlue) =>{
                                                        setFourn(newVlue);
                                                        
                                                    }}
                                                    options={allFourns}
                                                    renderInput={(params) => <TextField {...params} error={fournError[0]}
                                                    helperText={fournError[1]} fullWidth variant="standard" label="Fournisseur" 
                                                    required/>}
                                                />  
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date"
                                                        inputFormat="DD/MM/YYYY"
                                                        value={date}
                                                        onChange={handleChangeDate}
                                                        renderInput={(params) => <TextField {...params} error={dateError[0]}
                                                        helperText={dateError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>
                                                 
                                        
                                        </Grid>

                        
                      </Grid>

                      <br></br> 

                      <Grid container spacing={2}>

                                <Grid item xs={4}>
                                <Box sx={{ p: 2, border: '1px dashed grey' }}>
                                
                                
                                  <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                    <Autocomplete
                                            disablePortal
                                            value={medicName}
                                            onChange={async (event, newVlue) =>{
                                                
                                                                                                setMedicName(newVlue);
                                                                                                console.log(newVlue.id);
                                                                                                setAllArivage([{"label":"Nouveau arrivage"}]);
                                                                                                const token = localStorage.getItem("auth_token");
                                                                                                setArrivageData(await getAllArrivageOfMedic(token, newVlue.id));   
                                                                                                
                                                                                                setDatePickersState(false);
                                                                                                setLotState(false);                                                                                           
                                            }}
                                            id="combo-box-demo"
                                            options={allNames}
                                            renderInput={(params) => <TextField {...params} error={medicNameError[0]}
                                            helperText={medicNameError[1]} fullWidth variant="standard" label="Médicaments" 
                                            required/>}
                                        />

                                    </Grid>
                                    <Grid item xs={12}>
                                    <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    value={arivage}
                                                    onChange={async (event, newVlue) =>{
                                                        setArivage(newVlue);
                                                        console.log("arrivage...",newVlue);

                                                        
                                                        setDatePickersState(false);
                                                        setLotState(false);

                                                        if(newVlue == "Nouveau arrivage"){
                                                          console.log("arrivage...",newVlue);
                                                          setDatePickersState(false);
                                                          setLotState(false);

                                                        }else{
                                                          const token = localStorage.getItem("auth_token");
                                                          setCurrentStockItem(await getSelectedStock(token, newVlue.id));
                                                          
                                                          setDatePickersState(true);
                                                          setLotState(true);

                                                        }
                                                         

                                                    }}
                                                    options={allArivage}
                                                    renderInput={(params) => <TextField {...params} error={arivageError[0]}
                                                    helperText={arivageError[1]} fullWidth variant="standard" label="Arrivage" 
                                                    required/>}
                                                />  

                                    </Grid>

                                    <Grid item xs={12}>
                                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                    <DesktopDatePicker
                                                                                            label="Date d arrivage"
                                                                                            inputFormat="DD/MM/YYYY"
                                                                                            disabled = {datePickersState}
                                                                                            value={dateArived}
                                                                                            onChange={handleChangeDateArived}
                                                                                            renderInput={(params) => <TextField {...params} error={dateArivedError[0]}
                                                                                            helperText={dateArivedError[1]} 
                                                                                            required/>}
                                                                                    />
                                    
                                                                                </LocalizationProvider>
                                                                                
                                    
                                                                                </Grid>
                                    
                                                                                <Grid item xs={12}>
                                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                                    <DesktopDatePicker
                                                                                            label="Date d expiration"
                                                                                            inputFormat="DD/MM/YYYY"
                                                                                            disabled = {datePickersState}
                                                                                            value={dateExpired}
                                                                                            onChange={handleChangeDateExpired}
                                                                                            renderInput={(params) => <TextField {...params} error={dateExpiredError[0]}
                                                                                            helperText={dateExpiredError[1]} 
                                                                                            required />}
                                                                                    />
                                                                                </LocalizationProvider>
                                                                                
                                                                                </Grid>

                                                                                <Grid item xs={12}>
                                    <TextField
                                                                      error={lotError[0]}
                                                                      helperText={lotError[1]}
                                                                      required
                                                                      disabled = {lotState}
                                                                      margin="dense"
                                                                      label="N* de lot"
                                                                      fullWidth
                                                                      variant="standard"
                                                                      value = {lot}
                                                                      onChange={(event) => {setLot(event.target.value)}}
                                                                    />

                                    </Grid>

                                    <Grid item xs={12}>
                                    <TextField
                                          error={qntError[0]}
                                          helperText={qntError[1]}
                                          required
                                          margin="dense"
                                          label="Qnt"
                                          fullWidth
                                          variant="standard"
                                          value = {qnt}
                                          onChange={(event) => {setQnt(event.target.value)}}
                                      />

                                    </Grid>


                                    <Grid item xs={12}>
                                    <ButtonGroup variant="text" aria-label="text button group"> 
                                    <Button startIcon={<AddCircleOutlineIcon />} onClick={addSortieIem}>Ajouter au liste</Button>                                                                      
                                                                               
                                    </ButtonGroup>
                                    </Grid>

                                  </Grid>
                                  </Box>
                                  </Grid>  
                                <Grid item xs={8}>  
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: 400, width: '100%' }}>
                                          <DataGrid
                                            components={{
                                              Toolbar: CustomToolbar,
                                            }}
                                              rows={dataSortie}
                                              columns={columnsSortie}
                                              pageSize={15}
                                              checkboxSelection = {false}
                                              loading={loading}
                                              disableMultipleSelection={true}
                                              onSelectionModelChange={(newSelectionModel) => {
                                                setSelectionModelItems(newSelectionModel);
                                              }}
                                              selectionModel={selectionModelItems}
                                              
                                          />
                                    </div>   
                                </Paper>


                                </Grid>
                            </Grid> 
                    </DialogContent>
                              <DialogActions>
                                <Button onClick={addBonSortieClose}>Anuller</Button>
                                <Button onClick={addBonSortieSave}>Sauvgarder</Button>
                              </DialogActions>   

                    
            </Dialog>

            <Dialog open={openUpdate} onClose={editBonSortieClose}  maxWidth="lg" fullWidth={true}>
                  <DialogTitle>Editer un bon d'arivage</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                          <TextField
                                                  error={bonNbrError[0]}
                                                  helperText={bonNbrError[1]}
                                                  value={bonNbr}
                                                  margin="dense"
                                                  id="bon_sortie_nbr"
                                                  label="Bon de sortie Nbr"
                                                  fullWidth
                                                  variant="standard"
                                                  type="number"
                                                  onChange={(event) => {setBonNbr(event.target.value)}}
                                          />

                                        </Grid>
                                        <Grid item xs={4}>
                                                <Autocomplete
                                                    disablePortal
                                                    value={fourn}
                                                    onChange={(event, newVlue) =>{
                                                        setFourn(newVlue);
                                                        
                                                    }}
                                                    options={allFourns}
                                                    renderInput={(params) => <TextField {...params} error={fournError[0]}
                                                    helperText={fournError[1]} fullWidth variant="standard" label="Destination" 
                                                    required/>}
                                                />  
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date"
                                                        inputFormat="DD/MM/YYYY"
                                                        value={date}
                                                        onChange={handleChangeDate}
                                                        renderInput={(params) => <TextField {...params} error={dateError[0]}
                                                        helperText={dateError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>
                                                 
                                        
                                        </Grid>
                        
                      </Grid>
                      <br></br> 

                    </DialogContent>
                              <DialogActions>
                                <Button onClick={editBonSortieClose}>Anuller</Button>
                                <Button onClick={editBonSortieSave}>Sauvgarder</Button>
                              </DialogActions>   

                    
            </Dialog>

            <Dialog open={openDelete}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={deleteBonSortieClose}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>{"Confirmer la suppression d'un bon de sortie"}</DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-slide-description">
                                      Êtes-vous sûr de la décision de supprimer le bon d'arivage?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={deleteBonSortieClose}>Anuller</Button>
                                      <Button onClick={deleteConfirmation}>Supprimer</Button>
                                    </DialogActions>
                      </Dialog>
            
          </Container>


            {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            {selectionError ? <Alt type='error' message='Selectioner un item' onClose={()=> setSelectionError(false)} /> : null}
            {sortieQntError ? <Alt type='error' message='la quantité remplie nest pas desponible' onClose={()=> setSortieQntError(false)} /> : null}
            {dataError ? <Alt type='error' message='La liste des items de bon de arivage est vide!!' onClose={()=> setDataError(false)} /> : null}
            {dateFilterNotErr ? <Alt type='error' message='La liste des items de bon de arivage est vide!!' onClose={()=> setDateFilterNotErr(false)} /> : null}
          
        </React.Fragment>



        );

  }