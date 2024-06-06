import jsPDF from 'jspdf';
import PropTypes from 'prop-types';

const PreRepairDoc = ({
  vehicleNumber,
  customerName,
  customerEmail,
  customerPhoneNumber,
  preDocId,
  jobId,
  dateString,
  checkList,
  otherItems,
  additionalNote,
  files,
  vehicleFault
}) => {

  const generatePDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4'); 
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Set background color
    pdf.setFillColor(145, 235, 169); 
    pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');

    // Add title
    pdf.setFontSize(22); 
    pdf.setFont("helvetica", "bold"); 
    const title = 'Kalupahana Motor Engineering';
    const titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2; 
    pdf.text(title, titleX, 20);

    // Add subtitle
    pdf.setFontSize(12); 
    pdf.setFont("helvetica", "normal"); 
    const subtitle = 'Mahingoda Junction Bus Stop, Ratnapura Road, Eheliyagoda. - 0773880154';
    const subtitleWidth = pdf.getStringUnitWidth(subtitle) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const subtitleX = (pageWidth - subtitleWidth) / 2; 
    pdf.text(subtitle, subtitleX, 26);

    // Draw rectangles for sections
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, 40 , 190, 45); // Section for basic details
    pdf.rect(10, 85, 190, 30); // Section for checklist
    pdf.rect(10, 115, 190, 30); // Section for other items
    pdf.rect(10, 145, 190, 30); // Section for additional note
    pdf.rect(10, 250, 190, 50); // Section for vehicle fault

    // Add basic details
    pdf.setFontSize(12);
    pdf.text(`Vehicle Number: ${vehicleNumber}`, 15, 50);
    pdf.text(`Customer Name: ${customerName}`, 15, 60);
    pdf.text(`Customer Email: ${customerEmail}`, 15, 80);
    pdf.text(`Phone Number: ${customerPhoneNumber}`, 15, 70);
    pdf.text(`Document Number: ${preDocId}`, 120, 50);
    pdf.text(`Repair Job Number: ${jobId}`, 120, 60);
    pdf.text(`Date: ${dateString}`, 120, 70);

    // Add checklist
    pdf.text('Checklist:', 15, 90);
    const checklistItems = ['spareTire', 'tireJack', 'lugWrench', 'toolBox', 'jumperCable'];
    checklistItems.forEach((item, index) => {
    const isChecked = checkList[item] === 'yes' ? '[X]' : '[ ]';
    const itemLabel = item.replace(/([A-Z])/g, ' $1');
    const x = index < 3 ? 25 + (index * 70) : 25 + ((index - 3) * 70);
    const y = index < 3 ? 100 : 110;
    pdf.text(`${isChecked} ${itemLabel}`, x, y);
    }); 

    // Add other items
    pdf.text('Other items:', 15, 120);
    pdf.text(otherItems || 'None', 25, 125, { maxWidth: 150 });

    // Add additional note
    pdf.text('Additional Note:', 15, 150);
    pdf.text(additionalNote || 'None', 25, 155, { maxWidth: 150 });

    // Add vehicle fault
    pdf.text('Vehicle Fault:', 15, 260);
    pdf.text(vehicleFault || 'None', 25, 270, { maxWidth: 150 });

    // Add images
    if (files.length > 0) {
      pdf.addPage();
      pdf.text('Scratch marks in body:', 15, 20);
      let yOffset = 30;
      files.forEach((file, index) => {
        const img = new Image();
        img.src = file.preview;
        img.onload = () => {
          const imgWidth = 50; // Define the width of the image
          const imgHeight = (img.height * imgWidth) / img.width; // Maintain aspect ratio
          pdf.addImage(img, 'JPEG', 15 + (index % 3) * 65, yOffset, imgWidth, imgHeight);
          if ((index + 1) % 3 === 0) {
            yOffset += imgHeight + 10; // Move to next row after 3 images
          }
        };
      });
    }

    // Add footer
    pdf.setFontSize(8);
    const footer = 'Thank you for entrusting us with your vehicle. Safe travels!';
    const footerWidth = pdf.getStringUnitWidth(footer) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const footerX = (pageWidth - footerWidth) / 2; 
    pdf.text(footer, footerX, 290);

    // Generate file name based on current date and time
    const date = new Date();
    const dateTimeString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`;

    // Save the PDF
    pdf.save(`PreRepair-${dateTimeString}.pdf`);
  };

  return (
    <button className="btn btn-normal w-40 mx-auto mt-2" onClick={generatePDF}>
      Download
    </button>
  );
};

PreRepairDoc.propTypes = {
  vehicleNumber: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  customerEmail: PropTypes.string.isRequired,
  customerPhoneNumber: PropTypes.string.isRequired,
  preDocId: PropTypes.string.isRequired,
  jobId: PropTypes.string.isRequired,
  dateString: PropTypes.string.isRequired,
  checkList: PropTypes.object.isRequired,
  otherItems: PropTypes.string.isRequired,
  additionalNote: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  vehicleFault: PropTypes.string.isRequired
};

export default PreRepairDoc;
