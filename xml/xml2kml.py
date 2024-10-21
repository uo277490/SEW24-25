#-------------------------------------------------------------------------------
# Name:        xml2kml
# Purpose:
#
# Author:      Saul Tuñon Fernandez
#
# Created:     21/10/2024
# Copyright:   (c) Saul 2024
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import xml.etree.ElementTree as ET

def main():
    #Pedimos los nombres de los ficheros de entrada y salida
    nombre_entrada = input("Nombre del archivo de entrada:")
    nombre_salida = "circuito.kml"

    # Se abre el archivo de entrada donde estan los datos del circuito
    try:
        archivo_entrada = open(nombre_entrada,'r')
    except IOError:
        print('Error al encontrar el fichero de entrada:',nombre_entrada)
        exit()

    # Se abre/crea el archivo de salida
    try:
        archivo_salida = open(nombre_salida,'w')
    except IOError:
        print('Error al crear el fichero de salida:',nombre_salida)
        exit()

    # Se añade el prologo al archivo
    prologo(archivo_salida, nombre_entrada)
    # Obtenemos la raiz del documento para luego obtener los datos
    tree = ET.parse(nombre_entrada)
    root = tree.getroot()
    namespace = {'ns' : 'http://www.uniovi.es'}

    #Obtenemos las coordenadas de la salida y las añadimos al archivo
    coordenadas_salida = root.find('.//ns:coordenadasSalida', namespace)
    lon_init = coordenadas_salida.attrib['longitud']
    lat_init = coordenadas_salida.attrib['latitud']
    alt_init = coordenadas_salida.attrib['altitud']
    archivo_salida.write(str(lon_init)+','+str(lat_init)+","+str(alt_init)+'\n')

    # Obtener la lista de coordenadas del circuito
    coordenadas_tramo = root.findall('.//ns:coordenadasPunto',namespace)

    # Recorremos la lista de puntos
    for punto in coordenadas_tramo:
        # Obtenemos los atributos (latitud, longitud, altitud) de los puntos
        lat = punto.attrib['latitud']
        lon = punto.attrib['longitud']
        alt = punto.attrib['altitud']

        # Introducimos los valores de las coordenadas en el archivo
        archivo_salida.write(str(lon)+','+str(lat)+","+str(alt)+'\n')

    # Se añade el epilogo del archivo
    epilogo(archivo_salida)

    return 0

def prologo(archivo,nombre):
    """ Escribe en el archivo de salida el prólogo del archivo KML"""
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write("<Document>\n")
    archivo.write("<Placemark>\n")
    archivo.write("<name>"+nombre+"</name>\n")
    archivo.write("<LineString>\n")
    #la etiqueta <extrude> extiende la línea hasta el suelo
    archivo.write("<extrude>1</extrude>\n")
    # La etiqueta <tessellate> descompone la línea en porciones pequeñas
    archivo.write("<tessellate>1</tessellate>\n")
    archivo.write("<coordinates>\n")

def epilogo(archivo):
    """ Escribe en el archivo de salida el epílogo del archivo KML"""
    archivo.write("</coordinates>\n")
    archivo.write("<altitudeMode>relativeToGround</altitudeMode>\n")
    archivo.write("</LineString>\n")
    archivo.write("<Style> id='lineaRoja'>\n")
    archivo.write("<LineStyle>\n")
    archivo.write("<color>#ff0000ff</color>\n")
    archivo.write("<width>5</width>\n")
    archivo.write("</LineStyle>\n")
    archivo.write("</Style>\n")
    archivo.write("</Placemark>\n")
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")

if __name__ == "__main__":
    main()

