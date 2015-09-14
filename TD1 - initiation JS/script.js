/**
 * Ajoute une tâche à la liste
 */
function addTache() {
	if((document.getElementById("todo-form-add").value === "")) {
	return;
	}
	//Trouve la liste de tâches
	var todoList = document.getElementById("todo-list");
	//Créé une nouvelle tâche vide
	var node = document.createElement('li');
	node.setAttribute('draggable', 'true');
	node.setAttribute('ondragstart', 'dragStart(event)');
		node.setAttribute('ondragover', 'dragOver(event)');
	node.setAttribute('ondrop', 'dragDropOrdonner(event)');
	//Ajoute le nom à la nouvelle tâche
	node.appendChild(document.createTextNode(document.getElementById("todo-form-add").value + ' '));
	//Créé un bouton pour supprimer la tâche
	var removeNode = document.createElement('input');
	//Ajoute des attributs au bouton
	removeNode.setAttribute('class', 'todo-list-remove');
	removeNode.setAttribute('type', 'button');
	removeNode.setAttribute('onclick', 'removeTache(this)');
	removeNode.setAttribute('value', 'Remove');
	//Ajoute le bouton à la tâche
	node.appendChild(removeNode);
	//Ajoute la tâche à la liste
	todoList.appendChild(node);
}

/**
 * Supprime une tâche de la liste
 */
function removeTache(me) {
	//Supprime la tâche de la liste
	document.getElementById("todo-list").removeChild(me.parentNode);
}

/**
 * Sauvegarde la liste de tâches
 */
function saveTache(){
	//On efface les données du localStorage
	localStorage.clear();
	//On se positionne sur le noeud todo-list
	var element = document.getElementById('todo-list');
	for(var i=0; i<element.children.length; i++){
		localStorage.setItem("todoList"+i, element.children[i].innerHTML);
	}
}

function loadTaches(){
	var element = document.getElementById('todo-list');
	while(element.firstChild){
  		element.removeChild(element.firstChild);
	}
	for(var i=0; i<localStorage.length; i++){
		var node = document.createElement('li');
		node.setAttribute('draggable', 'true');
		node.setAttribute('ondragstart', 'dragStart(event)');
		node.setAttribute('ondragover', 'dragOver(event)');
		node.setAttribute('ondrop', 'dragDropOrdonner(event)');
		node.innerHTML = localStorage.getItem('todoList'+i);
		element.appendChild(node);
	}
}

var elements = [];

function dragStart(event){

	var index = elements.indexOf(event.target.parentNode);
   
    if (index == -1) {
        // not already existing in the array, add it now
        elements.push(event.target);
        index = elements.length - 1;
    }
	
	event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('index', index);
}

function dragOver(event){
	event.preventDefault();
	return false;
}

function dragDrop(event){

    var element = elements[event.dataTransfer.getData('index')];

    element.parentNode.removeChild(element);

	return false;
}

function dragDropOrdonner(event){

    var element = elements[event.dataTransfer.getData('index')];

	var tmp = event.target.innerHTML;
	event.target.innerHTML = element.innerHTML;
	element.innerHTML = tmp;

	return false;
}