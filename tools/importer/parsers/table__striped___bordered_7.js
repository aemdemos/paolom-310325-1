export default function parse(element, { document }) {
  // Helper Function to Create Header Row with Proper Columns
  function createHeaderRow(headers) {
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
      const headerCell = document.createElement('th');
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
    });
    return headerRow;
  }

  // Extract Relevant Data Dynamically from the Provided HTML
  const rows = [];

  // Create Header Row Matching Example Exactly
  const headerRow = createHeaderRow(['Product Name', 'Website']);
  rows.push(headerRow);

  // Extract Product Data Dynamically From the Content
  const productElements = element.querySelectorAll('a');
  productElements.forEach(anchor => {
    if (anchor && anchor.textContent && anchor.href) { // Check for empty or missing content
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = anchor.textContent.trim() || 'Unnamed Product';

      const websiteCell = document.createElement('td');
      const websiteLink = document.createElement('a');
      websiteLink.href = anchor.href;
      websiteLink.textContent = anchor.href;
      websiteCell.appendChild(websiteLink);

      row.appendChild(nameCell);
      row.appendChild(websiteCell);

      rows.push(row);
    }
  });

  // Create the Table
  const table = document.createElement('table');
  rows.forEach(row => table.appendChild(row));

  // Replace the Original Element with the Table
  element.replaceWith(table);
}