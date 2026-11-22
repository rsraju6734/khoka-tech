/* ==========================================================================
   KHOKA TECH admin — data layer.
   The dashboard UI (admin.js) only talks to an "adapter" with this interface:

     listOrders()                    → Promise<Order[]>
     getOrder(id)                    → Promise<Order|null>
     updateStatus(id, status, note)  → Promise<Order>
     addOrder(order)                 → Promise<Order>
     listTemplates()                 → Promise<Template[]>
     updateTemplate(id, patch)       → Promise<Template>

   Two adapters exist:
   • PreviewAdapter — used while KT_API.baseUrl is null (today). Fictional
     sample data held in memory only. Nothing is written to localStorage,
     cookies or any server; a reload resets everything.
   • HttpAdapter — used once KT_API.baseUrl is set in contact.js. Calls the
     secure REST API described in docs/BACKEND.md. Authentication must be an
     HttpOnly session cookie issued by that backend. NOT functional until such
     a backend exists — it is a documented contract, not a working service.
   ========================================================================== */
window.KT_ADMIN_DATA = (function () {
  "use strict";

  const STATUSES = [
    { id: "new",        label: "New" },
    { id: "contacted",  label: "Contacted" },
    { id: "discussion", label: "In Discussion" },
    { id: "confirmed",  label: "Confirmed" },
    { id: "completed",  label: "Completed" },
    { id: "cancelled",  label: "Cancelled" }
  ];
  const STATUS_IDS = STATUSES.map(s => s.id);
  const clone = o => JSON.parse(JSON.stringify(o));

  /* ------------------------------------------------------------------
     Sample data — FICTIONAL people, example.com addresses and unused
     placeholder numbers. Used only to demonstrate the interface.
     ------------------------------------------------------------------ */
  function sampleOrders() {
    const now = Date.now(), h = 3600e3, d = 24 * h;
    const at = ms => new Date(now - ms).toISOString();
    const rows = [
      ["KT-SAMPLE-A7K2", "Sample: Nadia Karim", "Karim Textiles", "ecommerce", "new", 3 * h, "Use our green brand colour, add bKash on the checkout page later, about 40 products to start.", "We need it before Eid if possible."],
      ["KT-SAMPLE-B3M9", "Sample: Arif Hossain", "", "portfolio", "new", 9 * h, "Personal portfolio for a photographer. Replace case studies with photo galleries.", ""],
      ["KT-SAMPLE-C8P4", "Sample: Lina Begum", "Sunrise Coaching", "education", "contacted", 1.2 * d, "Bangla and English versions, 12 courses, add a notice board section.", "Please call after 6 pm."],
      ["KT-SAMPLE-D2Q7", "Sample: Rafiq Ahmed", "Spice Garden", "restaurant", "discussion", 2.5 * d, "Our own menu with 30 dishes, Facebook page link, Google Map embed.", ""],
      ["KT-SAMPLE-E5R3", "Sample: Tanvir Alam", "Alam & Co. Advisory", "business", "confirmed", 4 * d, "Change to navy and gold, add a team page with 6 people.", "Invoice to the company name."],
      ["KT-SAMPLE-F9S6", "Sample: Mitu Das", "Pixel Nest Studio", "agency", "discussion", 5 * d, "Make the orange our purple, add 8 case studies.", ""],
      ["KT-SAMPLE-G4T8", "Sample: Sohel Rana", "", "business", "completed", 12 * d, "Simple company profile site, 5 pages.", ""],
      ["KT-SAMPLE-H6U2", "Sample: Farzana Akter", "Akter Boutique", "ecommerce", "cancelled", 15 * d, "Shop for clothes with size options.", "Budget changed, maybe next year."]
    ];
    return rows.map(([ref, name, business, template, status, ago, req, note], i) => {
      const created = at(ago);
      const history = [{ status: "new", at: created, note: "Request received on WhatsApp" }];
      const path = { contacted: ["contacted"], discussion: ["contacted", "discussion"], confirmed: ["contacted", "discussion", "confirmed"], completed: ["contacted", "discussion", "confirmed", "completed"], cancelled: ["contacted", "cancelled"] }[status] || [];
      path.forEach((s, k) => history.push({ status: s, at: at(ago - (k + 1) * Math.min(ago / (path.length + 1), 20 * h)), note: "" }));
      return {
        id: ref, ref, sample: true, createdAt: created, status,
        customer: { name, business, email: "customer" + (i + 1) + "@example.com", whatsapp: "+880 1000-0000" + String(i + 1).padStart(2, "0") },
        templateId: template, requirements: req, note, history
      };
    });
  }

  /* ------------------------------------------------------------------ Preview */
  function PreviewAdapter() {
    const orders = new Map(sampleOrders().map(o => [o.id, o]));
    const templates = new Map((window.KT_TEMPLATES || []).map(t => [t.id, clone(t)]));
    this.mode = "preview";
    this.listOrders = async () => clone([...orders.values()]);
    this.getOrder = async id => (orders.has(id) ? clone(orders.get(id)) : null);
    this.updateStatus = async (id, status, note) => {
      const o = orders.get(id);
      if (!o) throw new Error("Order not found");
      if (!STATUS_IDS.includes(status)) throw new Error("Unknown status");
      o.status = status;
      o.history.push({ status, at: new Date().toISOString(), note: note || "" });
      return clone(o);
    };
    this.addOrder = async order => {
      if (orders.has(order.id)) throw new Error("An order with reference " + order.id + " is already in the list.");
      orders.set(order.id, clone(order));
      return clone(order);
    };
    this.listTemplates = async () => clone([...templates.values()].sort((a, b) => a.order - b.order));
    this.updateTemplate = async (id, patch) => {
      const t = templates.get(id);
      if (!t) throw new Error("Template not found");
      if (patch.name != null) t.name = String(patch.name).trim();
      if (patch.price != null) t.price = Math.max(0, Math.round(Number(patch.price)));
      if (patch.shortEn != null) t.short.en = String(patch.shortEn).trim();
      return clone(t);
    };
  }

  /* ------------------------------------------------------------------ HTTP (backend contract) */
  function HttpAdapter(baseUrl) {
    const base = String(baseUrl).replace(/\/+$/, "");
    async function req(path, opts = {}) {
      const res = await fetch(base + path, {
        method: opts.method || "GET",
        credentials: "include",                       // HttpOnly session cookie set by the backend login
        headers: opts.body ? { "Content-Type": "application/json" } : {},
        body: opts.body ? JSON.stringify(opts.body) : undefined
      });
      if (res.status === 401) throw new Error("Not signed in. Sign in through the backend first.");
      if (!res.ok) throw new Error("Server error " + res.status);
      return res.status === 204 ? null : res.json();
    }
    this.mode = "live";
    this.listOrders = () => req("/orders");
    this.getOrder = id => req("/orders/" + encodeURIComponent(id));
    this.updateStatus = (id, status, note) => req("/orders/" + encodeURIComponent(id), { method: "PATCH", body: { status, note } });
    this.addOrder = order => req("/orders", { method: "POST", body: order });
    this.listTemplates = () => req("/templates");
    this.updateTemplate = (id, patch) => req("/templates/" + encodeURIComponent(id), { method: "PATCH", body: patch });
  }

  /* ------------------------------------------------------------------
     Read an order message produced by templates/order.html
     (pasted by the admin from WhatsApp). Returns an Order or throws.
     ------------------------------------------------------------------ */
  function parseWhatsAppOrder(text) {
    const src = String(text || "").replace(/\r/g, "");
    const line = label => { const m = src.match(new RegExp("^\\s*\\*?" + label + "\\*?:\\s*(.*)$", "mi")); return m ? m[1].trim() : ""; };
    const block = (label, next) => {
      const m = src.match(new RegExp(label + ":\\s*\\n([\\s\\S]*?)(?:\\n\\s*\\n" + (next ? next + ":" : "Sent from") + "|$)", "i"));
      return m ? m[1].trim() : "";
    };
    const ref = line("Ref");
    if (!/^[A-Z]{1,6}-\d{6}-[A-Z0-9]{4}$/.test(ref)) throw new Error("Couldn't find a valid order reference (for example KT-261122-7Q4M). Paste the whole message.");
    const tplMatch = line("Template").match(/\(([a-z0-9-]+)\)\s*$/i);
    const templateId = tplMatch ? tplMatch[1] : "";
    const name = line("Name"), email = line("Email"), whatsapp = line("WhatsApp");
    if (!name || !whatsapp) throw new Error("The message is missing the customer's name or WhatsApp number.");
    let business = line("Business"); if (business === "-") business = "";
    let note = block("Additional message", ""); if (note === "-") note = "";
    const now = new Date().toISOString();
    return {
      id: ref, ref, sample: false, imported: true, createdAt: now, status: "new",
      customer: { name, business, email, whatsapp },
      templateId, requirements: block("Customisation requirements", "Additional message"), note,
      history: [{ status: "new", at: now, note: "Imported from a pasted WhatsApp message" }]
    };
  }

  function createAdapter() {
    const base = window.KT_API && window.KT_API.baseUrl;
    return base ? new HttpAdapter(base) : new PreviewAdapter();
  }

  return { STATUSES, STATUS_IDS, createAdapter, parseWhatsAppOrder };
})();
