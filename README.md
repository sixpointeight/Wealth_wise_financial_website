# Wealth Wise Financial, Inc. Website

A sleek, modern, institutional-grade web presence for **Wealth Wise Financial, Inc.** — an independent, fee-only Registered Investment Advisor (RIA) specializing in high-net-worth portfolio management, tax-alpha harvesting, retirement sequencing, and generational legacy planning.

## Key Features & Redesign Highlights

- **Executive Visual Design**:
  - Deep midnight navy (`#071120`), royal sapphire, and champagne gold palette matching the institutional brand identity.
  - Glassmorphic sticky navigation with scroll detection and responsive drawer menu for mobile/tablet devices.
  - High-conversion hero section featuring dynamic SVG portfolio trajectory graphics, active performance metrics, and trust callouts.

- **Interactive Wealth & Compound Growth Simulator**:
  - Real-time client financial calculator modeling initial capital, monthly additions, time horizon (5–40 years), and expected rates of return.
  - Visual stacked breakdown comparing total capital contributed against accumulated compound interest.

- **Bespoke Wealth Management Solutions**:
  - 6 institutional advisory solutions: Discretionary Portfolio Engineering & Direct Indexing, Retirement Cash-Flow Sequencing, Proactive Tax-Loss Harvesting, Estate & Trust Architecture, Executive Equity & Concentrated Stock (ISOs/RSUs/10b5-1), and Business Succession & Pre-Liquidity Planning.

- **Institutional Trust & Credibility**:
  - Third-party custodial transparency (Charles Schwab Institutional, Fidelity Wealth Services, BNY Mellon Pershing).
  - Credentials & standards: CFP® Certified Financial Planner, CFA® Charterholder, and strict Fiduciary Standard commitment.
  - Side-by-side comparison matrix: Wealth Wise Fee-Only Fiduciary vs. Traditional Brokerage Wirehouses.

- **Interactive Client Engagement**:
  - Interactive FAQ accordion with animated transitions and ARIA accessibility attributes.
  - Client Portal launcher modal with direct links to institutional custodians.
  - Private consultation booking form with investable asset tier selection and immediate confirmation feedback.
  - Quarterly executive research whitepapers and insights.

- **Institutional Compliance & Footer**:
  - SEC RIA disclosures, Form ADV Part 2A and Form CRS references, SIPC/FINRA notices, and legal disclaimers.

## Project Structure

```
├── index.html              # Main semantic HTML5 document
├── styles.css              # Custom responsive CSS design system
├── app.js                  # Interactive calculator, modals, FAQ accordion & navigation
├── logo_shield_transparent.png # Official Wealth Wise Institutional Shield Emblem (Transparent)
├── logo2.png               # Legacy brand logo
├── netlify.toml            # Netlify deployment and security headers configuration
└── README.md               # Project documentation
```

## Local Development

To run the site locally, launch any static file server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .
```

Then navigate to `http://localhost:8000` in your web browser.