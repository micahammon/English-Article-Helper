const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');

const flowchartData = {
    A: {
        question: "Start: Is the noun specific and known to the listener?",
        options: {
            Yes: "B",
            No: "C"
        }
    },
    B: { result: "Use 'THE'" },
    C: {
        question: "Is the noun a proper noun?",
        options: {
            Yes: "D",
            No: "M"
        }
    },
    D: {
        question: "Is it a geographical name?",
        options: {
            Yes: "E",
            No: "G"
        }
    },
    E: {
        question: "What type of geographical name?",
        options: {
            "Rivers, Mountain ranges, Deserts, Oceans, Seas": "B",
            "Plural countries": "B",
            "Countries with 'of', 'states', 'republic', 'kingdom'": "B",
            "'The' as part of the name": "B",
            "Most countries, Continents, Cities, Single mountains, Lakes": "F",
            "Groups of islands": "B",
            "Lines and points on the earth": "B"
        }
    },
    F: { result: "Use 'NO ARTICLE'" },
    G: {
        question: "Is it a place in a city?",
        options: {
            Yes: "H",
            No: "I"
        }
    },
    H: {
        question: "What type of place?",
        options: {
            "Museums, Art galleries, Theatres, Pubs with 'the', Hotels with 'the'": "B",
            "Areas with normal words": "B",
            "Most areas, Parks, Stations, Airports, Shops, Bridges, Roads, Squares, Churches, Schools": "F",
            "Universities, Cinemas, Libraries, Restaurants with 'the'": "B",
            "Universities, Cinemas, Libraries, Restaurants without 'the'": "F"
        }
    },
    I: {
        question: "Is it a person's name?",
        options: {
            Yes: "J",
            No: "F"
        }
    },
    J: {
        question: "How is the name used?",
        options: {
            "Addressing someone, Familiar names": "F",
            "Referring to a family": "B",
            "Emphasizing a famous person": "B",
            "Choosing a specific person from a group with the same name": "B",
            "Indicating unfamiliarity or uncertainty": "K",
            "Used with an adjective to compare to a famous person": "K",
            "Used to mean a work of art or a book": "L"
        }
    },
    K: { result: "Use 'A/AN'" },
    L: {
        question: "Is it singular?",
        options: {
            Yes: "K",
            No: "F"
        }
    },
    M: {
        question: "Is the noun countable?",
        options: {
            Yes: "N",
            No: "U"
        }
    },
    N: {
        question: "Is it singular?",
        options: {
            Yes: "O",
            No: "T"
        }
    },
    O: {
        question: "Is it a general statement about one member representing the whole group?",
        options: {
            Yes: "K",
            No: "P"
        }
    },
    P: {
        question: "Does it mean 'it doesn't matter which'?",
        options: {
            Yes: "K",
            No: "Q"
        }
    },
    Q: {
        question: "Is it classifying or describing?",
        options: {
            Yes: "K",
            No: "R"
        }
    },
    R: {
        question: "Is it an exclamation with 'what'?",
        options: {
            Yes: "K",
            No: "S"
        }
    },
    S: {
        question: "Is it a special case or fixed expression?",
        options: {
            Yes: "X",
            No: "BA"
        }
    },
    T: { result: "Use 'NO ARTICLE' or 'SOME' for a limited amount" },
    U: {
        question: "Is it an abstract noun used in a special way?",
        options: {
            Yes: "V",
            No: "W"
        }
    },
    V: {
        question: "Does it have an adjective or clause specifying a certain kind?",
        options: {
            Yes: "K",
            No: "T"
        }
    },
    W: {
        question: "Is it a special case or fixed expression?",
        options: {
            Yes: "X",
            No: "T"
        }
    },
    X: {
        question: "What is the specific case?",
        options: {
            "Noun adjuncts": "Y",
            "Institutions used for their intended purpose": "T",
            "Institutions as buildings": "Z",
            "Bed, home, work, town used in a special way": "AA",
            "Illnesses": "AB",
            "Acronyms and Initialisms": "AD",
            "'A little', 'a few', 'little', 'few'": "AG",
            "'Most' and 'the most'": "AJ",
            "'A/an' or 'one'?": "AM",
            "'A/an' and 'one' with 'half'": "AR",
            "'A/an' instead of 'per'": "AU",
            "'Next' and 'last' with time expressions": "AV",
            "'First', 'second', 'third'": "AW",
            "'The' with comparatives": "AY",
            "Prepositional phrases, Idioms, Parallel structures": "AZ"
        }
    },
    Y: { result: "Consider the main noun" },
    Z: { result: "Apply general rules" },
    AA: { result: "Usually 'NO ARTICLE'" },
    AB: {
        question: "Is it 'the flu', 'the measles', 'the hiccups'?",
        options: {
            Yes: "B",
            No: "AC"
        }
    },
    AC: { result: "Usually 'NO ARTICLE'" },
    AD: {
        question: "Is it a common noun?",
        options: {
            Yes: "AE",
            No: "AF"
        }
    },
    AE: { result: "Apply general rules" },
    AF: {
        question: "Is 'the' part of the name?",
        options: {
            Yes: "B",
            No: "F"
        }
    },
    AG: {
        question: "What's the meaning?",
        options: {
            "Small amount, but enough": "AH",
            "Small amount, almost nothing": "AI"
        }
    },
    AH: { result: "Use 'A LITTLE' / 'A FEW'" },
    AI: { result: "Use 'LITTLE' / 'FEW'" },
    AJ: {
        question: "What's the meaning?",
        options: {
            "'Almost all', 'very many'": "AK",
            "Superlative": "AL"
        }
    },
    AK: { result: "Use 'NO ARTICLE' or 'MOST OF THE' for specific" },
    AL: { result: "Use 'THE MOST'" },
    AM: {
        question: "Is it before hundred, thousand, million, or a fraction?",
        options: {
            Yes: "AN",
            No: "AO"
        }
    },
    AN: { result: "Usually 'A/AN'" },
    AO: {
        question: "Is it emphasizing the number?",
        options: {
            Yes: "AP",
            No: "AQ"
        }
    },
    AP: { result: "Use 'ONE'" },
    AQ: { result: "Use 'A/AN'" },
    AR: {
        question: "Is 'half' after a number or a word indicating amount?",
        options: {
            Yes: "AS",
            No: "AT"
        }
    },
    AS: { result: "Use 'A'" },
    AT: { result: "Use 'NO ARTICLE'" },
    AU: { result: "Use 'A/AN'" },
    AV: { result: "Usually 'NO ARTICLE'" },
    AW: {
        question: "Does it clarify which one?",
        options: {
            Yes: "B",
            No: "AX"
        }
    },
    AX: { result: "Usually 'NO ARTICLE' or 'A/AN' less common" },
    AY: { result: "Use 'THE'" },
    AZ: { result: "Learn individually" },
    BA: {
        question: "Is it a language, meal, or sport used unusually?",
        options: {
            Yes: "BB",
            No: "BC"
        }
    },
    BB: { result: "Apply general rules" },
    BC: {
        question: "Is it a noun followed by a classifying letter or number?",
        options: {
            Yes: "BD",
            No: "BE"
        }
    },
    BD: { result: "Usually 'NO ARTICLE'" },
    BE: {
        question: "Is it a unique role with specific verbs?",
        options: {
            Yes: "BF",
            No: "BG"
        }
    },
    BF: { result: "Often 'NO ARTICLE'" },
    BG: {
        question: "Is it 'the fact is', 'the problem is', 'the question is'?",
        options: {
            Yes: "BH",
            No: "T"
        }
    },
    BH: { result: "Either 'THE' or 'NO ARTICLE'" }
};

function displayNode(nodeId) {
    const node = flowchartData[nodeId];

    if (node.question) {
        questionElement.textContent = node.question;
        optionsElement.innerHTML = '';

        for (const option in node.options) {
            const button = document.createElement('button');
            button.textContent = option;
            button.dataset.next = node.options[option];
            optionsElement.appendChild(button);
        }

        resultElement.textContent = '';
    } else {
        questionElement.textContent = '';
        optionsElement.innerHTML = '';
        resultElement.textContent = node.result;
    }
}

optionsElement.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const nextNodeId = event.target.dataset.next;
        displayNode(nextNodeId);
    }
});

// Initial display
displayNode('A');