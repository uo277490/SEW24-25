#-------------------------------------------------------------------------------
# Name:        xml2perfil
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
    # Se obtiene el nombre del archivo de entrada
    nombre_entrada = input("Nombre del archivo de entrada:")
    nombre_entrada = "circuitoEsquema.xml"
    nombre_salida = "altimetria.svg"

    # Obtenemos la raiz del documento para luego obtener los datos
    tree = ET.parse(nombre_entrada)
    root = tree.getroot()
    namespace = {'ns' : 'http://www.uniovi.es'}

    coordenadas_tramo = root.findall('.//ns:coordenadasPunto',namespace)

    # 'datos' se refiere a los datos de los puntos(de los tramos) de la carrera
    datos = []

    # Añado la salida a la lista de datos de la carrera
    coordenadas_salida = root.find('.//ns:coordenadasSalida', namespace)
    alt_init = coordenadas_salida.attrib['altitud']
    datos.append(("salida", alt_init, 0.0))

    # 'ajuste' se utiliza para que en el svg la altimetria se vea bien
    datos, ajuste = obtenerPuntos(datos, coordenadas_tramo)

    svg(nombre_salida, datos, ajuste)
    print(datos)




def obtenerPuntos(datos, coordenadas):
    """Obtiene todos los datos necesarios de los tramos de la carrera para posteriormente hacer el svg"""
    # Creo una variable como contador del tramo
    ntramo = 0
    # Creo una variable para la distancia acumulada
    distancia_acumulada = 0.0
    altitud_max = 0.0

    # Obtengo la altitud entrando en los atributos de coordenadasTramo
    for punto in coordenadas:
        altitudTramo = float(punto.attrib['altitud'])
        distanciaTramo = float(punto.attrib['distancia'])

        if altitudTramo > altitud_max:
            altitud_max = altitudTramo

        distancia_acumulada += distanciaTramo
        ntramo += 1

        # Si los puntos de los tramos aparecen demasiado separados se puede controlar
        # con la distancia acumulada a continuacion. Por ejemplo, añadiendo distancia_acumulada/5
        # en vez de la distancia_acumulada
        if ntramo != len(coordenadas):
            datos.append(("Tramo "+str(ntramo), altitudTramo, distancia_acumulada/5))
        else:
            datos.append(("Meta", altitudTramo, distancia_acumulada/5))

    # El ajuste que se añade en el return despues de los datos es para que al ver el svg sea legible
    return datos, (distancia_acumulada+200, altitud_max+4, -150)

def svg(nombreFichero, datos, ajuste):
    """Crea el archivo svg a partir de los puntos indicados"""
    #Inicializo el archivo
    try:
        fichero = open(nombreFichero,'w')
    except IOError:
        print('Error al crear el fichero de salida:',nombreFichero)
        exit()

    fichero.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    # Ajusto el tamaño del svg para que se vea la polilinea dependiendo de la
    # distancia y la altitud

    print(ajuste)
    print('Recorrido max: ', ajuste[0])
    print('Altitud max: ', ajuste[1])
    fichero.write(f'<svg xmlns="http://www.w3.org/2000/svg" version="2.0" viewBox="{ajuste[2]} 0 {ajuste[0]} {ajuste[1]}" preserveAspectRatio="xMinYMin meet" >\n')

    cadena = ''
    for vertice in datos:
        cadena += f"{vertice[2]},{vertice[1]} "
        #print('Altitud:',vertice[1])
        #print('Distancia:',vertice[2])
    #print(cadena)
    fichero.write(f'<polyline points="{cadena}" style="fill:white;stroke:red;stroke-width:4" />\n')
    for vertice in datos:
        fichero.write(f'<text x="{vertice[2]}" y="{165}" style="writing-mode: tb; glyph-orientation-vertical: 0;">\n')
        fichero.write(f'{vertice[0]}\n')
        fichero.write(f'</text>\n')
    fichero.write('</svg>')
    fichero.close()
    return

if __name__ == '__main__':
    main()
