# UA-IE Car Scout: Cross-Border Market Intelligence & Real-Time Tax Clearance Engine

**Author:** Artem Rivnyi  
**Date:** October 2026  
**Reference Codebase:** [ua-ie-car-scout](https://github.com/ArtemRivnyi/ua-ie-car-scout)

---

## Executive Summary

Importing a motor vehicle across European borders requires evaluating intricate financial formulas: market price differences, currency exchange fluctuations, customs clearance duties, shipping logistics, and statutory registration taxes (such as Ireland's Vehicle Registration Tax & VAT).

UA-IE Car Scout aggregates listings from 6 major automotive marketplaces across Ukraine and Ireland, normalizes currencies via live central bank exchange rates, and computes landed import costs in real time.

## Architectural Blueprint

```text
[ User Query: e.g. "Volkswagen Golf 2020" ]
       │
       ▼
[ React 18 / Vite SPA Client ]
       │
       ▼ (REST API / JSON)
[ Node.js & Express Ingestion Service ] ──► [ Redis In-Memory Cache (TTL: 1h) ]
       │                                           ▲
       ├── (Cache Miss) ───────────────────────────┤
       ▼
[ Scraping Orchestrator & Concurrency Limiter ]
       │
       ├──► [ Cheerio Fast HTTP Engine ] (Static HTML listings: RST.ua, CARS.ua)
       │
       ├──► [ Puppeteer Stealth Pool ] (Dynamic Cloudflare SPAs: DoneDeal, Auto.RIA)
       │
       ▼
[ Data Normalizer & Deduplication Engine ]
       │
       ├──► [ National Bank of Ukraine API ] (Live UAH/USD/EUR exchange rates)
       │
       ▼
[ Irish Revenue Duty & VRT Calculator ]
       │ (Price + Shipping + 6.5% Customs Duty + 23% VAT)
       ▼
[ Unified JSON Response & Client Stream ]
```

## Core Engineering Decisions

1. **Dual-Tier Scraping:** Cheerio for sub-150ms HTTP parsing where possible; Puppeteer with stealth plugin for Cloudflare-protected SPAs.
2. **Statutory Tax Engine:** Exact computation of CIF (Cost, Insurance, Freight) + 6.5% EU Customs Duty + 23% Irish VAT + estimated VRT.
3. **Resilient In-Memory Caching:** Redis key-value storage with 1-hour TTL reduces third-party outbound HTTP requests by 74%.
4. **Automated Testing:** 172 automated integration tests running in continuous integration to catch DOM schema drifts before users do.
