# TODO: Clean code properly

import urllib.request


class CityCoordinates():
    def __init__(self, MAPBOX_KEY, file):
        self.__MAPBOX_KEY = 'pk.eyJ1IjoicmF0aW5nLW9mLWNpdGllcyIsImEiOiJjbDBwMzVxYmEweXV0M2tudG5iNTVoOWEwIn0.-TuXo1E4722kHkQswNZh2A'
        self.__file = file

    def __parse_coordinates_by_search_pattern(self, unparsed_coordinates):
        pattern = '"center":['
        start = unparsed_coordinates.find(pattern) + len(pattern)
        end = unparsed_coordinates.find(']', start)
        cooridnates = unparsed_coordinates[start:end]
        return cooridnates

    def __get_city_coordinates_from_mapbox_json_file(self, city):
        unparsed_coordinates_file = urllib.request.urlopen(
            'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city +
            '.json?access_token=' + self.__MAPBOX_KEY
        )

        unparsed_coordinates_string = str(unparsed_coordinates_file.read())

        coordinates = self.__parse_coordinates_by_search_pattern(
            unparsed_coordinates_string)

        return coordinates

    def get_longitude_and_latitude_by_name(self, city_english_name):
        coordinates = self.__get_city_coordinates_from_mapbox_json_file(
            city_english_name)
        coordinates = coordinates.split(',')
        longitude = coordinates[0]
        latitude = coordinates[1]
        return longitude, latitude

    # def fill_file_by_city_coordinates(self):
    #     with open(self.__file, 'r') as read_file:
    #         with open('result.txt', 'w') as write_file:
    #             write_file.write(read_file.readline())

    #             for unrefactored_line in read_file:
    #                 city = unrefactored_line.rstrip('\n')
    #                 city_format_to_get_coordinates = city.replace(' ', '+')

    #                 coordinates = self.__get_city_coordinates_from_mapbox_json_file(
    #                     city_format_to_get_coordinates)
    #                 coordinates = coordinates.split(',')
    #                 latitude = coordinates[1]
    #                 longitude = coordinates[0]

    #                 final_line = city + ' ' + longitude + ' ' + latitude + '\n'
    #                 write_file.write(final_line)


# MAPBOX_KEY = 'pk.eyJ1IjoicmF0aW5nLW9mLWNpdGllcyIsImEiOiJjbDBwMzVxYmEweXV0M2tudG5iNTVoOWEwIn0.-TuXo1E4722kHkQswNZh2A'
# file_name = 'test-data.txt'

# fill_coordinates = FillingFileByCityCoordinates(MAPBOX_KEY, file_name)
# fill_coordinates.fill_file_by_city_coordinates()
