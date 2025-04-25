### Problème #1: Navigation incorrecte
 Solution: 
        Il faut changer le href par un routerLink
        Car c'est href qui qui provoque un rechargement complet de la page allors que si on 
        utilise routerLink il permet de navigé sans recharger la page

### Problème #2: Besoin de formatage de texte
    Solution: 
    Tout d'abord une pipe sert a soit formatter ou transformer une valeur avant de l'afficher 
    c'est donc pour ça qu'on fais d'abord un <<ng generate pipe pipes/formatCategorie>> pour crée une pipe pour ensuite dans le format-catégorie.pipe.spec.ts, je vais remplacer les underscores par des espaces et je met la première lettre en majuscule. 

    Ensuite, dans le app.componet.ts j'importe FormatCategoriePipe pour pouvoir l'utiliser dans le html.

### Problème #3: Structure de page incomplète
    Solution:
    Le problème est que l'application répétait du code (header et footer) dans plusieurs fichiers, ce qui rendait la maintenance difficile.
    Pour resoudre ça j'ai donc créé deux composants  réutilisables : HeaderComponent et FooterComponent. Je les ai importés dans mon composant principal (AppComponent) et utilisés dans le app.component.html via les balises <app-header> et <app-footer>.

    et pour les concepts utilisés on a les components/ importation des components et la réutilisation de composants dans les templates via leur selector

### Problème #4: Pages non affichées

    La nature du problème :
        Certaines pages de l'application ne s'affichaient pas correctement, ce qui empêchait les utilisateurs d'accéder à certaines fonctionnalités.

    Je n’avais pas bien compris la question au départ, mais j’ai quand même vérifier toute la configuration liée au routage :

        - J’ai vérifié le fichier app.config.ts pour m’assurer que le provideRouter(routes) était bien présent.

        - J’ai revu le app.routes.ts pour vérifier que toutes les routes étaient bien définies (accueil, liste de livres, ajout, détail).

        - J’ai aussi vérifié le main.ts pour confirmer que l’application démarrait correctement avec bootstrapApplication(AppComponent, appConfig).

    Mais je n'est pas observé de changement donc un peu bizarre

    Les concepts Angular utilisés :

        Le système de routing Angular (Router, Routes, routerLink, router-outlet)
        Le système de composants standalone

### Problème #5: Route manquante

Le TODO 5 consistait à créer une route pour la page de détail d'un livre. Cependant, après vérification, cette route était déjà présente dans le fichier app.routes.ts. La ligne de code suivante était déjà définie :

{ path: 'books/:id', component: BookDetailComponent }

Étant donné que la route pour la page de détail d'un livre était déjà correctement configurée, il n'y avait aucune modification à apporter au niveau de la configuration des routes. J'ai vérifié que cette route était bien présente et fonctionnelle, donc j'ai essayer d'afficher la page de détail d'un livre en fonction de son id le 1 dans l'URL et ça a marcher j'avais des details du livre.

Les concepts Angular utilisés :

    - Routing

### Problème #6: Formulaire incomplet
    Le formulaire d’ajout de livre n’était pas encore implémenté, ce qui empêchait les utilisateurs d’ajouter un nouveau livre.

    J’ai créé un formulaire réactif dans le fichier TypeScript du composant AddBookComponent en utilisant FormBuilder. Le HTML du formulaire existait déjà, donc j’ai juste lié les champs avec formControlName et ajouté la méthode onSubmit().

    Les concepts Angular utilisés: 

        - Formulaires réactifs (FormGroup, FormBuilder)
        - Liaison de formulaire (formControlName)
        - Soumission du formulaire ((ngSubmit))

### Problème #7: Validations manquantes
    Le formulaire permettait de soumettre des données incomplètes ou incorrectes, car aucune validation n’était appliquée.

    J’ai ajouté des validations (Validators.required, Validators.minLength) dans le fichier TypeScript. Ensuite, j’ai affiché des messages d’erreur dans le HTML pour chaque champ, seulement quand ils sont invalides et touchés. J’ai aussi corrigé les erreurs Object is possibly 'null' en utilisant l’opérateur ?..

    Les concepts Angular utilisés

        - Validators (required, minLength)
        - Conditions dans le template avec *ngIf
        - Sécurité de typage avec ?. 

### Problème #8: Navigation manquante
    Certaines pages ne permettaient pas de revenir en arrière.

    Le bouton de retour était déjà présent dans le HTML. J’ai simplement ajouté la logique dans le fichier TypeScript en utilisant le service Location pour gérer le retour en arrière.

Concepts Angular utilisés : 
    - Injection du service Location depuis @angular/common, méthode back().

### Problème #9: Erreur dans la console

    Le problème était une erreur dans la console indiquant "Cannot read properties of undefined (reading 'title')" qui se produisait lorsque l'application tentait d'afficher le titre du livre avant que les données ne soient disponibles.

    J'ai résolu cette erreur en ajoutant une directive *ngIf="book" autour de la section HTML contenant les informations du livre. Cela permet de s'assurer que le bloc HTML n'est rendu que lorsque l'objet book est défini, évitant ainsi l'accès à des propriétés d'un objet undefined.

    Les concepts Angular utilisés

        Directive *ngIf : utilisée pour vérifier si l'objet book est défini avant de rendre les éléments HTML associés ou non.

