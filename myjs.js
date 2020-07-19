const form = document.querySelector(".form")
const input = document.querySelector(".mainInput")
const list = document.querySelector(".list-group")
const addbtn = document.querySelector(".addBtn")


let formstatus = 'add';

const randomID = () => Math.floor(Math.random() * 1000);
let items = [
    {
        id : randomID(),
        text : 'Item 1',
    },
];

const generateitem = (item) => {

    const div = document.createElement('div');
    div.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-centre');
    div.id = item.id;

    const span = document.createElement('span');
    span.setAttribute('class','text');
    span.innerText = item.text;

    const div2 = document.createElement('div');
    const editbtn = document.createElement('button');
    editbtn.setAttribute('class','btn btn-dark editBtn btn-sm mr-1');
    editbtn.innerText = 'Edit';

    const deletebtn = document.createElement('button');
    deletebtn.setAttribute('class','btn btn-danger deletebtn btn-sm');
    deletebtn.innerText = 'Delete';

    div2.appendChild(editbtn);
    div2.appendChild(deletebtn);
    div.appendChild(span);
    div.appendChild(div2);

    return div;

}



function showitems(){
    list.innerHTML = '';
    items.forEach(item => {
        list.appendChild(generateitem(item));
    });
}

showitems();



function additem(item){
    const newitem = {
        id : randomID(),
        text :item
    }
    items.unshift(newitem);
    input.value = '';
    showitems();
}

window.addEventListener('click', e => {

    if(e.target.classList.contains('editBtn')) {
        const item = e.target.parentNode.parentNode;
        const id = item.id;
        const text = item.firstChild.innerText;
        input.value = text;
        input.id  = id;
        formstatus = 'Update';
        addbtn.innerText = 'Update';
    }
});

function updateitem(item){
    items.forEach(itemObj => {
        if(Number(itemObj.id) === Number(item.id)){
            itemObj.text = item.text;
        }
    })
};

input.value = '';
formstatus = 'add';
addbtn.innerText = 'Add';
showitems();


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(formstatus === 'add' && input.value != ''){
        additem(input.value);
    }
    if(formstatus === 'Update' && input.value != ''){
        updateitem({ id : input.id , text : input.value });
    }

});

window.addEventListener('click', e => {
    if(e.target.classList.contains('deletebtn')){
        const item = e.target.parentNode.parentNode;
        const id = item.id;
        items = items.filter(itemObj => Number(itemObj.id) != Number(id));
        showitems();
    }
});

