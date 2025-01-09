# Les Petits Plats 🍴

## Cette branche implémente la méthode searchRecipesNative, une fonction de recherche optimisée pour filtrer les recettes en fonction de critères spécifiques. Elle utilise une boucle native pour parcourir les recettes et vérifier si elles correspondent à tous les critères donnés.

Fonctionnalité principale
La fonction searchRecipesNative :

Prend en entrée une liste de recettes et une liste de critères.
Retourne les recettes qui correspondent à tous les critères fournis.
Compare les critères avec les noms, descriptions et ingrédients des recettes.
Utilise des normalisations pour ignorer la casse et les accents.
Structure de la fonction
Normalisation du texte :
Les textes (noms, descriptions, ingrédients) sont normalisés pour éviter les erreurs dues à la casse ou aux accents.
Boucles natives :
La fonction utilise des boucles natives (for) pour parcourir les recettes, les ingrédients et les critères.
Validation des critères :
Pour chaque critère, la fonction vérifie si le texte est présent dans le nom, la description ou les ingrédients d’une recette.
Retour des résultats :
Les recettes correspondantes sont ajoutées à une liste, qui est ensuite retournée.
Performance
La méthode searchRecipesNative est comparée à d'autres implémentations (comme searchRecipesFunctional) pour évaluer :

La vitesse d'exécution.
La consommation de ressources.
Elle est particulièrement adaptée pour les cas où l'optimisation des boucles est nécessaire.

## Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [lien du test](https://jsben.ch/Hdwds)

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
│   ├── ingredients.js     # gestion de la logique de filtreage des recettes en fonction des ingredients
│   ├── ustensiles.js      # gestion de la logique de filtreage des recettes en fonction des ustensiles
│   └── index.js           # Script principal pour l'intégration des fonctionnalités
├── index.html             # Page principale du site
├── README.md              # Documentation du projet
├── filter.js              # script de la fonction de trie à boucle native
├── fetchRecipes.js        # script de récuperation des données/recettes
├── recipesCards.js        # script qui genere la presentation des cards de chaque recette
└── data/                  # Données JSON
    └── recipes.json       # Liste des 50 recettes avec images
```
