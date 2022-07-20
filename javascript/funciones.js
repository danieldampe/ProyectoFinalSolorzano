// Importar clases
import * as clases from "./clases.js";
// Importar main
import * as main from "./tutorial.js";
// Importar DOM
import * as dom from "./dom.js";
// Importar pelea
import * as fight from "./fight.js"; 

// Elegir un personaje
export const selectPlayer = (arrPly, arrBug) => {
    // Status de los players
    dom.actStatus(arrPly, arrBug);
    // EVITAR ERRORES
    arrBug.forEach((bugster) => {
        bugster.dom.onclick = ``;
        bugster.dom.onmouseout = ``;
        bugster.dom.onmouseover = ``;
    });
    // Quitar html
    dom.removeHTML();
    dom.setP(`Elegi un player`);
    // Iteración
    arrPly.forEach((player) => {
        // Click
        player.dom.onclick = () => {
            // Quitar eventos
            player.dom.onmouseout = ``;
            player.dom.onmouseover = ``;
            // cursor
            gsap.set(player.dom, {
                cursor: "default"
            });
            // Crear botones
            if(player.chance == true) {
                createButton(player, arrBug, arrPly);
            } 
            // El player no tiene chance
            else {
                dom.removeHTML();
                dom.statusName.innerText = player.name;
                dom.gameImg.innerHTML = dom.setImg(player.name, player.img);
                dom.setP(`${player.name} ya ataco, elegi otro`);
                // EVITAR ERRORES
                player.dom.onmouseout = () => selectPlayer(arrPly, arrBug);
            }
        };
        // Over
        player.dom.onmouseover = () => {
            dom.statusName.innerText = player.name;
            dom.gameImg.innerHTML = dom.setImg(player.name, player.img);
            // cursor
            gsap.set(player.dom, {
                cursor: "pointer"
            });
        };
        // Out
        player.dom.onmouseout = () => {
            dom.removeHTML();
            dom.setP(`Elegi un player`);
        }
    });
};

// Crear botones
export const createButton = (player, arrBug, arrPly) => {
    // EVITAR ERRORES    
    // No seleccionar bugster 
    arrBug.forEach((bugster) => {
        bugster.dom.onclick = ``;
        bugster.dom.onmouseout = ``;
        bugster.dom.onmouseover = ``;
        // cursor
        gsap.set(bugster.dom, {
            cursor: "default"
        });
    });
    // Permitir seleccionar otro player
    arrPly.forEach((player) => {
        player.dom.onmouseover = () => {
            gsap.set(player.dom, {
                cursor: "pointer"
            });
        };
        player.dom.onmouseout = ``;
    });
    // Alias
    const {
        name: namePly,
        img: imgPly,
    } = player;
    // Quitar HTML 
    dom.removeHTML();
    // Poner HTML
    dom.statusName.innerHTML = namePly;
    dom.gameImg.innerHTML = dom.setImg(namePly, imgPly);
    // Crear contenedor
    let contButton = document.createElement(`div`);
    contButton.className = `game-information-text__cont-buttons`;
    dom.gameText.append(contButton);
    // Iteración
    player.ataques.forEach(ataque => {
        // Desestructuración
        const { 
            name, 
            damage, 
            img,
            type,
            final,
            request
        } = ataque;
        // Crear elemento
        let button = document.createElement(`div`);
        button.className = `button`;
        button.innerHTML = dom.setImg(name, img);
        let buttonBox = document.createElement(`div`);
        buttonBox.className = `button-box`;
        buttonBox.innerText = `${name}[${damage}]`;
        button.append(buttonBox);
        // Asiganar evento
        button.onclick = () => {
            // Ataque final
            if(final == true) {
                if(player.contDamage >= request) {
                    if(type == "enemy") {
                        selectTarget(player, ataque, arrBug, arrPly)
                    }
                    else {
                        selectTargetRider(player, ataque, arrBug, arrPly)
                    }
                }
                else {
                    dom.setP(`No tienes suficiente daño realizado`);
                }
            }
            // Elegir objetivo 
            // Ataque a los enemigos
            if(type == "enemy" && final == false) {
                selectTarget(player, ataque, arrBug, arrPly);
            }
            // Ataque a los aliados
            else if(type == "ally" && final == false) {
                selectTargetRider(player, ataque, arrBug, arrPly);
            };
        };
        // Pasar al DOM
        contButton.append(button);
    });
};

