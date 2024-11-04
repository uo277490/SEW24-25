class Memoria {
    elements = [
        {
            element: 'RedBull',
            source: 'https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg'
        },
        {
            element: 'McLaren',
            source: 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg'
        },
        {
            element: 'Alpine',
            source: 'https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg'
        },
        {
            element: 'AstonMartin',
            source: 'https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg'
        },
        {
            element: 'Ferrari',
            source: 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg'
        },
        {
            element: 'Mercedes',
            source: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg'
        },
        {
            element: 'RedBull',
            source: 'https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg'
        },
        {
            element: 'McLaren',
            source: 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg'
        },
        {
            element: 'Alpine',
            source: 'https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg'
        },
        {
            element: 'AstonMartin',
            source: 'https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg'
        },
        {
            element: 'Ferrari',
            source: 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg'
        },
        {
            element: 'Mercedes',
            source: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg'
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
        // Se crea el section
        const sect = document.createElement('section');
        // Se crea y añade el h2 al section
        const h3 = document.createElement("h2");
        h3.textContent = "Juego de Memoria";
        sect.appendChild(h3);

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
    

}

