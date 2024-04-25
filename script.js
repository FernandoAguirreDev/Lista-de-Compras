const lista = []

addItem = () => {
    const item = document.getElementById('itemList').value
    const itemMaiusculo = item.charAt(0).toUpperCase() + item.slice(1);
    const category = document.getElementById('categoryList').value
    const object = {
        item: itemMaiusculo,
        category: category,
        check: false,
        idDiv: '',
        idList: '',
        idTitle: ''
    }


    if (item === "") {
        alert("Favor informar o item para compra");
        return
    }
    if (category === "") {
        alert("Favor informar uma categoria válida");
        return
    }

    if (category === "alimentos") {
        object.idDiv = "divAlimentos"
        object.idTitle = "alimentos"
        object.idList = "listAlimentos"
        addList(object)
    }

    if (category === "bebidas") {
        object.idDiv = "divBebidas"
        object.idTitle = "bebidas"
        object.idList = "listBebidas"
        addList(object)
    }
    if (category === "carnes") {
        object.idDiv = "divCarnes"
        object.idTitle = "carnes"
        object.idList = "listCarnes"
        addList(object)
    }
    if (category === "higienePessoal") {
        object.idDiv = "divHigiene"
        object.idTitle = "higiene"
        object.idList = "listHigienePessoal"
        addList(object)
    }

    if (category === "hortifruti") {
        object.idDiv = "divHortifruti"
        object.idTitle = "hortifruti"
        object.idList = "listHortifruti"
        addList(object)
    }

    if (category === "limpeza") {
        object.idDiv = "divLimpeza"
        object.idTitle = "limpeza"
        object.idList = "listLimpeza"
        addList(object)
    }

    if (category === "outros") {
        object.idDiv = "divOutros"
        object.idTitle = "outros"
        object.idList = "listOutros"
        addList(object)
    }

}

addList = (object) => {

    const list = document.getElementById(object.idList)

    const newItem = document.createElement('li')

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            newItem.style.textDecoration = 'line-through';
            object.check = true
            salvarLista()
        } else {
            newItem.style.textDecoration = 'none';
            object.check = false
            salvarLista()
        }
        return
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<img width="24" height="24" src="https://img.icons8.com/material-outlined/24/cccccc/delete-trash.png" alt="delete-trash"/>';
    deleteButton.addEventListener('click', function () {
        list.removeChild(newItem);
        if (list.children.length === 0) {
            document.getElementById(object.idTitle).style.display = "none";
        }
        removerLista(newItem.textContent)
    });

    newItem.appendChild(checkbox);
    newItem.appendChild(document.createTextNode(object.item));
    newItem.appendChild(deleteButton);

    list.appendChild(newItem);

    Array.from(list.getElementsByTagName('li'))
        .sort((a, b) => a.textContent.localeCompare(b.textContent))
        .forEach(li => list.appendChild(li));

    document.getElementById(object.idTitle).style.display = "block";
    document.getElementById(object.idDiv).style.display = "block";

    document.getElementById('itemList').value = '';
    document.getElementById('categoryList').value = '';

    lista.push(object)

    salvarLista()

}
removerLista = (newItem) => {
    const index = lista.findIndex(objeto => objeto.item === newItem)

    lista.splice(index, 1)
    salvarLista()

}

salvarLista = () => {
    localStorage.setItem('ListaCompras', JSON.stringify(lista))


}

window.onload = () => {
    const listaSalva = JSON.parse(localStorage.getItem('ListaCompras')) || []

    lista.push(...listaSalva)

    for (let i = 0; i < listaSalva.length; i++) {
        const item = listaSalva[i]

        const list = document.getElementById(item.idList)
        const newItem = document.createElement('li')

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";

        if (item.check === true) {
            checkbox.checked = true
            newItem.style.textDecoration = 'line-through';
            console.log(item)
        }

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                newItem.style.textDecoration = 'line-through';
                item.check = true
                salvarLista()
            } else {
                newItem.style.textDecoration = 'none';
                item.check = false
                salvarLista()
            }
            return
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<img width="24" height="24" src="https://img.icons8.com/material-outlined/24/cccccc/delete-trash.png" alt="delete-trash"/>';
        deleteButton.addEventListener('click', function () {
            list.removeChild(newItem);
            if (list.children.length === 0) {
                document.getElementById(item.idDiv).style.display = "none";
            }
            removerLista(newItem.textContent)
        });

        newItem.appendChild(checkbox);
        newItem.appendChild(document.createTextNode(item.item));
        newItem.appendChild(deleteButton);

        list.appendChild(newItem);

        Array.from(list.getElementsByTagName('li'))
            .sort((a, b) => a.textContent.localeCompare(b.textContent))
            .forEach(li => list.appendChild(li));

        document.getElementById(item.idDiv).style.display = "block";
        document.getElementById(item.idTitle).style.display = "block";


    }


}

limparLista = () => {
    lista.splice(0)
    
    document.getElementById('listAlimentos').innerHTML = '';
    document.getElementById('listBebidas').innerHTML = '';
    document.getElementById('listCarnes').innerHTML = '';
    document.getElementById('listHigienePessoal').innerHTML = '';
    document.getElementById('listHortifruti').innerHTML = '';
    document.getElementById('listLimpeza').innerHTML = '';
    document.getElementById('listOutros').innerHTML = '';

    document.getElementById('divAlimentos').style.display = 'none';
    document.getElementById('divBebidas').style.display = 'none';
    document.getElementById('divCarnes').style.display = 'none';
    document.getElementById('divHigiene').style.display = 'none';
    document.getElementById('divHortifruti').style.display = 'none';
    document.getElementById('divLimpeza').style.display = 'none';
    document.getElementById('divOutros').style.display = 'none';

    localStorage.removeItem('ListaCompras');
    salvarLista()
}

