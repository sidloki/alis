
export default {
  image: function(d) { return "Picture"; },
  "map-type": function(d) { return "Map type"; },
  "default": function(d) { return "Default"; },
  satellite: function(d) { return "Satellite"; },
  address: function(d) { return "Address"; },
  technologies: function(d) { return "Technologies"; },
  ratings: function(d) { return "Evaluations"; },
  "hearing-assistance-system": function(d) { return "Hearing assistance system"; },
  "room-plans": function(d) { return "Room plans"; },
  "no-room-plans": function(d) { return "No room plans available"; },
  website: function(d) { return "Website"; },
  photo: function(d) { return "Photo"; },
  "delete": function(d) { return "Delete"; },
  annotation: function(d) { return "Notes"; },
  "your-contact-info": function(d) { return "Your contact details"; },
  "full-name": function(d) { return "Full name"; },
  "email-address": function(d) { return "E-mail address"; },
  error: {
    geolocation: {
      title: function(d) { return "Location failed"; },
      message: function(d) { return "Is tracking enabled and does the app have permission to access it?"; }
    }
  },
  search: {
    placeholder: function(d) { return "Search for hearing assistance system..."; },
    "no-results": function(d) { return "Nothing was found for the entered search term."; }
  },
  links: {
    metas: {
      title: function(d) { return "List of hearing aids by Federal Institute of Metrology METAS"; },
      url: function(d) { return "https://www.metas.ch/metas/en/home/dok/rechtliches/hoergeraetliste.html"; }
    }
  },
  data: {
    roomtypes: {
      "1": {
        title: function(d) { return "Multi-purpose room"; }
      },
      "2": {
        title: function(d) { return "Classroom"; }
      },
      "3": {
        title: function(d) { return "Place of worship"; }
      },
      "4": {
        title: function(d) { return "Cultural meeting place"; }
      },
      "5": {
        title: function(d) { return "Office"; }
      },
      "6": {
        title: function(d) { return "Customer counter"; }
      },
      "7": {
        title: function(d) { return "Room for general use"; }
      },
      "8": {
        title: function(d) { return "Cinema"; }
      },
      "9": {
        title: function(d) { return "Theatre"; }
      }
    },
    technologies: {
      "1": {
        title: function(d) { return "Induction"; },
        description: function(d) { return "T-mode is the most common icon. Inductive reception of sound directly via hearing aids which have been switched to T-mode by pressing a button on the device."; }
      },
      "2": {
        title: function(d) { return "Infrared"; },
        description: function(d) { return "In rare cases, the direct sound is transmitted via infrared light to a small portable device with an inductive neck loop. This receiver is available at the reception or in the checkout area."; }
      },
      "3": {
        title: function(d) { return "FM"; },
        description: function(d) { return "This requires a small portable device that can be requested at the reception or in the checkout area. An inductive neck loop is attached to the small device."; }
      }
    },
    ratings: {
      "1": {
        title: function(d) { return "Green diamond"; },
        description: function(d) { return "Tested hearing system with standard reception."; },
        "description-short": function(d) { return "Tested, standard-compliant"; }
      },
      "2": {
        title: function(d) { return "Yellow diamond"; },
        description: function(d) { return "Tested hearing system which does not quite meet the standard."; },
        "description-short": function(d) { return "Tested, not quite standard-compliant"; }
      },
      "3": {
        title: function(d) { return "White diamond"; },
        description: function(d) { return "Untested hearing system, not rated."; },
        "description-short": function(d) { return "Untested"; }
      }
    }
  },
  pages: {
    help: {
      quickstart: {
        title: function(d) { return "Quickstart"; },
        content: function(d) { return "<p>Enter <b>keywords</b> like «cinema», «theatre», «kirche», etc. to perform a search on www.hearingloop.ch. You can <b>restrict</b> the search results by entering additional keywords, such as «Universität Zürich», «Cosmos Cinema» or «Kirche Basel». The search function checks all postal addresses, room, and building names.</p>\n<p>Click on a <b>marker</b> to see an info window with the postal address and information about the hearing assistance system. If available, room plans are marked in green to indicate where reception is best. Click on the pictures to enlarge them.</p>"; }
      },
      reception: {
        title: function(d) { return "Information about Hearing Aids"; },
        content: function(d) { return "<p>Did you know? Most hearing aids can receive signals <b>wirelessly</b> in cinemas, theatre, churches, lecture halls, etc. You will hear <b>clearly at full volume without reverberation or background noise</b>. This makes it possible to understand any conversation, even in large meeting rooms full of people. Hearing assistance systems are provided at more than 2,000 locations in Switzerland.</p>\n<p>It‘s really quite simple. You only need to switch your hearing aid to <b>T-mode</b>. This is done with the push of a button on your hearing aid or its remote control. If you don‘t know where to find this button, just ask your <b>hearing aid technician</b> how to set up T-mode or inductive reception.</p>\n<p><b>Hearing aids</b> come in all shapes and sizes, ranging from small in-ear devices to behind-the-ear devices to specialised hearing aids such as cochlear implants.</p>\n<p>Does your hearing aid also have a telecoil? On the following website, you can see a <b>list of hearing aids</b> with telecoil.</p>"; }
      },
      symbols: {
        title: function(d) { return "Information about Hearing Assistance Systems"; }
      },
      video: {
        title: function(d) { return "Video: How does a Hearing Loop work?"; }
      }
    },
    "add-system": {
      title: function(d) { return "Report a new hearing assistance system"; },
      "mark-position": function(d) { return "Mark position on the map"; },
      search: {
        placeholder: function(d) { return "Search or tap on the map..."; },
        "no-results": {
          title: function(d) { return "Nothing found."; },
          message: function(d) { return "No address could be found for the selected position."; }
        }
      },
      submit: {
        success: {
          title: function(d) { return "Many thanks"; },
          message: function(d) { return "The data has been sent and will be checked."; }
        },
        error: {
          title: function(d) { return "Error"; }
        }
      }
    },
    sponsors: {
      title: function(d) { return "Sponsors"; },
      intro: function(d) { return "We thank the following sponsors for the financial support:"; }
    },
    "legal-notice": {
      title: function(d) { return "Legal notice"; },
      responsability: function(d) { return "This website is operated by:"; },
      warrenty: {
        title: function(d) { return "No warrenty"; },
        content: function(d) { return "This website is a non-binding source of information only. IGGH does not make any claim that the information presented here is up-to-date, correct, reliable, accurate, or complete. The use of this information is solely at your own risk. IGGH accepts no liability for damages or consequential damages of any kind that may or may not result from the use, non-use, or misuse of the information offered herein or as a result of technical disturbances. IGGH reserves the right to change or delete the information at any time without prior notice."; }
      },
      liability: {
        title: function(d) { return "Limitation of liability"; },
        content: function(d) { return "IGGH is not responsible for any direct or indirect damage caused by access or use of this website or the information published herein."; }
      },
      links: {
        title: function(d) { return "Links"; },
        content: function(d) { return "IGGH does not check any websites linked herein and does not accept any liability for their content or any services they might offer. Any visit to such sites is at your own risk."; }
      },
      privacy: {
        title: function(d) { return "Data protection"; },
        content: function(d) { return "<p>IGGH treats the personal data it receives as strictly confidential and protects the same in the interests of its users. Personal data will neither be sold nor disclosed to third parties. IGGH makes every effort to protect its databases against third-party access, loss, misuse, or counterfeiting, although IGGH makes no claim to guarantee this.</p>\n<p>The IGGH website may be accessed without providing any personal data. In close cooperation with our hosting providers, we make every effort to protect the databases from outside access, data loss, misuse or falsification. During your visit to the site, the web servers of IGGH's hosting provider will log anonymous usage data. These log files provide information concerning the number of hits received by the IGGH homepage. The usage data are not linked to personal data.</p>\n<p>An exception is if you make voluntary contact with us. All data you submit to us will be kept strictly confidential. We collect and store said data only to the extent required to process your registration and enquiry. This website is accessed and emails are transmitted unencrypted. It is theoretically possible that data could be accessed in whole or in part by third parties. For this reason, we recommend that you not provide us with confidential data by email. Enquiries we receive by email are usually also answered by email. If you would prefer another form of response, please indicate this in your enquiry.</p>"; }
      },
      copyright: {
        title: function(d) { return "Copyright, trademark, and other intellectual property rights"; },
        content: function(d) { return "All content of this website (images, graphics, texts, video, etc.) belongs to and is copyright IGGH or third parties who have made the material available to us. All rights reserved. No rights are transferred to you if you download or copy content, images, photos and other files. Written consent of IGGH must be obtained in advance before any element is reproduced."; }
      }
    }
  }
}