// DOM
let exAidGashatDOM = document.getElementsByClassName(`gashats-grid__item--ex-aid`)[0];
let braveGashatDOM = document.getElementsByClassName(`gashats-grid__item--brave`)[0];
let snipeGashatDOM = document.getElementsByClassName(`gashats-grid__item--snipe`)[0];
let lazerGashatDOM = document.getElementsByClassName(`gashats-grid__item--lazer`)[0];
let robotGashatDOM = document.getElementsByClassName(`gashats-grid__item--robot`)[0];
let musicGashatDOM = document.getElementsByClassName(`gashats-grid__item--music`)[0];
let jetGashatDOM = document.getElementsByClassName(`gashats-grid__item--jet`)[0];
let giriGashatDOM = document.getElementsByClassName(`gashats-grid__item--giri`)[0];
let sportGashatDOM = document.getElementsByClassName(`gashats-grid__item--sports`)[0];
let dragonGashatDOM = document.getElementsByClassName(`gashats-grid__item--dragon`)[0];

let container = document.getElementsByClassName(`container`)[0];

class GashatDOM {
    constructor(name, key, dom, color, link) {
        this.name = name,
        this.key = key,
        this.dom = dom,
        this.color = color,
        this.link = link
    }
}

const exAidLevel = new GashatDOM("Ex-Aid", false, exAidGashatDOM, "#fc00b9", "./tutorial.html");
const braveLevel = new GashatDOM("Brave", false, braveGashatDOM, "#00f3fb", "./braveLevel.html");
const snipeLevel = new GashatDOM("Snipe", false, snipeGashatDOM, "#fffe00", "./snipeLevel.html");
const lazerLevel = new GashatDOM("Lazer", false, lazerGashatDOM, "#212121", "./lazerLevel.html");
const robotLevel = new GashatDOM("Robot", false, robotGashatDOM, "#bb1b19", "./robotLevel.html");
const musicLevel = new GashatDOM("Music", false, musicGashatDOM, "#d9f86e", "./musicLevel.html");
const jetLevel = new GashatDOM("Jet", false, jetGashatDOM, "#ec4d02", "./jetLevel.html");
const giriLevel = new GashatDOM("Giri", false, giriGashatDOM, "#000000", "./giriLevel.html");
const sportLevel = new GashatDOM("Sport", false, sportGashatDOM, "#D4E612", "./sportLevel.html");
const dragonLevel = new GashatDOM("Dragon", false, dragonGashatDOM, "#E1B548", "./dragonLevel.html");

let arrLevels = [exAidLevel, braveLevel, snipeLevel, lazerLevel, robotLevel, musicLevel, jetLevel, giriLevel, sportLevel, dragonLevel];
   
// Acceso a niveles
const acsLevelAux = () => {
    arrLevels.forEach(level => {
        // Variables
        let nameLvl;
        nameLvl = level.name;
        // Buscar en el local
        for (let i = 0; i < localStorage.length; i++) {
            let clave = localStorage.key(i);
            let newStr = clave.replace("nivel", " ");
            newStr = newStr.replace(/\s+/g, '');
            if(newStr == nameLvl) {
                if(localStorage.getItem(clave) == "true") {

                    let verif = level.dom || "Falsy";

                    if(verif != "Falsy") {
                        let img = level.dom.children[0].outerHTML;
                        level.dom.innerHTML = `<a href="${level.link}">${img}</a>`;
                        gsap.set(level.dom, {
                            filter: "grayscale(0)"
                        });
                        gsap.set(container, {
                            backgroundColor: `${level.color}`
                        });
                        level.dom.onclick = () => {
                            localStorage.removeItem("Nivel Actual");
                            localStorage.setItem("Nivel Actual", `nivel ${level.name}`);
                        };  
                    }; 
                };
            };
        };
    }); 
}; acsLevelAux();

// Dar key
const pushKey = (nivel) => {
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        if(clave == `nivel ${nivel}`) {
            localStorage.removeItem(`nivel ${nivel}`);
            localStorage.setItem(`nivel ${nivel}`, true);
        };
    };
};

let aviso = document.getElementsByClassName(`warning`)[0];
let avisoText = document.getElementsByClassName(`warning__p`)[0];
let header = document.getElementById(`header`);
let form = document.getElementById(`formulario`);
let nombreUser = document.getElementById(`nombre__input`);

gsap.set(aviso, {
    y: "100%"
});
gsap.set(header, {
    y: "-100%"
});

const formulario = () => {
    gsap.to(header, {
        y: "0",
        duration: 1,
    });
    form.addEventListener(`submit`, (evento)=> {
        // no recargar pagina
        evento.preventDefault();
        // no campos vacios
        const validarUser = ((nombreUser.value || `vacio`) !== `vacio`)? true : false; 
        const enviarDatos =  (validarUser) ? true : false;
        if (enviarDatos) {
            gsap.to(aviso, {
                y: "0",
                duration: 1,
            });
            gsap.to(aviso, {
                y: "100%",
                duration: 1,
                delay: 2
            });
            gsap.to(header, {
                y: "-100%",
                duration: 1,
            });
            gsap.to(header, {
                display: "none",
                delay: 1
            });
            // Pasar al localStorage
            localStorage.setItem(`nombreDeUsuario`, nombreUser.value);
            // JSON
            const usuario = {
                nombre: nombreUser.value, 
            };
            const enJSON = JSON.stringify(usuario);
            localStorage.setItem(`datosDeUser`, enJSON);
            const userDatos = JSON.parse(enJSON);

            // Nivel Actual
            localStorage.setItem("Nivel Actual", "inicio");
            // Poner niveles
            for (const lvl of arrLevels) {
                localStorage.setItem(`nivel ${lvl.name}`, false);
            };
    
            // Dar key
            pushKey("Ex-Aid");

            acsLevelAux();
            avisoText.innerText = `Bienvenido ${nombreUser.value}`;
        }
        else {
            avisoText.innerText = `No puedes dejar campos vacios`;
            gsap.to(aviso, {
                y: "0",
                duration: 1,
            });
            gsap.to(aviso, {
                y: "100%",
                duration: 1,
                delay: 2
            });
        };
    });
}; 

const dateExtra = () => {
    // function // pasar detalles
        // Uso de fetch
        fetch(`./data.json`)
        .then(result => result.json())
        .then(data => {
            let aleatorio = Math.ceil(Math.random()*10);
            let number = aleatorio;
            // Tomar cuadro
            aviso.children[1].innerText = data[number].tittle;
            aviso.children[2].innerText = data[number].description;
        });
    gsap.set(aviso, {
        height: "50%",
    })
    gsap.to(aviso, {
        y: "80%",
        duration: 1,
    });
    aviso.onclick = () => {
        gsap.to(aviso, {
            y: "0%",
            duration: 1,
        });
        aviso.onclick = () => {
            gsap.to(aviso, {
                y: "100%",
                duration: 1,
            });       
        }
    }
}
if(localStorage.length == 0) {

    // Llenar formulario
    formulario();
} else if(localStorage.length != 0) {
    dateExtra();
}
