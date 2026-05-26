const DEFAULT_CONFIG = {
  apiUrl: "https://portfolio-contact-intake-api.lipeofreitas.workers.dev",
  siteId: "portfolio"
};

const LABELS = {
  en: {
    name: "Name",
    email: "Email",
    inquiryType: "Inquiry type",
    project: "Project inquiry",
    consulting: "Consulting",
    collaboration: "Collaboration",
    other: "Other",
    message: "Message",
    company: "Company",
    consent: "I agree to be contacted back about this inquiry.",
    submit: "Send inquiry",
    success: "Thanks. Your inquiry was sent successfully.",
    genericError: "Unable to send inquiry."
  },
  pt: {
    name: "Nome",
    email: "Email",
    inquiryType: "Tipo de contato",
    project: "Proposta de projeto",
    consulting: "Consultoria",
    collaboration: "Colaboração",
    other: "Outro",
    message: "Mensagem",
    company: "Empresa",
    consent: "Concordo em ser contatado de volta sobre esta solicitação.",
    submit: "Enviar contato",
    success: "Obrigado. Sua mensagem foi enviada com sucesso.",
    genericError: "Não foi possível enviar a mensagem."
  }
};

export function mountContactForm(selector, options = {}) {
  const container = typeof selector === "string"
    ? document.querySelector(selector)
    : selector;

  if (!container) {
    throw new Error("Contact form container not found");
  }

  const config = {
    ...DEFAULT_CONFIG,
    ...options
  };

  const getLanguage = () => document.documentElement.dataset.language === "pt" ? "pt" : "en";
  container.innerHTML = renderForm(getLanguage());

  const form = container.querySelector("[data-contact-form]");
  const status = container.querySelector("[data-contact-status]");
  const submitButton = container.querySelector("button[type='submit']");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(status, "", "");
    submitButton.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(`${config.apiUrl}/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          siteId: config.siteId,
          name: formData.get("name"),
          email: formData.get("email"),
          inquiryType: formData.get("inquiryType"),
          message: formData.get("message"),
          consent: formData.get("consent") === "on",
          company: formData.get("company"),
          sourcePage: window.location.href
        })
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Unable to send inquiry");
      }

      form.reset();
      setStatus(status, LABELS[getLanguage()].success, "success");
    } catch (error) {
      setStatus(status, error.message || LABELS[getLanguage()].genericError, "error");
    } finally {
      submitButton.disabled = false;
    }
  });

  window.addEventListener("portfolio-language-change", (event) => {
    updateLabels(form, event.detail?.language === "pt" ? "pt" : "en");
  });
}

function renderForm(language) {
  const labels = LABELS[language] ?? LABELS.en;

  return `
    <form class="ff-contact-form" data-contact-form>
      <label>
        <span data-contact-label="name">${labels.name}</span>
        <input name="name" type="text" autocomplete="name" minlength="2" maxlength="120" required />
      </label>

      <label>
        <span data-contact-label="email">${labels.email}</span>
        <input name="email" type="email" autocomplete="email" maxlength="254" required />
      </label>

      <label>
        <span data-contact-label="inquiryType">${labels.inquiryType}</span>
        <select name="inquiryType" required>
          <option value="project" data-contact-label="project">${labels.project}</option>
          <option value="consulting" data-contact-label="consulting">${labels.consulting}</option>
          <option value="collaboration" data-contact-label="collaboration">${labels.collaboration}</option>
          <option value="other" data-contact-label="other">${labels.other}</option>
        </select>
      </label>

      <label>
        <span data-contact-label="message">${labels.message}</span>
        <textarea name="message" minlength="20" maxlength="2000" required></textarea>
      </label>

      <label class="ff-contact-form__honeypot">
        <span data-contact-label="company">${labels.company}</span>
        <input name="company" type="text" tabindex="-1" autocomplete="off" />
      </label>

      <label class="ff-contact-form__consent">
        <input name="consent" type="checkbox" required />
        <span data-contact-label="consent">${labels.consent}</span>
      </label>

      <button type="submit" data-contact-label="submit">${labels.submit}</button>
      <div class="ff-contact-form__status" data-contact-status role="status" aria-live="polite"></div>
    </form>
  `;
}

function updateLabels(form, language) {
  const labels = LABELS[language] ?? LABELS.en;

  form.querySelectorAll("[data-contact-label]").forEach((element) => {
    const key = element.dataset.contactLabel;
    if (labels[key]) element.textContent = labels[key];
  });
}

function setStatus(element, message, type) {
  element.textContent = message;
  element.classList.toggle("is-error", type === "error");
  element.classList.toggle("is-success", type === "success");
}
