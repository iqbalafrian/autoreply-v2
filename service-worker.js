<script>
  const titleInput = document.getElementById("titleInput");
  const templateInput = document.getElementById("templateInput");
  const addBtn = document.getElementById("addBtn");
  const templateList = document.getElementById("templateList");
  const searchInput = document.getElementById("search");
  const selectAllCheckbox = document.getElementById("selectAll");
  const deleteSelectedBtn = document.getElementById("deleteSelected");

  let templates = JSON.parse(localStorage.getItem("templates") || "[]");

  function saveTemplates() {
    localStorage.setItem("templates", JSON.stringify(templates));
  }

  function renderTemplates() {
    // 🧹 Bersihkan layout sebelum menambahkan ulang
    templateList.innerHTML = "";

    templates.forEach((template, index) => {
      const card = document.createElement("div");
      card.className = "card template-card p-3";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input me-2";
      checkbox.checked = template.selected || false;
      checkbox.addEventListener("change", () => {
        templates[index].selected = checkbox.checked;
        saveTemplates();
      });

      const title = document.createElement("div");
      title.className = "template-title";
      title.textContent = template.title;

      const body = document.createElement("div");
      body.className = "template-body";
      body.textContent = template.body;

      const actions = document.createElement("div");
      actions.className = "actions";

      const copyBtn = document.createElement("button");
      copyBtn.className = "btn btn-sm btn-outline-secondary";
      copyBtn.textContent = "Salin";
      copyBtn.onclick = () => navigator.clipboard.writeText(template.body);

      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-sm btn-outline-primary";
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        titleInput.value = template.title;
        templateInput.value = template.body;
        templates.splice(index, 1); // Hapus sementara saat ingin edit
        saveTemplates();
        renderTemplates();
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-sm btn-outline-danger";
      deleteBtn.textContent = "Hapus";
      deleteBtn.onclick = () => {
        templates.splice(index, 1);
        saveTemplates();
        renderTemplates();
      };

      actions.append(copyBtn, editBtn, deleteBtn);
      card.append(checkbox, title, body, actions);
      templateList.appendChild(card);
    });
  }

  addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const body = templateInput.value.trim();
    if (title && body) {
      templates.unshift({ title, body, selected: false }); // Tambah ke atas
      titleInput.value = "";
      templateInput.value = "";
      saveTemplates();
      renderTemplates();
    }
  });

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    document.querySelectorAll(".template-card").forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(keyword) ? "block" : "none";
    });
  });

  selectAllCheckbox.addEventListener("change", () => {
    const checked = selectAllCheckbox.checked;
    templates.forEach(t => t.selected = checked);
    saveTemplates();
    renderTemplates();
  });

  deleteSelectedBtn.addEventListener("click", () => {
    templates = templates.filter(t => !t.selected);
    saveTemplates();
    renderTemplates();
  });

  // Inisialisasi saat pertama kali load
  renderTemplates();
</script>
