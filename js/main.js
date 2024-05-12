const palabras = [
    "De", "Ver", "Claro", "La", "Veces", "Iba", "Que", "Embargo", "Éste", "El", "Partido", "Pesetas", "En", "Personas", "Orden", "Y", "Grupo", "Español", "A", "Cuenta", "Buena", "Los", "Pueden", "Quiere", "Se", "Tienen", "Aquella", "Del", "Misma", "Programa", "Palabras", "Internacional", "Van", "Esas", "Segunda", "Empresa", "Puesto", "Ahí", "Propia", "M", "Libro", "Igual", "Político", "Persona", "Últimos", "Ellas", "Total", "Creo", "Tengo", "Dios", "C", "Española", "Condiciones", "México", "Fuerza", "Solo", "Único", "Acción", "Amor", "Policía", "Puerta", "Pesar", "Zona", "Sabe", "Calle", "Interior", "Tampoco", "Música", "Ningún", "Vista", "Campo", "Buen", "Hubiera", "Saber", "Obras", "Razón", "Ex", "Niños", "Presencia", "Tema", "Dinero", "Comisión", "Antonio", "Servicio", "Hijo", "Última", "Ciento", "Estoy", "Hablar", "Dio", "Minutos", "Producción", "Camino", "Seis", "Quién", "Fondo", "Dirección", "Papel", "Demás", "Barcelona", "Idea", "Especial", "Diferentes", "Dado", "Base", "Capital", "Ambos", "Europa", "Libertad", "Relaciones", "Espacio", "Medios", "Ir", "Actual", "Población", "Empresas", "Estudio", "Salud", "Servicios", "Haya", "Principio", "Siendo", "Cultura", "Anterior", "Alto", "Media", "Mediante", "Primeros", "Arte", "Paz", "Sector", "Imagen", "Medida", "Deben", "Datos", "Consejo", "Personal", "Interés", "Julio", "Grupos", "Miembros", "Ninguna", "Existe", "Cara", "Edad", "Etc.", "Movimiento", "Visto", "Llegó", "Puntos", "Actividad", "Bueno", "Uso", "Niño", "Difícil", "Joven", "Futuro", "Aquellos", "Mes", "Pronto", "Soy", "Hacía", "Nuevos", "Nuestros", "Estaban", "Posibilidad", "Sigue", "Cerca", "Resultados", "Educación", "Atención", "González", "Capacidad", "Efecto", "Necesario", "Valor", "Aire", "Investigación", "Siguiente", "Figura", "Central", "Comunidad", "Necesidad", "Serie", "Organización", "Nuevas", "Calidad"
];

let palabra = '';
let contador = 0;
let cantLetras = 0;
let numIntentos = 0;
let contIntentos = 0;
let palabraTeclado = '';


