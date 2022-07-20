// Importar DOM
import * as dom from "./dom.js";

// Elimnar bugster sin vida
export const gameOverBugster = (arrBug) => {
    arrBug.forEach(bugster => {
        if(bugster.hp <= 0) {
            // Animación
            dom.gameOver(bugster);
            // Filter
            let newArrBug = arrBug.filter(busgter => busgter.hp > 0);
            arrBug = newArrBug;
        }
        else if(bugster.hp > 0) {
            let newArrPly = arrBug.filter(player => player.hp > 0);
            arrBug = newArrPly;
        }
    });
    // return
    return arrBug;
}; 

// Elimnar player sin vida
export const gameOverPlayer = (arrPly) => {
    arrPly.forEach(player => {
        if(player.hp <= 0) {
            // Animación
            dom.gameOver(player);
            // Filter
            let newArrPly = arrPly.filter(player => player.hp > 0);
            arrPly = newArrPly;
        }
        else if(player.hp > 0) {
            let newArrPly = arrPly.filter(player => player.hp > 0);
            arrPly = newArrPly;
        }
    });
    // return
    return arrPly;
}; 

// GAME CLEAR
export const gameClear = (arrPly) => {
    dom.animationClear();
};

// ATAQUE PRIMARIO
// Hammer
export const hammerAttack = (player, target, arrPly, arrBug) => {
    let damage = 10;
    // If Increase
    (player.increase > 0) && (damage = increaseEffect(player, damage));
    // If Stunned
    damage = stunnedEffect(player, damage);
    // Restar vida
    target.hp -= damage;
    // Aumentar contador de daño
    player.contDamage += damage;
    // Random
    let aleatorio = Math.ceil(Math.random()*10);
    // Stunned
    (aleatorio == 1) && (target.stunned = true);
    // "HIT" del busgter
    dom.hitOrMiss(target, damage);
};

// Sword
export const swordAttack = (player, target, arrPly, arrBug) => {
    let damage = 10;
    // If Increase
    (player.increase > 0) && (damage = increaseEffect(player, damage));
    // If Stunned
    damage = stunnedEffect(player, damage);
    // Restar vida 
    target.hp -= damage;
    // Aumentar contador de daño
    player.contDamage += damage;
    // Bleeding
    target.bleeding = true;
    target.contBleeding.push({parca:`brave`, turnos:3, daño:5});
    // Limitar bleeding
    let arrVerifBrave = target.contBleeding.filter(blood => blood.parca == "brave");
    if(arrVerifBrave.length > 1) {
        let indexRemove = target.contBleeding.findIndex(blood => blood.parca == "brave" && blood.turnos < 3);
        target.contBleeding.splice(indexRemove, 1);
    };
    // "HIT" del busgter
    dom.hitOrMiss(target, damage);
} 

// Magnum
export const magnumAttack = (player, target, arrPly, arrBug) => {
    let damage = 10;
    // If Increase
    (player.increase > 0) && (damage = increaseEffect(player, damage));
    // If Stunned
    damage = stunnedEffect(player, damage);
    // Effect Magnum
    let aleatorio = Math.ceil(Math.random()*10);
    // If Dupicar
    1 <= aleatorio && aleatorio <= 3 ? damage = damage * 2 : damage = damage;
    // Restar Vida
    if(damage >= 20) {
        target.hp -= damage;
        dom.perfect(target);
        // Aumentar contador de daño
        player.contDamage += damage;
    }
    else {
        target.hp -= damage;
        dom.hitOrMiss(target, damage);
        // Aumentar contador de daño
        player.contDamage += damage;
    }; 
}

// Claw
export const clawAttack = (player, target, arrPly, arrBug) => {
    let damage = 10;
    // If Increase
    (player.increase > 0) && (damage = increaseEffect(player, damage));
    // If Stunned
    damage = stunnedEffect(player, damage);
    // tomar un numero aleatorio
    let aleatorio =  (Math.ceil(Math.random()*(arrBug.length))) - 1;
    // tomar un elemento de mismo indice
    let bugsterSelect = (arrBug[aleatorio]);
    // Restar vida
    target.hp -= (damage / 2);
    bugsterSelect.hp -= (damage / 2);
    // Aumentar contador de daño
    player.contDamage += damage;
    // HIT
    dom.hitOrMiss(target);
    dom.hitOrMiss(bugsterSelect);
}

