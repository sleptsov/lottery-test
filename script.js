// Mock default participants 
const mockParticipants = [
    {
        "id": 1,
        "name": "Oona",
        "surname": "Hargie",
        "email": "ohargie0@china.com.cn",
        "phone": "950 789 7504",
        "bday": "1975-06-29"
    }, {
        "id": 2,
        "name": "Bronny",
        "surname": "Tebbut",
        "email": "btebbut1@hugedomains.com",
        "phone": "678 341 5422",
        "bday": "1963-01-21"
    }, {
        "id": 3,
        "name": "Vern",
        "surname": "Roddick",
        "email": "vroddick2@amazon.de",
        "phone": "555 897 9232",
        "bday": "1959-10-14"
    }, {
        "id": 4,
        "name": "Archie",
        "surname": "Benaine",
        "email": "abenaine3@patch.com",
        "phone": "366 799 9859",
        "bday": "1981-09-26"
    }, {
        "id": 5,
        "name": "Edik",
        "surname": "Drance",
        "email": "edrance4@ezinearticles.com",
        "phone": "604 379 7980",
        "bday": "1960-07-25"
    }, {
        "id": 6,
        "name": "D'arcy",
        "surname": "Atthowe",
        "email": "datthowe5@icq.com",
        "phone": "761 312 5285",
        "bday": "1982-10-03"
    }, {
        "id": 7,
        "name": "Dmitri",
        "surname": "Pillans",
        "email": "dpillans6@merriam-webster.com",
        "phone": "705 944 4142",
        "bday": "1974-07-28"
    }, {
        "id": 8,
        "name": "Ame",
        "surname": "Cottee",
        "email": "acottee7@dailymotion.com",
        "phone": "284 889 5755",
        "bday": "1975-07-18"
    }, {
        "id": 9,
        "name": "Barry",
        "surname": "Wrotchford",
        "email": "bwrotchford8@t.co",
        "phone": "242 557 6928",
        "bday": "1965-03-06"
    }, {
        "id": 10,
        "name": "Nobie",
        "surname": "O'Kinneally",
        "email": "nokinneally9@bloomberg.com",
        "phone": "989 810 5417",
        "bday": "1972-04-04"
    }
];

let participants = mockParticipants;
let form = document.getElementById('participantForm');
let winnerBox = document.getElementById('winner-box');
let winnerList = document.getElementById('winner-list');
let isEditing = false;
let winnersArray = [];
let currentParticipant = null;
let maxDelay = 2000; //ms


// Add row with participants info to the table
let addRow = (data, target) => {
    let tr = document.createElement('tr');
    for (let item in data) {
        let td = document.createElement('td');
        td.textContent = data[item];
        tr.setAttribute('id', `${data['id']}-tr`)
        tr.appendChild(td);
    }
    let td_edit = document.createElement('td');
    td_edit.innerHTML = `<button onclick="selectParticipant(event)" id=${data['id']}-btn>Edit</button>`;
    tr.appendChild(td_edit);
    document.getElementById(target).appendChild(tr);
}

// Update edited participant row 
let updateRow = (data) => {
    document.getElementById(`${data['id']}-tr`).childNodes[1].textContent = data.name;
    document.getElementById(`${data['id']}-tr`).childNodes[2].textContent = data.surname;
    document.getElementById(`${data['id']}-tr`).childNodes[3].textContent = data.email;
    document.getElementById(`${data['id']}-tr`).childNodes[4].textContent = data.phone;
    document.getElementById(`${data['id']}-tr`).childNodes[5].textContent = data.bday;
}

// Submit form
let submitForm = (e) => {
    e.preventDefault();
    isEditing ? editParticipant() : addParticipant();
}

// Add new participants to the table and participants object
let addParticipant = () => {
    let obj = {};
    for (let i = 0; i < form.elements.length; i++) {
        let item = form.elements.item(i);
        if (item.type != 'submit') {
            obj[item.name] = item.value;
        }
    }
    obj = Object.assign({}, {
        id: participants.length + 1
    }, obj)
    participants.push(obj);
    addRow(obj, 'table-body');
    form.reset();
}

// Edit existing participant
let editParticipant = () => {
    let obj = {};
    for (let i = 0; i < form.elements.length; i++) {
        let item = form.elements.item(i);
        if (item.type != 'submit') {
            obj[item.name] = item.value;
        }
    }
    currentParticipant = Object.assign({}, currentParticipant, obj);
    participants = updateArray(currentParticipant, participants);
    winnersArray = updateArray(currentParticipant, winnersArray);
    updateRow(currentParticipant);
    reRenderWinnersList(winnersArray);
    currentParticipant = null;
    isEditing = false;
    form.querySelector('input[type=submit]').value = 'Add';
    form.reset();
}

// Patch form with selected participant
let selectParticipant = (e) => {
    isEditing = true;
    form.querySelector('input[type=submit]').value = 'Edit';
    let obj = participants.find((item) => item.id === Number.parseInt(e.target.id.split('-')[0]));
    if (obj) {
        currentParticipant = obj;
        for (let i = 0; i < form.elements.length; i++) {
            let item = form.elements.item(i);
            if (item.type != 'submit') {
                form.elements[item.name].value = obj[item.name];
            }
        }
    }
    form.scrollIntoView();
    form.querySelectorAll('input')[0].focus();
}

// Get random winner
let randomWinner = () => {
    let delay = Math.floor(Math.random() * maxDelay) + 100;
    let spin = Math.floor(Math.random() * 3) + 1;
    console.log(delay, spin);
    winnerBox.innerHTML = `
        <h1 class="spin spin${spin}">&#127922;</h1>
        <h1 class="spin spin${spin}">&#127922;</h1>
        <h1 class="spin spin${spin}">&#127922;</h1>`;
    setTimeout(() => {
        let winner = Math.floor(Math.random() * participants.length);
        winnerBox.innerHTML = `
                <h3>&#128293; &#128293; &#128293; WINNER &#128293; &#128293; &#128293;</h3>
                <h3>${participants[winner].name} ${participants[winner].surname}</h3>
                <p>${participants[winner].email}</p>    
            `;
        winnerList.innerHTML += `<li>${participants[winner].name} ${participants[winner].surname}</li>`;
        winnerList.scrollTop = winnerList.scrollHeight;
        winnersArray.push(participants[winner]);
    }, delay);
}

// Re-render winners list
let reRenderWinnersList = (winners) => {
    if (!winners || !winners.length) {
        return;
    }
    let list = ``;
    winners.forEach((item) => {
        list += `<li>${item.name} ${item.surname}</li>`
    });
    winnerList.innerHTML = list;
}

// Reset all
let resetAll = () => {
    winnerList.innerHTML = ``;
    winnerBox.innerHTML = `Click <strong>Play</strong> to get a winner`;
    winnersArray = [];
}

// Map (update) array
let updateArray = (data, array) => {
    if (!data || !array || !Array.isArray(array)) {
        return;
    }
    return array.map((item) => {
        return {
            id: item.id,
            name: item.id === data.id ? data.name : item.name,
            surname: item.id === data.id ? data.surname : item.surname,
            email: item.id === data.id ? data.email : item.email,
            phone: item.id === data.id ? data.phone : item.phone,
            bday: item.id === data.id ? data.bday : item.bday
        };
    });
}

// Init table with default participants
(function () {
    participants.forEach((participant) => {
        addRow(participant, 'table-body');
    })
})();