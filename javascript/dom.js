// Importar main 
import * as main from "./tutorial.js";
// Importar pelea
import * as fight from "./fight.js";

// Elementos del DOM
export let body = document.body;

// PLayers
export let exAidDom = document.getElementsByClassName(`cont-img-rider-ex-aid`)[0];
export let braveDom = document.getElementsByClassName(`cont-img-rider-brave`)[0];
export let snipeDom = document.getElementsByClassName(`cont-img-rider-snipe`)[0];
export let lazerDom = document.getElementsByClassName(`cont-img-rider-lazer`)[0];

export let genmDom = document.getElementsByClassName(`cont-img-rider-genm`)[0];

// Bugsters
export let saltyDom = document.getElementsByClassName(`cont-img-bugster-salty`)[0];
export let aramburaDom = document.getElementsByClassName(`cont-img-bugster-arambura`)[0];
export let revolDom = document.getElementsByClassName(`cont-img-bugster-revol`)[0];
export let motorsDom = document.getElementsByClassName(`cont-img-bugster-motors`)[0];

export let saltyVirusDom = document.getElementsByClassName(`cont-img-bugster-salty-virus`)[0];
export let aramburaVirusDom = document.getElementsByClassName(`cont-img-bugster-arambura-virus`)[0];
export let revolVirusDom = document.getElementsByClassName(`cont-img-bugster-revol-virus`)[0];
export let motorsVirusDom = document.getElementsByClassName(`cont-img-bugster-motors-virus`)[0];

export let robotDom = document.getElementsByClassName(`cont-img-bugster-robot`)[0];
export let musicDom = document.getElementsByClassName(`cont-img-bugster-music`)[0];
export let jetDom = document.getElementsByClassName(`cont-img-bugster-jet`)[0];
export let giriDom = document.getElementsByClassName(`cont-img-bugster-giri`)[0];

export let gashatRecom = document.getElementsByClassName(`gashat-recomp`)[0];

// Infomación
export let gameImg = document.getElementsByClassName(`game-information__cont-img`)[0];
export let gameText = document.getElementsByClassName(`game-information__text`)[0];
export let statusName = document.getElementsByClassName(`game-information__name`)[0];

// Efectos
let gameStart = document.getElementsByClassName(`game-screen__start`)[0];
let gameClear = document.getElementsByClassName(`game-screen__start--clear`)[0];

let pantVs = document.getElementsByClassName(`game-vs-start`)[0];
let pantPlayer = document.getElementsByClassName(`game-vs-start__player`)[0];
let pantBugster = document.getElementsByClassName(`game-vs-start__bugster`)[0];

// Crear elementos
// Quitar HTML
export const removeHTML = () => {
    gameImg.innerHTML = ``;
    statusName.innerHTML = ``;
    gameText.innerHTML = ``;
}
// parrafo
export const setP = (text) => {
    gameText.innerHTML = ``;
    let p = document.createElement(`p`);
    p.innerHTML = text;
    gameText.append(p);
};
// imagen
export const setImg = (name, img) => {
    return `<img src="${img}" alt="${name}">`;
}

// Crear funciones
// Crear cuadro de texto
const hablar = (obj, text) => {
    // imagen
    gameImg.innerHTML = setImg(obj.name, obj.img);
    // name
    statusName.innerText = obj.name;
    // texto
    setP(text)
};

const effectSpanAux = (user, container) => {
    let arrEffect = [];
    (user.immunity == true) && (arrEffect.push(`Inmunidad`));
    (user.shield == true) && (arrEffect.push(`Protección`));
    (user.increase > 0) && (arrEffect.push(`Incremento`)); 
    (user.stunned == true) && (arrEffect.push(`Aturdido`));
    (user.bleeding == true) && (arrEffect.push(`Sangrado`));

    arrEffect.forEach(effect => {
        let span = document.createElement(`span`);
        let classUserName = user.name.replace(/\s+/g, '');
        span.className = `effect-${classUserName}-${effect}`;
        span.innerText = effect;
        container.append(span);
    });
}

export const removeEffectSpanAux = (user, effect) => {
    let classUserName = user.name.replace(/\s+/g, '');
    let spanRemove = document.getElementsByClassName(`effect-${classUserName}-${effect}`)[0];
    let verif = spanRemove || "Falsy";
    (verif != "Falsy") && (spanRemove.remove());
};

// Pasar ataques
export const actStatusAtq = (player, container) => {
    // Quitar html
    container.innerHTML = ``;
    // Nombre del player
    let namePlayer = document.createElement(`h5`);
    namePlayer.innerText = player.name;
    // Vida del player
    // Limitar vida
    player.hp = Math.round(player.hp);
    if(player.hp > player.maxhp) {
        player.hp = player.maxhp;
    }
    else if(player.hp < 0) {
        player.hp = 0;
    };
    let playerHp = document.createElement(`p`);
    playerHp.className = `details__hp`;
    playerHp.innerText = `${player.hp}HP`;
    // Efectos del player
    let divEffect = document.createElement(`div`);
    divEffect.className = `details__effects`;
    divEffect.innerHTML = `<p>Efectos:</p>`;
    effectSpanAux(player, divEffect);
    // Append
    container.append(namePlayer);
    container.append(playerHp);
    container.append(divEffect);
    // Ataques
    player.ataques.forEach(ataque => {
        const {
            name,
            description,
            damage,
            final,
            request,
            special,
            requestTurn
        } = ataque;
        // Ataque Final
        if(final == true) {
            // Nombre del ataque
            let tittleh6 = document.createElement(`h6`);
            tittleh6.innerText = `${name}[${damage}]`;
            // Descripción
            let parrafo = document.createElement(`p`);
            parrafo.className = `details__p`;
            parrafo.innerText = description;
            let contDamage = document.createElement(`p`);
            contDamage.className = `details__cont`;
            contDamage.innerText = `Contador de daño:`;
            let spanDamage = document.createElement(`span`);
            spanDamage.innerText = `${player.contDamage}/${request}`;
            // Append
            container.append(tittleh6);
            container.append(contDamage);
            container.append(spanDamage);
            container.append(parrafo);
        } 
        else if(special == true) {
            // Nombre del ataque
            let tittleh6 = document.createElement(`h6`);
            tittleh6.innerText = `${name}[${damage}]`;
            // Descripción
            let parrafo = document.createElement(`p`);
            parrafo.className = `details__p`;
            parrafo.innerText = description;
            let contDamage = document.createElement(`p`);
            contDamage.className = `details__cont`;
            contDamage.innerText = `Turnos:`;
            let spanDamage = document.createElement(`span`);
            spanDamage.innerText = `${player.contTurn}/${requestTurn}`;
            // Append
            container.append(tittleh6);
            container.append(contDamage);
            container.append(spanDamage);
            container.append(parrafo);
        }
        else {
            // Nombre del ataque
            let tittleh6 = document.createElement(`h6`);
            tittleh6.innerText = `${name}[${damage}]`;
            // Descripción
            let parrafo = document.createElement(`p`);
            parrafo.className = `details__p`;
            parrafo.innerText = description;
            // Append
            container.append(tittleh6);
            container.append(parrafo);
        };
    });
};

