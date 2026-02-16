const stdContainer = document.getElementById('stdContainer')
const stdForm = document.getElementById('stdForm')
const stdAddBtn = document.getElementById('stdAddBtn')
const stdUpdatedBtn = document.getElementById('stdUpdatedBtn')

const fnameControl = document.getElementById('fname')
const lnameControl = document.getElementById('lname')
const emailControl = document.getElementById('email')
const contactControl = document.getElementById('contact')

/* ================= LOCAL STORAGE LOAD ================= */

let stdArr

if(localStorage.getItem('stdArr')){
    stdArr = JSON.parse(localStorage.getItem('stdArr'))
}else{
    stdArr = []
}

/* ================= UTIL ================= */

function snackbar(msg){
    Swal.fire({
        title: msg,
        icon: 'success',
        timer: 2000,
        showConfirmButton:false
    })
}

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, c => {
        const r = Math.random()*16|0
        const v = c=='x'?r:(r&0x3|0x8)
        return v.toString(16)
    })
}

/* ================= CREATE UI ================= */

function createStdTrs(arr){
    let result = ''

    arr.forEach((ele,i)=>{
        result += `
        <tr id="${ele.stdId}">
            <td>${i+1}</td>
            <td>${ele.fname} ${ele.lname}</td>
            <td>${ele.email}</td>
            <td>${ele.contact}</td>

            <td class="text-center">
                <i onclick="onEdit(this)" 
                class="fa-solid fa-pen-to-square fa-lg text-success"></i>
            </td>

            <td class="text-center">
                <i onclick="onRemove(this)" 
                class="fa-solid fa-trash-can fa-lg text-danger"></i>
            </td>
        </tr>
        `
    })

    stdContainer.innerHTML = result
}

createStdTrs(stdArr)

/* ================= ADD ================= */

function onStdAdd(e){
    e.preventDefault()

    let obj = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: uuid()
    }

    stdArr.push(obj)
    localStorage.setItem('stdArr', JSON.stringify(stdArr))

    createStdTrs(stdArr)
    stdForm.reset()

    snackbar("Student added")
}

stdForm.addEventListener('submit', onStdAdd)

/* ================= EDIT ================= */

let EDIT_ID

function onEdit(ele){
    EDIT_ID = ele.closest('tr').id

    let obj = stdArr.find(s=>s.stdId===EDIT_ID)

    fnameControl.value = obj.fname
    lnameControl.value = obj.lname
    emailControl.value = obj.email
    contactControl.value = obj.contact

    stdAddBtn.classList.add('d-none')
    stdUpdatedBtn.classList.remove('d-none')
}

/* ================= UPDATE ================= */

stdUpdatedBtn.addEventListener('click', onStdUpdate)

function onStdUpdate(){

    let updatedObj = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: EDIT_ID
    }

    let index = stdArr.findIndex(s=>s.stdId===EDIT_ID)
    stdArr[index] = updatedObj

    localStorage.setItem('stdArr', JSON.stringify(stdArr))

    createStdTrs(stdArr)

    stdForm.reset()
    stdAddBtn.classList.remove('d-none')
    stdUpdatedBtn.classList.add('d-none')

    snackbar("Student updated")
}

/* ================= DELETE ================= */

function onRemove(ele){

    let id = ele.closest('tr').id

    if(!confirm("Are you Sure,You want to Remove this id")) return

    let index = stdArr.findIndex(s=>s.stdId===id)
    stdArr.splice(index,1)

    localStorage.setItem('stdArr', JSON.stringify(stdArr))

    createStdTrs(stdArr)
    snackbar("Student removed")
}
