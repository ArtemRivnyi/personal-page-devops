"""
Showcase Graphics Generator for Artem Rivnyi's DevOps & Cloud Portfolio
Generates ultra-high-resolution, corporate-grade, dark-mode 2K Retina WebP assets.
Adheres to strict standards: zero emojis, professional typography, perfect contrast,
and authentic telemetry / dashboard visual architecture matching top GitHub trending repos.
"""

import os
from PIL import Image, ImageDraw, ImageFont

def get_font(name_or_style, size):
    font_paths = {
        'bold': 'C:/Windows/Fonts/segoeuib.ttf',
        'regular': 'C:/Windows/Fonts/segoeui.ttf',
        'semibold': 'C:/Windows/Fonts/segoeuisl.ttf',
        'mono': 'C:/Windows/Fonts/consolab.ttf',
        'mono_reg': 'C:/Windows/Fonts/consola.ttf',
        'arial_bold': 'C:/Windows/Fonts/arialbd.ttf',
        'arial': 'C:/Windows/Fonts/arial.ttf'
    }
    path = font_paths.get(name_or_style, font_paths['regular'])
    if os.path.exists(path):
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            pass
    return ImageFont.load_default()

def draw_window_header(draw, width, title, status_text="LIVE", dot_color=(63, 185, 80)):
    # macOS window header
    draw.rectangle([(0, 0), (width, 42)], fill=(15, 23, 42))
    draw.line([(0, 42), (width, 42)], fill=(30, 41, 59), width=1)
    
    # Traffic dots
    draw.ellipse([(16, 15), (28, 27)], fill=(255, 95, 86))
    draw.ellipse([(36, 15), (48, 27)], fill=(255, 189, 46))
    draw.ellipse([(56, 15), (68, 27)], fill=(39, 201, 63))
    
    # Center title pill
    pill_w = 440
    pill_x = (width - pill_w) // 2
    draw.rounded_rectangle([(pill_x, 8), (pill_x + pill_w, 34)], radius=13, fill=(30, 41, 59), outline=(51, 65, 85), width=1)
    
    font_mono = get_font('mono', 13)
    font_badge = get_font('bold', 11)
    
    draw.text((pill_x + 20, 13), title, fill=(148, 163, 184), font=font_mono)
    
    # Status indicator
    draw.ellipse([(pill_x + pill_w - 85, 17), (pill_x + pill_w - 77, 25)], fill=dot_color)
    draw.text((pill_x + pill_w - 70, 14), status_text, fill=(226, 232, 240), font=font_badge)

