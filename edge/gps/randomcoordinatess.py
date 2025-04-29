from shapely.geometry import Point, Polygon
import random

# Define the polygon using the given coordinates
# The coordinates here use Isle of Wight Tomatoes as an example
boundary_polygon = Polygon([
    (-1.2282210102161155, 50.661172926060765),
    (-1.229019951710808, 50.66226655847025),
    (-1.2242957759161055, 50.662354635140005),
    (-1.2250136653751045, 50.66340420274059)
])

def get_random_coordinates():
    minx, miny, maxx, maxy = boundary_polygon.bounds
    while True:
        lon = random.uniform(minx, maxx)
        lat = random.uniform(miny, maxy)
        point = Point(lon, lat)
        if boundary_polygon.contains(point):
            return {"lat": round(lat, 6), "lng": round(lon, 6)}
