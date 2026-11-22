/* KHOKA TEMPLATES — marketplace.js
   Shared by templates/index.html (store) and templates/details.html (product page).
   Requires templates-data.js. Language is shared with the homepage via localStorage "lang".
   The order form is DEMO ONLY: it validates input and shows a summary. Nothing is sent or stored. */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ text */
  const MT = {
    en: {
      skip: "Skip to content", services: "Services", templates: "Templates", portfolio: "Work", about: "About", contact: "Contact", cta: "Start a project",
      m_tag: "KHOKA TEMPLATES", m_h1: "Website templates, designed and built properly.",
      m_lead: "Six complete websites, each with its own design system and a working live demo. Pick one, tell us what to change, and we customise it for you.",
      how_t: "How ordering works", how1: "<b>Try the live demo</b> on any screen size.", how2: "<b>Send an order request</b> with the changes you need.", how3: "<b>We confirm price and timing</b> before any work starts.",
      search_lbl: "Search", search_ph: "Shop, menu, courses…", cat_lbl: "Category", sort_lbl: "Sort",
      s_feat: "Recommended", s_low: "Price: low to high", s_high: "Price: high to low", s_name: "Name: A–Z",
      all: "All templates", showing: "{n} of {t} templates", reset: "Clear filters",
      empty_h: "Nothing matches that search", empty_p: "Try a broader word, or clear the filters to see all six templates.",
      preview: "Live demo", details: "Details", order: "Order", order_full: "Order this template", demo_price: "Demo price", view: "View details",
      note: "Prices shown are demo prices for presentation. This site does not take payments; final price and delivery are agreed directly with KHOKA TECH.",
      overview: "Overview", included: "What's included", features: "Details worth knowing", design: "Design system", palette_lbl: "Palette", type_lbl: "Typefaces",
      responsive: "Responsive behaviour", desk: "Desktop", tab: "Tablet", mob: "Mobile",
      desk_d: "Full layout from 1024px up.", tab_d: "Reflowed grids and navigation.", mob_d: "Single column, touch-sized controls.",
      tech: "Built with", custom: "Customisation", custom_p: "Available. KHOKA TECH can adapt this template to your business:",
      c1: "Your logo, colours and typefaces", c2: "Your own text, photos and sections", c3: "Extra pages or features, quoted separately", c4: "Help publishing on free hosting such as GitHub Pages",
      f_cat: "Category", f_ver: "Version", f_sec: "Sections", f_files: "Files", f_files_v: "HTML, CSS, JS", f_backend: "Backend needed", no: "No", f_custom: "Customisation", yes: "Available",
      related: "Other templates", nf_h: "We couldn't find that template", nf_p: "The link may be out of date. All six templates are listed in the store.", back: "Go to the store",
      dev_desktop: "Desktop", dev_tablet: "Tablet", dev_mobile: "Mobile", open_new: "Open in new tab", frame_title: "Live demo of {name}",
      o_title: "Order {name}", o_title_plain: "Order a template", o_sub: "Tell us what you need and how to reach you.",
      o_demo: "This form doesn't send anything by itself and takes no payment. After checking your details, you send the request yourself through WhatsApp or email.",
      f_name: "Your name", f_email: "Email", f_wa: "WhatsApp number", f_wa_hint: "Include the country code, e.g. +880 1712 345678",
      f_tpl: "Template", f_tpl_ph: "Choose a template", f_req: "What should we change?", f_req_ph: "Colours, pages, content, features, deadline…",
      submit: "Check request", cancel: "Cancel", close: "Close",
      e_req: "This field is required.", e_email: "Enter a valid email address.", e_wa: "Enter a valid WhatsApp number (8–15 digits, + optional).", e_short: "Please write at least 10 characters.", e_tpl: "Please choose a template.",
      ok_h: "Your request is ready — not sent yet", ok_p: "Send it to KHOKA TECH on WhatsApp or by email. Your app opens with the message filled in, so you can check it before sending. No order is placed and no payment is taken until we confirm the details with you.",
      send_wa: "Send on WhatsApp", send_mail: "Send by email", mail_subj: "Template order request",
      copy: "Copy summary", copied: "Summary copied.", copy_fail: "Couldn't copy — please select the text manually.", edit: "Edit request",
      fd: "Websites, AI tools and digital products for growing businesses.", fq: "Studio", fcat: "Categories", fc: "Contact", credit: "Designed and developed by KHOKA TECH.", soon: "Social links are placeholders — add yours in the HTML.",
      f_cta: "Need something these templates don't cover?",
      t_market: "Website Templates — KHOKA TEMPLATES by KHOKA TECH", t_detail: "{name} — {cat} website template | KHOKA TEMPLATES"
    },
    bn: {
      skip: "মূল কনটেন্টে যান", services: "সেবা", templates: "টেমপ্লেট", portfolio: "কাজ", about: "পরিচিতি", contact: "যোগাযোগ", cta: "প্রজেক্ট শুরু করুন",
      m_tag: "খোকা টেমপ্লেটস", m_h1: "যত্ন নিয়ে ডিজাইন ও তৈরি ওয়েবসাইট টেমপ্লেট।",
      m_lead: "ছয়টি সম্পূর্ণ ওয়েবসাইট, প্রতিটির নিজস্ব ডিজাইন সিস্টেম ও কার্যকর লাইভ ডেমো। একটি বেছে নিন, কী বদলাতে হবে জানান, আমরা আপনার জন্য সাজিয়ে দেব।",
      how_t: "অর্ডার যেভাবে হয়", how1: "<b>লাইভ ডেমো দেখুন</b> যেকোনো স্ক্রিনে।", how2: "<b>অর্ডার অনুরোধ পাঠান</b> প্রয়োজনীয় পরিবর্তনসহ।", how3: "<b>মূল্য ও সময় নিশ্চিত করি</b> কাজ শুরুর আগে।",
      search_lbl: "খুঁজুন", search_ph: "শপ, মেনু, কোর্স…", cat_lbl: "ক্যাটাগরি", sort_lbl: "সাজান",
      s_feat: "প্রস্তাবিত", s_low: "মূল্য: কম থেকে বেশি", s_high: "মূল্য: বেশি থেকে কম", s_name: "নাম: A–Z",
      all: "সব টেমপ্লেট", showing: "{t}টির মধ্যে {n}টি টেমপ্লেট", reset: "ফিল্টার মুছুন",
      empty_h: "এই খোঁজে কিছু মেলেনি", empty_p: "আরও সাধারণ শব্দ দিয়ে চেষ্টা করুন, বা ফিল্টার মুছে ছয়টিই দেখুন।",
      preview: "লাইভ ডেমো", details: "বিস্তারিত", order: "অর্ডার", order_full: "এই টেমপ্লেট অর্ডার করুন", demo_price: "ডেমো মূল্য", view: "বিস্তারিত দেখুন",
      note: "দেখানো মূল্যগুলো উপস্থাপনার জন্য ডেমো মূল্য। এই সাইট কোনো পেমেন্ট নেয় না; চূড়ান্ত মূল্য ও ডেলিভারি সরাসরি খোকা টেকের সাথে ঠিক হয়।",
      overview: "সংক্ষেপে", included: "যা যা আছে", features: "জানার মতো বিষয়", design: "ডিজাইন সিস্টেম", palette_lbl: "রং", type_lbl: "টাইপফেস",
      responsive: "রেসপন্সিভ আচরণ", desk: "ডেস্কটপ", tab: "ট্যাবলেট", mob: "মোবাইল",
      desk_d: "১০২৪px থেকে পূর্ণ লেআউট।", tab_d: "গ্রিড ও নেভিগেশন নতুনভাবে সাজানো।", mob_d: "এক কলাম, আঙুলে চাপার উপযোগী বোতাম।",
      tech: "যা দিয়ে তৈরি", custom: "কাস্টমাইজেশন", custom_p: "উপলব্ধ। খোকা টেক এই টেমপ্লেট আপনার ব্যবসার মতো করে সাজাতে পারে:",
      c1: "আপনার লোগো, রং ও টাইপফেস", c2: "আপনার নিজের লেখা, ছবি ও সেকশন", c3: "অতিরিক্ত পেজ বা ফিচার, আলাদা মূল্যে", c4: "GitHub Pages-এর মতো ফ্রি হোস্টিংয়ে প্রকাশে সহায়তা",
      f_cat: "ক্যাটাগরি", f_ver: "ভার্সন", f_sec: "সেকশন", f_files: "ফাইল", f_files_v: "HTML, CSS, JS", f_backend: "ব্যাকএন্ড প্রয়োজন", no: "না", f_custom: "কাস্টমাইজেশন", yes: "উপলব্ধ",
      related: "অন্যান্য টেমপ্লেট", nf_h: "টেমপ্লেটটি খুঁজে পাওয়া যায়নি", nf_p: "লিংকটি হয়তো পুরোনো। ছয়টি টেমপ্লেটই স্টোরে আছে।", back: "স্টোরে যান",
      dev_desktop: "ডেস্কটপ", dev_tablet: "ট্যাবলেট", dev_mobile: "মোবাইল", open_new: "নতুন ট্যাবে খুলুন", frame_title: "{name}-এর লাইভ ডেমো",
      o_title: "{name} অর্ডার", o_title_plain: "টেমপ্লেট অর্ডার", o_sub: "আপনার কী দরকার এবং কীভাবে যোগাযোগ করব জানান।",
      o_demo: "এই ফর্ম নিজে থেকে কিছু পাঠায় না এবং কোনো পেমেন্ট নেয় না। তথ্য যাচাইয়ের পর আপনি নিজেই হোয়াটসঅ্যাপ বা ইমেইলে অনুরোধটি পাঠাবেন।",
      f_name: "আপনার নাম", f_email: "ইমেইল", f_wa: "হোয়াটসঅ্যাপ নম্বর", f_wa_hint: "কান্ট্রি কোডসহ লিখুন, যেমন +880 1712 345678",
      f_tpl: "টেমপ্লেট", f_tpl_ph: "একটি টেমপ্লেট বেছে নিন", f_req: "কী কী বদলাতে হবে?", f_req_ph: "রং, পেজ, কনটেন্ট, ফিচার, সময়সীমা…",
      submit: "অনুরোধ যাচাই করুন", cancel: "বাতিল", close: "বন্ধ করুন",
      e_req: "এই ঘরটি পূরণ করা আবশ্যক।", e_email: "সঠিক ইমেইল ঠিকানা দিন।", e_wa: "সঠিক হোয়াটসঅ্যাপ নম্বর দিন (৮–১৫ অঙ্ক, + ঐচ্ছিক)।", e_short: "অন্তত ১০টি অক্ষর লিখুন।", e_tpl: "একটি টেমপ্লেট বেছে নিন।",
      ok_h: "আপনার অনুরোধ তৈরি — এখনও পাঠানো হয়নি", ok_p: "হোয়াটসঅ্যাপ বা ইমেইলে খোকা টেককে পাঠান। বার্তা লেখা অবস্থায় আপনার অ্যাপ খুলবে, পাঠানোর আগে দেখে নিতে পারবেন। আমরা আপনার সাথে বিস্তারিত নিশ্চিত না করা পর্যন্ত কোনো অর্ডার হয় না এবং কোনো পেমেন্ট নেওয়া হয় না।",
      send_wa: "হোয়াটসঅ্যাপে পাঠান", send_mail: "ইমেইলে পাঠান", mail_subj: "টেমপ্লেট অর্ডার অনুরোধ",
      copy: "সারসংক্ষেপ কপি করুন", copied: "সারসংক্ষেপ কপি হয়েছে।", copy_fail: "কপি হয়নি — লেখাটি নিজে সিলেক্ট করুন।", edit: "অনুরোধ সম্পাদনা",
      fd: "বাড়ন্ত ব্যবসার জন্য ওয়েবসাইট, এআই টুল ও ডিজিটাল পণ্য।", fq: "স্টুডিও", fcat: "ক্যাটাগরি", fc: "যোগাযোগ", credit: "ডিজাইন ও ডেভেলপমেন্ট: খোকা টেক।", soon: "সোশ্যাল লিংকগুলো প্লেসহোল্ডার — HTML-এ আপনার লিংক দিন।",
      f_cta: "এই টেমপ্লেটগুলোতে যা নেই, তেমন কিছু দরকার?",
      t_market: "ওয়েবসাইট টেমপ্লেট — খোকা টেক", t_detail: "{name} — {cat} টেমপ্লেট | খোকা টেমপ্লেটস"
    },
    hi: {
      skip: "मुख्य सामग्री पर जाएँ", services: "सेवाएँ", templates: "टेम्पलेट", portfolio: "काम", about: "परिचय", contact: "संपर्क", cta: "प्रोजेक्ट शुरू करें",
      m_tag: "खोका टेम्पलेट्स", m_h1: "ठीक से डिज़ाइन और बनाए गए वेबसाइट टेम्पलेट।",
      m_lead: "छह पूरी वेबसाइटें, हर एक का अपना डिज़ाइन सिस्टम और काम करता लाइव डेमो। एक चुनें, बताएँ क्या बदलना है, और हम उसे आपके लिए तैयार करेंगे।",
      how_t: "ऑर्डर कैसे होता है", how1: "<b>लाइव डेमो आज़माएँ</b> किसी भी स्क्रीन पर।", how2: "<b>ऑर्डर अनुरोध भेजें</b> ज़रूरी बदलावों के साथ।", how3: "<b>मूल्य और समय तय करते हैं</b> काम शुरू होने से पहले।",
      search_lbl: "खोजें", search_ph: "शॉप, मेनू, कोर्स…", cat_lbl: "कैटेगरी", sort_lbl: "क्रम",
      s_feat: "सुझाए गए", s_low: "मूल्य: कम से ज़्यादा", s_high: "मूल्य: ज़्यादा से कम", s_name: "नाम: A–Z",
      all: "सभी टेम्पलेट", showing: "{t} में से {n} टेम्पलेट", reset: "फ़िल्टर हटाएँ",
      empty_h: "इस खोज से कुछ नहीं मिला", empty_p: "कोई व्यापक शब्द आज़माएँ, या फ़िल्टर हटाकर सभी छह देखें।",
      preview: "लाइव डेमो", details: "विवरण", order: "ऑर्डर", order_full: "यह टेम्पलेट ऑर्डर करें", demo_price: "डेमो मूल्य", view: "विवरण देखें",
      note: "दिखाई गई कीमतें प्रस्तुति के लिए डेमो कीमतें हैं। यह साइट भुगतान नहीं लेती; अंतिम मूल्य और डिलीवरी सीधे खोका टेक से तय होती है।",
      overview: "परिचय", included: "क्या शामिल है", features: "जानने योग्य बातें", design: "डिज़ाइन सिस्टम", palette_lbl: "रंग", type_lbl: "टाइपफ़ेस",
      responsive: "रिस्पॉन्सिव व्यवहार", desk: "डेस्कटॉप", tab: "टैबलेट", mob: "मोबाइल",
      desk_d: "1024px से पूरा लेआउट।", tab_d: "ग्रिड और नेविगेशन नए सिरे से।", mob_d: "एक कॉलम, टच के अनुकूल बटन।",
      tech: "किससे बना", custom: "कस्टमाइज़ेशन", custom_p: "उपलब्ध। खोका टेक इस टेम्पलेट को आपके व्यवसाय के अनुसार ढाल सकता है:",
      c1: "आपका लोगो, रंग और टाइपफ़ेस", c2: "आपका अपना टेक्स्ट, फ़ोटो और सेक्शन", c3: "अतिरिक्त पेज या फ़ीचर, अलग कोटेशन पर", c4: "GitHub Pages जैसी मुफ़्त होस्टिंग पर प्रकाशन में मदद",
      f_cat: "कैटेगरी", f_ver: "वर्ज़न", f_sec: "सेक्शन", f_files: "फ़ाइलें", f_files_v: "HTML, CSS, JS", f_backend: "बैकएंड ज़रूरी", no: "नहीं", f_custom: "कस्टमाइज़ेशन", yes: "उपलब्ध",
      related: "अन्य टेम्पलेट", nf_h: "वह टेम्पलेट नहीं मिला", nf_p: "लिंक पुराना हो सकता है। सभी छह टेम्पलेट स्टोर में हैं।", back: "स्टोर पर जाएँ",
      dev_desktop: "डेस्कटॉप", dev_tablet: "टैबलेट", dev_mobile: "मोबाइल", open_new: "नए टैब में खोलें", frame_title: "{name} का लाइव डेमो",
      o_title: "{name} ऑर्डर करें", o_title_plain: "टेम्पलेट ऑर्डर करें", o_sub: "बताइए आपको क्या चाहिए और हम आपसे कैसे संपर्क करें।",
      o_demo: "यह फ़ॉर्म अपने आप कुछ नहीं भेजता और कोई भुगतान नहीं लेता। जानकारी जाँचने के बाद आप ख़ुद व्हाट्सऐप या ईमेल से अनुरोध भेजते हैं।",
      f_name: "आपका नाम", f_email: "ईमेल", f_wa: "व्हाट्सऐप नंबर", f_wa_hint: "कंट्री कोड सहित लिखें, जैसे +91 98765 43210",
      f_tpl: "टेम्पलेट", f_tpl_ph: "एक टेम्पलेट चुनें", f_req: "क्या बदलना है?", f_req_ph: "रंग, पेज, सामग्री, फ़ीचर, समय-सीमा…",
      submit: "अनुरोध जाँचें", cancel: "रद्द करें", close: "बंद करें",
      e_req: "यह फ़ील्ड आवश्यक है।", e_email: "सही ईमेल पता दर्ज करें।", e_wa: "सही व्हाट्सऐप नंबर दर्ज करें (8–15 अंक, + वैकल्पिक)।", e_short: "कम से कम 10 अक्षर लिखें।", e_tpl: "कृपया एक टेम्पलेट चुनें।",
      ok_h: "आपका अनुरोध तैयार है — अभी भेजा नहीं गया", ok_p: "इसे व्हाट्सऐप या ईमेल से खोका टेक को भेजें। आपका ऐप संदेश भरा हुआ खोलेगा, भेजने से पहले आप जाँच सकते हैं। हमारे साथ विवरण तय होने तक कोई ऑर्डर नहीं होता और कोई भुगतान नहीं लिया जाता।",
      send_wa: "व्हाट्सऐप पर भेजें", send_mail: "ईमेल से भेजें", mail_subj: "टेम्पलेट ऑर्डर अनुरोध",
      copy: "सारांश कॉपी करें", copied: "सारांश कॉपी हो गया।", copy_fail: "कॉपी नहीं हुआ — कृपया टेक्स्ट स्वयं चुनें।", edit: "अनुरोध बदलें",
      fd: "बढ़ते व्यवसायों के लिए वेबसाइट, एआई टूल और डिजिटल उत्पाद।", fq: "स्टूडियो", fcat: "कैटेगरी", fc: "संपर्क", credit: "डिज़ाइन व डेवलपमेंट: खोका टेक।", soon: "सोशल लिंक प्लेसहोल्डर हैं — HTML में अपने लिंक जोड़ें।",
      f_cta: "कुछ ऐसा चाहिए जो इन टेम्पलेट में नहीं है?",
      t_market: "वेबसाइट टेम्पलेट — खोका टेक", t_detail: "{name} — {cat} टेम्पलेट | खोका टेम्पलेट्स"
    }
  };

  const TEMPLATES = (window.KT_TEMPLATES || []).slice().sort((a, b) => a.order - b.order);
  const CATS = window.KT_CATEGORIES || {};
  const ROOT = document.body.dataset.root || "../";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  let lang = (() => { try { return localStorage.getItem("lang"); } catch (e) { return null; } })();
  if (!MT[lang]) lang = "en";
  const t = (k, v) => { let s = MT[lang][k] ?? MT.en[k] ?? k; if (v) for (const x in v) s = s.split("{" + x + "}").join(v[x]); return s; };
  const L = o => (o ? o[lang] ?? o.en : "");
  const catName = id => L(CATS[id]) || id;
  const money = n => "$" + n;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = id => TEMPLATES.find(x => x.id === id);
  const detailsUrl = id => "details.html?id=" + encodeURIComponent(id);
  const vars = tp => `--paper:${tp.paper};--accent:${tp.accent};--tink:${tp.ink}`;

  const ICON = {
    desktop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>',
    tablet: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="2.5" width="14" height="19" rx="1.5"/><path d="M11 18.5h2"/></svg>',
    mobile: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7.5" y="2.5" width="9" height="19" rx="1.5"/><path d="M11 18.5h2"/></svg>'
  };

  function toast(msg) { const el = $("#toast"); if (!el) return; el.textContent = msg; el.classList.add("show"); clearTimeout(toast.i); toast.i = setTimeout(() => el.classList.remove("show"), 3000); }
  function applyI18n(root = document) {
    $$("[data-i18n]", root).forEach(e => { e.textContent = t(e.dataset.i18n); });
    $$("[data-i18n-html]", root).forEach(e => { e.innerHTML = t(e.dataset.i18nHtml); });
    $$("[data-i18n-ph]", root).forEach(e => { e.placeholder = t(e.dataset.i18nPh); });
    $$("[data-i18n-aria]", root).forEach(e => { e.setAttribute("aria-label", t(e.dataset.i18nAria)); });
  }

  /* ---------------------------------------------------------- product card */
  function card(tp, i = 0) {
    const name = esc(tp.name), cat = esc(catName(tp.category)), d = detailsUrl(tp.id);
    return `<article class="pcard" style="${vars(tp)};animation-delay:${i * 50}ms">
  <a class="pshot" href="${d}" aria-label="${esc(t("details"))}: ${name}"><img src="${ROOT + tp.thumb}" alt="${name} — ${cat}" width="640" height="400" loading="lazy" decoding="async"><span class="go" aria-hidden="true">${esc(t("view"))} →</span></a>
  <div class="pbody">
    <div class="ptop"><div><span class="pcat">${cat}</span><h3><a href="${d}">${name}</a></h3></div><div class="price num">${money(tp.price)}<small>${esc(t("demo_price"))}</small></div></div>
    <p>${esc(L(tp.short))}</p>
    <div class="spec"><span class="sw" aria-hidden="true">${tp.palette.map(c => `<i style="background:${c}"></i>`).join("")}</span><span>${esc(tp.fonts)}</span></div>
    <div class="pact">
      <a class="btn sm" href="${ROOT + tp.demo}" target="_blank" rel="noopener">${esc(t("preview"))} ↗</a>
      <a class="btn sm" href="${d}">${esc(t("details"))}</a>
      <button class="btn primary sm" type="button" data-order="${tp.id}">${esc(t("order"))}</button>
    </div>
  </div>
</article>`;
  }

  /* ------------------------------------------------------------------ store */
  const state = { q: "", cat: "all", sort: "featured" };

  function initStore() {
    const p = new URLSearchParams(location.search);
    if (CATS[p.get("cat")]) state.cat = p.get("cat");
    if (p.get("q")) state.q = p.get("q").slice(0, 80);
    if (["featured", "low", "high", "name"].includes(p.get("sort"))) state.sort = p.get("sort");
    $("#q").value = state.q; $("#sort").value = state.sort;
    let deb;
    $("#q").addEventListener("input", e => { clearTimeout(deb); deb = setTimeout(() => { state.q = e.target.value; renderStore(); }, 120); });
    $("#sort").addEventListener("change", e => { state.sort = e.target.value; renderStore(); });
    $("#cats").addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (b) { state.cat = b.dataset.cat; renderStore(); } });
    document.addEventListener("click", e => {
      if (!e.target.closest("[data-reset]")) return;
      state.q = ""; state.cat = "all"; state.sort = "featured"; $("#q").value = ""; $("#sort").value = "featured"; renderStore(); $("#q").focus();
    });
  }

  const hay = tp => [tp.name, tp.category, tp.fonts, ...Object.values(CATS[tp.category] || {}), ...Object.values(tp.short), ...tp.tags, ...tp.sections.en, ...tp.features.en].join(" ").toLowerCase();

  function renderStore() {
    const counts = TEMPLATES.reduce((a, x) => (a[x.category] = (a[x.category] || 0) + 1, a), {});
    $("#cats").innerHTML = [["all", t("all"), TEMPLATES.length], ...Object.keys(CATS).map(k => [k, catName(k), counts[k] || 0])]
      .map(([k, l, n]) => `<button type="button" class="cat-btn" data-cat="${k}" aria-pressed="${state.cat === k}"><span>${esc(l)}</span><span class="n">${n}</span></button>`).join("");

    const terms = state.q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const sorters = { featured: (a, b) => a.order - b.order, low: (a, b) => a.price - b.price || a.order - b.order, high: (a, b) => b.price - a.price || a.order - b.order, name: (a, b) => a.name.localeCompare(b.name) };
    const list = TEMPLATES.filter(tp => (state.cat === "all" || tp.category === state.cat) && terms.every(w => hay(tp).includes(w))).sort(sorters[state.sort]);
    const filtered = state.q.trim() || state.cat !== "all";
    $("#count").innerHTML = `<span class="num">${esc(t("showing", { n: list.length, t: TEMPLATES.length }))}</span>` + (filtered ? `<button type="button" class="linkbtn" data-reset>${esc(t("reset"))}</button>` : "");
    $("#grid").innerHTML = list.length ? list.map(card).join("")
      : `<div class="empty" style="grid-column:1/-1"><h3>${esc(t("empty_h"))}</h3><p>${esc(t("empty_p"))}</p><p style="margin-top:18px"><button type="button" class="btn sm" data-reset>${esc(t("reset"))}</button></p></div>`;

    const p = new URLSearchParams();
    if (state.cat !== "all") p.set("cat", state.cat);
    if (state.q.trim()) p.set("q", state.q.trim());
    if (state.sort !== "featured") p.set("sort", state.sort);
    try { history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : "")); } catch (e) { /* some browsers block this on file:// */ }
    document.title = t("t_market");
  }

  /* ----------------------------------------------------------- product page */
  let device = "desktop";
  function renderDetails() {
    const host = $("#detail"), tp = byId(new URLSearchParams(location.search).get("id"));
    if (!tp) {
      host.innerHTML = `<div class="empty" style="margin:56px 0"><h1 style="font-size:1.9rem;margin-bottom:10px">${esc(t("nf_h"))}</h1><p>${esc(t("nf_p"))}</p><p style="margin-top:22px"><a class="btn primary" href="./">${esc(t("back"))}</a></p></div>`;
      document.title = t("nf_h") + " | KHOKA TEMPLATES"; return;
    }
    const cat = catName(tp.category);
    document.title = t("t_detail", { name: tp.name, cat });
    const md = $('meta[name="description"]'); if (md) md.setAttribute("content", tp.short.en);
    const dev = d => `<button type="button" data-device="${d}" aria-pressed="${device === d}">${ICON[d]}<span>${esc(t("dev_" + d))}</span></button>`;
    host.innerHTML = `
<nav class="crumbs" aria-label="Breadcrumb"><a href="${ROOT}index.html">KHOKA TECH</a><span aria-hidden="true">/</span><a href="./">${esc(t("templates"))}</a><span aria-hidden="true">/</span><a href="./?cat=${tp.category}">${esc(cat)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(tp.name)}</span></nav>
<div class="p-head" style="${vars(tp)}">
  <div><span class="pcat">${esc(cat)} · v${esc(tp.version)}</span><h1>${esc(tp.name)}</h1><p class="lede">${esc(L(tp.short))}</p></div>
  <div class="buy"><div class="price num">${money(tp.price)}<small>${esc(t("demo_price"))}</small></div><button class="btn primary" type="button" data-order="${tp.id}">${esc(t("order_full"))}</button></div>
</div>
<div class="stage" style="${vars(tp)}">
  <div class="stage-bar">
    <div class="devices" role="group" aria-label="${esc(t("preview"))}">${dev("desktop")}${dev("tablet")}${dev("mobile")}</div>
    <span class="stage-url">${esc(tp.demo.replace("templates/demos/", ""))}</span>
    <a class="link" href="${ROOT + tp.demo}" target="_blank" rel="noopener">${esc(t("open_new"))} ↗</a>
  </div>
  <div class="viewport ${device}" id="viewport"><iframe src="${ROOT + tp.demo}" title="${esc(t("frame_title", { name: tp.name }))}" loading="lazy"></iframe></div>
</div>
<div class="g12 p-body">
  <div class="p-main">
    <section class="blk" aria-labelledby="h-ov"><h2 id="h-ov">${esc(t("overview"))}</h2><p>${esc(L(tp.long))}</p></section>
    <section class="blk" aria-labelledby="h-in"><h2 id="h-in">${esc(t("included"))}</h2><ol class="inc">${L(tp.sections).map(s => `<li>${esc(s)}</li>`).join("")}</ol></section>
    <section class="blk" aria-labelledby="h-ds"><h2 id="h-ds">${esc(t("design"))}</h2>
      <div class="ds">${tp.palette.map(c => `<div><i style="background:${c}"></i><code>${c}</code></div>`).join("")}</div>
      <p class="type-line">${esc(t("type_lbl"))}: <b>${esc(tp.fonts)}</b></p></section>
    <section class="blk" aria-labelledby="h-ft"><h2 id="h-ft">${esc(t("features"))}</h2><ul class="feat">${L(tp.features).map(f => `<li>${esc(f)}</li>`).join("")}</ul></section>
    <section class="blk" aria-labelledby="h-rs"><h2 id="h-rs">${esc(t("responsive"))}</h2>
      <div class="resp">${[["desktop", "desk"], ["tablet", "tab"], ["mobile", "mob"]].map(([i, k]) => `<div>${ICON[i]}<b>${esc(t(k))}</b>${esc(t(k + "_d"))}</div>`).join("")}</div></section>
    <section class="blk" aria-labelledby="h-tc"><h2 id="h-tc">${esc(t("tech"))}</h2><p class="techs">${tp.tech.map(x => `<span>${esc(x)}</span>`).join("")}</p></section>
    <section class="blk" aria-labelledby="h-cu"><h2 id="h-cu">${esc(t("custom"))}</h2><div class="custom"><p>${esc(t("custom_p"))}</p><ul><li>${esc(t("c1"))}</li><li>${esc(t("c2"))}</li><li>${esc(t("c3"))}</li><li>${esc(t("c4"))}</li></ul></div></section>
  </div>
  <aside class="p-side" aria-label="${esc(tp.name)}">
    <div class="side-card">
      <div class="price num">${money(tp.price)}<small>${esc(t("demo_price"))}</small></div>
      <button class="btn primary" type="button" data-order="${tp.id}">${esc(t("order_full"))}</button>
      <a class="btn" href="${ROOT + tp.demo}" target="_blank" rel="noopener">${esc(t("preview"))} ↗</a>
      <dl class="facts">
        <div><dt>${esc(t("f_cat"))}</dt><dd>${esc(cat)}</dd></div>
        <div><dt>${esc(t("f_ver"))}</dt><dd class="num">${esc(tp.version)}</dd></div>
        <div><dt>${esc(t("f_sec"))}</dt><dd class="num">${tp.sections.en.length}</dd></div>
        <div><dt>${esc(t("f_files"))}</dt><dd>${esc(t("f_files_v"))}</dd></div>
        <div><dt>${esc(t("f_backend"))}</dt><dd>${esc(t("no"))}</dd></div>
        <div><dt>${esc(t("f_custom"))}</dt><dd>${esc(t("yes"))}</dd></div>
      </dl>
      <p class="side-note">${esc(t("note"))}</p>
    </div>
  </aside>
</div>
<section class="related" aria-labelledby="h-rel"><h2 id="h-rel">${esc(t("related"))}</h2>
  <div class="rel">${TEMPLATES.filter(x => x.id !== tp.id).slice(0, 3).map(x => `<a href="${detailsUrl(x.id)}" style="${vars(x)}"><span class="mini"><img src="${ROOT + x.thumb}" alt="" width="640" height="400" loading="lazy"></span><b>${esc(x.name)}</b><span class="meta">${esc(catName(x.category))} · ${money(x.price)}</span></a>`).join("")}</div></section>`;
  }
  function initDetails() {
    $("#detail").addEventListener("click", e => {
      const b = e.target.closest("[data-device]"); if (!b) return;
      device = b.dataset.device; $("#viewport").className = "viewport " + device;
      $$("[data-device]").forEach(x => x.setAttribute("aria-pressed", x === b));
    });
  }

  /* ------------------------------------------------------------ order form */
  let dlg;
  function buildOrderDialog() {
    dlg = document.createElement("dialog");
    dlg.className = "order"; dlg.id = "order-dialog"; dlg.setAttribute("aria-labelledby", "o-title");
    dlg.innerHTML = `
<div class="dhead"><div><h2 id="o-title"></h2><p data-i18n="o_sub"></p></div><button type="button" class="xbtn" data-close data-i18n-aria="close">×</button></div>
<div class="dbody">
  <form id="order-form" novalidate>
    <p class="notice" data-i18n="o_demo"></p>
    <label><span><span data-i18n="f_name"></span> <span class="req" aria-hidden="true">*</span></span><input name="name" autocomplete="name" required maxlength="80"><small class="err" aria-live="polite"></small></label>
    <label><span><span data-i18n="f_email"></span> <span class="req" aria-hidden="true">*</span></span><input name="email" type="email" autocomplete="email" required maxlength="120"><small class="err" aria-live="polite"></small></label>
    <label><span><span data-i18n="f_wa"></span> <span class="req" aria-hidden="true">*</span></span><input name="whatsapp" type="tel" inputmode="tel" autocomplete="tel" required maxlength="22" aria-describedby="wa-hint"><small class="hint" id="wa-hint" data-i18n="f_wa_hint"></small><small class="err" aria-live="polite"></small></label>
    <label><span><span data-i18n="f_tpl"></span> <span class="req" aria-hidden="true">*</span></span><select name="template" required></select><small class="err" aria-live="polite"></small></label>
    <label><span><span data-i18n="f_req"></span> <span class="req" aria-hidden="true">*</span></span><textarea name="req" rows="4" required maxlength="1500" data-i18n-ph="f_req_ph"></textarea><small class="err" aria-live="polite"></small></label>
    <div class="drow"><button class="btn primary" type="submit" data-i18n="submit"></button><button class="btn" type="button" data-close data-i18n="cancel"></button></div>
  </form>
  <div class="confirm" id="order-ok" hidden tabindex="-1">
    <h3 data-i18n="ok_h"></h3><p data-i18n="ok_p"></p>
    <pre class="summary" id="order-summary"></pre>
    <div class="drow"><a class="btn primary" id="send-wa" target="_blank" rel="noopener" data-i18n="send_wa"></a><a class="btn" id="send-mail" data-i18n="send_mail"></a></div>
    <div class="drow" style="margin-top:10px"><button class="btn sm" type="button" id="copy-sum" data-i18n="copy"></button><button class="btn sm" type="button" id="edit-req" data-i18n="edit"></button><button class="btn sm" type="button" data-close data-i18n="close"></button></div>
  </div>
</div>`;
    document.body.appendChild(dlg);
    const form = $("#order-form", dlg);
    dlg.addEventListener("click", e => { if (e.target.closest("[data-close]") || e.target === dlg) closeOrder(); });
    dlg.addEventListener("close", () => { if (!$("#order-ok", dlg).hidden) form.reset(); showForm(); });
    form.addEventListener("submit", e => { e.preventDefault(); validateOrder(form); });
    form.addEventListener("input", e => { if (e.target.getAttribute("aria-invalid") === "true") fieldError(e.target, check(e.target)); });
    form.template.addEventListener("change", setDialogTitle);
    $("#edit-req", dlg).addEventListener("click", showForm);
    $("#copy-sum", dlg).addEventListener("click", copySummary);
    fillTemplateSelect();
  }
  function setDialogTitle() { const tp = byId($('select[name="template"]', dlg).value); $("#o-title", dlg).textContent = tp ? t("o_title", { name: tp.name }) : t("o_title_plain"); }
  function fillTemplateSelect() {
    const sel = $('select[name="template"]', dlg), cur = sel.value;
    sel.innerHTML = `<option value="">${esc(t("f_tpl_ph"))}</option>` + TEMPLATES.map(x => `<option value="${x.id}">${esc(x.name)} — ${esc(catName(x.category))} · ${money(x.price)} (${esc(t("demo_price"))})</option>`).join("");
    sel.value = cur; setDialogTitle();
  }
  function showForm() { $("#order-form", dlg).hidden = false; $("#order-ok", dlg).hidden = true; }
  function openOrder(id) {
    showForm();
    if (id && byId(id)) $('select[name="template"]', dlg).value = id;
    setDialogTitle();
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    $('input[name="name"]', dlg).focus();
  }
  function closeOrder() { if (typeof dlg.close === "function") dlg.close(); else { dlg.removeAttribute("open"); showForm(); } }
  function check(el) {
    const v = el.value.trim();
    if (!v) return el.name === "template" ? t("e_tpl") : t("e_req");
    if (el.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return t("e_email");
    if (el.name === "whatsapp" && !/^\+?\d{8,15}$/.test(v.replace(/[\s()-]/g, ""))) return t("e_wa");
    if (el.name === "req" && v.length < 10) return t("e_short");
    return "";
  }
  function fieldError(el, msg) { el.setAttribute("aria-invalid", msg ? "true" : "false"); const er = el.parentElement.querySelector(".err"); if (er) er.textContent = msg; }
  function validateOrder(form) {
    let first = null;
    $$("input,select,textarea", form).forEach(el => { const m = check(el); fieldError(el, m); if (m && !first) first = el; });
    if (first) { first.focus(); return; }
    const d = Object.fromEntries(new FormData(form)), tp = byId(d.template);
    const text =
      "Hello KHOKA TECH, I'd like to order a template.\n\n" +
      "Name: " + d.name.trim() + "\nEmail: " + d.email.trim() + "\nWhatsApp: " + d.whatsapp.trim() +
      "\nTemplate: " + (tp ? tp.name + " (" + CATS[tp.category].en + ", listed at " + money(tp.price) + " demo price)" : d.template) +
      "\nChanges needed: " + d.req.trim();
    $("#order-summary", dlg).textContent = text;
    $("#send-wa", dlg).href = window.KT_WA ? KT_WA(text) : "#";
    $("#send-mail", dlg).href = window.KT_MAIL ? KT_MAIL(t("mail_subj") + (tp ? ": " + tp.name : ""), text) : "#";
    form.hidden = true; const ok = $("#order-ok", dlg); ok.hidden = false; ok.focus();
  }
  function copySummary() {
    const node = $("#order-summary", dlg), text = node.textContent, done = () => toast(t("copied")), fail = () => toast(t("copy_fail"));
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fail);
    else { try { const r = document.createRange(); r.selectNodeContents(node); const s = getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand("copy") ? done() : fail(); } catch (e) { fail(); } }
  }

  /* ------------------------------------------------------------------ boot */
  function renderAll() {
    document.documentElement.lang = lang;
    applyI18n();
    const fc = $("#footer-cats");
    if (fc) fc.innerHTML = Object.keys(CATS).map(k => `<a href="./?cat=${k}" data-cat-link="${k}">${esc(catName(k))}</a>`).join("");
    if ($("#grid")) renderStore();
    if ($("#detail")) renderDetails();
    if (dlg) { applyI18n(dlg); fillTemplateSelect(); }
    if (window.KT_fillContact) KT_fillContact(lang);
  }
  function setLang(l) { lang = MT[l] ? l : "en"; try { localStorage.setItem("lang", lang); } catch (e) {} $("#lang").value = lang; renderAll(); }

  buildOrderDialog();
  if ($("#grid")) initStore();
  if ($("#detail")) initDetails();

  const burger = $("#burger"), menu = $("#menu");
  const closeMenu = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); };
  burger.addEventListener("click", () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
  menu.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { closeMenu(); burger.focus(); } });
  $("#lang").addEventListener("change", e => setLang(e.target.value));
  document.addEventListener("click", e => {
    const o = e.target.closest("[data-order]"); if (o) { openOrder(o.dataset.order); return; }
    const s = e.target.closest("[data-soon]"); if (s) { e.preventDefault(); toast(t("soon")); return; }
    const c = e.target.closest("[data-cat-link]");
    if (c && $("#grid")) { e.preventDefault(); state.cat = c.dataset.catLink; renderStore(); $("#main").scrollIntoView({ behavior: "smooth" }); }
  });
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  setLang(lang);
  const params = new URLSearchParams(location.search);
  if ($("#detail") && params.get("order") === "1" && byId(params.get("id"))) openOrder(params.get("id"));
})();