### Problème #10: Directive non appliquée
    Certains éléments de la page ne sont pas mis en évidence visuellement comme prévu, ce qui altère l'expérience utilisateur.

    Pour résoudre ce problème, j'ai appliqué une directive appHighlight aux éléments concernés. Cette directive permet de modifier l'apparence d'un élément HTML en fonction d'une valeur d'entrée (appHighlight). Si cette valeur est true, l'élément reçoit un fond de couleur jaune clair pour le mettre en évidence.
    La directive utilise le Renderer2 pour manipuler le DOM de manière sécurisée, en modifiant les styles des éléments sans avoir besoin d'y accéder directement.

    Dans le fichier highlight.directive.ts, j'ai ajouté une logique dans la méthode ngOnChanges, qui est appelée chaque fois que l'entrée appHighlight change. Si appHighlight est true, la directive applique un fond jaune clair à l'élément (#ffeeba). Si la valeur est false, elle supprime le fond de l'élément.

    Sur le champ title des pages book-detail et book-list, j'ai utilisé la directive appHighlight pour afficher un fond jaune clair.
### Problème #11: Bouton non fonctionnel
    Pour le problème ici j'ai tout verifier et tout les bouton repondent bien quand je click dessus et me renvoie ou j eveux aller aller 

### Problème #12: Données non affichées
    Les livres étaient chargés mais n'étaient pas affichés dans le template car la condition de vérification des données était incorrecte.

    Solution technique :

    J'ai modifié le *ngIf dans le template en remplaçant data par books, car la variable correcte est books pour afficher les livres. La condition devient donc :

    <div *ngIf="books && books.length > 0; else noBooks">
    Concepts Angular utilisés :

    Directive *ngIf pour afficher ou non des éléments selon la présence de livres dans le tableau books.

### Problème #13: Descriptions trop longues
    Les descriptions des livres s’affichaient en entier, ce qui encombrait l’interface et nuisait à la lisibilité.

    J’ai créé une pipe personnalisée nommée truncate permettant de limiter la longueur de texte à 20 caractères, suivie de points de suspension (...) si la description dépasse cette limite. J’ai ensuite importé cette pipe dans le composant BookListComponent et l’ai appliquée au champ book.description dans le template.

    Les concepts Angular utilisés
    J’ai utilisé les pipes personnalisées avec l’option standalone, l’annotation @Pipe, la méthode transform() de l’interface PipeTransform, et l’import de la pipe dans un composant standalone.

### Problème #14: Retour utilisateur manquant

    Certains boutons ne donnent aucun retour visuel après une action comme la suppression ou l'ajout en favori. L'utilisateur ne sait donc pas si son action a réussi ou échoué.

    J’ai ajouté une propriété message dans le composant BookListComponent pour stocker un message d’alerte. Ensuite, j’ai modifié les méthodes deleteBook() et toggleFavorite() pour que ces messages s’affichent selon le succès ou l’échec de l’action. Enfin, j’ai ajouté une balise <p *ngIf="message"> dans le template HTML pour afficher ce message à l'utilisateur.

    Pour les concepts Angular utilisés
    J’ai utilisé :
    La liaison de propriété ({{ message }}) pour afficher dynamiquement le message.
    La directive structurelle *ngIf pour conditionner l’affichage du message.

### Problème #15: Erreur d'affichage du titre

    Le titre sur la page d’accueil ne s’affichait pas comme attendu. Il fallait corriger son affichage et le formater correctement.

    Je n'avais pas bien compris la consigne au départ, pensant qu’il fallait corriger autre chose que le titre. Néanmoins, j’ai appliqué le pipe uppercase à la propriété title dans le template, ce qui permet d’afficher le titre entièrement en majuscules, comme demandé.

    Les concepts Angular utilisés :
        - Application du pipe Angular uppercase dans le HTML ({{ title | uppercase }}) pour transformer dynamiquement le texte en majuscules

### Problème #16: Directive incomplète

    La directive highlight ne mettait en évidence que la couleur de fond, mais elle ne modifiait pas le poids du texte comme prévu.

    J'ai modifié la directive highlight pour qu'elle affecte à la fois la couleur de fond et le poids du texte. Lorsqu'appHighlight est vrai, la directive applique une couleur de fond jaune clair et met le texte en gras (font-weight: bold). Si appHighlight est faux, elle retire ces styles.

    Les concepts Angular utilisés :
    J'ai utilisé Renderer2 pour appliquer dynamiquement des styles au DOM et ngOnChanges pour réagir aux changements des entrées de la directive.


### Petit Bonus: changement du style des boutons 

    Pour le petit bonus il vas faloir suivre les etape

    Installation de Bootstrap: Pour commencer, il est essentiel d'installer Bootstrap dans le projet si vou le recuperer. Si cela n’a pas encore été fait, il suffit d'exécuter la commande suivante dans votre terminal :

    npm install bootstrap

    Une fois Bootstrap installé, il est nécessaire d'ajouter la feuille de style de Bootstrap à votre projet Angular. Dans le fichier angular.json, ajoutez le chemin vers bootstrap.min.css dans la section "styles" :


    "styles": [
    "src/styles.css",
    "node_modules/bootstrap/dist/css/bootstrap.min.css"
    ]

    j'ai appliqué les classes Bootstrap comme btn, btn-primary, btn-secondary, etc., pour styliser les boutons, tout en m'assurant que l'espacement entre eux soit correct en ajoutant des classes comme mr-2 ou ml-2 pour gérer les marges.

    Cela a permis d'améliorer l'apparence des boutons et d'optimiser leur disposition dans l'interface.

    Concepts Angular et Bootstrap utilisés :

        - Bootstrap pour le stylisme des boutons et la gestion de l'espacement.
        - Classes utilitaires Bootstrap comme btn, m-2, d-flex, et justify-content-between pour gérer l'apparence et l'organisation des éléments.
        - Angular CLI pour l'installation et l'intégration de Bootstrap dans le proje