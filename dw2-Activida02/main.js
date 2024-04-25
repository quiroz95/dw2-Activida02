$(document).ready(function() {
  // Función para agregar botones de "Actualizar" y "Borrar" a cada fila de la tabla de registro
  function agregarBotonesAccion() {
    $('#registroBody tr').each(function() {
      var btnActualizar = '<button type="button" class="btn btn-sm btn-primary btn-accion">Actualizar</button>';
      var btnBorrar = '<button type="button" class="btn btn-sm btn-danger btn-accion">Borrar</button>';
      var btnGroup = '<div class="btn-group pull-right">' + btnActualizar + btnBorrar + '</div>';
      $(this).append('<td>' + btnGroup + '</td>');
    });
  }

  // Función para mostrar la tabla de registro
  function mostrarTablaRegistro() {
    var registroTable = $('#registroBody');
    registroTable.empty(); // Limpiar la tabla antes de agregar nuevos datos

    // Obtener datos de localStorage (si existen)
    var registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Agregar filas a la tabla con los datos de registro
    registros.forEach(function(registro) {
      var rowHTML = '<tr>' +
                    '<td>' + registro.nombre + '</td>' +
                    '<td>' + registro.apellido + '</td>' +
                    '<td>' + registro.correo + '</td>' +
                    '<td>' + registro.contraseña + '</td>' +
                    '<td>' + registro.tipoBici + '</td>' +
                    '<td>' + registro.modeloBici + '</td>' +
                    '<td>' + (registro.recibirInformacion ? 'Sí' : 'No') + '</td>' +
                    '</tr>';
      registroTable.append(rowHTML);
    });

    // Llamar a la función para agregar botones de acción después de que se haya mostrado la tabla
    agregarBotonesAccion();
  }

  // Mostrar tabla de registro al cargar la página
  mostrarTablaRegistro();

  // Manejador de evento para el formulario de registro
  $('.form-signup').submit(function(e) {
    e.preventDefault(); // Evitar envío del formulario

    // Obtener datos del formulario
    var formData = {
      nombre: $('#name').val(),
      apellido: $('#lastname').val(),
      correo: $('#input-email').val(),
      contraseña: $('#input-password').val(),
      tipoBici: $('select[name="bike"]').val(),
      modeloBici: $('#input-social').val(),
      recibirInformacion: $('input[type="checkbox"]').prop('checked')
    };

    // Guardar datos en localStorage
    var registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(formData);
    localStorage.setItem('registros', JSON.stringify(registros));

    // Mostrar mensaje de éxito
    toastr.success('Usuario registrado correctamente');

    // Mostrar tabla de registro actualizada
    mostrarTablaRegistro();

    // Limpiar los campos del formulario después de enviarlo
    $('.form-signup')[0].reset();
  });

  // Manejador de evento para el botón de borrar todos los registros
  $('#clearButton').click(function() {
    localStorage.removeItem('registros'); // Borrar todos los registros del almacenamiento local
    mostrarTablaRegistro(); // Mostrar la tabla de registro actualizada (vacía)
  });
});

// Objeto que contiene los modelos y códigos de barras correspondientes a cada tipo de bici
const modelos = {
  urbana: [
    { modelo: "UrbanaX", codigo: "1234567890123" },
    { modelo: "UrbanaY", codigo: "2345678901234" }
  ],
  treking: [
    { modelo: "TrekkingA", codigo: "3456789012345" },
    { modelo: "TrekkingB", codigo: "4567890123456" }
  ],
  electrica: [
    { modelo: "EléctricaX", codigo: "5678901234567" },
    { modelo: "EléctricaY", codigo: "6789012345678" }
  ],
  estatica: [
    { modelo: "EstáticaA", codigo: "7890123456789" },
    { modelo: "EstáticaB", codigo: "8901234567890" }
  ]
};

// Función para cargar los modelos correspondientes según el tipo de bici seleccionado
function cargarModelos() {
  const tipoBici = document.querySelector("select[name='bike']").value;
  const modeloSelect = document.querySelector("#input-social");
  
  // Limpiar opciones previas
  modeloSelect.innerHTML = "";
  
  // Agregar las opciones correspondientes al tipo de bici seleccionado
  modelos[tipoBici].forEach(modelo => {
    const option = document.createElement("option");
    option.text = modelo.modelo;
    modeloSelect.add(option);
  });
}

// Asociar la función cargarModelos al evento 'change' del select de tipo de bici
document.querySelector("select[name='bike']").addEventListener("change", cargarModelos);

// Función para agregar una nueva fila a la tabla con el modelo y su código de barras
function agregarFila(modelo, codigo) {
  const tbody = document.getElementById("registroBody");
  const row = tbody.insertRow();
  const cellModelo = row.insertCell();
  const cellCodigo = row.insertCell();

  cellModelo.textContent = `Modelo: ${modelo}`;
  cellCodigo.textContent = `Código de barras: ${codigo}`;
}

// Ejemplo de cómo llamar a la función para agregar una fila
agregarFila("UrbanaX", "1234567890123");
