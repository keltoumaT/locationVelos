# Carte interactive de location de vélos


Il s'agit du troisième projet qui doit être réalisé dans le cadre de la **formation** de développeur web junior d'OpenClassRooms. Outils utilisés: **HTML, CSS, JavaScript, AJAX, VSCode**
[Lien du projet](http://carteinteractivelocationvelos.kelwebdev.com/)
# Les consignes pour réaliser le projet

Vous devez développer une page de type "Single page Application" simulant la réservation de vélos dans une ville. Ces vélos sont répartis dans de nombreuses stations dans la ville. L'utilisateur doit pouvoir réserver un vélo depuis son navigateur (à condition qu'il reste des vélos disponibles à la station !). La réservation est alors temporairement enregistrée sur le navigateur du visiteur.

## Diaporama

Vous devez afficher en haut de la page un diaporama de photos et de textes expliquant le fonctionnement de l'application. La logique du diaporama doit être écrite par vos soins. L’utilisation de tout plugin automatisant la logique de l’application est proscrite.

Le diaporama passe automatiquement à la diaporama suivante toutes les 5 secondes. L’utilisateur peut toutefois choisir de mettre le diaporama en pause. Il peut également reculer ou avancer manuellement à l’aide d’un clic de souris, ainsi qu’avec les touches gauche et droite de son clavier.

## Carte des vélos

En-­dessous du diaporama se trouve une carte affichant en temps réel la liste des stations de location de vélos ainsi que leur disponibilité. La localisation de toutes les stations de vélos est affichée à l’aide de marqueurs.

La localisation et l'état de chaque station (ouverte, en travaux, combien de vélos et de places sont disponibles, etc.) est fourni via la  [plateforme OpenData](https://developer.jcdecaux.com/)  de JC Decaux.
Les données doivent provenir de l'API temps réel.
Un clic sur un marqueur affiche l’état de la station dans un panneau construit en HTML et CSS à côté de la carte.

La carte doit être générée dynamiquement via un service de cartographie.
Ici Leaflet a été utilisé.


## Réservation d'un vélo

Il doit être possible de réserver un vélo disponible à la station sélectionnée en :

1.  indiquant son nom et son prénom,
2.  signant dans un champ libre implémenté à l’aide de l’API HTML5 Canvas.
 **Aucun plugin n’est autorisé**.
Les données de réservation seront stockées dans le navigateur à l’aide de l’[API Web Storage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API)  et affichées en dessous du panneau. L'état de la réservation (s’il y en a une) est ainsi affiché, avec un décompte dynamique du temps restant avant expiration de la réservation.

Une réservation expire automatiquement au bout de 20 minutes et également lorsque le navigateur web se referme.
Le nom et le prénom sont toutefois conservés par le navigateur pour préremplir le formulaire de réservation lors d'un prochain usage, même si le navigateur a été fermé.

## Contrainte technique
Le code **JavaScript** doit être conçu en **programmation orientée objet**.
Le code doit exploiter une API cartographique et l'API temps réel de [API JCDecaux](https://developer.jcdecaux.com/). Il doit également utiliser les API Web Storage et Canvas.


