// Importar animaciones
import * as dom from "./dom.js";
// Importar clases
import * as clases from "./clases.js";
// Importar funciones
import * as funciones from "./funciones.js";
// Importar pelea
import * as fight from "./fight.js";

// Ataques de los riders
const hammer = new clases.Ataque(`Breaker`, "./media/icons/hammer-drop.png", 10, "Ataque con un 10% de probabilidades de aturdir al enemigo.", fight.hammerAttack, "enemy", false, 0);
const sword = new clases.Ataque(`Espada`, "./media/icons/broadsword.png", 10, "Ataque que provoca sangrado[5] en el enemigo, dura 3 turnos.", fight.swordAttack, "enemy", false, 0);
const gun = new clases.Ataque(`Magnum`, "./media/icons/desert-eagle.png", 10, "Ataque con 30% de probabilidades de hacer el doble de daño.", fight.magnumAttack, "enemy", false, 0);
const claw = new clases.Ataque(`Claw`, "./media/icons/tyre.png", 10, "Ataque capaz de repartir el daño en dos enemigos[5][5].", fight.clawAttack, "enemy", false, 0);

const blockRandom = new clases.Ataque(`Bloque Random`, "./media/icons/perspective-dice-six-faces-random.png", "?", "Rompe un bloque aleatorio y otorga a un player inmunidad o vida.", fight.blockAttack, "ally", false, 0);
const shield = new clases.Ataque(`Escudo`, "./media/icons/police-badge.png", "20%", "Otorga un escudo que protege un 20% de daño.", fight.shieldAttack, "ally", false, 0);
const aim = new clases.Ataque(`Punteria`, "./media/icons/crosshair.png", "20%", "Aumenta un 20% el daño realizado.", fight.aimAttack, "ally", false, 0);
const trophy = new clases.Ataque(`Recompensa veloz`, "./media/icons/trophy-cup.png", "20%", "Aumenta un 20% la salud del aliado.", fight.trophyAttack, "ally", false, 0);

const robotGrab = new clases.Ataque(`Garra Robotica`, "./media/icons/robot-grab.png", 50, "Realiza un ataque super fuerte[50].", fight.robotAttack, "enemy", true, 60);
const musicParty = new clases.Ataque(`Fiesta de baile`, "./media/icons/boombox.png", "+50", "Aumenta la vida de todos tus aliados[+50]", fight.musicAttack, "ally", true, 50);
const jetGun = new clases.Ataque(`Metralla`, "./media/icons/chaingun.png", 20, "Haz 20 de daño a un objetivo seleccionado y 10 a todos los enemigos restantes.", fight.jetgunAttack, "enemy", true, 50);
const katana = new clases.Ataque(`Sin salvación`, "./media/icons/katana.png", 15, "Ataque que provoca un sangrado[10] en el enemigo, dura 5 turnos.", fight.katanaAttack, "enemy", true, 60);

const dragonFire = new clases.Ataque(`Aliento de Dragon`, "./media/icons/dragon-breath.png", 50, "Ataca a todos el equipo enemigo", fight.dragonFireAttack, "enemy", true, 50);
const dragonShield = new clases.Ataque(`Caballeria`, "./media/icons/dragon-shield.png", "?", "Otorga inmunidad a todo tu equipo", fight.dragonBladeAttack, "ally", true, 60);
const dragonGun = new clases.Ataque(`Flecha decisiva`, "./media/icons/flaming-arrow.png", 50, "Ataque con 50% de posibilidades de triplicar el daño", fight.dragonGunAttack, "enemy", true, 50);
const dragonClaw = new clases.Ataque(`Garras de dragon`, "./media/icons/flaming-claw.png", 20, "Aturde a tus enemigos", fight.dragonClawAttack, "enemy", true, 60);

