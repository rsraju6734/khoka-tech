/* KHOKA TECH — main.js (homepage)
   - TEXT: all homepage copy in English, Bangla and Hindi. Keys ending in "html" are set with innerHTML (trusted, static).
   - PROJECTS: the smaller rows in the Work section. The featured live project (ShikboLab) is in index.html, #work.
   - Template rows come from assets/js/templates-data.js (shared with the marketplace). */
const TEXT = {
 en:{
  skip:"Skip to content",services:"Services",templates:"Templates",portfolio:"Work",about:"About",contact:"Contact",cta:"Start a project",
  h_tag:"Digital studio",
  h1:"We design and build the websites and software <em>your business runs on.</em>",
  hd:"Company websites, online shops, AI assistants and custom tools — planned with you, built by hand and looked after once they are live.",
  b1:"Start a project",b2:"Browse templates",h_cap:"From our template catalogue:",
  st:"What we can build for you",ss:"Four kinds of work, one team. Most projects combine two or more — a website with a booking tool, or a shop with an AI assistant.",
  s1:"Web development",s1d:"Fast, accessible websites that explain what you do and make it easy to get in touch or buy. Written in clean HTML, CSS and JavaScript, so they are cheap to host and easy to change.",
  s1a:"Company websites",s1b:"Online shops",s1c:"Landing pages",
  s2:"AI solutions",s2d:"Practical AI that saves real hours: assistants that answer customer questions from your own information, and automations for the repetitive parts of your week.",
  s2a:"Customer-support assistants",s2b:"Document and data automation",s2c:"Internal knowledge tools",
  s3:"Digital products",s3d:"Ready-made website templates and tools you can launch quickly and customise later. Each one comes with a live demo you can try before ordering.",
  s3a:"Website templates",s3b:"UI kits",s3c:"Starter projects",
  s4:"Custom software",s4d:"When off-the-shelf software doesn't fit, we build tools around the way your team already works — bookings, inventory, dashboards or client portals.",
  s4a:"Dashboards",s4b:"Booking and inventory tools",s4c:"Client portals",
  tt:"Start from a finished design",ts:"Six website templates, each with its own design system and a working live demo. Prices shown are demo prices.",
  all:"Browse all templates",price:"Demo price",det:"Details",prev:"Live demo",ord:"Order",
  pt:"Selected work",ps:"A live project first, followed by work in progress.",
  sl_kind:"Live · Education platform",sl_desc:"A free science learning website in Bangla for school students. Simple notes, animated labs students can play with, games and quizzes — all in one place, with no sign-up.",
  sl_f1:"subjects",sl_f2:"chapters",sl_f3:"bonus labs",sl_f4:"free",sl_stack:"Our role: design and development · Hosted on Netlify",sl_visit:"Visit ShikboLab",
  pk1:"Education platform",pk2:"AI assistant",pk3:"Website template",
  p1:"A learning platform with course pages, lesson tracking and a Bangla-first interface.",p2:"A chatbot that answers product, stock and delivery questions for small online shops.",p3:"A corporate site for advisory firms — now available as a template.",
  st_dev:"In development",st_con:"Concept",st_live:"Live demo",view_demo:"View demo",
  ad:"KHOKA TECH is a small digital studio. <span>We focus on websites, AI tools and digital products — and on explaining each decision in plain language.</span>",
  ad2:"We would rather build one thing properly than five things quickly. That means agreeing on scope before we start, showing work early, and handing over sites you can actually maintain.",
  ht:"How a project runs",
  h1t:"Conversation",h1d:" — we learn what you need and agree a written scope and price.",
  h2t:"Design",h2d:" — you see real layouts early and give feedback before anything is built.",
  h3t:"Build",h3d:" — we develop, test on phones and computers, and walk you through it.",
  h4t:"Launch & support",h4d:" — we publish the site and stay available for changes.",
  wt:"What you can expect",w1:"Considered, modern design",w2:"Works well on every screen",w3:"Clear, fair pricing",w4:"Direct contact with the people building it",w5:"Code that can grow with you",
  ct:"Tell us what you are planning",cs:"A few sentences are enough to start. We'll reply with questions or a first suggestion.",
  c_email:"Email",c_wa:"WhatsApp",c_loc:"Location",c_hours:"Availability",c_lang:"Languages",wa_btn:"Chat on WhatsApp",
  demonote:"This form doesn't send anything by itself. After checking it, you choose to send your message through WhatsApp or your own email app.",
  ready:"Your message is ready. How would you like to send it?",send_wa:"Send on WhatsApp",send_mail:"Send by email",mail_subj:"Project enquiry from the KHOKA TECH website",
  m_hello:"Hello KHOKA TECH,",m_name:"Name",m_email:"Email",m_type:"Project type",
  fn:"Name",fe:"Email",fp:"Project type",fm:"Message",sub_btn:"Send message",tpl_opt:"Template customisation",
  e1:"This field is required.",e2:"Enter a valid email address.",ok:"Demo mode: the form is valid, but no message was sent.",
  f_cta:"Have something in mind? Let's talk it through.",fd:"Websites, AI tools and digital products for growing businesses.",fq:"Studio",fsv:"Services",fc:"Contact",
  credit:"Designed and developed by KHOKA TECH.",soon:"Social links are placeholders — add yours in index.html.",
  title:"KHOKA TECH — Websites, AI tools and digital products"},
 bn:{
  skip:"মূল কনটেন্টে যান",services:"সেবা",templates:"টেমপ্লেট",portfolio:"কাজ",about:"পরিচিতি",contact:"যোগাযোগ",cta:"প্রজেক্ট শুরু করুন",
  h_tag:"ডিজিটাল স্টুডিও",
  h1:"আপনার ব্যবসা যে ওয়েবসাইট ও সফটওয়্যারে চলে, <em>আমরা তা ডিজাইন করি ও তৈরি করি।</em>",
  hd:"কোম্পানির ওয়েবসাইট, অনলাইন শপ, এআই অ্যাসিস্ট্যান্ট ও কাস্টম টুল — আপনার সাথে পরিকল্পনা করে, যত্ন নিয়ে তৈরি, আর চালু হওয়ার পরও দেখভাল।",
  b1:"প্রজেক্ট শুরু করুন",b2:"টেমপ্লেট দেখুন",h_cap:"আমাদের টেমপ্লেট সংগ্রহ থেকে:",
  st:"আমরা আপনার জন্য যা তৈরি করতে পারি",ss:"চার ধরনের কাজ, একটি দল। বেশিরভাগ প্রজেক্টে দুই বা ততোধিক মিলে যায় — যেমন বুকিং টুলসহ ওয়েবসাইট, বা এআই অ্যাসিস্ট্যান্টসহ শপ।",
  s1:"ওয়েব ডেভেলপমেন্ট",s1d:"দ্রুত ও সহজে ব্যবহারযোগ্য ওয়েবসাইট, যা আপনার কাজ পরিষ্কারভাবে বোঝায় এবং যোগাযোগ বা কেনাকাটা সহজ করে। পরিষ্কার HTML, CSS ও JavaScript-এ লেখা, তাই হোস্টিং সস্তা ও পরিবর্তন সহজ।",
  s1a:"কোম্পানির ওয়েবসাইট",s1b:"অনলাইন শপ",s1c:"ল্যান্ডিং পেজ",
  s2:"এআই সমাধান",s2d:"বাস্তবে সময় বাঁচানো এআই: আপনার নিজের তথ্য থেকে গ্রাহকের প্রশ্নের উত্তর দেওয়া অ্যাসিস্ট্যান্ট, আর সপ্তাহের একঘেয়ে কাজের অটোমেশন।",
  s2a:"গ্রাহক সহায়তা অ্যাসিস্ট্যান্ট",s2b:"ডকুমেন্ট ও ডেটা অটোমেশন",s2c:"অভ্যন্তরীণ জ্ঞানভান্ডার টুল",
  s3:"ডিজিটাল পণ্য",s3d:"দ্রুত চালু করে পরে কাস্টমাইজ করা যায় এমন তৈরি ওয়েবসাইট টেমপ্লেট ও টুল। অর্ডারের আগে প্রতিটির লাইভ ডেমো চালিয়ে দেখতে পারবেন।",
  s3a:"ওয়েবসাইট টেমপ্লেট",s3b:"ইউআই কিট",s3c:"স্টার্টার প্রজেক্ট",
  s4:"কাস্টম সফটওয়্যার",s4d:"তৈরি সফটওয়্যার না মিললে, আপনার দলের কাজের ধরন অনুযায়ী টুল বানাই — বুকিং, ইনভেন্টরি, ড্যাশবোর্ড বা ক্লায়েন্ট পোর্টাল।",
  s4a:"ড্যাশবোর্ড",s4b:"বুকিং ও ইনভেন্টরি টুল",s4c:"ক্লায়েন্ট পোর্টাল",
  tt:"তৈরি ডিজাইন থেকে শুরু করুন",ts:"ছয়টি ওয়েবসাইট টেমপ্লেট, প্রতিটির নিজস্ব ডিজাইন সিস্টেম ও কার্যকর লাইভ ডেমো। দেখানো মূল্য ডেমো মূল্য।",
  all:"সব টেমপ্লেট দেখুন",price:"ডেমো মূল্য",det:"বিস্তারিত",prev:"লাইভ ডেমো",ord:"অর্ডার",
  pt:"নির্বাচিত কাজ",ps:"প্রথমে একটি চালু প্রজেক্ট, তারপর চলমান কাজ।",
  sl_kind:"চালু · শিক্ষা প্ল্যাটফর্ম",sl_desc:"স্কুল শিক্ষার্থীদের জন্য বাংলায় বিনামূল্যে বিজ্ঞান শেখার ওয়েবসাইট। সহজ নোট, হাতে-কলমে চালানো যায় এমন অ্যানিমেটেড ল্যাব, গেম আর কুইজ — সব এক জায়গায়, কোনো রেজিস্ট্রেশন ছাড়াই।",
  sl_f1:"বিষয়",sl_f2:"অধ্যায়",sl_f3:"বোনাস ল্যাব",sl_f4:"ফ্রি",sl_stack:"আমাদের কাজ: ডিজাইন ও ডেভেলপমেন্ট · Netlify-তে হোস্ট করা",sl_visit:"ShikboLab দেখুন",
  pk1:"শিক্ষা প্ল্যাটফর্ম",pk2:"এআই অ্যাসিস্ট্যান্ট",pk3:"ওয়েবসাইট টেমপ্লেট",
  p1:"কোর্স পেজ, পাঠের অগ্রগতি ও বাংলা-প্রথম ইন্টারফেসসহ একটি শেখার প্ল্যাটফর্ম।",p2:"ছোট অনলাইন শপের জন্য প্রোডাক্ট, স্টক ও ডেলিভারির প্রশ্নের উত্তর দেওয়া চ্যাটবট।",p3:"অ্যাডভাইজরি ফার্মের জন্য কর্পোরেট সাইট — এখন টেমপ্লেট হিসেবে পাওয়া যায়।",
  st_dev:"তৈরি হচ্ছে",st_con:"ধারণা",st_live:"লাইভ ডেমো",view_demo:"ডেমো দেখুন",
  ad:"খোকা টেক একটি ছোট ডিজিটাল স্টুডিও। <span>আমরা ওয়েবসাইট, এআই টুল ও ডিজিটাল পণ্যে মনোযোগ দিই — আর প্রতিটি সিদ্ধান্ত সহজ ভাষায় ব্যাখ্যা করি।</span>",
  ad2:"তাড়াহুড়ো করে পাঁচটা কাজের চেয়ে একটা কাজ ঠিকভাবে করতে চাই। তাই শুরুর আগে কাজের পরিধি ঠিক করি, আগেভাগে কাজ দেখাই, আর এমন সাইট হস্তান্তর করি যা আপনি নিজে রক্ষণাবেক্ষণ করতে পারেন।",
  ht:"একটি প্রজেক্ট যেভাবে এগোয়",
  h1t:"আলোচনা",h1d:" — আপনার প্রয়োজন বুঝে লিখিত পরিধি ও মূল্য ঠিক করি।",
  h2t:"ডিজাইন",h2d:" — কিছু তৈরির আগেই আসল লেআউট দেখে মতামত দেন।",
  h3t:"তৈরি",h3d:" — ডেভেলপ করি, ফোন ও কম্পিউটারে পরীক্ষা করি, আর আপনাকে বুঝিয়ে দিই।",
  h4t:"চালু ও সহায়তা",h4d:" — সাইট প্রকাশ করি এবং পরিবর্তনের জন্য পাশে থাকি।",
  wt:"আপনি যা পাবেন",w1:"ভেবেচিন্তে করা আধুনিক ডিজাইন",w2:"সব স্ক্রিনে ভালোভাবে চলে",w3:"স্পষ্ট ও ন্যায্য মূল্য",w4:"নির্মাতাদের সাথে সরাসরি যোগাযোগ",w5:"আপনার সাথে বড় হতে পারে এমন কোড",
  ct:"আপনার পরিকল্পনার কথা জানান",cs:"শুরু করতে কয়েকটি বাক্যই যথেষ্ট। আমরা প্রশ্ন বা প্রাথমিক পরামর্শ নিয়ে উত্তর দেব।",
  c_email:"ইমেইল",c_wa:"হোয়াটসঅ্যাপ",c_loc:"অবস্থান",c_hours:"সময়",c_lang:"ভাষা",wa_btn:"হোয়াটসঅ্যাপে কথা বলুন",
  demonote:"এই ফর্ম নিজে থেকে কিছু পাঠায় না। যাচাইয়ের পর আপনি নিজেই হোয়াটসঅ্যাপ বা ইমেইলে বার্তাটি পাঠাবেন।",
  ready:"আপনার বার্তা তৈরি। কীভাবে পাঠাতে চান?",send_wa:"হোয়াটসঅ্যাপে পাঠান",send_mail:"ইমেইলে পাঠান",mail_subj:"খোকা টেক ওয়েবসাইট থেকে প্রজেক্ট জিজ্ঞাসা",
  m_hello:"হ্যালো খোকা টেক,",m_name:"নাম",m_email:"ইমেইল",m_type:"প্রজেক্টের ধরন",
  fn:"নাম",fe:"ইমেইল",fp:"প্রজেক্টের ধরন",fm:"বার্তা",sub_btn:"বার্তা পাঠান",tpl_opt:"টেমপ্লেট কাস্টমাইজেশন",
  e1:"এই ঘরটি পূরণ করা আবশ্যক।",e2:"সঠিক ইমেইল ঠিকানা দিন।",ok:"ডেমো মোড: ফর্ম সঠিক, কিন্তু কোনো বার্তা পাঠানো হয়নি।",
  f_cta:"মাথায় কিছু আছে? চলুন আলোচনা করি।",fd:"বাড়ন্ত ব্যবসার জন্য ওয়েবসাইট, এআই টুল ও ডিজিটাল পণ্য।",fq:"স্টুডিও",fsv:"সেবা",fc:"যোগাযোগ",
  credit:"ডিজাইন ও ডেভেলপমেন্ট: খোকা টেক।",soon:"সোশ্যাল লিংকগুলো প্লেসহোল্ডার — index.html-এ আপনার লিংক দিন।",
  title:"খোকা টেক — ওয়েবসাইট, এআই টুল ও ডিজিটাল পণ্য"},
 hi:{
  skip:"मुख्य सामग्री पर जाएँ",services:"सेवाएँ",templates:"टेम्पलेट",portfolio:"काम",about:"परिचय",contact:"संपर्क",cta:"प्रोजेक्ट शुरू करें",
  h_tag:"डिजिटल स्टूडियो",
  h1:"आपका व्यवसाय जिन वेबसाइटों और सॉफ़्टवेयर पर चलता है, <em>हम उन्हें डिज़ाइन करते और बनाते हैं।</em>",
  hd:"कंपनी वेबसाइट, ऑनलाइन शॉप, एआई असिस्टेंट और कस्टम टूल — आपके साथ योजना बनाकर, ध्यान से बनाए गए, और लाइव होने के बाद भी संभाले गए।",
  b1:"प्रोजेक्ट शुरू करें",b2:"टेम्पलेट देखें",h_cap:"हमारे टेम्पलेट संग्रह से:",
  st:"हम आपके लिए क्या बना सकते हैं",ss:"चार तरह का काम, एक टीम। ज़्यादातर प्रोजेक्ट में दो या अधिक शामिल होते हैं — जैसे बुकिंग टूल वाली वेबसाइट, या एआई असिस्टेंट वाली शॉप।",
  s1:"वेब डेवलपमेंट",s1d:"तेज़ और सुलभ वेबसाइट जो साफ़ बताती हैं कि आप क्या करते हैं और संपर्क या ख़रीदारी आसान बनाती हैं। साफ़ HTML, CSS और JavaScript में लिखी, इसलिए होस्टिंग सस्ती और बदलाव आसान।",
  s1a:"कंपनी वेबसाइट",s1b:"ऑनलाइन शॉप",s1c:"लैंडिंग पेज",
  s2:"एआई समाधान",s2d:"व्यावहारिक एआई जो सच में समय बचाए: आपकी अपनी जानकारी से ग्राहकों के सवालों का जवाब देने वाले असिस्टेंट, और हफ़्ते के दोहराए जाने वाले कामों का ऑटोमेशन।",
  s2a:"ग्राहक सहायता असिस्टेंट",s2b:"दस्तावेज़ व डेटा ऑटोमेशन",s2c:"आंतरिक ज्ञान टूल",
  s3:"डिजिटल उत्पाद",s3d:"तैयार वेबसाइट टेम्पलेट और टूल, जिन्हें जल्दी लॉन्च करके बाद में कस्टमाइज़ किया जा सके। ऑर्डर से पहले हर एक का लाइव डेमो आज़माएँ।",
  s3a:"वेबसाइट टेम्पलेट",s3b:"यूआई किट",s3c:"स्टार्टर प्रोजेक्ट",
  s4:"कस्टम सॉफ़्टवेयर",s4d:"जब तैयार सॉफ़्टवेयर फ़िट न हो, तो हम आपकी टीम के काम करने के तरीके के अनुसार टूल बनाते हैं — बुकिंग, इन्वेंटरी, डैशबोर्ड या क्लाइंट पोर्टल।",
  s4a:"डैशबोर्ड",s4b:"बुकिंग व इन्वेंटरी टूल",s4c:"क्लाइंट पोर्टल",
  tt:"तैयार डिज़ाइन से शुरू करें",ts:"छह वेबसाइट टेम्पलेट, हर एक का अपना डिज़ाइन सिस्टम और काम करता लाइव डेमो। दिखाई गई कीमतें डेमो कीमतें हैं।",
  all:"सभी टेम्पलेट देखें",price:"डेमो मूल्य",det:"विवरण",prev:"लाइव डेमो",ord:"ऑर्डर",
  pt:"चुनिंदा काम",ps:"पहले एक लाइव प्रोजेक्ट, फिर चल रहा काम।",
  sl_kind:"लाइव · शिक्षा प्लेटफ़ॉर्म",sl_desc:"स्कूली छात्रों के लिए बांग्ला में मुफ़्त विज्ञान सीखने की वेबसाइट। सरल नोट्स, खुद चलाकर देखने वाली एनिमेटेड लैब, गेम और क्विज़ — सब एक जगह, बिना रजिस्ट्रेशन।",
  sl_f1:"विषय",sl_f2:"अध्याय",sl_f3:"बोनस लैब",sl_f4:"मुफ़्त",sl_stack:"हमारी भूमिका: डिज़ाइन और डेवलपमेंट · Netlify पर होस्टेड",sl_visit:"ShikboLab देखें",
  pk1:"शिक्षा प्लेटफ़ॉर्म",pk2:"एआई असिस्टेंट",pk3:"वेबसाइट टेम्पलेट",
  p1:"कोर्स पेज, पाठ ट्रैकिंग और बांग्ला-प्रथम इंटरफ़ेस वाला लर्निंग प्लेटफ़ॉर्म।",p2:"छोटी ऑनलाइन दुकानों के लिए प्रोडक्ट, स्टॉक और डिलीवरी के सवालों का जवाब देने वाला चैटबॉट।",p3:"एडवाइज़री फ़र्मों के लिए कॉर्पोरेट साइट — अब टेम्पलेट के रूप में उपलब्ध।",
  st_dev:"विकास में",st_con:"कॉन्सेप्ट",st_live:"लाइव डेमो",view_demo:"डेमो देखें",
  ad:"खोका टेक एक छोटा डिजिटल स्टूडियो है। <span>हम वेबसाइट, एआई टूल और डिजिटल उत्पादों पर ध्यान देते हैं — और हर फ़ैसले को सरल भाषा में समझाते हैं।</span>",
  ad2:"हम जल्दी-जल्दी पाँच चीज़ें बनाने के बजाय एक चीज़ ठीक से बनाना पसंद करते हैं। इसलिए शुरू करने से पहले दायरा तय करते हैं, काम जल्दी दिखाते हैं, और ऐसी साइट सौंपते हैं जिसे आप ख़ुद संभाल सकें।",
  ht:"एक प्रोजेक्ट कैसे चलता है",
  h1t:"बातचीत",h1d:" — आपकी ज़रूरत समझकर लिखित दायरा और मूल्य तय करते हैं।",
  h2t:"डिज़ाइन",h2d:" — कुछ बनने से पहले ही आप असली लेआउट देखकर राय देते हैं।",
  h3t:"निर्माण",h3d:" — हम विकसित करते हैं, फ़ोन और कंप्यूटर पर जाँचते हैं, और आपको समझाते हैं।",
  h4t:"लॉन्च व सहायता",h4d:" — साइट प्रकाशित करते हैं और बदलावों के लिए उपलब्ध रहते हैं।",
  wt:"आप क्या उम्मीद कर सकते हैं",w1:"सोचा-समझा आधुनिक डिज़ाइन",w2:"हर स्क्रीन पर अच्छा काम",w3:"साफ़ और उचित मूल्य",w4:"बनाने वालों से सीधा संपर्क",w5:"आपके साथ बढ़ सकने वाला कोड",
  ct:"बताइए आप क्या योजना बना रहे हैं",cs:"शुरू करने के लिए कुछ वाक्य काफ़ी हैं। हम सवालों या पहले सुझाव के साथ जवाब देंगे।",
  c_email:"ईमेल",c_wa:"व्हाट्सऐप",c_loc:"लोकेशन",c_hours:"उपलब्धता",c_lang:"भाषाएँ",wa_btn:"व्हाट्सऐप पर बात करें",
  demonote:"यह फ़ॉर्म अपने आप कुछ नहीं भेजता। जाँच के बाद आप ख़ुद अपना संदेश व्हाट्सऐप या ईमेल से भेजते हैं।",
  ready:"आपका संदेश तैयार है। इसे कैसे भेजना चाहेंगे?",send_wa:"व्हाट्सऐप पर भेजें",send_mail:"ईमेल से भेजें",mail_subj:"खोका टेक वेबसाइट से प्रोजेक्ट पूछताछ",
  m_hello:"नमस्ते खोका टेक,",m_name:"नाम",m_email:"ईमेल",m_type:"प्रोजेक्ट का प्रकार",
  fn:"नाम",fe:"ईमेल",fp:"प्रोजेक्ट का प्रकार",fm:"संदेश",sub_btn:"संदेश भेजें",tpl_opt:"टेम्पलेट कस्टमाइज़ेशन",
  e1:"यह फ़ील्ड आवश्यक है।",e2:"सही ईमेल पता दर्ज करें।",ok:"डेमो मोड: फ़ॉर्म सही है, लेकिन कोई संदेश नहीं भेजा गया।",
  f_cta:"कुछ सोच रखा है? चलिए बात करते हैं।",fd:"बढ़ते व्यवसायों के लिए वेबसाइट, एआई टूल और डिजिटल उत्पाद।",fq:"स्टूडियो",fsv:"सेवाएँ",fc:"संपर्क",
  credit:"डिज़ाइन व डेवलपमेंट: खोका टेक।",soon:"सोशल लिंक प्लेसहोल्डर हैं — index.html में अपने लिंक जोड़ें।",
  title:"खोका टेक — वेबसाइट, एआई टूल और डिजिटल उत्पाद"}
};

