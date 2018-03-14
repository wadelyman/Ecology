import csv


with open('test_PVwatts.csv') as f:
    reader = csv.DictReader(f)
    for i, row in enumerate(reader):
        print(row)
        if(i >= 0):
            break
readerJson = reader.jason()
print(readerJson)