// ATAQUE SECUNDARIO
// Bloque Random
export const blockAttack = (player, target, arrPly, arrBug) => {
    let aleatorio =  (Math.ceil(Math.random()*10));
    if(1 <= aleatorio && aleatorio <= 2) {
        // Otorgar Inmunidad
        target.immunity = true;
        dom.pushItem(target, 6);
    }
    else {
        // Aumentar Vida
        target.hp += 5;
        dom.pushItem(target, 4);
    };
}

// Shield
export const shieldAttack = (player, target, arrPly, arrBug) => {
    // Poner escudo 
    target.shield = true;
    dom.pushItem(target, 5);
};

// Aim
export const aimAttack = (player, target, arrPly, arrBug) => {
    // Poner aim
    target.increase = (20/100);
    dom.pushItem(target, 7)
};

// Trophy
export const trophyAttack = (player, target, arrPly, arrBug) => {
    // Aumentar vida
    target.hp += (target.hp * (20/100));
    dom.pushItem(target, 4);
};

// ATAQUE FINAL
// Robot Grab
export const robotAttack = (player, target, arrPly, arrBug) => {
    let damage = 50;
    // If Increase
    (player.increase > 0) && (damage = increaseEffect(player, damage));
    // If Stunned
    damage = stunnedEffect(player, damage);
    // Aturdido
    target.stunned = true;
    // Reset Daño
    player.contDamage = 0;
    // Quitar vida
    target.hp -= damage;
    // "HIT" del busgter
    dom.hitOrMiss(target, damage);
}

// Music
export const musicAttack = (player, target, arrPly, arrBug) => {
    // Curar a todos
    arrPly.forEach(ply => {
        ply.hp += 50;
        dom.pushItem(ply, 4)
    });
    // Reset Daño
    player.contDamage = 0;
};

// Jet Gun
export const jetgunAttack = (player, target, arrPly, arrBug) => {
    let damage = 10;
    // If Increase
    (player.increase > 0) && (damage = increaseEffect(player, damage));
    // If Stunned
    damage = stunnedEffect(player, damage);
    // Restar vida
    target.hp -= damage;
    // Resto de los enemigos
    arrBug.forEach(bugster => {
        bugster.hp-= damage;
        dom.hitOrMiss(bugster, damage);
    });
    // Reset Daño
    player.contDamage = 0;
} 

// Katana
export const katanaAttack = (player, target, arrPly, arrBug) => {
    let damage = 15;
    // If Increase
    (player.increase > 0) && (damage = increaseEffect(player, damage));
    // If Stunned
    damage = stunnedEffect(player, damage);
    // Restar vida 
    target.hp -= damage;
    // Reset Daño
    player.contDamage = 0;
    // Bleeding
    target.bleeding = true;
    target.contBleeding.push({parca:`lazer`, turnos:5, daño:10});
    // Limitar bleeding
    let arrVerifBrave = target.contBleeding.filter(blood => blood.parca == "lazer");
    if(arrVerifBrave.length > 1) {
        let indexRemove = target.contBleeding.findIndex(blood => blood.parca == "lazer" && blood.turnos < 5);
        target.contBleeding.splice(indexRemove, 1);
    };
    // "HIT" del busgter
    dom.hitOrMiss(target, damage);
};

// Dragon Fire
export const dragonFireAttack = (player, target, arrPly, arrBug) => {
    let damage = 50;
    // If Increase
    (player.increase > 0) && (damage = increaseEffect(player, damage));
    // If Stunned
    damage = stunnedEffect(player, damage);
    // Reset Daño
    player.contDamage = 0;

    arrBug.forEach(bug => {
        bug.hp -= damage;
        dom.hitOrMiss(bug, damage);
    });
}

// Dragon Blade
export const dragonBladeAttack = (player, target, arrPly, arrBug) => {
    player.contDamage = 0;
    arrPly.forEach(ply => {
        ply.immunity = true;
        dom.pushItem(ply, 6);
    });
}

// Dragon Gun
export const dragonGunAttack = (player, target, arrPly, arrBug) => {
    let damage = 50;
    // If Increase
    (player.increase > 0) && (damage = increaseEffect(player, damage));
    // If Stunned
    damage = stunnedEffect(player, damage);
    // Reset Daño
    player.contDamage = 0;

    let aleatorio = Math.ceil(Math.random()*10);
    1 <= aleatorio && aleatorio <= 5 ? damage = damage * 3 : damage = damage;

    target.hp -= damage;
    dom.hitOrMiss(target, damage);
}

