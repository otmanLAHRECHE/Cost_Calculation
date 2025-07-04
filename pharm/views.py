import datetime
from os import stat
from wsgiref.util import request_uri
from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from calendar import monthrange
from dateutil.relativedelta import relativedelta

# Create your views here.






@api_view(['GET'])
def getAllSources(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Source.objects.all()
        print(queryset)

        source_serial = SourceSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  

@api_view(['GET'])
def getAllDestinations(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Source.objects.all()

        source_serial = SourceSelectSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)    


@api_view(['GET'])
def getSelectedSources(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Source.objects.get(id = id)

        source_serial = SourceSerializer(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)    


@api_view(['POST'])
def createNewSource(request):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop('name')
        service = request.data.pop('service')

        source = Source.objects.create(name=name, service=service)

        if source.id is not None:
            return Response(status=status.HTTP_201_CREATED, data = {"status":"source created"})
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateSource(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop("name")
        service = request.data.pop("service")
        source_to_update = Source.objects.get(id=id)
        if not source_to_update.name == name:
            source_to_update.name = name
        if not source_to_update.service == service:
            source_to_update.service = service
        
        source_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"source updated"})


@api_view(['DELETE'])
def deleteSource(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Source.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"source deleted"})


@api_view(['GET'])
def getAllMedicaments(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Medicament.objects.all()

        source_serial = MedicamentSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def getAllMedicamentsNames(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Medicament.objects.all()

        source_serial = MedicamentListSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)     

@api_view(['GET'])
def getSelectedMedicament(request, id):
    if request.method == 'GET' and request.user.is_authenticated:

        queryset = Medicament.objects.get(id=id)

        source_serial = MedicamentSerialize(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   

@api_view(['POST'])
def addMedicament(request):
    if request.method == 'POST' and request.user.is_authenticated:
        medic_code = request.data.pop("medic_code")
        medic_name = request.data.pop("medic_name")
        medic_dose = request.data.pop("medic_dose")
        medic_place = request.data.pop("medic_place")
        medic_type = request.data.pop("medic_type")

        medicament = Medicament.objects.create(medic_code=medic_code, medic_name=medic_name, medic_dose=medic_dose, medic_place=medic_place, medic_type=medic_type)

        if medicament.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "medicament created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateMedicament(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        medic_code = request.data.pop("medic_code")
        medic_name = request.data.pop("medic_name")
        medic_dose = request.data.pop("medic_dose")
        medic_place = request.data.pop("medic_place")
        medic_type = request.data.pop("medic_type")

        medicament_to_update = Medicament.objects.get(id=id)
        if not medicament_to_update.medic_code == medic_code:
            medicament_to_update.medic_code = medic_code
        if not medicament_to_update.medic_name == medic_name:
            medicament_to_update.medic_name = medic_name
        if not medicament_to_update.medic_dose == medic_dose:
            medicament_to_update.medic_dose = medic_dose
        if not medicament_to_update.medic_place == medic_place:
            medicament_to_update.medic_place = medic_place
        if not medicament_to_update.medic_type == medic_type:
            medicament_to_update.medic_type = medic_type
        
        medicament_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"medicament updated"})


