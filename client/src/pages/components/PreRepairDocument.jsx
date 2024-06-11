import { useState } from 'react';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import axios from 'axios';

const PreRepairDocument = ({
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
  vehicleFault
}) => {
  
  const [imageUrls, setImageUrls] = useState([]);

  // Fetch images from the backend
  const fetchImages = async () => {
    try {
      const res = await axios.get(`/api/openjob/getImages/${preDocId}`);
      setImageUrls(res.data.imageUrls);
      return res.data.imageUrls;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const generatePDF = async (images) => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Set background color
    pdf.setFillColor(245, 159, 159);
    pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');

    // Add title
    pdf.setFontSize(22);
    pdf.setFont("helvetica", "bold");
    const title = 'Kalupahana Motor Engineering';
    const titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2;
    pdf.text(title, titleX, 10);

    // Add subtitle
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    const subtitle = 'Mahingoda Junction Bus Stop, Ratnapura Road, Eheliyagoda. - 0773880154';
    const subtitleWidth = pdf.getStringUnitWidth(subtitle) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const subtitleX = (pageWidth - subtitleWidth) / 2;
    pdf.text(subtitle, subtitleX, 16);

    // Draw rectangles for sections
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, 20, 190, 40); // Section for basic details
    pdf.rect(10, 60, 190, 25); // Section for checklist
    pdf.rect(10, 85, 190, 30); // Section for other items
    pdf.rect(10, 115, 190, 30); // Section for additional note
    pdf.rect(10, 145, 190, 75); // Section for images
    pdf.rect(10, 220, 190, 40); // Section for vehicle fault

    // Add basic details
    pdf.setFontSize(12);
    pdf.text(`Vehicle Number: ${vehicleNumber}`, 15, 25);
    pdf.text(`Customer Name: ${customerName}`, 15, 35);
    pdf.text(`Customer Email: ${customerEmail}`, 15, 55);
    pdf.text(`Phone Number: ${customerPhoneNumber}`, 15, 45);
    pdf.text(`Document Number: ${preDocId}`, 120, 25);
    pdf.text(`Repair Job Number: ${jobId}`, 120, 35);
    pdf.text(`Date: ${dateString}`, 120, 45);

    // Add checklist
    pdf.text('Checklist:', 15, 65);
    const checklistItems = ['spareTire', 'tireJack', 'lugWrench', 'toolBox', 'jumperCable'];
    checklistItems.forEach((item, index) => {
      const isChecked = checkList[item] === 'yes' ? '[x]' : '[o]';
      const itemLabel = item.replace(/([A-Z])/g, ' $1');
      const x = index < 3 ? 25 + (index * 70) : 25 + ((index - 3) * 70);
      const y = index < 3 ? 70 : 80;
      pdf.text(`${isChecked} ${itemLabel}`, x, y);
    });

    // Add other items
    pdf.text('Other items:', 15, 90);
    pdf.text(otherItems || 'No items', 25, 95, { maxWidth: 150 });

    // Add additional note
    pdf.text('Additional Note:', 15, 120);
    pdf.text(additionalNote || 'No note', 25, 125, { maxWidth: 150 });

    // Add images
    pdf.text('Scarth marks in body:', 15, 150);
    if (images.length === 0) {
      pdf.text('No images', 20, 155);
    } else {
      let imageY = 155;
      for (let i = 0; i < images.length; i += 5) {
      let imageX = 20;
      for (let j = i; j < i + 5 && j < images.length; j++) {
      const img = new Image();
      img.src = images[j];
      pdf.addImage(img, 'JPEG', imageX, imageY, 30, 30);
      imageX += 35;
    }
    imageY += 31;
    }
    }

    // Add vehicle fault
    pdf.text('Vehicle Fault:', 15, 225);
    pdf.text(vehicleFault || 'None', 25, 230, { maxWidth: 150 });

    //customer sentence
    pdf.text('I confirm that all information provided is accurate and agree to comply with all rules',45,270,{ maxWidth: 160 });
    pdf.text('and regulations set forth by Kalupahana Motor Engineering.',15 , 275);
    
    //signatures
    pdf.text('---------------------------', 20,285);
    pdf.text('---------------------------', 160,285);
    pdf.text('Kalupahana Motors', 20,290);
    pdf.text('Customer', 170,290 );


    // Add footer
    pdf.setFontSize(8);
    const footer = 'Thank you for entrusting us with your vehicle. Safe travels!';
    const footerWidth = pdf.getStringUnitWidth(footer) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const footerX = (pageWidth - footerWidth) / 2;
    pdf.text(footer, footerX, 295);

    // Generate file name based on current date and time
    const date = new Date();
    const dateTimeString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`;

    // Save the PDF
    pdf.save(`PreRepair-${dateTimeString}.pdf`);
  };

  const handleGeneratePDF = async () => {
    const images = await fetchImages();
    generatePDF(images);
  };

  return (
    <button className="btn btn-normal w-40 mx-auto mt-2" onClick={handleGeneratePDF}>
      Download
    </button>
  );
};

PreRepairDocument.propTypes = {
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
  vehicleFault: PropTypes.string.isRequired
};

export default PreRepairDocument;
