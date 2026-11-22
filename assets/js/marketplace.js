/* KHOKA TEMPLATES — marketplace.js
   One script for the three public template pages:
     templates/index.html    → store (search, categories, sort)
     templates/details.html  → product page (live preview, specs)
     templates/order.html    → order page (validation, order reference, WhatsApp hand-off)
   Requires contact.js (central config) and templates-data.js.
   Language is shared with the homepage via localStorage "lang".
   The order page stores NOTHING: it builds a message that the customer sends from their own WhatsApp. */
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
      overview: "Overview", included: "What's included", features: "Details worth knowing", design: "Design system", type_lbl: "Typefaces",
      responsive: "Responsive behaviour", desk: "Desktop", tab: "Tablet", mob: "Mobile",
      desk_d: "Full layout from 1024px up.", tab_d: "Reflowed grids and navigation.", mob_d: "Single column, touch-sized controls.",
      tech: "Built with", custom: "Customisation", custom_p: "Available. KHOKA TECH can adapt this template to your business:",
      c1: "Your logo, colours and typefaces", c2: "Your own text, photos and sections", c3: "Extra pages or features, quoted separately", c4: "Help publishing on free hosting such as GitHub Pages",
      f_cat: "Category", f_ver: "Version", f_sec: "Sections", f_files: "Files", f_files_v: "HTML, CSS, JS", f_backend: "Backend needed", no: "No", f_custom: "Customisation", yes: "Available",
      related: "Other templates", nf_h: "We couldn't find that template", nf_p: "The link may be out of date. All six templates are listed in the store.", back: "Go to the store",
      dev_desktop: "Desktop", dev_tablet: "Tablet", dev_mobile: "Mobile", open_new: "Open in new tab", frame_title: "Live demo of {name}",
      fd: "Websites, AI tools and digital products for growing businesses.", fq: "Studio", fcat: "Categories", fc: "Contact", credit: "Designed and developed by KHOKA TECH.",
      f_cta: "Need something these templates don't cover?", copied: "Copied.", copy_fail: "Couldn't copy — please select the text manually.",
      t_market: "Website Templates — KHOKA TEMPLATES by KHOKA TECH", t_detail: "{name} — {cat} website template | KHOKA TEMPLATES", t_order: "Order {name} | KHOKA TEMPLATES", t_order_plain: "Order a template | KHOKA TEMPLATES",
      /* order page */
      o_crumb: "Order", o_h1: "Order a website template", o_lede: "Tell us who you are and what you need. Your request is sent to KHOKA TECH through your own WhatsApp — nothing is stored on this website.",
      o_s1: "Your details", o_s2: "Template", o_s3: "Your project",
      f_name: "Full name", f_email: "Email", f_wa: "WhatsApp number", f_wa_hint: "Include the country code, e.g. +880 1712 345678", f_biz: "Business name", f_biz_hint: "Leave empty if this is a personal website.",
      f_tpl: "Selected template", f_tpl_ph: "Choose a template", f_req: "Customisation requirements", f_req_ph: "Colours, logo, pages, content you will provide, features, deadline…",
      f_note: "Additional message", f_note_ph: "Anything else we should know?", optional: "optional", required: "required",
      o_submit: "Prepare WhatsApp message", o_privacy: "We only use these details to reply to your request. No payment is taken on this website.",
      e_req: "This field is required.", e_email: "Enter a valid email address.", e_wa: "Enter a valid WhatsApp number (8–15 digits, + optional).", e_short: "Please describe your requirements in at least 15 characters.", e_tpl: "Please choose a template.",
      e_sum: "Please fix the highlighted fields.",
      sum_t: "Your selection", sum_change: "Change template", sum_none: "No template selected yet.", sum_price_note: "Demo price shown for reference. The final quote depends on your customisation and is confirmed with you before any work or payment.",
      next_t: "What happens next", next1: "You send the prepared message on WhatsApp.", next2: "We reply, usually the same day, to discuss details.", next3: "You receive a final quote and timeline to approve.",
      r_kicker: "Step 2 of 2", r_h: "Your request is ready — it has not been sent yet", r_p: "Open WhatsApp and press <b>Send</b> to complete your request. Until you send it, KHOKA TECH has not received anything.",
      r_ref: "Your order reference", r_ref_hint: "Mention it if you contact us again.", r_preview: "Message preview",
      r_open: "Open WhatsApp", r_copy: "Copy message", r_edit: "Edit details", r_mail: "Send by email instead",
      r_after: "WhatsApp should now be open with your message. Press <b>Send</b> there. If it didn't open, copy the message and send it to {phone}.",
      r_nowa: "No WhatsApp? Email the same message to {email}."
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
      overview: "সংক্ষেপে", included: "যা যা আছে", features: "জানার মতো বিষয়", design: "ডিজাইন সিস্টেম", type_lbl: "টাইপফেস",
      responsive: "রেসপন্সিভ আচরণ", desk: "ডেস্কটপ", tab: "ট্যাবলেট", mob: "মোবাইল",
      desk_d: "১০২৪px থেকে পূর্ণ লেআউট।", tab_d: "গ্রিড ও নেভিগেশন নতুনভাবে সাজানো।", mob_d: "এক কলাম, আঙুলে চাপার উপযোগী বোতাম।",
      tech: "যা দিয়ে তৈরি", custom: "কাস্টমাইজেশন", custom_p: "উপলব্ধ। খোকা টেক এই টেমপ্লেট আপনার ব্যবসার মতো করে সাজাতে পারে:",
      c1: "আপনার লোগো, রং ও টাইপফেস", c2: "আপনার নিজের লেখা, ছবি ও সেকশন", c3: "অতিরিক্ত পেজ বা ফিচার, আলাদা মূল্যে", c4: "GitHub Pages-এর মতো ফ্রি হোস্টিংয়ে প্রকাশে সহায়তা",
      f_cat: "ক্যাটাগরি", f_ver: "ভার্সন", f_sec: "সেকশন", f_files: "ফাইল", f_files_v: "HTML, CSS, JS", f_backend: "ব্যাকএন্ড প্রয়োজন", no: "না", f_custom: "কাস্টমাইজেশন", yes: "উপলব্ধ",
      related: "অন্যান্য টেমপ্লেট", nf_h: "টেমপ্লেটটি খুঁজে পাওয়া যায়নি", nf_p: "লিংকটি হয়তো পুরোনো। ছয়টি টেমপ্লেটই স্টোরে আছে।", back: "স্টোরে যান",
      dev_desktop: "ডেস্কটপ", dev_tablet: "ট্যাবলেট", dev_mobile: "মোবাইল", open_new: "নতুন ট্যাবে খুলুন", frame_title: "{name}-এর লাইভ ডেমো",
      fd: "বাড়ন্ত ব্যবসার জন্য ওয়েবসাইট, এআই টুল ও ডিজিটাল পণ্য।", fq: "স্টুডিও", fcat: "ক্যাটাগরি", fc: "যোগাযোগ", credit: "ডিজাইন ও ডেভেলপমেন্ট: খোকা টেক।",
      f_cta: "এই টেমপ্লেটগুলোতে যা নেই, তেমন কিছু দরকার?", copied: "কপি হয়েছে।", copy_fail: "কপি হয়নি — লেখাটি নিজে সিলেক্ট করুন।",
      t_market: "ওয়েবসাইট টেমপ্লেট — খোকা টেক", t_detail: "{name} — {cat} টেমপ্লেট | খোকা টেমপ্লেটস", t_order: "{name} অর্ডার | খোকা টেমপ্লেটস", t_order_plain: "টেমপ্লেট অর্ডার | খোকা টেমপ্লেটস",
      o_crumb: "অর্ডার", o_h1: "ওয়েবসাইট টেমপ্লেট অর্ডার করুন", o_lede: "আপনি কে এবং কী দরকার জানান। অনুরোধটি আপনার নিজের হোয়াটসঅ্যাপ থেকে খোকা টেকের কাছে যাবে — এই ওয়েবসাইটে কিছুই সংরক্ষণ হয় না।",
      o_s1: "আপনার তথ্য", o_s2: "টেমপ্লেট", o_s3: "আপনার প্রজেক্ট",
      f_name: "পূর্ণ নাম", f_email: "ইমেইল", f_wa: "হোয়াটসঅ্যাপ নম্বর", f_wa_hint: "কান্ট্রি কোডসহ লিখুন, যেমন +880 1712 345678", f_biz: "ব্যবসার নাম", f_biz_hint: "ব্যক্তিগত ওয়েবসাইট হলে খালি রাখুন।",
      f_tpl: "নির্বাচিত টেমপ্লেট", f_tpl_ph: "একটি টেমপ্লেট বেছে নিন", f_req: "কাস্টমাইজেশনের চাহিদা", f_req_ph: "রং, লোগো, পেজ, আপনি যে কনটেন্ট দেবেন, ফিচার, সময়সীমা…",
      f_note: "অতিরিক্ত বার্তা", f_note_ph: "আর কিছু জানানোর আছে?", optional: "ঐচ্ছিক", required: "আবশ্যক",
      o_submit: "হোয়াটসঅ্যাপ বার্তা তৈরি করুন", o_privacy: "এই তথ্য শুধু আপনার অনুরোধের উত্তর দিতে ব্যবহার হবে। এই ওয়েবসাইটে কোনো পেমেন্ট নেওয়া হয় না।",
      e_req: "এই ঘরটি পূরণ করা আবশ্যক।", e_email: "সঠিক ইমেইল ঠিকানা দিন।", e_wa: "সঠিক হোয়াটসঅ্যাপ নম্বর দিন (৮–১৫ অঙ্ক, + ঐচ্ছিক)।", e_short: "অন্তত ১৫ অক্ষরে আপনার চাহিদা লিখুন।", e_tpl: "একটি টেমপ্লেট বেছে নিন।",
      e_sum: "চিহ্নিত ঘরগুলো ঠিক করুন।",
      sum_t: "আপনার নির্বাচন", sum_change: "টেমপ্লেট বদলান", sum_none: "এখনও কোনো টেমপ্লেট বাছা হয়নি।", sum_price_note: "রেফারেন্সের জন্য ডেমো মূল্য দেখানো হয়েছে। চূড়ান্ত মূল্য আপনার কাস্টমাইজেশনের ওপর নির্ভর করে এবং কাজ বা পেমেন্টের আগে আপনার সাথে নিশ্চিত করা হয়।",
      next_t: "এরপর যা হবে", next1: "তৈরি বার্তাটি আপনি হোয়াটসঅ্যাপে পাঠাবেন।", next2: "আমরা সাধারণত একই দিনে উত্তর দিয়ে বিস্তারিত আলোচনা করি।", next3: "অনুমোদনের জন্য চূড়ান্ত মূল্য ও সময়সূচি পাবেন।",
      r_kicker: "ধাপ ২ / ২", r_h: "আপনার অনুরোধ তৈরি — এখনও পাঠানো হয়নি", r_p: "হোয়াটসঅ্যাপ খুলে <b>Send</b> চাপলে অনুরোধ সম্পন্ন হবে। না পাঠানো পর্যন্ত খোকা টেক কিছুই পায়নি।",
      r_ref: "আপনার অর্ডার রেফারেন্স", r_ref_hint: "আবার যোগাযোগ করলে এটি উল্লেখ করুন।", r_preview: "বার্তার প্রিভিউ",
      r_open: "হোয়াটসঅ্যাপ খুলুন", r_copy: "বার্তা কপি করুন", r_edit: "তথ্য সম্পাদনা", r_mail: "বরং ইমেইলে পাঠান",
      r_after: "আপনার বার্তাসহ হোয়াটসঅ্যাপ খোলার কথা। সেখানে <b>Send</b> চাপুন। না খুললে বার্তাটি কপি করে {phone} নম্বরে পাঠান।",
      r_nowa: "হোয়াটসঅ্যাপ নেই? একই বার্তা {email} ঠিকানায় ইমেইল করুন।"
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
      overview: "परिचय", included: "क्या शामिल है", features: "जानने योग्य बातें", design: "डिज़ाइन सिस्टम", type_lbl: "टाइपफ़ेस",
      responsive: "रिस्पॉन्सिव व्यवहार", desk: "डेस्कटॉप", tab: "टैबलेट", mob: "मोबाइल",
      desk_d: "1024px से पूरा लेआउट।", tab_d: "ग्रिड और नेविगेशन नए सिरे से।", mob_d: "एक कॉलम, टच के अनुकूल बटन।",
      tech: "किससे बना", custom: "कस्टमाइज़ेशन", custom_p: "उपलब्ध। खोका टेक इस टेम्पलेट को आपके व्यवसाय के अनुसार ढाल सकता है:",
      c1: "आपका लोगो, रंग और टाइपफ़ेस", c2: "आपका अपना टेक्स्ट, फ़ोटो और सेक्शन", c3: "अतिरिक्त पेज या फ़ीचर, अलग कोटेशन पर", c4: "GitHub Pages जैसी मुफ़्त होस्टिंग पर प्रकाशन में मदद",
      f_cat: "कैटेगरी", f_ver: "वर्ज़न", f_sec: "सेक्शन", f_files: "फ़ाइलें", f_files_v: "HTML, CSS, JS", f_backend: "बैकएंड ज़रूरी", no: "नहीं", f_custom: "कस्टमाइज़ेशन", yes: "उपलब्ध",
      related: "अन्य टेम्पलेट", nf_h: "वह टेम्पलेट नहीं मिला", nf_p: "लिंक पुराना हो सकता है। सभी छह टेम्पलेट स्टोर में हैं।", back: "स्टोर पर जाएँ",
      dev_desktop: "डेस्कटॉप", dev_tablet: "टैबलेट", dev_mobile: "मोबाइल", open_new: "नए टैब में खोलें", frame_title: "{name} का लाइव डेमो",
      fd: "बढ़ते व्यवसायों के लिए वेबसाइट, एआई टूल और डिजिटल उत्पाद।", fq: "स्टूडियो", fcat: "कैटेगरी", fc: "संपर्क", credit: "डिज़ाइन व डेवलपमेंट: खोका टेक।",
      f_cta: "कुछ ऐसा चाहिए जो इन टेम्पलेट में नहीं है?", copied: "कॉपी हो गया।", copy_fail: "कॉपी नहीं हुआ — कृपया टेक्स्ट स्वयं चुनें।",
      t_market: "वेबसाइट टेम्पलेट — खोका टेक", t_detail: "{name} — {cat} टेम्पलेट | खोका टेम्पलेट्स", t_order: "{name} ऑर्डर | खोका टेम्पलेट्स", t_order_plain: "टेम्पलेट ऑर्डर | खोका टेम्पलेट्स",
      o_crumb: "ऑर्डर", o_h1: "वेबसाइट टेम्पलेट ऑर्डर करें", o_lede: "बताइए आप कौन हैं और आपको क्या चाहिए। आपका अनुरोध आपके अपने व्हाट्सऐप से खोका टेक को जाता है — इस वेबसाइट पर कुछ भी सेव नहीं होता।",
      o_s1: "आपकी जानकारी", o_s2: "टेम्पलेट", o_s3: "आपका प्रोजेक्ट",
      f_name: "पूरा नाम", f_email: "ईमेल", f_wa: "व्हाट्सऐप नंबर", f_wa_hint: "कंट्री कोड सहित लिखें, जैसे +91 98765 43210", f_biz: "व्यवसाय का नाम", f_biz_hint: "निजी वेबसाइट हो तो खाली छोड़ें।",
      f_tpl: "चुना गया टेम्पलेट", f_tpl_ph: "एक टेम्पलेट चुनें", f_req: "कस्टमाइज़ेशन आवश्यकताएँ", f_req_ph: "रंग, लोगो, पेज, आप जो सामग्री देंगे, फ़ीचर, समय-सीमा…",
      f_note: "अतिरिक्त संदेश", f_note_ph: "कुछ और बताना चाहेंगे?", optional: "वैकल्पिक", required: "आवश्यक",
      o_submit: "व्हाट्सऐप संदेश तैयार करें", o_privacy: "इन जानकारियों का उपयोग केवल आपके अनुरोध का जवाब देने के लिए होगा। इस वेबसाइट पर कोई भुगतान नहीं लिया जाता।",
      e_req: "यह फ़ील्ड आवश्यक है।", e_email: "सही ईमेल पता दर्ज करें।", e_wa: "सही व्हाट्सऐप नंबर दर्ज करें (8–15 अंक, + वैकल्पिक)।", e_short: "कृपया कम से कम 15 अक्षरों में अपनी आवश्यकताएँ लिखें।", e_tpl: "कृपया एक टेम्पलेट चुनें।",
      e_sum: "कृपया चिह्नित फ़ील्ड ठीक करें।",
      sum_t: "आपका चुनाव", sum_change: "टेम्पलेट बदलें", sum_none: "अभी कोई टेम्पलेट नहीं चुना गया।", sum_price_note: "संदर्भ के लिए डेमो मूल्य दिखाया गया है। अंतिम कोटेशन आपके कस्टमाइज़ेशन पर निर्भर है और किसी भी काम या भुगतान से पहले आपसे तय किया जाता है।",
      next_t: "आगे क्या होगा", next1: "आप तैयार संदेश व्हाट्सऐप पर भेजते हैं।", next2: "हम आमतौर पर उसी दिन जवाब देकर विवरण पर बात करते हैं।", next3: "आपको मंज़ूरी के लिए अंतिम कोटेशन और समय-सीमा मिलती है।",
      r_kicker: "चरण 2 / 2", r_h: "आपका अनुरोध तैयार है — अभी भेजा नहीं गया", r_p: "व्हाट्सऐप खोलकर <b>Send</b> दबाएँ, तभी अनुरोध पूरा होगा। भेजने से पहले खोका टेक को कुछ नहीं मिला है।",
      r_ref: "आपका ऑर्डर रेफ़रेंस", r_ref_hint: "दोबारा संपर्क करें तो इसका उल्लेख करें।", r_preview: "संदेश का प्रीव्यू",
      r_open: "व्हाट्सऐप खोलें", r_copy: "संदेश कॉपी करें", r_edit: "जानकारी बदलें", r_mail: "इसके बजाय ईमेल से भेजें",
      r_after: "व्हाट्सऐप आपके संदेश के साथ खुल जाना चाहिए। वहाँ <b>Send</b> दबाएँ। न खुले तो संदेश कॉपी करके {phone} पर भेजें।",
      r_nowa: "व्हाट्सऐप नहीं है? यही संदेश {email} पर ईमेल करें।"
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
  const orderUrl = id => "order.html?id=" + encodeURIComponent(id);
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
  function copyText(text, node) {
    const done = () => toast(t("copied")), fail = () => toast(t("copy_fail"));
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fail);
    else { try { const r = document.createRange(); r.selectNodeContents(node); const s = getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand("copy") ? done() : fail(); } catch (e) { fail(); } }
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
      <a class="btn primary sm" href="${orderUrl(tp.id)}">${esc(t("order"))}</a>
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
    try { history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : "")); } catch (e) { /* file:// */ }
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
  <div class="buy"><div class="price num">${money(tp.price)}<small>${esc(t("demo_price"))}</small></div><a class="btn primary" href="${orderUrl(tp.id)}">${esc(t("order_full"))}</a></div>
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
      <a class="btn primary" href="${orderUrl(tp.id)}">${esc(t("order_full"))}</a>
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

  /* ------------------------------------------------------------- order page
     Flow: validate → generate reference → build message → customer opens WhatsApp and presses Send.
     Nothing is stored or transmitted by this page. */
  let orderRef = null, orderText = "";
  const REF_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; // no 0/O/1/I/L to avoid misreading

  function makeRef() {
    const d = new Date(), pad = n => String(n).padStart(2, "0");
    const bytes = new Uint8Array(4);
    (window.crypto || window.msCrypto).getRandomValues(bytes);
    const rand = [...bytes].map(b => REF_ALPHABET[b % REF_ALPHABET.length]).join("");
    return ((window.KT_ORDER && KT_ORDER.refPrefix) || "KT") + "-" + String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate()) + "-" + rand;
  }

  function fillOrderSelect() {
    const sel = $("#o-template"), cur = sel.value;
    sel.innerHTML = `<option value="">${esc(t("f_tpl_ph"))}</option>` + TEMPLATES.map(x => `<option value="${x.id}">${esc(x.name)} — ${esc(catName(x.category))} · ${money(x.price)}</option>`).join("");
    sel.value = cur;
  }

  function renderOrderSummary() {
    const tp = byId($("#o-template").value), box = $("#o-summary");
    document.title = tp ? t("t_order", { name: tp.name }) : t("t_order_plain");
    if (!tp) { box.innerHTML = `<p class="meta">${esc(t("sum_none"))}</p><a class="link" href="./" style="display:inline-block;margin-top:12px">${esc(t("all"))} →</a>`; return; }
    box.innerHTML = `
      <a class="mini" href="${detailsUrl(tp.id)}" style="${vars(tp)}"><img src="${ROOT + tp.thumb}" alt="${esc(tp.name)}" width="640" height="400"></a>
      <div class="os-row"><div><span class="pcat" style="${vars(tp)}">${esc(catName(tp.category))}</span><b>${esc(tp.name)}</b></div><div class="price num">${money(tp.price)}<small>${esc(t("demo_price"))}</small></div></div>
      <p class="os-note">${esc(t("sum_price_note"))}</p>
      <div class="os-links"><a class="link" href="${ROOT + tp.demo}" target="_blank" rel="noopener">${esc(t("preview"))} ↗</a><a class="link" href="./">${esc(t("sum_change"))}</a></div>`;
  }

  function oCheck(el) {
    const v = el.value.trim();
    if (el.required && !v) return el.name === "template" ? t("e_tpl") : t("e_req");
    if (!v) return "";
    if (el.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return t("e_email");
    if (el.name === "whatsapp" && !/^\+?\d{8,15}$/.test(v.replace(/[\s()-]/g, ""))) return t("e_wa");
    if (el.name === "req" && v.length < 15) return t("e_short");
    return "";
  }
  function oMark(el, msg) { el.setAttribute("aria-invalid", msg ? "true" : "false"); const er = el.closest("label").querySelector(".err"); if (er) er.textContent = msg; }

  function buildOrderMessage(d, tp) {
    // Labels stay in English so the admin dashboard can read pasted messages reliably.
    return [
      "*New template order request*",
      "Ref: " + orderRef,
      "Template: " + tp.name + " (" + tp.id + ")",
      "Listed demo price: " + money(tp.price),
      "",
      "Name: " + d.name,
      "Business: " + (d.business || "-"),
      "Email: " + d.email,
      "WhatsApp: " + d.whatsapp,
      "",
      "Customisation requirements:",
      d.req,
      "",
      "Additional message:",
      d.note || "-",
      "",
      "Sent from the KHOKA TECH website order page."
    ].join("\n");
  }

  function showOrderStep(step) {
    $("#o-form").hidden = step !== 1;
    $("#o-ready").hidden = step !== 2;
    $("#o-step1").classList.toggle("on", step === 1);
    $("#o-step2").classList.toggle("on", step === 2);
    if (step === 2) $("#o-ready").focus(); else $("#o-name").focus();
    window.scrollTo({ top: $("#main").offsetTop - 80, behavior: "smooth" });
  }

  function initOrder() {
    const form = $("#o-form");
    fillOrderSelect();
    const id = new URLSearchParams(location.search).get("id");
    if (byId(id)) $("#o-template").value = id;
    renderOrderSummary();
    $("#o-template").addEventListener("change", () => { renderOrderSummary(); orderRef = null; });
    form.addEventListener("input", e => { if (e.target.getAttribute("aria-invalid") === "true") oMark(e.target, oCheck(e.target)); });
    form.addEventListener("submit", e => {
      e.preventDefault();
      let first = null;
      $$("input,select,textarea", form).forEach(el => { const m = oCheck(el); oMark(el, m); if (m && !first) first = el; });
      $("#o-err").textContent = first ? t("e_sum") : "";
      if (first) { first.focus(); return; }
      const d = {}; ["name", "email", "whatsapp", "business", "template", "req", "note"].forEach(k => { d[k] = form.elements[k].value.trim(); });
      const tp = byId(d.template);
      if (!orderRef) orderRef = makeRef();
      orderText = buildOrderMessage(d, tp);
      $("#o-ref").textContent = orderRef;
      $("#o-msg").textContent = orderText;
      $("#o-open").href = KT_WA(orderText);
      $("#o-mail").href = KT_MAIL("Template order " + orderRef + " — " + tp.name, orderText);
      $("#o-after").hidden = true;
      renderOrderNotes();
      showOrderStep(2);
    });
    $("#o-open").addEventListener("click", () => { $("#o-after").hidden = false; });
    $("#o-copy").addEventListener("click", () => copyText(orderText, $("#o-msg")));
    $("#o-edit").addEventListener("click", () => showOrderStep(1));
  }
  function renderOrderNotes() {
    if (!$("#o-after")) return;
    $("#o-after").innerHTML = t("r_after", { phone: esc(KT_CONTACT.phone) });
    $("#o-nowa").innerHTML = t("r_nowa", { email: `<a class="link" href="mailto:${esc(KT_CONTACT.email)}">${esc(KT_CONTACT.email)}</a>` });
  }

  /* ------------------------------------------------------------------ boot */
  function renderAll() {
    document.documentElement.lang = lang;
    applyI18n();
    const fc = $("#footer-cats");
    if (fc) fc.innerHTML = Object.keys(CATS).map(k => `<a href="./?cat=${k}" data-cat-link="${k}">${esc(catName(k))}</a>`).join("");
    if ($("#grid")) renderStore();
    if ($("#detail")) renderDetails();
    if ($("#o-form")) { fillOrderSelect(); renderOrderSummary(); renderOrderNotes(); }
    if (window.KT_fillContact) KT_fillContact(lang);
  }
  function setLang(l) { lang = MT[l] ? l : "en"; try { localStorage.setItem("lang", lang); } catch (e) {} $("#lang").value = lang; renderAll(); }

  // Old links (details.html?id=…&order=1) now go to the order page.
  const params = new URLSearchParams(location.search);
  if ($("#detail") && params.get("order") === "1" && byId(params.get("id"))) { location.replace(orderUrl(params.get("id"))); return; }

  if ($("#grid")) initStore();
  if ($("#detail")) initDetails();
  if ($("#o-form")) initOrder();

  const burger = $("#burger"), menu = $("#menu");
  const closeMenu = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); };
  burger.addEventListener("click", () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
  menu.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { closeMenu(); burger.focus(); } });
  $("#lang").addEventListener("change", e => setLang(e.target.value));
  document.addEventListener("click", e => {
    const c = e.target.closest("[data-cat-link]");
    if (c && $("#grid")) { e.preventDefault(); state.cat = c.dataset.catLink; renderStore(); $("#main").scrollIntoView({ behavior: "smooth" }); }
  });
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  setLang(lang);
})();
