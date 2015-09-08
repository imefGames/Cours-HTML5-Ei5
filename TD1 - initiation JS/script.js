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

}