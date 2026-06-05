import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import ReportContent from '../components/ReportContent'

export default function GenerateReportPage() {
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState('')
  const [dataField, setDataField] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState(null)
  const [generatingPdf, setGeneratingPdf] = useState(false)
  const reportRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let jsonData

      if (file) {
        const text = await file.text()
        jsonData = JSON.parse(text)
      } else if (url) {
        const res = await fetch(url)
        const text = await res.text()
        jsonData = JSON.parse(text)
      } else if (dataField.trim()) {
        jsonData = JSON.parse(dataField)
      } else {
        throw new Error('Debe cargar un archivo, ingresar una URL o pegar el JSON.')
      }

      setReportData(jsonData)
    } catch (err) {
      setError(err.message || 'Error al procesar el JSON.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return
    setGeneratingPdf(true)
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 1.5, useCORS: true, logging: false })
      const imgData = canvas.toDataURL('image/jpeg', 0.8)
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      let heightLeft = pdfHeight
      let position = 0
      const pageHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight)
        heightLeft -= pageHeight
      }

      pdf.save('informe.pdf')
    } catch (err) {
      console.error('Error generating PDF:', err)
    } finally {
      setGeneratingPdf(false)
    }
  }

  return (
    <div>
      <h4 className="fw-bold mb-4">Generar Informe</h4>
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-semibold">Cargar JSON archivo:</label>
                  <input
                    className="form-control"
                    type="file"
                    accept=".json,application/json"
                    onChange={e => setFile(e.target.files[0])}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Cargar JSON por URL:</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="https://"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Cargar JSON por input:</label>
                  <textarea
                    className="form-control small"
                    rows="5"
                    value={dataField}
                    onChange={e => setDataField(e.target.value)}
                  ></textarea>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg px-5" disabled={loading}>
                    {loading ? 'Procesando...' : 'Importar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {reportData && (
        <div
          className="modal d-block"
          style={{ background: 'rgba(0,0,0,0.6)', overflowY: 'auto' }}
          onClick={() => setReportData(null)}
        >
          <div
            className="modal-dialog modal-fullscreen m-0"
            style={{ maxWidth: '100%' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-0 min-vh-100">
              <div className="modal-header bg-light sticky-top">
                <div className="container d-flex justify-content-between align-items-center px-0">
                  <button className="btn btn-outline-secondary" onClick={() => setReportData(null)}>
                    &larr; Cerrar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDownloadPdf}
                    disabled={generatingPdf}
                  >
                    {generatingPdf ? 'Generando PDF...' : 'Descargar PDF'}
                  </button>
                </div>
              </div>
              <div className="modal-body p-0" style={{ maxWidth: '992px', margin: '0 auto' }}>
                <ReportContent data={reportData} reportRef={reportRef} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