// Detalles de los players
export const appendDetails = (arrPly, arrBug) =>{
    arrPly.forEach(player => {
        let gameScreen = document.getElementsByClassName(`game-screen`)[0];
        let boxDetails = document.createElement(`div`);
        boxDetails.className = `game-screen-details game-screen-details--player game-screen-details--${player.name.replace(/\s+/g, '')}`;
        gameScreen.appendChild(boxDetails);
    });
    arrBug.forEach(bugster => {
        let gameScreen = document.getElementsByClassName(`game-screen`)[0];
        let boxDetails = document.createElement(`div`);
        boxDetails.className = `game-screen-details game-screen-details--bugster game-screen-details--${bugster.name.replace(/\s+/g, '')}`;
        gameScreen.insertAdjacentElement("afterbegin", boxDetails);
    });
}

// Status
export const actStatus = (arrPly, arrBug) => {
    arrPly.forEach(player => {
        let container = document.getElementsByClassName(`game-screen-details--${player.name.replace(/\s+/g, '')}`)[0];
        actStatusAtq(player, container);
        // Over
        player.dom.addEventListener(`mouseover`, () => {
            gsap.set(container, {
                display: "block"
            });
        });
        // Out
        player.dom.addEventListener(`mouseout`, () => {
            gsap.set(container, {
                display: "none",
            });
        });
    });
    arrBug.forEach(bugster => {
        let container = document.getElementsByClassName(`game-screen-details--${bugster.name.replace(/\s+/g, '')}`)[0];
        actStatusAtq(bugster, container);
        bugster.dom.addEventListener(`mouseover`, () => {
            gsap.set(container, {
                display: "block"
            });
        });
        bugster.dom.addEventListener(`mouseout`, () => {
            gsap.set(container, {
                display: "none",
            });
        });
    });
};

// Aparecer "HIT"
const hit = (subject) => {
    gsap.to(subject.dom.children[1], {
        display: "block",
        scale: 2,
        duration: 0.4,
        y: "-25%"
    });
    gsap.to(subject.dom.children[1], {
        display: "block",
        scale: 0,
        delay: 0.4  
    });
    gsap.to(subject.dom.children[1], {
        display: "none",
        delay: 0.8  
    });
};

// Aparecer "MISS"
const miss = (subject) => {
    gsap.to(subject.dom.children[3], {
        display: "block",
        scale: 1.8,
        duration: 0.4,
        y: "-25%"
    });
    gsap.to(subject.dom.children[3], {
        display: "block",
        scale: 0,
        delay: 0.4  
    });
    gsap.to(subject.dom.children[3], {
        display: "none",
        delay: 0.8  
    });
};

// Aparecer "PERFECT"
export const perfect = (subject) => {
    gsap.to(subject.dom.children[2], {
        display: "block",
        scale: 2.5,
        duration: 0.4,
        y: "-25%"
    });
    gsap.to(subject.dom.children[2], {
        display: "block",
        scale: 0,
        delay: 0.4  
    });
    gsap.to(subject.dom.children[2], {
        display: "none",
        delay: 0.8  
    });
};

// HIT or MISS
export const hitOrMiss = (user, damage) => {
    if(damage <= 0) {
        miss(user);
    }
    else {
        hit(user)
    };
};

// Heal item
export const pushItem = (user, num) =>{
    gsap.to(user.dom.children[num], {
        display: "block",
        top: "15%",
        duration: 0.5,
    });
    gsap.to(user.dom.children[num], {
        duration: 3.5,
        opacity: 0
    });
    gsap.set(user.dom.children[num], {
        display: "none",
        top: "-90%",
        opacity: 1,
        delay: 3.5
    });
};

// Level Up
export const levelUpAnima = (obj, levelUp) => {
    // Animación
    gsap.to(obj.dom.children[8] , {
        scale: 1.3,
        ease: "back.out(1.7)",
        duration: 1.5
    });
    gsap.to(obj.dom.children[8], {
        scale: 0,
        duration: 0.7,
        delay: 1.3,
    })
    gsap.to(obj.dom.children[9], {
        display: "block",
        scale: 2,
        duration: 0.5,
        delay: 1.5
    })
    gsap.to(obj.dom.children[9], {
        scale: 0,
        y: "-28%",
        x: "-10%",
        delay: 2.5
    })
    if(levelUp == "one") {
        setTimeout(() => {
            obj.dom.children[0].outerHTML = `<img src="${obj.img}" alt=\"\">`; 
            obj.dom.className = `player cont-img-rider-${obj.name.toLowerCase()} ${obj.name.toLowerCase()}-level-${levelUp}`;
        }, 1300);
    }
    else if(levelUp == "two") {
        setTimeout(() => {
            obj.dom.children[0].outerHTML = `<img src="${obj.imgTwo}" alt=\"\">`; 
            obj.dom.className = `player cont-img-rider-${obj.name.toLowerCase()} ${obj.name.toLowerCase()}-level-${levelUp}`;
        }, 1300);
    }
    else if(levelUp == "three") {
        setTimeout(() => {
            obj.dom.children[0].outerHTML = `<img src="${obj.imgThree}" alt=\"\">`; 
            obj.dom.className = `player cont-img-rider-${obj.name.toLowerCase()} ${obj.name.toLowerCase()}-level-${levelUp}`;
        }, 1300);
    }
    else if(levelUp == "five") {
        setTimeout(() => {
            obj.dom.children[0].outerHTML = `<img src="${obj.imgFive}" alt=\"\">`; 
            obj.dom.className = `player cont-img-rider-${obj.name.toLowerCase()} ${obj.name.toLowerCase()}-level-${levelUp}`;
        }, 1300);
    };
};

// "Game Over"
export const gameOver = (subject) => {
    gsap.to(subject.dom, {
        opacity: 0,
        duration: 2 
    });
    gsap.set(subject.dom, {
        display: "none",
        delay: 2 
    });
    if(subject.name == "Collabos Bugster Robot") {
        dropGashat();
    }
    else if(subject.name == "Collabos Bugster Beat") {
        dropGashat();
    }
    else if(subject.name == "Collabos Bugster Jet") {
        dropGashat();
    }
    else if(subject.name == "Collabos Bugster Giri") {
        dropGashat();
    }
    else if(subject.name == "Genm") {
        let verif = gashatRecom || "Falsy";
        if(verif != "Falsy") {
            dropGashat();
        };
    };
};  

// Game Start
export const animationStart = () => {
    gsap.to(gameStart, {
        display: "block",
        y: "35%",
        scale: 2,
        duration: 1
    });
    gsap.to(gameStart, {
        y: "-28%",
        scale: 0,
        delay: 2
    });
    gsap.to(gameStart, {
        display: "none",
        delay: 3
    });
    gsap.to(pantPlayer, {
        x: 0
    })
    gsap.to(pantBugster, {
        x: 0
    })
    gsap.to(pantPlayer, {
        x: "-100%",
        duration: 1,
        delay: 2
    })
    gsap.to(pantBugster, {
        x: "100%",
        duration: 1,
        delay: 2 
    })
    gsap.to(pantVs, {
        display: "none",
        delay: 3
    })
}

// Game Clear
export const animationClear = () => {
    gsap.set(pantVs, {
        display: "flex"
    });
    gsap.to(gameClear, {
        display: "block",
        y: "35%",
        scale: 1.8,
        duration: 1
    });
    gsap.to(gameClear, {
        y: "-28%",
        scale: 0,
        delay: 2
    });
    gsap.to(gameClear, {
        display: "none",
        delay: 3
    });
    gsap.to(pantPlayer, {
        x: 0
    })
    gsap.to(pantBugster, {
        x: 0
    })
    gsap.to(pantPlayer, {
        x: "100%",
        duration: 1,
        delay: 2
    })
    gsap.to(pantPlayer, {
        x: "200%",
        duration: 1,
        delay: 4
    })
    gsap.to(pantBugster, {
        x: "100%",
        duration: 1.5,
        delay: 0.5
    })
    gsap.set(pantPlayer, {
        x: "-100%",
        delay: 5
    })
    gsap.set(pantBugster, {
        x:"100%",
        delay: 5
    })
}

