
let listaEmpleados = [];

let editando = false;
let empleadoEditandoId = null; // Para rastrear qué empleado se está editando

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const tareaInput = document.querySelector('#tarea');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if (nombreInput.value === '' || tareaInput.value === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (editando) {
        const empleado = listaEmpleados.find(emp => emp.id === empleadoEditandoId);
        empleado.nombre = nombreInput.value;
        empleado.tarea = tareaInput.value;

        editando = false;
        empleadoEditandoId = null;
    } else {
        const nuevoEmpleado = {
            id: Date.now(), // Generar un ID único
            nombre: nombreInput.value,
            tarea: tareaInput.value
        };

        listaEmpleados.push(nuevoEmpleado);
    }

    // Limpiar el formulario
    nombreInput.value = '';
    tareaInput.value = '';

    mostrarEmpleados();
}

function mostrarEmpleados() {
    const divEmpleados = document.querySelector('.div-empleados');
    divEmpleados.innerHTML = ''; // Limpiar el contenedor antes de mostrar los empleados

    listaEmpleados.forEach(empleado => {
        const { id, nombre, tarea } = empleado;

        const parrafo = document.createElement('p');

        // Envolver el texto en un span
        const texto = document.createElement('span');
        texto.textContent = `${id} - ${nombre} - ${tarea} - `;
        parrafo.appendChild(texto);

        const editarBoton = document.createElement('button');
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) {
    nombreInput.value = empleado.nombre;
    tareaInput.value = empleado.tarea;
    editando = true;
    empleadoEditandoId = empleado.id;
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
}

function eliminarEmpleado(id) {
    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);
    mostrarEmpleados();
}
