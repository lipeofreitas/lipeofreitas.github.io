const themeToggle = document.querySelector(".theme-toggle");
const languageToggle = document.querySelector(".language-toggle");
const backToTopButton = document.querySelector(".back-to-top");
const techStackPanel = document.querySelector(".tech-stack-panel");
const techStackToggle = document.querySelector(".tech-stack-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme = savedTheme ?? "dark";
const savedLanguage = localStorage.getItem("portfolio-language") ?? "en";

const translations = {
  en: {
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "theme.dark": "Dark",
    "theme.light": "Light",
    "hero.eyebrow": "Data engineering and analysis | BI | AI automation",
    "hero.title": "Turning operational data into clear business decisions.",
    "hero.text": "Portfolio focused on data analysis, dashboard design, SQL modeling, Power BI, and practical automation stacks.",
    "hero.viewProjects": "View projects",
    "hero.githubProfile": "GitHub profile",
    "focus.title": "Focus Areas",
    "focus.biTitle": "Business Intelligence",
    "focus.biText": "Power BI reports with executive, finance, and operations views.",
    "focus.analyticsTitle": "Data Engineering and Analysis",
    "focus.analyticsText": "SQL Server models, medallion architecture, and documented DAX logic.",
    "focus.aiTitle": "AI and Automation",
    "focus.aiText": "Workflow automation and applied AI to reduce repetitive work.",
    "about.kicker": "About",
    "about.title": "Professional analysis focused on results and client-oriented solutions.",
    "about.text": "I build data analysis projects that connect modeling, reporting, and business interpretation. My work prioritizes clean data layers, clear indicator (KPI) definitions, practical dashboards, and documentation that is easy to review.",
    "about.stackTitle": "Tech Stack",
    "about.stackMore": "See more!",
    "about.stackLess": "See less!",
    "projects.kicker": "Portfolio Highlights",
    "projects.title": "Featured analytics, BI, and automation projects",
    "projects.text": "Selected data analysis, BI, automation, and AI projects. More case studies will be added here as they are published.",
    "project.live": "Live dashboard",
    "project.openReport": "Open report",
    "project.githubRepo": "GitHub repo",
    "project.soon": "(soon)",
    "project.whatShows": "What it shows",
    "project.show1": "Executive overview for revenue, orders, AOV, OTIF proxy, and cancellation.",
    "project.show2": "Finance view for payment mix, payment gap, rolling trends, and revenue Pareto.",
    "project.show3": "Operations view for on-time delivery, OTIF proxy, delivery days, and ABC analysis.",
    "project.scope": "Technical scope",
    "project.scope1": "Bronze, Silver, and Gold SQL Server layers.",
    "project.scope2": "Power BI semantic model with PBIP/TMDL source control.",
    "project.scope3": "Documented KPI definitions, thresholds, and data limitations.",
    "widget.label": "Live widget",
    "widget.title": "Portfolio Visitor Data Analysis Widget",
    "widget.openApi": "Open API",
    "widget.previewLabel": "Anonymous portfolio tracking",
    "widget.previewCount": "04 unique visitors",
    "widget.show1": "Anonymous unique visits for the portfolio site.",
    "widget.show2": "Top visitor countries as a compact public summary.",
    "widget.scope1": "Cloudflare Worker API with D1 persistence.",
    "widget.scope2": "Frontend widget designed for GitHub Pages and future website reuse.",
    "widget.scope3": "No raw IP storage; stable anonymous browser identifier.",
    "contactWidget.title": "Upcoming Contact Intake Widget for Websites",
    "contactWidget.previewLabel": "Project inquiry form",
    "contactWidget.focus1": "Contact form for project inquiries without exposing a personal email.",
    "contactWidget.focus2": "Simple, privacy-conscious intake flow for static websites.",
    "contactWidget.stack1": "GitHub Pages, Cloudflare Workers, D1, and optional Turnstile.",
    "contactWidget.stack2": "Store inquiries first, then add email or workflow notifications.",
    "project.upcoming": "Upcoming project",
    "project.upcomingAi": "Upcoming AI Agent Project...",
    "project.inPlanning": "In planning",
    "project.plannedFocus": "Planned focus",
    "project.aiFocus1": "AI agent workflow for CRM lead intake, qualification, and follow-up.",
    "project.aiFocus2": "Chatbot-assisted interactions connected to structured business processes.",
    "project.expectedStack": "Expected stack",
    "project.aiStack1": "Python, n8n, APIs, AI agents, and chatbots.",
    "project.aiStack2": "CRM-style lead routing, workflow automation, and documented business logic.",
    "project.upcomingQual": "Upcoming Qualitative Analysis...",
    "project.qualFocus1": "Qualitative data synthesis from interviews, notes, or open-text responses.",
    "project.qualFocus2": "Themes, sentiment, prioritization, and executive-ready findings.",
    "project.qualStack1": "Python, structured analysis, Power BI, and AI-assisted summarization.",
    "project.qualStack2": "Clear methodology, assumptions, and repeatable outputs.",
    "process.kicker": "Project Pattern",
    "process.title": "From raw data to business-facing decisions.",
    "process.breakdown": "Breakdown",
    "process.breakdownText": "Clarify the idea, define business questions, and plan the process end to end.",
    "process.ingest": "Ingest",
    "process.ingestText": "Load raw data into databases for preparation, or directly into Power BI when the use case is lighter.",
    "process.model": "Model",
    "process.modelText": "Model with practical frameworks, medallion layers, and ETL/ELT tuning for reliable outputs.",
    "process.analyze": "Analyze",
    "process.analyzeText": "Develop formulas, indicators (KPIs), Pareto, ABC analysis, hypotheses, and probability-driven reviews.",
    "process.publish": "Publish",
    "process.publishText": "Publish reports, workflows, embedded widgets, versions, and documentation in GitHub using professional market practices.",
    "contact.kicker": "Contact",
    "contact.title": "Let's connect around data analysis, BI, and automation.",
    "contact.github": "View GitHub",
    "footer.tagline": "Data analysis | BI | AI automation",
    "footer.analytics": "Data analysis",
    "footer.automation": "Automation",
    "backToTop": "Back to top",
  },
  pt: {
    "nav.about": "Sobre",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",
    "theme.dark": "Escuro",
    "theme.light": "Claro",
    "hero.eyebrow": "Engenharia de dados e análise | BI | Automação com IA",
    "hero.title": "Transformando dados operacionais em decisões de negócio claras.",
    "hero.text": "Portfólio focado em análise de dados, design de dashboards, modelagem SQL, Power BI e stacks práticas de automação.",
    "hero.viewProjects": "Ver projetos",
    "hero.githubProfile": "Perfil GitHub",
    "focus.title": "Áreas de Foco",
    "focus.biTitle": "Business Intelligence",
    "focus.biText": "Relatórios Power BI com visões executiva, financeira e operacional.",
    "focus.analyticsTitle": "Engenharia de Dados e Análise",
    "focus.analyticsText": "Modelos em SQL Server, arquitetura medallion e lógica DAX documentada.",
    "focus.aiTitle": "IA e Automação",
    "focus.aiText": "Automação de fluxos e IA aplicada para reduzir trabalho repetitivo.",
    "about.kicker": "Sobre",
    "about.title": "Análise profissional com foco no resultado e solução orientada ao cliente.",
    "about.text": "Eu construo projetos de análise de dados que conectam modelagem, relatórios e interpretação de negócio. Meu trabalho prioriza camadas de dados limpas, definições claras de indicadores (KPIs), dashboards práticos e documentação fácil de revisar.",
    "about.stackTitle": "Stack Técnica",
    "about.stackMore": "Ver mais!",
    "about.stackLess": "Ver menos!",
    "projects.kicker": "Destaques do Portfólio",
    "projects.title": "Projetos em destaque de análise de dados, BI e automação",
    "projects.text": "Projetos selecionados de análise de dados, BI, automação e IA. Novos estudos de caso serão adicionados aqui conforme forem publicados.",
    "project.live": "Dashboard publicado",
    "project.openReport": "Abrir relatório",
    "project.githubRepo": "Repo GitHub",
    "project.soon": "(em breve)",
    "project.whatShows": "O que mostra",
    "project.show1": "Visão executiva de receita, pedidos, AOV, OTIF proxy e cancelamento.",
    "project.show2": "Visão financeira para mix de pagamento, payment gap, tendências móveis e Pareto de receita.",
    "project.show3": "Visão operacional para entrega no prazo, OTIF proxy, dias de entrega e análise ABC.",
    "project.scope": "Escopo técnico",
    "project.scope1": "Camadas Bronze, Silver e Gold no SQL Server.",
    "project.scope2": "Modelo semântico Power BI com versionamento PBIP/TMDL.",
    "project.scope3": "Definições de indicadores (KPIs), limites de referência e limitações dos dados documentados.",
    "widget.label": "Widget publicado",
    "widget.title": "Widget de Análise de Visitantes",
    "widget.openApi": "Abrir API",
    "widget.previewLabel": "Tracking anônimo do portfólio",
    "widget.previewCount": "04 Visitantes únicos",
    "widget.show1": "Visitas únicas anônimas no site do portfólio.",
    "widget.show2": "Principais países visitantes em um resumo público compacto.",
    "widget.scope1": "API em Cloudflare Worker com persistência em D1.",
    "widget.scope2": "Widget frontend desenhado para GitHub Pages e reuso em site futuro.",
    "widget.scope3": "Sem armazenar IP bruto; identificador anônimo estável por navegador.",
    "contactWidget.title": "Widget de Intake de Contato para Websites",
    "contactWidget.previewLabel": "Formulário de projeto",
    "contactWidget.focus1": "Formulário para propostas de projeto sem expor email pessoal.",
    "contactWidget.focus2": "Fluxo simples e consciente de privacidade para sites estáticos.",
    "contactWidget.stack1": "GitHub Pages, Cloudflare Workers, D1 e Turnstile opcional.",
    "contactWidget.stack2": "Salvar contatos primeiro, depois adicionar email ou notificações de workflow.",
    "project.upcoming": "Projeto futuro",
    "project.upcomingAi": "Projeto de AI Agent em breve...",
    "project.inPlanning": "Em planejamento",
    "project.plannedFocus": "Foco planejado",
    "project.aiFocus1": "Workflow com agente de IA para entrada, qualificação e follow-up de leads em CRM.",
    "project.aiFocus2": "Interações assistidas por chatbot conectadas a processos de negócio estruturados.",
    "project.expectedStack": "Stack esperada",
    "project.aiStack1": "Python, n8n, APIs, AI agents e chatbots.",
    "project.aiStack2": "Roteamento de leads em estilo CRM, automação de workflows e lógica de negócio documentada.",
    "project.upcomingQual": "Análise Qualitativa em breve...",
    "project.qualFocus1": "Síntese de dados qualitativos a partir de entrevistas, notas ou respostas abertas.",
    "project.qualFocus2": "Temas, sentimento, priorização e achados prontos para apresentação executiva.",
    "project.qualStack1": "Python, análise estruturada, Power BI e sumarização assistida por IA.",
    "project.qualStack2": "Metodologia clara, premissas e saídas repetíveis.",
    "process.kicker": "Padrão do Projeto",
    "process.title": "De dados brutos a decisões de negócio.",
    "process.breakdown": "Breakdown",
    "process.breakdownText": "Visualizar a ideia, definir perguntas de negócio e planejar o processo do início ao fim.",
    "process.ingest": "Ingestão",
    "process.ingestText": "Carregar dados brutos em bancos para preparação, ou direto no Power BI quando o caso for mais simples.",
    "process.model": "Modelagem",
    "process.modelText": "Modelar com frameworks práticos, camadas medallion e ajustes de ETL/ELT para saídas confiáveis.",
    "process.analyze": "Análise",
    "process.analyzeText": "Desenvolver fórmulas, indicadores (KPIs), Pareto, ABC, hipóteses e análises orientadas por probabilidade.",
    "process.publish": "Publicação",
    "process.publishText": "Publicar relatórios, workflows, widgets embarcados, versões e documentação dentro do GitHub utilizando adaptação do mercado profissional.",
    "contact.kicker": "Contato",
    "contact.title": "Vamos conversar sobre análise de dados, BI e automação.",
    "contact.github": "Ver GitHub",
    "footer.tagline": "Análise de dados | BI | Automação com IA",
    "footer.analytics": "Análise de dados",
    "footer.automation": "Automação",
    "backToTop": "Voltar ao topo",
  },
};

const setLanguage = (language) => {
  const dictionary = translations[language] ?? translations.en;
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  document.documentElement.dataset.language = language;
  localStorage.setItem("portfolio-language", language);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });

  if (languageToggle) {
    languageToggle.classList.toggle("is-pt", language === "pt");
    languageToggle.classList.toggle("is-en", language !== "pt");
    languageToggle.setAttribute("aria-pressed", language === "pt" ? "true" : "false");
    languageToggle.setAttribute("aria-label", language === "pt" ? "Switch to English" : "Mudar para português");
  }

  updateTechStackToggle();
  updateThemeToggle();
  window.refreshCarouselPreviews?.();
  window.FFVisitorWidget?.refreshLanguage?.();
};

