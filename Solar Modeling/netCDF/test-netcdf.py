from netCDF4 import dataset
from datetime import datetime, timedelta
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.basemap import Basemap

C_file = '/Users/wadelyman/Desktop/code/Ecology/Solar Modeling/netCDF/OR_ABI-L2-CMIPF-M3C04_G16_s20183131145360_e20183131156127_c20183131156186.nc'
C = dataset(C_file, 'r')
CMI = f.variables['CMI']

# Seconds since 2000-01-01 12:00:00
add_seconds = C.variables['t'][0]

# Datetime of image scan
DATE = datetime(2000, 1, 1, 12) + timedelta(seconds=add_seconds)

C.variables['goes_imager_projection']

# Satellite height
sat_h = C.variables['goes_imager_projection'].perspective_point_height

# Satellite longitude
sat_lon = C.variables['goes_imager_projection'].longitude_of_projection_origin

# Satellite sweep
sat_sweep = C.variables['goes_imager_projection'].sweep_angle_axis

# The projection x and y coordinates equals
# the scanning angle (in radians) multiplied by the satellite height (http://proj4.org/projections/geos.html)
X = C.variables['x'][:] * sat_h
Y = C.variables['y'][:] * sat_h

# map object with pyproj
p = Proj(proj='geos', h=sat_h, lon_0=sat_lon, sweep=sat_sweep)

# Convert map points to latitude and longitude with the magic provided by Pyproj
XX, YY = np.meshgrid(X, Y)
lons, lats = p(XX, YY, inverse=True)

lats[np.isnan(CMI)] = np.nan
lons[np.isnan(CMI)] = np.nan