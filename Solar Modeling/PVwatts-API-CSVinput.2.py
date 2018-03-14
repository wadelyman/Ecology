import requests
import sys
import csv
import pandas as pd
from pandas.io.json import json_normalize
import json


# enter all parameters
#'https://developer.nrel.gov/api/pvwatts/v5.json?api_key=KlO3ClH31KAglUHM6iNmCju58X9W7HIQR3sBpmdd&lat=40&lon=-105&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10'
# get parameters for GET from CSV
# generate GET and get response
symbol = "PVwatts"
url = 'https://developer.nrel.gov/api/pvwatts/v5.json?parameters'.format(
    symbol)
response = requests.get(
    url,
    headers={"Accept": "application/json"},
    params={('api_key', 'KlO3ClH31KAglUHM6iNmCju58X9W7HIQR3sBpmdd'), ('system_capacity', '3000'), ('module_type', '1'), ('losses', '10'), ('array_type', '1'), ('tilt', '2'), ('azimuth', '180'),
            ('address', ''), ('lat', '40'), ('lon', '-105'), ('file_id', ''), ('dataset', ''), ('radius', ''), ('timeframe', 'monthly'), ('dc_ac_ratio', ''), ('gcr', ''), ('inv_eff', ''), ('callback', '')}
)
# turn response into json.
data = response.json()
with open("test_{}.json".format(symbol), "w") as out_f:
    out_f.write(response.text)

# specify needed fields.
formatted_result = data['outputs']  # ['ac_monthly']

# open json and write normalized contents to Output.csv
with open('test_PVwatts.json') as f:
    data = json.load(f)

df = json_normalize(data)

df.to_csv('Output.csv')

print(formatted_result)
# print(data["outputs"])
# read CSV file
# take each specific row data

# with open('test_PVwatts.csv') as f:
#   reader = csv.DictReader(f)


# allocate this data to respective place in URL
# write to CSV
#out = open('newfile.csv', "w")
# out.write(formatted_result.text)
# out.close()