// Reset DOM
export const resetdom = () => {
    gsap.set(pantPlayer, {
        x: "-100%"
    })
    gsap.set(pantBugster, {
        x: "100%"
    });
    gsap.set(".player", {
        x: "-100%"
    });
    gsap.set(".bugster", {
        x: "100%"
    });
    gsap.set(gameStart, {
        scale: 0,
        display: "none"
    });
    gsap.set(gameClear, {
        scale: 0,
        display: "none"
    });
};
  
// Funcion Temporal
const levelUpGenm = (genm, levelUp) => {
    // Animación
    gsap.set(genm.dom.children[9] , {
        y: "-28%",
        x: "-25%"
    });
    gsap.to(genm.dom.children[8] , {
        scale: 1.3,
        ease: "back.out(1.7)",
        duration: 1.5
    });
    gsap.to(genm.dom.children[8], {
        scale: 0,
        duration: 0.7,
        delay: 1.3,
    })
    gsap.to(genm.dom.children[9], {
        display: "block",
        scale: 2,
        duration: 0.5,
        delay: 1.5
    })
    gsap.to(genm.dom.children[9], {
        scale: 0,
        delay: 2.5
    })
    setTimeout(() => {
        genm.dom.children[0].outerHTML = `<img src="./media/img/bugster/genm-level-${levelUp}.png" alt=\"\">`; 
        genm.dom.className = `player cont-img-rider-genm genm-level-${levelUp}`;
    }, 1300);
};

// Dejar gashat
export const dropGashat = () => {
    gsap.to(gashatRecom, {
        display: "block",
        opacity: 1,
        duration: 3
    });
};
 
// Animaciones
export const introExAid = () => {
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == `Enter`) {
            cont ++;
            // Step 1
            if(cont == 1) {
                gsap.to(exAidDom, {
                    x: "100%",
                    duration: 1,
                });
                hablar(main.exAid, `Es hora de terminar el juego`);
            }
            // Step 2
            else if(cont == 2) {
                gsap.to(saltyDom, {
                    x: "-100%",
                    duration: 1,
                });
                hablar(main.salty, `Tu numeros aun son bajos`);
                // Step 3
                body.onkeydown = ``;
                main.readyStart();
            }
        };
    };
};

export const endIntroExAid = () => {
    gsap.set(exAidDom, {
        opacity: 1,
        display: "block"
    })
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == `Enter`) {
            cont ++;
            // Step 1
            if(cont == 1) {
                hablar(main.exAid, `Ja! Sin usar continues`);
            }
            // Step 2
            else if(cont == 2) {
                gsap.to(exAidDom, {
                    x: "2000%",
                    duration: 10,
                });
                main.pushKey("Brave");
                removeHTML();
                setP(`<a href = "./index.html">Click aqui para volver al inicio</a>`);
            }
        };
    };
};

export const introBrave = () => {
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont ++;
            // Step 1
            if(cont == 1) {
                gsap.to(braveDom, {
                    x: "100%",
                    duration: 1
                }); 
                hablar(main.brave, "Ya no tienes salvación");
            }
            // Step 2
            else if(cont == 2) {
                gsap.to(aramburaDom, {
                    x: "-100%",
                    duration: 1
                }); 
                hablar(main.arambura, "Esto no acaba aqui, Brave");
            }
            // Step 3
            else if(cont == 3) {
                gsap.to(aramburaDom, {
                    x: "-150%",
                    duration: 1
                }); 
                gsap.to(aramburaVirusDom, {
                    x: "-100%",
                    duration: 1,
                    delay: 2
                }); 
                removeHTML();
            }
            // Step 4
            else if(cont == 4) {
                hablar(main.brave, "¿Que es esa cosa?");
            }
            // Step 5
            else if(cont == 5) {
                hablar(main.virusArambura, "+_+");
                // Step 6
                body.onkeydown = ``;
                main.readyStart();
            }
        };
    };
};

export const endIntroBrave = () => {
    gsap.set(braveDom, {
        opacity: 1,
        display: "block"
    })
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont ++;
            // Step 1
            if(cont == 1) {
                hablar(main.brave, "No debiste de acabar asi, Arambura");
            }
            // Step 2
            else if(cont == 2) {
                gsap.set(braveDom, {
                    scaleX: "-1"
                });
                gsap.to(braveDom, {
                    x: "-400%",
                    duration: 15
                });
                main.pushKey("Snipe");
                removeHTML();
                setP(`<a href = "./index.html">Click aqui para volver al inicio</a>`);
            }
        };
    };
};

export const introSnipe = () => {
    gsap.set(revolVirusDom, {
        x: "-1000%"
    });
    gsap.set(snipeDom, {
        x: "180%"
    })
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont ++;
            // Step 1
            if(cont == 1) {
                hit(main.virusRevol);
                gsap.to(revolVirusDom, {
                    opacity: 0,
                    duration: 1
                });
                gsap.to(revolVirusDom, {
                    x: "100%",
                    delay: 1
                });
                gsap.to(revolVirusDom, {
                    opacity: 1,
                    delay: 2
                });
            }
            // Step 2
            else if(cont == 2) {
                hablar(main.snipe, "Cada vez hay más de estas cosas");
            }
            // Step 3
            else if(cont == 3) {
                hablar(main.snipe, "Esto se hace más dificil");
            }
            // Step 4
            else if(cont == 4) {
                gsap.to(revolDom,{
                    x: "-100%",
                    duration: 3
                })
                gsap.to(revolVirusDom,{
                    x: "-50%",
                    duration: 3
                })
                hablar(main.revol, "Huir de lo que en verdad eres<br>siempre sera dificil");
            }
            // Step 5
            else if(cont == 5) {
                gsap.to(revolDom,{
                    x: "-200%",
                    duration: 3.5
                })
                hablar(main.snipe, "¿Como me encontraste?");
            }
            // Step 6
            else if(cont == 6) {
                gsap.to(snipeDom,{
                    x: "400%",
                    duration: 3
                })
                hablar(main.snipe, "Bueno, no importa");
            }
            // Step 7
            else if(cont == 7) {
                hablar(main.snipe, "Si esto es lo que quieres");
            }
            // Step 8
            else if(cont == 8) {
                gsap.to(revolDom, {
                    x: "-300%",
                    duration: 2
                });
                hablar(main.revol, "Yo nunca quise esto, Snipe");
                // Step 9
                body.onkeydown = ``;
                main.readyStart();
            };
        };
    };
};

export const endIntroSnipe = () => {
    gsap.set(snipeDom, {
        opacity: 1,
        display: "block"
    })
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont ++;
            // Step 1
            if(cont == 1) {
                hablar(main.snipe, "Yo tampoco lo quise de esta manera, Revol");
            }
            // Step 2
            else if(cont == 2) {
                gsap.to(snipeDom, {
                    x: "700%",
                    duration: 3
                });
                removeHTML();
            }
            // Step 3
            else if(cont == 3) {
                removeHTML();
                setP("!Alto ahi!");
            }
            // Step 4
            else if(cont == 4) {
                gsap.set(snipeDom, {
                    scaleX: "-1"
                });
                gsap.to(braveDom, {
                    x: "150%",
                    duration: 4
                });
                hablar(main.brave, "¿Que es este lugar?");
            }
            // Step 5
            else if(cont == 5) {
                main.pushKey("Lazer");
                removeHTML();
                setP(`<a href = "./index.html">Click aqui para volver al inicio</a>`);
            }
        };
    }; 
};

