import netCDF4
import numpy as np

f = netCDF4.Dataset('/Users/wadelyman/Desktop/code/Ecology/Solar Modeling/netCDF/OR_ABI-L2-CMIPF-M3C04_G16_s20183131145360_e20183131156127_c20183131156186.nc')


x = f.variables['x']
y = f.variables['y']


CMI = f.variables['CMI']

# CMIvar = CMI[:]

# lat, lon = f.variables['Latitude'], f.variables['Longitude']
# #extract lat/lon values (in degrees) to numpy arrays
# latvals = lat[:]; lonvals = lon[:]
# # #a function to find the index of the piont closest pt
# # #(in squared distance) to give lat/lon value.
# def getclosest_ij(lats, lons, latpt, lonpt):
#     dist_sq = (lats-latpt)**2 + (lons-lonpt)**2
#     minindex_flattened = dist_sq.argmin()
#     return np.unravel_index(minindex_flattened, lats.shape)
# iy_min, ix_min = getclosest_ij(latvals,lonvals, 50., -140)


print(f.variables.keys())
print(CMI)
print(y)
print(x)

# print(CMIvar)