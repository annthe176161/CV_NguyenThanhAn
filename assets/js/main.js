(() => {
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const langToggle = document.getElementById("langToggle");
  const langLabel = document.getElementById("langLabel");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const toastEl = document.getElementById("toast");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Theme Toggle (Light / Dark) ---------- */
  const savedTheme = localStorage.getItem("cv_theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    htmlEl.setAttribute("data-theme", savedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    htmlEl.setAttribute("data-theme", "dark");
  }

  themeToggle?.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-theme", next);
    localStorage.setItem("cv_theme", next);
  });

  /* ---------- Mobile Menu ---------- */
  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Toast Helper ---------- */
  let toastTimer;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("show");
    }, 2200);
  }

  /* ---------- Copy Email / Phone ---------- */
  document.querySelectorAll(".copy-chip").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        const lang = htmlEl.getAttribute("lang") || "en";
        showToast(lang === "vi" ? `Đã sao chép: ${value}` : `Copied: ${value}`);
      } catch {
        showToast(value);
      }
    });
  });

  /* ---------- Scroll Reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Bilingual Support (EN / VI) ---------- */
  const translations = {
    en: {
      nav_about: "About",
      nav_skills: "Skills",
      nav_experience: "Experience",
      nav_projects: "Projects",
      nav_education: "Education",
      nav_contact: "Contact",
      btn_download_cv_short: "Download CV",
      btn_download_cv: "Download CV (PDF)",
      btn_view_pdf: "Preview PDF",
      btn_contact: "Contact Me",
      btn_source_code: "Source Code",
      hero_badge: "Open to Fullstack Developer Opportunities",
      hero_greeting: "Hi, I'm",
      hero_objective:
        "Fullstack Software Developer driven by curiosity, self-directed exploration, and a passion for building practical software that solves real-world operational problems. With hands-on experience spanning enterprise Microservices (.NET 8, ABP Framework, SQL Server) and Web/Mobile applications (React, Angular, Flutter/Dart), I enjoy diving into business workflows, learning new technologies independently, and turning complex requirements into reliable, impactful software.",
      meta_focus: "Primary Focus",
      meta_education: "Education",
      meta_location: "Location",
      skills_eyebrow: "Tech Stack",
      skills_title: "Technical Skills",
      skill_cat_lang: "Programming Languages",
      skill_cat_backend: "Backend Development",
      skill_cat_mobile: "Mobile & Frontend",
      skill_cat_tools: "Database & Tools",
      exp_eyebrow: "Career Journey",
      exp_title: "Work Experience",
      exp_tinduc_proj:
        "Project: Road Fee Collection & Vehicle Inspection Management System (Vietnam Register - Cục Đăng Kiểm Việt Nam).",
      proj_eyebrow: "Featured Work",
      proj_title: "Projects",
      proj_team: "Team of 5 members",
      proj_overview:
        "Built a real-world factory management system for KIP Factory in Son Tay, Hanoi to digitize incident reporting, maintenance requests, spare part management, and approval workflows.",
      proj_resp_title: "Key Responsibilities",
      edu_eyebrow: "Academic Background",
      edu_title: "Education",
      edu_major: "Major: Software Engineering",
      edu_award_label: "Honors",
      edu_award_val: "30% Scholarship · Very Good Student (Fall 2023, Summer 2025)",
      contact_eyebrow: "Get In Touch",
      contact_title: "Let's Connect",
      contact_desc:
        "I'm actively looking for a Fullstack Developer position. Feel free to reach out via email, phone, or download my CV below.",
      contact_phone: "Phone",
      footer_role: "Fullstack Software Developer",
      back_to_top: "Back to top ↑"
    },
    vi: {
      nav_about: "Giới thiệu",
      nav_skills: "Kỹ năng",
      nav_experience: "Kinh nghiệm",
      nav_projects: "Dự án",
      nav_education: "Học vấn",
      nav_contact: "Liên hệ",
      btn_download_cv_short: "Tải CV",
      btn_download_cv: "Tải xuống CV (PDF)",
      btn_view_pdf: "Xem bản PDF",
      btn_contact: "Liên hệ",
      btn_source_code: "Mã nguồn",
      hero_badge: "Sẵn sàng cho vị trí Fullstack Developer",
      hero_greeting: "Xin chào, mình là",
      hero_objective:
        "Lập trình viên Fullstack có tinh thần chủ động tìm tòi, yêu thích tự khám phá công nghệ mới và trực tiếp xây dựng phần mềm để giải quyết các bài toán vận hành thực tế. Với kinh nghiệm thực chiến từ hệ thống Microservices doanh nghiệp (.NET 8, ABP Framework, SQL Server) đến ứng dụng Web/Mobile (React, Angular, Flutter/Dart), mình luôn hứng thú phân tích quy trình nghiệp vụ và biến ý tưởng thành sản phẩm chạy ổn định, mang lại giá trị rõ ràng cho người dùng.",
      meta_focus: "Định hướng chính",
      meta_education: "Học vấn",
      meta_location: "Địa điểm",
      skills_eyebrow: "Công nghệ sử dụng",
      skills_title: "Kỹ năng chuyên môn",
      skill_cat_lang: "Ngôn ngữ lập trình",
      skill_cat_backend: "Phát triển Backend",
      skill_cat_mobile: "Mobile & Frontend",
      skill_cat_tools: "Cơ sở dữ liệu & Công cụ",
      exp_eyebrow: "Quá trình làm việc",
      exp_title: "Kinh nghiệm làm việc",
      exp_tinduc_proj:
        "Dự án: Hệ thống Quản lý Đăng kiểm & Thu phí đường bộ (Cục Đăng Kiểm Việt Nam).",
      proj_eyebrow: "Dự án nổi bật",
      proj_title: "Dự án",
      proj_team: "Nhóm 5 thành viên",
      proj_overview:
        "Xây dựng hệ thống quản lý sự cố và bảo trì thực tế cho Nhà máy KIP tại Sơn Tây, Hà Nội nhằm số hóa quy trình báo cáo sự cố, yêu cầu bảo trì, quản lý linh kiện và phê duyệt.",
      proj_resp_title: "Trách nhiệm chính",
      edu_eyebrow: "Nền tảng học vấn",
      edu_title: "Học vấn",
      edu_major: "Chuyên ngành: Kỹ thuật Phần mềm (Software Engineering)",
      edu_award_label: "Thành tích",
      edu_award_val: "Học bổng 30% ĐH FPT · Sinh viên Giỏi (Fall 2023, Summer 2025)",
      contact_eyebrow: "Kết nối",
      contact_title: "Liên hệ với mình",
      contact_desc:
        "Mình đang tìm kiếm cơ hội ở vị trí Fullstack Developer. Anh/chị nhà tuyển dụng có thể liên hệ qua email, số điện thoại hoặc tải trực tiếp CV PDF bên dưới.",
      contact_phone: "Điện thoại",
      footer_role: "Lập trình viên Fullstack",
      back_to_top: "Về đầu trang ↑"
    }
  };

  const listTranslations = {
    en: {
      exp_tinduc: [
        "Developed and maintained backend services using <strong>ASP.NET Core 8</strong> and <strong>ABP Framework</strong> within a <strong>Microservices architecture</strong>, focusing on the Road Fee Collection (Thu phí đường bộ) service.",
        "Implemented core business logic for fee receipts (Biên lai thu phí), fee calculation, refunds/adjustments, and approval/status workflows.",
        "Worked with <strong>SQL Server</strong> and <strong>Stored Procedures</strong> to handle large-scale datasets, reporting, and data synchronization.",
        "Integrated third-party APIs (<strong>MISA</strong> e-invoice/accounting system) and internal services (<strong>Identity/OpenIddict</strong>, File Management, Digital Signature, <strong>VietQR</strong>) to synchronize data and support end-to-end business workflows.",
        "Collaborated directly with enterprise customers and the internal team to gather requirements, investigate production issues, and deliver features on schedule."
      ],
      exp_rnd: [
        "Developed and maintained an <strong>enterprise ERP system</strong> and two <strong>Flutter/Dart mobile applications</strong> for elevator maintenance, repair, and IoT operations.",
        "Studied business processes, system documentation, data flows, and project structure before implementing features and resolving real-world issues.",
        "Developed mobile features based on business workflows and user roles, integrated RESTful APIs, and processed API data on the client side.",
        "Worked with dynamic data and configurations from the Web/ERP system, handling business logic, validation, filtering, workflows, and large datasets, while implementing business-specific configurations based on dynamic data.",
        "Collaborated with the Technical Lead and team members to investigate issues, review implementations, and deliver features for enterprise customers."
      ],
      exp_fsoft: [
        "Under mentor guidance, developed foundational knowledge of <strong>ASP.NET</strong> and <strong>Angular</strong>, contributed to project documentation, and assisted with test case preparation throughout the internship."
      ],
      proj_resp: [
        "Developed backend RESTful APIs and core business logic using <strong>ASP.NET Core Web API</strong>, <strong>Entity Framework Core</strong>, and <strong>SQL Server</strong>.",
        "Implemented <strong>JWT authentication</strong>, role-based authorization, and <strong>Azure Blob Storage</strong> integration."
      ]
    },
    vi: {
      exp_tinduc: [
        "Phát triển và bảo trì các dịch vụ backend sử dụng <strong>ASP.NET Core 8</strong> và <strong>ABP Framework</strong> theo kiến trúc <strong>Microservices</strong>, tập trung vào dịch vụ Thu phí đường bộ.",
        "Triển khai nghiệp vụ cốt lõi cho Biên lai thu phí, tính phí, hoàn/điều chỉnh phí và quy trình phê duyệt/trạng thái.",
        "Làm việc với <strong>SQL Server</strong> và <strong>Stored Procedures</strong> để xử lý tập dữ liệu lớn, báo cáo và đồng bộ dữ liệu.",
        "Tích hợp API bên thứ ba (hệ thống hóa đơn điện tử/kế toán <strong>MISA</strong>) và các dịch vụ nội bộ (<strong>Identity/OpenIddict</strong>, Quản lý tệp, Chữ ký số, <strong>VietQR</strong>) để đồng bộ dữ liệu và hỗ trợ luồng nghiệp vụ đầu-cuối.",
        "Phối hợp trực tiếp với khách hàng doanh nghiệp và đội ngũ nội bộ để tiếp nhận yêu cầu, điều tra sự cố production và bàn giao tính năng đúng tiến độ."
      ],
      exp_rnd: [
        "Phát triển và bảo trì <strong>hệ thống ERP doanh nghiệp</strong> cùng hai <strong>ứng dụng di động Flutter/Dart</strong> phục vụ bảo trì, sửa chữa thang máy và vận hành IoT.",
        "Tìm hiểu quy trình nghiệp vụ, tài liệu hệ thống, luồng dữ liệu và cấu trúc dự án trước khi triển khai tính năng và xử lý sự cố thực tế.",
        "Phát triển tính năng mobile theo luồng nghiệp vụ và phân quyền người dùng, tích hợp RESTful APIs và xử lý dữ liệu API ở phía client.",
        "Làm việc với dữ liệu động và cấu hình từ hệ thống Web/ERP, xử lý business logic, validation, lọc dữ liệu, workflow và tập dữ liệu lớn, đồng thời triển khai cấu hình theo nghiệp vụ đặc thù.",
        "Phối hợp với Technical Lead và các thành viên trong nhóm để điều tra lỗi, review code và bàn giao tính năng cho khách hàng doanh nghiệp."
      ],
      exp_fsoft: [
        "Dưới sự hướng dẫn của mentor, xây dựng nền tảng kiến thức về <strong>ASP.NET</strong> và <strong>Angular</strong>, tham gia viết tài liệu dự án và hỗ trợ chuẩn bị test case trong suốt kỳ thực tập."
      ],
      proj_resp: [
        "Phát triển backend RESTful APIs và nghiệp vụ cốt lõi bằng <strong>ASP.NET Core Web API</strong>, <strong>Entity Framework Core</strong> và <strong>SQL Server</strong>.",
        "Triển khai xác thực <strong>JWT</strong>, phân quyền theo vai trò (role-based authorization) và tích hợp <strong>Azure Blob Storage</strong>."
      ]
    }
  };

  function applyLanguage(lang) {
    htmlEl.setAttribute("lang", lang);
    if (langLabel) langLabel.textContent = lang.toUpperCase();
    document.title =
      lang === "vi"
        ? "Nguyễn Thành An · Lập trình viên Fullstack"
        : "Nguyễn Thành An · Fullstack Developer";

    const dict = translations[lang] || translations.en;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    const listDict = listTranslations[lang] || listTranslations.en;
    document.querySelectorAll("[data-i18n-list]").forEach((ul) => {
      const key = ul.getAttribute("data-i18n-list");
      const items = listDict[key];
      if (Array.isArray(items)) {
        ul.innerHTML = items.map((html) => `<li>${html}</li>`).join("");
      }
    });

    localStorage.setItem("cv_lang", lang);
  }

  const savedLang = localStorage.getItem("cv_lang");
  if (savedLang === "vi" || savedLang === "en") {
    applyLanguage(savedLang);
  }

  langToggle?.addEventListener("click", () => {
    const current = htmlEl.getAttribute("lang") || "en";
    applyLanguage(current === "en" ? "vi" : "en");
  });
})();
