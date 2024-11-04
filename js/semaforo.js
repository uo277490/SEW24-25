class Semaforo {
        
    constructor (){
        this.levels = [0.2, 0.5, 0.8];
        this.lights = 4;
        this.unload_moment = null;
        this.difficulty = this.levels[Math.floor(Math.random() * 3)];
        this.click_moment = null;

        this.createStructure();
    }

    createStructure(){
        var main  = document.querySelector('main');
        var section = document.createElement('section');

        var h3 = document.createElement('h3');
        h3.textContent = "Juego de Tiempo de Reacción";
        section.appendChild(h3);

        // Se crean los div para las diferentes luces del semaforo
        for (let i = 0; i < this.lights; i++){
            var div = document.createElement('div');
            section.appendChild(div);
        }

        var startButton = document.createElement('button');
        startButton.textContent = "Arranque";
        startButton.addEventListener('click', this.initSequence.bind(this));
        section.appendChild(startButton);

        var stopButton = document.createElement('button');
        stopButton.textContent = "Reacción";
        stopButton.addEventListener('click', this.stopReaction.bind(this));
        stopButton.disabled = true;
        section.appendChild(stopButton);

        main.appendChild(section);
        document.body.appendChild(main);
    }

    initSequence() {
        var main  = document.querySelector('main');
        main.setAttribute("class", "load");
        var startButton = document.querySelectorAll('button')[0];
        startButton.disabled = true;
                
        setTimeout(() => {
            this.unload_moment = new Date();
            console.log(this.unload_moment);
            this.endSequence();
        },2000+(this.difficulty*100));
    }

    endSequence(){
        var main  = document.querySelector('main');
        main.setAttribute("class", "unload");
        var endButton = document.querySelectorAll('button')[1];
        endButton.disabled = false;
    }

    stopReaction(){
        this.click_moment = new Date();
        var time_diff = this.click_moment - this.unload_moment;

        var sect = document.querySelector('section');
        
        // Este if se utiliza para evitar un bug y que si se juega muchas veces seguidas no haya 
        // muchos parrafos en pantalla y solo el ultimo
        var existShowTime = sect.querySelector('p');
        if(existShowTime==null){
            var show_time = document.createElement('p');
            show_time.textContent = "Tiempo de reacción: "+time_diff+" ms.";
            sect.appendChild(show_time);
        } else {
            existShowTime.textContent = "Tiempo de reacción: "+time_diff+" ms.";
        }


        var endButton = document.querySelectorAll('button')[1];
        endButton.disabled = true;
        var startButton = document.querySelectorAll('button')[0];
        startButton.disabled = false;
    }
}