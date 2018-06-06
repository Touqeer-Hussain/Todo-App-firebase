var db = firebase.database();

//Add Section
var data;
var key;
function addBook(){
    var book = new FormData(document.querySelector("#adForm"));
    var bref = db.ref('books').push();
    bref.set({
        title: book.get('title'),
        description: book.get('description'),
        date: (new Date().toDateString())

    })
    
}
addwbook();
function addwbook(){
    var table = document.querySelector('tbody');
    var books = db.ref('books');
    books.on('child_added', function(data){
    key = data.key;
    data = data.val();
        table.innerHTML += `<tr id="${key}">
        <td>${data.title}</td>
        <td>${data.description}</td>
        <td>${data.date}</td>
        <td><button type="button" class="btn btn-info" onclick="delet('${key}');">X</button></td>
        <td><button type="button" class="btn btn-info" onclick="edit('${key}');"data-toggle="modal" data-target="#myModal">Edit</button></td>
    </tr>`    
    });
}



//Delete Section
function delet(key){
    document.getElementById(key).remove();
    db.ref('books/'+ key).set({});
    
}

//Edit Section
var nook = document.getElementById('eform');    
var skey;
var dref
function edit(ukey){
    console.log(ukey)
    dref = db.ref('books/'+ukey);
    dref.once('value',function(snap){
        nook.title2.value = snap.val().title;
        nook.description2.value = snap.val().description;
    })
    nook.title2.setAttribute("autofocus","");
    nook.title2.select();

    nook.description2.onfocus = function(){
        nook.description2.setAttribute("autofocus","");
        nook.description2.select();
}
}

function update(){
    dref.set({
        title: nook.title2.value,
        description: nook.description2.value,
        date: (new Date().toDateString())
    })
return true;
}

    
    
    
    