export const introLazer = () => {
    gsap.set(snipeDom, {
        x: "1300%",
        scaleX: -1 
    });
    gsap.set(braveDom, {
        x: "1300%",
        scaleX: -1 
    });
    gsap.set(motorsDom, {
        x: "-10%"       
    });
    gsap.set(exAidDom, {
        x: "660%",
        y: "-260%"
    });
    gsap.set(genmDom, {
        x: "1300%"
    });
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont ++;
            // Step 1
            if(cont == 1) {
                gsap.to(lazerDom, {
                    x: "10%",
                    duration: 1
                });
                hablar(main.lazer, "Ahora me las pagaras");
            }
            // Step 2
            else if(cont == 2) {
                removeHTML();
                gsap.to(lazerDom, {
                    x: "300%",
                    duration: 2.5,
                    linear: "ease-in"
                });
                gsap.to(motorsVirusDom, {
                    x: "-900%",
                    duration: 1,
                    delay: 2.5
                });
                gsap.set(motorsVirusDom, {
                    x: "100%",
                    delay: 3.6
                });
                setTimeout(() => {
                   hit(main.lazer) 
                }, 2800);
                gsap.to(lazerDom, {
                    x: "200%",
                    rotate: "-10deg",
                    duration: 0.5,
                    delay: 2.8
                });
                gsap.to(lazerDom, {
                    rotate: "0deg",
                    duration: 1.5,
                    delay: 4
                });
            }
            // Step 3
            else if(cont == 3) {
                gsap.to(motorsVirusDom, {
                    x: 0,
                    duration: 2
                });
                gsap.to(motorsDom, {
                    x: "-100%",
                    duration: 3
                });
                hablar(main.motors, "¿Devuelta intentando lo mismo?");
            }
            // Step 4
            else if(cont == 4) {
                gsap.to(lazerDom, {
                    x: "400%",
                    duration: 2
                });
                hablar(main.lazer, "Nunca perdonare lo que hiciste");
            }
            // Step 5
            else if(cont == 5) {
                gsap.to(motorsVirusDom, {
                    x: "-140%",
                    duration: 2
                });
                gsap.to(lazerDom, {
                    x: "350%",
                    duration: 2,
                    delay: 1.5
                })
                hablar(main.motors, "¿Que es lo que puede hacer una moto solitaria?");
            }
            // Step 6
            else if(cont == 6) {
                removeHTML();
                gsap.to(motorsVirusDom, {
                    x: "-300%",
                    duration: 1.3,
                    linear: "ease-in"
                });
                gsap.to(exAidDom, {
                    y: 0,
                    duration: 0.3,
                    delay: 1.3
                });
                setTimeout(() => {
                    hit(main.exAid);
                }, 1500);
                gsap.to(motorsVirusDom, {
                    x: "500%",
                    y: "-500%",
                    rotate: "120deg",
                    duration: 1.5,
                    delay: 1.6
                });
                gsap.set(motorsVirusDom, {
                    x: "100%",
                    y: 0,
                    rotate: "0deg",
                    delay: 3.2
                });
            }
            // Step 7
            else if(cont == 7) {
                hablar(main.lazer, "¿Quien eres tu?");
            }
            // Step 8
            else if(cont == 8) {
                hablar(main.exAid, "Creo que necesitas ayuda, ¿no?");
                // Step 9
                body.onkeydown = ``;
                main.readyStart();
            };
        };
    };
};

let contEndLvlLazer = 0;
export const endIntroLazer = () => {
    gsap.set(exAidDom, {
        opacity: 1,
        display: "block"
    })
    gsap.set(lazerDom, {
        opacity: 1,
        display: "block"
    })
    contEndLvlLazer++;
    if(contEndLvlLazer == 1) {
        // Enter
        let cont = 0;
        body.onkeydown = (e) => {
            if(e.key == "Enter") {
                cont ++;
                // Step 1
                if(cont == 1) {
                    gsap.set(lazerDom, {
                        scaleX: -1
                    });
                    hablar(main.lazer, "¿Que eres tu?");
                }
                // Step 2
                else if(cont == 2) {
                    hablar(main.exAid, "Yo me pregunto lo mismo");
                }
                // Step 3
                else if(cont == 3) {
                    removeHTML();
                    gsap.to(genmDom, {
                        x: "1100%",
                        duration: 1
                    });
                    gsap.set(lazerDom, {
                        scaleX: 1,
                    });
                }
                // Step 4
                else if(cont == 4) {
                    hablar(main.lazer, "¿Tienes un hermano o algo asi?");
                }
                // Step 5
                else if(cont == 5) {
                    hablar(main.exAid, "No");
                }  
                // Step 6
                else if(cont == 6) {
                    gameImg.innerHTML = setImg(`Mighty Action X`, "./media/img/gashats/gashatGenm.png");
                    statusName.innerHTML = `Mighty Action X`;
                    setP("Mighty Action X es un juego de plataformas de acción<br>en 2D protagonizado por Mighty<br>uno de los jefes es un villano Count Salty.");
                }
                // Step 7
                else if(cont == 7) {
                    removeHTML();
                    pantBugster.children[0].outerHTML = `<img src="./media/img/background/genm-pink.jpg" alt="">`;
                    levelUpGenm(main.genmBugster, "two");
                    // Step 7
                    body.onkeydown = ``;
                    main.readyStart();
                }
            };
        };
    } else {
        // Enter
        let cont = 0;
        body.onkeydown = (e) => {
            if(e.key == "Enter") {
                cont ++;
                // Step 1
                if(cont == 1) {
                    gsap.set(lazerDom, {
                        scaleX: -1
                    });
                    hablar(main.lazer, "¿Que era esa cosa?");
                }
                // Step 2
                else if(cont == 2) {
                    hablar(main.exAid, "Yo me pregunto lo mismo");
                }
                // Step 3
                else if(cont == 3) {
                    gsap.set(lazerDom, {
                        scaleX: 1
                    });
                    hablar(main.lazer, "Creo que vienen más");
                }
                // Step 4
                else if(cont == 4) {
                    gsap.to(snipeDom, {
                        x: "900%",
                        duration: 3
                    });
                    gsap.to(braveDom, {
                        x: "800%",
                        duration: 3
                    });
                    hablar(main.snipe, "¿Ese tipo no se parece al de negro?");
                }
                // Step 5
                else if(cont == 5) {
                    main.pushKey("Robot");
                    removeHTML();
                    setP(`<a href = "./index.html">Click aqui para volver al inicio</a>`);
                };
            };
        };
    };
};

