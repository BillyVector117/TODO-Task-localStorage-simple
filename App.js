document.getElementById('formTask').addEventListener('submit', saveTask); // Capturamos el elemento formTask y agregamos un evento
function saveTask(e){
	e.preventDefault();// No se recargue la pagina al dar Submit

	let title = document.getElementById('title').value; // Captura valor del input con id 'title'
	console.log('Title: ',title);
	let description = document.getElementById('description').value; // Captura valor del input con id 'description'
	console.log('Description: ',description);

	// Objeto que contiene el titulo y descripcion de la tarea
	let task = { 
		title,
		description
	};
	let tasks = [];
	/*//Colocar un item dentro de LocalStorage convertida a string
	localStorage.setItem('tasks',JSON.stringify(task));
	//Pedir y obtener del localStorage una tarea y mostrarlo en consola convertido a formato Objeto (JSON)
	console.log(JSON.parse(localStorage.getItem('tasks')));*/

	// Si en localStorage no existe un item 'tasks' crealo y agrega el item recien typeado
	if (localStorage.getItem('tasks') === null){
		let tasks = []; // Crea el array para almacenar la tarea
		tasks.push(task); // Colocar dentro del array los valores del objeto task (typeados)
		localStorage.setItem('tasks', JSON.stringify(tasks)); // Colocar dentro de tasks (localStorage) el valor del array recien creado
	} else { // si ya existe una tarea...
		let tasks = JSON.parse(localStorage.getItem('tasks')); // Obtenemos el item tasks (Se abra creado con anterioridad) y lo guardamos en la variable tasks
		tasks.push(task) // Al obtener las tareas antiguas colocarlas en el objeto task
		localStorage.setItem('tasks', JSON.stringify(tasks)); // Desde el item 'tasks' de localStorage, coloca el item tasks (objeto con todas las tareas)
	}
getTasks(); // Al dar submit en crear tarea, automaticamente se visualizara sin recargar la página
document.getElementById('formTask').reset(); // Resetea los datos del formulario
}

// Función para obtener las tareas
function getTasks(){
	// Obtener todas las tareas que esten en el item 'tasks' de localStorage convertidas a un formato JSON
	let tasks = JSON.parse(localStorage.getItem('tasks'));
	let taskView = document.getElementById('Tarea'); // Captura elemento HTML donde se insertaran las tareas
	taskView.innerHTML = ''; // Por default estara en blanco para evitar que se colapsen y repitan las tareas
	for(let i = 0; i < tasks.length; i++){ // i debe ser menor a la longitud del array 'tasks'
		let title = tasks[i].title; // Captura el title (propiedad de 'tasks') de la tarea usando for
		let description = tasks[i].description; // Captura la description (propiedad de 'tasks') de la tarea usando for
		// Crea su estructura HTML para cada tarea encontrada en el array, agregando sus propiedades
		taskView.innerHTML += `<div class="card mb-3">
		<div class="card-body">
		<p>${title} - ${description}</p>
		<a class="btn btn-danger" onclick="deleteTask('${title}')"> Delete </a>
		</div>
		</div>`;
	}

}
getTasks(); // Se llama automaticamente al iniciar la aplicación

// Función para eliminar una tarea
function deleteTask(title){

let tasks = JSON.parse(localStorage.getItem('tasks')); // Obtener el item 'tasks' de localStorage'
// Itera cada elemento de tasks
for ( let i = 0; i < tasks.length; i++){
	if (tasks[i].title == title){ // Si la propiedad title de la tarea iterada es igual a title pasado por parametro a la función (click botón eliminar)...
		tasks.splice(i,1); // Elimina el indice iterado (i) solo un elemento del array
	}
}
localStorage.setItem('tasks', JSON.stringify(tasks)); // Agregar las tareas nuevamente (sin cargar la recien eliminada)
getTasks(); // Automaticamente se reflejara el cambio al volver a llamar todas las tareas.
}