const PROJECTS = [
 { name: "AI Shop Chatbot", type: "pk2", desc: "p2", status: "st_con", year: "2026" },
 { name: "Nexora Business", type: "pk3", desc: "p3", status: "st_live", year: "2026", link: "templates/demos/business.html" }
];
const FEATURED = "portfolio"; // template shown large in the homepage band

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
let lang = (() => { try { return localStorage.getItem("lang"); } catch (e) { return null; } })();
if (!TEXT[lang]) lang = "en";
const t = k => TEXT[lang][k] ?? TEXT.en[k] ?? k;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function toast(m) { const e = $("#toast"); e.textContent = m; e.classList.add("show"); clearTimeout(toast.i); toast.i = setTimeout(() => e.classList.remove("show"), 2800); }

function renderTemplates() {
 const CATS = window.KT_CATEGORIES || {}, all = (window.KT_TEMPLATES || []).slice().sort((a, b) => a.order - b.order);
 if (!all.length) return;
 const cat = x => (CATS[x.category] || {})[lang] || x.category;
 const d = x => "templates/details.html?id=" + x.id;
 const f = all.find(x => x.id === FEATURED) || all[0], rest = all.filter(x => x !== f);
 $("#tpl").innerHTML = `
 <article class="tpl-feature">
  <a class="pic" href="${d(f)}" style="background:${f.paper}" aria-label="${esc(t("det"))}: ${esc(f.name)}"><img src="${f.thumb}" alt="${esc(f.name)} — ${esc(cat(f))}" width="640" height="400" loading="lazy"></a>
  <div class="cap"><div><span class="meta">${esc(cat(f))} · ${esc(f.fonts)}</span><h3><a href="${d(f)}">${esc(f.name)}</a></h3><p>${esc(f.short[lang] || f.short.en)}</p></div>
  <div class="price num">$${f.price}<small>${esc(t("price"))}</small></div></div>
  <div class="tpl-actions"><a class="btn sm" href="${f.demo}" target="_blank" rel="noopener">${esc(t("prev"))} ↗</a><a class="btn sm" href="${d(f)}">${esc(t("det"))}</a><a class="btn primary sm" href="templates/order.html?id=${f.id}">${esc(t("ord"))}</a></div>
 </article>
 <div class="tpl-list">
  ${rest.map(x => `<a class="tpl-row" href="${d(x)}"><span class="mini" style="background:${x.paper}"><img src="${x.thumb}" alt="" width="640" height="400" loading="lazy"></span><span><b>${esc(x.name)}</b><span class="meta">${esc(cat(x))}</span></span><span class="p num">$${x.price}</span></a>`).join("")}
  <p class="meta tpl-all">${esc(t("price"))} · <a class="link" href="templates/">${esc(t("all"))} →</a></p>
 </div>`;
 $("#foot-tpl").innerHTML = Object.keys(CATS).map(k => `<a href="templates/?cat=${k}">${esc(CATS[k][lang] || CATS[k].en)}</a>`).join("");
}

