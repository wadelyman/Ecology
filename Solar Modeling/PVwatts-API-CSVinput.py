import argparse
import csv
import sys
import requests
# enter all parameters

symbol = "PVwatts"
url = 'https://developer.nrel.gov/api/pvwatts/v5.json?api_key=KlO3ClH31KAglUHM6iNmCju58X9W7HIQR3sBpmdd&lat=40&lon=-105&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10'.format(
    symbol)
data = requests.get(url)
with open("test_{}.json".format(symbol), "w") as out_f:
    out_f.write(data.text)
# read CSV file
# take each specific row data

# allocate this data to respective place in URL
