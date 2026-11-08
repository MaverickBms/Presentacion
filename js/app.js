(() => {
  "use strict";

  /* ============================================================
     UTILIDADES DE RENDER
     ============================================================ */
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  const codeCard = code => `<div class="code-card">
        <div class="code-head">
          <span class="code-title">PHP · EJEMPLO</span>
          <button class="copy-btn" type="button"><i class="ph ph-copy"></i> Copiar</button>
        </div>
        <pre class="language-php"><code class="language-php">${esc(code)}</code></pre>
      </div>`;

  const output = txt => `<div class="output-card"><h3>RESULTADO ESPERADO</h3><pre>${esc(txt)}</pre></div>`;

  const info = (title, body) => `<div class="info-card"><h3>${title}</h3>${body}</div>`;

  /* ============================================================
     RENDER DE CONTENIDO POR TIPO DE SLIDE
     ============================================================ */
  function renderSlideContent(s) {
    if (s.type === "cover") return `<div class="cover-grid">
          <div>
            <div class="kicker">${s.kicker}</div>
            <h1>${s.title}</h1>
            <p class="cover-sub">${s.subtitle}</p>
            <div class="tag-row">${s.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
            <div class="start-hint"><kbd>→</kbd> COMENZAR PRESENTACIÓN <span>·</span> ${SLIDES.length} DIAPOSITIVAS</div>
          </div>
          <div class="hero-art">
            <div class="orbit"></div>
            <div class="code-window">
              <div class="window-bar"><span class="window-dot"></span><span class="window-dot"></span><span class="window-dot"></span><span class="window-name">functions.php</span></div>
              <div class="fake-code"><span class="c">&lt;?php</span><br><span class="f">array_filter</span>($records, <span class="s">fn</span>($item) =&gt;<br>&nbsp;&nbsp;$item[<span class="s">'active'</span>]);<br><br><span class="f">password_hash</span>($password,<br>&nbsp;&nbsp;<span class="s">PASSWORD_DEFAULT</span>);<br><span class="c">// datos claros. decisiones seguras.</span></div>
            </div>
            <div class="float-chip chip-one">01 / ARRAYS</div>
            <div class="float-chip chip-two">PHP 8.x · NATIVE API</div>
          </div>
        </div>`;

    if (s.type === "overview") return `<div class="kicker">01 — CONTEXTO</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="overview-grid">${s.cards.map(c => `<div class="overview-card"><div class="card-icon"><i class="${c[3]}"></i></div><div><span class="number">${c[0]}</span><h3>${c[1]}</h3><p>${c[2]}</p></div></div>`).join("")}</div>`;

    if (s.type === "principles") return `<div class="kicker">02 — MÉTODO</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="principles-grid">${s.principles.map(p => `<div class="principle"><i class="${p[2]}"></i><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join("")}</div>
          <div class="callout">${s.callout}</div>`;

    if (s.type === "function") return `<div class="section-head"><div><span class="badge">${s.badge}</span><h2>${s.title}</h2></div><i class="${s.icon}" style="font-size:34px;color:var(--cyan);padding:12px;border:1px solid var(--line);border-radius:12px"></i></div>
          <div class="function-layout">
            <div class="function-info">
              ${info("¿QUÉ ES?", `<p>${s.definition}</p>`)}
              ${info("¿PARA QUÉ SIRVE?", `<ul>${s.purpose.map(x => `<li>${x}</li>`).join("")}</ul>`)}
              ${info("SINTAXIS", `<div class="syntax">${esc(s.syntax)}</div>`)}
              ${info("PARÁMETROS", `<div class="param-list">${s.params.map(p => `<div class="param"><code>${esc(p[0])}</code><span>${p[1]}</span></div>`).join("")}</div>`)}
              ${info("VALOR DE RETORNO", `<p>${s.returns}</p>`)}
            </div>
            <div class="code-column">
              ${codeCard(s.code)}
              ${output(s.output)}
              <div class="insight"><strong>LECTURA DEL EJEMPLO</strong>${s.insight}</div>
              <div class="caution"><strong>PRECAUCIÓN TÉCNICA</strong>${s.caution}</div>
            </div>
          </div>`;

    if (s.type === "sim-array-keys") return `<div class="kicker">LABORATORIO · ARRAYS</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="lab-layout">
            <div class="lab-card"><h3>Campos recibidos</h3><p>Escribe las claves separadas por comas.</p>
              <label class="field-label" for="labInput">CLAVES DEL PAYLOAD</label>
              <input class="field" id="labInput" data-labtype="keys" value="email, role" aria-label="Claves del payload separadas por comas">
              <button class="primary-btn" id="labRun" style="margin-top:12px">Obtener claves</button>
            </div>
            <div class="lab-card"><div class="result-label">SALIDA CONCEPTUAL</div><div class="result-box" id="labResult">Pulsa «Obtener claves» para simular el resultado.</div></div>
          </div>`;

    if (s.type === "sim-key-exists") return `<div class="kicker">LABORATORIO · PRESENCIA</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="lab-layout">
            <div class="lab-card"><h3>Estado de la clave «telefono»</h3><p>Elige un caso para comparar presencia y valor.</p>
              <div class="lab-controls">
                <button class="choice" data-lab="missing" aria-pressed="false">Ausente</button>
                <button class="choice" data-lab="null" aria-pressed="false">Presente: null</button>
                <button class="choice" data-lab="zero" aria-pressed="false">Presente: 0</button>
              </div>
            </div>
            <div class="lab-card"><div class="result-label">RESULTADO</div><div class="result-box" id="labResult">Selecciona un caso.</div></div>
          </div>`;

    if (s.type === "sim-column") return `<div class="kicker">LABORATORIO · EXTRACCIÓN</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="lab-layout">
            <div class="lab-card"><h3>Registros de usuarios</h3>
              <div class="result-box">[{id:1, nombre:"Ana", correo:"ana@ejemplo.com"}]
[{id:2, nombre:"Luis", correo:"luis@ejemplo.com"}]
[{id:3, nombre:"Marta", correo:"marta@ejemplo.com"}]</div>
              <label class="field-label" for="columnSelect">COLUMNA A EXTRAER</label>
              <select id="columnSelect" class="field"><option value="nombre">nombre</option><option value="correo">correo</option><option value="id">id</option></select>
            </div>
            <div class="lab-card"><div class="result-label">ARRAY RESULTANTE</div><div class="result-box" id="labResult"></div></div>
          </div>`;

    if (s.type === "sim-filter") return `<div class="kicker">LABORATORIO · CALLBACK</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="lab-layout">
            <div class="lab-card"><h3>Array original</h3>
              <div class="data-pills">${[1,2,3,4,5,6].map(n => `<span class="data-pill">${n}</span>`).join("")}</div>
              <div class="result-label">CONDICIÓN DEL CALLBACK</div>
              <div class="lab-controls">
                <button class="choice active" data-lab="all" aria-pressed="true">Todos</button>
                <button class="choice" data-lab="even" aria-pressed="false">Pares</button>
                <button class="choice" data-lab="odd" aria-pressed="false">Impares</button>
              </div>
            </div>
            <div class="lab-card"><div class="result-label">ELEMENTOS CONSERVADOS · CLAVES ORIGINALES</div><div class="result-box" id="labResult">[0] =&gt; 1
[1] =&gt; 2
[2] =&gt; 3
[3] =&gt; 4
[4] =&gt; 5
[5] =&gt; 6</div></div>
          </div>`;

    if (s.type === "sim-null") return `<div class="kicker">LABORATORIO · VALORES</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="lab-layout">
            <div class="lab-card"><h3>Valor de la variable</h3>
              <label class="field-label" for="nullSelect">SELECCIONA UN VALOR</label>
              <select class="field" id="nullSelect">
                <option value="null">null</option>
                <option value="0">0</option>
                <option value="false">false</option>
                <option value="''">cadena vacía ('')</option>
                <option value="'texto'">cadena con texto</option>
              </select>
            </div>
            <div class="lab-card"><div class="result-label">COMPROBACIÓN</div><div class="result-box" id="labResult"></div></div>
          </div>`;

    if (s.type === "sim-file") return `<div class="kicker">LABORATORIO · PERSISTENCIA</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="lab-layout">
            <div class="lab-card"><h3>Operación de escritura</h3>
              <div class="lab-controls">
                <button class="choice active" data-lab="replace" aria-pressed="true">Sin flags</button>
                <button class="choice" data-lab="append" aria-pressed="false">FILE_APPEND</button>
              </div>
              <p>La simulación representa el efecto sobre el contenido previo del archivo.</p>
            </div>
            <div class="lab-card"><div class="result-label">ESTADO DEL ARCHIVO</div><div class="result-box" id="labResult">Antes: contenido anterior
Después: nuevo contenido

Sin FILE_APPEND, el contenido existente se reemplaza.</div></div>
          </div>`;

    if (s.type === "sim-email") return `<div class="kicker">LABORATORIO · VALIDACIÓN</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="lab-layout">
            <div class="lab-card"><h3>Entrada de usuario</h3>
              <label class="field-label" for="labInput">CORREO ELECTRÓNICO</label>
              <input class="field" id="labInput" data-labtype="email" type="email" placeholder="nombre@dominio.com">
              <button class="primary-btn" id="labRun" style="margin-top:12px">Comprobar formato</button>
            </div>
            <div class="lab-card"><div class="result-label">RESULTADO ILUSTRATIVO</div><div class="result-box" id="labResult">El resultado aparecerá aquí.</div></div>
          </div>`;

    if (s.type === "security-flow") return `<div class="kicker">CICLO DE AUTENTICACIÓN</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="security-flow">
            <div class="security-node">
              <div class="node-icon"><i class="ph ph-user-plus"></i></div>
              <span class="step-label">REGISTRO</span>
              <h3>password_hash()</h3>
              <p>Recibe la contraseña, genera un hash con sal aleatoria e información del algoritmo y coste.</p>
              <div class="result-box">Contraseña → hash almacenado</div>
            </div>
            <div class="security-arrow"><i class="ph ph-arrow-left-right"></i><span>ALMACENAMIENTO</span></div>
            <div class="security-node">
              <div class="node-icon"><i class="ph ph-fingerprint"></i></div>
              <span class="step-label">INICIO DE SESIÓN</span>
              <h3>password_verify()</h3>
              <p>Recibe la contraseña ingresada y el hash recuperado para comprobar si coinciden.</p>
              <div class="result-box">Entrada + hash → true / false</div>
            </div>
          </div>
          <div class="security-foot"><strong>Regla:</strong> el hash se almacena; la contraseña original no. No se descifra el hash y no se compara mediante igualdad simple.</div>`;

    if (s.type === "flow") return `<div class="kicker">SÍNTESIS · ESTRUCTURAS</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="flow-steps">${s.steps.map((x, i) => `<div class="flow-step"><span class="step-label">0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p><small>${x[2]}</small></div>`).join("")}</div>
          <div class="callout">${s.note}</div>`;

    if (s.type === "conclusion") return `<div class="kicker">CIERRE · CRITERIO PROFESIONAL</div><h2>${s.title}</h2>
          <div class="conclusion-grid">${s.groups.map(g => `<div class="conclusion-card"><span>${g[0]}</span><h3>${g[1]}</h3><p>${g[2]}</p></div>`).join("")}</div>
          <p class="final-line">${s.final}</p>`;

    if (s.type === "video") return `<div class="kicker">VIDEO · RECURSO</div><h2>${s.title}</h2><p class="lead">${s.lead}</p>
          <div class="video-frame">
            <video controls preload="metadata" src="assets/video/StickManvsCode.mp4"></video>
          </div>`;

    return `<h2>${esc(s.title)}</h2>`;
  }

  const shell = (s, body) => `<article class="slide" data-id="${esc(s.id)}"><div class="slide-content">${body}</div></article>`;

  /* ============================================================
     INTERACCIONES: toast, copiar, laboratorios
     ============================================================ */
  let toastTimer;
  function showToast(msg) {
    const t = document.querySelector("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 1700);
  }

  function copyButtons() {
    document.querySelectorAll(".copy-btn").forEach(b => {
      b.addEventListener("click", async () => {
        const code = b.closest(".code-card")?.querySelector("code")?.textContent ?? "";
        try {
          await navigator.clipboard.writeText(code);
          const original = b.innerHTML;
          b.innerHTML = '<i class="ph ph-check"></i> Copiado';
          b.classList.add("copied");
          showToast("Código copiado al portapapeles");
          setTimeout(() => { b.innerHTML = original; b.classList.remove("copied"); }, 1400);
        } catch {
          showToast("No se pudo acceder al portapapeles");
        }
      });
    });
  }

  function bindLabs() {
    const root = document.querySelector(".slide");
    if (!root) return;

    const setResult = v => {
      const el = root.querySelector("#labResult");
      if (el) el.textContent = v;
    };

    // Botones de laboratorio
    root.querySelectorAll("[data-lab]").forEach(btn => {
      btn.addEventListener("click", () => {
        root.querySelectorAll("[data-lab]").forEach(x => {
          x.classList.remove("active");
          x.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        const type = btn.dataset.lab;

        if (type === "all" || type === "even" || type === "odd") {
          const nums = [1, 2, 3, 4, 5, 6];
          const out = nums.filter(n => type === "all" || (type === "even" ? n % 2 === 0 : n % 2 !== 0));
          setResult(out.map(v => `[${nums.indexOf(v)}] => ${v}`).join("\n") || "Sin coincidencias");
        }
        if (type === "null") setResult("array_key_exists('telefono', $datos) → true\nis_null($datos['telefono']) → true");
        if (type === "missing") setResult("array_key_exists('telefono', $datos) → false\nLa clave no está presente.");
        if (type === "zero") setResult("array_key_exists('telefono', $datos) → true\nis_null($datos['telefono']) → false");
        if (type === "append") setResult("Antes: inicio\nDespués: inicio\n         nueva línea\n\nFILE_APPEND agrega contenido al final.");
        if (type === "replace") setResult("Antes: contenido anterior\nDespués: nuevo contenido\n\nSin FILE_APPEND, el contenido existente se reemplaza.");
      });
    });

    // Inputs con ejecución manual
    const field = root.querySelector("#labInput");
    const output = root.querySelector("#labResult");

    if (field && output && field.dataset.labtype === "email") {
      const run = () => {
        const v = field.value.trim();
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        output.textContent = v
          ? (ok ? "Formato aparentemente válido.\nPHP debe confirmarlo con FILTER_VALIDATE_EMAIL." : "Formato no válido según esta comprobación ilustrativa.")
          : "Escribe una dirección para comprobarla.";
      };
      root.querySelector("#labRun")?.addEventListener("click", run);
      field.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); run(); } });
    }

    if (field && output && field.dataset.labtype === "keys") {
      const run = () => {
        const keys = field.value.split(",").map(x => x.trim()).filter(Boolean);
        const required = ["email", "csrf_token"];
        const missing = required.filter(x => !keys.includes(x));
        output.textContent = `array_keys($payload) → [${keys.map(x => `"${x}"`).join(", ")}]\nCampos obligatorios: ${required.join(", ")}\nAusentes: ${missing.join(", ") || "ninguno"}`;
      };
      root.querySelector("#labRun")?.addEventListener("click", run);
      field.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); run(); } });
    }

    // Selects
    const columnSelect = root.querySelector("#columnSelect");
    if (columnSelect) {
      const rows = [
        { id: 1, nombre: "Ana", correo: "ana@ejemplo.com" },
        { id: 2, nombre: "Luis", correo: "luis@ejemplo.com" },
        { id: 3, nombre: "Marta", correo: "marta@ejemplo.com" }
      ];
      const update = () => {
        const key = columnSelect.value;
        setResult(rows.map(r => `[${r.id-1}] => ${r[key]}`).join("\n"));
      };
      columnSelect.addEventListener("change", update);
      update();
    }

    const nullSelect = root.querySelector("#nullSelect");
    if (nullSelect) {
      const update = () => {
        const v = nullSelect.value;
        setResult(`Valor seleccionado: ${v}\nis_null(valor) → ${v === "null" ? "true" : "false"}`);
      };
      nullSelect.addEventListener("change", update);
      update();
    }
  }

  /* ============================================================
     NAVEGACIÓN
     ============================================================ */
  let current = 0;
  let touchStart = null;

  const $ = sel => document.querySelector(sel);
  const stage = $("#slideStage");
  const counter = $("#slideCounter");
  const sectionLabel = $("#sectionLabel");
  const progressFill = $("#progressFill");
  const progressTrack = $("#progressTrack");

  function render() {
    const s = SLIDES[current];
    if (!s) return;

    stage.innerHTML = shell(s, renderSlideContent(s));
    sectionLabel.textContent = s.section;
    counter.innerHTML = `${String(current+1).padStart(2,"0")} <b>/</b> ${String(SLIDES.length).padStart(2,"0")}`;

    progressFill.style.width = `${((current+1) / SLIDES.length) * 100}%`;
    progressTrack.setAttribute("aria-valuemax", String(SLIDES.length));
    progressTrack.setAttribute("aria-valuenow", String(current+1));

    $("#prevBtn").disabled = current === 0;
    $("#nextBtn").disabled = current === SLIDES.length - 1;
    const nextSpan = $("#nextBtn").querySelector("span");
    const nextIcon = $("#nextBtn").querySelector("i");
    if (nextSpan) nextSpan.textContent = current === SLIDES.length - 1 ? "Final" : "Siguiente";
    if (nextIcon) nextIcon.className = current === SLIDES.length - 1 ? "ph ph-check" : "ph ph-arrow-right";

    // Highlight en TOC
    document.querySelectorAll(".toc-item").forEach((el, i) => {
      el.setAttribute("aria-current", i === current ? "true" : "false");
    });

    if (window.Prism) {
      try { Prism.highlightAllUnder(stage); } catch {}
    }
    window.bindInteractions?.();
    document.title = `${s.section} · ${s.title.replace(/<[^>]*>/g,"")} — PHP nativo`;

    const slideEl = stage.querySelector(".slide");
    if (slideEl) slideEl.scrollTo(0, 0);
  }

  function go(n) {
    if (n < 0 || n >= SLIDES.length || n === current) return;
    current = n;
    if (location.hash !== "#" + SLIDES[n].id) location.hash = SLIDES[n].id;
    render();
  }

  function buildToc() {
    const nav = $("#tocList");
    if (!nav) return;
    nav.innerHTML = "";
    SLIDES.forEach((s, i) => {
      const b = document.createElement("button");
      b.className = "toc-item";
      b.type = "button";
      b.innerHTML = `<span>${esc(s.title.replace(/<[^>]*>/g,""))}</span><small>${String(i+1).padStart(2,"0")}</small>`;
      b.addEventListener("click", () => { go(i); toggleToc(false); });
      b.dataset.index = i;
      nav.appendChild(b);
    });
  }

  function toggleToc(open) {
    const panel = $("#tocPanel");
    const btn = $("#tocToggle");
    if (!panel || !btn) return;
    const show = typeof open === "boolean" ? open : panel.hidden;
    const focusInside = panel.contains(document.activeElement);
    panel.hidden = !show;
    btn.setAttribute("aria-expanded", String(show));
    if (show) {
      setTimeout(() => $("#tocClose")?.focus(), 0);
    } else if (focusInside) {
      btn.focus();
    }
  }

  /* ============================================================
     EVENTOS GLOBALES
     ============================================================ */
  function bindGlobalEvents() {
    $("#prevBtn").addEventListener("click", () => go(current - 1));
    $("#nextBtn").addEventListener("click", () => go(current + 1));

    $("#tocToggle").addEventListener("click", () => toggleToc());
    $("#tocClose").addEventListener("click", () => toggleToc(false));

    $("#fullscreenBtn").addEventListener("click", async () => {
      try {
        if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
        else await document.exitFullscreen();
      } catch {
        showToast("Pantalla completa no disponible en este navegador.");
      }
    });

    document.addEventListener("fullscreenchange", () => {
      const btn = $("#fullscreenBtn");
      if (!btn) return;
      const isFs = !!document.fullscreenElement;
      btn.innerHTML = isFs ? '<i class="ph ph-corners-in"></i>' : '<i class="ph ph-corners-out"></i>';
      btn.setAttribute("aria-label", isFs ? "Salir de pantalla completa" : "Activar pantalla completa");
    });

    // Teclado global
    document.addEventListener("keydown", e => {
      const active = document.activeElement;
      const tag = active ? active.tagName : "";
      const inField = ["INPUT","TEXTAREA","SELECT"].includes(tag);
      if (e.key === "Escape" && !$("#tocPanel").hidden) {
        e.preventDefault();
        toggleToc(false);
        return;
      }
      if (inField) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(current + 1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(current - 1); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(SLIDES.length - 1); }
      else if (e.key === "i" || e.key === "I") { e.preventDefault(); toggleToc(); }
    });

    // Cerrar TOC al hacer clic fuera
    document.addEventListener("click", e => {
      const panel = $("#tocPanel");
      const toggle = $("#tocToggle");
      if (!panel || panel.hidden) return;
      if (panel.contains(e.target) || toggle.contains(e.target)) return;
      toggleToc(false);
    });

    // Sincronizar con el hash del URL (botones atrás/adelante)
    window.addEventListener("hashchange", () => {
      const id = location.hash.slice(1);
      if (!id) return;
      const idx = SLIDES.findIndex(s => s.id === id);
      if (idx >= 0 && idx !== current) {
        current = idx;
        render();
      }
    });

    // Swipe en móvil
    stage.addEventListener("touchstart", e => {
      const target = e.target;
      if (target && target.closest && target.closest("input,textarea,select,button,a")) {
        touchStart = null;
        return;
      }
      const t = e.touches && e.touches[0];
      if (!t) return;
      touchStart = { x: t.clientX, y: t.clientY };
    }, { passive: true });

    stage.addEventListener("touchend", e => {
      if (!touchStart) return;
      const t = e.changedTouches && e.changedTouches[0];
      if (!t) { touchStart = null; return; }
      const dx = t.clientX - touchStart.x;
      const dy = t.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        go(dx < 0 ? current + 1 : current - 1);
      }
    }, { passive: true });
  }

  /* ============================================================
     INICIALIZACIÓN
     ============================================================ */
  function init() {
    buildToc();

    const id = location.hash.slice(1);
    const idx = SLIDES.findIndex(s => s.id === id);
    current = idx >= 0 ? idx : 0;

    render();

    if (!location.hash) {
      try { history.replaceState(null, "", "#" + SLIDES[current].id); } catch {}
    }

    bindGlobalEvents();
  }

  // API pública para integraciones
  window.goToSlide = go;
  window.bindInteractions = () => { copyButtons(); bindLabs(); };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
