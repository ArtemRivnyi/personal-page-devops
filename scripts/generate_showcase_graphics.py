"""
Showcase Graphics Generator for Artem Rivnyi's DevOps & Cloud Portfolio
Generates ultra-high-resolution, corporate-grade, dark-mode 2K Retina WebP assets (1600x900).
Optimized specifically for high-impact card thumbnails on 2K / 4K / Mobile screens:
- Massive, bold typography (30px to 68px) so key numbers and architecture nodes are effortlessly legible
- Zero microscopic 12px log dumps that blur into unreadable gray noise
- Clean Bento-box layouts matching top GitHub Trending and modern cloud software (Linear, Stripe, Datadog)
- Zero emojis, strict technical typography (Segoe UI / Consolas)
"""

import os
from PIL import Image, ImageDraw, ImageFont

def get_font(name_or_style, size):
    font_paths = {
        'bold': 'C:/Windows/Fonts/segoeuib.ttf',
        'regular': 'C:/Windows/Fonts/segoeui.ttf',
        'semibold': 'C:/Windows/Fonts/seguisb.ttf',
        'mono': 'C:/Windows/Fonts/consolab.ttf',
        'mono_reg': 'C:/Windows/Fonts/consola.ttf',
        'arial_bold': 'C:/Windows/Fonts/arialbd.ttf'
    }
    path = font_paths.get(name_or_style, font_paths['bold'])
    if os.path.exists(path):
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            pass
    return ImageFont.load_default()

def draw_window_header(draw, width, title, status_text="LIVE", dot_color=(52, 211, 153)):
    # macOS window header (Height 56px for clean 2K Retina scale)
    draw.rectangle([(0, 0), (width, 56)], fill=(15, 23, 42))
    draw.line([(0, 56), (width, 56)], fill=(30, 41, 59), width=2)
    
    # Traffic dots
    draw.ellipse([(20, 20), (36, 36)], fill=(255, 95, 86))
    draw.ellipse([(46, 20), (62, 36)], fill=(255, 189, 46))
    draw.ellipse([(72, 20), (88, 36)], fill=(39, 201, 63))
    
    # Center title pill
    pill_w = 760
    pill_x = (width - pill_w) // 2
    draw.rounded_rectangle([(pill_x, 10), (pill_x + pill_w, 46)], radius=18, fill=(30, 41, 59), outline=(51, 65, 85), width=1)
    
    font_mono = get_font('mono', 17)
    font_badge = get_font('bold', 15)
    
    draw.text((pill_x + 28, 17), title, fill=(203, 213, 225), font=font_mono)
    
    # Status indicator dynamically positioned on right of pill
    badge_len = len(status_text) * 9 + 36
    status_x = pill_x + pill_w - badge_len
    draw.ellipse([(status_x, 22), (status_x + 12, 34)], fill=dot_color)
    draw.text((status_x + 18, 17), status_text, fill=(241, 245, 249), font=font_badge)

def draw_grid_background(draw, W, H, fill_col=(10, 15, 29), line_col=(18, 27, 46)):
    for x in range(0, W, 50):
        draw.line([(x, 56), (x, H)], fill=line_col, width=1)
    for y in range(56, H, 50):
        draw.line([(0, y), (W, y)], fill=line_col, width=1)