// Dragon Blade
export const dragonClawAttack = (player, target, arrPly, arrBug) => {
    let damage = 20;
    // If Increase
    (player.increase > 0) && (damage = increaseEffect(player, damage));
    // If Stunned
    damage = stunnedEffect(player, damage);
    // Reset Daño
    player.contDamage = 0;

    arrBug.forEach(bug => {
        bug.stunned = true;
        bug.hp -= damage;
        dom.hitOrMiss(bug, damage);
    });
}

// ATAQUES BUGSTER
// Kick
export const kickAttack = (user, target, arrPly, arrBug) => {
    let damage = 5;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));
    // Restar vida 
    target.hp -= damage;
    // "HIT" del player
    dom.hitOrMiss(target, damage);
};

// Punch
export const punchAttack = (user, target, arrPly, arrBug) => {
    let damage = 3;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));
    // Restar vida 
    target.hp -= damage;
    // "HIT" del player
    dom.hitOrMiss(target, damage);
};

// Magic
export const magicAttack = (user, target, arrPly, arrBug) => {
    let damage = 10;
    // Stunned
    damage = stunnedEffect(user, damage);

    // Aumentar contador de turnos
    user.contTurn++;
    if(user.contTurn == 3) {
        arrPly.forEach(ply => {
            // If Shield
            (ply.shield == true) && (damage = shieldEffect(ply, damage));
            // If Inmunity
            (ply.immunity == true) && (damage = immunityEffect(ply, damage));

            // Restar vida
            ply.hp -= damage;
            dom.hitOrMiss(ply, damage);
            // Reset
            user.contTurn = 0;
        });
    };
};

// Bullet
export const bulletAttack = (user, target, arrPly, arrBug) => {
    let damage = 15;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));

    // Aumentar contador de turnos
    user.contTurn++;
    if(user.contTurn == 3) {
        // Aleatorio
        let aleatorio = Math.ceil(Math.random()*10);
        // If Dupicar
        1 <= aleatorio && aleatorio <= 5 ? damage = damage * 2 : damage = damage;
        // Restar Vida
        if(damage >= 30) {
            target.hp -= damage;
            dom.perfect(target);
        }
        else {
            target.hp -= damage;
            dom.hitOrMiss(target, damage);
        }; 
        // Reset
        user.contTurn = 0;
    };
}

// Fast
export const fastAttack = (user, target, arrPly, arrBug) => {
    // Aumentar turnos
    user.contTurn++;
    if(user.contTurn == 2) {
        // Aumentar vida
        user.hp += 20;
        // Reset
        user.contTurn = 0;
    };
};


// Shot
export const shotAttack = (user, target, arrPly, arrBug) =>{ 
    let damage = 15;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));

    // Restar vida
    target.hp -= damage;
    // "HIT"
    dom.hitOrMiss(target, damage);
};

// Chain
export const chainAttack = (user, target, arrPly, arrBug) => {
    let damage = 20;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));

    // Aumentar turnos
    user.contTurn++;
    if(user.contTurn == 3) {
        // Reset 
        user.contTurn = 0;
        // Restar vida
        target.hp -= damage;
        // Bleeding
        target.bleeding = true;
        target.contBleeding.push({parca:`genm`, turnos:3, daño:5});
        // Limitar bleeding
        let arrVerifBrave = target.contBleeding.filter(blood => blood.parca == "genm");
        if(arrVerifBrave.length > 1) {
            let indexRemove = target.contBleeding.findIndex(blood => blood.parca == "genm" && blood.turnos < 3);
            target.contBleeding.splice(indexRemove, 1);
        };
        // "HIT"
        dom.hitOrMiss(target, damage);
    };
};

// Punch Robot
export const punchRobotAttack = (user, target, arrPly, arrBug) => {
    let damage = 15;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));

    target.hp -= damage;
    // Random
    let aleatorio = Math.ceil(Math.random()*10);
    // Stunned
    (aleatorio == 1) && (target.stunned = true);
    // "HIT" del busgter
    dom.hitOrMiss(target, damage);
}

// Metal
export const metalAttack = (user, target, arrPly, arrBug) => {
    let damage = 25;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));

    // Aumentar turnos
    user.contTurn++;
    if(user.contTurn == 3) {
        user.contTurn = 0;

        target.hp -= damage;
        target.stunned = true;
        dom.hitOrMiss(target, damage);
    };
};

