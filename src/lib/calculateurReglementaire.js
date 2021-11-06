export default function isPermitted(seed, type, month){

console.log(seed, type, month)
if(type == 'TYPE 1') type = 1;
if(type == 'TYPE 2') type = 2;
if(type == 'TYPE 3') type = 3;

if(seed == 'mais') seed = 'corn';
if(seed == 'colza') seed = 'winterRapeseed';

let notCultivated = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let autumnCultivation = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
];
let winterRapeseed = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
];
let youngMeadow = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
];
let springCultivation = [
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
];
let corn = [
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
];
let matureMeadow = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
];
let otherCultivation = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
];
let matureAlfalfa = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
];
let peas = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
];
let otherLegume = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let noSeed = [
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null]
];

// reading data
let theSeed;
let correctedType = type - 1; // offset correction
let correctedMonth = month - 1; // offset correction

switch (seed) {
    case 'notCultivated':
        theSeed = notCultivated;
        break;
    case 'autumnCultivation':
        theSeed = autumnCultivation;
        break;
    case 'winterRapeseed':
        theSeed = winterRapeseed;
        break;
    case 'youngMeadow':
        theSeed = youngMeadow;
        break;
    case 'springCultivation':
        theSeed = springCultivation;
        break;
    case 'corn':
        theSeed = corn;
        break;
    case 'matureMeadow':
        theSeed = matureMeadow;
        break;
    case 'otherCultivation':
        theSeed = otherCultivation;
        break;
    case 'matureAlfalfa':
        theSeed = matureAlfalfa;
        break;
    case 'peas':
        theSeed = peas;
        break;
    case 'otherLegume':
        theSeed = otherLegume;
        break;
    default:
        theSeed = noSeed;
        break;
}

let r = theSeed[correctedType][correctedMonth]

return r;
}