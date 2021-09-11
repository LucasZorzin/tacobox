let mensajeBienvenida = "\nTACOBOX\nDesde lo más profundo de la cultura Mexicana, llega a sus paladares una comida aunténtica.";
alert(mensajeBienvenida);

let totalComida = 0;
let arrayComida = '';

function compraComida() {

    
    let comidaElegida = prompt(`POR FAVOR LEA EL MENÚ Y A CONTINUACIÓN SELECCIONE EL NÚMERO CORRESPONDIENTE A LO QUE DESEE:
    
    -COMIDAS-
    1) Tacos al pastor - $900
    2) Burritos - $750
    3) Nachos - $400

    -TRAGOS-
    4) Tequila Sunrise - $300
    5) Margarita Sunset - $400
    6) Michelada - $500


    (Todos los platos están acompañados con papas y gaseosa).   
    `)
    
    arrayComida = comidaElegida.split(',').map(function(item) {
        return item.trim();
    });

    console.log(arrayComida)

    for (let i = 0; i < arrayComida.length; i++) {
        
    
        switch(parseInt(arrayComida[i])){
            case 1:
                totalComida += 900;
                console.log("900 pesos");
                break;
            case 2:
                totalComida += 750;
                console.log("750 pesos");
                break;
            case 3:
                totalComida += 400;
                console.log("400 pesos");
                break;
            case 4:
                totalComida += 300;
                console.log("300 pesos");
                break;
            case 5:
                totalComida += 400;
                console.log("400 pesos");
                break;
            case 6:
                totalComida += 500;
                console.log("500 pesos");
                break;
        } 
    }

    
}

compraComida()
let preguntaMasComida = prompt("¿Desea pedir algo más? SI o NO")
let confirmaMasComida = preguntaMasComida.toUpperCase();


while ((arrayComida != '')&&(confirmaMasComida == "SI")){
    do{
        compraComida();
        
        preguntaMasComida = prompt("Quiere seguir comprando ? Si o No")
        confirmaMasComida = preguntaMasComida.toUpperCase();

    }while(confirmaMasComida == "SI")
}

console.log(`Total Gastado: ${totalComida}`) // para verlo en consola

if (arrayComida != '') {
alert(`Total Gastado: ${totalComida}`) // visible para el cliente
}

let mensajeDespedida = "Gracias por visitar nuestra tienda. \n¡Hasta Luego!";
alert(mensajeDespedida);
