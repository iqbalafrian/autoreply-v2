function renderTemplates() {
  const container = document.getElementById("templateList");
  
  // ✅ Bersihkan dulu konten lama agar tidak dobel
  container.innerHTML = "";

  const templates = JSON.parse(localStorage.getItem("templates")) || [];
  
  templates.forEach((template, index) => {
    const item = document.createElement("div");
    item.className = "template-item"; // sesuai class kamu
    item.innerHTML = `
      <div class="template-content">
        <strong>${template.title}</strong>
        <p class="truncate">${template.content}</p>
        <!-- Tombol, checkbox, dll -->
      </div>
    `;
    container.appendChild(item);
  });
}