function renderProjects() {
 $("#prj").innerHTML = PROJECTS.map(p => `<li class="work-row">
  <span class="meta num">${esc(p.year)} · ${esc(t(p.type))}</span>
  <h3>${esc(p.name)}</h3>
  <p>${esc(t(p.desc))}${p.link ? ` <a href="${p.link}" target="_blank" rel="noopener">${esc(t("view_demo"))} ↗</a>` : ""}</p>
  <span class="st">${esc(t(p.status))}</span></li>`).join("");
}

function render() {
 $$("[data-i18n]").forEach(e => { e.textContent = t(e.dataset.i18n); });
 $$("[data-i18n-html]").forEach(e => { e.innerHTML = t(e.dataset.i18nHtml); });
 renderTemplates(); renderProjects();
 if (window.KT_fillContact) KT_fillContact(lang);
 document.title = t("title");
}
function setLang(l) { lang = TEXT[l] ? l : "en"; try { localStorage.setItem("lang", lang); } catch (e) {} document.documentElement.lang = lang; $("#lang").value = lang; render(); }

/* navigation */
const burger = $("#burger"), menu = $("#menu");
const closeMenu = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); };
burger.addEventListener("click", () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
menu.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { closeMenu(); burger.focus(); } });
$("#lang").addEventListener("change", e => setLang(e.target.value));
document.addEventListener("click", e => { const s = e.target.closest("[data-soon]"); if (s) { e.preventDefault(); toast(t("soon")); } });

