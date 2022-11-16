
// const crypto = require('crypto');
import crypto from 'crypto';

const DEFAULT_CHARACTERS = "ABCDEFG1234567890";

function generateCode(characters = DEFAULT_CHARACTERS, length = 6) {

    let string = '';

    for (let i = 0; i < length; i++) {
        let randomPosition = crypto.randomInt(0, characters.length);
        let randomCharacter = characters[randomPosition];

        string += randomCharacter;
    }

    return string;
}

function generateMultipleCodes(characters, length, count) {
    let codes = []

    for (let i = 0; i < count; i++) {
        codes.push(generateCode(characters, length));
    }

    return codes;
}

export {
    DEFAULT_CHARACTERS,
    generateCode,
    generateMultipleCodes
};
// whatever value we set for module.exports will be available for us to use.