// Riders
export const exAid = new clases.Rider(`Ex-aid`, "./media/img/kamen-rider/ex-aid-level-one.png", "./media/img/kamen-rider/ex-aid-level-two.png", "./media/img/kamen-rider/ex-aid-level-three.png", "./media/img/kamen-rider/ex-aid-level-five.png", 100, 100, 1, [hammer], [], 0, dom.exAidDom, true, false, false, 0, false, false, []);
export const brave = new clases.Rider(`Brave`, "./media/img/kamen-rider/brave-level-one.png", "./media/img/kamen-rider/brave-level-two.png", "./media/img/kamen-rider/brave-level-three.png", "./media/img/kamen-rider/brave-level-five.png", 100, 100, 1, [sword], [], 0, dom.braveDom, true, false, false, 0, false, false, []);
export const snipe = new clases.Rider(`Snipe`, "./media/img/kamen-rider/snipe-level-one.png", "./media/img/kamen-rider/snipe-level-two.png", "./media/img/kamen-rider/snipe-level-three.png", "./media/img/kamen-rider/snipe-level-five.png", 100, 100, 1, [gun], [], 0, dom.snipeDom, true, false, false, 0, false, false, []);
export const lazer = new clases.Rider(`Lazer`, "./media/img/kamen-rider/lazer-level-one.png", "./media/img/kamen-rider/lazer-level-two.png", "./media/img/kamen-rider/lazer-level-three.png", "./media/img/kamen-rider/lazer-level-five.png", 100, 100, 1, [claw], [], 0, dom.lazerDom, true, false, false, 0, false, false, []);


// Gashat
export const exAidGashat = new clases.Gashat(`Mighty Action X`, blockRandom);
export const braveGashat = new clases.Gashat(`Taddle Quest`, shield);
export const snipeGashat = new clases.Gashat(`Bang Bang Shooting`, aim);
export const lazerGashat = new clases.Gashat(`Bakusou Bike`, trophy);

export const robotGashat = new clases.Gashat(`Gekitotsu Robots`, robotGrab);
export const musicGashat = new clases.Gashat(`DoReMiFa Beat`, musicParty);
export const jetGashat = new clases.Gashat(`Jet Combat`, jetGun);
export const giriGashat = new clases.Gashat(`Giri Giri Chambara`, katana);

export const dragonExAidGashat = new clases.Gashat(`Drago Knight Hunter Z`, dragonFire);
export const dragonBraveGashat = new clases.Gashat(`Drago Knight Hunter Z`, dragonShield);
export const dragonSnipeGashat = new clases.Gashat(`Drago Knight Hunter Z`, dragonGun);
export const dragonLazerGashat = new clases.Gashat(`Drago Knight Hunter Z`, dragonClaw);

// Ataques 
const punch = new clases.AtaqueBug(`Puño`, 3, "Ataque que realiza 3 de daño.", fight.punchAttack, false, 0);
const kick = new clases.AtaqueBug(`Patada`, 5, "Ataque que realiza 5 de daño.", fight.kickAttack, false, 0);

const magic = new clases.AtaqueBug(`Magia Malgina`, 10, "Realiza 10 de daño a todos los enemigos.", fight.magicAttack, true, 3);
const bullet = new clases.AtaqueBug(`Bala precisa`, 15, "Ataque con un 50% de posibilades de hacer el doble de daño", fight.bulletAttack, true, 3);
const fast = new clases.AtaqueBug(`Velocidad insana`, "+20", "Motors se cura a si mismo", fight.fastAttack, true, 2);

const punchTwo = new clases.AtaqueBug(`Puño`, 15, "Ataque que realiza 15 de daño.", fight.punchTwoAttack, false, 0);

const boss = new clases.AtaqueBug(`Yo soy el jefe`, 100, "Ataque que genera 100 de daño", fight.boss, true, 4);
const wizard = new clases.AtaqueBug(`Ex-Compañerismo`, 30, "Genera 30 de daño a todos los enemigos", fight.wizard, true, 3);
const comander = new clases.AtaqueBug(`Fuera de servicio`, 30, "Hace 30 de daño y aturde al objetivo", fight.comander, true, 2);
const last = new clases.AtaqueBug(`Ultimo esfuerzo`, "+30", "Motors se cura 60hp y al resto de sus aliados, 30hp", fight.last, true, 3);

