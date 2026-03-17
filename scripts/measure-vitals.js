/**
 * Script to measure Core Web Vitals using Lighthouse
 */
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFileSync } from 'fs';
import { join } from 'path';

const url = 'http://localhost:4173'; // Vite preview server

async function measureCoreWebVitals() {
  console.log('🚀 Starting Core Web Vitals measurement...\n');
  
  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
  });

  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance'],
    port: chrome.port,
  };

  try {
    // Run Lighthouse
    const runnerResult = await lighthouse(url, options);

    // Extract Core Web Vitals
    const { lhr } = runnerResult;
    const { audits } = lhr;

    console.log('📊 Core Web Vitals Results:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // LCP - Largest Contentful Paint
    const lcp = audits['largest-contentful-paint'];
    console.log(`\n🎯 LCP (Largest Contentful Paint): ${lcp.displayValue}`);
    console.log(`   Score: ${(lcp.score * 100).toFixed(0)}/100`);
    console.log(`   Status: ${lcp.score >= 0.9 ? '✅ Good' : lcp.score >= 0.5 ? '⚠️  Needs Improvement' : '❌ Poor'}`);
    console.log(`   Target: < 2.5s (Good), < 4.0s (Needs Improvement)`);

    // FID - First Input Delay (replaced by INP in newer versions)
    const tbt = audits['total-blocking-time'];
    console.log(`\n⚡ TBT (Total Blocking Time - FID proxy): ${tbt.displayValue}`);
    console.log(`   Score: ${(tbt.score * 100).toFixed(0)}/100`);
    console.log(`   Status: ${tbt.score >= 0.9 ? '✅ Good' : tbt.score >= 0.5 ? '⚠️  Needs Improvement' : '❌ Poor'}`);
    console.log(`   Target: < 200ms (Good), < 600ms (Needs Improvement)`);

    // CLS - Cumulative Layout Shift
    const cls = audits['cumulative-layout-shift'];
    console.log(`\n📐 CLS (Cumulative Layout Shift): ${cls.displayValue}`);
    console.log(`   Score: ${(cls.score * 100).toFixed(0)}/100`);
    console.log(`   Status: ${cls.score >= 0.9 ? '✅ Good' : cls.score >= 0.5 ? '⚠️  Needs Improvement' : '❌ Poor'}`);
    console.log(`   Target: < 0.1 (Good), < 0.25 (Needs Improvement)`);

    // Overall Performance Score
    const performanceScore = lhr.categories.performance.score * 100;
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n🏆 Overall Performance Score: ${performanceScore.toFixed(0)}/100`);
    console.log(`   Status: ${performanceScore >= 90 ? '✅ Excellent' : performanceScore >= 50 ? '⚠️  Needs Improvement' : '❌ Poor'}\n`);

    // Additional metrics
    console.log('📈 Additional Metrics:\n');
    
    const fcp = audits['first-contentful-paint'];
    console.log(`   FCP (First Contentful Paint): ${fcp.displayValue} - Score: ${(fcp.score * 100).toFixed(0)}/100`);
    
    const si = audits['speed-index'];
    console.log(`   Speed Index: ${si.displayValue} - Score: ${(si.score * 100).toFixed(0)}/100`);
    
    const tti = audits['interactive'];
    console.log(`   TTI (Time to Interactive): ${tti.displayValue} - Score: ${(tti.score * 100).toFixed(0)}/100`);

    // Opportunities for improvement
    console.log('\n💡 Opportunities for Improvement:\n');
    const opportunities = Object.values(audits)
      .filter(audit => audit.details && audit.details.type === 'opportunity' && audit.score < 1)
      .sort((a, b) => (b.numericValue || 0) - (a.numericValue || 0))
      .slice(0, 5);

    if (opportunities.length > 0) {
      opportunities.forEach((opp, index) => {
        console.log(`   ${index + 1}. ${opp.title}`);
        console.log(`      Potential savings: ${opp.displayValue || 'N/A'}`);
      });
    } else {
      console.log('   ✅ No major opportunities found!');
    }

    // Save full report
    const reportPath = join(process.cwd(), 'lighthouse-report.html');
    writeFileSync(reportPath, runnerResult.report);
    console.log(`\n📄 Full report saved to: ${reportPath}\n`);

    // Return summary for programmatic use
    return {
      performanceScore,
      lcp: {
        value: lcp.numericValue,
        score: lcp.score,
        displayValue: lcp.displayValue,
      },
      tbt: {
        value: tbt.numericValue,
        score: tbt.score,
        displayValue: tbt.displayValue,
      },
      cls: {
        value: cls.numericValue,
        score: cls.score,
        displayValue: cls.displayValue,
      },
    };

  } catch (error) {
    console.error('❌ Error running Lighthouse:', error);
    throw error;
  } finally {
    await chrome.kill();
  }
}

// Run the measurement
measureCoreWebVitals()
  .then(() => {
    console.log('✅ Measurement complete!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Measurement failed:', error);
    process.exit(1);
  });