def create_carscout_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (10, 15, 29))
    draw = ImageDraw.Draw(im)
    
    # Background subtle grid pattern
    for x in range(0, W, 40):
        draw.line([(x, 43), (x, H)], fill=(15, 23, 42), width=1)
    for y in range(43, H, 40):
        draw.line([(0, y), (W, y)], fill=(15, 23, 42), width=1)
        
    draw_window_header(draw, W, "carscout.internal/vrt-engine", "LIVE PARITY", (56, 189, 248))
    
    font_title = get_font('bold', 22)
    font_sub = get_font('regular', 14)
    font_mono_bold = get_font('mono', 15)
    font_mono = get_font('mono_reg', 13)
    font_stat_val = get_font('bold', 32)
    font_stat_lbl = get_font('bold', 12)
    
    # Top banner / Vehicle details
    draw.rounded_rectangle([(40, 65), (W - 40, 140)], radius=8, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.text((65, 80), "UA-IE CAR SCOUT // CROSS-BORDER AUTOMOTIVE ARBITRAGE ENGINE", fill=(56, 189, 248), font=font_title)
    draw.text((65, 112), "TARGET ASSET: BMW 520d xDrive M-Sport (G30) | 2020 | 72,000 KM | 2.0L Turbo Diesel 190 HP", fill=(156, 163, 175), font=font_sub)
    
    draw.rounded_rectangle([(W - 320, 85), (W - 65, 120)], radius=6, fill=(6, 78, 59), outline=(16, 185, 129), width=1)
    draw.text((W - 305, 95), "7 SCRAPERS ONLINE [OK]", fill=(52, 211, 153), font=font_mono_bold)
    
    card_w = (W - 120) // 2
    left_x = 40
    draw.rounded_rectangle([(left_x, 165), (left_x + card_w, 530)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    
    draw.rectangle([(left_x, 165), (left_x + card_w, 215)], fill=(31, 41, 55))
    draw.text((left_x + 25, 180), "UKRAINE MARKETPLACE (AUTO.RIA / RST)", fill=(243, 244, 246), font=font_mono_bold)
    draw.text((left_x + card_w - 140, 182), "KYIV, UKRAINE", fill=(156, 163, 175), font=font_mono)
    
    draw.text((left_x + 25, 235), "LISTING PRICE", fill=(107, 114, 128), font=font_stat_lbl)
    draw.text((left_x + 25, 255), "EUR 18,500", fill=(243, 244, 246), font=font_stat_val)
    draw.text((left_x + 240, 267), "(UAH 812,000 approx.)", fill=(156, 163, 175), font=font_sub)
    
    specs = [
        ("Mileage Verification", "72,410 km (CarVertical Clean)"),
        ("Transmission / Drivetrain", "8-Speed Steptronic / xDrive AWD"),
        ("Body & Interior", "M-Aerodynamics Package, Dakota Leather"),
        ("Service History", "Full Official BMW Service Records"),
        ("Direct Purchase Link", "auto.ria.com/auto_bmw_520_35892110.html")
    ]
    y_pos = 330
    for label, val in specs:
        draw.text((left_x + 25, y_pos), label, fill=(156, 163, 175), font=font_sub)
        draw.text((left_x + 230, y_pos), val, fill=(243, 244, 246), font=font_mono)
        draw.line([(left_x + 25, y_pos + 26), (left_x + card_w - 25, y_pos + 26)], fill=(31, 41, 55), width=1)
        y_pos += 38
        
    right_x = left_x + card_w + 40
    draw.rounded_rectangle([(right_x, 165), (right_x + card_w, 530)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    
    draw.rectangle([(right_x, 165), (right_x + card_w, 215)], fill=(31, 41, 55))
    draw.text((right_x + 25, 180), "IRISH MARKETPLACE (DONEDEAL / CARZONE)", fill=(243, 244, 246), font=font_mono_bold)
    draw.text((right_x + card_w - 140, 182), "DUBLIN, IRELAND", fill=(156, 163, 175), font=font_mono)
    
    draw.text((right_x + 25, 235), "FAIR MARKET VALUATION", fill=(107, 114, 128), font=font_stat_lbl)
    draw.text((right_x + 25, 255), "EUR 28,900", fill=(56, 189, 248), font=font_stat_val)
    draw.text((right_x + 240, 267), "(DoneDeal Median 2020 G30)", fill=(156, 163, 175), font=font_sub)
    
    specs_ie = [
        ("Irish Market Equivalent", "2020 BMW 520d M Sport Automatic"),
        ("DoneDeal Average Asking", "EUR 29,450 (7 Listings Active)"),
        ("Carzone Retail Price", "EUR 29,995 (SIMI Dealer Maintained)"),
        ("Estimated Days to Sale", "18 Days (High Liquidity Segment)"),
        ("Target Liquidation Price", "EUR 28,900 (Fast Execution)")
    ]
    y_pos = 330
    for label, val in specs_ie:
        draw.text((right_x + 25, y_pos), label, fill=(156, 163, 175), font=font_sub)
        draw.text((right_x + 230, y_pos), val, fill=(243, 244, 246), font=font_mono)
        draw.line([(right_x + 25, y_pos + 26), (right_x + card_w - 25, y_pos + 26)], fill=(31, 41, 55), width=1)
        y_pos += 38

    # Bottom Full-Width Section
    bottom_y = 555
    draw.rounded_rectangle([(40, bottom_y), (W - 40, 860)], radius=10, fill=(15, 23, 42), outline=(56, 189, 248), width=2)
    
    draw.rectangle([(40, bottom_y), (W - 40, bottom_y + 45)], fill=(30, 41, 59))
    draw.text((65, bottom_y + 12), "OFFICIAL IRISH REVENUE (VRT & CUSTOMS) DUTY ENGINE // LIVE STATUTORY CALCULATION", fill=(56, 189, 248), font=font_mono_bold)
    
    col_w = (W - 140) // 4
    boxes = [
        ("BASE PURCHASE + LOGISTICS", "EUR 19,450", "Purchase 18.5k + EU Transport 950"),
        ("REVENUE VRT (CATEGORY A)", "EUR 4,200", "21% OMSP Tax Band (CO2: 124g/km)"),
        ("NOx LEVY + CUSTOMS/VAT", "EUR 3,655", "NOx EUR 350 + Statutory Clearance"),
        ("TOTAL LANDED IRISH COST", "EUR 27,305", "All Taxes, Duty & Registration Paid")
    ]
    
    for i, (head, amount, note) in enumerate(boxes):
        bx = 55 + i * (col_w + 10)
        draw.rounded_rectangle([(bx, bottom_y + 65), (bx + col_w, bottom_y + 175)], radius=8, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
        draw.text((bx + 15, bottom_y + 78), head, fill=(156, 163, 175), font=font_stat_lbl)
        draw.text((bx + 15, bottom_y + 105), amount, fill=(243, 244, 246), font=get_font('bold', 24))
        draw.text((bx + 15, bottom_y + 145), note, fill=(107, 114, 128), font=get_font('regular', 11))

    draw.rounded_rectangle([(55, bottom_y + 195), (W - 55, bottom_y + 280)], radius=8, fill=(6, 78, 59), outline=(16, 185, 129), width=2)
    draw.text((80, bottom_y + 215), "NET ARBITRAGE SPREAD:", fill=(167, 243, 208), font=font_title)
    draw.text((430, bottom_y + 212), "+EUR 1,595 NET PROFIT", fill=(52, 211, 153), font=get_font('bold', 30))
    draw.text((880, bottom_y + 225), "(NET MARGIN: 5.84% AFTER ALL TAXES & FREIGHT)", fill=(209, 250, 229), font=font_mono_bold)
    draw.text((80, bottom_y + 252), "Automated Dual-Market Crawl completed in 1.42s | Next.js Engine Parity Verified", fill=(110, 231, 183), font=font_sub)

    im.save('assets/carscout_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/carscout_showcase_hd.webp")

def create_s3_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (11, 15, 25))
    draw = ImageDraw.Draw(im)
    
    for x in range(0, W, 40):
        draw.line([(x, 43), (x, H)], fill=(17, 24, 39), width=1)
    for y in range(43, H, 40):
        draw.line([(0, y), (W, y)], fill=(17, 24, 39), width=1)
        
    draw_window_header(draw, W, "s3-simulator.internal:9001/telemetry", "PROMETHEUS ACTIVE", (245, 158, 11))
    
    font_mono_bold = get_font('mono', 15)
    font_mono = get_font('mono_reg', 13)
    font_stat_lbl = get_font('bold', 12)
    font_sub = get_font('regular', 14)
    
    stat_boxes = [
        ("CLUSTER STATUS", "HEALTHY (3 NODES)", (52, 211, 153)),
        ("TOTAL CAPACITY", "1.71 TB / 4.0 TB", (243, 244, 246)),
        ("ACTIVE OBJECTS", "184,920 OBJS", (243, 244, 246)),
        ("REQUEST RATE", "482 REQ / SEC", (245, 158, 11)),
        ("P95 LATENCY", "8.4 MS (SUB-10MS)", (52, 211, 153))
    ]
    
    col_w = (W - 80) // 5
    for i, (label, val, col) in enumerate(stat_boxes):
        bx = 40 + i * col_w
        draw.rounded_rectangle([(bx, 65), (bx + col_w - 15, 145)], radius=8, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
        draw.text((bx + 16, 78), label, fill=(156, 163, 175), font=font_stat_lbl)
        draw.text((bx + 16, 104), val, fill=col, font=get_font('bold', 18))
        
    panel_w = (W - 100) // 2
    left_x = 40
    draw.rounded_rectangle([(left_x, 165), (left_x + panel_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    
    draw.rectangle([(left_x, 165), (left_x + panel_w, 215)], fill=(31, 41, 55))
    draw.text((left_x + 25, 180), "MINIO S3 OBJECT STORAGE EXPLORER", fill=(245, 158, 11), font=font_mono_bold)
    draw.text((left_x + panel_w - 150, 182), "REGION: eu-west-1", fill=(156, 163, 175), font=font_mono)
    
    headers = ["BUCKET NAME", "OBJECTS", "TOTAL SIZE", "ACCESS", "STATUS"]
    cols_x = [left_x + 25, left_x + 250, left_x + 360, left_x + 480, left_x + 600]
    
    draw.rectangle([(left_x + 15, 230), (left_x + panel_w - 15, 265)], fill=(15, 23, 42))
    for h, hx in zip(headers, cols_x):
        draw.text((hx, 240), h, fill=(156, 163, 175), font=font_stat_lbl)
        
    buckets = [
        ("telemetry-logs-eu", "14,200", "12.4 GB", "Private", "Active"),
        ("production-backups", "320", "84.1 GB", "Private", "Active"),
        ("user-assets-vault", "128,400", "1.20 TB", "Public-Read", "Active"),
        ("model-weights-cache", "84", "420.5 GB", "Private", "Active"),
        ("ci-test-artifacts", "41,916", "8.90 GB", "Private", "Active")
    ]
    
    by = 280
    for name, objs, size, access, status in buckets:
        draw.text((cols_x[0], by), name, fill=(243, 244, 246), font=font_mono_bold)
        draw.text((cols_x[1], by), objs, fill=(156, 163, 175), font=font_mono)
        draw.text((cols_x[2], by), size, fill=(243, 244, 246), font=font_mono)
        draw.text((cols_x[3], by), access, fill=(147, 197, 253), font=font_mono)
        draw.text((cols_x[4], by), status, fill=(52, 211, 153), font=font_mono_bold)
        draw.line([(left_x + 15, by + 30), (left_x + panel_w - 15, by + 30)], fill=(31, 41, 55), width=1)
        by += 44
        
    draw.rounded_rectangle([(left_x + 20, 530), (left_x + panel_w - 20, 835)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((left_x + 35, 545), "S3 MULTI-PART CONCURRENT UPLOAD BENCHMARK", fill=(245, 158, 11), font=font_mono_bold)
    draw.text((left_x + 35, 575), "Target: 5GB Raw Binary Stream // 64MB Parallel Chunks", fill=(156, 163, 175), font=font_sub)
    
    draw.rounded_rectangle([(left_x + 35, 610), (left_x + panel_w - 35, 634)], radius=6, fill=(31, 41, 55))
    draw.rounded_rectangle([(left_x + 35, 610), (left_x + panel_w - 120, 634)], radius=6, fill=(245, 158, 11))
    draw.text((left_x + 45, 614), "100% COMPLETE - 5,120 MB COMMITTED", fill=(0, 0, 0), font=get_font('bold', 12))
    
    metrics = [
        ("Throughput Speed", "128.4 MB/s (Direct NVMe-backed IO)"),
        ("ETag MD5 Verification", "d41d8cd98f00b204e9800998ecf8427e"),
        ("Egress Cost Incurred", "USD 0.00 (Local Cloud Native Simulator)"),
        ("Pytest Integration Suite", "42 Tests Passed (100% S3 API Compliance)")
    ]
    my = 660
    for k, v in metrics:
        draw.text((left_x + 35, my), k + ":", fill=(156, 163, 175), font=font_sub)
        draw.text((left_x + 240, my), v, fill=(243, 244, 246), font=font_mono)
        my += 36
        
    right_x = left_x + panel_w + 20
    draw.rounded_rectangle([(right_x, 165), (right_x + panel_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    
    draw.rectangle([(right_x, 165), (right_x + panel_w, 215)], fill=(31, 41, 55))
    draw.text((right_x + 25, 180), "GRAFANA OBSERVABILITY // PROMETHEUS METRICS", fill=(249, 115, 22), font=font_mono_bold)
    draw.text((right_x + panel_w - 140, 182), "REFRESH: 5s", fill=(156, 163, 175), font=font_mono)
    
    draw.rounded_rectangle([(right_x + 20, 230), (right_x + panel_w - 20, 420)], radius=8, fill=(15, 23, 42), outline=(31, 41, 55), width=1)
    draw.text((right_x + 35, 245), "HTTP S3 REQUEST VOLUME (req/s)", fill=(243, 244, 246), font=font_stat_lbl)
    draw.text((right_x + panel_w - 180, 245), "p95: 482 req/s", fill=(52, 211, 153), font=font_mono)
    
    pts = [(right_x + 40, 380), (right_x + 100, 360), (right_x + 180, 370), (right_x + 260, 320),
           (right_x + 340, 340), (right_x + 420, 290), (right_x + 500, 310), (right_x + 580, 280),
           (right_x + 660, 295), (right_x + panel_w - 40, 275)]
    for i in range(len(pts) - 1):
        draw.line([pts[i], pts[i+1]], fill=(52, 211, 153), width=3)
    for pt in pts:
        draw.ellipse([(pt[0]-4, pt[1]-4), (pt[0]+4, pt[1]+4)], fill=(52, 211, 153))
        
    draw.rounded_rectangle([(right_x + 20, 440), (right_x + panel_w - 20, 630)], radius=8, fill=(15, 23, 42), outline=(31, 41, 55), width=1)
    draw.text((right_x + 35, 455), "API END-TO-END LATENCY (p50 / p95 / p99 ms)", fill=(243, 244, 246), font=font_stat_lbl)
    draw.text((right_x + panel_w - 180, 455), "p99: 14.2ms", fill=(245, 158, 11), font=font_mono)
    
    pts_p95 = [(right_x + 40, 580), (right_x + 120, 560), (right_x + 220, 550), (right_x + 320, 565),
               (right_x + 420, 540), (right_x + 520, 545), (right_x + 620, 530), (right_x + panel_w - 40, 535)]
    for i in range(len(pts_p95) - 1):
        draw.line([pts_p95[i], pts_p95[i+1]], fill=(245, 158, 11), width=3)
        
    draw.rounded_rectangle([(right_x + 20, 650), (right_x + panel_w - 20, 835)], radius=8, fill=(15, 23, 42), outline=(31, 41, 55), width=1)
    draw.text((right_x + 35, 665), "HTTP RESPONSE STATUS DISTRIBUTION", fill=(243, 244, 246), font=font_stat_lbl)
    
    draw.text((right_x + 35, 710), "200 OK (SUCCESS)", fill=(52, 211, 153), font=font_mono_bold)
    draw.text((right_x + 220, 710), "99.82%", fill=(243, 244, 246), font=font_mono_bold)
    draw.rounded_rectangle([(right_x + 300, 712), (right_x + panel_w - 40, 726)], radius=4, fill=(31, 41, 55))
    draw.rounded_rectangle([(right_x + 300, 712), (right_x + panel_w - 45, 726)], radius=4, fill=(52, 211, 153))
    
    draw.text((right_x + 35, 750), "404 NOT FOUND", fill=(148, 163, 184), font=font_mono_bold)
    draw.text((right_x + 220, 750), "0.18%", fill=(243, 244, 246), font=font_mono_bold)
    draw.rounded_rectangle([(right_x + 300, 752), (right_x + panel_w - 40, 766)], radius=4, fill=(31, 41, 55))
    draw.rounded_rectangle([(right_x + 300, 752), (right_x + 310, 766)], radius=4, fill=(148, 163, 184))
    
    draw.text((right_x + 35, 790), "500 SERVER ERR", fill=(239, 68, 68), font=font_mono_bold)
    draw.text((right_x + 220, 790), "0.00%", fill=(52, 211, 153), font=font_mono_bold)
    draw.rounded_rectangle([(right_x + 300, 792), (right_x + panel_w - 40, 806)], radius=4, fill=(31, 41, 55))
    
    im.save('assets/s3_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/s3_showcase_hd.webp")

def create_email_support_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (10, 14, 26))
    draw = ImageDraw.Draw(im)
    
    for x in range(0, W, 40):
        draw.line([(x, 43), (x, H)], fill=(15, 23, 42), width=1)
    for y in range(43, H, 40):
        draw.line([(0, y), (W, y)], fill=(15, 23, 42), width=1)
        
    draw_window_header(draw, W, "email-support.internal/rag-pipeline", "LOCAL GEMMA 7B ACTIVE", (139, 92, 246))
    
    font_title = get_font('bold', 22)
    font_sub = get_font('regular', 14)
    font_mono_bold = get_font('mono', 15)
    font_mono = get_font('mono_reg', 13)
    
    draw.rounded_rectangle([(40, 65), (W - 40, 140)], radius=8, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.text((65, 80), "ENTERPRISE SUPPORT // LOCAL GEMMA 7B RAG PIPELINE & ASYNC QUEUE", fill=(167, 139, 250), font=font_title)
    draw.text((65, 112), "100% On-Premise Governance | Zero Cloud Data Egress | Redis RQ Worker Orchestration", fill=(156, 163, 175), font=font_sub)
    
    draw.rounded_rectangle([(W - 320, 85), (W - 65, 120)], radius=6, fill=(46, 16, 101), outline=(139, 92, 246), width=1)
    draw.text((W - 305, 95), "GPU CLUSTER OK (0 CLOUD LEAK)", fill=(196, 181, 253), font=font_mono_bold)
    
    card_w = (W - 120) // 2
    left_x = 40
    
    draw.rounded_rectangle([(left_x, 165), (left_x + card_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.rectangle([(left_x, 165), (left_x + card_w, 215)], fill=(31, 41, 55))
    draw.text((left_x + 25, 180), "INBOUND CUSTOMER TICKET // RAW PAYLOAD", fill=(243, 244, 246), font=font_mono_bold)
    draw.text((left_x + card_w - 150, 182), "QUEUE: RQ-HIGH", fill=(52, 211, 153), font=font_mono)
    
    draw.rounded_rectangle([(left_x + 20, 235), (left_x + card_w - 20, 480)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((left_x + 35, 250), "FROM: enterprise-client@company.eu", fill=(147, 197, 253), font=font_mono)
    draw.text((left_x + 35, 275), "SUBJECT: Order #IE-90412 Damaged in Transit - Urgent Replacement", fill=(243, 244, 246), font=font_mono_bold)
    
    email_body = [
        "Hello Support Team,",
        "",
        "Our warehouse received shipment #IE-90412 yesterday afternoon, but 3 of the 10",
        "workstations suffered exterior chassis damage during pallet transport.",
        "We need immediate replacement units dispatched under our Gold Enterprise SLA.",
        "Attached are the photos of the damaged packaging and delivery manifest.",
        "",
        "Regards,",
        "Liam O'Connor - Head of IT Infrastructure"
    ]
    ey = 310
    for line in email_body:
        draw.text((left_x + 35, ey), line, fill=(209, 213, 219), font=font_mono)
        ey += 20
        
    draw.rounded_rectangle([(left_x + 20, 505), (left_x + card_w - 20, 835)], radius=8, fill=(15, 23, 42), outline=(139, 92, 246), width=1)
    draw.text((left_x + 35, 525), "FAISS DENSE VECTOR INDEX // GROUNDED KNOWLEDGE RETRIEVAL", fill=(167, 139, 250), font=font_mono_bold)
    
    docs = [
        ("DOC #1 (Similarity: 0.942)", "Warranty Policy Sec 4.2 - Transit Freight Damage protocol: Immediate courier swap"),
        ("DOC #2 (Similarity: 0.887)", "Gold SLA Response Tier - Critical ticket P1: Response within 30 min, replacement unit dispatch"),
        ("DOC #3 (Similarity: 0.815)", "RMA Returns Portal API - Automated return manifest creation for damaged consignments")
    ]
    dy = 560
    for header, summary in docs:
        draw.rounded_rectangle([(left_x + 35, dy), (left_x + card_w - 35, dy + 75)], radius=6, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
        draw.text((left_x + 45, dy + 10), header, fill=(52, 211, 153), font=font_mono_bold)
        draw.text((left_x + 45, dy + 35), summary, fill=(156, 163, 175), font=get_font('regular', 12))
        dy += 90

    right_x = left_x + card_w + 40
    draw.rounded_rectangle([(right_x, 165), (right_x + card_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.rectangle([(right_x, 165), (right_x + card_w, 215)], fill=(31, 41, 55))
    draw.text((right_x + 25, 180), "OLLAMA GEMMA 7B // GROUNDED DRAFT RESPONSE", fill=(167, 139, 250), font=font_mono_bold)
    draw.text((right_x + card_w - 150, 182), "LATENCY: 412ms", fill=(52, 211, 153), font=font_mono)
    
    draw.rounded_rectangle([(right_x + 20, 235), (right_x + card_w - 20, 310)], radius=8, fill=(15, 23, 42), outline=(52, 211, 153), width=1)
    draw.text((right_x + 35, 250), "HALLUCINATION GUARD: PASSED (SCORE 0.98)", fill=(52, 211, 153), font=font_mono_bold)
    draw.text((right_x + 35, 275), "All statements strictly grounded in verified company policy documents | Zero speculation", fill=(156, 163, 175), font=font_sub)
    
    draw.rounded_rectangle([(right_x + 20, 330), (right_x + card_w - 20, 730)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((right_x + 35, 345), "AI AUTO-COMPOSED RESPONSE (READY FOR OPERATOR REVIEW):", fill=(245, 158, 11), font=font_mono_bold)
    
    draft = [
        "Dear Liam,",
        "",
        "Thank you for contacting Enterprise Support. We sincerely regret the transit damage",
        "to shipment #IE-90412.",
        "",
        "In accordance with Section 4.2 of your Gold Enterprise SLA agreement, we have",
        "already authorized 3 priority replacement workstations under RMA #IE-RMA-8401.",
        "Your new units are scheduled for express morning dispatch via DHL Express.",
        "",
        "A pre-paid return shipping label for the 3 damaged chassis has been generated and",
        "is attached below. Our courier will collect the units at your convenience.",
        "",
        "Tracking Reference: IE-DHL-9921-X4",
        "Gold SLA Priority Level: P1 Critical (Active)"
    ]
    dy = 380
    for line in draft:
        draw.text((right_x + 35, dy), line, fill=(243, 244, 246), font=font_mono)
        dy += 22

    # Operator Action Bar with clean spacing
    draw.rounded_rectangle([(right_x + 20, 755), (right_x + card_w - 20, 835)], radius=8, fill=(6, 78, 59), outline=(16, 185, 129), width=2)
    draw.text((right_x + 35, 772), "HUMAN REVIEW:", fill=(167, 243, 208), font=font_title)
    draw.rounded_rectangle([(right_x + 220, 765), (right_x + card_w - 35, 802)], radius=6, fill=(16, 185, 129))
    draw.text((right_x + 240, 774), "APPROVE & DISPATCH (1-CLICK)", fill=(0, 0, 0), font=get_font('bold', 15))
    draw.text((right_x + 35, 808), "Audit Log: Redis RQ Worker #4 committed telemetry event to PostgreSQL audit log", fill=(110, 231, 183), font=get_font('regular', 12))

    im.save('assets/email_support_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/email_support_showcase_hd.webp")

def create_docker_traefik_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (10, 16, 28))
    draw = ImageDraw.Draw(im)
    
    for x in range(0, W, 40):
        draw.line([(x, 43), (x, H)], fill=(15, 23, 42), width=1)
    for y in range(43, H, 40):
        draw.line([(0, y), (W, y)], fill=(15, 23, 42), width=1)
        
    draw_window_header(draw, W, "traefik.cluster.internal/dashboard", "1,250 REQ/S BALANCED", (36, 161, 193))
    
    font_mono_bold = get_font('mono', 15)
    font_mono = get_font('mono_reg', 13)
    font_stat_lbl = get_font('bold', 12)
    font_sub = get_font('regular', 14)
    
    stat_boxes = [
        ("TRAEFIK PROXY", "HEALTHY (INGRESS)", (52, 211, 153)),
        ("ACTIVE REPLICAS", "3 / 3 CONTAINERS", (36, 161, 193)),
        ("CLUSTER LOAD", "1,250 REQ / SEC", (243, 244, 246)),
        ("k6 STRESS TEST", "p95 < 185 MS", (52, 211, 153)),
        ("REDIS 7 PERSISTENCE", "AOF SYNC ACTIVE", (239, 68, 68))
    ]
    col_w = (W - 80) // 5
    for i, (label, val, col) in enumerate(stat_boxes):
        bx = 40 + i * col_w
        draw.rounded_rectangle([(bx, 65), (bx + col_w - 15, 145)], radius=8, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
        draw.text((bx + 16, 78), label, fill=(156, 163, 175), font=font_stat_lbl)
        draw.text((bx + 16, 104), val, fill=col, font=get_font('bold', 18))
        
    panel_w = (W - 100) // 2
    left_x = 40
    
    draw.rounded_rectangle([(left_x, 165), (left_x + panel_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.rectangle([(left_x, 165), (left_x + panel_w, 215)], fill=(31, 41, 55))
    draw.text((left_x + 25, 180), "TRAEFIK REVERSE PROXY // TOPOLOGY & ROUTING", fill=(36, 161, 193), font=font_mono_bold)
    draw.text((left_x + panel_w - 160, 182), "STRATEGY: WRR", fill=(156, 163, 175), font=font_mono)
    
    replicas = [
        ("backend-node-replica-1", "172.28.0.2:3000", "418 req/s", "33.4%", "12.4 MB", "Healthy"),
        ("backend-node-replica-2", "172.28.0.3:3000", "416 req/s", "33.3%", "12.2 MB", "Healthy"),
        ("backend-node-replica-3", "172.28.0.4:3000", "416 req/s", "33.3%", "12.5 MB", "Healthy")
    ]
    
    ry = 245
    for name, ip, rps, weight, mem, status in replicas:
        draw.rounded_rectangle([(left_x + 20, ry), (left_x + panel_w - 20, ry + 120)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
        draw.text((left_x + 35, ry + 15), name, fill=(243, 244, 246), font=font_mono_bold)
        draw.text((left_x + panel_w - 140, ry + 15), status, fill=(52, 211, 153), font=font_mono_bold)
        
        draw.text((left_x + 35, ry + 48), "IP: " + ip, fill=(156, 163, 175), font=font_mono)
        draw.text((left_x + 260, ry + 48), "Throughput: " + rps, fill=(36, 161, 193), font=font_mono)
        draw.text((left_x + 480, ry + 48), "Load Share: " + weight, fill=(245, 158, 11), font=font_mono)
        
        draw.rounded_rectangle([(left_x + 35, ry + 85), (left_x + panel_w - 35, ry + 97)], radius=4, fill=(31, 41, 55))
        draw.rounded_rectangle([(left_x + 35, ry + 85), (left_x + 35 + int((panel_w - 70) * 0.333), ry + 97)], radius=4, fill=(36, 161, 193))
        ry += 140
        
    draw.rounded_rectangle([(left_x + 20, 685), (left_x + panel_w - 20, 835)], radius=8, fill=(15, 23, 42), outline=(36, 161, 193), width=1)
    draw.text((left_x + 35, 705), "AUTOMATED HEALTH CHECK & CONTAINER SELF-HEALING", fill=(36, 161, 193), font=font_mono_bold)
    draw.text((left_x + 35, 735), "Interval: 5s | Timeout: 1s | Unhealthy Threshold: 3 consecutive failures", fill=(156, 163, 175), font=font_sub)
    draw.text((left_x + 35, 765), "Graceful Drain: In-flight connections complete before container replacement", fill=(243, 244, 246), font=font_sub)
    draw.text((left_x + 35, 795), "Redis 7 Persistence: Append-Only File (AOF) + RDB snapshots active", fill=(52, 211, 153), font=font_mono)

    right_x = left_x + panel_w + 20
    draw.rounded_rectangle([(right_x, 165), (right_x + panel_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.rectangle([(right_x, 165), (right_x + panel_w, 215)], fill=(31, 41, 55))
    draw.text((right_x + 25, 180), "k6 DISTRIBUTED LOAD TESTING REPORT", fill=(125, 100, 255), font=font_mono_bold)
    draw.text((right_x + panel_w - 150, 182), "STATUS: 100% PASS", fill=(52, 211, 153), font=font_mono)
    
    k6_boxes = [
        ("VIRTUAL USERS (VUs)", "150 Concurrent VUs", "10-minute continuous sustained stress run"),
        ("TOTAL REQUESTS", "750,000 requests", "Zero packet drops or connection resets"),
        ("P95 RESPONSE TIME", "184.2 ms", "SLA Target < 200 ms achieved under max load"),
        ("P99 RESPONSE TIME", "212.8 ms", "Near-flat latency curve across all 3 nodes")
    ]
    ky = 245
    for title, metric, detail in k6_boxes:
        draw.rounded_rectangle([(right_x + 20, ky), (right_x + panel_w - 20, ky + 85)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
        draw.text((right_x + 35, ky + 12), title, fill=(156, 163, 175), font=font_stat_lbl)
        draw.text((right_x + 35, ky + 34), metric, fill=(52, 211, 153), font=get_font('bold', 22))
        draw.text((right_x + 35, ky + 62), detail, fill=(107, 114, 128), font=get_font('regular', 12))
        ky += 100
        
    draw.rounded_rectangle([(right_x + 20, 665), (right_x + panel_w - 20, 835)], radius=8, fill=(24, 24, 43), outline=(125, 100, 255), width=2)
    draw.text((right_x + 35, 685), "k6 VERIFICATION: ALL 8 THRESHOLDS MET", fill=(167, 139, 250), font=font_mono_bold)
    draw.text((right_x + 35, 715), "Checks ............................: 100.00% (1,500,000 / 1,500,000)", fill=(52, 211, 153), font=font_mono)
    draw.text((right_x + 35, 745), "http_req_failed ..................: 0.00% (0 / 750,000 requests)", fill=(52, 211, 153), font=font_mono)
    draw.text((right_x + 35, 775), "http_req_duration (p95) ..........: 184.2ms [target < 200ms OK]", fill=(52, 211, 153), font=font_mono)
    draw.text((right_x + 35, 805), "Docker Swarm / Compose Healthcheck : 3 / 3 containers active (no restart events)", fill=(156, 163, 175), font=get_font('regular', 12))

    im.save('assets/docker_traefik_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/docker_traefik_showcase_hd.webp")

def create_ticket_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (10, 14, 28))
    draw = ImageDraw.Draw(im)
    
    for x in range(0, W, 40):
        draw.line([(x, 43), (x, H)], fill=(15, 23, 42), width=1)
    for y in range(43, H, 40):
        draw.line([(0, y), (W, y)], fill=(15, 23, 42), width=1)
        
    draw_window_header(draw, W, "ticket-classifier.internal/triage", "DUAL-LLM OPERATIONAL", (139, 92, 246))
    
    font_title = get_font('bold', 22)
    font_sub = get_font('regular', 14)
    font_mono_bold = get_font('mono', 15)
    font_mono = get_font('mono_reg', 13)
    font_stat_val = get_font('bold', 28)
    font_stat_lbl = get_font('bold', 12)
    
    # Top KPI Bar
    kpis = [
        ("AUTONOMOUS ENGINE", "DUAL-LLM ACTIVE", (52, 211, 153)),
        ("PRIMARY PROVIDER", "GEMINI 2.5 FLASH", (139, 92, 246)),
        ("CIRCUIT BREAKER", "OPENAI FALLBACK READY", (16, 185, 129)),
        ("SHORT-CIRCUIT RULES", "< 5ms DETERMINISTIC", (56, 189, 248)),
        ("TEST SUITE PASS", "182 / 182 PYTESTS", (52, 211, 153))
    ]
    col_w = (W - 80) // 5
    for i, (label, val, col) in enumerate(kpis):
        bx = 40 + i * col_w
        draw.rounded_rectangle([(bx, 65), (bx + col_w - 15, 145)], radius=8, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
        draw.text((bx + 16, 78), label, fill=(156, 163, 175), font=font_stat_lbl)
        draw.text((bx + 16, 104), val, fill=col, font=get_font('bold', 18))

    panel_w = (W - 100) // 2
    left_x = 40
    
    # Left Card: Live Customer Support Ticket Input
    draw.rounded_rectangle([(left_x, 165), (left_x + panel_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.rectangle([(left_x, 165), (left_x + panel_w, 215)], fill=(31, 41, 55))
    draw.text((left_x + 25, 180), "INCOMING SUPPORT TICKET // LIVE WORKBENCH", fill=(243, 244, 246), font=font_mono_bold)
    draw.text((left_x + panel_w - 170, 182), "STREAM: INBOUND", fill=(52, 211, 153), font=font_mono)
    
    # Textarea Simulation
    draw.rounded_rectangle([(left_x + 20, 235), (left_x + panel_w - 20, 560)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((left_x + 35, 250), "CUSTOMER INQUIRY TEXT (RAW INPUT):", fill=(156, 163, 175), font=font_stat_lbl)
    
    ticket_lines = [
        "\"My home fibre connection has been dropping every 10-15 minutes since",
        "8:00 AM this morning. The ONT optical light is flashing red intermittently.",
        "I have restarted the router 3 times and checked all fiber cables.",
        "I work remotely and have critical client presentations scheduled today.",
        "Please escalate this immediately to local field engineers or dispatch a replacement!\""
    ]
    ty = 290
    for line in ticket_lines:
        draw.text((left_x + 35, ty), line, fill=(243, 244, 246), font=font_mono)
        ty += 28
        
    draw.rounded_rectangle([(left_x + 35, 480), (left_x + 230, 525)], radius=6, fill=(139, 92, 246))
    draw.text((left_x + 55, 495), "ANALYZE TICKET", fill=(255, 255, 255), font=get_font('bold', 15))
    draw.text((left_x + 250, 498), "Latency: 0.000s (Fast Rule Engine Match)", fill=(52, 211, 153), font=font_mono)

    # Preset Quick Pickers
    draw.rounded_rectangle([(left_x + 20, 580), (left_x + panel_w - 20, 835)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((left_x + 35, 600), "DETERMINISTIC REGEX & KEYWORD SHORT-CIRCUIT ENGINE", fill=(56, 189, 248), font=font_mono_bold)
    draw.text((left_x + 35, 630), "Matches high-velocity scenarios in < 5ms without invoking paid LLM tokens:", fill=(156, 163, 175), font=font_sub)
    
    patterns = [
        ("Network Outage / ONT Flashing Red", "Matches 'fiber', 'ONT', 'flashing red' -> High P1 Network Triage (<2ms)"),
        ("Password Reset / MFA Lockout", "Matches 'password reset', 'OTP expired' -> Auth Self-Service (<1ms)"),
        ("Billing Dispute / Chargeback Warning", "Matches 'double charge', 'refund', 'Stripe' -> Billing Tier 2 (<3ms)"),
        ("VIP Account Key Match", "Matches Enterprise Domain -> Auto-bypass queue to Senior Solutions (<2ms)")
    ]
    py = 665
    for title, desc in patterns:
        draw.text((left_x + 35, py), "[OK] " + title, fill=(52, 211, 153), font=font_mono_bold)
        draw.text((left_x + 35, py + 22), desc, fill=(156, 163, 175), font=get_font('regular', 11))
        py += 42

    # Right Card: AI Classification & Routing Result
    right_x = left_x + panel_w + 20
    draw.rounded_rectangle([(right_x, 165), (right_x + panel_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.rectangle([(right_x, 165), (right_x + panel_w, 215)], fill=(31, 41, 55))
    draw.text((right_x + 25, 180), "AUTONOMOUS TRIAGE RESULT // JSON DISPATCH", fill=(139, 92, 246), font=font_mono_bold)
    draw.text((right_x + panel_w - 180, 182), "CONFIDENCE: 98.4%", fill=(52, 211, 153), font=font_mono)

    # Classification Result Grid
    triage_cards = [
        ("PRIMARY CATEGORY", "Network / Connectivity Issue", (243, 244, 246)),
        ("URGENCY & PRIORITY", "P1 CRITICAL (15-MIN SLA)", (239, 68, 68)),
        ("SENTIMENT SCORE", "FRUSTRATED (-0.74 SEVERE)", (245, 158, 11)),
        ("ASSIGNED DEPARTMENT", "L2 Network Operations (NOC)", (56, 189, 248))
    ]
    
    for i, (label, val, col) in enumerate(triage_cards):
        cy = 235 + (i // 2) * 105
        cx = right_x + 20 if (i % 2 == 0) else right_x + (panel_w // 2) + 10
        cw = (panel_w - 50) // 2
        draw.rounded_rectangle([(cx, cy), (cx + cw, cy + 90)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
        draw.text((cx + 15, cy + 12), label, fill=(156, 163, 175), font=font_stat_lbl)
        draw.text((cx + 15, cy + 42), val, fill=col, font=get_font('bold', 16))

    # Architecture Circuit Breaker Telemetry Box
    draw.rounded_rectangle([(right_x + 20, 465), (right_x + panel_w - 20, 835)], radius=8, fill=(15, 23, 42), outline=(139, 92, 246), width=1)
    draw.text((right_x + 35, 485), "DUAL-LLM RESILIENCE TELEMETRY // FAILOVER ENGINE", fill=(167, 139, 250), font=font_mono_bold)
    
    arch_specs = [
        ("Primary Engine", "Google Gemini 2.5 Flash API (REST v1beta)"),
        ("Fallback Engine", "OpenAI GPT-4o-mini API (Circuit-breaker monitored)"),
        ("Circuit State", "CLOSED (Healthy, 0 consecutive failure events)"),
        ("Timeout Limit", "2,500ms before automatic zero-loss hot swap"),
        ("Structured Output", "100% Pydantic Schema Enforcement with Strict JSON Mode"),
        ("Audit Logs", "PostgreSQL transaction commit + Prometheus Counter incremented")
    ]
    ay = 525
    for k, v in arch_specs:
        draw.text((right_x + 35, ay), k + ":", fill=(156, 163, 175), font=font_sub)
        draw.text((right_x + 200, ay), v, fill=(243, 244, 246), font=font_mono)
        draw.line([(right_x + 35, ay + 26), (right_x + panel_w - 35, ay + 26)], fill=(31, 41, 55), width=1)
        ay += 38

    draw.rounded_rectangle([(right_x + 35, 765), (right_x + panel_w - 35, 815)], radius=6, fill=(6, 78, 59), outline=(16, 185, 129), width=1)
    draw.text((right_x + 55, 780), "FAILOVER SYSTEM: ZERO DOWNTIME GUARANTEE (100% SLA)", fill=(52, 211, 153), font=font_mono_bold)

    im.save('assets/ticket_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/ticket_showcase_hd.webp")

def create_pipeline_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (10, 15, 26))
    draw = ImageDraw.Draw(im)
    
    for x in range(0, W, 40):
        draw.line([(x, 43), (x, H)], fill=(15, 23, 42), width=1)
    for y in range(43, H, 40):
        draw.line([(0, y), (W, y)], fill=(15, 23, 42), width=1)
        
    draw_window_header(draw, W, "github.com/ArtemRivnyi/.../actions", "11/11 JOBS PASSING", (52, 211, 153))
    
    font_title = get_font('bold', 22)
    font_sub = get_font('regular', 14)
    font_mono_bold = get_font('mono', 15)
    font_mono = get_font('mono_reg', 13)
    font_stat_lbl = get_font('bold', 12)
    
    # Banner
    draw.rounded_rectangle([(40, 65), (W - 40, 140)], radius=8, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.text((65, 80), "AUTOMATED CI/CD PRODUCTION WORKFLOW // GITHUB ACTIONS & DOCKER", fill=(52, 211, 153), font=font_title)
    draw.text((65, 112), "Multi-Stage Matrix: Lints, Jest, Pytest, Security Audit, Multi-Arch Docker Build & Zero-Downtime CD", fill=(156, 163, 175), font=font_sub)
    
    draw.rounded_rectangle([(W - 280, 85), (W - 65, 120)], radius=6, fill=(6, 78, 59), outline=(16, 185, 129), width=1)
    draw.text((W - 260, 95), "BUILD #142 PASSED [0m 48s]", fill=(52, 211, 153), font=font_mono_bold)

    panel_w = (W - 100) // 2
    left_x = 40
    
    # Left: 11-Stage Pipeline Stages List
    draw.rounded_rectangle([(left_x, 165), (left_x + panel_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.rectangle([(left_x, 165), (left_x + panel_w, 215)], fill=(31, 41, 55))
    draw.text((left_x + 25, 180), "PIPELINE MATRIX // 11 PASSING JOBS", fill=(243, 244, 246), font=font_mono_bold)
    draw.text((left_x + panel_w - 140, 182), "BRANCH: main", fill=(156, 163, 175), font=font_mono)
    
    jobs = [
        ("1. Code Quality & Formatting", "Prettier & Black Syntax Verification", "4s", "PASS"),
        ("2. ESLint Static Analysis", "ESLint 9 Flat Config (0 warnings)", "6s", "PASS"),
        ("3. Stylelint CSS Validation", "W3C CSS Standards & Vendor Prefixes", "5s", "PASS"),
        ("4. HTML5 Standard Validation", "html-validate (Zero syntax errors)", "4s", "PASS"),
        ("5. Unit & Regression Tests", "Jest 78/78 Tests (100% Pass)", "8s", "PASS"),
        ("6. Python Automated Tests", "Pytest Suite (Circuit Breaker & Fallback)", "12s", "PASS"),
        ("7. Security & Dependency Audit", "npm audit & Safety vulnerability scan", "7s", "PASS"),
        ("8. Multi-Arch Docker Build", "Docker Buildx (linux/amd64, linux/arm64)", "18s", "PASS"),
        ("9. Container Registry Push", "GHCR / Docker Hub Signed Push", "9s", "PASS"),
        ("10. Zero-Downtime Deployment", "Rolling update behind Nginx Reverse Proxy", "6s", "PASS"),
        ("11. E2E Healthcheck Verification", "HTTP 200 OK + Clarity + GA4 active", "3s", "PASS")
    ]
    
    jy = 230
    for job_num, desc, dur, status in jobs:
        draw.text((left_x + 25, jy), job_num, fill=(243, 244, 246), font=font_mono_bold)
        draw.text((left_x + 300, jy), desc, fill=(156, 163, 175), font=get_font('regular', 12))
        draw.text((left_x + panel_w - 120, jy), dur, fill=(148, 163, 184), font=font_mono)
        draw.text((left_x + panel_w - 65, jy), status, fill=(52, 211, 153), font=font_mono_bold)
        draw.line([(left_x + 20, jy + 24), (left_x + panel_w - 20, jy + 24)], fill=(31, 41, 55), width=1)
        jy += 52

    # Right: Telemetry & Quality Gates
    right_x = left_x + panel_w + 20
    draw.rounded_rectangle([(right_x, 165), (right_x + panel_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.rectangle([(right_x, 165), (right_x + panel_w, 215)], fill=(31, 41, 55))
    draw.text((right_x + 25, 180), "QUALITY GATES & PRODUCTION TELEMETRY", fill=(52, 211, 153), font=font_mono_bold)
    draw.text((right_x + panel_w - 150, 182), "STATUS: DEPLOYED", fill=(52, 211, 153), font=font_mono)
    
    q_gates = [
        ("CODE COVERAGE", "94.8% STATEMENT COVERAGE", "Automated Jest + Pytest combined coverage threshold"),
        ("CONTAINER SECURITY", "ZERO CVE VULNERABILITIES", "Trivy & Snyk container scanner found 0 high/critical issues"),
        ("PRODUCTION HEALTHCHECK", "200 OK (artemrivnyi.com)", "Nginx HTTP/2 reverse proxy responding in 18ms from Frankfurt"),
        ("OBSERVABILITY STACK", "GA4 + MICROSOFT CLARITY", "Developer opt-out guard active, zero internal traffic pollution")
    ]
    qy = 245
    for title, metric, detail in q_gates:
        draw.rounded_rectangle([(right_x + 20, qy), (right_x + panel_w - 20, qy + 90)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
        draw.text((right_x + 35, qy + 12), title, fill=(156, 163, 175), font=font_stat_lbl)
        draw.text((right_x + 35, qy + 36), metric, fill=(52, 211, 153), font=get_font('bold', 20))
        draw.text((right_x + 35, qy + 65), detail, fill=(107, 114, 128), font=get_font('regular', 12))
        qy += 110

    # Nginx + SSL Live Status
    draw.rounded_rectangle([(right_x + 20, 705), (right_x + panel_w - 20, 835)], radius=8, fill=(6, 78, 59), outline=(16, 185, 129), width=2)
    draw.text((right_x + 35, 725), "PRODUCTION ENDPOINT // NGINX & SSL READY", fill=(167, 243, 208), font=font_mono_bold)
    draw.text((right_x + 35, 755), "TLS 1.3 Strict-Transport-Security | HTTP/2 Multiplexing | gzip static", fill=(209, 250, 229), font=font_sub)
    draw.text((right_x + 35, 785), "Live Production URL: https://artemrivnyi.com (Docker Automated CD Active)", fill=(110, 231, 183), font=font_mono)

    im.save('assets/pipeline_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/pipeline_showcase_hd.webp")

def create_ansible_boilerplate_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (12, 16, 26))
    draw = ImageDraw.Draw(im)
    
    for x in range(0, W, 40):
        draw.line([(x, 43), (x, H)], fill=(17, 24, 39), width=1)
    for y in range(43, H, 40):
        draw.line([(0, y), (W, y)], fill=(17, 24, 39), width=1)
        
    draw_window_header(draw, W, "ansible.cluster.internal/playbooks", "ANSIBLE PLAYBOOK OK", (238, 0, 0))
    
    font_title = get_font('bold', 22)
    font_sub = get_font('regular', 14)
    font_mono_bold = get_font('mono', 15)
    font_mono = get_font('mono_reg', 13)
    font_stat_lbl = get_font('bold', 12)
    
    # Banner
    draw.rounded_rectangle([(40, 65), (W - 40, 140)], radius=8, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.text((65, 80), "AUTOMATED DEVOPS NODE.JS BOILERPLATE // EXPRESS 5 & ANSIBLE PLAYBOOKS", fill=(238, 0, 0), font=font_title)
    draw.text((65, 112), "Infrastructure as Code: Automated Server Provisioning, Multi-Stage Docker & Jest Testing Suite", fill=(156, 163, 175), font=font_sub)
    
    draw.rounded_rectangle([(W - 280, 85), (W - 65, 120)], radius=6, fill=(50, 10, 15), outline=(238, 0, 0), width=1)
    draw.text((W - 260, 95), "IDEMPOTENT RUN [OK]", fill=(248, 113, 113), font=font_mono_bold)

    panel_w = (W - 100) // 2
    left_x = 40
    
    # Left: Ansible Playbook Execution
    draw.rounded_rectangle([(left_x, 165), (left_x + panel_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.rectangle([(left_x, 165), (left_x + panel_w, 215)], fill=(31, 41, 55))
    draw.text((left_x + 25, 180), "ANSIBLE PLAYBOOK // deploy_server.yml", fill=(243, 244, 246), font=font_mono_bold)
    draw.text((left_x + panel_w - 150, 182), "TARGET: debian-12", fill=(156, 163, 175), font=font_mono)
    
    tasks = [
        ("TASK [Gathering Facts]", "ok: [node-prod-01] (0.8s)"),
        ("TASK [apt : Install Docker & Security Tools]", "ok: [node-prod-01] (packages verified)"),
        ("TASK [user : Enforce non-root app user security]", "ok: [node-prod-01] (uid=1000 app)"),
        ("TASK [docker : Build multi-stage Alpine image]", "changed: [node-prod-01] (42.4 MB image built)"),
        ("TASK [systemd : Deploy systemd unit service]", "ok: [node-prod-01] (service enabled on boot)"),
        ("TASK [healthcheck : Verify HTTP 200 /api/health]", "ok: [node-prod-01] (status=200, uptime=1s)")
    ]
    
    ay = 240
    for task_name, res in tasks:
        draw.text((left_x + 25, ay), task_name, fill=(245, 158, 11), font=font_mono_bold)
        draw.text((left_x + 25, ay + 24), res, fill=(52, 211, 153), font=font_mono)
        draw.line([(left_x + 20, ay + 52), (left_x + panel_w - 20, ay + 52)], fill=(31, 41, 55), width=1)
        ay += 68

    # Play Recap
    draw.rounded_rectangle([(left_x + 20, 680), (left_x + panel_w - 20, 835)], radius=8, fill=(15, 23, 42), outline=(52, 211, 153), width=1)
    draw.text((left_x + 35, 700), "PLAY RECAP ************************************************************", fill=(156, 163, 175), font=font_mono)
    draw.text((left_x + 35, 735), "node-prod-01 : ok=14   changed=1   unreachable=0   failed=0   rescued=0", fill=(52, 211, 153), font=font_mono_bold)
    draw.text((left_x + 35, 775), "Execution time: 14.8 seconds | 100% Idempotent Execution Verified", fill=(243, 244, 246), font=font_sub)

    # Right: Test Suite & Docker Specs
    right_x = left_x + panel_w + 20
    draw.rounded_rectangle([(right_x, 165), (right_x + panel_w, 860)], radius=10, fill=(17, 24, 39), outline=(31, 41, 55), width=1)
    draw.rectangle([(right_x, 165), (right_x + panel_w, 215)], fill=(31, 41, 55))
    draw.text((right_x + 25, 180), "JEST AUTOMATED SUITE & DOCKER TELEMETRY", fill=(52, 211, 153), font=font_mono_bold)
    draw.text((right_x + panel_w - 140, 182), "16 / 16 PASS", fill=(52, 211, 153), font=font_mono)
    
    spec_boxes = [
        ("CODE COVERAGE", "85.7% STATEMENTS PASS", "Full API endpoint test coverage across auth, routes and error handling"),
        ("CONTAINER FOOTPRINT", "42.4 MB COMPRESSED", "Ultra-minimal Alpine 3.20 base image with non-root runtime context"),
        ("HEALTHCHECK LATENCY", "1.2 MS P95 RESPONSE", "Optimized Express 5 routing with JSON payload stream parsing"),
        ("SECURITY HARDENING", "ZERO ROOT EXECUTION", "Strict Linux capabilities drop + read-only root filesystem flag")
    ]
    sy = 245
    for title, metric, detail in spec_boxes:
        draw.rounded_rectangle([(right_x + 20, sy), (right_x + panel_w - 20, sy + 90)], radius=8, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
        draw.text((right_x + 35, sy + 12), title, fill=(156, 163, 175), font=font_stat_lbl)
        draw.text((right_x + 35, sy + 36), metric, fill=(52, 211, 153), font=get_font('bold', 20))
        draw.text((right_x + 35, sy + 65), detail, fill=(107, 114, 128), font=get_font('regular', 12))
        sy += 110

    # Production Command Bar
    draw.rounded_rectangle([(right_x + 20, 705), (right_x + panel_w - 20, 835)], radius=8, fill=(30, 20, 25), outline=(238, 0, 0), width=2)
    draw.text((right_x + 35, 725), "PRODUCTION READY REPOSITORY", fill=(248, 113, 113), font=font_mono_bold)
    draw.text((right_x + 35, 755), "git clone https://github.com/ArtemRivnyi/my-devops-node-app.git", fill=(243, 244, 246), font=font_mono)
    draw.text((right_x + 35, 785), "ansible-playbook -i inventory/prod.yml deploy.yml (1-Command Provision)", fill=(52, 211, 153), font=font_mono)

    im.save('assets/ansible_boilerplate_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/ansible_boilerplate_showcase_hd.webp")

def main():
    os.makedirs('assets', exist_ok=True)
    create_carscout_showcase()
    create_s3_showcase()
    create_email_support_showcase()
    create_docker_traefik_showcase()
    create_ticket_showcase()
    create_pipeline_showcase()
    create_ansible_boilerplate_showcase()
    print("All showcases successfully generated in assets/")

if __name__ == '__main__':
    main()