const punchRobot = new clases.AtaqueBug(`Puño Robot`, 15, "Ataque con 10% de posibilidades de aturdir", fight.punchRobotAttack, false, 0);
const metalRobot = new clases.AtaqueBug(`Metal Pesado`, 25, "Ataque con 100% de posibilidades de aturdir", fight.metalAttack, true, 3);
const autor = new clases.AtaqueBug(`Derechos de autor`, 15, "Reclama su daño realizado y se pasa como vida a un aliado", fight.autorAttack, false, 0);
const partyTime = new clases.AtaqueBug(`Hora de la fiesta`, "+30", "Cura a todo su equipo", fight.partyTimeAttack, true, 3);
const chaingun = new clases.AtaqueBug(`Metralla esparcida`, 5, "Hace daño a todos sus enemigos", fight.gunNoAimAttack, false, 0);
const misile = new clases.AtaqueBug(`Toda la armeria`, 50, "Ataque destructivo que genera 50 de daño", fight.misileAttack, true, 4);
const surprise = new clases.AtaqueBug(`Ataque sorpresa`, "30%", "Ataque que genera 30% de daño de la vida de su objetivo", fight.surpriseAttack, false, 0);
const peace = new clases.AtaqueBug(`Paz interior`, "+100%", "Recupera toda su vida", fight.peaceAttack, true, 6);
const wheel = new clases.AtaqueBug(`Rueda Delantera`, 20, "Puede repartir el daño en dos enemigos y los aturde", fight.wheelAttack, false, 0)
const performance = new clases.AtaqueBug(`Alto rendimiento`, 30, "Daña al enemigo y cura al resto de su equipo", fight.performanceAttack, true, 2);

// Bugster
export const salty = new clases.Bugster(`Salty`, "./media/img/bugster/salty.png", 100, 100, 1, [punch, kick], dom.saltyDom, true, false, false, 0, false, false, [], 0);
export const arambura = new clases.Bugster(`Arambura`, "./media/img/bugster/arambura.png", 100, 100, 1, [punch, magic], dom.aramburaDom, true, false, false, 0, false, false, [], 0);
export const revol = new clases.Bugster(`Revol`, "./media/img/bugster/revol.png", 100, 100, 1, [kick, bullet], dom.revolDom, true, false, false, 0, false, false, [], 0);
export const motors = new clases.Bugster(`Motors`, "./media/img/bugster/motors.png", 100, 100, 1, [kick, fast], dom.motorsDom, true, false, false, 0, false, false, [], 0);

export const robot = new clases.Bugster(`Collabos Bugster Robot`, "./media/img/bugster/robot-bugster.png", 180, 180, 3, [punchRobot, metalRobot], dom.robotDom, true, false, false, 0, false, false, [], 0);
export const dj = new clases.Bugster(`Collabos Bugster Beat`, "./media/img/bugster/music-bugster.png", 180, 180, 3, [autor, partyTime], dom.musicDom, true, false, false, 0, false, false, [], 0);
export const jetSoldier = new clases.Bugster(`Collabos Bugster Jet`, "./media/img/bugster/jet-bugster.png", 180, 180, 3, [chaingun, misile], dom.jetDom, true, false, false, 0, false, false, [], 0);
export const giriSamurai = new clases.Bugster(`Collabos Bugster Giri`, "./media/img/bugster/giri-bugster.png", 180, 180, 3, [surprise, peace], dom.giriDom, true, false, false, 0, false, false, [], 0);

