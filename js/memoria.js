class Memoria {
    elements = [
        {
            element: 'RedBull',
            source: 'multimedia/imagenes/Red_Bull_Racing_logo.svg'
        },
        {
            element: 'McLaren',
            source: 'multimedia/imagenes/McLaren_Racing_logo.svg'
        },
        {
            element: 'Alpine',
            source: 'multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg'
        },
        {
            element: 'AstonMartin',
            source: 'multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg'
        },
        {
            element: 'Ferrari',
            source: 'multimedia/imagenes/Scuderia_Ferrari_Logo.svg'
        },
        {
            element: 'Mercedes',
            source: 'multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg'
        },
        {
            element: 'RedBull',
            source: 'multimedia/imagenes/Red_Bull_Racing_logo.svg'
        },
        {
            element: 'McLaren',
            source: 'multimedia/imagenes/McLaren_Racing_logo.svg'
        },
        {
            element: 'Alpine',
            source: 'multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg'
        },
        {
            element: 'AstonMartin',
            source: 'multimedia/imagenes/Aston_Martin_Aramco_Cognizant_F1.svg'
        },
        {
            element: 'Ferrari',
            source: 'multimedia/imagenes/Scuderia_Ferrari_Logo.svg'
        },
        {
            element: 'Mercedes',
            source: 'multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg'
        }
    ]

    constructor(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        this.shuffleElements();
        this.createElements();
        this.addEventLiseners();
    }

    shuffleElements(){
        for (let i = this.elements.length - 1; i > 0; i--) {
            // Elegir un índice aleatorio entre 0 e i (inclusive)
            const j = Math.floor(Math.random() * (i + 1));
            
            // Intercambiar los elementos en las posiciones i y j
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
        }
    }

    unflipCards(){
        this.lockBoard = true;
        setTimeout(()=>{
            this.firstCard.dataset.state = 'unflip';
            this.secondCard.dataset.state = 'unflip';

            this.resetBoard();
        }, 1500);
    }

    resetBoard(){
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch(){
        return this.firstCard.isEqualNode(this.secondCard) ? this.disableCards() : this.unflipCards(); 
    }

    disableCards(){
        this.firstCard.dataset.state = 'revealed';
        this.secondCard.dataset.state = 'revealed';

        this.resetBoard();
    }

    createElements(){
        // Añado un boton para poder mostrar posteriormente la ayuda del juego si es necesaria
        var btnAyuda = document.createElement('button');
        btnAyuda.textContent = "Ayuda";
        btnAyuda.addEventListener('click',() => this.mostrarAyuda());
        document.body.append(btnAyuda);


        // Se crea el section
        const sect = document.createElement('section');
        // Se crea y añade el h2 al section
        const h2 = document.createElement("h2");
        h2.textContent = "Juego de Memoria";
        sect.appendChild(h2);

        for (const el of this.elements){ 
            // Se crea el article y se le añade el atributo data-element
            let article = document.createElement("article");
            article.setAttribute("data-element", el.element);
            // Se añade el titulo del article
            let title = document.createElement("h3");
            title.textContent = "Tarjeta de memoria";
            article.appendChild(title);
            // Se añade la imagen al article
            let image = document.createElement("img");
            image.setAttribute("src",el.source);
            image.setAttribute("alt",el.element);
            article.appendChild(image);
            // Se añade el article al section
            sect.appendChild(article);
        }
        // Se añade el section al body del documento
        document.body.appendChild(sect);
    }

    addEventLiseners(){
        var cards = document.querySelectorAll('article');
        cards.forEach(card => card.addEventListener('click', this.flipCard.bind(card,this)));
    }

    flipCard(game){
        if(game.lockBoard || this.dataset.state=='revealed' || this == game.firstCard){
            return;
        }

        this.dataset.state = 'flip';

        if(!game.hasFlippedCard){
            game.firstCard = this;
            game.hasFlippedCard = true;
        } else {
            game.secondCard = this;
            game.checkForMatch();
        }
    }


    mostrarAyuda(){
        // Creo un section para mostrar la ayuda del juego al usuario
        var sect_ayuda = document.createElement('section');
        var ayuda = document.createElement('h2');
        ayuda.textContent = "Ayuda del juego de memoria";
        sect_ayuda.appendChild(ayuda);
        var texto_ayuda = document.createElement('p');
        var txt = "El juego consiste en ir pulsando en las diferentes tarjetas de dos en dos ";
        txt += "buscando las parejas (hay 6 parejas de tarjetas) hasta que todas las tarjetas queden reveladas. ";
        txt += "Una pareja queda revelada cuando se pulsan ambas tarjetas en la misma interacción. Si se pulsará en ";
        txt += "dos tarjetas que no son iguales el sistema las mostrará un par de segundos y acto seguido las volverá a ";
        txt += "ocultar, permitiendo al usuario seguir destapando tarjetas para completar el tablero.";
        
        texto_ayuda.textContent = txt;
        sect_ayuda.appendChild(texto_ayuda);
        document.body.appendChild(sect_ayuda);
    }
    

}

