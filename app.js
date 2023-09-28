        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.register(
              '/sw.js',
              {
                scope: '/',
              }
            );
            if (registration.installing) {
              console.log('Service worker installing');
            } else if (registration.waiting) {
              console.log('Service worker installed');
            } else if (registration.active) {
              console.log('Service worker active');
            }
          } catch (error) {
            console.error(`Registration failed with ${error}`);
          }
        }
	
        const listeChampsValeursJson = document.getElementById("liste-champs-valeurs-json");

        document.getElementById("btnAppelerAPI").addEventListener("click", function() {
 
            // URL de l'API REST
            const apiUrl = "http://localhost:8080/poc-mbdd.json";

            // Effectuer la demande POST
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Effacez le contenu précédent de la liste
                    listeChampsValeursJson.innerHTML = "";

                    // Parcourez les champs JSON et affichez-les dans la liste HTML
                    
                    for (const champ in data) {
                        if (data.hasOwnProperty(champ)) {
                            const li = document.createElement("li");
                            li.textContent = `${champ}: ${data[champ]}`;
                            listeChampsValeursJson.appendChild(li);
                        }
                    }
                })
                .catch(error => {
                    console.error("Erreur lors de l'appel API :", error);
                });
        });
