
export default {
  image: function(d) { return "Immagine"; },
  "map-type": function(d) { return "Tipo di mappa"; },
  "default": function(d) { return "Predefinita"; },
  satellite: function(d) { return "Satellite"; },
  address: function(d) { return "Indirizzo"; },
  technologies: function(d) { return "Tecnologie"; },
  ratings: function(d) { return "Valutazioni"; },
  "hearing-assistance-system": function(d) { return "Sistema di ascolto"; },
  "room-plans": function(d) { return "Planimetrie"; },
  "no-room-plans": function(d) { return "Nessuna planimetria disponibile"; },
  website: function(d) { return "Sito web"; },
  photo: function(d) { return "Foto"; },
  "delete": function(d) { return "Cancella"; },
  annotation: function(d) { return "Osservazioni"; },
  "your-contact-info": function(d) { return "I tuoi dati di contatto"; },
  "full-name": function(d) { return "Nome e cognome completi"; },
  "email-address": function(d) { return "Indirizzo e-mail"; },
  submit: function(d) { return "Invia"; },
  error: {
    geolocation: {
      title: function(d) { return "Localizzazione non riuscita"; },
      message: function(d) { return "La localizzazione è abilitata e l'app ha il permesso di accedervi?"; }
    }
  },
  search: {
    placeholder: function(d) { return "Cerca un sistema di ascolto..."; },
    "no-results": function(d) { return "Non è stato trovato nulla per il termine di ricerca inserito."; }
  },
  links: {
    metas: {
      title: function(d) { return "Elenco degli apparecchi acustici Istituto federale di metrologia METAS"; },
      url: function(d) { return "https://www.metas.ch/metas/it/home/dok/rechtliches/hoergeraetliste.html"; }
    }
  },
  data: {
    roomtypes: {
      "1": {
        title: function(d) { return "Sala polivalente"; },
        "title-hyphens": function(d) { return "Sala polivalente"; }
      },
      "2": {
        title: function(d) { return "Aula didattica"; },
        "title-hyphens": function(d) { return "Aula didattica"; }
      },
      "3": {
        title: function(d) { return "Spazio di culto"; },
        "title-hyphens": function(d) { return "Spazio di culto"; }
      },
      "4": {
        title: function(d) { return "Spazio culturale"; },
        "title-hyphens": function(d) { return "Spazio culturale"; }
      },
      "5": {
        title: function(d) { return "Ufficio amministrativo"; },
        "title-hyphens": function(d) { return "Ufficio amministrativo"; }
      },
      "6": {
        title: function(d) { return "Sportello clienti"; },
        "title-hyphens": function(d) { return "Sportello clienti"; }
      },
      "7": {
        title: function(d) { return "Spazio comune"; },
        "title-hyphens": function(d) { return "Spazio comune"; }
      },
      "8": {
        title: function(d) { return "Cinema"; },
        "title-hyphens": function(d) { return "Cinema"; }
      },
      "9": {
        title: function(d) { return "Teatro"; },
        "title-hyphens": function(d) { return "Teatro"; }
      }
    },
    technologies: {
      "1": {
        title: function(d) { return "Induzione"; },
        description: function(d) { return "La modalità T è il pittogramma più comune. Ricezione induttiva del tono diretto tramite apparecchi acustici, commutati in modalità T mediante un pulsante di programma presente sull'apparecchio acustico."; }
      },
      "2": {
        title: function(d) { return "Infrarossi"; },
        description: function(d) { return "Raramente, il tono diretto viene trasmesso tramite infrarossi a un piccolo dispositivo portatile con collare induttivo. Questo ricevitore è disponibile alla reception o alla cassa."; }
      },
      "3": {
        title: function(d) { return "FM"; },
        description: function(d) { return "Per la ricezione induttiva è disponibile un piccolo dispositivo portatile presso la reception o alla cassa. Al dispositivo piccolo è collegato un collare."; }
      }
    },
    ratings: {
      "1": {
        title: function(d) { return "Rombo verde"; },
        description: function(d) { return "Sistema di ascolto testato con ricezione a norma."; },
        "description-short": {
        }
      },
      "2": {
        title: function(d) { return "Rombo giallo"; },
        description: function(d) { return "Sistema di ascolto testato che non ha i requisiti per una ricezione a norma."; },
        "description-short": {
        }
      },
      "3": {
        title: function(d) { return "Rombo bianco"; },
        description: function(d) { return "Sistema di ascolto non testato, nessuna valutazione."; },
        "description-short": {
        }
      }
    }
  },
  pages: {
    help: {
      quickstart: {
        title: function(d) { return "Quickstart"; },
        content: function(d) { return "<p>Dove si possono trovare gli sistemi di ascolto? Sul sito web www.sistemadiascolto.ch cliccare su <b>parole chiave</b> come ad es. «sportello», «théatre Vevey», «Lugano», ecc. È possibile <b>circoscriverela</b> ricerca con parole chiave aggiuntive, ad esempio: «stazione Bellinzona», «cinema Rex» o «sportello credit suisse». La funzione di ricerca verifica tutti gli indirizzi postali, le descrizioni di locali e di edifici.</p>\n<p>Cliccando su un <b>marcatore</b> compare una finestra di informazione con l‘indirizzo postale e le informazioni sui sistemi di ascolto. Se disponibili, le planimetrie danno informazioni sull‘area di ricezione ottimale evidenziandola in verde. Cliccare sulle immagini per ingrandirle.</p>"; }
      },
      reception: {
        title: function(d) { return "Informazione sugli apparecchi acustici"; },
        content: function(d) { return "<p>La maggior parte degli apparecchi acustici può ricevere <b>wireless</b> un segnale sonoro nelle sale cinematografiche, nei teatri, nelle chiese, nelle università, ecc. Si sente a un <b>volume chiaro e senza eco nè rumori di fondo</b>. Il segnale vocale è ben comprensibile anche in sale riunioni di grandi dimensioni. Gli Impianti audio sono disponibili in oltre 2000 sedi in Svizzera.</p>\n<p>È molto semplice. È sufficiente impostare i vostri apparecchi acustici in <b>modalità T</b>, tramite un pulsante di programma o il telecomando dei vostri apparecchi acustici. Se non avete ancora familiarità con questa funzione, chiedete informazioni sulla modalità T o sulla ricezione induttiva al vostro specialista.</p>\n<p>Gli <b>apparecchi acustici</b> sono di vario tipo e forma, dai piccoli apparecchi endoauricolari a quelli retroauricolari e gli apparecchi acustici speciali come gli impianti cocleari.</p>\n<p>Anche il vostro apparecchio acustico ha una bobina telefonica? Sul seguente sito web è possibile visualizzare <b>il elenco degli apparecchi acustici</b> e capire se il vostro apparecchio dispone di una bobina telefonica.</p>"; }
      },
      symbols: {
        title: function(d) { return "Informazioni sugli sistemi di ascolto"; }
      },
      video: {
        title: function(d) { return "Video: come funziona un sistema di ascolto?"; }
      }
    },
    "add-system": {
      title: function(d) { return "Segnala un nuovo sistema di ascolto o un problema"; },
      "mark-position": function(d) { return "Segna la posizione sulla mappa"; },
      search: {
        placeholder: function(d) { return "Cerca o tocca sulla mappa..."; },
        "no-results": {
          title: function(d) { return "Non è stato trovato nulla."; },
          message: function(d) { return "Per la posizione selezionata non è stato possibile trovare nessun indirizzo."; }
        }
      },
      submit: {
        success: {
          title: function(d) { return "Grazie mille"; },
          message: function(d) { return "I dati sono stati inviati e vengono verificati."; }
        },
        error: {
          title: function(d) { return "Errore"; }
        }
      }
    },
    sponsors: {
      title: function(d) { return "Sponsor"; },
      intro: function(d) { return "Vorremmo ringraziare i seguenti sponsor per il loro sostegno finanziario:"; }
    },
    "legal-notice": {
      title: function(d) { return "Impressum"; },
      responsability: function(d) { return "Gestore della homepage:"; },
      warrenty: {
        title: function(d) { return "Nessuna garanzia"; },
        content: function(d) { return "I contenuti di questo sito web rappresentano un’offerta informativa non vincolante. La IGGH non ne garantisce l’aggiornamento, la correttezza, l‘affidabilità, la completezza né la relativa qualità. L’utilizzo è a rischio della visitatrice o del visitatore. La IGGH non risponde di danni o danni consequenziali di tipo materiale o ideale, derivanti dall’uso o dal mancato uso delle informazioni offerte, dall’utilizzo improprio o come conseguenza di anomalie tecniche. La IGGH si riserva di modificare o cancellare le informazioni in ogni momento senza preavviso."; }
      },
      liability: {
        title: function(d) { return "Limitazione della responsabilità"; },
        content: function(d) { return "La IGGH non risponde di danni diretti o indiretti derivanti dall’accesso o dall’utilizzo di questo sito web o delle informazioni in esso contenute."; }
      },
      links: {
        title: function(d) { return "Pagine internet collegate"; },
        content: function(d) { return "La IGGH non verifica le pagine collegate a questo sito web e non si assume alcune responsabilità per il loro contenuto e per gli eventuali servizi ivi offerti. La visita di dette pagine è a rischio degli utenti."; }
      },
      privacy: {
        title: function(d) { return "Privacy"; },
        content: function(d) { return "<p>La IGGH tratta i dati personali comunicati in modo strettamente riservato tutelando gli interessi degli utenti. I dati personali non verranno né venduti né inoltrati a terzi. La IGGH farà il possibile per tutelare le banche dati contro gli attacchi di terzi, le perdite, l’uso improprio o la falsificazione. La IGGH non può però assumersi alcuna garanzia al riguardo.</p>\n<p>La pagina internet della IGGH è accessibile senza indicare dati riservati. In stretta collaborazione con i partner Hosting facciamo il possibile per proteggere le banche dati con ogni mezzo contro attacchi di terzi, perdite, uso improprio o falsificazione. Al momento della visita i server web del provider hosting della IGGH registrano i dati non personali relativi all’utilizzo. I file log danno informazioni sul numero di accessi alla homepage della IGGH. I dati relativi all’utilizzo non sono collegati ai dati personali.</p>\n<p>Fa eccezione la presa di contatto volontaria con noi. Tutti i file che ci vengono trasmessi sono trattati con la massima riservatezza. Vengono acquisiti e memorizzati solo per la registrazione e per le vostre richieste. L’accesso a questo sito web e l’invio di e-mail al nostro indirizzo non sono codificati. Teoricamente è quindi possibile che i file vengano visti in modo incompleto o da terzi. Per questo motivo vi invitiamo a non trasmetterci dati riservati per posta elettronica. Solitamente rispondiamo via mail alle richieste pervenuteci nello stesso modo. Se non lo desiderate, vi chiediamo di indicarlo nella richiesta.</p>"; }
      },
      copyright: {
        title: function(d) { return "Diritto d’autore, diritto di marchio, copyright e altri diritti di tutela"; },
        content: function(d) { return "Per tutti i contenuti di questo sito web (immagini, grafici, testi, video, ecc.) la IGGH o terzi che ci hanno fornito il materiale, hanno il diritto d’autore (ogni diritto riservato). Scaricando o copiando contenuti, immagini, foto e altri file non si ottengono diritti riguardo a tali contenuti. La riproduzione e la trasmissione di qualsiasi elemento è consentita solo previo consenso scritto di IGGH."; }
      }
    }
  }
}