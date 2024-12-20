# Les Petits Plats 🍴  
Bienvenue dans le dépôt du projet "Les Petits Plats" ! Ce site est conçu pour offrir une expérience fluide et agréable dans la recherche de recettes de cuisine. Inspiré des grands sites comme Marmiton ou 750g, il vise à devenir une référence en matière de recettes en ligne.  

---

## Table des matières  
- [Aperçu du projet](#aperçu-du-projet)  
- [Technologies utilisées](#technologies-utilisées)  
- [Structure du projet](#structure-du-projet)  
- [Installation et démarrage](#installation-et-démarrage)  
- [Fonctionnalités principales](#fonctionnalités-principales)  
- [Contributions](#contributions)  
- [Contact](#contact)  

---

## Aperçu du projet  
Le projet consiste en un site de recettes de cuisine. Les objectifs principaux sont :  
1. **Une recherche rapide et performante** pour les utilisateurs.  
2. **Un design moderne** respectant la maquette fournie.  
3. Une architecture évolutive pour intégrer facilement les futures fonctionnalités.  

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
│   └── framework/         # Fichiers liés au framework CSS choisi
├── js/                    # Scripts JavaScript
│   ├── search-imperative.js  # Implémentation avec boucles natives
│   ├── search-functional.js  # Implémentation avec méthodes fonctionnelles
│   ├── utils.js           # Fonctions utilitaires (par ex. nettoyage d'entrée)
│   └── main.js            # Script principal pour l'intégration des fonctionnalités
├── index.html             # Page principale du site
├── README.md              # Documentation du projet
└── data/                  # Données JSON
    └── recipes.json       # Liste des 50 recettes avec images
