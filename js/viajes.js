class Viajes {
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));

        $(document).ready(function () {
            var inputs = document.querySelectorAll('input');
            inputs[0].addEventListener('click', () => viajes.getMapaEstatico());
            inputs[1].addEventListener('click', () => viajes.getMapaDinamico());
        });
        this.curSlide = 3;
        this.maxSlide = 9;
        // Añado el control a las fotos del carrusel
        $(document).ready(function () {           
            const nextSlide = document.querySelector("button:nth-of-type(1)");
            nextSlide.addEventListener("click", () => viajes.fotoSiguiente());
            const prevSlide = document.querySelector("button:nth-of-type(2)");
            prevSlide.addEventListener("click", () => viajes.fotoAnterior());
        });
    }

    getPosicion(posicion) {
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;
    }

    verErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no ha permitido la geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información del usuario no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }

    getMapaEstatico() {
        var zoom = 14;
        var pin = `pin-s+f50000(${this.longitud},${this.latitud})`;
        var url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${pin}/${this.longitud},${this.latitud}},${zoom},0/300x200?access_token=pk.eyJ1IjoidW8yNzc0OTAiLCJhIjoiY20zbXd5bDNjMHg1YTJ3cW8ybDBpcXY0biJ9.TFlyhgMVjN1C9i3q9zVxsg`;
        var mapa = $('<section>').append(
            $('<img>').attr({
                src: url,
                alt: "mapa estático de su ubicacion actual"
            })
        );
        $('body section:first-of-type').append(mapa);
    }

    getMapaDinamico() {
        console.log("entra dinamico");
        var contMap = document.querySelector('section:nth-of-type(2) div');

        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yNzc0OTAiLCJhIjoiY20zbXd5bDNjMHg1YTJ3cW8ybDBpcXY0biJ9.TFlyhgMVjN1C9i3q9zVxsg';
        const map = new mapboxgl.Map({
            container: contMap, // Contenedor en el que se incluira el mapa
            center: [this.longitud, this.latitud], // Posicion centro del mapa
            zoom: 13, // starting zoom
        });
        // Creamos un marcador nuevo en la posicion indicada
        new mapboxgl.Marker({
            color: "#960D28",
            draggable: false
        }).setLngLat([this.longitud, this.latitud])
            .addTo(map);

        map.resize();

    }

    // Metodos para el control de las fotos del carrusel
    fotoSiguiente() {
        console.log(this.curSlide);
        const slides = document.querySelectorAll("article img");
        // Comprueba si es la ultima foto del carrusel
        if (this.curSlide == this.maxSlide) {
            this.curSlide = 0;
        } else {
            this.curSlide++;
        }
        slides.forEach((slide, indx) => {
            var trans = 100 * (indx - this.curSlide);
            $(slide).css('transform', 'translateX(' + trans + '%)')
        });
    }

    fotoAnterior() {
        console.log(this.curSlide);
        const slides = document.querySelectorAll("article img");
        // Comprueba si es la primera foto del carrusel
        if (this.curSlide === 0) {
            this.curSlide = this.maxSlide;
        } else {
            this.curSlide--;
        }
        slides.forEach((slide, indx) => {
            var trans = 100 * (indx - this.curSlide);
            $(slide).css('transform', 'translateX(' + trans + '%)')
        });
    }
}

var viajes = new Viajes();