document.addEventListener('DOMContentLoaded', ()=>{

    const input_Intento = document.querySelector('#intento');
    const btn_Intento = document.querySelector('#btnProbar');
    const bloque_Juego = document.querySelector('#juego');
    
    const btn_Conf = document.querySelector('#btnConf');
    const bloque_Conf = document.querySelector('#config');
    
    const contenedor_Grilla = document.querySelector('#contenedorGrilla');
    const contenedor_Teclado = document.querySelector('#contenedorTeclado');
    const subTitulo = document.querySelector('#subTitulo');

    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close');
    const mensajeModal = document.querySelector('#mensajeModal');
    const tituloModal = document.querySelector('#tituloModal');
    
    const spinner = document.querySelector('.lds-roller');
    btn_Conf.addEventListener('click',obtenerPalabra);
    btn_Intento.addEventListener('click',intento);
    input_Intento.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            intento();
        }
    });


    /*FUNCIONES*/
    //Para obtener la palabra del array de palabras
    function obtenerPalabra(){
        spinner.classList.remove('hidden');
        palabra = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase().split('');
        setTimeout(()=>{
            cantLetras = palabra.length;
            subTitulo.innerHTML = `La palabra tiene ${cantLetras} letras. Adivinala :)`;
            bloque_Conf.classList.add('hidden');
            bloque_Juego.classList.remove('hidden');
            spinner.classList.add('hidden');
            inicializarGrilla();
            crearTeclado();
        }, 2000);

    }
    /*
    Para obtener la palabra mediante un api
    function obtenerPalabra() {
        crearTeclado();
        bloque_Conf.classList.add('hidden');
        bloque_Juego.classList.remove('hidden');
        spinner.classList.remove('hidden');
        // URL de la API
        const apiUrl = 'https://clientes.api.greenborn.com.ar/public-random-word';

        // Parámetros de la solicitud
        const cantidadPalabras = 1; // Obtener una palabra

        // Construir la URL con los parámetros
        const url = `${apiUrl}?c=${cantidadPalabras}`;

        // Encabezados de la solicitud para especificar JSON
        const headers = new Headers();
        headers.append('Accept', 'application/json');

        // Realizar la solicitud
        fetch(url, {
            method: 'GET',
            headers: headers
        })
            .then(response => {
                // Verificar si la respuesta es exitosa
                if (response.ok) {
                    // Parsear la respuesta JSON
                    return response.json();
                } else {
                    // Si hay un error, lanzar una excepción
                    throw new Error('Error al obtener la palabra');
                }
            })
            .then(data => {
                // Manipular los datos obtenidos
                console.log('Palabra obtenida:', data);
                palabra = Array.from(data[0]);
                cantLetras = data[0].length;
                spinner.classList.add('hidden');
                inicializarGrilla();
   
            })
            .catch(error => {
                // Capturar y manejar errores
                console.error('Error:', error);
            });
    }
    */
    function intento(){
        let arrayResultado = [];
        let arrayIntento = Array.from((input_Intento.value).toLowerCase());
        if(arrayIntento.length === cantLetras){
            for(let i=0;i<palabra.length;i++){
                if(palabra[i]===arrayIntento[i]){
                    arrayResultado.push('Verde');
                    crearCelda(arrayIntento[i],'Verde');
                }else{
                    let posicion = palabra.indexOf(arrayIntento[i]);
                    if(posicion!== -1){
                        arrayResultado.push('Amarillo');
                        crearCelda(arrayIntento[i],'Amarillo');
                    }else{
                        arrayResultado.push('Rojo');
                        crearCelda(arrayIntento[i],'Rojo');
                    }
                }
            }

            contIntentos++;
            verificar(arrayResultado);
        }else{
            alert('Ten en cuenta la cantidad de letras!!!');
        }

        
    }

    function crearCelda(letra, color){
        const celda = document.querySelectorAll('.celda');

        celda[contador].innerHTML = letra;
        celda[contador].classList.add(color);

        contador++;

    }

    function inicializarGrilla(){
        numIntentos = parseInt(document.querySelector('#numIntentos').value);
        subTitulo.innerHTML = `La palabra tiene ${cantLetras} letras. Adivinala :)`
        for(let i =0;i<numIntentos;i++){
            const grilla = document.createElement('div');
            grilla.classList.add('grilla');
            contenedor_Grilla.append(grilla);
            for(let j=0;j<cantLetras;j++){
                const celda = document.createElement('div');
                celda.style.border = '1px solid black';
                celda.classList.add('celda', i);
                grilla.appendChild(celda);
            }
        }
    }

    

    function verificar(resultado){
        if(resultado.includes('Amarillo') || resultado.includes('Rojo')){
            if(numIntentos === contIntentos){
                tituloModal.innerHTML = 'Perdiste';
                mensajeModal.innerHTML = `La palabra era: ${palabra.join('')}`;
                modal.classList.add('modal--show');
            }
        }else if(resultado.length>0){
            tituloModal.innerHTML = 'Correcto';
            mensajeModal.innerHTML = `La palabra era: ${palabra.join('')}`;
            modal.classList.add('modal--show');
        }
    }
    
    closeModal.addEventListener('click',(e)=>{
        e.preventDefault();
        modal.classList.remove('modal--show');
        window.location.reload();
    });

    function crearTeclado(){
        let filaUno = ['q','w','e','r','t','y','u','i','o','p','',
        'a','s','d','f','g','h','j','k','l','ñ','','','','z','x','c','v','b','n','m','',''];

        let contador = 0;
        for(let i =0;i<3;i++){
            const grilla = document.createElement('div');
            grilla.classList.add('grilla');
            contenedor_Teclado.append(grilla);
            for(let j=0;j<filaUno.length;j++){
                if(j===11) break;
                const celda = document.createElement('button');
                celda.style.border = '1px solid black';
                celda.innerText = filaUno[contador];
                celda.addEventListener('click',(e)=>{
                    //palabraTeclado+=
                    input_Intento.value += (e.target.textContent);
                })
                celda.classList.add('celda', i, 'teclado');
                grilla.appendChild(celda);
                contador++;
            }
        }
    }



});