export const virusSalty = new clases.Bugster(`Virus cocinero`, "./media/img/bugster/virus-salty.png", 50, 50, 1, [punch, kick], dom.saltyVirusDom, true, false, false, 0, false, false, [], 0);
export const virusArambura = new clases.Bugster(`Virus monje`, "./media/img/bugster/virus-arambura.png", 50, 50, 1, [punch, kick], dom.aramburaVirusDom, true, false, false, 0, false, false, [], 0);
export const virusRevol = new clases.Bugster(`Virus soldado`, "./media/img/bugster/virus-revol.png", 50, 50, 1, [punch, kick], dom.revolVirusDom, true, false, false, 0, false, false, [], 0);
export const virusMotors = new clases.Bugster(`Virus motocicleta`, "./media/img/bugster/virus-motors.png", 50, 50, 1, [punch, kick], dom.motorsVirusDom, true, false, false, 0, false, false, [], 0);

// Genm
const bugVisorShot = new clases.AtaqueBug(`Disparo`, 15, "Dispara y genera 15 de daño", fight.shotAttack, false, 0);
const bugVisorChain = new clases.AtaqueBug(`Sierra`, 20, "Ataque con sierra que genera sangrado[5] en el enemigo, dura 3 turnos", fight.chainAttack, true, 3);

export const genmBugster = new clases.Bugster(`Genm`, "./media/img/bugster/genm-level-one.png", 140, 140, 2, [bugVisorShot, bugVisorChain], dom.genmDom, true, false, false, 0, false, false, [], 0);
export const genmSports = new clases.Bugster(`Genm`, "./media/img/bugster/genm-level-three.png", 180, 180, 2, [bugVisorShot, wheel, performance], dom.genmDom, true, false, false, 0, false, false, [], 0);

// Equipos
let teamRider;
let teamBugster;

// Intro
dom.resetdom();

// Dar key
export const pushKey = (nivel) => {
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        if(clave == `nivel ${nivel}`) {
            localStorage.removeItem(`nivel ${nivel}`);
            localStorage.setItem(`nivel ${nivel}`, true);
        };
    };
}; 

// Buscar nivel Actual
const nivelAct = () => {
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        if(clave == "Nivel Actual") {
            if (localStorage.getItem(clave) == "nivel Ex-Aid") {
                dom.introExAid();
                teamRider = [exAid];
                teamBugster = [salty];
                return "Ex-Aid";
            }
            else if (localStorage.getItem(clave) == "nivel Brave") {
                dom.introBrave();
                teamRider = [brave];
                teamBugster = [arambura, virusArambura];
                return "Brave";
            }
            else if(localStorage.getItem(clave) == "nivel Snipe") {
                dom.introSnipe();
                teamRider = [snipe];
                teamBugster = [revol, virusRevol];
                return "Snipe";
            }
            else if(localStorage.getItem(clave) == "nivel Lazer") {
                dom.introLazer();
                teamRider = [lazer, exAid];
                teamBugster = [motors, virusMotors];
                return "Lazer";
            }
            else if(localStorage.getItem(clave) == "nivel Robot") {
                dom.introRobot();
                teamRider = [exAid, brave];
                teamBugster = [robot, virusSalty, virusArambura];
                return "Robot";
            }
            else if(localStorage.getItem(clave) == "nivel Music") {
                dom.introMusic();
                teamRider = [exAid, brave];
                teamBugster = [dj, virusArambura, virusRevol];
                return "Music"; 
            }
            else if(localStorage.getItem(clave) == "nivel Jet") {
                dom.introJet();
                teamRider = [lazer, snipe];
                teamBugster = [jetSoldier, virusRevol, virusSalty];
                return "Jet";
            }
            else if(localStorage.getItem(clave) == "nivel Giri") {
                dom.introGiri();
                teamRider = [snipe, brave];
                teamBugster = [giriSamurai, motors, virusArambura];
                return "Giri";
            }
            else if(localStorage.getItem(clave) == "nivel Sport") {
                dom.introSports();
                teamRider = [exAid, brave, snipe, lazer];
                teamBugster = [genmSports, virusSalty, virusArambura, virusRevol, virusMotors];
                return "Sports";
            }
            else if(localStorage.getItem(clave) == "nivel Dragon") {
                dom.introDragon();
                teamRider = [exAid, brave, snipe, lazer];
                teamBugster = [salty, arambura, revol, motors];
                return "Dragon";
            }
            else if(localStorage.getItem(clave) == "nivel Genm") {
                dom.introDragon();
                teamRider = [genm];
                teamBugster = [salty, arambura, revol, motors];
                return "Dragon";
            }
        };
    };
};