// Elegir un objetivo // Bugster
const selectTarget = (player, ataque, arrBug, arrPly) => {
    dom.setP(`Elegi un objetivo`);
    // Select
    arrBug.forEach((bugster) => {
        // Click
        bugster.dom.onclick = () => {
            // Efectos
            ataque.effect(player, bugster, arrPly, arrBug);
            // Act. Status del bugster
            dom.actStatus(arrPly, arrBug);
            // Quitar chance al player
            (player.chance == true) && (player.chance = false);
            // Bleeding
            fight.bleedingEffect(player);
            dom.actStatus(arrPly, arrBug);
            // Quitar eventos
            arrBug.forEach((bug) => {
                dom.removeHTML();
                bug.dom.onmouseout = ``;
                bug.dom.onmouseover = ``;
                bug.dom.onclick = ``;
            })
            // cursor
            gsap.set(bugster.dom, {
                cursor: "default"
            });
            // Verificar chance // ¿Game Over?
            verifRider(arrPly, fight.gameOverBugster(arrBug));
        };
        // Over
        bugster.dom.onmouseover = () => {
            dom.statusName.innerText = bugster.name;
            dom.gameImg.innerHTML = dom.setImg(bugster.name, bugster.img);
            // cursor
            gsap.set(bugster.dom, {
                cursor: "pointer"
            });
        };
        // Out
        bugster.dom.onmouseout = () => {
            dom.removeHTML();
            dom.statusName.innerText = player.name;
            dom.gameImg.innerHTML = dom.setImg(player.name, player.img);
            dom.setP(`Elegi un objetivo`);
        };
    });  
};

// Elegir un objetivo // Rider
const selectTargetRider = (playerMain, ataque, arrBug, arrPly) => {
    dom.setP(`Elegi un objetivo`);
    // Select
    arrPly.forEach((player) => {
        // Click
        player.dom.onclick = () => {
            // Efectos
            ataque.effect(playerMain, player, arrPly, arrBug);
            // Act. Status del player
            dom.actStatus(arrPly, arrBug);
            // Quitar chance al player
            (playerMain.chance == true) && (playerMain.chance = false);
            // Quitar eventos
            arrPly.forEach((ply) => {
                dom.removeHTML();
                ply.dom.onmouseout = ``;
                ply.dom.onmouseover = ``;
                ply.dom.onclick = ``;
            })
            // cursor
            gsap.set(player.dom, {
                cursor: "default"
            });
            // Verificar chance // ¿Game Over?
            verifRider(arrPly, fight.gameOverBugster(arrBug));
        };
        // Over
        player.dom.onmouseover = () => {
            dom.statusName.innerText = player.name;
            dom.gameImg.innerHTML = dom.setImg(player.name, player.img);
            // cursor
            gsap.set(player.dom, {
                cursor: "pointer"
            });
        };
        // Out
        player.dom.onmouseout = () => {
            dom.removeHTML();
            dom.statusName.innerText = player.name;
            dom.gameImg.innerHTML = dom.setImg(player.name, player.img);
            dom.setP(`Elegi un objetivo`);
        };
    });  
};

