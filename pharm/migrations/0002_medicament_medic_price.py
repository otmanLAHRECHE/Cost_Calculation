# Generated by Django 4.1 on 2025-03-03 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pharm', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='medicament',
            name='medic_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20),
            preserve_default=False,
        ),
    ]