// Nivel Actual
let nivelActual = nivelAct();

// Terminar Nivel
export const endNivelAct = () => {
    // Nivel Ex-Aid
    if(nivelActual == "Ex-Aid") {
        dom.endIntroExAid();
    }
    // Nivel Brave
    else if(nivelActual == "Brave") {
        dom.endIntroBrave();
    }
    // Nivel Snipe
    else if(nivelActual == "Snipe") {
        dom.endIntroSnipe();
    }
    // Nivel Lazer
    else if(nivelActual == "Lazer") {
        dom.endIntroLazer();
    }
    // Nivel Robot
    else if(nivelActual == "Robot") {
        dom.endIntroRobot();
    }
    // Nivel Music
    else if(nivelActual == "Music") {
        dom.endIntroMusic();
    }
    // Nivel Jet
    else if(nivelActual == "Jet") {
        dom.endIntroJet();
    }
    // Nivel Giri
    else if(nivelActual == "Giri") {
        dom.endIntroGiri();
    }
    // Nivel Sports
    else if(nivelActual == "Sports") {
        dom.endIntroSports();
    }
    // Nivel Dragon
    else if(nivelActual == "Dragon") {
        dom.endIntroDragon();
    }
}; 

// Empezar Pelea
const startFight = () => {
    dom.appendDetails(teamRider, teamBugster);
    // Turno de los riders
    funciones.selectPlayer(teamRider, teamBugster);
};

