(function () {
  "use strict";

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // Contact form -> sent directly via FormSubmit (formsubmit.co), no email client involved
  var form = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nome = form.nome.value.trim();
      var email = form.email.value.trim();
      var mensagem = form.mensagem.value.trim();

      if (!nome || !email || !mensagem) {
        formNote.textContent = "Preencha nome, e-mail e mensagem antes de enviar.";
        return;
      }

      var area = form.area.value;
      form.querySelector('[name="_subject"]').value = "Contato pelo site — " + area;

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      formNote.textContent = "Enviando...";

      var ajaxAction = form.action.replace("formsubmit.co/", "formsubmit.co/ajax/");

      fetch(ajaxAction, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) { throw new Error("request failed"); }
          formNote.textContent = "Mensagem enviada com sucesso! Retornaremos em breve.";
          form.reset();
        })
        .catch(function () {
          formNote.textContent = "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.";
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }

  // Header shadow on scroll
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.style.boxShadow = window.scrollY > 8 ? "0 6px 20px -12px rgba(0,0,0,0.25)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