// Verificar chance de los riders
const verifRider = (arrPly, arrBug) => {
    // GAME CLEAR
    if(arrBug.length == 0) {
        fight.gameClear(arrPly);
        arrPly.forEach(ply => {
            ply.dom.onmouseover = ``;
            ply.dom.onmouseout = ``;
            ply.dom.onclick = ``;
        });
        main.endNivelAct();
    }
    // CONTINUE
    else {
        // Crear arrays
        let arrVerifRider = [];
        let arrVerifRiderFalse = [];
        // Pasar valores actuales
        arrPly.forEach((rider) => {
            arrVerifRider.push(rider.chance);
        });
        // Pasar solo valores falsos
        for(let i = 0; i < arrVerifRider.length; i++) {
            arrVerifRiderFalse.push(false);
        }
        // Verificar si ya no hay chances
        if(arrVerifRider.join(", ") !== arrVerifRiderFalse.join(", ")){
            selectPlayer(arrPly, arrBug)
        }
        else {
            // Reset chances a los bugsters
            arrBug.forEach((bugster) => {
                bugster.chance = true
            });
            // Turno de los Bugsters
            dom.setP(`Turno de los Bugsters`);
            turnBugsters(arrBug, arrPly);
        };  
    };
};

// Atacan los bugster
const turnBugsters = (arrBug, arrPly) => {
    // variables
    let timeContadorBug = 2000;

    // Evitar Errores
    arrPly.forEach(player => {
        player.dom.onclick = ``;
        player.dom.onmouseover = ``;
        player.dom.onmouseout = ``;
    });

    // Elegir Bugster al azar
    const elegirBug = (arrBug) => {
        let bugsterSelect;
        do {
            // tomar un numero aleatorio
            let aleatorio =  (Math.ceil(Math.random()*(arrBug.length))) - 1;
            // tomar un elemento de mismo indice
            bugsterSelect = (arrBug[aleatorio]);
        }
        while(bugsterSelect.chance == false)

        // retornar
        return bugsterSelect
    };

    // Verificar chance de los bugster
    const verifBug = (arrBug, arrPly) => {
        // GAME OVER
        if(arrPly.length == 0) {
            dom.removeHTML();
            dom.setP(`Perdiste`);
        }
        else {
            // Crear arrays
            let arrVerifBug = [];
            let arrVerifBugFalse = [];
            // Pasar valores actuales
            arrBug.forEach((bug) => {
                arrVerifBug.push(bug.chance);
            });
            // Pasar solo valores falsos
            for(let i = 0; i < arrVerifBug.length; i++) {
                arrVerifBugFalse.push(false);
            };
            // Verificar si ya no hay chances
            if (arrVerifBug.join(", ") !== arrVerifBugFalse.join(", ")) {
                // Turno de los bugster
                turnBugsters(arrBug, arrPly)
            }
            else {
                // Turno de los riders
                setTimeout(()=> {
                    // Reset chance
                    arrPly.forEach((player) => {
                        player.chance = true;
                    });
                    // Seleccionar Player
                    selectPlayer(arrPly, arrBug);
                }, timeContadorBug);
            };
        };
    };

    // Elegir un ataque al azar
    const atqRandom = (arrAtq) => {
        // Random
        let aleatorio = (Math.ceil(Math.random()*(arrAtq.length))) - 1;
        // return
        return arrAtq[aleatorio];
    }

    // Elegir un objetivo al azar
    const targetPly = (arrPly) => {
        // Random
        let aleatorio = (Math.ceil(Math.random()*(arrPly.length))) - 1;
        // return
        return arrPly[aleatorio];
    };

    // Ataque de bugster
    const atqBugster = (bugsterSelect) => {
        // Quitar chance
        bugsterSelect.chance = false;
        // Bleeding
        fight.bleedingEffect(bugsterSelect);
        dom.actStatus(arrPly, arrBug);
        // Animación
        setTimeout(()=> {
            // Ply al azar
            let plySelect = targetPly(arrPly);
            // Atq al azar
            atqRandom(bugsterSelect.ataques).effect(bugsterSelect, plySelect, arrPly, arrBug);
            // Media
            dom.statusName.innerText = bugsterSelect.name;
            dom.gameImg.innerHTML = dom.setImg(bugsterSelect.name, bugsterSelect.img);
            // Act Status de los players
            dom.actStatus(arrPly, arrBug);
            // Verificar chance // ¿Game Over?
            verifBug(arrBug, fight.gameOverBugster(arrPly));
        }, timeContadorBug );
        // Aumentar time
        timeContadorBug += 500;
    };

    // Function
    atqBugster(elegirBug(arrBug));  
};