export const introRobot = () => {
    gsap.set(aramburaVirusDom, {
        width: "7%",
        y: "30%"
    });
    gsap.set(saltyVirusDom, {
        width: "7.5%",
        y: "-30%"
    });
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1
            if(cont == 1) {
                gsap.to(exAidDom, {
                    x: "100%",
                    duration: 2
                });
                gsap.to(braveDom, {
                    x: "300%",
                    duration: 3
                })
                hablar(main.exAid, "¿Dices que el tipo oscuro ese te dijo<br>que hay que recolectar gashats?")
            }   
            // Step 2
            else if(cont == 2) {
                hablar(main.brave, "Esas criaturas naranjas no pertenecian<br> a nuestros mundos");
            }
            // Step 3
            else if(cont == 3) {
                hablar(main.brave, "Dijo que una vez recolectemos 10 gashat<br> podremos volver todo a la normalidad");
            }
            // Step 4
            else if(cont == 4) {
                hablar(main.exAid, "¿Que criaturas naranjas?");
            }
            // Step 5
            else if(cont == 5) {
                removeHTML();
                gsap.to(aramburaVirusDom, {
                    x: "-200%",
                    duration: 2
                });
                gsap.to(saltyVirusDom, {
                    x: "-250%",
                    duration: 2
                });
            }
            // Step 6
            else if(cont == 6) {
                hablar(main.exAid, "Vale, y los gashats?")
            }
            // Step 7
            else if(cont == 7) {
                removeHTML();
                gsap.to(robotDom, {
                    x: "-360%",
                    duration: 3
                });
                gsap.to(gashatRecom, {
                    x: "-360%",
                    duration: 3
                });
            }
            // Step 8
            else if(cont == 8) {
                hablar(main.exAid, `Vale, y eso del "Level Up"?`);
            }
            // Step 9
            else if(cont == 9) {
                gameImg.innerHTML = setImg(`Taddle Quest`, "./media/img/gashats/gashatBrave.png");
                statusName.innerHTML = `Taddle Quest`;
                setP("Taddle Quest es un juego de rol con muchas espadas<br>y magia Su jefe es el malvado mago Aranbura.");
            }
            // Step 10
            else if(cont == 10) {
                removeHTML();
                fight.levelUp(main.brave, "two", main.braveGashat);
                levelUpAnima(main.brave, "two");
            }
            // Step 11
            else if(cont == 11) {
                hablar(main.exAid, "Vale");
            }
            // Step 12
            else if(cont == 12) { 
                gameImg.innerHTML = setImg(`Mighty Action X`, "./media/img/gashats/gashatExAid.png");
                statusName.innerHTML = `Mighty Action X`;
                setP("Mighty Action X es un juego de plataformas de acción<br>en 2D protagonizado por Mighty<br>uno de los jefes es un villano Count Salty.");
            }
            // Step 13
            else if(cont == 13) {
                removeHTML();
                fight.levelUp(main.exAid, "two", main.exAidGashat);
                levelUpAnima(main.exAid, "two");
                // Step 14
                body.onkeydown = ``;
                main.readyStart();
            }
        };
    };
};

export const endIntroRobot = () => {
    gsap.set(exAidDom, {
        opacity: 1,
        display: "block"
    })
    gsap.set(braveDom, {
        opacity: 1,
        display: "block"
    })
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1
            if(cont == 1) {
                gsap.to(exAidDom, {
                    x: "650%",
                    y: 0,
                    duration: 3
                });
                hablar(main.exAid, "Este es mio");
            }
            // Step 2
            else if(cont == 2) {
                removeHTML();
                gsap.set(gashatRecom, {
                    display: "none"
                });
                gameImg.innerHTML = setImg("Robot Gashat", `./media/img/gashats/gashatRobot.png`);
                statusName.innerText = `Gekitotsu Robots`;
                setP(`Ex-Aid obtuvo el Gekitotsu Robots Gashat`);
            }
            // Step 3
            else if(cont == 3) {
                removeHTML();
                main.pushKey("Music");
                setP(`<a href = "./index.html">Click aqui para volver al inicio</a>`);
            };
        };
    };
};

export const introMusic = () => {
    fight.levelUp(main.exAid, "two", main.exAidGashat);
    fight.levelUp(main.brave, "two", main.braveGashat);
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1
            if(cont == 1) {
                gsap.to(exAidDom, {
                    x: "100%",
                    duration: 3
                });
                gsap.to(braveDom, {
                    x: "250%",
                    duration: 3
                });
                hablar(main.exAid, "¿Este es tu mundo?");
            }
            // Step 2
            else if(cont == 2) {
                hablar(main.brave, "Si, aqui precisamente fue<br> mi pelea con Arambura");
            }
            // Step 3
            else if(cont == 3) {
                hablar(main.exAid, "Aram....que?")
            }
            // Step 4
            else if(cont == 4) {
                hablar(main.brave, "Olvidalo")
            }
            // Step 5
            else if(cont == 5) {
                removeHTML();
                gsap.to(musicDom, {
                    x: "-300%",
                    duration: 2
                });
                gsap.to(aramburaVirusDom, {
                    x: "-260%",
                    duration: 2
                });
                gsap.to(revolVirusDom, {
                    x: "-100%",
                    duration: 2
                });
            }
            // Step 6
            else if(cont == 6) {
                hablar(main.brave, "Utiliza el gashat que obtuvimos");
            }
            // Step 7
            else if(cont == 7) {
                hablar(main.exAid, "Vale");
            }
            // Step 8
            else if(cont == 8) {
                gameImg.innerHTML = setImg("Robot Gashat", `./media/img/gashats/gashatRobot.png`);
                statusName.innerText = `Gekitotsu Robots`;
                setP(`Gekitotsu Robots es un juego basado<br>en peleas de robots`)
            }
            // Step 9
            else if(cont == 9) {
                removeHTML();
                fight.levelUp(main.exAid, "three", main.robotGashat);
                levelUpAnima(main.exAid, "three")
                // Step 10
                body.onkeydown = ``;
                main.readyStart();
            }
        };
    };
}

export const endIntroMusic = () => {
    gsap.set(exAidDom, {
        opacity: 1,
        display: "block"
    })
    gsap.set(braveDom, {
        opacity: 1,
        display: "block"
    })
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1
            if(cont == 1) {
                hablar(main.brave, "Supongo que este es mio");
            }
            // Step 2
            else if(cont == 2) {
                removeHTML();
                gsap.to(braveDom, {
                    x: "650%",
                    duration: 3
                });
            }
            // Step 3
            else if(cont == 3) {
                gsap.set(gashatRecom, {
                    display: "none"
                });
                gameImg.innerHTML = setImg("DoReMiFa Beat Gashat", `./media/img/gashats/gashatMusic.png`);
                statusName.innerText = `DoReMiFa Beat`;
                setP("Brave obtuvo el DoReMiFa Beat Gashat");
            }
            // Step 4
            else if(cont == 4) {
                removeHTML();
                main.pushKey(`Jet`);
                setP(`<a href = "./index.html">Click aqui para volver al inicio</a>`);
            }
        };
    };
}

