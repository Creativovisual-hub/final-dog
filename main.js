const apiUrlBase = 'https://dog.ceo/api';

// Cargar la lista de razas en el select
fetch(`${apiUrlBase}/breeds/list/all`)
    .then(res => res.json())
    .then(data => {
        Object.keys(data.message).forEach(raza => {
            const option = new Option(raza, raza);
            document.getElementById('raza').appendChild(option);
        });
    })
    .catch(err => console.error("Error al cargar razas:", err));

// Validar selección de raza y mostrar imagen del perro
document.getElementById('btnBuscar').addEventListener('click', () => {
    const razaSeleccionada = document.getElementById('raza').value;
    const mensajeError = document.getElementById('mensajeError');

    if (!razaSeleccionada || razaSeleccionada === "Selecciona") {
        mensajeError.classList.remove('hidden');
    } else {
        mensajeError.classList.add('hidden');
        fetch(`${apiUrlBase}/breed/${razaSeleccionada}/images/random`)
            .then(res => res.json())
            .then(data => {
                document.getElementById('imagenPerro').src = data.message;
                document.getElementById('resultadoPerro').classList.remove('hidden');
                localStorage.setItem('imagenAdoptada', data.message);
            })
            .catch(err => console.error("Error al obtener la imagen del perro:", err));
    }
});

// Mostrar modal al presionar "Adoptar"
document.getElementById('btnAdoptar').addEventListener('click', () => {
    new bootstrap.Modal(document.getElementById('adoptModal')).show();
});

// Validar el formulario y redirigir a la página de adopción
document.getElementById('btnModalAdoptar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const rut = document.getElementById('rut').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();

    if (!nombre || !rut || !ciudad) {
        alert("Por favor, completa todos los campos del formulario.");
    } else {
        localStorage.setItem('nombreUsuario', nombre);
        localStorage.setItem('ciudadUsuario', ciudad);
        window.location.href = 'adoptado.html';
    }
});





