// Autor
export const autorAttack = (user, target, arrPly, arrBug) => {
    let damage = 15;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));

    target.hp -= damage;
    dom.hitOrMiss(target, damage);  

    // Dar vida
    // tomar un numero aleatorio
    let aleatorio =  (Math.ceil(Math.random()*(arrBug.length))) - 1;
    // tomar un elemento de mismo indice
    let bugsterSelect = (arrBug[aleatorio]);
    bugsterSelect.hp += damage;
    dom.pushItem(bugsterSelect, 4);
}

// Party Time
export const partyTimeAttack = (user, target, arrPly, arrBug) => {
    // Aumentar turnos
    user.contTurn++;
    if(user.contTurn == 3) {
        user.contTurn = 0;
        arrBug.forEach(bugster => {
            bugster.hp += 30;
            dom.pushItem(bugster, 4);
        });
    };
}

// Gun No Aim
export const gunNoAimAttack = (user, target, arrPly, arrBug) => {
    let damage = 5;
    // Stunned
    damage = stunnedEffect(user, damage);

    arrPly.forEach(ply => {
        // If Shield
        (ply.shield == true) && (damage = shieldEffect(ply, damage));
        // If Inmunity
        (ply.immunity == true) && (damage = immunityEffect(ply, damage));

        ply.hp -= damage;
        dom.hitOrMiss(ply, damage);
    });
};

// Misile
export const misileAttack = (user, target, arrPly, arrBug) => {
    let damage = 50;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));

    // Contador
    user.contTurn++
    if(user.contTurn == 4) {
        target.hp -= damage;
        if(damage >= 50) {
            dom.perfect(target);
        }
        else {
            dom.hitOrMiss(target, damage);
        }
        user.contTurn = 0;
    };
}

// Sorpresa
export const surpriseAttack = (user, target, arrPly, arrBug) => {
    let damage = (target.hp * (30/100));

    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));

    target.hp -= damage;
    dom.hitOrMiss(target, damage);
};

// Peace
export const peaceAttack = (user, target, arrPly, arrBug) => {
    user.contTurn++;
    if(user.contTurn == 6) {
        user.hp = user.maxhp;
        user.contTurn = 0;
        dom.pushItem(user, 4);
    };
};  

// Ruedas
export const wheelAttack = (user, target, arrPly, arrBug) =>{
    let damage = 20;
    // Stunned
    damage = stunnedEffect(user, damage);

    let damageOne = (damage/2);
    let damageTwo = (damage/2);

    // If Shield
    (target.shield == true) && (damageOne = shieldEffect(target, damageOne));
    // If Inmunity
    (target.immunity == true) && (damageOne = immunityEffect(target, damageOne));  
    // Restar vida
    target.hp -= damageOne;  
    target.stunned = true;
    dom.hitOrMiss(target, damageOne);

    // tomar un numero aleatorio
    let aleatorio =  (Math.ceil(Math.random()*(arrPly.length))) - 1;
    // tomar un elemento de mismo indice
    let playerSelect = (arrPly[aleatorio]);
    // If Shield
    (playerSelect.shield == true) && (damageTwo = shieldEffect(playerSelect, damageTwo));
    // If Inmunity
    (playerSelect.immunity == true) && (damageTwo = immunityEffect(playerSelect, damageTwo));  
    // Restar vida
    playerSelect.hp -= damageTwo;
    playerSelect.stunned = true;
    dom.hitOrMiss(playerSelect, damageTwo);
}

// Performance
export const performanceAttack = (user, target, arrPly, arrBug) => {
    let damage = 30;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));    

    user.contTurn++;
    if(user.contTurn == 2) {
        user.contTurn = 0;

        target.hp -= damage;
        dom.hitOrMiss(target, damage);

        arrBug.forEach(bug => {
            bug.hp += 30;
            dom.pushItem(bug, 4);
        });
    }
}

// Punch 2
export const punchTwoAttack = (user, target, arrPly, arrBug) => {
    let damage = 15;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));
    // Restar vida 
    target.hp -= damage;
    // "HIT" del player
    dom.hitOrMiss(target, damage);
}

// Mago
export const wizard = (user, target, arrPly, arrBug) => {
    let damage = 30;
    // Stunned
    damage = stunnedEffect(user, damage);

    user.contTurn++;
    if(user.contTurn == 3) {
        user.contTurn = 0;

        arrPly.forEach(ply => {
            // If Shield
            (ply.shield == true) && (damage = shieldEffect(ply, damage));
            // If Inmunity
            (ply.immunity == true) && (damage = immunityEffect(ply, damage));    

            ply.hp -= damage;
            dom.hitOrMiss(ply, damage);

            damage = 30;
        });
    };
};

