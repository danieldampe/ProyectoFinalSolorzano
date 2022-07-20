// Class Kamen Riders
export class Rider {
    constructor(name, img, imgTwo, imgThree, imgFive, hp, maxhp, nivel, ataques, gashats, contDamage, dom, chance, immunity, shield, increase, stunned, bleeding, contBleeding) {
        this.name = name,
        this.img = img,
        this.imgTwo = imgTwo,
        this.imgThree = imgThree,
        this.imgFive = imgFive,
        this.hp = hp,
        this.maxhp = maxhp,
        this.nivel = nivel,
        this.ataques = ataques,
        this.gashats = gashats,
        this.contDamage = contDamage,
        this.dom = dom,
        this.chance = chance,
        this.immunity = immunity,
        this.shield = shield,
        this.increase = increase,
        this.stunned = stunned,
        this.bleeding = bleeding,
        this.contBleeding = contBleeding
    }
}

export class Bugster {
    constructor(name, img, hp, maxhp, nivel, ataques, dom, chance, immunity, shield, increase, stunned, bleeding, contBleeding, contTurn) {
        this.name = name,
        this.img = img,
        this.hp = hp,
        this.maxhp = maxhp,
        this.nivel = nivel,
        this.ataques = ataques,
        this.dom = dom,
        this.chance = chance,
        this.immunity = immunity,
        this.shield = shield,
        this.increase = increase,
        this.stunned = stunned,
        this.bleeding = bleeding,
        this.contBleeding = contBleeding,
        this.contTurn = contTurn
    }
}

export class Gashat {
    constructor(name, ataque) {
        this.name = name,
        this.ataque = ataque
    }
}

export class AtaqueBug {
    constructor(name, damage, description, effect, special, requestTurn) {
        this.name = name,
        this.damage = damage,
        this.description = description,
        this.effect = effect,
        this.special = special,
        this.requestTurn = requestTurn
    };
}

export class Ataque extends AtaqueBug {
    constructor(name, img, damage, description, effect, type, final, request) {
        super(name, damage, description, effect);
        this.img = img,
        this.type = type,
        this.final = final,
        this.request = request
    };
}

