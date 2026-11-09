console.log("app.js chargé");

const LONGUEUR_MIN = 5;
const LONGUEUR_MAX = 80;
const MESSAGE_MAX = 500;

const titres = [
    "Le référendum sur le retour du nucléaire en Suisse",
    "L'AI Act européen après le report du Digital Omnibus",
    "Les finances et la sécurité de la Suisse",
];

function titresTries(titres) {
    return [...titres].sort();
}

function chercheDansTitres(titres, texte) {
    const recherche = texte.trim().toLowerCase();
    return titres.filter((titre) => titre.toLowerCase().includes(recherche));
}

function titreExiste(titres, saisie) {
    const propre = saisie.trim().toLowerCase();
    return titres.map((titre) => titre.trim().toLowerCase()).includes(propre);
}

function validerTitre(titres, saisie) {
    const titre = saisie.trim();
    if (titre === "") {
        return "Le titre est obligatoire.";
    }
    if (titre.length < LONGUEUR_MIN) {
        return "Le titre doit faire au moins " + LONGUEUR_MIN + " caractères.";
    }
    if (titre.length > LONGUEUR_MAX) {
        return "Le titre ne doit pas dépasser " + LONGUEUR_MAX + " caractères.";
    }
    if (titreExiste(titres, titre)) {
        return "Ce sujet existe déjà.";
    }
    return "";
}

function validerPseudo(saisie) {
    if (saisie.trim() === "") {
        return "Le pseudo est obligatoire.";
    }
    return "";
}

function validerMessage(saisie) {
    const message = saisie.trim();
    if (message === "") {
        return "Le message est obligatoire.";
    }
    if (message.length > MESSAGE_MAX) {
        return "Le message ne doit pas dépasser " + MESSAGE_MAX + " caractères.";
    }
    return "";
}

function carteSujet(titre) {
    const carte = document.createElement("article");
    carte.classList.add("carte-sujet");

    const h3 = document.createElement("h3");
    h3.textContent = titre;

    carte.appendChild(h3);
    return carte;
}

function afficherSujets(liste) {
    const section = document.querySelector("#sujets");

    const anciennes = section.querySelectorAll(".carte-sujet");
    for (const carte of anciennes) {
        carte.remove();
    }

    for (const titre of liste) {
        section.appendChild(carteSujet(titre));
    }
}

function afficherErreur(idMessage, texte) {
    document.querySelector("#" + idMessage).textContent = texte;
}

if (document.querySelector("#sujets") !== null) {
    afficherSujets(titres);

    const formulaire = document.querySelector("#form-nouveau-sujet");
    const champPseudo = document.querySelector("#pseudo");
    const champTitre = document.querySelector("#titre");
    const champMessage = document.querySelector("#message");

    formulaire.addEventListener("submit", (event) => {
        event.preventDefault();

        const erreurPseudo = validerPseudo(champPseudo.value);
        const erreurTitre = validerTitre(titres, champTitre.value);
        const erreurMessage = validerMessage(champMessage.value);

        afficherErreur("erreur-pseudo", erreurPseudo);
        afficherErreur("erreur-titre", erreurTitre);
        afficherErreur("erreur-message", erreurMessage);

        if (erreurPseudo !== "" || erreurTitre !== "" || erreurMessage !== "") {
            return;
        }

        titres.push(champTitre.value.trim());
        afficherSujets(titres);

        formulaire.reset();
        champPseudo.focus();
    });
}