@api_view(['DELETE'])
def deleteMedicament(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Medicament.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Medicament deleted"})




@api_view(['GET'])
def getAllStocks(request):
    if request.method == 'GET' and request.user.is_authenticated:

        
        date_now = datetime.datetime.now().date()

        queryset = Stock.objects.filter(date_expired__gte=date_now)


        source_serial = StockSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   

@api_view(['GET'])
def getSelectedStock(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Stock.objects.get(id= id)

        source_serial = StockSerializer(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   

@api_view(['POST'])
def addStock(request):
    if request.method == 'POST' and request.user.is_authenticated:

        id_medic = request.data.pop("id_medic")
        medicament = Medicament.objects.get(id=id_medic)
        date_a = request.data.pop("date_arrived")
        date_b = request.data.pop("date_expired")
        date_arrived = date_a.split("/")
        date_expired = date_b.split("/")

        lot_number = request.data.pop("lot_number")
        medic_lot_price = request.data.pop("medic_lot_price")

        print(date_arrived)
        print(date_expired)

        d_arr = date_arrived[0]
        m_arr = date_arrived[1]

        d_exp = date_expired[0]
        m_exp = date_expired[1]

        if d_arr[0] == '0':
            d_arr.replace('0','',1)
        if m_arr[0] == '0':
            m_arr.replace('0','',1)
        if d_exp[0] == '0':
            d_exp.replace('0','',1)
        if m_exp[0] == '0':
            m_exp.replace('0','',1)

        date_arrived[0] = d_arr
        date_arrived[1] = m_arr
        date_expired[0] = d_exp
        date_expired[1] = m_exp

        print(date_arrived)
        print(date_expired)
        stock_qte = request.data.pop("stock_qte")
        
        date_arrived = datetime.date(int(date_arrived[2]), int(date_arrived[1]), int(date_arrived[0]))
        date_expired = datetime.date(int(date_expired[2]), int(date_expired[1]), int(date_expired[0]))

        print(date_arrived)
        print(date_expired)

        if date_arrived >= date_expired:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"error": "date arrive grateer than date expired"})
        else:    
            stock = Stock.objects.create(medicament=medicament, date_arrived=date_arrived, date_expired=date_expired, stock_qte=stock_qte, lot_number=lot_number, medic_lot_price=medic_lot_price)

                
            if stock.id is not None:
                return Response(status=status.HTTP_201_CREATED, data={"status": "stock created sucsusfully for medicament :" + medicament.medic_name}) 
                
            else:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def addStockToArivage(request):
    if request.method == 'POST' and request.user.is_authenticated:

        id_stock = request.data.pop("id_stock")
        stock_qte_new = int(request.data.pop("stock_qte"))

        stock = Stock.objects.get(id=id_stock)

        stock_qte_old = int(stock.stock_qte)

        stock.stock_qte = stock_qte_old + stock_qte_new

        stock.save()

      
        return Response(status=status.HTTP_201_CREATED, data={"status": "stock added"}) 
         

@api_view(['POST'])
def updateStock(request, id):
    if request.method == 'POST' and request.user.is_authenticated:

        date_a = request.data.pop("date_arrived")
        date_b = request.data.pop("date_expired")
        stock_qte = request.data.pop("stock_qte")

        
        date_arrived = date_a.split("/")
        date_expired = date_b.split("/")

        lot_number = request.data.pop("lot_number")
        medic_lot_price = request.data.pop("medic_lot_price")

        date_arrived = datetime.date(int(date_arrived[2]), int(date_arrived[1]), int(date_arrived[0]))
        date_expired = datetime.date(int(date_expired[2]), int(date_expired[1]), int(date_expired[0]))

        if date_arrived >= date_expired : 
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"error":"medicment arrived date is grater than expired date"})
        else:

            stock_to_update = Stock.objects.get(id=id)
            if not stock_to_update.date_arrived == date_arrived:
                stock_to_update.date_arrived = date_arrived
            if not stock_to_update.date_expired == date_expired:
                stock_to_update.date_expired = date_expired
            if not stock_to_update.stock_qte == stock_qte:
                stock_to_update.stock_qte = stock_qte
            if not stock_to_update.lot_number == lot_number:
                stock_to_update.lot_number = lot_number
            if not stock_to_update.medic_lot_price == medic_lot_price:
                stock_to_update.medic_lot_price = medic_lot_price
            
            
            stock_to_update.save()
            
            return Response(status=status.HTTP_200_OK, data = {"status":"stock updated sucsusfully"})



