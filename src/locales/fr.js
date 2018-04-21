
export default {
  image: function(d) { return "Image"; },
  "map-type": function(d) { return "Type de carte"; },
  "default": function(d) { return "Par défault"; },
  satellite: function(d) { return "Satellite"; },
  address: function(d) { return "Adresse"; },
  technologies: function(d) { return "Technologies"; },
  ratings: function(d) { return "Évaluations"; },
  "hearing-assistance-system": function(d) { return "Système d'écoute"; },
  "room-plans": function(d) { return "Plans d'aménagement"; },
  "no-room-plans": function(d) { return "Aucun plan d'aménagement n'est disponible"; },
  website: function(d) { return "Site web"; },
  photo: function(d) { return "Photo"; },
  "delete": function(d) { return "Supprimer"; },
  annotation: function(d) { return "Remarques"; },
  "your-contact-info": function(d) { return "Vos coordonnées"; },
  "full-name": function(d) { return "Nom complet"; },
  "email-address": function(d) { return "Adresse e-mail"; },
  submit: function(d) { return "Valider"; },
  error: {
    geolocation: {
      title: function(d) { return "Localisation échouée"; },
      message: function(d) { return "La localisation est-elle activée et l'application a la permission d'y accéder?"; }
    }
  },
  search: {
    placeholder: function(d) { return "Rechercher un système d'écoute..."; },
    "no-results": function(d) { return "Rien n'a été trouvé pour le terme de recherche entré."; }
  },
  links: {
    metas: {
      title: function(d) { return "Liste des aides auditives de l'Institut fédéral de métrologie METAS"; },
      url: function(d) { return "https://www.metas.ch/metas/fr/home/dok/rechtliches/hoergeraetliste.html"; }
    }
  },
  data: {
    roomtypes: {
      "1": {
        title: function(d) { return "Salle polyvalente"; },
        "title-hyphens": function(d) { return "Salle polyvalente"; }
      },
      "2": {
        title: function(d) { return "Salle de classe"; },
        "title-hyphens": function(d) { return "Salle de classe"; }
      },
      "3": {
        title: function(d) { return "Lieu de culte"; },
        "title-hyphens": function(d) { return "Lieu de culte"; }
      },
      "4": {
        title: function(d) { return "Chambre de culture"; },
        "title-hyphens": function(d) { return "Chambre de culture"; }
      },
      "5": {
        title: function(d) { return "Bureaux administratifs"; },
        "title-hyphens": function(d) { return "Bureaux administratifs"; }
      },
      "6": {
        title: function(d) { return "Guichet"; },
        "title-hyphens": function(d) { return "Guichet"; }
      },
      "7": {
        title: function(d) { return "Salle commune"; },
        "title-hyphens": function(d) { return "Salle commune"; }
      },
      "8": {
        title: function(d) { return "Cinéma"; },
        "title-hyphens": function(d) { return "Cinéma"; }
      },
      "9": {
        title: function(d) { return "Théâtre"; },
        "title-hyphens": function(d) { return "Théâtre"; }
      }
    },
    technologies: {
      "1": {
        title: function(d) { return "Induction"; },
        description: function(d) { return "Le mode T est le pictogramme le plus courant. Réception inductive de la tonalité directe via les aides auditives qui ont été commutées en mode T sur l'appareil auditif via une touche de programme."; }
      },
      "2": {
        title: function(d) { return "Infrarouge"; },
        description: function(d) { return "Dans de rares cas, la tonalité directe est transmise par infrarouge à un petit appareil portatif, équipé d'un collier inductif. Ce récepteur est disponible à la réception ou à la caisse."; }
      },
      "3": {
        title: function(d) { return "FM"; },
        description: function(d) { return "Pour la réception inductive, un petit appareil portatif est disponible à la réception ou à la caisse. Un collier inductif est connecté au petit appareil."; }
      }
    },
    ratings: {
      "1": {
        title: function(d) { return "Losange vert"; },
        description: function(d) { return "Appareil auditif testé avec réception standardisée."; },
        "description-short": {
        }
      },
      "2": {
        title: function(d) { return "Losange jaune"; },
        description: function(d) { return "Appareil auditif testé ne répondant pas aux exigences d'une réception standardisée."; },
        "description-short": {
        }
      },
      "3": {
        title: function(d) { return "Losange blanc"; },
        description: function(d) { return "Appareil auditif non contrôlé, aucune évaluation."; },
        "description-short": {
        }
      }
    }
  },
  pages: {
    help: {
      quickstart: {
        title: function(d) { return "Démarrage rapide"; },
        content: function(d) { return "<p>Où trouver des appareils auditifs? Sur www.höranlagen.ch, entrez des <b>mots-clés</b> comme «cinéma», «théâtre», «église», par exemple. Vous pouvez <b>limiter</b> votre recherche avec d'autres mots-clés, par exemple: «université Lausanne», «cinéma Rex» ou «église Genève». La fonction de recherche vérifie toutes les adresses postales, les désignations de locaux et d'immeubles.</p>\n<p>Cliquez sur un <b>marqueur</b> et une fenêtre d‘informations avec l‘adresse postale et des données sur le système d‘écoute apparaissent. Le cas échéant, les plans fournissent des informations sur une zone verte pour une réception optimale. Cliquez sur les photos pour les agrandir.</p>"; }
      },
      reception: {
        title: function(d) { return "Informations sur les appareils auditifs"; },
        content: function(d) { return "<p>La plupart des aides auditives peuvent recevoir un signal sonore <b>sans fil</b> dans les cinémas, les théâtres, les églises, les universités, etc. Vous entendrez <b>clairement sans écho, ni bruit de fond</b>. Cela permet de comprendre facilement ce qui se dit, même dans les grandes salles de réunion. Vous trouvez des appareils auditifs dans plus de 2 000 endroits en Suisse.</p>\n<p>C‘est très simple. Il suffit de régler vos appareils auditifs sur la  <b>position T ou boucle magnétique</b> qui se trouve sur vos appareils ou via la télécommande. En cas de doute, renseignez-vous auprès de votre <b>audioprothésiste</b> sur la réception par induction.</p>\n<p>Les <b>appareils auditifs</b> comprenant les intra-auriculaire, contours d‘oreilles et implants cochléaires peuvent avoir la position T.</p>\n<p>Votre aide auditive a-t-elle également une bobine téléphonique? Sur le site Web suivant, vous pouvez consulter la liste des appareils auditifs et déterminer si votre aide auditive possède une bobine téléphonique:</p>"; }
      },
      symbols: {
        title: function(d) { return "Informations sur les systèmes d'écoute"; }
      },
      video: {
        title: function(d) { return "Vidéo: Comment fonctionne un système d'écoute?"; }
      }
    },
    "add-system": {
      title: function(d) { return "Signaler un nouveau système d'écoute ou un problème"; },
      "mark-position": function(d) { return "Marquer la position sur la carte"; },
      search: {
        placeholder: function(d) { return "Recherchez ou tapez sur la carte....."; },
        "no-results": {
          title: function(d) { return "Aucun résultat."; },
          message: function(d) { return "Aucune adresse n'a pu être trouvée pour la position sélectionnée."; }
        }
      },
      submit: {
        success: {
          title: function(d) { return "Merci beaucoup."; },
          message: function(d) { return "Les données ont été envoyées et vérifiées."; }
        },
        error: {
          title: function(d) { return "Erreur"; }
        }
      }
    },
    sponsors: {
      title: function(d) { return "Sponsors"; },
      intro: function(d) { return "Nous tenons à remercier les sponsors suivant pour leur soutien financier:"; }
    },
    "legal-notice": {
      title: function(d) { return "Mentions légales"; },
      responsability: function(d) { return "Le gestionnaire de cette page d'accueil est:"; },
      warrenty: {
        title: function(d) { return "Clause de non-responsabilité"; },
        content: function(d) { return "Les contenus de ce site web constituent une offre d'informations non contraignante. L'IGGH n'en garantit ni l'actualité, la justesse, la fiabilité, l'exhaustivité, ni la qualité. Leur utilisation se fait au propre risque de l'utilisatrice ou de l'utilisateur. L'IGGH n'est en rien responsable en cas de dégâts ou dégâts consécutifs matériels ou immatériels qui résulteraient de l'utilisation ou de la non utilisation des informations proposées, d'une utilisation abusive ou comme suite de défauts techniques. L'IGGH se réserve le droit d'effectuer des modifications ou des suppression à tout moment, et ce, sans avis préalable."; }
      },
      liability: {
        title: function(d) { return "Limitation de responsabilité"; },
        content: function(d) { return "L'IGGH n'est pas responsable des dégâts directs ou indirects qui résulteraient de l'accès à ou de l'utilisation de ce site web ou des informations qui y sont publiées."; }
      },
      links: {
        title: function(d) { return "Liens vers des pages internet"; },
        content: function(d) { return "L'IGGH ne contrôle aucunes des pages en lien avec ce site web et ne prend aucune responsabilité pour leur contenu et pour les éventuels services proposés. La visite de telles pages se fait au risque propre de l'utilisatrice / de l'utilisateur."; }
      },
      privacy: {
        title: function(d) { return "Protection des données"; },
        content: function(d) { return "<p>L'IGGH traite les données personnelles transmises de manière strictement confidentielle et protège les intérêts des utilisatrices et des utilisateurs. Les données personnelles ne sont ni vendues à des tiers, ni diffusées. L'IGGH s'efforce de manière appropriée de protéger les bases de données contre les accès étrangers, les pertes et les abus ou les falsifications. L'IGGH ne peut néanmoins donner aucune garantie par rapport à cela.</p>\n<p>La page internet de l'IGGH est en principe accessible sans mentions de données personnelles. En collaboration étroite avec les partenaires d'hébergement, nous nous efforçons de protéger par tous les moyens les bases de données contre les accès étrangers, les pertes, les abus ou les falsifications. Lors des visites, le serveur web du fournisseur d'hébergement de l'IGGH enregistre les données d'utilisation de maniére non-personnelle. Les fichiers de journal donnent des informations sur le nombre d'accès à la page d'accueil de l'IGGH. Les données d'utilisation ne sont pas liées à des données personnelles.</p>\n<p>La prise de contact volontaire avec nous constitue une exception. Toutes les données que vous nous transmettez sont traitées de manière strictement confidentielle. Nous les recueillons et les enregistrons seulement dans la mesure où cela est nécessaire pour votre inscription et votre requête. L'accès à ce site web et le transfert de courriers électroniques qui nous sont adressés ne sont pas cryptés. Il est théoriquement possible que les données soient incomplètes ou consultées par des tiers. Pour cette raison, nous vous prions de ne pas nous transmettre de données condifentielles par courrier électronique. Nous répondons habituellement aux requêtes que nous recevons par courrier électronique également par courrier électronique. Au cas où vous ne deviez pas souhaitez cela, nous vous prions de le faire remarquer dans votre requête.</p>"; }
      },
      copyright: {
        title: function(d) { return "Droit d'auteur, droit des marques, copyright et autres droits de protection"; },
        content: function(d) { return "Pour l'ensemble des contenus de site web (images, graphismes, textes, vidéo, etc.), l'IGGH ou des tiers qui mettent ce matériel à notre disposition sont propriétaires du droit d'auteur (tous droits réservés). Lors du téléchargement ou de la copie des contenus, des images, des photos et d'autres données, aucuns droits ne sont transférés en ce qui concerne leurs contenus. Pour la reproduction et la transmission de quelques éléments que ce soit, le consentement écrit préalable de l'IGGH doit être obtenu."; }
      }
    }
  }
}