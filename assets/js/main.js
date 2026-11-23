/* KHOKA TECH - main.js (homepage, v6 design)
   TEXT: homepage copy in English, Bangla and Hindi (keys used with innerHTML are trusted, static text).
   Features: intro counter, full-screen menu, Bangladesh clock, flip-card words, service doors, sticky process
   timeline, pull-cord dark mode, demo/template/project lists, contact form handing off to WhatsApp or email. */
const TEXT = {
 en:{
  home:"Home",process:"Process",menu:"Menu",local:"Local time",lang_l:"Language",theme:"Switch light and dark mode",
  intro_l:"Opening the studio",intro_r:"Web · AI · Products · Software",h_tag2:"Digital studio · Narayanganj, Bangladesh",
  hi1:"Hi, we're KHOKA TECH.",hi2:"We build",words:["Websites","Online stores","AI assistants","Web apps","Templates"],
  b3:"See our work",chip:"5 live demos",avail:"Available for new projects",remote:"Bangladesh & worldwide · Replies within a day",scroll:"Scroll to explore",
  doors_h:"Four doors. Pick the one you need.",doors_p:"Each door is one kind of work. Open one to see what is inside — most projects end up using two.",discuss:"Discuss this with us",
  h1w:"Week 1",h2w:"Week 1–2",h3w:"Week 2–4",h4w:"Launch day and after",
  h1x:"We learn what you need, look at what you already have, and agree a written scope and price before any work starts.",
  h2x:"You see real layouts early — on your own phone — and give feedback before anything is built.",
  h3x:"We develop, test on phones and computers, and walk you through every page so nothing is a surprise.",
  h4x:"We publish the site, connect your domain, and stay available for changes, fixes and new ideas.",
  avail2:"Available for new work",cta1:"Need something built?",cta2:"Let's make it happen.",nav:"Navigate",status_h:"Status",remote_s:"Remote · Bangladesh & worldwide",top:"Back to top",
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
  pt:"Selected work",dm_h:"Demo websites",dm_p:"Five complete business websites built by KHOKA TECH to show what we can make for you — with real photography and working features.",dm_all:"Project details",dm_more:"Other projects",dm_live:"View live demo",dm_det:"View details",ps:"A live project first, followed by work in progress.",
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
  home:"হোম",process:"প্রক্রিয়া",menu:"মেনু",local:"স্থানীয় সময়",lang_l:"ভাষা",theme:"লাইট ও ডার্ক মোড বদলান",
  intro_l:"স্টুডিও খুলছে",intro_r:"ওয়েব · এআই · পণ্য · সফটওয়্যার",h_tag2:"ডিজিটাল স্টুডিও · নারায়ণগঞ্জ, বাংলাদেশ",
  hi1:"হ্যালো, আমরা খোকা টেক।",hi2:"আমরা বানাই",words:["ওয়েবসাইট","অনলাইন শপ","এআই অ্যাসিস্ট্যান্ট","ওয়েব অ্যাপ","টেমপ্লেট"],
  b3:"আমাদের কাজ দেখুন",chip:"৫টি লাইভ ডেমো",avail:"নতুন প্রজেক্টের জন্য প্রস্তুত",remote:"বাংলাদেশ ও সারা বিশ্ব · এক দিনের মধ্যে উত্তর",scroll:"নিচে স্ক্রল করুন",
  doors_h:"চারটি দরজা। আপনার দরকারেরটা বেছে নিন।",doors_p:"প্রতিটি দরজা এক ধরনের কাজ। খুলে দেখুন ভেতরে কী আছে — বেশিরভাগ প্রজেক্টে দুটো লাগে।",discuss:"এ নিয়ে আমাদের সাথে কথা বলুন",
  h1w:"সপ্তাহ ১",h2w:"সপ্তাহ ১–২",h3w:"সপ্তাহ ২–৪",h4w:"চালুর দিন ও পরে",
  h1x:"আপনার প্রয়োজন বুঝি, আপনার যা আছে দেখি, আর কাজ শুরুর আগে লিখিত পরিধি ও মূল্য ঠিক করি।",
  h2x:"আগেভাগেই আসল লেআউট দেখেন — নিজের ফোনেই — আর কিছু তৈরির আগে মতামত দেন।",
  h3x:"ডেভেলপ করি, ফোন ও কম্পিউটারে পরীক্ষা করি, আর প্রতিটি পেজ বুঝিয়ে দিই যাতে কিছুই অবাক না করে।",
  h4x:"সাইট প্রকাশ করি, আপনার ডোমেইন যুক্ত করি, আর পরিবর্তন, সমাধান ও নতুন আইডিয়ার জন্য পাশে থাকি।",
  avail2:"নতুন কাজের জন্য প্রস্তুত",cta1:"কিছু বানাতে চান?",cta2:"চলুন শুরু করি।",nav:"নেভিগেশন",status_h:"অবস্থা",remote_s:"রিমোট · বাংলাদেশ ও সারা বিশ্ব",top:"উপরে যান",
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
  pt:"নির্বাচিত কাজ",dm_h:"ডেমো ওয়েবসাইট",dm_p:"আমরা আপনার জন্য কী বানাতে পারি তা দেখাতে খোকা টেকের তৈরি পাঁচটি সম্পূর্ণ ব্যবসায়িক ওয়েবসাইট — আসল ছবি ও কার্যকর ফিচারসহ।",dm_all:"প্রজেক্টের বিস্তারিত",dm_more:"অন্যান্য প্রজেক্ট",dm_live:"লাইভ ডেমো দেখুন",dm_det:"বিস্তারিত দেখুন",ps:"প্রথমে একটি চালু প্রজেক্ট, তারপর চলমান কাজ।",
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
  home:"होम",process:"प्रक्रिया",menu:"मेनू",local:"स्थानीय समय",lang_l:"भाषा",theme:"लाइट और डार्क मोड बदलें",
  intro_l:"स्टूडियो खुल रहा है",intro_r:"वेब · एआई · उत्पाद · सॉफ़्टवेयर",h_tag2:"डिजिटल स्टूडियो · नारायणगंज, बांग्लादेश",
  hi1:"नमस्ते, हम खोका टेक हैं।",hi2:"हम बनाते हैं",words:["वेबसाइट","ऑनलाइन शॉप","एआई असिस्टेंट","वेब ऐप","टेम्पलेट"],
  b3:"हमारा काम देखें",chip:"5 लाइव डेमो",avail:"नए प्रोजेक्ट के लिए उपलब्ध",remote:"बांग्लादेश और दुनिया भर · एक दिन में जवाब",scroll:"नीचे स्क्रॉल करें",
  doors_h:"चार दरवाज़े। जो चाहिए वह चुनें।",doors_p:"हर दरवाज़ा एक तरह का काम है। खोलकर देखें अंदर क्या है — ज़्यादातर प्रोजेक्ट में दो लगते हैं।",discuss:"इस पर हमसे बात करें",
  h1w:"सप्ताह 1",h2w:"सप्ताह 1–2",h3w:"सप्ताह 2–4",h4w:"लॉन्च का दिन और बाद में",
  h1x:"हम आपकी ज़रूरत समझते हैं, जो पहले से है उसे देखते हैं, और काम शुरू होने से पहले लिखित दायरा और मूल्य तय करते हैं।",
  h2x:"आप जल्दी ही असली लेआउट देखते हैं — अपने फ़ोन पर — और कुछ बनने से पहले राय देते हैं।",
  h3x:"हम विकसित करते हैं, फ़ोन और कंप्यूटर पर जाँचते हैं, और हर पेज समझाते हैं ताकि कुछ भी अचानक न लगे।",
  h4x:"हम साइट प्रकाशित करते हैं, आपका डोमेन जोड़ते हैं, और बदलाव, सुधार और नए विचारों के लिए उपलब्ध रहते हैं।",
  avail2:"नए काम के लिए उपलब्ध",cta1:"कुछ बनवाना है?",cta2:"चलिए शुरू करते हैं।",nav:"नेविगेट",status_h:"स्थिति",remote_s:"रिमोट · बांग्लादेश और दुनिया भर",top:"ऊपर जाएँ",
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
  pt:"चुनिंदा काम",dm_h:"डेमो वेबसाइट",dm_p:"हम आपके लिए क्या बना सकते हैं, यह दिखाने के लिए खोका टेक की बनाई पाँच पूरी बिज़नेस वेबसाइटें — असली फ़ोटो और काम करने वाले फ़ीचर के साथ।",dm_all:"प्रोजेक्ट विवरण",dm_more:"अन्य प्रोजेक्ट",dm_live:"लाइव डेमो देखें",dm_det:"विवरण देखें",ps:"पहले एक लाइव प्रोजेक्ट, फिर चल रहा काम।",
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

/* Demo websites shown in the Work section (folders under demos/). */
const DEMOS = [
 { id: "restaurant", name: "The Urban Plate", cat: { en: "Restaurant", bn: "রেস্টুরেন্ট", hi: "रेस्टोरेंट" }, stack: ["HTML", "CSS", "JavaScript"],
   desc: { en: "Premium restaurant site with a photo menu, chef's special, gallery and table reservations.", bn: "ছবিসহ মেনু, শেফের স্পেশাল, গ্যালারি ও টেবিল রিজার্ভেশনসহ প্রিমিয়াম রেস্টুরেন্ট সাইট।", hi: "फ़ोटो मेनू, शेफ़ स्पेशल, गैलरी और टेबल रिज़र्वेशन वाली प्रीमियम रेस्टोरेंट साइट।" } },
 { id: "ecommerce", name: "NOVA STORE", cat: { en: "E-commerce", bn: "ই-কমার্স", hi: "ई-कॉमर्स" }, stack: ["HTML", "CSS", "JavaScript", "sessionStorage"],
   desc: { en: "Online store with search, filters, product pages, wishlist, cart and a checkout preview.", bn: "সার্চ, ফিল্টার, প্রোডাক্ট পেজ, উইশলিস্ট, কার্ট ও চেকআউট প্রিভিউসহ অনলাইন স্টোর।", hi: "सर्च, फ़िल्टर, प्रोडक्ट पेज, विशलिस्ट, कार्ट और चेकआउट प्रीव्यू वाला ऑनलाइन स्टोर।" } },
 { id: "real-estate", name: "Horizon Estates", cat: { en: "Real estate", bn: "রিয়েল এস্টেট", hi: "रियल एस्टेट" }, stack: ["HTML", "CSS", "JavaScript"],
   desc: { en: "Luxury property listings with search, photo galleries, an EMI calculator and viewing requests.", bn: "সার্চ, ছবির গ্যালারি, ইএমআই ক্যালকুলেটর ও ভিউয়িং অনুরোধসহ বিলাসবহুল প্রপার্টি সাইট।", hi: "सर्च, फ़ोटो गैलरी, EMI कैलकुलेटर और विज़िट अनुरोध वाली लग्ज़री प्रॉपर्टी साइट।" } },
 { id: "education", name: "LearnSphere Academy", cat: { en: "Education", bn: "শিক্ষা", hi: "शिक्षा" }, stack: ["HTML", "CSS", "JavaScript"],
   desc: { en: "Course catalogue with filters, course pages, a student dashboard preview and enrolment.", bn: "ফিল্টারসহ কোর্স তালিকা, কোর্স পেজ, স্টুডেন্ট ড্যাশবোর্ড প্রিভিউ ও ভর্তি।", hi: "फ़िल्टर सहित कोर्स सूची, कोर्स पेज, स्टूडेंट डैशबोर्ड प्रीव्यू और एनरोलमेंट।" } },
 { id: "technology", name: "Nexora Technologies", cat: { en: "Technology", bn: "টেকনোলজি", hi: "टेक्नोलॉजी" }, stack: ["HTML", "CSS", "JavaScript"],
   desc: { en: "Software company site with services, filterable case studies, team and a project brief form.", bn: "সার্ভিস, ফিল্টারযোগ্য কেস স্টাডি, টিম ও প্রজেক্ট ব্রিফ ফর্মসহ সফটওয়্যার কোম্পানির সাইট।", hi: "सेवाएँ, फ़िल्टर होने वाली केस स्टडी, टीम और प्रोजेक्ट ब्रीफ़ फ़ॉर्म वाली सॉफ़्टवेयर कंपनी साइट।" } }
];

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
let lang = (() => { try { return localStorage.getItem("lang"); } catch (e) { return null; } })();
if (!TEXT[lang]) lang = "en";
const t = k => TEXT[lang][k] ?? TEXT.en[k] ?? k;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const LOCALE = { en: "en-GB", bn: "bn-BD", hi: "hi-IN" };
const pad2 = n => String(n).padStart(2, "0");

function toast(m) { const e = $("#toast"); e.textContent = m; e.classList.add("show"); clearTimeout(toast.i); toast.i = setTimeout(() => e.classList.remove("show"), 2800); }

/* ---------- intro counter (once per tab session) ---------- */
(function intro() {
 const root = document.documentElement, box = $("#intro");
 if (!root.classList.contains("intro-on")) return;
 const num = $("#intro-num"), bar = $("#intro-bar"), dur = 1500, t0 = performance.now();
 let ended = false;
 const end = () => {
  if (ended) return; ended = true;
  try { sessionStorage.setItem("kt-intro", "1"); } catch (e) {}
  box.classList.add("done");
  setTimeout(() => root.classList.remove("intro-on"), 650);
 };
 const frame = now => {
  const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
  num.textContent = String(Math.round(e * 100)).padStart(3, "0"); bar.style.width = e * 100 + "%";
  if (p < 1 && !ended) requestAnimationFrame(frame); else setTimeout(end, 250);
 };
 requestAnimationFrame(frame);
 box.addEventListener("click", end);
 document.addEventListener("keydown", end, { once: true });
})();

/* ---------- live clock: Bangladesh time ---------- */
function tick() {
 const now = new Date(), L = LOCALE[lang];
 const time = new Intl.DateTimeFormat(L, { timeZone: "Asia/Dhaka", hour: "numeric", minute: "2-digit", hour12: true }).format(now).replace(/\s/g, "").toLowerCase();
 const date = new Intl.DateTimeFormat(L, { timeZone: "Asia/Dhaka", day: "numeric", month: "long", year: "numeric" }).format(now);
 $("#clock-t").textContent = time; $("#clock-f").textContent = time; $("#clock-d").textContent = date;
}

/* ---------- flip card: rotating words ---------- */
const flip = { i: 0, timer: null };
function flipShow(animate) {
 const words = t("words"), card = $(".flip-card"), word = $("#flip-word"), n = $("#flip-n");
 if (flip.i >= words.length) flip.i = 0;
 const apply = () => { word.textContent = words[flip.i]; n.textContent = pad2(flip.i + 1) + " / " + pad2(words.length); };
 if (!animate || REDUCED) { apply(); return; }
 card.classList.add("out");
 setTimeout(() => { apply(); card.classList.remove("out"); }, 330);
}
function flipStart() {
 clearInterval(flip.timer);
 const box = $("#flip");
 box.removeAttribute("aria-live");
 box.setAttribute("role", "img");
 box.setAttribute("aria-label", t("hi2") + ": " + t("words").join(", "));
 flipShow(false);
 flip.timer = setInterval(() => { if (document.hidden) return; flip.i = (flip.i + 1) % t("words").length; flipShow(true); }, 2600);
}

/* ---------- service doors ---------- */
let door = 1;
function openDoor(n, focus) {
 door = n;
 $$(".door").forEach(d => { const on = +d.dataset.door === n; d.setAttribute("aria-selected", on); d.tabIndex = on ? 0 : -1; if (on && focus) d.focus(); });
 const room = $("#room");
 $("#room-n").textContent = pad2(n) + " / 04";
 $("#room-h").textContent = t("s" + n);
 $("#room-p").textContent = t("s" + n + "d");
 $("#room-ul").innerHTML = ["a", "b", "c"].map(x => `<li>${esc(t("s" + n + x))}</li>`).join("");
 room.setAttribute("aria-labelledby", $$(".door")[n - 1].id);
 room.classList.remove("swap"); void room.offsetWidth; room.classList.add("swap");
}
$$(".door").forEach(d => d.addEventListener("click", () => openDoor(+d.dataset.door)));
$(".doors").addEventListener("keydown", e => {
 const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
 if (k) { e.preventDefault(); openDoor((door - 1 + k + 4) % 4 + 1, true); }
 if (e.key === "Home") { e.preventDefault(); openDoor(1, true); }
 if (e.key === "End") { e.preventDefault(); openDoor(4, true); }
});
const doorFromHash = h => { const d = h && h.length > 1 && document.getElementById(h.slice(1)); return d && d.classList.contains("door") ? +d.dataset.door : 0; };
document.addEventListener("click", e => {
 const a = e.target.closest("a[href^='#s-']"); if (!a) return;
 const n = doorFromHash(a.getAttribute("href")); if (!n) return;
 e.preventDefault(); openDoor(n); closeMenu();
 $("#services").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
 history.replaceState(null, "", a.getAttribute("href"));
});

/* ---------- content blocks ---------- */
function renderTemplates() {
 const CATS = window.KT_CATEGORIES || {}, all = (window.KT_TEMPLATES || []).slice().sort((a, b) => a.order - b.order);
 if (!all.length) return;
 const cat = x => (CATS[x.category] || {})[lang] || x.category;
 const d = x => "templates/details.html?id=" + x.id;
 $("#tpl").innerHTML = all.map(x => `<article class="tpl">
  <a class="pic" href="${d(x)}" style="background:${x.paper}" aria-label="${esc(t("det"))}: ${esc(x.name)}"><img src="${x.thumb}" alt="${esc(x.name)} — ${esc(cat(x))}" width="640" height="400" loading="lazy"></a>
  <div class="tpl-b">
   <div class="top"><div><span class="mono-up">${esc(cat(x))}</span><h4><a href="${d(x)}">${esc(x.name)}</a></h4></div><div class="price">$${x.price}<small>${esc(t("price"))}</small></div></div>
   <p>${esc(x.short[lang] || x.short.en)}</p>
   <div class="demo-act"><a class="btn ghost sm" href="${x.demo}" target="_blank" rel="noopener">${esc(t("prev"))} ↗</a><a class="btn dark sm" href="templates/order.html?id=${x.id}">${esc(t("ord"))}</a></div>
  </div></article>`).join("");
 $("#foot-tpl").innerHTML = Object.keys(CATS).map(k => `<a href="templates/?cat=${k}">${esc(CATS[k][lang] || CATS[k].en)}</a>`).join("");
}

function renderDemos() {
 $("#demos").innerHTML = DEMOS.map(d => `<article class="demo-card">
  <a class="demo-pic" href="demos/${d.id}/" target="_blank" rel="noopener" aria-label="${esc(t("dm_live"))}: ${esc(d.name)}"><img src="assets/images/projects/demo-${d.id}.webp" alt="${esc(d.name)} — ${esc(d.cat[lang] || d.cat.en)}" width="800" height="500" loading="lazy"></a>
  <div class="demo-b">
   <span class="mono-up">${esc(d.cat[lang] || d.cat.en)}</span>
   <h4>${esc(d.name)}</h4>
   <p>${esc(d.desc[lang] || d.desc.en)}</p>
   <ul class="demo-stack">${d.stack.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
   <div class="demo-act"><a class="btn dark sm" href="demos/${d.id}/" target="_blank" rel="noopener">${esc(t("dm_live"))} ↗</a><a class="btn ghost sm" href="demos/#${d.id}">${esc(t("dm_det"))}</a></div>
  </div></article>`).join("");
}

function renderProjects() {
 $("#prj").innerHTML = PROJECTS.map(p => `<li class="row">
  <span class="mono-up meta-y">${esc(p.year)} · ${esc(t(p.type))}</span>
  <h4>${esc(p.name)}</h4>
  <p>${esc(t(p.desc))}${p.link ? ` <a href="${p.link}" target="_blank" rel="noopener">${esc(t("view_demo"))} ↗</a>` : ""}</p>
  <span class="st">${esc(t(p.status))}</span></li>`).join("");
}

/* ---------- process timeline ---------- */
const steps = $$("#proc-list li");
let stepNow = 0;
function setStep(i) {
 stepNow = i;
 steps.forEach((li, j) => li.classList.toggle("on", j === i));
 $("#proc-big").textContent = pad2(i + 1); $("#proc-i").textContent = pad2(i + 1);
 $("#proc-lab").textContent = $(".mono-up", steps[i]).textContent;
 $("#proc-bar").style.width = ((i + 1) / steps.length) * 100 + "%";
}
if ("IntersectionObserver" in window) {
 const po = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) setStep(steps.indexOf(x.target)); }), { rootMargin: "-45% 0px -45% 0px" });
 steps.forEach(li => po.observe(li));
}