/* contact form (demo) */
$("#form").addEventListener("submit", e => {
 e.preventDefault(); const f = e.target; let first = null;
 $$("input,textarea", f).forEach(i => {
  const v = i.value.trim(); let m = "";
  if (!v) m = t("e1"); else if (i.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) m = t("e2");
  i.parentElement.querySelector(".err").textContent = m; i.setAttribute("aria-invalid", !!m); if (m && !first) first = i;
 });
 if (first) { first.focus(); $("#status").textContent = ""; return; }
 // Build the message and let the visitor send it from their own WhatsApp or email app.
 const msg = [t("m_hello"), "", t("m_name") + ": " + f.name.value.trim(), t("m_email") + ": " + f.email.value.trim(), t("m_type") + ": " + f.type.value, "", f.msg.value.trim()].join("\n");
 $("#status").innerHTML = `<p style="margin-bottom:12px">${esc(t("ready"))}</p><div class="hero-actions" style="margin-top:0">
  <a class="btn primary" href="${KT_WA(msg)}" target="_blank" rel="noopener">${esc(t("send_wa"))} →</a>
  <a class="btn" href="${KT_MAIL(t("mail_subj"), msg)}">${esc(t("send_mail"))}</a></div>`;
});

/* subtle reveal */
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
 const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { rootMargin: "0px 0px -60px 0px" });
 $$(".rv").forEach(el => io.observe(el));
} else $$(".rv").forEach(el => el.classList.add("in"));

$("#year").textContent = new Date().getFullYear();
setLang(lang);
