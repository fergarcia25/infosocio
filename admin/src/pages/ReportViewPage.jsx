import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import ReportContent from '../components/ReportContent'

export default function ReportViewPage() {
  const navigate = useNavigate()
  const reportRef = useRef(null)
  const [data, setData] = useState(null)
  const [generatingPdf, setGeneratingPdf] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('reportData')
    if (!stored) {
      navigate('/generar-informe', { replace: true })
      return
    }
    setData(JSON.parse(stored))
  }, [navigate])

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

  if (!data) return null

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-outline-secondary" onClick={() => window.close()}>
            &larr; Volver
          </button>
          <button className="btn btn-danger" onClick={handleDownloadPdf} disabled={generatingPdf}>
            {generatingPdf ? 'Generando PDF...' : 'Descargar PDF'}
          </button>
        </div>
      </div>
      <ReportContent data={data} reportRef={reportRef} />
    </div>
  )
}
