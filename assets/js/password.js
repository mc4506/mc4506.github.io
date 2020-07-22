var generateBtn = document.querySelector("#generate");
var passwordSlider = document.getElementById('password-slider');

function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

generateBtn.addEventListener("click", writePassword);
passwordSlider.addEventListener('input', getPasswordLength);


function generatePassword() {

    let passwordLength = getPasswordLength();

    // ****** Ask User to select character criteria for the password ****** //
    // Initialize number of character sets selected to 0
    let numberOfCharSetsSelected = 0;

    // Initialize an array of booleans with 4 false values. Using an array so I can call a for loop through the array below
    let charSetBoolArray = [false, false, false, false];

    charSetBoolArray[0] = document.getElementById('lowercase').checked; // lowercase index
    charSetBoolArray[1] = document.getElementById('uppercase').checked; // uppercase index
    charSetBoolArray[2] = document.getElementById('numeric').checked;; // numeric index
    charSetBoolArray[3] = document.getElementById('special').checked;; // special index

    // sum of values in the charSetBoolArray
    numberOfCharSetsSelected = charSetBoolArray.reduce((a, b) => a + b, 0);

    // if none selected, default to lowercase
    if (numberOfCharSetsSelected === 0) {
        document.getElementById('lowercase').checked = true;
        charSetBoolArray[0] = true;
    }

    // ****** Generate random number of characters for each selected character set ******//
    // Minimum 1 character and and maximum(passwordLength - numberOfCharSetsSelected) + 1

    // initialize passwordCharArray to track how many characters are in each character set based on the charSetBoolArray's true or false
    let charSetQtyArray = [0, 0, 0, 0];
    let i = 0;

    for (i = 0; i < charSetQtyArray.length; i++) {
        if (charSetBoolArray[i] === true && numberOfCharSetsSelected === 1) {
            charSetQtyArray[i] = passwordLength - numberOfCharSetsSelected + 1;
        } else if (charSetBoolArray[i] === true) {
            charSetQtyArray[i] = Math.floor(Math.random() * (passwordLength - numberOfCharSetsSelected)) + 1;
            passwordLength = passwordLength - charSetQtyArray[i];
            numberOfCharSetsSelected -= 1;
        }
    }
    // console.log("charSetBoolArray: " + charSetBoolArray);
    // console.log("charSetQtyArray: " + charSetQtyArray);

    // *** Add random characters of each character set into a string based on number of characters in charSetQtyArray *** //
    // The generated password is sorted by character set and need to be shuffled afterwards.

    // initialize password to an empty string
    let password = "";

    //character set Array
    const charSetArray = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~"];

    let j = 0;

    // loop through charSetQtyArray (4 times)
    for (i = 0; i < charSetQtyArray.length; i++) {
        //loop through number of characters for each character set
        for (j = 0; j < charSetQtyArray[i]; j++) {
            // randomly generate a character from the ith index of charSetArray
            let char = charSetArray[i].charAt(getRandomInteger(0, charSetArray[i].length - 1));
            // console.log(char);
            password = password + char;
            // console.log(password);
        }
    }

    // ***** Shuffle the password generated *****
    let shuffledPassword = shuffleString(password);
    return shuffledPassword;
}


function getPasswordLength() {
    let passwordLength = Math.floor(passwordSlider.value);
    let passwordOutput = document.getElementById('password-length');
    passwordOutput.innerHTML = passwordLength;
    return passwordLength;
}

function shuffleString(string) {
    let shuffledString = "";

    let stringArray = string.split("");

    // loop through the string and using splice method to assign a shuffled character to the shuffledString
    for (i = 0; i < string.length; i++) {
        // decrement the stringArray length for each character that gets spliced/removed
        let shuffleChar = stringArray.splice(getRandomInteger(0, stringArray.length - (1 + i)), 1);
        // console.log("shuffleChar: " + shuffleChar);
        shuffledString += shuffleChar;
        // console.log(shuffledString);
    }
    return shuffledString;
}

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}