/* ---------- full-screen menu ---------- */
const menuBtn = $("#menu-btn"), menu = $("#menu");
function openMenu() {
 menu.hidden = false; requestAnimationFrame(() => menu.classList.add("open"));
 document.body.classList.add("menu-open"); document.body.style.overflow = "hidden";
 menuBtn.setAttribute("aria-expanded", "true"); $(".menu-links a").focus();
}
function closeMenu() {
 if (menu.hidden) return;
 menu.classList.remove("open"); document.body.classList.remove("menu-open"); document.body.style.overflow = "";
 menuBtn.setAttribute("aria-expanded", "false");
 setTimeout(() => { if (!menu.classList.contains("open")) menu.hidden = true; }, 350);
}
menuBtn.addEventListener("click", () => menu.hidden ? openMenu() : closeMenu());
menu.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !menu.hidden) { closeMenu(); menuBtn.focus(); } });

/* ---------- language ---------- */
function render() {
 $$("[data-i18n]").forEach(e => { const v = t(e.dataset.i18n); if (typeof v === "string") e.textContent = v; });
 $$("[data-i18n-html]").forEach(e => { e.innerHTML = t(e.dataset.i18nHtml); });
 renderTemplates(); renderDemos(); renderProjects();
 openDoor(door); flipStart(); tick(); setStep(stepNow);
 if (window.KT_fillContact) KT_fillContact(lang);
 document.title = t("title");
}
function setLang(l) { lang = TEXT[l] ? l : "en"; try { localStorage.setItem("lang", lang); } catch (e) {} document.documentElement.lang = lang; $("#lang").value = lang; render(); }
$("#lang").addEventListener("change", e => setLang(e.target.value));

