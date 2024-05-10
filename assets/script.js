
// Initialisation de la carte
var map = L.map('map').setView([46.160329, -1.151139], 13);

// Ajoute une couche de tuiles
// D'autres tileLayers disponibles: https://leaflet-extras.github.io/leaflet-providers/preview/
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


// *******************************


// Récupération du tableau des données
fetch('./DATA/data.json')
    .then((response) => response.json())
    .then((datas) => {
        // Debug
        console.table(datas);

        // Parcourir le tableau
        // Doc: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
        /*
            array.forEach attend une fonction de callback (retour) à laquelle on
            passe en paramètre l'élément en cours
        */
        datas.forEach(

            /* Syntaxe old school */
            // Fonction anonyme
            /*
            function (elementEnCours) {
                // On affiche chaque element
                console.log ("Affichage de l'élément en cours:");
                console.table (elementEnCours);
            }
            */

            /* Syntaxe fonction fléchées (arrow function) */
            elementEnCours => {
                console.log ("Adresse :");
                console.info (elementEnCours.fields.obs + " " + elementEnCours.fields.adresse);

                console.log ("Coordonnées :");
                console.log("Latitude: " + elementEnCours.fields.geo_point_2d[0]);
                console.log("Longitude: " + elementEnCours.fields.geo_point_2d[1]);

                // Ajout du marker sur la carte
                // doc: https://leafletjs.com/examples/custom-icons/
                L.marker(
                    [
                        elementEnCours.fields.geo_point_2d[1], // latitude
                        elementEnCours.fields.geo_point_2d[0] // longitude
                    ]
                ).addTo(map);
            }
        );
    });