const updateTechStackToggle = () => {
  if (!techStackPanel || !techStackToggle) return;

  const language = document.documentElement.dataset.language === "pt" ? "pt" : "en";
  const dictionary = translations[language] ?? translations.en;
  const isExpanded = techStackPanel.classList.contains("is-expanded");
  const label = isExpanded ? dictionary["about.stackLess"] : dictionary["about.stackMore"];

  techStackToggle.textContent = "";
  techStackToggle.title = label;
  techStackToggle.setAttribute("aria-label", label);
  techStackToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
};

const updateThemeToggle = () => {
  if (!themeToggle) return;

  const language = document.documentElement.dataset.language === "pt" ? "pt" : "en";
  const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  themeToggle.classList.toggle("is-light", theme === "light");
  themeToggle.classList.toggle("is-dark", theme === "dark");
  themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
};

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  updateThemeToggle();
};

setTheme(initialTheme);
setLanguage(savedLanguage);

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

languageToggle?.addEventListener("click", () => {
  const currentLanguage = document.documentElement.dataset.language === "pt" ? "pt" : "en";
  setLanguage(currentLanguage === "pt" ? "en" : "pt");
});

techStackToggle?.addEventListener("click", () => {
  techStackPanel?.classList.toggle("is-expanded");
  updateTechStackToggle();
});

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isCurrent);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" },
);

