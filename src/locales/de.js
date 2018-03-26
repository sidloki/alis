
export default {
  image: function(d) { return "Bild"; },
  "map-type": function(d) { return "Kartentyp"; },
  "default": function(d) { return "Standard"; },
  satellite: function(d) { return "Satelitt"; },
  address: function(d) { return "Adresse"; },
  technologies: function(d) { return "Technologien"; },
  ratings: function(d) { return "Bewertungen"; },
  "hearing-assistance-system": function(d) { return "Höranlage"; },
  "room-plans": function(d) { return "Raumpläne"; },
  "no-room-plans": function(d) { return "Keine Raumpläne verfügbar"; },
  website: function(d) { return "Webseite"; },
  photo: function(d) { return "Foto"; },
  "delete": function(d) { return "Löschen"; },
  annotation: function(d) { return "Hinweise"; },
  "your-contact-info": function(d) { return "Ihre Kontaktdaten"; },
  "full-name": function(d) { return "Vollständiger Name"; },
  "email-address": function(d) { return "E-Mail-Adresse"; },
  error: {
    geolocation: {
      title: function(d) { return "Ortung fehlgeschlagen"; },
      message: function(d) { return "Ist die Ortung aktiviert und die App berechtigt darauf zugreifen?"; }
    }
  },
  search: {
    placeholder: function(d) { return "Höranlage suchen..."; },
    "no-results": function(d) { return "Für den eingegebenen Suchbegriff wurde nichts gefunden."; }
  },
  links: {
    metas: {
      title: function(d) { return "Hörgeräteliste Eidgenössisches Institut für Metrologie METAS"; },
      url: function(d) { return "https://www.metas.ch/metas/de/home/dok/rechtliches/hoergeraetliste.html"; }
    }
  },
  data: {
    roomtypes: {
      "1": {
        title: function(d) { return "Mehrzweckraum"; },
        "title-hyphens": function(d) { return "Mehrzweck&shy;raum"; }
      },
      "2": {
        title: function(d) { return "Unterrichtsraum"; },
        "title-hyphens": function(d) { return "Unterrichts&shy;raum"; }
      },
      "3": {
        title: function(d) { return "Kultusraum"; },
        "title-hyphens": function(d) { return "Kultus&shy;raum"; }
      },
      "4": {
        title: function(d) { return "Kulturraum"; },
        "title-hyphens": function(d) { return "Kultur&shy;raum"; }
      },
      "5": {
        title: function(d) { return "Amtsraum"; },
        "title-hyphens": function(d) { return "Amts&shy;raum"; }
      },
      "6": {
        title: function(d) { return "Kundenschalter"; },
        "title-hyphens": function(d) { return "Kunden&shy;schalter"; }
      },
      "7": {
        title: function(d) { return "Allgemeinraum"; },
        "title-hyphens": function(d) { return "Allgemein&shy;raum"; }
      },
      "8": {
        title: function(d) { return "Kino"; },
        "title-hyphens": function(d) { return "Kino"; }
      },
      "9": {
        title: function(d) { return "Theater"; },
        "title-hyphens": function(d) { return "Theater"; }
      }
    },
    technologies: {
      "1": {
        title: function(d) { return "Induktion"; },
        description: function(d) { return "T-Modus ist das häufigste Piktogramm. Induktiver Empfang des Direkttons über die Hörgeräte, welche über eine Programmtaste am Hörgerät in den T-Modus umgestellt wurden."; }
      },
      "2": {
        title: function(d) { return "Infrarot"; },
        description: function(d) { return "In seltenen Fällen wird der Direktton über Infrarotlicht an ein kleines tragbares Gerät mit einer induktiven Halsschleife übertragen. Dieser Empfänger ist bei der Rezeption oder an der Kasse erhältlich."; }
      },
      "3": {
        title: function(d) { return "Funk"; },
        description: function(d) { return "Hier ist für einen induktiven Empfang ein kleines tragbares Gerät bei der Rezeption oder an der Kasse erhältlich. Eine induktive Halsschleife ist am kleinen Gerät angeschlossen."; }
      }
    },
    ratings: {
      "1": {
        title: function(d) { return "Grüne Raute"; },
        description: function(d) { return "Geprüfte Höranlage mit normgerechtem Empfang."; },
        "description-short": function(d) { return "Geprüfte Höranlage gemäss Norm"; }
      },
      "2": {
        title: function(d) { return "Gelbe Raute"; },
        description: function(d) { return "Geprüfte Höranlage, die die Voraussetzungen für einen normgerechten Empfang knapp nicht erfüllt."; },
        "description-short": function(d) { return "Geprüfte Höranlage nicht nach Norm"; }
      },
      "3": {
        title: function(d) { return "Weisse Raute"; },
        description: function(d) { return "Nicht überprüfte Höranlage, keine Bewertung."; },
        "description-short": function(d) { return "Nicht überprüfte Höranlage"; }
      }
    }
  },
  pages: {
    help: {
      quickstart: {
        title: function(d) { return "Quickstart"; },
        content: function(d) { return "<p>Wo finden Sie Höranlagen? Tippen Sie hier im www.hoeranlagen.ch <b>Suchbegriffe</b> wie z. B. «Kino», «Theater», «Kirche», «Mehrzweckraum» usw. ein. Sie können die Suche mit weiteren Suchbegriffen <b>einschränken</b>, zum Beispiel: «Universität Bern», «Kino Kosmos» oder «Kirche Stansstad». Die Suchfunktion prüft alle Postadressen, Raum- und Gebäudebezeichnungen.</p>\n<p>Klicken Sie auf einen <b>Marker</b> und es erscheint ein Info-Fenster mit der Postadresse und mit Angaben zur Höranlage. Sofern vorhanden, informieren Raumpläne über einen grünen Raumbereich für einen optimalen Empfang. Klicken Sie auf die Bilder für eine Vergrösserung.</p>"; }
      },
      reception: {
        title: function(d) { return "Informationen zu Hörhilfen"; },
        content: function(d) { return "<p>Wussten Sie schon? Die meisten Hörhilfen können <b>drahtlos</b> ein Tonsignal im Kino, Theater, in Kirchen, Hochschulen, u.s.w. empfangen. Sie hören in klarer Lautstärke und <b>ohne Nachhall und Nebengeräusche</b>. Dies ermöglicht selbst in grossen Versammlungsräumen ein angenehmes Sprachverstehen. An über 2000 Standorten in der Schweiz stehen Höranlagen zur Verfügung.</p>\n<p>Es ist ganz einfach. Sie brauchen Ihre Hörhilfen nur in den <b>T-Modus</b> einzustellen. Dies geschieht über eine Programmtaste oder mit der Fernbedienung Ihrer Hörgeräte. Wenn Sie diese Funktion noch nicht kennen, fragen Sie Ihren <b>Akustiker</b> nach dem T-Modus oder nach dem induktiven Empfang.</p>\n<p>Zu den <b>Hörhilfen</b> gehören alle Gehäuseformen, die vom kleinen Im-Ohr-Gerät über Hinter-dem-Ohr-Gerät bis hin zu spezialisierten Hörhilfen wie Cochlea Implantaten reichen.</p>\n<p>Hat auch Ihr Hörgerät eine Telefonspule? Auf folgender Webseite können Sie die <b>Hörgeräteliste</b> einsehen und feststellen, ob Ihr Hörgerät eine Telefonspule besitzt:</p>"; }
      },
      symbols: {
        title: function(d) { return "Informationen zu Höranlagen"; }
      },
      video: {
        title: function(d) { return "Video: Wie funktioniert eine Höranlage?"; }
      }
    },
    "add-system": {
      title: function(d) { return "Neue Höranlage melden"; },
      "mark-position": function(d) { return "Position auf der Karte markieren"; },
      search: {
        placeholder: function(d) { return "Suchen oder auf die Karte tippen..."; },
        "no-results": {
          title: function(d) { return "Nichts gefunden."; },
          message: function(d) { return "Für die gewählte Position konnte keine Adresse gefunden werden."; }
        }
      },
      submit: {
        success: {
          title: function(d) { return "Vielen Dank"; },
          message: function(d) { return "Ihre Daten wurden gesendet und werden überprüft."; }
        },
        error: {
          title: function(d) { return "Fehler"; }
        }
      }
    },
    sponsors: {
      title: function(d) { return "Sponsoren"; },
      intro: function(d) { return "Wir danken folgenden Sponsoren für die finanzielle Unterstützung:"; }
    },
    "legal-notice": {
      title: function(d) { return "Impressum"; },
      responsability: function(d) { return "Verantwortlich für den Inhalt dieser App ist:"; },
      warrenty: {
        title: function(d) { return "Keine Garantie"; },
        content: function(d) { return "Die Inhalte dieser App stellen ein unverbindliches Informationsangebot dar. Die IGGH gewährleistet weder deren Aktualität, Richtigkeit, Zuverlässigkeit, Vollständigkeit noch deren Qualität. Die Nutzung erfolgt auf eigenes Risiko der Besucherin oder des Besuchers. Die IGGH haftet auf keinen Fall für Schäden oder Folgeschäden materieller oder ideeller Art, die sich aus der Nutzung oder Nichtnutzung der angebotenen Informationen, aus der missbräuchlichen Verwendung oder als Folge von technischen Störungen ergeben. Die IGGH behält sich die Veränderung oder Löschung von Informationen jederzeit und ohne vorherige Ankündigung vor."; }
      },
      liability: {
        title: function(d) { return "Haftungsbeschränkung"; },
        content: function(d) { return "Die IGGH haftet für keinen direkten oder indirekten Schaden, der durch den Zugriff oder die Nutzung dieser App oder der darin veröffentlichten Informationen entstand."; }
      },
      links: {
        title: function(d) { return "Verknüpfte Internetseiten"; },
        content: function(d) { return "Die IGGH überprüft keine der mit den IGGH-Internetseiten verknüpften Seiten und übernimmt keine Haftung für deren Inhalt und für allfällige angebotene Leistungen. Der Besuch solcher Seiten erfolgt auf eigenes Risiko der Nutzerin / des Nutzers."; }
      },
      privacy: {
        title: function(d) { return "Datenschutz"; },
        content: function(d) { return "<p>Die IGGH behandelt die ihr überlassenen persönlichen Daten streng vertraulich und schützt die Interessen der Nutzerinnen und Nutzer. Persönliche Daten werden weder an Dritte verkauft noch weitergegeben. Die IGGH bemüht sich in angemessener Weise, die Datenbanken vor fremden Zugriffen, Verlusten und Missbrauch oder vor Fälschung zu schützen. Die IGGH kann dafür aber keine Garantie übernehmen.</p>\n<p>Die Internetseite der IGGH ist grundsätzlich ohne Angaben von Personalien zugänglich. In enger Zusammenarbeit mit den Hosting-Partnern bemühen wir uns, die Datenbanken mit allen Mitteln vor fremden Zugriffen, Verlusten, Missbrauch oder vor Fälschung zu schützen. Beim Besuch registrieren die Webserver des Hosting-Providers der IGGH unpersönliche Nutzungsdaten. Die Logfiles geben Auskunft über die Anzahl Zugriffe auf die Homepage der IGGH. Die Nutzungsdaten werden nicht mit persönlichen Daten verknüpft.</p>\n<p>Eine Ausnahme bildet die freiwillige Kontaktaufnahme mit uns. Alle Dateien, die Sie uns übermitteln, werden streng vertraulich behandelt. Wir erfassen und speichern sie nur soweit, wie es Ihre Anmeldung und Anfrage erfordert. Der Zugang zu dieser App und die Übertragung von E-Mails an uns sind unverschlüsselt. Es ist theoretisch möglich, dass Dateien unvollständig oder von Dritten eingesehen werden könnten. Aus diesem Grund bitten wir Sie, uns keine vertraulichen Daten per E-Mail zu übermitteln. Anfragen, welche wir per E-Mail erhalten, beantworten wir üblicherweise auch per E-Mail. Sollten Sie dies nicht wünschen, bitten wir Sie, dies in Ihrer Anfrage anzumerken.</p>"; }
      },
      copyright: {
        title: function(d) { return "Copyright"; },
        content: function(d) { return "Für sämtliche Inhalte dieser App (Bilder, Grafiken, Texte, Video usw.) hat die IGGH das Urheberrecht (alle Rechte vorbehalten). Durch das Herunterladen oder Kopieren von Inhalten, Bildern, Fotos und anderen Dateien werden keinerlei Rechte bezüglich der Inhalte übertragen. Für die Reproduktion und Weitergabe jeglicher Elemente ist die schriftliche Zustimmung der IGGH im Voraus einzuholen."; }
      }
    }
  }
}