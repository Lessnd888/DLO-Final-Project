document.addEventListener('DOMContentLoaded', function () {
    const newContactBtn = document.getElementById('newContact');
    const contactForm = document.getElementById('contactForm');
    const contactContainer = document.getElementById('contactContainer');
    const departmentFilterInput = document.getElementById('departmentFilter');
    let contactIdCounter = 0; // Contador para generar identificadores únicos

    // Manejador de evento para mostrar/ocultar el formulario
    newContactBtn.addEventListener('click', function () {
        if (contactForm.style.display === 'none') {
            contactForm.style.display = 'block';
            contactContainer.style.display = 'none';
        } else {
            contactForm.style.display = 'none';
            contactContainer.style.display = 'flex';
        }
    });

    // Manejador de evento para guardar un nuevo contacto
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveContact();
        contactForm.reset();
        contactForm.style.display = 'none';
        contactContainer.style.display = 'flex'; // Mostrar la lista de contactos después de guardar un nuevo contacto
    });

    // Función para guardar un nuevo contacto
    function saveContact() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const department = document.getElementById('department').value;
        const address = document.getElementById('address').value;
        const position = document.getElementById('position').value;
        const contactId = 'contact_' + contactIdCounter++; // Generar un identificador único

        const contactCard = document.createElement('div');
        contactCard.id = contactId; // Establecer el identificador único
        contactCard.classList.add('card', 'mb-3');
        contactCard.style.margin = '5px';
        contactCard.style.padding = '5px';
        contactCard.style.display = 'flex';
        contactCard.style.flexWrap = 'wrap';
        contactCard.id = contactId; // Establecer el identificador único
        contactCard.classList.add('card', 'mb-3');

        // Cambiar el color del div según el departamento
        switch (department) {
            case 'Finanzas':
                contactCard.style.backgroundColor = '#407445'; // Verde
                break;
            case 'Ventas':
                contactCard.style.backgroundColor = '#724747'; // Rojito
                break;
            case 'RRHH':
                contactCard.style.backgroundColor = '#746A40'; // Amarillo
                break;
            case 'Administración':
                contactCard.style.backgroundColor = '#445078'; // Gris
                break;
            default:
                contactCard.style.backgroundColor = '#6c757d'; // 
        }

        contactCard.style.color = 'white';
        contactCard.style.width = '350px';

        contactCard.innerHTML = `
        <div class="card-body" id="card-body_${contactId}">
            <ul class="card-body" style="position: relative;">
                <input style="font-size: 30px; width: 50px; position: absolute; top: -11px; right: -22px;" value="..." class="btn dropdown-toggle" type="button" id="departmentSelect_${contactId}" data-bs-toggle="dropdown" aria-expanded="false">
                </input>
                <li class="card-title">
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" onclick="editContact('${contactId}')">Editar</a></li>
                        <li><a class="dropdown-item" href="#" onclick="eliminarContacto('${contactId}')">Eliminar</a></li>
                        <li><a class="dropdown-item" href="tel:${phone}">Llamar</a></li>
                        <li><a class="dropdown-item" href="https://wa.me/${phone}">WhatsApp</a></li>
                    </ul>
                </li>
                <center><img src="https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=yqhDz48CzADqRw&pid=ImgRaw&r=0" width="100px" alt=""></center>
                <center><li class="card-title" id="title_${contactId}">${name}</li></center>
                <center><li class="card-subtitle mb-1" id="little_${contactId}">${department}</li></center>
                <li style="text-align: left;" class="card-text" id="item_${contactId}"><b>Cargo:</b>${position}</li>
                <li style="text-align: left;" class="card-text" id="item_${contactId}"><b>Tel:</b>${phone}</li>
                <li style="text-align: left;" class="card-text" id="item_${contactId}"><b>Mail: </b>${email}</li>
                <li style="text-align: left;" class="card-text" id="item_${contactId}"><b>Dirección:</b>${address}</li>
            </ul>
        </div>
        `;
        contactContainer.appendChild(contactCard);
    }

    // Agregar estilo flexbox para el contenedor de contactos
    contactContainer.style.display = 'flex';
    contactContainer.style.flexWrap = 'wrap';

    // Manejador de eventos para el filtro de departamentos
    departmentFilterInput.addEventListener('click', function (event) {
        const department = event.target.dataset.department;
        if (department) {
            filterContactsByDepartment(department);
            // Actualizar el valor del input con el nombre del departamento seleccionado
            departmentFilterInput.value = department; // Aquí se actualiza el valor del input
        }
    });

    // Función para filtrar contactos por departamento
    function filterContactsByDepartment(department) {
        const contactCards = contactContainer.querySelectorAll('.card');
        contactCards.forEach(function (contactCard) {
            const contactDepartment = contactCard.querySelector('.card-subtitle').textContent;
            if (department === 'Todos' || contactDepartment === department) {
                contactCard.style.display = 'flex';
            } else {
                contactCard.style.display = 'none';
            }
        });
    }

   // Función para editar un contacto ((me jodi los huevosssss)se elimina y se crea otro)
window.editContact = function (contactId) {
    // Obtener los datos del contacto existente
    const nameElement = document.getElementById(`title_${contactId}`);
    const departmentElement = document.getElementById(`little_${contactId}`);
    const positionElement = document.getElementById(`item_${contactId}`).textContent.split(':')[1].trim();
    const phoneElement = document.getElementById(`item_${contactId}`).nextElementSibling.textContent.split(':')[1].trim();
    const emailElement = document.getElementById(`item_${contactId}`).nextElementSibling.nextElementSibling.textContent.split(':')[1].trim();
    const addressElement = document.getElementById(`item_${contactId}`).nextElementSibling.nextElementSibling.nextElementSibling.textContent.split(':')[1].trim();

    // Llenar el formulario de edición con los datos del contacto
    document.getElementById('name').value = nameElement.textContent;
    document.getElementById('phone').value = phoneElement;
    document.getElementById('email').value = emailElement;
    document.getElementById('department').value = departmentElement.textContent;
    document.getElementById('address').value = addressElement;
    document.getElementById('position').value = positionElement;

    // Mostrar el formulario de edición y ocultar el formulario de creación
    contactForm.style.display = 'block';
    contactContainer.style.display = 'none';

    // Eliminar el contacto existente del DOM
    const contactCard = document.getElementById(contactId);
    contactCard.remove();
};
 // Función para eliminar un contacto
 window.eliminarContacto = function (contactId) {
    // Eliminar el contacto del DOM
    const contactCard = document.getElementById(contactId);
    contactCard.remove();
};

});
