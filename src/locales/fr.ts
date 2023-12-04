export default {
  app_name: 'PlainApp',
  fetch_content_automatically: 'Récupérer le contenu automatiquement',
  grant_permission: 'Accorder la permission',
  desktop_notification_permission_not_granted: "La permission de notification du bureau n'a pas été accordée.",
  desktop_notification_permission_grant_title: "Accorder l'autorisation pour les notifications du bureau",
  desktop_notification_permission_grant_message:
    '1. Cliquez sur l\'icône du cadenas dans la barre d\'adresse.\n2. Ouvrez "Paramètres du site" ou "Autorisations".\n3. Trouvez "Notifications" et changez-le en "Autoriser".',
  sort: 'Trier',
  sort_by: {
    date_asc: 'Date la plus ancienne en premier',
    date_desc: 'Date la plus récente en premier',
    size_asc: 'Plus petit en premier',
    size_desc: 'Plus grand en premier',
    name_asc: 'Nom (A à Z)',
    name_desc: 'Nom (Z à A)',
  },
  print: 'Imprimer',
  cancel: 'Annuler',
  ok: 'OK',
  connection_timeout: 'La connexion a expiré',
  save: 'Enregistrer',
  saving: 'Enregistrement en cours',
  saved: 'Enregistré',
  status: 'Statut',
  enabled: 'Activé',
  updated: 'Mis à jour',
  enable: 'Activer',
  deleted: 'Supprimé',
  create: 'Créer',
  listening_port: "Port d'écoute",
  edit: 'Modifier',
  delete: 'Supprimer',
  actions: 'Actions',
  running: 'En cours',
  stopped: 'Arrêté',
  basic: 'Basique',
  name: 'Nom',
  address: 'Adresse',
  yes: 'Oui',
  no: 'Non',
  my_phone: 'Mon téléphone',
  me: 'Moi',
  password: 'Mot de passe',
  chat_input_hint: "Qu'avez-vous en tête ?",
  release_to_send_file: 'Relâchez pour envoyer le fichier',
  confirm_to_delete_name: 'Confirmer la suppression de "{name}" ?',
  confirm_to_delete: 'Confirmer la suppression ?',
  valid: {
    string_min: 'Au moins {min} caractères',
    required: 'Ce champ est obligatoire',
  },
  theme: {
    title: 'Thème',
    system: 'Par défaut du système',
    light: 'Clair',
    dark: 'Sombre',
  },
  language: {
    title: 'Langue',
    system: 'Par défaut du système',
  },
  exchange: {
    data_date: 'Date',
  },
  education: {
    memorize_words: 'Mémoriser des mots',
  },
  log_in: 'Se connecter',
  logging_in: 'Connexion en cours',
  login: {
    to_continue: 'Appuyez sur le bouton Accepter sur votre téléphone pour continuer.',
    failed: "Échec de la connexion, assurez-vous que votre téléphone n'est pas en mode veille.",
    rejected: 'La demande de connexion a été rejetée.',
    invalid_password: 'Mot de passe incorrect.',
  },
  header_actions: {
    language: 'Changer de langue',
    theme: 'Changer de thème',
    tasks: 'Tâches',
    audios: 'Audio',
    logout: 'Se déconnecter',
    notifications: 'Notifications',
  },
  page_title: {
    home: 'Accueil',
    wireguard: 'WireGuard',
    network: 'Réseau',
    wifi: 'Wi-Fi',
    rules: 'Règles',
    routes: 'Itinéraires',
    devices: 'Appareils',
    messages: 'Messages',
    contacts: 'Contacts',
    calls: 'Appels',
    apps: 'Applications',
    files: 'Fichiers',
    audios: 'Audio',
    videos: 'Vidéos',
    images: 'Images',
    books: 'Livres',
    feeds: 'Flux',
    notes: 'Notes',
    json_viewer: 'Visionneuse JSON',
    qrcode_generator: 'Générateur de codes QR',
    trash: 'Corbeille',
    aichats: 'ChatGPT',
    screen_mirror: "Miroir d'écran",
  },
  wireguard: {},
  wifi: {
    ssid: 'Nom',
    hide_ssid: 'Masquer le réseau',
  },
  manufacturer: 'Fabricant',
  mac_address: 'Adresse MAC',
  ip_address: 'Adresse IP',
  online: 'En ligne',
  offline: 'Hors ligne',
  unknown: 'Inconnu',
  created_at: 'Créé le',
  updated_at: 'Mis à jour le',
  active_at: 'Actif le',
  rename: 'Renommer',
  apply_to: 'Appliquer à',
  direction: 'Direction',
  match: 'Correspondance',
  inbound: 'Entrant',
  outbound: 'Sortant',
  target_type: {
    ip: 'Adresse IP',
    net: 'Sous-réseau',
    dns: 'Domaine',
    remote_port: 'Port distant',
    internet: 'Internet',
    iface: 'Réseau local',
    list: 'Liste des cibles',
  },
  all_devices: 'Tous les appareils',
  network: 'Réseau',
  allow: 'Autoriser',
  block: 'Bloquer',
  description: 'Description',
  notes: 'Notes',
  rule_inbound: '{action} le trafic depuis {target}',
  rule_outbound: '{action} le trafic vers {target}',
  for_example: 'par exemple',
  invalid_value: 'Valeur invalide',
  space: ' ',
  remote_port: 'port distant {port}',
  all_local_networks: 'Tous les réseaux locaux',
  examples_ip: 'Exemples\n10.10.10.2\n10.10.10.2:80\n10.10.10.2:80,443–453\n[2606:4700:4700::1111]:443–453',
  examples_net:
    'Exemples\n10.10.10.0/24\n10.10.10.0/24:80\n10.10.10.0/24:80,443–453\n[2606:4700:4700::1111/127]:443–453',
  examples_dns: 'Exemples\nexemple.com\nexemple.com:80\nexemple.com:80,443–453',
  examples_remote_port: 'Exemples\n1419\n1001–1024',
  route_description: 'Routage du trafic vers {target} via {if_name}',
  traffic_to: 'Trafic vers',
  route_via: 'Routé via',
  delete_message: 'Supprimer le message',
  social: 'Social',
  messages: 'Messages',
  contacts: 'Contacts',
  calls: 'Appels',
  storage: 'Stockage',
  files: 'Fichiers',
  music: 'Musique',
  videos: 'Vidéos',
  images: 'Images',
  audios: 'Audio',
  content: 'Contenu',
  from: 'De',
  type: 'Type',
  time: 'Heure',
  message_type: {
    1: 'Boîte de réception',
    2: 'Envoyé',
    3: 'Brouillons',
    4: 'Boîte de sortie',
    inbox: 'Boîte de réception',
    sent: 'Envoyé',
    outbox: 'Boîte de sortie',
    drafts: 'Brouillon',
  },
  artist: 'Artiste',
  sms_address: 'Adresse',
  phone_numbers: 'Numéros de téléphone',
  telephone: 'Téléphone',
  custom: 'Personnalisé',
  website: 'Site web',
  email: 'E-mail',
  phone_number: 'Numéro de téléphone',
  add_field: 'Ajouter un champ',
  im: 'IM',
  contact: {
    phone_number_type: {
      1: 'Domicile',
      2: 'Mobile',
      3: 'Travail',
      4: 'Fax du travail',
      5: 'Fax à domicile',
      6: 'Localisateur',
      7: 'Autre',
      8: 'Rappel',
      9: 'Voiture',
      10: "Ligne principale de l'entreprise",
      11: 'ISDN',
      12: 'Principal',
      13: 'Autre fax',
      14: 'Radio',
      15: 'Télex',
      16: 'TTY TDD',
      17: 'Mobile au travail',
      18: 'Localisateur au travail',
      19: 'Assistant',
      20: 'MMS',
    },
    email_type: {
      1: 'Domicile',
      2: 'Travail',
      3: 'Autre',
      4: 'Mobile',
    },
    address_type: {
      1: 'Domicile',
      2: 'Travail',
      3: 'Autre',
    },
    event_type: {
      1: 'Anniversaire',
      2: 'Autre',
      3: 'Anniversaire',
    },
    im_type: {
      0: 'AIM',
      1: 'Windows Live',
      2: 'Yahoo',
      3: 'Skype',
      4: 'QQ',
      5: 'Hangouts',
      6: 'ICQ',
      7: 'Jabber',
      8: 'NetMeeting',
    },
    website_type: {
      1: "Page d'accueil",
      2: 'Blog',
      3: 'Profil',
      4: 'Domicile',
      5: 'Travail',
      6: 'FTP',
      7: 'Autre',
    },
  },
  call_type: {
    1: 'Entrant',
    2: 'Sortant',
    3: 'Manqué',
    4: 'Boîte vocale',
    5: 'Rejeté',
    6: 'Bloqué',
    incoming: 'Entrant',
    outgoing: 'Sortant',
    missed: 'Manqué',
  },
  app_type: {
    user: 'Utilisateur',
    system: 'Système',
  },
  first_name: 'Prénom',
  last_name: 'Nom de famille',
  middle_name: 'Deuxième prénom',
  prefix: 'Préfixe',
  suffix: 'Suffixe',
  browser_warning: "Il est recommandé d'utiliser la dernière version du navigateur web Chrome.",
  no_permission:
    'Pas de permission. Veuillez accéder à APP > "Web en PC" pour activer les autorisations et actualisez la page.',
  no_data: 'Pas de données.',
  loading: 'Chargement en cours...',
  duration: 'Durée',
  started_at: 'Commencé le',
  phone_geo: 'GEO',
  avatar: 'Avatar',
  phone_isp_type: {
    1: 'China Mobile',
    2: 'China Unicom',
    3: 'China Telecom',
    4: 'China Unicom virtuel',
    5: 'China Telecom virtuel',
    6: 'China Mobile virtuel',
  },
  storage_free_total: '{free} disponibles sur {total}',
  current_path: 'Chemin actuel',
  create_folder: 'Créer un dossier',
  upload_files: 'Télécharger des fichiers',
  upload_folder: 'Télécharger un dossier',
  preview: 'Aperçu',
  view: 'Voir',
  upload: 'Télécharger',
  download: 'Télécharger',
  copy: 'Copier',
  paste: 'Coller',
  cut: 'Couper',
  duplicate: 'Dupliquer',
  properties: 'Propriétés',
  show_hidden: 'Afficher les fichiers cachés',
  select_mode: 'Mode de sélection',
  modified_at: 'Modifié le',
  file_size: 'Taille du fichier',
  path: 'Chemin',
  open: 'Ouvrir',
  box_is_null: "Veuillez sélectionner une boîte dans l'application et réessayer.",
  battery_left: 'Batterie à {percentage}%',
  invalid_file_signature: 'Signature de fichier non valide',
  no_task: 'Pas de tâche',
  upload_status: {
    created: 'En attente',
    pending: 'Téléchargement en cours',
    saving: 'Enregistrement en cours',
    done: 'Téléchargé',
    error: 'Erreur de téléchargement',
  },
  load_failed: 'Échec du chargement de {name}',
  network_error: "Erreur réseau, impossible de se connecter à l'API",
  web_access_disabled: "L'accès au web est désactivé pour le moment",
  play: 'Lecture',
  add_to_playlist: 'Ajouter à la liste de lecture',
  added_to_playlist: 'Ajouté à la liste de lecture',
  select_first: "Sélectionner d'abord",
  search_hint: 'Rechercher...',
  keywords: 'Mots-clés',
  search: 'Rechercher',
  tags: 'Étiquettes',
  add_to_tags: 'Ajouter aux étiquettes',
  remove_from_tags: 'Supprimer des étiquettes',
  delete_files: 'Supprimer des fichiers',
  clear_list: 'Vider la liste',
  select_tags: 'Sélectionner des étiquettes',
  tools: 'Outils',
  json_viewer: 'Visionneuse JSON',
  qrcode_generator: 'Générateur de codes QR',
  title: 'Titre',
  restore: 'Restaurer',
  trash: 'Corbeille',
  move_to_trash: 'Déplacer vers la corbeille',
  work: 'Travail',
  expand_all: 'Tout développer',
  collapse_all: 'Tout réduire',
  all: 'Tous',
  manage: 'Gérer',
  subscriptions: 'Abonnements',
  published_at: 'Publié le',
  source: 'Source',
  view_original_article: "Voir l'article original",
  add: 'Ajouter',
  add_tag: 'Ajouter une étiquette',
  add_subscription: 'Ajouter un abonnement',
  import_opml_file: 'Importer un fichier OPML',
  export_opml_file: 'Exporter un fichier OPML',
  rss_url: 'URL du flux RSS',
  imported: 'Importé',
  update_subscription: "Mettre à jour l'abonnement",
  sync_feeds: 'Synchroniser les flux',
  sync_content: 'Synchroniser le contenu',
  feeds_synced: 'Flux synchronisés',
  syncing: 'Synchronisation en cours...',
  meta_no_title: '[Pas de titre]',
  no_content: '[Pas de contenu]',
  confirm: 'Confirmer',
  upload_audios: 'Vous pouvez télécharger dans le dossier Musique ou dans un autre dossier.',
  upload_videos: 'Vous pouvez télécharger dans le dossier Vidéos ou dans un autre dossier.',
  upload_images: 'Vous pouvez télécharger dans le dossier Images ou dans un autre dossier.',
  no_files: 'Pas de fichiers',
  view_origin_image: "Voir l'image originale",
  new_chat: 'Nouveau chat',
  ai: 'IA',
  config: 'Configuration',
  api_key: 'Clé API',
  apps: 'Applications',
  version: 'Version',
  size: 'Taille',
  recents: 'Récents',
  internal_storage: 'Stockage interne',
  sdcard: 'Carte SD',
  recent_files: 'Fichiers récents',
  installed_at: 'Installé le',
  screen_mirror: "Miroir d'écran",
  try_again: 'Réessayer',
  stop_mirror: 'Arrêter le miroir',
  fullscreen: 'Plein écran',
  deleting: 'Suppression en cours...',
  uninstalling: 'Désinstallation en cours...',
  uninstall: 'Désinstaller',
  install: 'Installer',
  sending: 'Envoi…',
  usb_storage: 'Stockage USB',
  folders: 'Dossiers',
  color: 'Couleur',
  make_a_phone_call: 'Passer un appel',
  view_as_list: 'Vue en liste',
  view_as_grid: 'Vue en grille',
  pause: 'Pause',
  playlist: 'Liste de lecture',
  no_api_key: 'Pas de clé API.',
  refresh: 'Rafraîchir',
  info: 'Info',
  zoom_in: 'Zoom avant',
  zoom_out: 'Zoom arrière',
  resize: 'Redimensionner',
  rotate_left: 'Rotation à gauche',
  rotate_right: 'Rotation à droite',
  close: 'Fermer',
  close_other_tabs: 'Fermer les autres onglets',
  close_tabs_to_the_right: 'Fermer les onglets à droite',
  relaunch_app: "Relancer l'application",
  all_items_on_this_page_are_selected: 'Tous les {count} éléments de cette page sont sélectionnés.',
  all_items_are_selected: 'Tous les {count} éléments sont sélectionnés.',
  select_all_items: 'Sélectionner tous les {count} éléments',
  clear_selection: 'Effacer la sélection',
  screen_mirror_request_permission_failed:
    "Vous n'avez pas accordé la permission à PlainApp pour prendre des captures d'écran.",
  screen_mirror_request_permission:
    'Veuillez appuyer sur "Commencer maintenant" sur votre téléphone. \nSi la fenêtre de permission n\'apparaît pas, rouvrez PlainApp. \nRéessayez dans {seconds} secondes.',
}
