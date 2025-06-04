const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
    try {
        console.log('🌟 Starting PDF generation for "The Honest Friends" story book...');
        
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Load the HTML file
        const htmlFile = path.join(__dirname, 'honesty-story.html');
        await page.goto(`file://${htmlFile}`, { 
            waitUntil: 'networkidle0' 
        });
        
        // Set viewport for better rendering
        await page.setViewport({ width: 1200, height: 1600 });
        
        // Generate PDF with custom settings for story book
        const pdfBuffer = await page.pdf({
            path: path.join(__dirname, 'The-Honest-Friends-Storybook.pdf'),
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0.5in',
                right: '0.5in',
                bottom: '0.5in',
                left: '0.5in'
            },
            displayHeaderFooter: false,
            preferCSSPageSize: true
        });
        
        await browser.close();
        
        console.log('✅ PDF generated successfully: The-Honest-Friends-Storybook.pdf');
        console.log('📚 Story book featuring Sanav, Sanha, and Sai Vittal is ready!');
        
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
    }
}

generatePDF(); 