sections.forEach((section) => observer.observe(section));

const carousel = document.querySelector(".project-carousel");

if (carousel) {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dots = Array.from(carousel.querySelectorAll(".carousel-dots button"));
  const previousButton = carousel.querySelector(".carousel-button.previous");
  const nextButton = carousel.querySelector(".carousel-button.next");
  let activeIndex = 0;

  const updateButtonPreview = (button, slide) => {
    const preview = button?.querySelector(".carousel-button-preview");
    if (!preview || !slide) return;

    preview.querySelector("small").textContent = slide.querySelector(".project-label")?.textContent ?? "Project";
    preview.querySelector("strong").textContent = slide.querySelector("h3")?.textContent ?? "";
  };

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    const previousIndex = (activeIndex - 1 + slides.length) % slides.length;
    const nextIndex = (activeIndex + 1) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
      slide.classList.toggle("is-previous", slideIndex === previousIndex);
      slide.classList.toggle("is-next", slideIndex === nextIndex);
      slide.setAttribute("aria-hidden", slideIndex === activeIndex ? "false" : "true");
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });

    updateButtonPreview(previousButton, slides[previousIndex]);
    updateButtonPreview(nextButton, slides[nextIndex]);
  };

  previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => showSlide(activeIndex + 1));

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => showSlide(dotIndex));
  });

  window.refreshCarouselPreviews = () => showSlide(activeIndex);

  showSlide(0);
}
