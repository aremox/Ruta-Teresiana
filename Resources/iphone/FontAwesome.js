function FontAwesome() {
    switch (Ti.Platform.osname) {
      case "iphone":
      case "ipad":
        this.fontfamily = "FontAwesome";
        break;

      case "android":
        this.fontfamily = "fontawesome-webfont";
    }
    this.charcode = {
        "icon-glass": 61440,
        "icon-music": 61441,
        "icon-search": 61442,
        "icon-envelope": 61443,
        "icon-heart": 61444,
        "icon-star": 61445,
        "icon-star-empty": 61446,
        "icon-user": 61447,
        "icon-film": 61448,
        "icon-th-large": 61449,
        "icon-th": 61450,
        "icon-th-list": 61451,
        "icon-ok": 61452,
        "icon-remove": 61453,
        "icon-zoom-in": 61454,
        "icon-zoom-out": 61456,
        "icon-off": 61457,
        "icon-signal": 61458,
        "icon-cog": 61459,
        "icon-trash": 61460,
        "icon-home": 61461,
        "icon-file": 61462,
        "icon-time": 61463,
        "icon-road": 61464,
        "icon-download-alt": 61465,
        "icon-download": 61466,
        "icon-upload": 61467,
        "icon-inbox": 61468,
        "icon-play-circle": 61469,
        "icon-repeat": 61470,
        "icon-refresh": 61473,
        "icon-list-alt": 61474,
        "icon-lock": 61475,
        "icon-flag": 61476,
        "icon-headphones": 61477,
        "icon-volume-off": 61478,
        "icon-volume-down": 61479,
        "icon-volume-up": 61480,
        "icon-qrcode": 61481,
        "icon-barcode": 61482,
        "icon-tag": 61483,
        "icon-tags": 61484,
        "icon-book": 61485,
        "icon-bookmark": 61486,
        "icon-print": 61487,
        "icon-camera": 61488,
        "icon-font": 61489,
        "icon-bold": 61490,
        "icon-italic": 61491,
        "icon-text-height": 61492,
        "icon-text-width": 61493,
        "icon-align-left": 61494,
        "icon-align-center": 61495,
        "icon-align-right": 61496,
        "icon-align-justify": 61497,
        "icon-list": 61498,
        "icon-indent-left": 61499,
        "icon-indent-right": 61500,
        "icon-facetime-video": 61501,
        "icon-picture": 61502,
        "icon-pencil": 61504,
        "icon-map-marker": 61505,
        "icon-adjust": 61506,
        "icon-tint": 61507,
        "icon-edit": 61508,
        "icon-share": 61509,
        "icon-check": 61510,
        "icon-move": 61511,
        "icon-step-backward": 61512,
        "icon-fast-backward": 61513,
        "icon-backward": 61514,
        "icon-play": 61515,
        "icon-pause": 61516,
        "icon-stop": 61517,
        "icon-forward": 61518,
        "icon-fast-forward": 61520,
        "icon-step-forward": 61521,
        "icon-eject": 61522,
        "icon-chevron-left": 61523,
        "icon-chevron-right": 61524,
        "icon-plus-sign": 61525,
        "icon-minus-sign": 983126,
        "icon-remove-sign": 61527,
        "icon-ok-sign": 61528,
        "icon-question-sign": 61529,
        "icon-info-sign": 61530,
        "icon-screenshot": 61531,
        "icon-remove-circle": 61532,
        "icon-ok-circle": 61533,
        "icon-ban-circle": 61534,
        "icon-arrow-left": 61536,
        "icon-arrow-right": 61537,
        "icon-arrow-up": 61538,
        "icon-arrow-down": 61539,
        "icon-share-alt": 61540,
        "icon-resize-full": 61541,
        "icon-resize-small": 61542,
        "icon-plus": 61543,
        "icon-minus": 61544,
        "icon-asterisk": 61545,
        "icon-exclamation-sign": 61546,
        "icon-gift": 61547,
        "icon-leaf": 61548,
        "icon-fire": 61549,
        "icon-eye-open": 61550,
        "icon-eye-close": 61552,
        "icon-warning-sign": 61553,
        "icon-plane": 61554,
        "icon-calendar": 61555,
        "icon-random": 61556,
        "icon-comment": 61557,
        "icon-magnet": 61558,
        "icon-chevron-up": 61559,
        "icon-chevron-down": 61560,
        "icon-retweet": 61561,
        "icon-shopping-cart": 61562,
        "icon-folder-close": 61563,
        "icon-folder-open": 61564,
        "icon-resize-vertical": 61565,
        "icon-resize-horizontal": 61566,
        "icon-bar-chart": 61568,
        "icon-twitter-sign": 61569,
        "icon-facebook-sign": 61570,
        "icon-camera-retro": 61571,
        "icon-key": 61572,
        "icon-cogs": 61573,
        "icon-comments": 61574,
        "icon-thumbs-up": 61575,
        "icon-thumbs-down": 61576,
        "icon-star-half": 61577,
        "icon-heart-empty": 61578,
        "icon-signout": 61579,
        "icon-linkedin-sign": 61580,
        "icon-pushpin": 61581,
        "icon-external-link": 61582,
        "icon-signin": 61584,
        "icon-trophy": 61585,
        "icon-github-sign": 61586,
        "icon-upload-alt": 61587,
        "icon-lemon": 61588,
        "icon-phone": 61589,
        "icon-check-empty": 61590,
        "icon-bookmark-empty": 61591,
        "icon-phone-sign": 61592,
        "icon-twitter": 61593,
        "icon-facebook": 61594,
        "icon-github": 61595,
        "icon-unlock": 61596,
        "icon-credit-card": 61597,
        "icon-rss": 61598,
        "icon-hdd": 61600,
        "icon-bullhorn": 61601,
        "icon-bell": 61602,
        "icon-certificate": 61603,
        "icon-hand-right": 61604,
        "icon-hand-left": 61605,
        "icon-hand-up": 61606,
        "icon-hand-down": 61607,
        "icon-circle-arrow-left": 61608,
        "icon-circle-arrow-right": 61609,
        "icon-circle-arrow-up": 61610,
        "icon-circle-arrow-down": 61611,
        "icon-globe": 61612,
        "icon-wrench": 61613,
        "icon-tasks": 61614,
        "icon-filter": 61616,
        "icon-briefcase": 61617,
        "icon-fullscreen": 61618,
        "icon-group": 61632,
        "icon-link": 61633,
        "icon-cloud": 61634,
        "icon-beaker": 61635,
        "icon-cut": 61636,
        "icon-copy": 61637,
        "icon-paper-clip": 61638,
        "icon-save": 61639,
        "icon-sign-blank": 61640,
        "icon-reorder": 61641,
        "icon-list-ul": 61642,
        "icon-list-ol": 61643,
        "icon-strikethrough": 61644,
        "icon-underline": 61645,
        "icon-table": 61646,
        "icon-magic": 61648,
        "icon-truck": 61649,
        "icon-pinterest": 61650,
        "icon-pinterest-sign": 61651,
        "icon-google-plus-sign": 61652,
        "icon-google-plus": 61653,
        "icon-money": 61654,
        "icon-caret-down": 61655,
        "icon-caret-up": 61656,
        "icon-caret-left": 61657,
        "icon-caret-right": 61658,
        "icon-columns": 61659,
        "icon-sort": 61660,
        "icon-sort-down": 61661,
        "icon-sort-up": 61662,
        "icon-envelope-alt": 61664,
        "icon-linkedin": 61665,
        "icon-undo": 61666,
        "icon-legal": 61667,
        "icon-dashboard": 61668,
        "icon-comment-alt": 61669,
        "icon-comments-alt": 61670,
        "icon-bolt": 61671,
        "icon-sitemap": 61672,
        "icon-umbrella": 61673,
        "icon-paste": 61674,
        "icon-lightbulb": 61675,
        "icon-exchange": 61676,
        "icon-cloud-download": 61677,
        "icon-cloud-upload": 61678,
        "icon-user-md": 61952,
        "icon-stethoscope": 61681,
        "icon-suitcase": 61682,
        "icon-bell-alt": 61683,
        "icon-coffee": 61684,
        "icon-food": 61685,
        "icon-file-alt": 61686,
        "icon-building": 61687,
        "icon-hospital": 61688,
        "icon-ambulance": 61689,
        "icon-medkit": 61690,
        "icon-fighter-jet": 61691,
        "icon-beer": 61692,
        "icon-h-sign": 61693,
        "icon-plus-sign-alt": 61694,
        "icon-double-angle-left": 61696,
        "icon-double-angle-right": 61697,
        "icon-double-angle-up": 61698,
        "icon-double-angle-down": 61699,
        "icon-angle-left": 61700,
        "icon-angle-right": 61701,
        "icon-angle-up": 61702,
        "icon-angle-down": 61703,
        "icon-desktop": 61704,
        "icon-laptop": 61705,
        "icon-tablet": 61706,
        "icon-mobile-phone": 61707,
        "icon-circle-blank": 61708,
        "icon-quote-left": 61709,
        "icon-quote-right": 61710,
        "icon-spinner": 61712,
        "icon-circle": 61713,
        "icon-reply": 61714,
        "icon-github-alt": 61715,
        "icon-folder-close-alt": 61716,
        "icon-folder-open-alt": 61717,
        "icon-rotate-left": 61666,
        "icon-rotate-right": 61470
    };
}

FontAwesome.prototype.getCharcode = function(options) {
    return this.charcode[options];
};

module.exports = FontAwesome;