const puppeteer = require('puppeteer');

exports.createPDF = async (htmlContent) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    const page = await browser.newPage();
    
    // Set content and wait for network to be idle to ensure fonts/images load
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });
    
    // Inject Tailwind CSS via CDN for styling if not already in HTML
    if (!htmlContent.includes('tailwindcss')) {
      await page.addStyleTag({ url: 'https://cdn.tailwindcss.com' });
    }
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }
    });
    
    return pdfBuffer;
  } catch (error) {
    console.error('Error generating PDF with Puppeteer:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
