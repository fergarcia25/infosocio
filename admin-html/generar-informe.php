<?php
require_once 'include/api-helpers.php';
require_once 'include/report-content.php';

// Handle AJAX POST to render report HTML
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $input = json_decode(file_get_contents('php://input'), true);
  if ($input && isset($input['render']) && $input['render'] && isset($input['data'])) {
    renderReport($input['data']);
    exit;
  }
  http_response_code(400);
  echo 'Invalid request';
  exit;
}

require 'include/header.php';
?>

<h4 class="fw-bold mb-4">Generar Informe</h4>

<div class="row">
  <div class="col-12">
    <div class="card shadow-sm">
      <div class="card-body p-4">
        <form id="reportForm">
          <div id="reportError" class="alert alert-danger py-2 d-none"></div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Cargar JSON archivo:</label>
            <input class="form-control" type="file" id="fileInput" accept=".json,application/json">
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Cargar JSON por URL:</label>
            <input class="form-control" type="text" id="urlInput" placeholder="https://">
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Cargar JSON por input:</label>
            <textarea class="form-control small" id="dataField" rows="5"></textarea>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary btn-lg px-5" id="importBtn">Importar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Report modal -->
<div id="reportModal" class="modal-fullscreen-overlay d-none" onclick="closeReport()">
  <div class="modal-fullscreen-content" onclick="event.stopPropagation()">
    <div class="modal-header bg-light sticky-top">
      <div class="container d-flex justify-content-between align-items-center px-0">
        <button class="btn btn-outline-secondary" onclick="closeReport()">&larr; Cerrar</button>
        <button class="btn btn-danger" id="pdfBtn" onclick="downloadPdf()">Descargar PDF</button>
      </div>
    </div>
    <div class="modal-body p-0" style="max-width:992px;margin:0 auto">
      <div id="reportContent"></div>
    </div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js"></script>
<script>
let currentReportData = null;

document.getElementById('reportForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = document.getElementById('importBtn');
  const errorEl = document.getElementById('reportError');
  const file = document.getElementById('fileInput').files[0];
  const url = document.getElementById('urlInput').value;
  const dataField = document.getElementById('dataField').value;

  btn.disabled = true;
  btn.textContent = 'Procesando...';
  errorEl.classList.add('d-none');

  try {
    let jsonData;

    if (file) {
      const text = await file.text();
      jsonData = JSON.parse(text);
    } else if (url) {
      const res = await fetch(url);
      const text = await res.text();
      jsonData = JSON.parse(text);
    } else if (dataField.trim()) {
      jsonData = JSON.parse(dataField);
    } else {
      throw new Error('Debe cargar un archivo, ingresar una URL o pegar el JSON.');
    }

    currentReportData = jsonData;
    await renderReportPreview(jsonData);
  } catch (err) {
    errorEl.textContent = err.message || 'Error al procesar el JSON.';
    errorEl.classList.remove('d-none');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Importar';
  }
});

async function renderReportPreview(data) {
  const res = await fetch('generar-informe.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ render: true, data: data })
  });
  const html = await res.text();
  document.getElementById('reportContent').innerHTML = html;
  document.getElementById('reportModal').classList.remove('d-none');
}

function closeReport() {
  document.getElementById('reportModal').classList.add('d-none');
  currentReportData = null;
}

async function downloadPdf() {
  const btn = document.getElementById('pdfBtn');
  const content = document.getElementById('reportContent');
  btn.disabled = true;
  btn.textContent = 'Generando PDF...';

  try {
    const canvas = await html2canvas(content, { scale: 1.5, useCORS: true, logging: false });
    const imgData = canvas.toDataURL('image/jpeg', 0.8);
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = pdfHeight;
    let position = 0;
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('informe.pdf');
  } catch (err) {
    alert('Error generando PDF: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Descargar PDF';
  }
}
</script>

<?php require 'include/footer.php'; ?>
