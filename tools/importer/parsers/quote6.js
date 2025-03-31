export default function parse(element, { document }) {
    const WebImporter = {
        DOMUtils: {
            createTable: (data, document) => {
                const table = document.createElement('table');

                data.forEach((row, index) => {
                    const tr = document.createElement('tr');

                    row.forEach((cell) => {
                        const t = document.createElement(index === 0 ? 'th' : 'td');
                        if (typeof cell === 'string') {
                            t.textContent = cell;
                        } else if (Array.isArray(cell)) {
                            t.append(...cell);
                        } else {
                            t.append(cell);
                        }
                        tr.appendChild(t);
                    });
                    table.appendChild(tr);
                });

                return table;
            },
        },
    };

    // Extracting relevant content dynamically
    const quoteParagraph = element.querySelector('p');
    const quoteContent = quoteParagraph?.textContent.trim() || 'No content available';

    // Create the table structure for the "Quote" block
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Quote';
    const headerRow = [headerCell];

    // Organizing the content into rows
    const contentRow = [quoteContent];

    const cells = [
        headerRow,  // Header row (matches example "Quote")
        contentRow  // Content row with extracted dynamic content
    ];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}