// Jefe Final
export const boss = (user, target, arrPly, arrBug) => {
    let damage = 100;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));    

    user.contTurn++;
    if(user.contTurn == 4) {
        user.contTurn = 0;

        target.hp -= damage;
        if(damage >= 100) {
            dom.perfect(target);
        } else {
            dom.hitOrMiss(target, damage);
        }
    }
}

// Ultimo esfuerzo
export const  last = (user, target, arrPly, arrBug) => {
    user.contTurn++;
    if(user.contTurn == 3) {
        user.contTurn = 0;

        arrBug.forEach(bug => {
            user.hp += 30;
            bug.hp += 30;
            dom.pushItem(bug, 4);
        });
    };
};

// Comander
export const comander = (user, target, arrPly, arrBug) => {
    let damage = 30;
    // Stunned
    damage = stunnedEffect(user, damage);
    // If Shield
    (target.shield == true) && (damage = shieldEffect(target, damage));
    // If Inmunity
    (target.immunity == true) && (damage = immunityEffect(target, damage));    

    user.contTurn++;
    if(user.contTurn == 2) {
        user.contTurn = 0;

        target.hp -= damage;
        dom.hitOrMiss(target, damage);
        target.stunned = true;
    }
}

// EFECTOS
// Stunned Effect
const stunnedEffect = (user, damage) => {
    // Stunned
    if(user.stunned == true) {
        damage = 0;
        // Quitar stunned de usuario
        user.stunned = false;
        dom.removeEffectSpanAux(user, `Aturdido`);
        // return
        return damage;
    }
    else {
        return damage;
    }
};

// Immunity Effect
export const immunityEffect = (target, damage) => {
    if(target.immunity == true) {
        damage = 0;
        // Quitar inmunidad del target
        target.immunity = false;
        dom.removeEffectSpanAux(target, `Inmunidad`);
        // return 
        return damage;
    }
    else {
        return damage;
    }
};

// Bleeding Effect
export const bleedingEffect = (user) => {
    let newContBleeding;
    // Bleeding
    if(user.bleeding == true) {
        user.contBleeding.forEach(blood => {
            // Quitar turnos
            blood.turnos = blood.turnos - 1;
            // Restar vida
            user.hp -= blood.daño;
            (user.hp <= 0) && (user.hp = 1);
            // Limitar bleeding
            if(blood.turnos == 0) {
                // Quitar bleeding
                user.bleeding = false;
                newContBleeding = user.contBleeding.filter(blood => blood.turnos > 0);
                user.contBleeding = newContBleeding;
            };
        });
    };
};

// Shield Effect
export const shieldEffect = (target, damage) => {
    if(target.shield == true) {
        // Quitar escudo
        target.shield = false;
        dom.removeEffectSpanAux(target, `Protección`);
        damage -= (damage * (20/100));
        // return
        return damage;
    } 
    else {
        // return
        return damage;
    }
};

// Increase Effect
export const increaseEffect = (user, damage) => {
    if(user.increase > 0) {
        // Incrementar daño
        damage += (damage * user.increase);
        // Quitar increase
        dom.removeEffectSpanAux(user, `Incremento`)
        user.increase = 0;
        // return
        return damage;
    }
    else {
        return damage;
    }
};

// Subir nivel
export const levelUp = (obj, levelUp, gashat) => {
    if(levelUp == "one") {
        // Nivel
        obj.nivel = 1;
        // Vida
        obj.maxhp = 100;
        obj.hp = obj.maxhp;
        // Img
        obj.img = obj.img;
    }
    else if(levelUp == "two") {
        // Nivel
        obj.nivel = 2;
        // Vida
        obj.maxhp = 140;
        obj.hp = obj.maxhp;
        // Img
        obj.img = obj.imgTwo;
        // Ataque
        obj.gashats.push(gashat);
        obj.ataques.push(gashat.ataque);
    } else if(levelUp == "three") {
        // Nivel
        obj.nivel = 3;
        // Vida
        obj.maxhp = 180;
        obj.hp = obj.maxhp;
        // Img
        obj.img = obj.imgThree;
        // Ataque
        obj.gashats.push(gashat);
        obj.ataques.push(gashat.ataque);
    } else if(levelUp == "five") {
        // Nivel
        obj.nivel = 5;
        // Vida
        obj.maxhp = 220;
        obj.hp = obj.maxhp;
        // Img
        obj.img = obj.imgFive;
        // Ataque
        obj.gashats.push(gashat);
        obj.ataques.push(gashat.ataque);
    }
}