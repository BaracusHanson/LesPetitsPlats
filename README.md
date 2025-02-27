# Les Petits Plats 🍴

Bienvenue dans le dépôt du projet "Les Petits Plats" ! Ce site est conçu pour offrir une expérience fluide et agréable dans la recherche de recettes de cuisine. Inspiré des grands sites comme Marmiton ou 750g, il vise à devenir une référence en matière de recettes en ligne.

---

## Table des matières

- [Aperçu du projet](#aperçu-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [lien du test jsben.ch](https://jsben.ch/Hdwds)


---

## Aperçu du projet

1. **Offrir une recherche rapide et efficace pour les utilisateurs.**
2. **Développer et évaluer un algorithme de tri à boucle native et a foucle fonctionnelle (map , filter, ...).**
3. **Justifier le choix de l'algorithme retenu.**

---

## Technologies utilisées

### **Front-End**

- **HTML5** : Structure des pages web.
- **CSS3** : [Tailwind CSS](https://tailwindcss.com/).
- **JavaScript Vanilla** : Logique fonctionnelle et interactions utilisateur.

### **Outils supplémentaires**

- **Git** : Gestion des versions et collaboration.
- **Jsben.ch** : Analyse de performance des algorithmes.
- **draw.io** : Création des diagrammes et algorigrammes.

---

## Structure du projet

Voici une description simplifiée de l'arborescence du projet :

```plaintext


Branche principale main :

├── assets/                # Images et ressources statiques
├── css/                   # Fichiers CSS
│   ├── main.css           # Feuille de styles principale
│   └── reset.css          # Réinitialisation des styles
├── js/                    # Scripts JavaScript
│   ├── index.js             # Script principal de l'application
├── index.html             # Page principale du site
├── README.md              # Documentation du projet
└── data/                  # Données JSON
    └── recipes.json       # Liste des recettes avec images



Branche fonctionnalité Boucles Natives :

Les-Petits-Plats/
├── assets/ # Images et ressources statiques
├── css/ # Fichiers CSS
│ ├── styles.css # Feuille de styles principale
├── js/ # Scripts JavaScript
│ ├── appareil.js # gestion de la logique de filtreage des recettes en fonction des appareils
│ ├── ingredients.js # gestion de la logique de filtreage des recettes en fonction des ingredients
│ ├── ustensiles.js # gestion de la logique de filtreage des recettes en fonction des ustensiles
│ └── index.js # Script principal pour l'intégration des fonctionnalités
├── index.html # Page principale du site
├── README.md # Documentation du projet
├── filter.js # script de la fonction de trie à boucle native
├── fetchRecipes.js # script de récuperation des données/recettes
├── recipesCards.js # script qui genere la presentation des cards de chaque recette
└── data/ # Données JSON
└── recipes.json # Liste des 50 recettes avec images


Branche fonctionnalité Boucles fonctionnelles (filter/map ...)  :

├── assets/ # Images et ressources statiques
├── css/ # Fichiers CSS
│ ├── styles.css # Feuille de styles principale
├── js/ # Scripts JavaScript
│ ├── appareil.js # gestion de la logique de filtreage des recettes en fonction des appareils
│ ├── ingredients.js # gestion de la logique de filtreage des recettes en fonction des ingredients
│ ├── ustensiles.js # gestion de la logique de filtreage des recettes en fonction des ustensiles
│ └── main.js # Script principal pour l'intégration des fonctionnalités
├── index.html # Page principale du site
├── README.md # Documentation du projet
├── filter.js # script de la fonction de trie à boucle fonctionnelle
├── fetchRecipes.js # script de récuperation des données/recettes
├── recipesCards.js # script qui genere la presentation des cards de chaque recette
└── data/ # Données JSON
└── recipes.json # Liste des 50 recettes avec images
```