export const introJet = () => {
    gsap.set(jetDom, {
        y: "-300%",
        x: "-200%"
    });
    gsap.set(saltyVirusDom, {
        y: "-20%"
    });
    gsap.set(revolVirusDom, {
        width: "6.5%",
        y: "40%"
    });
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1
            if(cont == 1) {
                gsap.to(snipeDom, {
                    x: "280%",
                    duration: 3
                });
                gsap.to(lazerDom, {
                    x: "100%",
                    duration: 2
                });
                hablar(main.lazer, "¿Gashats?");
            }
            // Step 2
            else if(cont == 2) {
                hablar(main.snipe, "Nos dijo que estan basados en nuestros mundos");
            }
            // Step 3
            else if(cont == 3) {
                hablar(main.snipe, "Que los 10 reunidos pueden reiniciar<br>nuestros mundos");
            }
            // Step 4
            else if(cont == 4) {
                hablar(main.lazer, "¿Para que queremos reiniciar nuestros mundos?");
            }
            // Step 5
            else if(cont == 5) {
                hablar(main.snipe, "No quisieras cambiar... ciertos <br>acontencimientos que ocurrieron");
            }
            // Step 6
            else if(cont == 6) {
                hablar(main.lazer, "Supongo que si");
            }
            // Step 7
            else if(cont == 7) {
                removeHTML();
                hit(main.lazer);
                hit(main.snipe);
                gsap.to(lazerDom, {
                    x: "90%",
                });
                gsap.to(snipeDom, {
                    x: "270%",
                });
                gsap.to(jetDom, {
                    y: 0,
                    duration: 2.7
                });
                gsap.to(saltyVirusDom, {
                    x: "-150%",
                    duration: 2
                });
                gsap.to(revolVirusDom, {
                    x: "-50%",
                    duration: 2
                });
            }
            // Step 8
            else if(cont == 8) {
                gameImg.innerHTML = setImg("Snipe Gashat", `./media/img/gashats/gashatSnipe.png`);
                statusName.innerText = `Bang Bang Shooting`;
                setP(`Bang Bang Shooting es un juego de disparos<br> que cuenta la historia de un soldado desertor<br>El jefe final es Revol.`)
            }
            // Step 9
            else if(cont == 9) {
                gameImg.innerHTML = setImg("Lazer Gashat", `./media/img/gashats/gashatLazer.png`);
                statusName.innerText = `Bakusou Bike`;
                setP(`Bakusou Bike es un juego de carreras<br>sin reglas de ningun tipo<br>El jefe final es Motors`);
            }
            // Step 10
            else if(cont == 10) {
                removeHTML();
                fight.levelUp(main.snipe, "two", main.snipeGashat);
                levelUpAnima(main.snipe, "two");
                setTimeout(() => {
                    fight.levelUp(main.lazer, "two", main.lazerGashat);
                    levelUpAnima(main.lazer, "two");
                }, 500);
            }
            // Step 11
            else if(cont == 11) {
                gsap.to(lazerDom, {
                    y: "40%",
                    duration: .51
                });
                gsap.to(snipeDom, {
                    y: "-20%",
                    duration: 1.5
                });
                hablar(main.snipe, "¿Por que eres una moto?");
            }
            // Step 12
            else if(cont == 12) {
                hablar(main.lazer, "No preguntes");
                // Step 13
                body.onkeydown = ``;
                main.readyStart();
            }
        };
    };
};

export const endIntroJet = () => {
    gsap.set(braveDom, {
        opacity: 1,
        display: "block"
    })
    gsap.set(lazerDom, {
        opacity: 1,
        display: "block"
    })
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1 
            if(cont == 1) {
                gsap.to(snipeDom,{
                    x: "650%",
                    duration: 2
                });
            }
            // Step 2
            else if(cont == 2) {
                gsap.set(gashatRecom, {
                    display: "none"
                });
                gameImg.innerHTML = setImg(`Jet Combat Gashat`, "./media/img/gashats/gashatJet.png");
                statusName.innerText = "Jet Combat";
                setP(`Snipe obtuvo el Jet Combat gashat`);
            }
            // Step 3
            else if(cont == 3) {
                removeHTML();
                main.pushKey(`Giri`);
                setP(`<a href = "./index.html">Click aqui para volver al inicio</a>`);
            };
        }
    }
};

export const introGiri = () => {
    fight.levelUp(main.snipe, "two", main.snipeGashat);
    fight.levelUp(main.lazer, "two", main.lazerGashat);
    fight.levelUp(main.brave, "two", main.braveGashat);
    gsap.set(motorsDom, {
        width: "8%",
        x: "-50%"
    });
    gsap.set(motorsVirusDom, {
        width: "10.5%"
    });
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1
            if(cont == 1) {
                gsap.to(snipeDom, {
                    x: "200%",
                    duration: 1.5
                });
                gsap.to(lazerDom, {
                    x: "50%",
                    duration: 1.5
                })
                hablar(main.lazer, "¿Como sigues vivo?");
            }
            // Step 2
            else if(cont == 2) {
                removeHTML();
                gsap.to(lazerDom, {
                    x: "400%",
                    duration: 1.5
                });
                gsap.to(giriDom, {
                    x: "-1200%",
                    duration: 0.8,
                    delay: 1.5
                });
                gsap.set(giriDom, {
                    x: "100%",
                    delay: 2.3
                });
                gsap.to(giriDom, {
                    x: "-200%",
                    duration: 1,
                    delay: 2.4
                });
                gsap.to(lazerDom, {
                    x: "390%",
                    duration: 0.5,
                    delay: 1.8
                });
                setTimeout(() => {
                    hit(main.lazer);
                }, 1800);
                gsap.to(snipeDom, {
                    x: "190%",
                    duration: 0.5,
                    delay: 2
                });
                setTimeout(() => {
                    hit(main.snipe);
                }, 2000);
            }
            // Step 3
            else if(cont == 3) {
                hablar(main.lazer, "Ese deberia de ser el mio");
            }
            // Step 4
            else if(cont == 4) {
                gsap.to(giriDom, {
                    x: "-350%",
                    duration: 1,
                });
                gsap.to(motorsDom, {
                    x: "-200%",
                    duration: 1,
                });
                gsap.to(aramburaVirusDom, {
                    x: "-80%",
                    duration: 1,
                });
                gsap.to(motorsVirusDom, {
                    x: "-170%",
                    duration: 1,
                });
                gsap.to(lazerDom, {
                    x: "300%",
                    duration: 1.5,
                    delay: 0.5
                });
            }
            // Step 5
            else if(cont == 5) {
                hablar(main.snipe, "Creo que son muchos, ¿no?");
            }
            // Step 6
            else if(cont == 6) {
                gsap.to(braveDom, {
                    x: "250%",
                    duration: 2
                });
                hablar(main.brave, "¿Necesitan una mano?");
            }
            // Step 7
            else if(cont == 7) {
                hablar(main.lazer, "Vale, se los dejo a ustedes");
            }
            // Step 8
            else if(cont == 8) {
                gsap.to(lazerDom, {
                    x: "50%",
                    duration: 1.5
                });
                gsap.to(snipeDom, {
                    x: "250%",
                    duration: 1.5
                });
                gsap.to(braveDom, {
                    x: "400%",
                    duration: 1.5
                });
                gameImg.innerHTML = setImg(`DoReMiFa Beat Gashat`, "./media/img/gashats/gashatMusic.png");
                statusName.innerText = "DoReMiFa Beat";
                setP(`DoReMifa Beat es un juego de ritmo<br>donde el jugador se mueve al ritmo del juego`);
            }
            // Step 9
            else if(cont == 9) {
                gameImg.innerHTML = setImg(`Jet Combat Gashat`, "./media/img/gashats/gashatJet.png");
                statusName.innerText = "Jet Combat";
                setP(`Jet Combat es un juego de disparos aéreos<br>en el que el usuario<br>controla un avión de combate`);
            }
            // Step 10 
            else if(cont == 10) {
                removeHTML();
                fight.levelUp(main.brave, "three", main.musicGashat);
                levelUpAnima(main.brave, "three");
                setTimeout(() => {
                    fight.levelUp(main.snipe, "three", main.jetGashat);
                    levelUpAnima(main.snipe, "three");
                }, 500);
                gsap.set(snipeDom, {
                    width: "9.5%",
                    x: "210%",
                    delay: 1
                });
                // Step 11
                body.onkeydown = ``;
                main.readyStart();
            };
        };
    }; 
};

