'use strict';

var allWish = [];
function Wish(wishName, date, randomN) {
    this.wishName = wishName;
    this.date = date;
    this.randomN = randomN;
    allWish.push(this);
}

function renderTable() {

    for (var j = 0; j < allWish.length; j++) {
        var trow = document.createElement('tr');
        tableWish.appendChild(trow);

        var tdata1 = document.createElement('td');
        trow.appendChild(tdata1);
        tdata1.textContent = `${allWish[j].wishName}`;

        var tdata2 = document.createElement('td');
        trow.appendChild(tdata2);
        tdata2.textContent = `${allWish[j].date}`;

        var tdata3 = document.createElement('td');
        trow.appendChild(tdata3);
        tdata3.textContent = `${allWish[j].randomN} years`;

        var tdata4 = document.createElement('td');
        trow.appendChild(tdata4);
        tdata4.id = j;
        tdata4.textContent = `X`;
    }

}


function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var wishForm = document.querySelector('#form1');
wishForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    var wishTitle = event.target.wishTitle.value;
    var date = event.target.date.value;
    var randomN1 = randomNumber(99, 0);

    var newWish = new Wish(wishTitle, date, randomN1);

    deleteTable();
    tableHeader();
    renderTable();
    storeData();

    console.log(allWish);
}

var tableWish = document.querySelector('#tableWish');

var tableHeadInfo = ['Wish Title', 'Expected DAte', 'Your wish Will come True After Xd', 'Remove'];
function tableHeader() {
    var trow1 = document.createElement('tr');
    tableWish.appendChild(trow1);

    for (var i = 0; i < tableHeadInfo.length; i++) {

        var tableH = document.createElement('th');
        trow1.appendChild(tableH);
        tableH.textContent = tableHeadInfo[i];

    }
}
tableHeader();

tableWish.addEventListener('click', removeX);

function removeX() {
    if (event.target.textContent == 'X') {
        allWish.splice(event.target.id, 1);
        console.log(allWish);
        deleteTable();
        tableHeader();
        renderTable();
        storeData();
    }
}


function deleteTable() {
    document.getElementById('tableWish').innerHTML = "";

}

function storeData() {
    var store = JSON.stringify(allWish);
    localStorage.setItem('wishes', store);
}

function getData() {
    var store = localStorage.getItem('wishes');
    if (store) {
        allWish = JSON.parse(store);
    }
}


getData();
renderTable();
