# Les Petits Plats 🍴

Bienvenue dans le dépôt du projet "Les Petits Plats" ! Ce site est conçu pour offrir une expérience fluide et agréable dans la recherche de recettes de cuisine. Inspiré des grands sites comme Marmiton ou 750g, il vise à devenir une référence en matière de recettes en ligne.

---

## Table des matières

- [Aperçu du projet](#aperçu-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Installation et démarrage](https://github.com/BaracusHanson/LesPetitsPlats/blob/main/package.json)
- [programmation fonctionnelle](https://github.com/BaracusHanson/LesPetitsPlats/tree/programmation-fonctionnelle?tab=readme-ov-file)
- [Boucles natives](https://github.com/BaracusHanson/LesPetitsPlats/tree/BouclesNatives?tab=readme-ov-file)
- [Contact](#contact)

---

## Aperçu du projet

Le projet consiste en un site de recettes de cuisine. Les objectifs principaux sont :

1. **Une recherche rapide et performante** pour les utilisateurs.
2. **Un design moderne** respectant la maquette fournie.
3. Utiliser une Logique programmation fonctionnelle ex (map,filter, reduce...)
4. Utiliser une Logique programmation avec des Boucles natives ex (for, while, foreach...) .

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
Les-Petits-Plats/
├── assets/                # Images et ressources statiques
├── css/                   # Fichiers CSS
│   ├── styles.css         # Feuille de styles principale
├── js/                    # Scripts JavaScript
│   ├── appareil.js        # gestion de la logique de filtreage des recettes en fonction des appareils
│   ├── ingredients.js     # gestion de la logique de filtreage des recettes en fonction des apingredients
│   ├── ustensiles.js      # gestion de la logique de filtreage des recettes en fonction des ustensiles
│   └── main.js            # Script principal pour l'intégration des fonctionnalités
├── index.html             # Page principale du site
├── README.md              # Documentation du projet
├── filter.js              # script principal de recherche de recettes
├── fetchRecipes.js        # script de récuperation des données/recettes
├── recipesCards.js        # script qui genere la presentation des cards de chaque recette
└── data/                  # Données JSON
    └── recipes.json       # Liste des 50 recettes avec images
```