@api_view(['DELETE'])
def deleteStock(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Stock.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Stock deleted"})




@api_view(['GET'])
def getAllBonSorties(request, month, year):
    if request.method == 'GET' and request.user.is_authenticated:

        range = monthrange(year, month)

        date_start = datetime.date(year , month, 1)
        date_end = datetime.date( year, month, range[1])

        queryset = Bon_sortie.objects.filter(date__gte=date_start, date__lte=date_end)

        source_serial = BonSortieSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  

@api_view(['GET'])
def getSelectedBonSortie(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Bon_sortie.objects.get(id= id)

        source_serial = BonSortieSerializer(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   


@api_view(['GET'])
def checkBonSortieId(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        count = Bon_sortie.objects.filter(id= id).count()

        p = False

        if count>0:
            p = True


        return Response(status=status.HTTP_200_OK,data={"st":p})
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 


@api_view(['POST'])
def addBonSortie(request):
    if request.method == 'POST' and request.user.is_authenticated:

        bon_sortie_nbr = request.data.pop("bon_sortie_nbr")
        id_source = request.data.pop("id")
        date = request.data.pop("date")
        date = date.split("/")
        date = datetime.date(int(date[2]), int(date[1]), int(date[0]))
        source = Source.objects.get(id=id_source)

        bon_sortie = Bon_sortie.objects.create(bon_sortie_nbr=bon_sortie_nbr, source=source, date=date)

        if bon_sortie.id is not None:

            return Response(status=status.HTTP_201_CREATED, data={"id_bon_sortie": bon_sortie.id}) 
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateBonSortie(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        
        bon_sortie_nbr = request.data.pop("bon_sortie_nbr")
        date = request.data.pop("date")
        id_source = request.data.pop("id")

        source = Source.objects.get(id= id_source)

        date = date.split("/")
        date = datetime.date(int(date[2]), int(date[1]), int(date[0]))

        bon_sortie_to_to_update = Bon_sortie.objects.get(id=id)

        if not bon_sortie_to_to_update.bon_sortie_nbr == bon_sortie_nbr:
            bon_sortie_to_to_update.bon_sortie_nbr = bon_sortie_nbr
        if not bon_sortie_to_to_update.date == date:
            bon_sortie_to_to_update.date = date
        if not bon_sortie_to_to_update.source == source:
            bon_sortie_to_to_update.source = source
        
        bon_sortie_to_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"bon sortie updated"})


@api_view(['DELETE'])
def deleteBonSortie(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Bon_sortie.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Bon sortie deleted"})

@api_view(['GET'])
def getSelectedBonSortieItem(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Sortie_items.objects.get(id= id)

        source_serial = SortieItemsSerializer(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   


@api_view(['GET'])
def getAllBonSortieItems(request, month, year):
    if request.method == 'GET' and request.user.is_authenticated:

        range = monthrange(year, month)

        date_start = datetime.date(year , month, 1)
        date_end = datetime.date( year, month, range[1])
        
        bon_sortie = Bon_sortie.objects.filter(date__gte=date_start, date__lte=date_end)
        queryset = Sortie_items.objects.filter(bon_sortie__in=bon_sortie)

        source_serial = SortieItemsCustomSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  


@api_view(['GET'])
def getFirstBonSortieItems(request):
    if request.method == 'GET' and request.user.is_authenticated:

        
        bon_sortie = Bon_sortie.objects.all().order_by('-date')[:10]
        queryset = Sortie_items.objects.filter(bon_sortie__in=bon_sortie)

        source_serial = SortieItemsCustomSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  


@api_view(['POST'])
def addBonSortieItem(request):
    if request.method == 'POST' and request.user.is_authenticated:

        id_bon_sortie = request.data.pop("id_bon_sortie")
        id_stock_med = request.data.pop("id_stock_med")
        sortie_qte = request.data.pop("sortie_qte")

        print(id_bon_sortie)

        bon_sortie = Bon_sortie.objects.get(id=id_bon_sortie)
        med_sortie = Stock.objects.get(id=id_stock_med)

        ps = False

        if med_sortie.stock_qte >= int(sortie_qte) :
            bon_sortie_item = Sortie_items.objects.create(bon_sortie=bon_sortie, med_sortie=med_sortie, sortie_qte=sortie_qte)
            ps = True

        if bon_sortie_item.id is not None and ps == True:
            med_sortie.stock_qte = med_sortie.stock_qte - int(sortie_qte)
            med_sortie.save()
            return Response(status=status.HTTP_201_CREATED, data={"status": "Bon sortie item created sucsusfully for bon sortie of nbr:"+ str(bon_sortie.bon_sortie_nbr)}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateBonSortieItem(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        

        bon_sortie_item_to_update = Sortie_items.objects.get(id=id)

        sortie_qte = request.data.pop("sortie_qte")

        old_value = bon_sortie_item_to_update.sortie_qte


        

        if not bon_sortie_item_to_update.sortie_qte == sortie_qte:
            if old_value < int(sortie_qte):
                new_value = int(sortie_qte) - old_value
                med_stock = Stock.objects.get(id= bon_sortie_item_to_update.med_sortie.id)
                med_stock.stock_qte = med_stock.stock_qte - new_value
            elif old_value > int(sortie_qte):
                new_value = old_value - int(sortie_qte)
                med_stock = Stock.objects.get(id= bon_sortie_item_to_update.med_sortie.id)
                med_stock.stock_qte = med_stock.stock_qte + new_value


            bon_sortie_item_to_update.sortie_qte = sortie_qte
            med_stock.save()
        
        bon_sortie_item_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"bon sortie item updated"})


@api_view(['DELETE'])
def deleteBonSortieItem(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Sortie_items.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Bon sortie item deleted"})


@api_view(['GET'])
def getAllFournisseurs(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Fournisseur.objects.all()

        source_serial = FournisseurSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)    

 
@api_view(['GET'])
def getSelectedFournisseur(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Fournisseur.objects.get(id = id)

        source_serial = FournisseurSerializer(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)    


@api_view(['POST'])
def createNewFournisseur(request):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop('name')
        address = request.data.pop('address')
        email_adress = request.data.pop('email_adress')
        phone_nbr = request.data.pop('phone_nbr')

        fournisseur = Fournisseur.objects.create(name=name, address=address, email_adress=email_adress, phone_nbr=phone_nbr)

        if fournisseur.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Fournisseur item created sucsusfully"})
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateFournisseur(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop('name')
        address = request.data.pop('address')
        email_adress = request.data.pop('email_adress')
        phone_nbr = request.data.pop('phone_nbr')

        fournisseur_to_update = Fournisseur.objects.get(id=id)
        if not fournisseur_to_update.name == name:
            fournisseur_to_update.name = name
        if not fournisseur_to_update.address == address:
            fournisseur_to_update.address = address
        if not fournisseur_to_update.email_adress == email_adress:
            fournisseur_to_update.email_adress = email_adress
        if not fournisseur_to_update.phone_nbr == phone_nbr:
            fournisseur_to_update.phone_nbr = phone_nbr
        
        fournisseur_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"Fournisseur updated"})


@api_view(['DELETE'])
def deleteFournisseur(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Fournisseur.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Fournisseur deleted"})



@api_view(['GET'])
def getAllStocksExpired(request):
    if request.method == 'GET' and request.user.is_authenticated:

        date_now = datetime.datetime.now().date()

        date_next = date_now + relativedelta(months=6)

        queryset = Stock.objects.filter(date_expired__lte=date_next).order_by('-date_expired')

        source_serial = StockSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                 
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  


@api_view(['GET'])
def getAllStocksExpiredAlredy(request):
    if request.method == 'GET' and request.user.is_authenticated:

        date_now = datetime.datetime.now().date()


        queryset = Stock.objects.filter(date_expired__lte=date_now).order_by('-date_expired')[:10]

        source_serial = StockSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                 
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  


@api_view(['GET'])
def getAllStocksExpiredNotYet(request):
    if request.method == 'GET' and request.user.is_authenticated:

        date_now = datetime.datetime.now().date()

        date_next = date_now + relativedelta(months=6)

        queryset = Stock.objects.filter(date_expired__lte=date_next, date_expired__gte=date_now).order_by('-date_expired')[:10]

        source_serial = StockSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                 
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  
















@api_view(['GET'])
def getAllBonCommande(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Bon_commande.objects.all()

        source_serial = BonCommandeSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  

@api_view(['POST'])
def addBonCommande(request):
    if request.method == 'POST' and request.user.is_authenticated:

        bon_commande_nbr = request.data.pop("bon_commande_nbr")
        id_fournisseur = request.data.pop("id")
        date = request.data.pop("date")
        date = date.split("/")
        date = datetime.date(int(date[0], int(date[1])), int(date[2]))
        fournisseur = Fournisseur.objects.get(id=id_fournisseur)

        bon_commande = Bon_commande.objects.create(bon_commande_nbr=bon_commande_nbr, fournisseur=fournisseur, date=date)

        if bon_commande.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Bon commande created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateBonCommande(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        bon_commande_nbr = request.data.pop("bon_commande_nbr")
        id = request.data.pop("id")
        date = request.data.pop("date")

        date = date.split("/")
        date = datetime.date(int(date[0], int(date[1])), int(date[2]))

        bon_commande_to_to_update = Bon_commande.objects.get(id=id)

        if not bon_commande_to_to_update.bon_commande_nbr == bon_commande_nbr:
            bon_commande_to_to_update.bon_commande_nbr = bon_commande_nbr
        if not bon_commande_to_to_update.date == date:
            bon_commande_to_to_update.date = date
        
        bon_commande_to_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"bon commande updated"})


@api_view(['DELETE'])
def deleteBonCommande(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Bon_commande.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Bon commande deleted"})


@api_view(['POST'])
def addBonCommandeItem(request):
    if request.method == 'POST' and request.user.is_authenticated:

        id_bon_commande = request.data.pop("id_bon_commande")
        id_med = request.data.pop("id_med")
        commande_qte = request.data.pop("commande_qte")

        bon_commande = Bon_commande.objects.get(id=id_bon_commande)
        medicament = Medicament.objects.get(id=id_med)
        
        bon_commande_item = Commande_items.objects.create(bon_commande=bon_commande, medicament=medicament, commande_qte=commande_qte)

        if bon_commande_item.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Bon commande item created sucsusfully for bon commande of nbr:"+ bon_commande.bon_commande_nbr}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateBonCommandeItem(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        id = request.data.pop("id")

        bon_commande_item_to_update = Commande_items(id=id)

        commande_qte = request.data.pop("commande_qte")

        if not bon_commande_item_to_update.commande_qte == commande_qte:
            bon_commande_item_to_update.commande_qte = commande_qte
        
        bon_commande_item_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"bon commande item updated"})


@api_view(['DELETE'])
def deleteBonCommandeItem(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Commande_items.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Bon commande item deleted"})



@api_view(['GET'])
def getAllArivage(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Arivage.objects.all()

        arivage_serializer = ArivageSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=arivage_serializer.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 



@api_view(['POST'])
def addArivage(request):
    if request.method == 'POST' and request.user.is_authenticated:

        source_detail = request.data.pop("source_detail")
        date = request.data.pop("date")
        date = date.split("/")
        date = datetime.date(int(date[0], int(date[1])), int(date[2]))

        arivage = Arivage.objects.create(source_detail=source_detail, date=date)

        if arivage.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Arivage created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateArivage(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        source_detail = request.data.pop("source_detail")
        date = request.data.pop("date")

        date = date.split("/")
        date = datetime.date(int(date[0], int(date[1])), int(date[2]))

        arivage_to_to_update = Arivage.objects.get(id=id)

        if not arivage_to_to_update.source_detail == source_detail:
            arivage_to_to_update.source_detail = source_detail
        if not arivage_to_to_update.date == date:
            arivage_to_to_update.date = date
        
        arivage_to_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"Arivage updated"})


@api_view(['DELETE'])
def deleteArivage(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Arivage.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Arivage deleted"})


@api_view(['POST'])
def addArivageItem(request):
    if request.method == 'POST' and request.user.is_authenticated:

        id_arivage = request.data.pop("id_arivage")
        id_medicament = request.data.pop("id_medicament")
        date = request.data.pop("date_expired")
        qnt = request.data.pop("qnt")

        date = date.split("/")
        date_expired = datetime.date(int(date[0], int(date[1])), int(date[2]))

        arivage = Arivage.objects.get(id=id_arivage)
        medicament = Medicament.objects.get(id=id_medicament)

        arivage_item = Arivage_items.objects.create(arivage=arivage, medicament=medicament, date_expired=date_expired, qnt=qnt)

        if arivage_item.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "Arivage item created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateArivageItem(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        id = request.data.pop("id")
        date = request.data.pop("date_expired")
        qnt = request.data.pop("qnt")

        date = date.split("/")
        date_expired = datetime.date(int(date[0], int(date[1])), int(date[2]))


        Arivage_item_to_to_update = Arivage_items.objects.get(id=id)

        if not Arivage_item_to_to_update.qnt == qnt:
            Arivage_item_to_to_update.qnt = qnt
        if not Arivage_item_to_to_update.date_expired == date_expired:
            Arivage_item_to_to_update.date_expired = date_expired
        
        Arivage_item_to_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"Arivage item updated"})


@api_view(['DELETE'])
def deleteArivageItem(request):
    if request.method == 'DELETE' and request.user.is_authenticated:
        id = request.data.pop("id")
        Arivage_items.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Arivage item deleted"})



@api_view(['GET'])
def getAllArivageOfMedic(request, id):
    if request.method == 'GET' and request.user.is_authenticated:

        medic = Medicament.objects.get(id = id)
        queryset = Stock.objects.filter(medicament = medic)
        

        arivage_serializer = StockArrivageMedicSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=arivage_serializer.data)
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 




@api_view(['GET'])
def getCostByService(request, month, year):
    if request.method == 'GET' and request.user.is_authenticated:

        range = monthrange(year, month)

        date_start = datetime.date(year , month, 1)
        date_end = datetime.date( year, month, range[1])
        services = Source.objects.all()
        cost = []
        total_month = 0.00
        id_inc = 0
        for s in services:
            total = 0.00
            ser = Source.objects.get(id=s.id)
            bon_sortie = Bon_sortie.objects.filter(date__gte=date_start, date__lte=date_end, source=ser)
            queryset = Sortie_items.objects.filter(bon_sortie__in=bon_sortie)
            for i in queryset:
                total = total + float(str(i))
            total = round(total,3)
            cost.append({"id":id_inc,"service":s.name + " " +s.service,"value":total})
            total_month = total_month + total
            id_inc = id_inc + 1
        
        total_month = round(total_month,3)
        cost.append({"id":id_inc,"service":"total du mois","value":total_month})

        return Response(status=status.HTTP_200_OK,data=cost)
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  












@api_view(['GET'])
def getAllBonArrivage(request, month, year):
    if request.method == 'GET' and request.user.is_authenticated:

        range = monthrange(year, month)

        date_start = datetime.date(year , month, 1)
        date_end = datetime.date( year, month, range[1])

        queryset = Arivage.objects.filter(date__gte=date_start, date__lte=date_end)

        source_serial = ArivageSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  

@api_view(['GET'])
def getSelectedBonArrivage(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Arivage.objects.get(id= id)

        source_serial = ArivageSerializer(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   


@api_view(['GET'])
def checkBonArrivageId(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        count = Arivage.objects.filter(id= id).count()

        p = False

        if count>0:
            p = True


        return Response(status=status.HTTP_200_OK,data={"st":p})
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 


@api_view(['POST'])
def addBonArrivage(request):
    if request.method == 'POST' and request.user.is_authenticated:

        bon_arrivage_nbr = request.data.pop("bon_arrivage_nbr")
        id_fourn = request.data.pop("id")
        date = request.data.pop("date")
        date = date.split("/")
        date = datetime.date(int(date[2]), int(date[1]), int(date[0]))
        fourn = Fournisseur.objects.get(id=id_fourn)

        bon_arrivage = Arivage.objects.create(bon_arrivage_nbr=bon_arrivage_nbr, fourn=fourn, date=date)

        if bon_arrivage.id is not None:

            return Response(status=status.HTTP_201_CREATED, data={"id_bon_arrivage": bon_arrivage.id}) 
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateBonArrivage(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        
        bon_arrivage_nbr = request.data.pop("bon_arrivage_nbr")
        date = request.data.pop("date")
        id_fourn = request.data.pop("id")

        fourn = Fournisseur.objects.get(id= id_fourn)

        date = date.split("/")
        date = datetime.date(int(date[2]), int(date[1]), int(date[0]))

        bon_arrivage_to_to_update = Arivage.objects.get(id=id)

        if not bon_arrivage_to_to_update.bon_arrivage_nbr == bon_arrivage_nbr:
            bon_arrivage_to_to_update.bon_arrivage_nbr = bon_arrivage_nbr
        if not bon_arrivage_to_to_update.date == date:
            bon_arrivage_to_to_update.date = date
        if not bon_arrivage_to_to_update.fourn == fourn:
            bon_arrivage_to_to_update.fourn = fourn
        
        bon_arrivage_to_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"bon arivage updated"})


@api_view(['DELETE'])
def deleteBonArrivage(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Arivage.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Bon arivage deleted"})

@api_view(['GET'])
def getSelectedBonArrivageItem(request, id):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Arivage_items.objects.get(id= id)

        source_serial = ArivageItemsSerializer(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   


@api_view(['GET'])
def getAllBonArrivageItems(request, month, year):
    if request.method == 'GET' and request.user.is_authenticated:

        range = monthrange(year, month)

        date_start = datetime.date(year , month, 1)
        date_end = datetime.date( year, month, range[1])
        
        bon_arivage = Arivage.objects.filter(date__gte=date_start, date__lte=date_end)
        queryset = Arivage_items.objects.filter(arivage__in=bon_arivage)

        source_serial = ArivageItemsCustomSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  



@api_view(['POST'])
def addBonArrivageItem(request):
    if request.method == 'POST' and request.user.is_authenticated:

        print("add bon arivage item")
        id_bon_arrivage = request.data.pop("id_bon_arrivage")
        id_stock_med = request.data.pop("id_stock")
        qnt = request.data.pop("stock_qte")

        print(id_bon_arrivage)

        bon_arrivage = Arivage.objects.get(id=id_bon_arrivage)
        med_sortie = Stock.objects.get(id=id_stock_med)

        bon_sortie_item = Arivage_items.objects.create(arivage=bon_arrivage, medicament=med_sortie, qnt=qnt)
        

        if bon_sortie_item.id :
            med_sortie.stock_qte = med_sortie.stock_qte + int(qnt)
            med_sortie.save()
            return Response(status=status.HTTP_201_CREATED, data={"status": "Bon arivage item created sucsusfully for bon arivage of nbr:"+ str(bon_arrivage.bon_arrivage_nbr)}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def addBonArrivageItemCustom(request):
    if request.method == 'POST' and request.user.is_authenticated:

        print("add bon arivage item custom")

        id_bon_arrivage = request.data.pop("id_bon_arrivage")
        stock_qte = request.data.pop("stock_qte")
        id_medic = request.data.pop("id_medic")
        lot_number = request.data.pop("lot_number")
        medic_lot_price = request.data.pop("medic_lot_price")

        print(id_bon_arrivage)
        medicament = Medicament.objects.get(id=id_medic)
        date_a = request.data.pop("date_arrived")
        date_b = request.data.pop("date_expired")
        date_arrived = date_a.split("/")
        date_expired = date_b.split("/")

        medic_lot_price = 0


        d_arr = date_arrived[0]
        m_arr = date_arrived[1]

        d_exp = date_expired[0]
        m_exp = date_expired[1]

        if d_arr[0] == '0':
            d_arr.replace('0','',1)
        if m_arr[0] == '0':
            m_arr.replace('0','',1)
        if d_exp[0] == '0':
            d_exp.replace('0','',1)
        if m_exp[0] == '0':
            m_exp.replace('0','',1)

        date_arrived[0] = d_arr
        date_arrived[1] = m_arr
        date_expired[0] = d_exp
        date_expired[1] = m_exp

        
        date_arrived = datetime.date(int(date_arrived[2]), int(date_arrived[1]), int(date_arrived[0]))
        date_expired = datetime.date(int(date_expired[2]), int(date_expired[1]), int(date_expired[0]))


        if date_arrived >= date_expired:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"error": "date arrive grateer than date expired"})
        else:    
            stock = Stock.objects.create(medicament=medicament, date_arrived=date_arrived, date_expired=date_expired, stock_qte=stock_qte, lot_number=lot_number, medic_lot_price=medic_lot_price)
            bon_arrivage = Arivage.objects.get(id=id_bon_arrivage)

            

            
            bon_sortie_item = Arivage_items.objects.create(arivage=bon_arrivage, medicament=stock, qnt=stock_qte)
            

            if bon_sortie_item.id :
                return Response(status=status.HTTP_201_CREATED, data={"status": "Bon arivage item created sucsusfully for bon arivage of nbr:"+ str(bon_arrivage.bon_arrivage_nbr)}) 
            
            else:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateBonArrivageItem(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        

        bon_arrivage_item_to_update = Arivage_items.objects.get(id=id)

        qnt = request.data.pop("qnt")

        old_value = bon_arrivage_item_to_update.qnt


        

        if not bon_arrivage_item_to_update.qnt == qnt:
            if old_value < int(qnt):
                new_value = int(qnt) - old_value
                med_stock = Stock.objects.get(id= bon_arrivage_item_to_update.medicament.id)
                med_stock.stock_qte = med_stock.stock_qte + new_value
            elif old_value > int(qnt):
                new_value = old_value - int(qnt)
                med_stock = Stock.objects.get(id= bon_arrivage_item_to_update.medicament.id)
                med_stock.stock_qte = med_stock.stock_qte - new_value


            bon_arrivage_item_to_update.qnt = qnt
            med_stock.save()
        
        bon_arrivage_item_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"bon arivage item updated"})


@api_view(['DELETE'])
def deleteBonArrivageItem(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Arivage_items.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Bon arivage item deleted"})






@api_view(['GET'])
def getAllFournForSelection(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Fournisseur.objects.all()

        source_serial = FournSelectSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)    
    






@api_view(['GET'])
def getAllArticles(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Article.objects.all()

        source_serial = ArticleSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def getAllArticlesNames(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Article.objects.all()

        source_serial = ArticleListSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)     

@api_view(['GET'])
def getSelectedArticle(request, id):
    if request.method == 'GET' and request.user.is_authenticated:

        queryset = Article.objects.get(id=id)

        source_serial = ArticleSerialize(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   

@api_view(['POST'])
def addArticle(request):
    if request.method == 'POST' and request.user.is_authenticated:
        article_code = request.data.pop("article_code")
        article_name = request.data.pop("article_name")
        article_type = request.data.pop("article_type")

        article = Article.objects.create(article_code=article_code, article_name=article_name, article_type=article_type)

        if article.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "article created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateArticle(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        article_code = request.data.pop("article_code")
        article_name = request.data.pop("article_name")
        article_type = request.data.pop("article_type")

        article_to_update = Article.objects.get(id=id)
        if not article_to_update.article_code == article_code:
            article_to_update.article_code = article_code
        if not article_to_update.article_name == article_name:
            article_to_update.article_name = article_name
        if not article_to_update.article_type == article_type:
            article_to_update.article_type = article_type
        
        article_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"article updated"})


@api_view(['DELETE'])
def deleteArticle(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Article.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Article deleted"})


@api_view(['POST'])
def generateQntConvByYear(request, year):
    if request.method == 'POST' and request.user.is_authenticated:
        
        queryset = Article.objects.all()
        print(year)
        print(queryset)
        for article in queryset:
            a= Article.objects.get(id=article.id)
            print(a.article_name)
            art = QntConv.objects.create(article=a, year=year, qntMax=0.0, qntMin=0.0, prixUnit=0.0, tva=0)
        return Response(status=status.HTTP_201_CREATED, data={"status": "state generated sucsusfully"}) 
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  
    


@api_view(['GET'])
def getAllQntConvByYear(request, year):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = QntConv.objects.filter(year=year)

        qnt_conv_serial = QntConvSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=qnt_conv_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)     



@api_view(['DELETE'])
def deleteQntConvByYear(request, year):
    if request.method == 'DELETE' and request.user.is_authenticated:
        QntConv.objects.filter(year=year).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"State deleted"})
    



@api_view(['POST'])
def saveStateQntConv(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        id = request.data.pop("id")
        prixUnit = request.data.pop("prixUnit")
        qntMax = request.data.pop("qntMax")
        qntMin = request.data.pop("qntMin")
        tva = request.data.pop("tva")
        year = request.data.pop("year")


        qnt_to_update = QntConv.objects.get(id=id)
        if not qnt_to_update.prixUnit == prixUnit:
            qnt_to_update.prixUnit = prixUnit
        if not qnt_to_update.qntMax == qntMax:
            qnt_to_update.qntMax = qntMax
        if not qnt_to_update.qntMin == qntMin:
            qnt_to_update.qntMin = qntMin
        if not qnt_to_update.tva == tva:
            qnt_to_update.tva = tva
        if not qnt_to_update.year == year:
            qnt_to_update.year = year
        
        qnt_to_update.save()

        return Response(status=status.HTTP_201_CREATED, data={"status": "state saved sucsusfully"}) 
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  
    



@api_view(['GET'])
def getAllConsomationByYearByMonth(request, month, year):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Consomation.objects.filter(year=year , month = month)
        
        qnt_conv_serial = ConsomationUltraSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=qnt_conv_serial.data)
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)     



@api_view(['DELETE'])
def deleteConsomationByYearByMonth(request, month, year):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Consomation.objects.filter(year=year, month=month).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Consomation State deleted"})
    


@api_view(['POST'])
def generateConsomationByYearByMonth(request, month, year):
    if request.method == 'POST' and request.user.is_authenticated:
        
        queryset = QntConv.objects.filter(year = year)
        print(year)
        for qnt in queryset:
            a= QntConv.objects.get(id=qnt.id)
            consom = Consomation.objects.create(qnt_conv=a, year=year, month = month, cons = 0.00)
        return Response(status=status.HTTP_201_CREATED, data={"status": "state generated sucsusfully"}) 
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  
 



@api_view(['POST'])
def saveStateConsomation(request):
    if request.method == 'POST' and request.user.is_authenticated:
        
        id = request.data.pop("id")
        cons = request.data.pop("cons")


        qnt_to_update = Consomation.objects.get(id=id)
        if not qnt_to_update.cons == cons:
            qnt_to_update.cons = cons
        
        qnt_to_update.save()

        return Response(status=status.HTTP_201_CREATED, data={"status": "state saved sucsusfully"}) 
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  
    








@api_view(['GET'])
def getAllServices(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Service.objects.all()

        source_serial = ServiceSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def getAllServicesNames(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Service.objects.all()

        source_serial = ServiceListSerialize(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)     

@api_view(['GET'])
def getSelectedService(request, id):
    if request.method == 'GET' and request.user.is_authenticated:

        queryset = Service.objects.get(id=id)

        source_serial = ServiceSerialize(queryset)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)   

@api_view(['POST'])
def addService(request):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop("name")

        service = Service.objects.create(name=name)

        if service.id is not None:
            return Response(status=status.HTTP_201_CREATED, data={"status": "service created sucsusfully"}) 
        
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def updateService(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        name = request.data.pop("name")

        article_to_update = Service.objects.get(id=id)
        if not article_to_update.name == name:
            article_to_update.name = name
        
        article_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"service updated"})


@api_view(['DELETE'])
def deleteService(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Service.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"Service deleted"})