

from dataclasses import fields
from rest_framework import serializers
from .models import *





class MedicamentSerialize(serializers.ModelSerializer):

    class Meta:
        model = Medicament
        fields = ['id', 'medic_code', 'medic_name', 'medic_dose', 'dose_unit', 'medic_place', 'medic_type']

class ArticleSerialize(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ['id', 'article_code', 'article_name', 'article_type']

class MedicamentListSerialize(serializers.ModelSerializer):
    label = serializers.CharField(source='medic_name')
    class Meta:
        model = Medicament
        fields = ['id', 'label']


class ArticleListSerialize(serializers.ModelSerializer):
    label = serializers.CharField(source='medic_name')
    class Meta:
        model = Article
        fields = ['id', 'label']


class StockSerializer(serializers.ModelSerializer):
    medicament = MedicamentSerialize()
    class Meta:
        model = Stock
        fields = ['id', 'date_arrived', 'date_expired', 'stock_qte', 'medicament','lot_number', 'medic_lot_price']

class StockArrivageMedicSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source = 'arrivage') 
    class Meta:
        model = Stock
        fields = ['id', 'label']





class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ['id', 'name', 'service']

class SourceSelectSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source = 'desrination') 
    class Meta:
        model = Stock
        fields = ['id', 'label']


class SortieItemsSerializer(serializers.ModelSerializer):
    med_sortie = StockSerializer()
    class Meta:
        model = Sortie_items
        fields = ['id', 'sortie_qte', 'med_sortie']

class BonSortieCustomSerializer(serializers.ModelSerializer):
    source = SourceSerializer()
    class Meta:
        model = Bon_sortie
        fields = ['id', 'source', 'bon_sortie_nbr', 'date']

class SortieItemsCustomSerializer(serializers.ModelSerializer):
    med_sortie = StockSerializer()
    bon_sortie = BonSortieCustomSerializer()
    class Meta:
        model = Sortie_items
        fields = ['id', 'sortie_qte', 'med_sortie', 'bon_sortie']

class BonSortieSerializer(serializers.ModelSerializer):
    source = SourceSerializer()
    sortie_items_set = SortieItemsSerializer(many=True)
    class Meta:
        model = Bon_sortie
        fields = ['id', 'source', 'bon_sortie_nbr', 'date', 'sortie_items_set']

class BonSortieTestSerializer(serializers.ModelSerializer):
    source_set = SourceSerializer()
    sortie_items_set = SortieItemsSerializer(many=True)
    class Meta:
        model = Bon_sortie
        fields = ['id', 'source_set', 'bon_sortie_nbr', 'date', 'sortie_items_set']


class FournisseurSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fournisseur
        fields = ['id', 'name', 'address', 'email_adress', 'phone_nbr']


class FournSelectSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source = 'name') 
    class Meta:
        model = Fournisseur
        fields = ['id', 'label']


class CommandeItemsSerializer(serializers.ModelSerializer):
    medicament = MedicamentSerialize()
    class Meta:
        model = Sortie_items
        fields = ['id', 'commande_qte', 'medicament']


class BonCommandeSerializer(serializers.ModelSerializer):
    fournisseur = FournisseurSerializer()
    commande_items = CommandeItemsSerializer(many=True)
    class Meta:
        model = Bon_sortie
        fields = ['id', 'fournisseur', 'bon_commande_nbr', 'date', 'commande_items']


class ArivageItemsSerializer(serializers.ModelSerializer):
    medicament = StockSerializer()

    class Meta:
        model = Arivage_items
        fields = ['id', 'medicament', 'qnt']


class ArivageSerializer(serializers.ModelSerializer):
    arivage_items_set = ArivageItemsSerializer(many=True)
    fourn = FournisseurSerializer()
    
    class Meta:
        model = Arivage
        fields = ['id', 'bon_arrivage_nbr', 'date', 'fourn','arivage_items_set']






class ArivageCustomSerializer(serializers.ModelSerializer):
    fourn = FournisseurSerializer()
    class Meta:
        model = Arivage
        fields = ['id', 'fourn', 'bon_arrivage_nbr', 'date']

class ArivageItemsCustomSerializer(serializers.ModelSerializer):
    med_entree = StockSerializer()
    bon_arrivage = ArivageCustomSerializer()
    class Meta:
        model = Arivage_items
        fields = ['id', 'qnt', 'med_entree', 'bon_arrivage']

class QntConvSerializer(serializers.ModelSerializer):
    article = ArticleSerialize()
    class Meta:
        model = QntConv
        fields = ['id', 'article', 'year', 'qntMax', 'qntMin','prixUnit','tva']


class ConsomationSerializer(serializers.ModelSerializer):
    qnt_conv = QntConvSerializer()
    class Meta:
        model = Consomation
        fields = ['id', 'qnt_conv', 'month', 'year', 'cons']


class ConsomationUltraSerializer(serializers.ModelSerializer):
    qnt_conv = QntConvSerializer()
    cons_cumul = serializers.SerializerMethodField()
    rest_max = serializers.SerializerMethodField()
    rest_min = serializers.SerializerMethodField()

    def get_cons_cumul(self, obj):
        cons = 0
        this_year = obj.year
        this_month = obj.month
        consomation_old = Consomation.objects.filter(year = this_year, month__lte = this_month, qnt_conv = obj.qnt_conv)
        for i in consomation_old:
            cons = cons + i.cons
        return cons

    def get_rest_min(self, obj):
        cons = 0
        this_year = obj.year
        this_month = obj.month
        consomation_old = Consomation.objects.filter(year = this_year, month__lte = this_month, qnt_conv = obj.qnt_conv)
        for i in consomation_old:
            cons = cons + i.cons
        
        rest = obj.qnt_conv.qntMin - cons
        return rest
    
    def get_rest_max(self, obj):
        cons = 0
        this_year = obj.year
        this_month = obj.month
        consomation_old = Consomation.objects.filter(year = this_year, month__lte = this_month, qnt_conv = obj.qnt_conv)
        for i in consomation_old:
            cons = cons + i.cons
        
        rest = obj.qnt_conv.qntMax - cons
        return rest
    
    class Meta:
        model = Consomation
        fields = ['id', 'qnt_conv', 'month', 'year', 'cons','cons_cumul','rest_max','rest_min']




class ServiceSerialize(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = ['id', 'name']

class ServiceListSerialize(serializers.ModelSerializer):
    label = serializers.CharField(source='name')
    class Meta:
        model = Service
        fields = ['id', 'label']


class RepasSerializer(serializers.ModelSerializer):
    service = ServiceSerialize()
    class Meta:
        model = Repas
        fields = ['id', 'service', 'month', 'year','repas_malade','repas_pers','repas_autre']








