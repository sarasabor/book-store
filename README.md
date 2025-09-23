# 📚 BOOK-STORE - Librairie en ligne

Une application web complète de librairie en ligne construite avec React et Node.js, permettant aux utilisateurs de parcourir, rechercher et découvrir des livres par genre.

## 🚀 Fonctionnalités

- **Authentification sécurisée** : Inscription et connexion utilisateur avec JWT
- **Catalogue de livres** : Affichage de tous les livres disponibles
- **Recherche par genre** : Filtrage des livres par catégorie
- **Détails des livres** : Pages détaillées pour chaque livre
- **Interface responsive** : Design adaptatif avec Tailwind CSS
- **Système de contact** : Formulaire de contact intégré

## 🛠️ Technologies utilisées

### Frontend

- **React 18.3.1** - Framework JavaScript
- **React Router DOM** - Navigation et routage
- **Tailwind CSS** - Framework CSS
- **Axios** - Requêtes HTTP
- **React Hot Toast** - Notifications
- **React Icons** - Icônes

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification
- **Bcrypt** - Hachage des mots de passe
- **CORS** - Gestion des requêtes cross-origin

## 📁 Structure du projet

```
BOOK-STORE/
├── book-store/          # Frontend React
│   ├── src/
│   │   ├── components/  # Composants React
│   │   ├── context/     # Context API (Auth, Books)
│   │   ├── config/      # Configuration
│   │   └── images/      # Images
│   └── public/          # Fichiers publics
└── book-store-api/      # Backend Node.js
    ├── controllers/     # Contrôleurs
    ├── models/         # Modèles Mongoose
    ├── routes/         # Routes Express
    ├── middlewares/    # Middlewares
    └── server.js       # Point d'entrée
```

## 🚀 Installation et démarrage

### Prérequis

- Node.js (version 14 ou supérieure)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd BOOK-STORE
```

### 2. Configuration de l'environnement

#### Frontend (.env dans book-store/)

```env
REACT_APP_API_URL=http://localhost:5001
REACT_APP_FRONTEND_URL=http://localhost:3000
REACT_APP_ENVIRONMENT=development
```

#### Backend (.env dans book-store-api/)

```env
PORT=5001
MONGO_URL=mongodb://localhost:27017/bookstore
JWT_SECRET=votre-clé-secrète-jwt
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Installation des dépendances

#### Backend

```bash
cd book-store-api
npm install
npm start
```

#### Frontend

```bash
cd book-store
npm install
npm start
```

### 4. Accès à l'application

- Frontend : http://localhost:3000
- Backend API : http://localhost:5001

## 📋 API Endpoints

### Authentification

- `POST /register` - Inscription utilisateur
- `POST /login` - Connexion utilisateur
- `GET /profile` - Profil utilisateur (protégé)

### Livres

- `GET /books` - Liste de tous les livres (protégé)
- `GET /books/:id` - Détails d'un livre (protégé)
- `GET /books/genre/:genre` - Livres par genre (protégé)

### Contact

- `POST /api/contact` - Envoi de message de contact

## 🔒 Sécurité

- Authentification JWT avec cookies sécurisés
- Hachage des mots de passe avec bcrypt
- Validation des données côté serveur
- Configuration CORS sécurisée
- Protection des routes sensibles

## 🎨 Interface utilisateur

L'application propose une interface moderne et intuitive avec :

- Navigation responsive
- Section héro attrayante
- Cartes de livres avec images
- Formulaire de contact stylisé
- Gestion des erreurs utilisateur

## 🚀 Déploiement

### Production

- Frontend déployé sur : https://book-store-b1dk.onrender.com
- Backend déployé sur : https://book-store-api-9hck.onrender.com

### Variables d'environnement de production

Assurez-vous de configurer les bonnes URLs dans vos variables d'environnement pour la production.

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

Développé avec ❤️ pour l'apprentissage et la pratique des technologies web modernes.

---

**Note** : Ce projet est en développement continu. N'hésitez pas à signaler des bugs ou proposer des améliorations !
