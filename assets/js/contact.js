/* ==========================================================================
   KHOKA TECH — central site configuration.
   Contact details, the business WhatsApp number used for orders, order
   reference settings and the (future) backend address all live here.
   Edit this file only; every page reads from it.

   Elements with data-c="…" are filled automatically:
     email      → mailto link showing the address
     wa-phone   → WhatsApp link showing the phone number
     wa         → WhatsApp link (keeps its own label)
     github     → GitHub link (keeps its own label)
     location / hours → plain text in the current language
   ========================================================================== */
window.KT_CONTACT = {
  email: "rsraju673@gmail.com",
  phone: "+880 1719-531952",
  whatsapp: "8801719531952",                 // business WhatsApp: international format, digits only (wa.me)
  github: "https://github.com/rsraju6734",
  location: { en: "Narayanganj, Bangladesh", bn: "নারায়ণগঞ্জ, বাংলাদেশ", hi: "नारायणगंज, बांग्लादेश" },
  hours: { en: "Available 24/7", bn: "২৪/৭ উপলব্ধ", hi: "24/7 उपलब्ध" },
  greeting: { en: "Hello KHOKA TECH, I'd like to talk about a project.", bn: "হ্যালো খোকা টেক, আমি একটি প্রজেক্ট নিয়ে কথা বলতে চাই।", hi: "नमस्ते खोका टेक, मैं एक प्रोजेक्ट के बारे में बात करना चाहता/चाहती हूँ।" }
};

/* Order settings used by templates/order.html */
window.KT_ORDER = {
  refPrefix: "KT"                            // order references look like KT-261122-7Q4M
};

/* Backend connection for the admin dashboard (admin/).
   null = no backend yet → the dashboard runs in Preview mode with sample data only.
   When a secure API exists, set e.g. "https://api.example.com/v1" — see docs/BACKEND.md. */
window.KT_API = {
  baseUrl: null
};

/* WhatsApp chat link, optionally with a pre-written message the visitor reviews before sending. */
window.KT_WA = function (text, number) {
  return "https://wa.me/" + (number || window.KT_CONTACT.whatsapp) + (text ? "?text=" + encodeURIComponent(text) : "");
};
/* Email link that opens the visitor's own mail app with subject and body filled in. */
window.KT_MAIL = function (subject, body, to) {
  return "mailto:" + (to || window.KT_CONTACT.email) + "?subject=" + encodeURIComponent(subject || "") + (body ? "&body=" + encodeURIComponent(body) : "");
};

window.KT_fillContact = function (lang) {
  var C = window.KT_CONTACT, L = function (o) { return o[lang] || o.en; };
  document.querySelectorAll("[data-c]").forEach(function (el) {
    switch (el.dataset.c) {
      case "email": el.textContent = C.email; el.href = "mailto:" + C.email; break;
      case "wa-phone": el.textContent = C.phone; el.href = window.KT_WA(L(C.greeting)); el.target = "_blank"; el.rel = "noopener"; break;
      case "wa": el.href = window.KT_WA(L(C.greeting)); el.target = "_blank"; el.rel = "noopener"; break;
      case "github": el.href = C.github; el.target = "_blank"; el.rel = "noopener"; break;
      case "location": el.textContent = L(C.location); break;
      case "hours": el.textContent = L(C.hours); break;
    }
  });
};