# 1. DealShop Marketplace Showcase
def create_dealshop_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (8, 14, 26))
    draw = ImageDraw.Draw(im)
    draw_grid_background(draw, W, H, (8, 14, 26), (16, 26, 44))
    draw_window_header(draw, W, "dealshop.ie // IRISH BILINGUAL MARKETPLACE", "FLAGSHIP LIVE", (52, 211, 153))

    # Left Column: Stylized Mobile Device Showcase
    left_w = 540
    draw.rounded_rectangle([(40, 85), (40 + left_w, 855)], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
    
    # Phone Frame inside Left Column
    phone_w, phone_h = 360, 710
    px = 40 + (left_w - phone_w) // 2
    py = 115
    draw.rounded_rectangle([(px, py), (px + phone_w, py + phone_h)], radius=36, fill=(3, 7, 18), outline=(52, 211, 153), width=3)
    
    # Dynamic Island
    draw.rounded_rectangle([(px + 120, py + 12), (px + 240, py + 32)], radius=10, fill=(0, 0, 0), outline=(51, 65, 85), width=1)
    
    # Mobile App Header inside phone
    draw.text((px + 30, py + 55), "DealShop.ie", fill=(52, 211, 153), font=get_font('bold', 28))
    draw.rounded_rectangle([(px + 225, py + 52), (px + 330, py + 86)], radius=8, fill=(16, 185, 129), outline=(52, 211, 153), width=1)
    draw.text((px + 238, py + 58), "EN / GA", fill=(0, 0, 0), font=get_font('bold', 16))
    
    # Search Box Mock
    draw.rounded_rectangle([(px + 25, py + 105), (px + 335, py + 155)], radius=12, fill=(17, 24, 39), outline=(55, 65, 81), width=1)
    draw.text((px + 45, py + 120), "Search Dublin & Cork...", fill=(156, 163, 175), font=get_font('regular', 18))
    
    # PostGIS Location Badge
    draw.rounded_rectangle([(px + 25, py + 175), (px + 335, py + 225)], radius=10, fill=(6, 78, 59), outline=(16, 185, 129), width=1)
    draw.text((px + 40, py + 190), "Radius: 50km Proximity (PostGIS)", fill=(167, 243, 208), font=get_font('bold', 16))
    
    # Sample Listing Card
    draw.rounded_rectangle([(px + 25, py + 245), (px + 335, py + 540)], radius=14, fill=(17, 24, 39), outline=(31, 41, 55), width=2)
    draw.rectangle([(px + 25, py + 245), (px + 335, py + 410)], fill=(30, 41, 59))
    draw.text((px + 80, py + 315), "COMMERCE LISTING", fill=(100, 116, 139), font=get_font('bold', 20))
    draw.text((px + 40, py + 425), "MacBook Pro M3 Max", fill=(243, 244, 246), font=get_font('bold', 20))
    draw.text((px + 40, py + 458), "EUR 2,450", fill=(52, 211, 153), font=get_font('bold', 26))
    draw.text((px + 40, py + 498), "Dublin 4 • Stripe Escrow Protected", fill=(148, 163, 184), font=get_font('regular', 15))
    
    # Escrow Status pill
    draw.rounded_rectangle([(px + 25, py + 565), (px + 335, py + 625)], radius=12, fill=(30, 27, 75), outline=(129, 140, 248), width=1)
    draw.text((px + 40, py + 582), "10-STATE ESCROW STATE MACHINE", fill=(199, 210, 254), font=get_font('bold', 15))

    # Right Column: Big Architecture Bento Cards
    right_x = 610
    right_w = W - right_x - 40
    
    # Bento 1: PostGIS & Geospatial
    draw.rounded_rectangle([(right_x, 85), (right_x + right_w, 315)], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
    draw.text((right_x + 35, 112), "POSTGIS GEOSPATIAL SEARCH ENGINE", fill=(52, 211, 153), font=get_font('bold', 28))
    draw.text((right_x + 35, 155), "50 KM RADIUS PROXIMITY DISCOVERY", fill=(241, 245, 249), font=get_font('bold', 42))
    draw.text((right_x + 35, 222), "Spatial indexing with ST_DWithin & geography points:", fill=(148, 163, 184), font=get_font('regular', 20))
    draw.text((right_x + 35, 252), "< 2ms query latency across all 32 Irish counties.", fill=(203, 213, 225), font=get_font('bold', 20))
    draw.rounded_rectangle([(right_x + right_w - 200, 105), (right_x + right_w - 30, 150)], radius=8, fill=(6, 78, 59), outline=(16, 185, 129), width=1)
    draw.text((right_x + right_w - 182, 117), "< 2ms LATENCY", fill=(110, 231, 183), font=get_font('mono', 17))

    # Bento 2: Stripe Escrow State Machine
    draw.rounded_rectangle([(right_x, 340), (right_x + right_w, 570)], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
    draw.text((right_x + 35, 368), "STRIPE ESCROW STATE MACHINE", fill=(129, 140, 248), font=get_font('bold', 28))
    draw.text((right_x + 35, 410), "10-STATE SECURE PAYMENT ESCROW", fill=(241, 245, 249), font=get_font('bold', 42))
    draw.text((right_x + 35, 478), "Funds Hold -> Courier Dispatch -> Delivery Verified -> Automatic Payout", fill=(148, 163, 184), font=get_font('regular', 20))
    draw.text((right_x + 35, 510), "Built with Node.js & Stripe Connect (Zero Chargeback Risk).", fill=(203, 213, 225), font=get_font('bold', 20))
    draw.rounded_rectangle([(right_x + right_w - 240, 360), (right_x + right_w - 30, 405)], radius=8, fill=(49, 46, 129), outline=(99, 102, 241), width=1)
    draw.text((right_x + right_w - 222, 372), "ZERO CHARGEBACK", fill=(224, 231, 255), font=get_font('mono', 17))

    # Bento 3: Dual Stats (Tests & Bilingual Keys)
    half_w = (right_w - 25) // 2
    # Stat 1
    draw.rounded_rectangle([(right_x, 595), (right_x + half_w, 855)], radius=16, fill=(15, 23, 42), outline=(16, 185, 129), width=2)
    draw.text((right_x + 35, 625), "VERIFIED AUTOMATED SUITE", fill=(110, 231, 183), font=get_font('bold', 22))
    draw.text((right_x + 35, 665), "1,043 TESTS", fill=(52, 211, 153), font=get_font('bold', 56))
    draw.text((right_x + 35, 755), "100% Pass in Web Unit, API Integration", fill=(203, 213, 225), font=get_font('regular', 19))
    draw.text((right_x + 35, 785), "& Playwright E2E suites.", fill=(203, 213, 225), font=get_font('regular', 19))

    # Stat 2
    bx2 = right_x + half_w + 25
    draw.rounded_rectangle([(bx2, 595), (bx2 + half_w, 855)], radius=16, fill=(15, 23, 42), outline=(56, 189, 248), width=2)
    draw.text((bx2 + 35, 625), "GAELIC & ENGLISH PARITY", fill=(125, 211, 252), font=get_font('bold', 22))
    draw.text((bx2 + 35, 665), "3,207 KEYS", fill=(56, 189, 248), font=get_font('bold', 56))
    draw.text((bx2 + 35, 755), "100% bilingual translation parity", fill=(203, 213, 225), font=get_font('regular', 19))
    draw.text((bx2 + 35, 785), "with Next.js internationalization.", fill=(203, 213, 225), font=get_font('regular', 19))

    im.save('assets/dealshop_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/dealshop_showcase_hd.webp")

# 2. CarScout Showcase
def create_carscout_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (10, 15, 29))
    draw = ImageDraw.Draw(im)
    draw_grid_background(draw, W, H, (10, 15, 29), (18, 27, 46))
    draw_window_header(draw, W, "carscout.internal // VRT & ARBITRAGE ENGINE", "LIVE SAAS", (56, 189, 248))

    # Top Target Asset Banner
    draw.rounded_rectangle([(40, 85), (W - 40, 180)], radius=16, fill=(17, 24, 39), outline=(31, 41, 55), width=2)
    draw.text((65, 105), "TARGET ASSET: 2020 BMW 520d xDrive M-Sport (G30)", fill=(56, 189, 248), font=get_font('bold', 34))
    draw.text((65, 142), "72,000 km Verified • 8-Speed Steptronic • Dual-Market Automated Scraping Engine", fill=(156, 163, 175), font=get_font('regular', 22))
    draw.rounded_rectangle([(W - 350, 105), (W - 65, 160)], radius=8, fill=(6, 78, 59), outline=(16, 185, 129), width=1)
    draw.text((W - 330, 120), "7 SCRAPERS ONLINE", fill=(52, 211, 153), font=get_font('bold', 20))

    # Two Main Comparison Cards
    card_w = (W - 110) // 2
    # Ukraine Card
    draw.rounded_rectangle([(40, 205), (40 + card_w, 570)], radius=16, fill=(17, 24, 39), outline=(31, 41, 55), width=2)
    draw.rectangle([(40, 205), (40 + card_w, 275)], fill=(31, 41, 55))
    draw.text((65, 225), "UKRAINE MARKETPLACE (AUTO.RIA / RST)", fill=(243, 244, 246), font=get_font('bold', 26))
    draw.text((65, 305), "LISTING PRICE", fill=(156, 163, 175), font=get_font('bold', 20))
    draw.text((65, 335), "EUR 18,500", fill=(255, 255, 255), font=get_font('bold', 68))
    draw.text((65, 435), "• CarVertical Clean Records", fill=(203, 213, 225), font=get_font('regular', 24))
    draw.text((65, 480), "• Official BMW Dealer Service History", fill=(203, 213, 225), font=get_font('regular', 24))
    draw.text((65, 525), "• Purchase Price + EU Logistics: EUR 19,450", fill=(147, 197, 253), font=get_font('mono', 20))

    # Ireland Card
    cx2 = 40 + card_w + 30
    draw.rounded_rectangle([(cx2, 205), (cx2 + card_w, 570)], radius=16, fill=(17, 24, 39), outline=(56, 189, 248), width=2)
    draw.rectangle([(cx2, 205), (cx2 + card_w, 275)], fill=(12, 74, 110))
    draw.text((cx2 + 25, 225), "IRISH MARKETPLACE (DONEDEAL / CARZONE)", fill=(240, 249, 255), font=get_font('bold', 26))
    draw.text((cx2 + 25, 305), "IRISH VALUATION MEDIAN", fill=(156, 163, 175), font=get_font('bold', 20))
    draw.text((cx2 + 25, 335), "EUR 28,900", fill=(56, 189, 248), font=get_font('bold', 68))
    draw.text((cx2 + 25, 435), "• DoneDeal 2020 M-Sport Average Asking", fill=(203, 213, 225), font=get_font('regular', 24))
    draw.text((cx2 + 25, 480), "• High Liquidity Segment: 18 Days to Sale", fill=(203, 213, 225), font=get_font('regular', 24))
    draw.text((cx2 + 25, 525), "• All Irish VRT & Statutory Taxes Cleared", fill=(52, 211, 153), font=get_font('mono', 20))

    # Bottom Full-Width Arbitrage & VRT Calculation Hero Banner
    bottom_y = 595
    draw.rounded_rectangle([(40, bottom_y), (W - 40, 860)], radius=16, fill=(6, 78, 59), outline=(16, 185, 129), width=3)
    
    # 3 Big Columns inside Profit Banner
    bcol_w = (W - 140) // 3
    # Box 1
    draw.text((65, bottom_y + 35), "OFFICIAL IRISH VRT DUTY", fill=(167, 243, 208), font=get_font('bold', 24))
    draw.text((65, bottom_y + 80), "EUR 4,200", fill=(255, 255, 255), font=get_font('bold', 52))
    draw.text((65, bottom_y + 160), "Revenue Category A (CO2: 124g/km)", fill=(209, 250, 229), font=get_font('regular', 20))

    # Box 2
    bx2 = 65 + bcol_w + 10
    draw.text((bx2, bottom_y + 35), "TOTAL LANDED COST", fill=(167, 243, 208), font=get_font('bold', 24))
    draw.text((bx2, bottom_y + 80), "EUR 27,305", fill=(255, 255, 255), font=get_font('bold', 52))
    draw.text((bx2, bottom_y + 160), "All Taxes, Duty, NOx & Transit Paid", fill=(209, 250, 229), font=get_font('regular', 20))

    # Box 3 - The Profit
    bx3 = bx2 + bcol_w + 10
    draw.rounded_rectangle([(bx3 - 20, bottom_y + 20), (W - 60, bottom_y + 240)], radius=12, fill=(4, 120, 87), outline=(52, 211, 153), width=2)
    draw.text((bx3, bottom_y + 35), "NET ARBITRAGE MARGIN", fill=(209, 250, 229), font=get_font('bold', 24))
    draw.text((bx3, bottom_y + 80), "+EUR 1,595", fill=(255, 255, 255), font=get_font('bold', 56))
    draw.text((bx3, bottom_y + 160), "5.84% NET PROFIT VERIFIED", fill=(254, 240, 138), font=get_font('bold', 22))

    im.save('assets/carscout_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/carscout_showcase_hd.webp")

# 3. AI Ticket Classifier
def create_ticket_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (11, 15, 25))
    draw = ImageDraw.Draw(im)
    draw_grid_background(draw, W, H, (11, 15, 25), (17, 24, 39))
    draw_window_header(draw, W, "ticket-classifier.internal // TRIAGE ENGINE", "PRODUCTION", (52, 211, 153))

    card_w = (W - 110) // 2

    # Left Panel: Autonomous Triage Workbench
    draw.rounded_rectangle([(40, 85), (40 + card_w, 855)], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
    draw.rectangle([(40, 85), (40 + card_w, 155)], fill=(30, 41, 59))
    draw.text((65, 105), "AUTONOMOUS INCIDENT TRIAGE", fill=(241, 245, 249), font=get_font('bold', 28))
    
    # Incident Card
    draw.rounded_rectangle([(65, 185), (40 + card_w - 25, 415)], radius=14, fill=(17, 24, 39), outline=(51, 65, 85), width=2)
    draw.text((85, 210), "INCOMING HIGH-SEVERITY PAYLOAD", fill=(148, 163, 184), font=get_font('bold', 20))
    draw.text((85, 250), "\"ONT Flashing Red. 3 Enterprise Fiber", fill=(255, 255, 255), font=get_font('bold', 30))
    draw.text((85, 290), "Drops Offline in Datacenter Rack 4B.\"", fill=(255, 255, 255), font=get_font('bold', 30))
    draw.text((85, 350), "Sender: NOC Core Infrastructure // P1 Trigger", fill=(147, 197, 253), font=get_font('mono', 20))

    # Triage Decision Box
    draw.rounded_rectangle([(65, 445), (40 + card_w - 25, 825)], radius=14, fill=(17, 24, 39), outline=(139, 92, 246), width=2)
    draw.text((85, 470), "AUTOMATED DISPATCH VERDICT", fill=(196, 181, 253), font=get_font('bold', 24))
    
    # Priority Pill
    draw.rounded_rectangle([(85, 520), (40 + card_w - 45, 600)], radius=12, fill=(127, 29, 29), outline=(239, 68, 68), width=2)
    draw.text((105, 542), "PRIORITY: P1 CRITICAL (15-MIN SLA)", fill=(254, 202, 202), font=get_font('bold', 26))

    # Department Route Pill
    draw.rounded_rectangle([(85, 620), (40 + card_w - 45, 700)], radius=12, fill=(12, 74, 110), outline=(56, 189, 248), width=2)
    draw.text((105, 642), "ROUTE: L2 Network Operations (NOC)", fill=(186, 230, 253), font=get_font('bold', 26))

    # Confidence Score Pill
    draw.rounded_rectangle([(85, 720), (40 + card_w - 45, 800)], radius=12, fill=(6, 78, 59), outline=(16, 185, 129), width=2)
    draw.text((105, 742), "CONFIDENCE: 98.4% (Deterministic Rule)", fill=(167, 243, 208), font=get_font('bold', 26))

    # Right Panel: Dual-LLM Circuit Breaker Telemetry
    rx = 40 + card_w + 30
    draw.rounded_rectangle([(rx, 85), (rx + card_w, 855)], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
    draw.rectangle([(rx, 85), (rx + card_w, 155)], fill=(30, 41, 59))
    draw.text((rx + 25, 105), "DUAL-LLM RESILIENCE & FAILOVER", fill=(241, 245, 249), font=get_font('bold', 28))

    # Node 1: Gemini
    draw.rounded_rectangle([(rx + 25, 185), (rx + card_w - 25, 335)], radius=14, fill=(17, 24, 39), outline=(16, 185, 129), width=2)
    draw.text((rx + 45, 210), "PRIMARY ENGINE", fill=(110, 231, 183), font=get_font('bold', 20))
    draw.text((rx + 45, 245), "Google Gemini 2.5 Flash", fill=(255, 255, 255), font=get_font('bold', 34))
    draw.text((rx + 45, 290), "Status: ACTIVE HEALTHY [p95: 142ms]", fill=(52, 211, 153), font=get_font('mono', 22))

    # Node 2: OpenAI Fallback
    draw.rounded_rectangle([(rx + 25, 360), (rx + card_w - 25, 510)], radius=14, fill=(17, 24, 39), outline=(56, 189, 248), width=2)
    draw.text((rx + 45, 385), "STANDBY HOT-FALLBACK", fill=(125, 211, 252), font=get_font('bold', 20))
    draw.text((rx + 45, 420), "OpenAI GPT-4o-mini", fill=(255, 255, 255), font=get_font('bold', 34))
    draw.text((rx + 45, 465), "Circuit Breaker: HOT-STANDBY READY (0 Cost)", fill=(56, 189, 248), font=get_font('mono', 22))

    # Node 3: Rule Engine
    draw.rounded_rectangle([(rx + 25, 535), (rx + card_w - 25, 685)], radius=14, fill=(17, 24, 39), outline=(245, 158, 11), width=2)
    draw.text((rx + 45, 560), "SHORT-CIRCUIT ENGINE", fill=(253, 224, 71), font=get_font('bold', 20))
    draw.text((rx + 45, 595), "< 5ms Deterministic Rule Engine", fill=(255, 255, 255), font=get_font('bold', 34))
    draw.text((rx + 45, 640), "Matches high-velocity keywords without LLM tokens", fill=(253, 186, 116), font=get_font('mono', 20))

    # Bottom Stat: 182 / 182 Pytest
    draw.rounded_rectangle([(rx + 25, 715), (rx + card_w - 25, 825)], radius=14, fill=(6, 78, 59), outline=(16, 185, 129), width=2)
    draw.text((rx + 45, 735), "AUTOMATED PYTEST SUITE", fill=(167, 243, 208), font=get_font('bold', 20))
    draw.text((rx + 45, 765), "182 / 182 TESTS PASSED (100%)", fill=(255, 255, 255), font=get_font('bold', 36))

    im.save('assets/ticket_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/ticket_showcase_hd.webp")

# 4. AWS S3 Simulator
def create_s3_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (11, 15, 25))
    draw = ImageDraw.Draw(im)
    draw_grid_background(draw, W, H, (11, 15, 25), (17, 24, 39))
    draw_window_header(draw, W, "s3-simulator.internal:9001 // TELEMETRY", "OBSERVABILITY", (245, 158, 11))

    # 3 Big Stat KPI Cards (Top)
    col_w = (W - 140) // 3
    stats = [
        ("TOTAL CAPACITY COMMITTED", "1.71 TB", "184,920 Active MinIO Objects", (255, 255, 255), (15, 23, 42), (51, 65, 85)),
        ("PEAK INGESTION RATE", "482 REQ / S", "Healthy Throughput (k6 Verified)", (245, 158, 11), (15, 23, 42), (245, 158, 11)),
        ("P95 ACCESS LATENCY", "8.4 ms", "Sub-10ms Cloud Native SLO", (52, 211, 153), (6, 78, 59), (16, 185, 129))
    ]

    for i, (label, val, sub, val_col, bg, border) in enumerate(stats):
        bx = 40 + i * (col_w + 30)
        draw.rounded_rectangle([(bx, 85), (bx + col_w, 315)], radius=16, fill=bg, outline=border, width=2)
        draw.text((bx + 35, 115), label, fill=(156, 163, 175), font=get_font('bold', 20))
        draw.text((bx + 35, 155), val, fill=val_col, font=get_font('bold', 72))
        draw.text((bx + 35, 255), sub, fill=(203, 213, 225), font=get_font('regular', 22))

    # Bottom Big Bento: S3 Benchmark & Multi-Part Engine
    draw.rounded_rectangle([(40, 345), (W - 40, 855)], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
    draw.rectangle([(40, 345), (W - 40, 420)], fill=(30, 41, 59))
    draw.text((65, 370), "MINIO CLOUD-NATIVE S3 EMULATION & BENCHMARK SUITE", fill=(245, 158, 11), font=get_font('bold', 28))

    # 4 Big Feature Cards Inside
    card_w2 = (W - 140) // 2
    # Card 1
    draw.rounded_rectangle([(65, 450), (65 + card_w2, 630)], radius=14, fill=(17, 24, 39), outline=(51, 65, 85), width=2)
    draw.text((90, 475), "THROUGHPUT PERFORMANCE", fill=(156, 163, 175), font=get_font('bold', 20))
    draw.text((90, 515), "128.4 MB / SEC", fill=(255, 255, 255), font=get_font('bold', 48))
    draw.text((90, 580), "Direct NVMe-backed IO with parallel chunks", fill=(148, 163, 184), font=get_font('regular', 20))

    # Card 2
    cx2 = 65 + card_w2 + 10
    draw.rounded_rectangle([(cx2, 450), (cx2 + card_w2, 630)], radius=14, fill=(17, 24, 39), outline=(51, 65, 85), width=2)
    draw.text((cx2 + 25, 475), "STRESS VERIFICATION", fill=(156, 163, 175), font=get_font('bold', 20))
    draw.text((cx2 + 25, 515), "50 CONCURRENT VUs", fill=(52, 211, 153), font=get_font('bold', 48))
    draw.text((cx2 + 25, 580), "k6 Stress test: 100% S3 API Compliance", fill=(148, 163, 184), font=get_font('regular', 20))

    # Card 3 (Zero Egress Cost)
    draw.rounded_rectangle([(65, 655), (65 + card_w2, 830)], radius=14, fill=(6, 78, 59), outline=(16, 185, 129), width=2)
    draw.text((90, 680), "CLOUD EGRESS COST", fill=(167, 243, 208), font=get_font('bold', 20))
    draw.text((90, 715), "USD 0.00 / MONTH", fill=(255, 255, 255), font=get_font('bold', 48))
    draw.text((90, 780), "Eliminates AWS data transfer bills in integration testing", fill=(209, 250, 229), font=get_font('regular', 20))

    # Card 4 (Pytest Suite)
    draw.rounded_rectangle([(cx2, 655), (cx2 + card_w2, 830)], radius=14, fill=(17, 24, 39), outline=(56, 189, 248), width=2)
    draw.text((cx2 + 25, 680), "TEST AUTOMATION", fill=(125, 211, 252), font=get_font('bold', 20))
    draw.text((cx2 + 25, 715), "42 PYTESTS PASS", fill=(56, 189, 248), font=get_font('bold', 48))
    draw.text((cx2 + 25, 780), "ETag MD5, Bucket Versioning & Multi-part verified", fill=(148, 163, 184), font=get_font('regular', 20))

    im.save('assets/s3_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/s3_showcase_hd.webp")

# 5. AI Email Support System
def create_email_support_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (10, 14, 26))
    draw = ImageDraw.Draw(im)
    draw_grid_background(draw, W, H, (10, 14, 26), (15, 23, 42))
    draw_window_header(draw, W, "email-support.internal // RAG PIPELINE", "ENTERPRISE", (139, 92, 246))

    card_w = (W - 110) // 2

    # Left Column: FAISS Vector Retrieval
    draw.rounded_rectangle([(40, 85), (40 + card_w, 855)], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
    draw.rectangle([(40, 85), (40 + card_w, 155)], fill=(30, 41, 59))
    draw.text((65, 105), "FAISS DENSE VECTOR RETRIEVAL", fill=(167, 139, 250), font=get_font('bold', 28))

    # Big Similarity Metric
    draw.rounded_rectangle([(65, 185), (40 + card_w - 25, 415)], radius=14, fill=(17, 24, 39), outline=(139, 92, 246), width=2)
    draw.text((85, 210), "COSINE SIMILARITY SCORE", fill=(196, 181, 253), font=get_font('bold', 20))
    draw.text((85, 250), "0.942 MATCH", fill=(255, 255, 255), font=get_font('bold', 68))
    draw.text((85, 350), "Retrieved: Warranty Policy Sec 4.2 (Immediate Swap)", fill=(148, 163, 184), font=get_font('regular', 22))

    # Privacy Guarantee Card
    draw.rounded_rectangle([(65, 445), (40 + card_w - 25, 825)], radius=14, fill=(46, 16, 101), outline=(139, 92, 246), width=2)
    draw.text((85, 475), "ZERO DATA EGRESS GUARANTEE", fill=(233, 213, 255), font=get_font('bold', 24))
    draw.text((85, 525), "100% ON-PREMISE AI", fill=(255, 255, 255), font=get_font('bold', 48))
    draw.text((85, 605), "• Local Ollama Gemma 7B Model Weights", fill=(233, 213, 255), font=get_font('regular', 24))
    draw.text((85, 655), "• Redis Queue (RQ) Async Worker: 412ms", fill=(233, 213, 255), font=get_font('regular', 24))
    draw.text((85, 705), "• Strict Enterprise GDPR Data Governance", fill=(233, 213, 255), font=get_font('regular', 24))
    draw.text((85, 755), "• Zero Third-Party Cloud API Dependencies", fill=(233, 213, 255), font=get_font('regular', 24))

    # Right Column: Guardrails & Action
    rx = 40 + card_w + 30
    draw.rounded_rectangle([(rx, 85), (rx + card_w, 855)], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
    draw.rectangle([(rx, 85), (rx + card_w, 155)], fill=(30, 41, 59))
    draw.text((rx + 25, 105), "SAFETY GUARDRAIL & DISPATCH", fill=(52, 211, 153), font=get_font('bold', 28))

    # Hallucination Guard
    draw.rounded_rectangle([(rx + 25, 185), (rx + card_w - 25, 415)], radius=14, fill=(6, 78, 59), outline=(16, 185, 129), width=2)
    draw.text((rx + 45, 210), "HALLUCINATION GUARD SCORE", fill=(167, 243, 208), font=get_font('bold', 20))
    draw.text((rx + 45, 250), "0.98 PASSED", fill=(255, 255, 255), font=get_font('bold', 68))
    draw.text((rx + 45, 350), "All statements strictly grounded in verified policy docs", fill=(209, 250, 229), font=get_font('regular', 22))

    # Draft & Human Review Box
    draw.rounded_rectangle([(rx + 25, 445), (rx + card_w - 25, 825)], radius=14, fill=(17, 24, 39), outline=(51, 65, 85), width=2)
    draw.text((rx + 45, 475), "HUMAN-IN-THE-LOOP CONTROL", fill=(148, 163, 184), font=get_font('bold', 24))
    draw.text((rx + 45, 520), "Auto-Draft Generated", fill=(241, 245, 249), font=get_font('bold', 36))
    draw.text((rx + 45, 575), "Gold SLA replacement units approved for", fill=(203, 213, 225), font=get_font('regular', 22))
    draw.text((rx + 45, 608), "immediate courier dispatch under Order #IE-90412.", fill=(203, 213, 225), font=get_font('regular', 22))

    # 1-Click Approve Button
    draw.rounded_rectangle([(rx + 45, 695), (rx + card_w - 45, 785)], radius=14, fill=(5, 150, 105), outline=(52, 211, 153), width=2)
    draw.text((rx + 75, 725), "1-CLICK HUMAN APPROVAL & DISPATCH", fill=(255, 255, 255), font=get_font('bold', 24))

    im.save('assets/email_support_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/email_support_showcase_hd.webp")

# 6. Docker & Traefik Load Balancing
def create_docker_traefik_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (10, 15, 29))
    draw = ImageDraw.Draw(im)
    draw_grid_background(draw, W, H, (10, 15, 29), (18, 27, 46))
    draw_window_header(draw, W, "traefik.internal // INGRESS BALANCER", "HEALTHY", (245, 158, 11))

    # 3 Big Stat Cards
    col_w = (W - 140) // 3
    stats = [
        ("INGRESS THROUGHPUT", "1,250 REQ / S", "k6 Stress Benchmark Sustained", (255, 255, 255), (15, 23, 42), (51, 65, 85)),
        ("RESPONSE LATENCY", "p95 < 145 ms", "Reverse Proxy Round-Robin", (56, 189, 248), (15, 23, 42), (56, 189, 248)),
        ("CONTAINER REPLICAS", "3 ACTIVE", "Self-Healing Docker Fleet", (52, 211, 153), (6, 78, 59), (16, 185, 129))
    ]

    for i, (label, val, sub, val_col, bg, border) in enumerate(stats):
        bx = 40 + i * (col_w + 30)
        draw.rounded_rectangle([(bx, 85), (bx + col_w, 315)], radius=16, fill=bg, outline=border, width=2)
        draw.text((bx + 35, 115), label, fill=(156, 163, 175), font=get_font('bold', 20))
        draw.text((bx + 35, 155), val, fill=val_col, font=get_font('bold', 68))
        draw.text((bx + 35, 255), sub, fill=(203, 213, 225), font=get_font('regular', 22))

    # Bottom Big Architecture Visual
    draw.rounded_rectangle([(40, 345), (W - 40, 855)], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
    draw.rectangle([(40, 345), (W - 40, 420)], fill=(30, 41, 59))
    draw.text((65, 370), "TRAEFIK REVERSE PROXY ROUTING TOPOLOGY & PERSISTENCE", fill=(245, 158, 11), font=get_font('bold', 28))

    # Route Nodes
    draw.rounded_rectangle([(65, 455), (W - 65, 590)], radius=14, fill=(17, 24, 39), outline=(56, 189, 248), width=2)
    draw.text((95, 480), "ROUTING PIPELINE", fill=(125, 211, 252), font=get_font('bold', 20))
    draw.text((95, 520), "[ Traefik Ingress:443 ]  --->  [ Round-Robin Balance ]  --->  [ Node.js Replicas 1, 2, 3 ]", fill=(255, 255, 255), font=get_font('bold', 32))

    # Persistence & Health
    half_w = (W - 150) // 2
    # Left Persistence
    draw.rounded_rectangle([(65, 620), (65 + half_w, 825)], radius=14, fill=(17, 24, 39), outline=(139, 92, 246), width=2)
    draw.text((90, 650), "STATE PERSISTENCE", fill=(196, 181, 253), font=get_font('bold', 22))
    draw.text((90, 690), "Redis 7 AOF Engine", fill=(255, 255, 255), font=get_font('bold', 42))
    draw.text((90, 760), "Zero data loss during container recycling", fill=(148, 163, 184), font=get_font('regular', 20))

    # Right Health Check
    rx2 = 65 + half_w + 20
    draw.rounded_rectangle([(rx2, 620), (rx2 + half_w, 825)], radius=14, fill=(6, 78, 59), outline=(16, 185, 129), width=2)
    draw.text((rx2 + 25, 650), "AUTO SELF-HEALING", fill=(167, 243, 208), font=get_font('bold', 22))
    draw.text((rx2 + 25, 690), "Docker Healthcheck", fill=(255, 255, 255), font=get_font('bold', 42))
    draw.text((rx2 + 25, 760), "Automatic eviction & restart of degraded containers", fill=(209, 250, 229), font=get_font('regular', 20))

    im.save('assets/docker_traefik_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/docker_traefik_showcase_hd.webp")

# 7. DevOps Automated Pipeline
def create_pipeline_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (10, 15, 29))
    draw = ImageDraw.Draw(im)
    draw_grid_background(draw, W, H, (10, 15, 29), (18, 27, 46))
    draw_window_header(draw, W, "github-actions // CI/CD PIPELINE", "ALL GATES PASS", (52, 211, 153))

    # 3 Big Stat KPI Cards (Top)
    col_w = (W - 140) // 3
    stats = [
        ("CI/CD WORKFLOW GATES", "11 / 11 PASS", "GitHub Actions Matrix Strict Quality", (52, 211, 153), (6, 78, 59), (16, 185, 129)),
        ("AUTOMATED TEST COVERAGE", "94.8% CODE", "Jest Unit & Integration Audited", (255, 255, 255), (15, 23, 42), (51, 65, 85)),
        ("SECURITY AUDIT STATUS", "0 CVEs", "Zero Vulnerabilities Detected", (56, 189, 248), (15, 23, 42), (56, 189, 248))
    ]

    for i, (label, val, sub, val_col, bg, border) in enumerate(stats):
        bx = 40 + i * (col_w + 30)
        draw.rounded_rectangle([(bx, 85), (bx + col_w, 315)], radius=16, fill=bg, outline=border, width=2)
        draw.text((bx + 35, 115), label, fill=(156, 163, 175), font=get_font('bold', 20))
        draw.text((bx + 35, 155), val, fill=val_col, font=get_font('bold', 68))
        draw.text((bx + 35, 255), sub, fill=(203, 213, 225), font=get_font('regular', 22))

    # Bottom Big Bento: 4 Stage Cards
    draw.rounded_rectangle([(40, 345), (W - 40, 855)], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
    draw.rectangle([(40, 345), (W - 40, 420)], fill=(30, 41, 59))
    draw.text((65, 370), "11-STAGE AUTOMATED BUILD & VERIFICATION MATRIX", fill=(52, 211, 153), font=get_font('bold', 28))

    stages = [
        ("STAGE 1: STATIC ANALYSIS", "100% ESLint & Stylelint Clean", "Zero syntax or rule deviations", (56, 189, 248)),
        ("STAGE 2: UNIT & INTEGRATION", "78 / 78 Tests Passed", "Full DOM, Event & Async assertions", (52, 211, 153)),
        ("STAGE 3: CONTAINERIZATION", "Docker Multi-Stage Build", "Hardened 42MB Alpine container artifact", (245, 158, 11)),
        ("STAGE 4: PRODUCTION DEPLOY", "Automated GitHub Pages CD", "Continuous zero-downtime deployment", (52, 211, 153))
    ]

    for i, (stitle, sval, ssub, scol) in enumerate(stages):
        sy = 450 + i * 95
        draw.rounded_rectangle([(65, sy), (W - 65, sy + 75)], radius=12, fill=(17, 24, 39), outline=(51, 65, 85), width=2)
        draw.text((95, sy + 22), stitle, fill=(156, 163, 175), font=get_font('bold', 20))
        draw.text((450, sy + 18), sval, fill=scol, font=get_font('bold', 28))
        draw.text((950, sy + 22), ssub, fill=(148, 163, 184), font=get_font('regular', 20))

    im.save('assets/pipeline_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/pipeline_showcase_hd.webp")

# 8. Node.js & Ansible Boilerplate
def create_ansible_boilerplate_showcase():
    W, H = 1600, 900
    im = Image.new('RGB', (W, H), (10, 15, 29))
    draw = ImageDraw.Draw(im)
    draw_grid_background(draw, W, H, (10, 15, 29), (18, 27, 46))
    draw_window_header(draw, W, "ansible-playbook // INFRASTRUCTURE CODE", "100% IDEMPOTENT", (245, 158, 11))

    # 3 Big Stat Cards
    col_w = (W - 140) // 3
    stats = [
        ("AUTOMATED TEST SUITE", "16 / 16 PASS", "Jest API & Route Integration", (52, 211, 153), (6, 78, 59), (16, 185, 129)),
        ("ALPINE CONTAINER", "42 MB SIZE", "Multi-stage hardened build", (255, 255, 255), (15, 23, 42), (51, 65, 85)),
        ("CODE COVERAGE AUDIT", "85.7% COVERED", "Strict branch & statement metrics", (56, 189, 248), (15, 23, 42), (56, 189, 248))
    ]

    for i, (label, val, sub, val_col, bg, border) in enumerate(stats):
        bx = 40 + i * (col_w + 30)
        draw.rounded_rectangle([(bx, 85), (bx + col_w, 315)], radius=16, fill=bg, outline=border, width=2)
        draw.text((bx + 35, 115), label, fill=(156, 163, 175), font=get_font('bold', 20))
        draw.text((bx + 35, 155), val, fill=val_col, font=get_font('bold', 58))
        draw.text((bx + 35, 255), sub, fill=(203, 213, 225), font=get_font('regular', 22))

    # Bottom Big Bento: Ansible Idempotency & Hardening
    draw.rounded_rectangle([(40, 345), (W - 40, 855)], radius=16, fill=(15, 23, 42), outline=(30, 41, 59), width=2)
    draw.rectangle([(40, 345), (W - 40, 420)], fill=(30, 41, 59))
    draw.text((65, 370), "ANSIBLE PLAYBOOK EXECUTION & SECURITY HARDENING", fill=(245, 158, 11), font=get_font('bold', 28))

    # Big Playbook Summary Box
    draw.rounded_rectangle([(65, 455), (W - 65, 620)], radius=14, fill=(17, 24, 39), outline=(16, 185, 129), width=2)
    draw.text((95, 485), "PLAY RECAP: localhost", fill=(110, 231, 183), font=get_font('bold', 24))
    draw.text((95, 530), "ok=18    changed=0    unreachable=0    failed=0    skipped=0    rescued=0", fill=(52, 211, 153), font=get_font('mono', 28))

    # Security & Architecture Pills
    half_w = (W - 150) // 2
    # Left
    draw.rounded_rectangle([(65, 650), (65 + half_w, 825)], radius=14, fill=(17, 24, 39), outline=(56, 189, 248), width=2)
    draw.text((90, 680), "CONTAINER SECURITY", fill=(125, 211, 252), font=get_font('bold', 22))
    draw.text((90, 720), "Zero Root Execution", fill=(255, 255, 255), font=get_font('bold', 38))
    draw.text((90, 775), "Dedicated non-root node user with dropped Linux capabilities", fill=(148, 163, 184), font=get_font('regular', 20))

    # Right
    rx2 = 65 + half_w + 20
    draw.rounded_rectangle([(rx2, 650), (rx2 + half_w, 825)], radius=14, fill=(17, 24, 39), outline=(245, 158, 11), width=2)
    draw.text((rx2 + 25, 680), "PROVISIONING IDEMPOTENCY", fill=(253, 224, 71), font=get_font('bold', 22))
    draw.text((rx2 + 25, 720), "100% Deterministic", fill=(255, 255, 255), font=get_font('bold', 38))
    draw.text((rx2 + 25, 775), "Playbook re-runs execute with changed=0 and zero drift", fill=(148, 163, 184), font=get_font('regular', 20))

    im.save('assets/ansible_boilerplate_showcase_hd.webp', 'WEBP', quality=95)
    print("Created assets/ansible_boilerplate_showcase_hd.webp")

if __name__ == '__main__':
    print("Generating Polished High-Impact 2K Retina Showcases...")
    create_dealshop_showcase()
    create_carscout_showcase()
    create_ticket_showcase()
    create_s3_showcase()
    create_email_support_showcase()
    create_docker_traefik_showcase()
    create_pipeline_showcase()
    create_ansible_boilerplate_showcase()
    print("All 8 showcase graphics generated successfully!")
