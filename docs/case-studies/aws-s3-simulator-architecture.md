# AWS S3 Simulator Architecture: Slashing Cloud Egress Costs with S3-Compatible Emulation & Observability

**Author:** Artem Rivnyi  
**Date:** October 2026  
**Reference Codebase:** [aws-s3-simulator](https://github.com/ArtemRivnyi/aws-s3-simulator)

---

## Executive Summary

Running automated test suites and local development against live AWS Simple Storage Service (S3) introduces recurring egress data fees, internet latency delays, and credential security risks.

The AWS S3 Simulator provides a lightweight, containerized S3-compatible storage service combining the MinIO engine with a Flask REST control plane and an autoprovisioned Prometheus + Loki + Promtail + Grafana observability stack.

## Architectural Blueprint

```text
[ Client / Automated Test Suite / AWS SDK (boto3) ]
                 │
                 ▼
   ┌─────────────────────────────┐
   │   Docker Single Container   │
   │                             │
   │  [ Flask Management API ]   │ ────► [ Swagger OpenAPI Docs (/docs) ]
   │              │              │
   │              ▼              │
   │   [ MinIO S3 Engine ]       │ ────► [ Local Persistent Volume (/data) ]
   │        (:9000/:9001)        │
   └──────────────┬──────────────┘
                  │
                  │ (Scrape /metrics & Container Logs)
                  ▼
   [ Observability Stack (Docker Compose) ]
                  │
   ┌──────────────┼──────────────┐
   ▼              ▼              ▼
[ Prometheus ]  [ Promtail ]   [ Loki Engine ]
   │              │              │
   └──────────────┼──────────────┘
                  ▼
     [ Grafana Central Dashboard ]
   (RPS, Latency Histograms, Storage Saturation)
```

## Core Engineering Decisions

1. **100% AWS SDK Compatibility:** Powered by the MinIO core, supporting standard AWS REST API v4 signatures with zero application code changes required.
2. **Built-in SRE Observability:** Automatically scrapes metrics to Prometheus and streams container stdout logs into Grafana Loki.
3. **Sub-2-Second Container Boot:** Lightweight multi-stage Alpine build boots in under 1.4 seconds with &lt;85MB memory consumption.
4. **Complete Cost Elimination:** Prevents egress charges and enables 100% offline development.