export const endIntroGiri = () => {
    gsap.set(snipeDom, {
        opacity: 1,
        display: "block"
    })
    gsap.set(braveDom, {
        opacity: 1,
        display: "block"
    })
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1
            if(cont == 1) {
                gsap.to(motorsVirusDom, {
                    x: "-100%",
                    duration: 1.2
                });
                setTimeout(() => {
                    hit(main.virusMotors);
                    gameOver(main.virusMotors);
                }, 1400);
                gsap.to(lazerDom, {
                    x: "500%",
                    duration: 0.8,
                    delay: 1.2
                });
            }
            // Step 2
            else if(cont == 2) {
                gsap.set(lazerDom, {
                    scaleX: 1
                });
                gsap.set(gashatRecom, {
                    display: "none"
                });
                gameImg.innerHTML = setImg(`Giri Giri Chambara gashat`, "./media/img/gashats/gashatGiri.png");
                statusName.innerText = "Giri Giri Chambara";
                setP(`Lazer obtuvo el Giri Giri Chambara gashat`);
            }
            // Step 3
            else if(cont == 3) {
                hablar(main.brave, "¿Por que es una moto?");
            }
            // Step 4
            else if(cont == 4) {
                hablar(main.snipe, "No preguntes");
            }
            // Step 5
            else if(cont == 5) {
                removeHTML();
                main.pushKey(`Sport`);
                setP(`<a href = "./index.html">Click aqui para volver al inicio</a>`);
            };
        };
    };
};

export const introSports = () => {
    fight.levelUp(main.exAid, "two", main.exAidGashat);
    fight.levelUp(main.brave, "two", main.braveGashat);
    fight.levelUp(main.snipe, "two", main.snipeGashat);
    gsap.set(exAidDom, {
        scaleX: -1,
        x: "400%",
    });
    gsap.set(braveDom, {
        scaleX: -1,
        x: "530%",
    });
    gsap.set(lazerDom, {
        width: "9%"
    });
    gsap.set(genmDom, {
        x: "1300%"
    });
    gsap.set(saltyVirusDom, {
        width: "7%",
        y: "-50%"
    });
    gsap.set(revolVirusDom, {
        width: "6.5%",
        y: "-60%"
    });
    gsap.set(aramburaVirusDom, {
        width: "6.5%",
        y: "30%"
    });
    gsap.set(motorsVirusDom, {
        width: "11%",
        y: 0
    });
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1 
            if(cont == 1) {
                gsap.to(snipeDom, {
                    x: "200%",
                    duration: 2
                });
                gsap.to(lazerDom, {
                    x: "50%",
                    duration: 2
                });
                hablar(main.exAid, "¿Tuvieron suerte con el penultimo gashat?");
            }
            // Step 2
            else if(cont == 2) {
                hablar(main.snipe, "No logramos encontarlo");
            }
            // Step 3
            else if(cont == 3) {
                hablar(main.lazer, "Normalmente los gashats vienen<br>hacia nosotros, ¿no?");
            }
            // Step 4
            else if(cont == 4) {
                removeHTML();
                gsap.set(exAidDom, {
                    scaleX: 1
                });
                gsap.set(braveDom, {
                    scaleX: 1
                });
                gsap.to(genmDom, {
                    x: "1000%",
                    duration: 2
                });
            }
            // Step 5
            else if(cont == 5) {
                gameImg.innerHTML = setImg(`Shakariki Sports`, "./media/img/gashats/gashatSport.png");
                statusName.innerText = "Shakariki Sports";
                setP("Shakariki Sports es un juego de ciclismo");
            }
            // Step 6
            else if(cont == 6) {
                removeHTML();
                levelUpGenm(main.genmSports, "three");
                gsap.set(genmDom, {
                    width: "8.5%",
                    x: "941%",
                    delay: 1
                });
            }
            // Step 7
            else if(cont == 7) {
                hablar(main.brave, "Era de esperarse");
                gsap.to(exAidDom, {
                    x: "530%",
                    duration: 1
                });
                gsap.to(braveDom, {
                    x: "370%",
                    duration: 1
                });
                gsap.to(snipeDom, {
                    x: "220%",
                    duration: 1
                });
            }
            // Step 8
            else if(cont == 8) {
                gameImg.innerHTML = setImg(`Giri Giri Chambara Gashat`, "./media/img/gashats/gashatGiri.png");
                statusName.innerText = "Giri Giri Chambara";
                setP(`Giri Giri Chambara es un juego de<br>lucha con espada samurái`);
            }
            // Step 9
            else if(cont == 9) {
                removeHTML();
                fight.levelUp(main.exAid, "three", main.robotGashat);
                levelUpAnima(main.exAid, "three");
                setTimeout(() => {
                    fight.levelUp(main.brave, "three", main.musicGashat);
                    levelUpAnima(main.brave, "three");
                }, 500);
                setTimeout(() => {
                    fight.levelUp(main.snipe, "three", main.jetGashat);
                    levelUpAnima(main.snipe, "three");
                }, 1000);
                gsap.set(snipeDom, {
                    width: "9.7%",
                    x: "180%",
                    delay: 1.5
                });
                setTimeout(() => {
                    fight.levelUp(main.lazer, "two", main.lazerGashat);
                    fight.levelUp(main.lazer, "three", main.giriGashat);
                    levelUpAnima(main.lazer, "three");
                }, 1500);
                gsap.set(lazerDom, {
                    width: "8.2%",
                    x: "55%",
                    delay: 2
                });
            }
            // Step 10
            else if(cont == 10) {
                gsap.to(braveDom, {
                    y: "30%",
                    x: "360%",
                    duration: 2
                });
                gsap.to(snipeDom, {
                    y: "-60%",
                    x: "210%",
                    duration: 2
                });
                gsap.to(exAidDom, {
                    x: "480%",
                    y: "-30%",
                    duration: 2
                });
                gsap.to(lazerDom, {
                    x: "130%",
                    duration: 2
                });
            }
            // Step 11
            else if(cont == 11) {
                hablar(main.lazer, "Esto deberia de ser facil");
            }
            // Step 12
            else if(cont == 12) {
                removeHTML();
                gsap.to(saltyVirusDom, {
                    x: "-380%",
                    duration: 1.6
                });
                gsap.to(revolVirusDom, {
                    x: "-220%",
                    duration: 1.2
                });
                gsap.to(aramburaVirusDom, {
                    x: "-320%",
                    duration: 1.4
                });
                gsap.to(motorsVirusDom, {
                    x: "-20%",
                    duration: 1
                });
                gsap.to(genmDom, {
                    x: "680%",
                    duration: 2
                });
            }
            // Step 13
            else if(cont == 13) {
                hablar(main.snipe, "No tan facil");
            }
            // Step 14
            else if(cont == 14) {
                hablar(main.exAid, "Vamos a completar este nivel");
                // Step 15
                body.onkeydown = ``;
                main.readyStart();
            }
        };  
    };
};

export const endIntroSports = () => {
    gsap.set(exAidDom, {
        opacity: 1,
        display: "block"
    })
    gsap.set(lazerDom, {
        opacity: 1,
        display: "block"
    })
    gsap.set(snipeDom, {
        opacity: 1,
        display: "block"
    })
    gsap.set(braveDom, {
        opacity: 1,
        display: "block"
    })
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1
            if(cont == 1) {
                hablar(main.brave, "¿Esto de igual manera no fue muy facil?");
            }
            // Step 2
            else if(cont == 2) {
                hablar(main.snipe, "Deberiamos tener cuidado");
            }
            // Step 3
            else if(cont == 3) {
                removeHTML();
                gsap.to(exAidDom, {
                    x: "610%",
                    y: "5%",
                    duration: 1.5
                });
            }
            // Step 4
            else if(cont == 4) {
                gsap.set(gashatRecom, {
                    display: "none"
                })
                gameImg.innerHTML = setImg(`Shakariki Sports`, "./media/img/gashats/gashatSport.png");
                statusName.innerText = "Shakariki Sports";
                setP("Ex-Aid obtuvo el Shakariki Sports Gashat");
            }
            // Step 5
            else if(cont == 5) {
                hablar(main.exAid, "Aqui hay algo más");
            }
            // Step 6
            else if(cont == 6) {
                removeHTML();
                main.pushKey("Dragon");
                setP(`<a href = "./index.html">Click aqui para volver al inicio</a>`);
            }
        };
    };
};