let contLvlLazer = 0;
// "Enter" para empezar
export const readyStart = () => {
    dom.body.onkeydown = (e) => {
        if(e.key == `Enter`) {
            // Nivel Ex-Aid
            if(nivelActual == "Ex-Aid") {
                gsap.to(dom.exAidDom, {
                    x: "400%",
                    duration: 3
                });
                gsap.to(dom.saltyDom, {
                    x: "-300%",
                    duration: 3
                });
            }
            // Nivel Brave
            else if(nivelActual == "Brave") {
                gsap.to(dom.braveDom, {
                    x: "400%",
                    duration: 3
                });
                gsap.to(dom.aramburaDom, {
                    x: "-300%",
                    duration: 3
                });
                gsap.to(dom.aramburaVirusDom, {
                    x: "-350%",
                    duration: 3
                });
            }
            // Nivel Snipe
            else if(nivelActual == "Snipe") {
                gsap.to(dom.revolDom, {
                    x: "-300%",
                    duration: 2
                })
                gsap.to(dom.revolVirusDom, {
                    x: "-300%",
                    duration: 2.5
                });
            }
            // Nivel Lazer
            else if(nivelActual == "Lazer") {
                contLvlLazer++;
                if(contLvlLazer == 1) {
                    gsap.to(dom.exAidDom, {
                        x: "200%",
                        duration: 3
                    });
                    gsap.to(dom.lazerDom, {
                        x: "300%",
                        duration: 3
                    });
                    gsap.to(dom.motorsDom, {
                        x: "-350%",
                        duration: 2
                    });
                    gsap.to(dom.motorsVirusDom, {
                        x: "-110%",
                        duration: 2.5
                    });
                } else {
                    // Pelea
                    teamRider = [lazer, exAid];
                    teamRider.forEach(ply => ply.hp = ply.maxhp);
                    teamRider.forEach(ply => ply.chance = true);
                    teamBugster = [genmBugster];
                    gsap.to(dom.genmDom, {
                        x: "800%",
                        duration: 3
                    });
                };
            }
            // Nivel Robot
            else if(nivelActual == "Robot") {
                gsap.to(dom.exAidDom, {
                    x: "250%",
                    y: "40%",
                    duration: 3
                });
                gsap.to(dom.braveDom, {
                    x: "350%",
                    y: "-50%",
                    duration: 3
                });
                gsap.to(dom.robotDom, {
                    x: "-350%",
                    duration: 3
                });
                gsap.to(dom.saltyVirusDom, {
                    x: "-300%",
                    duration: 3
                });
            }
            // Nivel Music
            else if(nivelActual == "Music") {
                gsap.to(dom.exAidDom, {
                    x: "420%",
                    duration: 2
                }) 
                gsap.to(dom.musicDom, {
                    x: "-350%",
                    duration: 2
                })
                gsap.set(dom.gashatRecom, {
                    x: "-350%"
                });
                gsap.to(dom.aramburaVirusDom, {
                    x: "-350%",
                    duration: 2
                })
                gsap.to(dom.revolVirusDom, {
                    x: "-190%",
                    duration: 2
                })
            }
            else if(nivelActual == "Jet") {
                gsap.set(dom.gashatRecom, {
                    x: "-350%"
                });
                gsap.to(dom.jetDom, {
                    x: "-300%",
                    duration: 2
                });
                gsap.to(dom.saltyVirusDom, {
                    x: "-280%",
                    duration: 2
                });
                gsap.to(dom.revolVirusDom, {
                    x: "-180%",
                    duration: 2
                });
                gsap.to(dom.snipeDom, {
                    x: "420%",
                    y: 0,
                    duration: 2
                });
                gsap.to(dom.lazerDom, {
                    x: "200%",
                    duration: 2
                });
            }
            // Nivel Giri
            else if(nivelActual == "Giri") {
                gsap.to(dom.giriDom, {
                    x: "-380%",
                    duration: 2
                });
                gsap.set(dom.gashatRecom, {
                    x: "-380%",
                });
                gsap.to(dom.motorsDom, {
                    x: "-250%",
                    duration: 2
                });
                gsap.to(dom.aramburaVirusDom, {
                    x: "-140%",
                    duration: 2
                });
                gsap.to(dom.motorsVirusDom, {
                    x: "100%",
                    duration: 1.5
                });
                gsap.to(dom.lazerDom, {
                    x: "-100%",
                    duration: 1.5
                });
                gsap.set(dom.lazerDom, {
                    x: "1100%",
                    scaleX: -1,
                    delay: 1.5
                });
            }
            // Nivel Sports
            else if(nivelActual == "Sports") {
                gsap.set(dom.gashatRecom, {
                    x: "785%"
                });
            }
            // Nivel Dragon
            else if(nivelActual == "Dragon") {
                teamBugster.forEach(bug => {
                    bug.maxhp = 10;
                    bug.hp = bug.maxhp;
                });
                salty.ataques = [punchTwo, boss];
                arambura.ataques = [punchTwo, wizard];
                revol.ataques = [punchTwo, comander];
                motors.ataques = [punchTwo, last];
                gsap.to(dom.saltyDom, {
                    x: "-300%",
                    duration: 1.5
                });
                gsap.to(dom.aramburaDom, {
                    x: "-180%",
                    duration: 1.5
                });
                gsap.to(dom.revolDom, {
                    x: "-160%",
                    duration: 1.5
                });
                gsap.to(dom.motorsDom, {
                    x: "-60%",
                    duration: 1.5
                });
            }
            // "Game Start"
            dom.animationStart();
            // Empezar pelea
            startFight(teamRider, teamBugster);
            // EE
            dom.body.onkeydown = ``;
        } 
    }
}