/* ---------- pull cord: light / dark ---------- */
const cord = $("#cord");
function applyTheme(dark) {
 document.documentElement.classList.toggle("dark", dark);
 cord.setAttribute("aria-pressed", dark);
 $('meta[name="theme-color"]').content = dark ? "#141312" : "#EFEBE4";
}
cord.addEventListener("click", () => {
 const dark = !document.documentElement.classList.contains("dark");
 applyTheme(dark); try { localStorage.setItem("kt-theme", dark ? "dark" : "light"); } catch (e) {}
 cord.classList.remove("pull"); void cord.offsetWidth; cord.classList.add("pull");
});
applyTheme(document.documentElement.classList.contains("dark"));

/* ---------- scroll: bar background, back-to-top ring ---------- */
const bar = $("#bar"), toTop = $("#to-top"), ring = $("#ring");
function onScroll() {
 const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
 bar.classList.toggle("scrolled", y > 30);
 toTop.classList.toggle("show", y > innerHeight * .8);
 ring.style.strokeDashoffset = 138.2 * (1 - (h > 0 ? y / h : 0));
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* ---------- contact form: builds a message, the visitor sends it ---------- */
document.addEventListener("click", e => { const s = e.target.closest("[data-soon]"); if (s) { e.preventDefault(); toast(t("soon")); } });
$("#form").addEventListener("submit", e => {
 e.preventDefault(); const f = e.target; let first = null;
 $$("input,textarea", f).forEach(i => {
  const v = i.value.trim(); let m = "";
  if (!v) m = t("e1"); else if (i.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) m = t("e2");
  i.parentElement.querySelector(".err").textContent = m; i.setAttribute("aria-invalid", !!m); if (m && !first) first = i;
 });
 if (first) { first.focus(); $("#status").textContent = ""; return; }
 const msg = [t("m_hello"), "", t("m_name") + ": " + f.name.value.trim(), t("m_email") + ": " + f.email.value.trim(), t("m_type") + ": " + f.type.value, "", f.msg.value.trim()].join("\n");
 $("#status").innerHTML = `<p>${esc(t("ready"))}</p><div class="actions">
  <a class="btn light" href="${KT_WA(msg)}" target="_blank" rel="noopener"><span>${esc(t("send_wa"))}</span><span class="arr" aria-hidden="true">→</span></a>
  <a class="btn ghost-l" href="${KT_MAIL(t("mail_subj"), msg)}">${esc(t("send_mail"))}</a></div>`;
});

/* ---------- reveal on scroll ---------- */
if ("IntersectionObserver" in window && !REDUCED) {
 const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { rootMargin: "0px 0px -60px 0px" });
 $$(".rv").forEach(el => io.observe(el));
} else $$(".rv").forEach(el => el.classList.add("in"));

$("#year").textContent = new Date().getFullYear();
setLang(lang);
setInterval(tick, 15000);
{ const n = doorFromHash(location.hash); if (n) openDoor(n); }
