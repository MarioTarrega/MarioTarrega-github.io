var DataFrame = dfjs.DataFrame;
const contenedor = document.getElementById('dragg');
const archivo = document.getElementById('fileInput');
const contenidos = document.getElementById('section');

// archivo.addEventListener('change', function(e) { 
//     console.log( archivo.files);
// });

contenedor.addEventListener('drop' , (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // console.log(files);
    // window.alert("Conseguido!")

    if(files.length > 0){
        processarArchivo(files[0]);
    }

    // Restaurar estado inicial
    // contenedor.style.transition = 'height ease-in-out';
    // contenedor.style.scale = "1";
    // contenedor.style.backgroundColor = "#723e4e"; 
    // contenedor.style.color = "white";
});
contenedor.addEventListener('dragover', (e) => {
    e.preventDefault();
    contenedor.style.transition = 'height ease-in-out';
    contenedor.style.scale = "1.2";
    contenedor.style.backgroundColor = "white";
    contenedor.style.color = "#723e4e"; 
});

contenedor.addEventListener('dragleave', (e) => {
    contenedor.style.transition = 'height ease-in-out';
    contenedor.style.scale = "1";
    contenedor.style.backgroundColor = "#723e4e"; 
    contenedor.style.color = "white";
    
});
contenedor.addEventListener('mouseover', (e) => {
    contenedor.style.transition = 'height ease-in-out';
    contenedor.style.scale = "1.2";
    contenedor.style.backgroundColor = "white";
    contenedor.style.color = "#723e4e";
});

contenedor.addEventListener('mouseout', (e) => {
    contenedor.style.transition = 'height ease-in-out';
    contenedor.style.scale = "1";
    contenedor.style.backgroundColor = "#723e4e"; 
    contenedor.style.color = "white";
});

let valorGrafica = 0;
let valorTabla = 0;

function updateSliderValueGraficas(){
    var slider = document.getElementById("sliderAnoG");
    var output = document.getElementById("sliderValueG");

    valorGrafica = slider.value;
    output.innerHTML = "Año seleccionado: " + valorGrafica;
    return valorGrafica;
}

function updateSliderValueTablas(){

    var slider = document.getElementById("sliderAnoT");
    var output = document.getElementById("sliderValueT");

    valorTabla = slider.value;
   // console.log(valorTabla);
    output.innerHTML = "Año seleccionado: " + valorTabla;
    return valorTabla;
}

function updateSliders(){
    
    const contenedorG = document.getElementById('containerG');
    const contenedorT = document.getElementById('containerT');
    const valorG = updateSliderValueGraficas();
    const valorT = updateSliderValueTablas();

    if(valorG >= 2009 && valorG <= 2023){
    }

    if(valorT >= 2009 && valorT <= 2023){
        showTables(valorT)
        window.alert("Estoy en UpdateSliders" + valorT)
    }

}

function processarArchivo(file){

    const leer = new FileReader();
    leer.onload = function(e){
        const contenido = e.target.result;
        // console.log(contenido);
    };
    leer.onerror = function(e){
        console.log(e);
    }
    leer.readAsDataURL(file);

    DataFrame.fromCSV(file)
        .then(df => {
            
            preprocessDF(df);  
            roundDigitsDF(df);
            groupedDF(df);
            getDataFromDF(df);
            showTables(df);
        

    })

    document.querySelector(".container2").style.display = "grid";
    document.querySelector(".contenedor2").style.display = "grid";
    document.querySelector(".contenedor3").style.display = "block";
    
    var opcionG = document.getElementById('menu-graficas');
    var opcionT = document.getElementById('menu-tablas');

    opcionG.style.display = "block";
    opcionT.style.display = "block";
   
}

function preprocessDF(df) { 
    const df2 = df.cast('Year', Number)
            .cast('Month', String)
            .cast('VentasA', parseFloat)
            .cast('VentasB', parseFloat)
            .cast('VentasC', parseFloat)
            .cast('VentasD', parseFloat);

    // Fill missing values with the mean of each column
    const df3 = df2.fillMissingValues(roundDigitsDF(df2));

    return df3; 
}

function roundDigitsDF(df) {
    const df2 = df.listColumns();
    df2.forEach(column => {
        df = df =df.withColumn(
            column,
            row => Math.round(row.get(column)*100)/100)
        });
    return df2;
}

function groupedDF(df) {
    const agrupar = df.groupBy('Year')

    const df2 = agrupar.aggregate(group => group.stat.mean('VentasA'))
                  .rename("aggregation","VentasA")
    const df2_1 = agrupar.aggregate(group => group.stat.mean('VentasB'))
                     .rename("aggregation","VentasB")
    const df2_2 = agrupar.aggregate(group => group.stat.mean('VentasC'))
                     .rename("aggregation","VentasC")
    const df2_3 = agrupar.aggregate(group => group.stat.mean('VentasD'))
                     .rename("aggregation","VentasD");
    
    const df3 = df2.join(df2_1, 'Year').join(df2_2, 'Year').join(df2_3, 'Year');
console.log(df3.show());
    return df3;
}

function getDataFromDF(df){
    const df2 = df.toArray();
    return df2;

}

function showTables(df){
    const anoT = document.getElementById('sliderAnoT').value;
    const anoM = df.stat.max('Year');
    const df2 = df.filter(row => row.get('Year') >= anoT && row.get('Year') <= anoM);
    const df3 = roundDigitsDF(df2);
    
    columnas = df2.listColumns() // Array con los nombres de la columna
    valores = df2.toArray() // Array de filas
    const table = document.createElement("table")
    // Creamos la cabecera de la tabla                
    const headerRow = document.createElement("tr")
                     
    columnas.forEach(column => {     
        const th = document.createElement("th")     
        th.textContent = column
        headerRow.appendChild(th)
        })
    table.appendChild(headerRow)
    // Creamos las filas de las tablas
    valores.forEach(row => {
        const tr = document.createElement("tr")
        row.forEach(value => {
            const td = document.createElement("td")
            td.textContent = value
            tr.appendChild(td)
            })
        table.appendChild(tr)
    })
    // Añadimos las etiquetas HTML de la tabla al body
    document.getElementById("total").appendChild(table)
}

document.addEventListener('DOMContentLoaded', function() {
    const container2 = document.querySelectorAll('.container2 .section');
    
    container2.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.transition = 'height ease-in-out';
            element.style.backgroundColor = "#9f494c";
        });

        element.addEventListener('mouseout', () => {
            element.style.transition = 'height ease-in-out';
            element.style.backgroundColor = "#723e4e"; 
            element.style.color = "white";
        });
    });
});

