import jsPDF from 'jspdf';
import PropTypes from 'prop-types';

const PostRepairDoc = ({
  vehicleNumber,
  customerName,
  customerEmail,
  customerPhoneNumber,
  postDocId,
  updateJobId,
  dateString,
  batteryHealth,
  enginePerformance,
  tireCondition,
  fluidLevels,
  instructions,
  shopOwnerNote
}) => {

  const generatePDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4'); 
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    pdf.setFillColor(145, 235, 169); 
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');

    pdf.setFontSize(22); 
    pdf.setFont("helvetica", "bold"); 
    const title = 'Kalupahana Motor Engineering';
    const titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2; 
    pdf.text(title, titleX, 20);

    pdf.setFontSize(12); 
    pdf.setFont("helvetica", "normal"); 
    const subtitle = 'Mahingoda Junction Bus Stop,Ratnapura Road,Eheliyagoda. - 0773880154';
    const subtitleWidth = pdf.getStringUnitWidth(subtitle) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const subtitleX = (pageWidth - subtitleWidth) / 2; 
    pdf.text(subtitle, subtitleX, 26);

    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, 40 , 190, 45);
    pdf.rect(10,135,190,65);
    pdf.rect(10,205,190,70)

    pdf.setFontSize(12);
    pdf.text(`Vehicle Number:- ${vehicleNumber}`, 15, 50);
    pdf.text(`Customer Name:- ${customerName}`, 15, 60);
    pdf.text(`Customer Email:- ${customerEmail}`, 15, 80);
    pdf.text(`Phone Number:- ${customerPhoneNumber}`, 15, 70);
    pdf.text(`Document Number:- ${postDocId}`, 120, 50);
    pdf.text(`Repair Job Number:- ${updateJobId}`, 120, 60);
    pdf.text(`Date:- ${dateString}`, 120, 70);

    pdf.text(`Battery health: ${batteryHealth ? batteryHealth.label : 'Not Checked'}`, 15, 110);
    pdf.text(`Engine performance: ${enginePerformance ? enginePerformance.label : 'Not Checked'}`, 15, 120);
    pdf.text(`Tire Condition: ${tireCondition ? tireCondition.label : 'Not Checked'}`, 120, 110);
    pdf.text(`Fluid levels: ${fluidLevels ? fluidLevels.label : 'Not Checked'}`, 120, 120);

    pdf.text(`Mechanic's Instructions:`, 15, 140);
    pdf.text(instructions, 25, 150, { maxWidth: 150 });

    pdf.text(`Shop Owner Note:`, 15, 210);
    pdf.text(shopOwnerNote, 25, 220, { maxWidth: 150 });

    pdf.setFontSize(8);
    const footer = 'Thank you for entrusting us with your vehicle. Safe travels!';
    const footerWidth = pdf.getStringUnitWidth(footer) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const footerX = (pageWidth - footerWidth) / 2; 
    pdf.text(footer, footerX, 285);

    const date = new Date();
    const dateTimeString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

    pdf.save(`PostRepair-${dateTimeString}.pdf`);
  };

  return (
    <button className="btn btn-normal w-40 mx-auto mt-2" onClick={generatePDF}>
      Download
    </button>
  );
};


PostRepairDoc.propTypes = {
  vehicleNumber: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  customerEmail: PropTypes.string.isRequired,
  customerPhoneNumber: PropTypes.string.isRequired,
  postDocId: PropTypes.string.isRequired,
  updateJobId: PropTypes.string.isRequired,
  dateString: PropTypes.string.isRequired,
  batteryHealth: PropTypes.shape({
    label: PropTypes.string.isRequired
  }),
  enginePerformance: PropTypes.shape({
    label: PropTypes.string.isRequired
  }),
  tireCondition: PropTypes.shape({
    label: PropTypes.string.isRequired
  }),
  fluidLevels: PropTypes.shape({
    label: PropTypes.string.isRequired
  }),
  instructions: PropTypes.string.isRequired,
  shopOwnerNote: PropTypes.string.isRequired
};

export default PostRepairDoc;

