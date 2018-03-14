import requests
import sys
import csv

# enter all parameters
#'https://developer.nrel.gov/api/pvwatts/v5.json?api_key=KlO3ClH31KAglUHM6iNmCju58X9W7HIQR3sBpmdd&lat=40&lon=-105&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10'

symbol = "PVwatts"
url = 'https://developer.nrel.gov/api/pvwatts/v5.json?parameters'.format(
    symbol)
response = requests.get(
    url,
    headers={"Accept": "application/json"},
    params={'api_key': "KlO3ClH31KAglUHM6iNmCju58X9W7HIQR3sBpmdd", "lat": "40", "lon": "-105",
            "system_capacity": "4", "azimuth": "180", "tilt": "40", "array_type": "1", "module_type": "1", "losses": "10"}
)
data = response.json()
with open("test_{}.json".format(symbol), "w") as out_f:
    out_f.write(response.text)
print(data["outputs"])
# read CSV file
# take each specific row data

with open('test_PVwatts.csv') as f:
    reader = csv.DictReader(f)


# allocate this data to respective place in URL
