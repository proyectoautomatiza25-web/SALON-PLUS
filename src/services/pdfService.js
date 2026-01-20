import { jsPDF } from "jspdf";

const COMPANY_INFO = {
    name: "CENTRO MÉDICO DEL VALLE",
    address: "Av. La Dehesa 1234, Oficina 505, Lo Barnechea",
    phone: "+56 2 2999 9999",
    email: "contacto@cmdelvalle.cl",
    website: "www.cmdelvalle.cl",
    logoUrl: "https://i.imgur.com/example-logo.png" // Podemos reemplazar esto con tu logo real en base64
};

export const generatePrescription = (patient, professional, prescriptionDetails) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // --- HEADER PRO ---
    // Background Header
    doc.setFillColor(248, 250, 252); // Gris muy suave
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Logo Text (Simulado por ahora si no hay imagen)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59); // Dark blue/slate
    doc.text(COMPANY_INFO.name, 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Medicina Integral y Especialidades", 20, 26);

    // Fecha y Folio
    doc.setFontSize(10);
    doc.text(`FECHA: ${new Date().toLocaleDateString()}`, pageWidth - 60, 20);
    doc.text(`FOLIO: #${Math.floor(Math.random() * 100000)}`, pageWidth - 60, 26);

    // --- PATIENT INFO BOX ---
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(20, 50, pageWidth - 40, 30, 3, 3, 'FD');

    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184); // Label color
    doc.text("PACIENTE", 25, 60);
    doc.text("RUT", 120, 60);
    doc.text("EDAD", 170, 60);

    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59); // Value color
    doc.text(patient.name.toUpperCase(), 25, 68);
    doc.text(patient.rut, 120, 68);
    doc.text("32 Años", 170, 68); // Calcular edad real si tuviera fecha nac

    // --- DOCUMENT TITLE ---
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text("RECETA MÉDICA", pageWidth / 2, 100, { align: "center" });
    doc.setDrawColor(37, 99, 235); // Blue Accent
    doc.line(pageWidth / 2 - 20, 103, pageWidth / 2 + 20, 103);

    // --- PRESCRIPTION CONTENT ---
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);

    // Split text to wrap
    const splitText = doc.splitTextToSize(prescriptionDetails, pageWidth - 60);
    doc.text(splitText, 30, 120);

    // --- FOOTER & SIGNATURE ---
    const bottomY = 240;

    // Linea Firma
    doc.setDrawColor(0);
    doc.line(pageWidth / 2 - 50, bottomY, pageWidth / 2 + 50, bottomY);

    // Doctor Info
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(professional.name, pageWidth / 2, bottomY + 10, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(professional.specialty, pageWidth / 2, bottomY + 16, { align: "center" });
    doc.text(`RUT Prof: ${professional.rut || '12.345.678-K'}`, pageWidth / 2, bottomY + 22, { align: "center" });

    // Footer Legal
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`${COMPANY_INFO.address} • ${COMPANY_INFO.phone} • ${COMPANY_INFO.website}`, pageWidth / 2, 280, { align: "center" });

    doc.save(`Receta_${patient.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const generateCertificate = (patient, professional, certDetails, days = 0) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text(COMPANY_INFO.name, 20, 20);
    doc.setFontSize(10);
    doc.text("Medicina Integral y Especialidades", 20, 26);

    // Content
    doc.setFontSize(18);
    doc.text("CERTIFICADO MÉDICO", pageWidth / 2, 60, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);

    const text = `Se certifica que el paciente ${patient.name}, RUT ${patient.rut}, ha sido evaluado en este centro asistencial.\n\nDIAGNÓSTICO/MOTIVO:\n${certDetails}\n\nINDICACIÓN:\nSe indica reposo médico por ${days} días a contar de la fecha actual.\n\nPara ser presentado ante fines que estime conveniente.`;

    const splitText = doc.splitTextToSize(text, pageWidth - 60);
    doc.text(splitText, 30, 90);

    // Signature
    const bottomY = 220;
    doc.line(pageWidth / 2 - 50, bottomY, pageWidth / 2 + 50, bottomY);
    doc.setFont("helvetica", "bold");
    doc.text(professional.name, pageWidth / 2, bottomY + 10, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(professional.specialty, pageWidth / 2, bottomY + 16, { align: "center" });

    doc.save(`Certificado_${patient.name}.pdf`);
};
