
let currentStep = 1;
const totalSteps = 4;

const regex = {
    nombre: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*)*$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefono: /^(\+?503)?\s?[2-7]\d{3}-?\d{4}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    initEventListeners();
});

function initEventListeners() {
    const passwordToggle = document.getElementById('passwordToggle');
    

    document.getElementById('nombre').addEventListener('input', function() {
        capitalizarNombre(this);
        validarCampo('nombre', regex.nombre);
    });

    document.getElementById('email').addEventListener('input', function() {
        validarCampo('email', regex.email);
    });

    document.getElementById('telefono').addEventListener('input', function() {
        validarCampo('telefono', regex.telefono);
    });

    document.getElementById('password').addEventListener('input', function() {
        validarCampo('password', regex.password);
    });

    passwordToggle.addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const icon = passwordToggle.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    });

    document.getElementById('registroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        let esValido = true;
        
        if (!validarCampo('nombre', regex.nombre)) esValido = false;
        if (!validarCampo('email', regex.email)) esValido = false;
        if (!validarCampo('telefono', regex.telefono)) esValido = false;
        if (!validarCampo('password', regex.password)) esValido = false;
        
        if (esValido) {
            document.getElementById('resumenDatos').innerHTML = `
                <strong>Nombre:</strong> ${document.getElementById('nombre').value}<br>
                <strong>Email:</strong> ${document.getElementById('email').value}
            `;
            
            document.getElementById('mensajeExito').style.display = 'block';
            
            document.getElementById('mensajeExito').scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                document.getElementById('registroForm').reset();
                document.getElementById('mensajeExito').style.display = 'none';
                document.querySelectorAll('.form-control').forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });

                goToStep(1);
            }, 5000);
        }
    });
}

function validarCampo(campoId, regex) {
    const campo = document.getElementById(campoId);
    const esValido = regex.test(campo.value.trim());
    
    if (esValido) {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
    } else {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
    }
    
    return esValido;
}

function capitalizarNombre(input) {
    const cursorPosition = input.selectionStart;
    const originalValue = input.value;
    
    input.value = originalValue
        .toLowerCase()
        .split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' ');
    
    input.setSelectionRange(cursorPosition, cursorPosition);
}

function nextStep(step) {
    let isValid = true;
    
    if (step === 2) isValid = validarCampo('nombre', regex.nombre);
    if (step === 3) isValid = validarCampo('email', regex.email);
    if (step === 4) isValid = validarCampo('telefono', regex.telefono);
    
    if (isValid) {
        goToStep(step);
    }
}

function prevStep(step) {
    goToStep(step);
}

function goToStep(step) {
    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.remove('active');
    });

    document.getElementById('step' + step).classList.add('active');
    currentStep = step;
    document.getElementById('currentStep').textContent = step;
    
    updateProgressBar();
}

function updateProgressBar() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}