export const introDragon = () => {
    gsap.set(aramburaDom, {
        width: "11%",
        y: "-60%"
    });
    gsap.set(revolDom, {
        y: "30%"
    });
    fight.levelUp(main.exAid, "three", main.robotGashat);
    gsap.set(exAidDom, {
        x: "610%",
        y: "5%",
    });
    gsap.set(braveDom, {
        y: "30%",
        x: "360%",
    });
    gsap.set(snipeDom, {
        width: "9.7%",
        y: "-60%",
        x: "210%",
    });
    gsap.set(lazerDom, {
        width: "8.2%",
        x: "130%",
    });
    // Enter 
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1
            if(cont == 1) {
                gameImg.innerHTML = setImg(`Dragon Knight Hunter Z`, "./media/img/gashats/gashatDragon.webp");
                statusName.innerHTML = `Dragon Knight<br>Hunter Z`;
                setP("Ex-Aid obtuvo el<br>Dragon Knight Hunter Z Gashat");
            }
            // Step 2
            else if(cont == 2) {
                hablar(main.exAid, "¿Por que nos dejo esto?");
            }
            // Step 3
            else if(cont == 3) {
                removeHTML();
                main.exAid.img = "./media/img/kamen-rider/ex-aid-level-one.png";
                fight.levelUp(main.exAid, "one");
                levelUpAnima(main.exAid, "one");
                main.exAid.ataques.pop();
                setTimeout(() => {
                    fight.levelUp(main.brave, "one");
                    levelUpAnima(main.brave, "one");
                }, 500);
                setTimeout(() => {
                    fight.levelUp(main.snipe, "one");
                    levelUpAnima(main.snipe, "one");
                }, 1000);
                gsap.set(snipeDom, {
                    width: "7.5%",
                    x: "275%",
                    delay: 1.5
                });
                setTimeout(() => {
                    fight.levelUp(main.lazer, "one");
                    levelUpAnima(main.lazer, "one");
                }, 1500);
                gsap.set(lazerDom, {
                    width: "9%",
                    x: "118%",
                    delay: 2
                });
            }
            // Step 4
            else if(cont == 4) {
                hablar(main.lazer, "Con esto tenemos los 10, ¿no?");
            }
            // Step 5
            else if(cont == 5) {
                removeHTML();
                gsap.to(saltyDom, {
                    x: "-130%",
                    duration: 2
                });
                gsap.to(aramburaDom, {
                    x: "-40%",
                    duration: 1
                })
            }
            // Step 6
            else if(cont == 6) {
                hablar(main.brave, "¿Como sigue vivo?");
            }
            // Step 7
            else if(cont == 7) {
                hablar(main.exAid, "Yo me pregunto lo mismo");
            }
            // Step 8
            else if(cont == 8) {
                removeHTML();
                gsap.to(saltyDom, {
                    x: "-240%",
                    duration: 2
                });
                gsap.to(aramburaDom, {
                    x: "-130%",
                    duration: 2
                })
                gsap.to(revolDom, {
                    x: "-130%",
                    duration: 2
                })
                gsap.to(motorsDom, {
                    x: "-40%",
                    duration: 2
                })
                gsap.to(exAidDom, {
                    x: "480%",
                    duration: 1.5,
                    delay: 1
                }) 
                gsap.to(braveDom, {
                    x: "350%",
                    duration: 0.8,
                    delay: 1.3
                }) 
            }
            // Step 9
            else if(cont == 9) {
                hablar(main.snipe, "¿Tendra que ver con eso del<br>reinicio de los mundos?");
            }
            // Step 10
            else if(cont == 10) {
                hablar(main.lazer, "Acabemos con esto rapido");
            }
            // Step 11
            else if(cont == 11) {
                main.exAid.dom.children[8].children[0].outerHTML = `<img src="./media/img/gashats/ex-aid-dragon.jpg" alt="">`;
                main.brave.dom.children[8].children[0].outerHTML = `<img src="./media/img/gashats/brave-dragon.jpg" alt="">`;
                main.snipe.dom.children[8].children[0].outerHTML = `<img src="./media/img/gashats/snipe-dragon.jpg" alt="">`;
                main.lazer.dom.children[8].children[0].outerHTML = `<img src="./media/img/gashats/lazer-dragon.jpg" alt="">`;
                gameImg.innerHTML = setImg(`Dragon Knight Hunter Z`, "./media/img/gashats/gashatDragon.webp");
                statusName.innerHTML = `Dragon Knight<br>Hunter Z`;
                setP("Drago Knight Hunter Z es un juego de combate<br>de lucha multijugador con capacidad<br>para hasta cuatro jugadores.");
            }
            // Step 12
            else if(cont == 12) {
                removeHTML();
                fight.levelUp(main.exAid, "two", main.exAidGashat);
                fight.levelUp(main.exAid, "five", main.dragonExAidGashat);
                levelUpAnima(main.exAid, "five");
                gsap.set(exAidDom, {
                    width: "10%",
                    x: "380%",
                    delay: 0.5
                })
                setTimeout(() => {
                    fight.levelUp(main.brave, "two", main.braveGashat);
                    fight.levelUp(main.brave, "five", main.dragonBraveGashat);
                    levelUpAnima(main.brave, "five");
                }, 500);
                gsap.set(braveDom, {
                    width: "8.5%",
                    x: "328%",
                    delay: 2
                })
                setTimeout(() => {
                    fight.levelUp(main.snipe, "two", main.snipeGashat);
                    fight.levelUp(main.snipe, "five", main.dragonSnipeGashat);
                    levelUpAnima(main.snipe, "five");
                }, 1000);
                gsap.set(snipeDom, {
                    width: "8.5%",
                    x: "240%",
                    delay: 1.5
                });
                setTimeout(() => {
                    fight.levelUp(main.lazer, "two", main.lazerGashat);
                    fight.levelUp(main.lazer, "five", main.dragonLazerGashat);
                    levelUpAnima(main.lazer, "five");
                }, 1500);
                // Step 13
                body.onkeydown = ``;
                main.readyStart();
            }
        };
    };
};

export const endIntroDragon = () => {
    gsap.set(exAidDom, {
        opacity: 1,
        display: "block"
    })
    gsap.set(lazerDom, {
        opacity: 1,
        display: "block"
    })
    gsap.set(snipeDom, {
        opacity: 1,
        display: "block"
    })
    gsap.set(braveDom, {
        opacity: 1,
        display: "block"
    })
    // Enter
    let cont = 0;
    body.onkeydown = (e) => {
        if(e.key == "Enter") {
            cont++;
            // Step 1
            if(cont == 1) {
                hablar(main.exAid, "Con esto ya esta todo completo");
            }
            // Step 2
            else if(cont == 2) {
                hablar(main.genmBugster, "Todo esta completo");
            }
            else if(cont == 3) {
                setP(`<a href = "./index.html">Click aqui para volver al inicio</a>`);
            }
        };
    };
};