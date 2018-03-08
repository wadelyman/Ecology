import argparse
import csv
import sys
import request
# enter all parameters

# read CSV file
# take each specific row data

# allocate this data to respective place in URL


def get_file_from_terminal():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-Lat", "--file", help="csv file name for input", required=True)
    parser.add_argument("-Long", "--column",
                        help="csv column name for input", required=True)


# built url
url = Lat+/+Long+/ etc.

# get json
# past jason into new CSV called name of site + PVwatts
# run again for all rows in CSV
