Auteurs : Amélie Pauchard et Benjamin Aumont

Machine : windows

Pré requis : (Node JS, Express, MongoDB, MongoTools)

1) Créer la base de données :
    -Ouvrir le terminal se deplacer vers MongoDB exemple (C:\Program Files\MongoDB\Server\4.4\bin).
    -Lancer la commande --> mongoimport --db resto --collection restaurants --file C:\Users\handl\OneDrive\Bureau\Langages\Node\TP3_mongo_correction\primer-dataset.json

2) Lancer a la racine du projet la commande --> npm init.
    -Cette commande doit installer (Express, Mongod, ejs, express static)
    -En cas de pb avec npm init:
        -Lancer :
            npm install express mongod ejs body-parser express-static --save 

3) Lancer la commande --> npm start

4) Dans un navigateur se rendre a l'url --> http://localhost:3000/resto (tous les restaurants sont affichés)

5) Dans un navigateur se rendre a l'url --> http://localhost:3000/resto/borough/Manhattan (les restaurants du quartier Manhattan s'affiches)

6) Dans un navigateur se rendre a l'url --> http://localhost:3000/resto/cuisine/Irish (les restaurants de cuisine Irlandaise s'affiches)

7) Dans un navigateur se rendre a l'url --> http://localhost:3000/resto (tous les restaurants sont affichés) :
    -Il y a la possibilitée de créer un nouveau restaurant grace au formulaire en bas de page.

8) Dans un navigateur se rendre a l'url --> http://localhost:3000/resto (tous les restaurants sont affichés) :
    -Il y a la possibilitée de filtrer les restaurants par type de cuisine.
