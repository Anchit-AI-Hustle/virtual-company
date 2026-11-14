# Seatwise business case

Author: Meera, Head of Research. Date: 2026-11-14. FX used: USD 1 = INR 94.2754 (company/config.json, source xflowpay, 2026-11-14).

## Summary

- The job is real but happens once per wedding. The free version of it is a commodity: WeddingWire, The Knot and Zola give it away, and several no-signup web tools already exist [6][7][8][19][20][21].
- India is the wrong market for this product. A diaspora wedding retailer says assigned tables "isn't a thing at most weddings in India" [4]. Seating charts are a US, UK and diaspora habit.
- The planned Pro features (place cards, escort cards) are sold as Canva and Etsy templates, free or around USD 14 [11][12]. Paid seating tools charge USD 18 to 50 one-time [9][10][13][14]. INR 799 (USD 8.48) is cheap for a US buyer but has no proof behind it for an Indian one.
- Distribution without ads or outreach means organic search only. The head terms are crowded, and community posting needs owner approval. Likely 90 day revenue is about INR 4,000 (estimate), and it is 0 until three approvals and a payment rail are in place.
- Score 11 of 35. Recommendation: no-go as a revenue venture. At most, leave the already-built free tool live as a labelled demand test with a hard kill date, and stop all Pro work.

## 1. Market

**Who would pay.** People who plan a reception with assigned tables and who want something better than a free wedding-site tool or a spreadsheet. That is mostly couples in the US, UK, Canada and Australia, including South Asian diaspora couples, a few weeks before the wedding.

**How many such weddings a year (sourced):**

| Market | Weddings per year | Source |
|---|---|---|
| US | About 2 million couples married in 2025. Average 117 guests, average cost USD 34,000 | The Knot 2026 Real Weddings Study [1] |
| England and Wales | 231,949 marriages and civil partnerships in 2023, down 8.6% on 2022 | ONS [2] |
| India | 46 lakh (4.6 million) weddings in the 1 Nov to 14 Dec 2025 season alone. A full-year figure is unknown | CAIT [3] |

What is not known: the share of these weddings that use an assigned seating chart, and the share that would pay for a tool. I found no primary source for either, so both are unknown.

**Do Indian weddings use assigned seating charts?** Mostly no, as far as the evidence goes.
- Shaadi Shop, which sells to diaspora weddings, writes "Because assigned tables isn't a thing at most weddings in India," and calls assigned seating "a Western concept that's been adapted to Indian weddings in the USA, Canada, Australia the UK etc." [4]
- MySeatPlan, a seller of seating software, says "Most modern Indian receptions are seated dinners with assigned tables" [5]. It does not say whether it means India or the diaspora, and it has a commercial interest, so I give it less weight.
- Google autocomplete in India for "wedding seating" returns "wedding seating arrangement", "wedding seating chair", "wedding seating for bride and groom" and "wedding seating decoration" before any chart terms. For "seating chart" it returns "seating chart irctc", "seating chart train" and "seating chart vande bharat" [17]. Indian searchers mostly mean decor and train seats, not guest seating plans.

**Which market fits.** The US first, then the UK, Canada, Australia and the diaspora. This is a global-English product priced in USD or GBP. It is not an Indian consumer product. Pricing it in INR for Indian couples aims it at the segment least likely to need it.

**Rough addressable number (estimate, clearly labelled).** Unknown share × 2.0M US + 0.23M England and Wales. Even if only 10% of those couples went looking for a seating tool online (an assumption, not data), that is 223,000 searchers a year. The number of searchers is not the constraint. Free supply is.

## 2. Problem

- **Pain:** Moderate and short-lived. Forum posters complain about specific tool flaws, for example a WeddingWire update that stopped whole parties being dragged together and dropped room and table size inputs, after which the poster planned to use "a different seating chart generator" [18]. That thread is from 2018 (last activity 2022), so it is old evidence of a fix the market has had years to make. A 2022 WeddingWire thread shows couples using the free WeddingWire and Zola tools, home printing and an Etsy template, and one says "In total we spend less than $20 on our seating chart" [22]. People solve this with free tools and spend their money on the physical display.
- **Frequency:** Once per wedding. A couple is a customer for 2 to 6 weeks and never again. There is no natural repeat purchase.
- **Who has it repeatedly:**
  - Wedding planners and coordinators. PlanSeats sells a planner plan at USD 39.99 a month or USD 290 a year, built around "Unlimited events" and reusing venue layouts "all season" [10][23].
  - Venues. PlanSeats for Venues is USD 49 a month [9]. Cvent (merged with Prismm, formerly AllSeated) sells event diagramming to planners and vendors from USD 49 a month up to USD 320 a month [15].
  - Gala, charity and club organisers. PerfectTablePlan sells an Advanced edition (USD 74.95) for "Charity organizers, club secretaries and other frequent users" and a Professional edition (USD 299.95) [13].
  - Teachers. Google autocomplete for "seating chart maker" returns "classroom", "for teachers" and "school" variants [17]. That is a different product and a crowded free niche.
  - These repeat buyers want floor plans, venue templates, team access and client sharing. Seatwise has none of these, and its spec rules out floor plans and sharing [spec].

## 3. Competition

All prices are from the vendor's own page or app store listing.

| Alternative | Price (own page) | What it does | Gap Seatwise fills? |
|---|---|---|---|
| WeddingWire seating chart | "totally free" [6] | Groups, multiple events, floor plan, print, export. Shows a sign-up form | Seatwise needs no account and keeps data on the device. Small gap |
| The Knot | Free seating chart tools and free templates [7] | Guest list tool with parties and RSVPs | Same small gap |
| Zola | App "easy and FREE to use"; seating chart pulls confirmed guests from the Zola list; print-ready PDF [8][24] | Drag and drop round or rectangle tables | Zola's app is iOS only [24]; Seatwise works in any phone browser |
| planning.wedding | Free plan (5 tables), Premium is "a one-time payment per project", price not shown; "No sign-up required" [19] | Auto seating, Excel and PDF export, stationery print files | Almost none. It already does no-signup plus stationery |
| PlanSeats | Starter free (1 event, 4 tables); Plus USD 8.99 a month or USD 50 once; Pro USD 39.99 a month; Venues USD 49 a month [9] | Drag and drop, auto-assign rules, PDF export | Seatwise is free with no table limit |
| SeatFlow (iOS) | Weekly USD 2.99, Lifetime USD 17.99; "requires an active subscription"; 1 rating [14] | Groups, auto-fill, CSV export, offline | Seatwise is free. Little evidence SeatFlow sells |
| PerfectTablePlan (desktop) | Home USD 29.95, Advanced USD 74.95, Professional USD 299.95; no saving or printing above 30 guests without a key [13] | Mature desktop software | Phone use. Real but narrow |
| Top Table Planner | "From just $20", free trial, "No sign up necessary" [16] | Online table plans | Free core |
| Cvent Event Diagramming (ex-Prismm/AllSeated) | Free (3 events, 150 attendees); Standard USD 49 a month; Pro USD 150; Premium USD 320 [15] | Professional diagramming | Not the same buyer |
| Free no-signup web tools: YouWare, Free Wedding Seating, Seatisfy, miniwebtool and more | YouWare "completely free with no account required"; Free Wedding Seating "No account required", launched 15 Jan 2026 with 0 Product Hunt upvotes [20][21][25] | Drag and drop, print, share link | None. These are the same pitch as Seatwise |
| Canva templates | Listed as "Free custom printable wedding seating chart templates" [11] | The display board | This is what the Pro place and escort cards would compete with |
| Etsy templates | Example: an editable Canva seating chart set at USD 13.99, from a shop with 38.3k sales [12] | Designed boards, cards | Same |
| Spreadsheets | Free (autocomplete shows "template excel" and "template google sheets" searches [17]) | Anything | Seatwise is faster on a phone |

**Gap verdict.** The phone-first, private, no-signup angle is real but thin, and others already fill it. YouWare, Free Wedding Seating and planning.wedding all advertise free use with no account [19][20][21]. The planned Pro features are sold more cheaply, with more design choice, on Canva and Etsy. I see no defensible gap.

Note on the existing brain evidence: the PlanSeats price in `company/ventures/seatwise.json` came from Capterra, a third-party site. PlanSeats' own page confirms it: Plus is USD 8.99 a month or USD 50 once [9]. The WeddingWire complaint thread cited there dates from 2018 [18].

## 4. Willingness to pay

**Evidence that people pay:**
- Paid tools exist and have lasted: PerfectTablePlan at USD 29.95 to 299.95 [13], Top Table Planner from USD 20 [16], PlanSeats at USD 50 once or USD 8.99 a month [9]. Their sales numbers are not public, so the volume is unknown.
- Etsy seating chart templates sell. One shop selling a USD 13.99 set has 38.3k sales in total, and this listing has 21 reviews [12]. That proves people pay for the design of the display, not for the seating logic.
- Professionals pay on a recurring basis: USD 39.99 to 49 a month (PlanSeats Pro and Venues [9][10]), USD 49 to 320 a month (Cvent [15]).

**Evidence of weak paying demand:**
- New phone apps in this niche have almost no traction. SeatFlow has 1 rating [14]. "Wedding Seating Chart Maker", at USD 19.99 a month, has 2 ratings averaging 1.0 [26]. "Seating-Chart" has 27 ratings averaging 1.9, with USD 2.99 add-ons [27].
- Couples on forums report spending on frames, boards and prints, and using the free wedding-site tools [22].

**Is INR 799 credible?**
- For a US or UK buyer: the price is credible, but it should be in USD or GBP. INR 799 is USD 8.48, below every paid comparable (USD 13.99 to 50). An INR price on a US checkout adds friction and FX doubt.
- For an Indian buyer: I found no evidence that Indian couples pay for seating tools. The one India-focused planner I found, Anvaya, is "Free during early access" [28]. Because assigned tables are uncommon in India [4], INR 799 has no market proof.
- Underneath both: the Pro content (place and escort cards) competes with free Canva [11] and roughly USD 14 Etsy templates [12]. I would expect a low conversion rate at any price.

## 5. Distribution (first 100 buyers, no ads, no outreach)

**Search demand exists:**
- "wedding seating chart" has 27,100 global monthly searches, CPC USD 0.61, ad competition 1.00. "seating chart" also has 27,100 (Keywords Everywhere, refreshed November 2026) [29].
- "seating plan" has 40,500 monthly searches. 45% (18,100) are from the UK and only 4% from the US (RankHero) [30]. In the UK the product would need to be called a "table plan" or "seating plan".
- US Google autocomplete for "wedding seating chart" includes "maker", "generator", "template", "board", "sign" and "cards". For "wedding seating chart free" it includes "online", "tool" and "app" [17]. Many of these searchers want something free, or want the physical sign.

**But the results are crowded.** A live search for "wedding seating chart maker free" returned about 20 distinct tools and template pages, including Creative Fabrica, YouWare, 101 Planners, planning.wedding (several pages), Venngage, CapCut, Wedibox, Xmind, Edraw and Eventifai [31]. On top of these sit the WeddingWire, The Knot and Zola domains. A new subdomain of a personal domain, with no backlinks, should not expect to reach page 1 for head terms within 90 days. That is my judgement, not a measured figure.

**Channels the company may use without approval:**
- Organic search on long-tail pages (for example "seating chart no signup phone", "auto seat families together", "seating chart csv"). This is slow, typically months.
- Free directories and app-style listings, if they count as publishing a product page and not as posting as the company. Whether they count is unclear, so check with Legal.

**Channels that need owner approval under CLAUDE.md:** Reddit, Facebook groups, Product Hunt, Pinterest and the owner's own social audience. All of these are public posting as the owner or the company. These are the only channels that could plausibly bring the first 100 buyers inside 90 days. The owner's audience is Indian and professional, which is the wrong audience for a US wedding tool.

**First 100 buyers, honestly:** I cannot name a no-ads, no-outreach path to 100 paid buyers within 90 days. Search can bring a trickle of free users. Paid conversion depends on Pro existing (it does not yet) and on beating free Canva cards.

## 6. Unit economics and 90 day revenue range

**Price and net per sale:**
- INR 799 = USD 8.48.
- Razorpay: domestic cards cost 2% plus 18% GST, about 2.36% in total. International cards cost 3% plus GST, about 3.54% [32]. Net per international sale: 799 × (1 - 0.0354) = INR 770.7.
- Gumroad: 10% + USD 0.50 per direct sale, plus card processing of 2.9% + USD 0.30 [33]. On USD 8.48 the fees are about USD 1.89 (22%), leaving about USD 6.58, or INR 620.
- A cheap one-time price loses a large share to fixed fees.

**Costs:**
- Engineering is already spent.
- Hosting: INR 0 at this traffic, if the Vercel team is on a plan that allows commercial use. Vercel's terms say "You shall only use the Services under a Hobby plan for your personal or non-commercial use" [34]. Whether team `anchit-ai-hustle` is on Hobby or Pro is not recorded in the brain, so it is unknown. If it is Hobby, selling Pro there breaches the terms, and Pro costs USD 20 a month per developer seat [35].
- Monthly budget: INR 0 (config.json).

**Blockers before revenue is possible:**
- ap-1 (price) is pending.
- ap-3 (terms and refund) is pending.
- ap-4 (Cloudflare proxy) is pending, and it blocks launch.
- No payment rail exists. Per the spec, it is filed as an account approval.
- Pro is not built.

**90 day scenarios.** These are all estimates. Net figures use Razorpay international at INR 770.7.

| Case | Visitors (90 d) | Visitor to paid | Sales | Gross INR | Gross USD | Net INR |
|---|---|---|---|---|---|---|
| Worst | 200 | 0% (Pro never goes on sale, or nobody buys) | 0 | 0 | 0 | 0 |
| Likely | 1,000 | 0.5% | 5 | 5 × 799 = 3,995 | 42.38 | 5 × 770.7 = 3,854 |
| Best | 10,000 | 2% | 200 | 200 × 799 = 159,800 | 1,695 | 200 × 770.7 = 154,140 |

How I reached these numbers:
- Worst: 200 visitors assumes the launch slips and there is no indexing beyond a few long-tail pages.
- Likely: 1,000 visitors assumes some long-tail ranking from month 2. The 0.5% rate assumes most visitors are free-seekers who already have free tools [17][22].
- Best: 10,000 visitors needs about 37% of one month's global searches for "wedding seating chart" (10,000 / 27,100) inside 90 days. That would only happen if an owner-approved post went viral. I consider it unlikely.

Against the company's own kill rule (3 paid orders or 20 signups within 14 live days, config.json), Seatwise fails by design: it takes no signups, and it cannot take payment until the approvals clear.

## 7. Risks and what would prove the idea wrong

**Risks:**
1. Free incumbents. WeddingWire, The Knot, Zola and many no-signup tools are free [6][7][8][20][21].
2. Pro is a commodity. Canva cards are free and Etsy cards cost about USD 14 [11][12].
3. Wrong market. The INR price targets India, where assigned seating is uncommon [4].
4. Distribution. Search is crowded [31], and the faster channels need approval.
5. One-off purchase. Every customer has to be replaced, and there is no lifetime value.
6. Hosting terms. Commercial use on Vercel Hobby is not allowed [34], and the team's plan is unknown.
7. Seasonality. US and UK weddings cluster in warmer months, so a November to February test window catches the planning season. That one is an assumption. I did not source it.

**What would prove it wrong (falsifiable, dated).** Measure from the live date. If the site is not live by 2026-11-28, measure from 2026-11-28. Review on **2027-02-26** (90 days). The idea is wrong if any of these hold:
- Fewer than **1,000 total visits** from organic search. This needs the privacy-friendly counter already proposed in the spec, and until it exists the brain must record null.
- Fewer than **20 recorded Pro pre-order intents** (the spec's planned intent button).
- Fewer than **3 paid orders** within 30 days of Pro actually going on sale.
- Google Search Console (if approved) shows no Seatwise page ranking in the top 30 for any query containing "seating chart" or "seating plan" by **2027-01-31**.

If all four pass, I would re-score it and look at a USD price.

## 8. Options

- **(a) Proceed as is (INR 799 one-time, free core, Indian owner audience).** Not advised. The market is mismatched, the Pro features are commodity, and there is no channel to buyers. Likely revenue is a few thousand rupees after three approvals and a payment rail.
- **(b) Pivot.** The best pivot I can find is a free, private, no-signup planner for US, UK and diaspora couples, priced in USD (for example USD 12 one-time). Its one feature free tools handle badly would be multi-event South Asian diaspora weddings (sangeet, ceremony, reception seating from one list). That niche is real [4][5], but Anvaya already targets it for free [28], and WeddingWire supports multiple events [6]. The bigger business is B2B (planners and venues at USD 39 to 49 a month [9][10][15]), but that needs floor plans, team access and outreach, all of which are excluded or need approval. Neither pivot clears the bar on today's evidence.
- **(c) Stop.** Advised for revenue work: stop building Pro and spend engineering time on an idea with recurring revenue or a less crowded search space. Because the free tool is already built and passed local QA, leaving it live as a labelled demand test costs close to nothing.

## 9. Scorecard

| Criterion | Score (1 to 5) | Reason |
|---|---|---|
| pain | 2 | A real but short, once-per-wedding chore, and couples report solving it with free tools for under USD 20 [22] |
| willingnessToPay | 2 | People pay for designed templates and pros pay monthly, but consumer seating apps show almost no traction [12][14][26][27] |
| marketSize | 3 | About 2M US and 0.23M England and Wales weddings a year [1][2], but the paying share is unknown and India barely uses charts [4] |
| distribution | 1 | Organic search only, results crowded [31], and every fast channel needs owner approval |
| competitionGap | 1 | Free, no-signup, phone-friendly tools already exist [19][20][21], and Pro features are commodity [11][12] |
| speedToRevenue | 1 | Built, but blocked by 3 pending approvals, no payment rail, Pro not built, and an unknown hosting plan [34] |
| recurringRevenue | 1 | One-off per wedding; recurring buyers (planners, venues) need features Seatwise excludes [10][15] |
| **Total** | **11 / 35** | |

## 10. Recommendation

**No-go** as a revenue venture. Do not approve INR 799 for Indian couples, and do not build Pro.

Leave the already-built free planner live only as a labelled demand test, with the kill test in section 7 (review 2027-02-26). Revisit a USD-priced version only if it passes those numbers. I would not trade this slot in the pipeline for any version of Seatwise on today's evidence.

## Sources

1. The Knot Worldwide, 2026 Real Weddings Study press release: https://www.theknotww.com/press-releases/the-knot-worldwide-unveils-2026-real-weddings-study
2. ONS, Marriage, cohabitation and civil partnerships (Marriages and civil partnerships in England and Wales: 2023): https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/marriagecohabitationandcivilpartnerships/?sortBy=release_date
3. CAIT, Wedding season 2025, 46 lakh weddings: https://cait.in/wedding-season-2025-to-generate-₹6-5-lakh-crore-business-from-46-lakh-weddings-across-india-cait-delhi-alone-to-witness-₹1-8-lakh-crore-trade-from-4-8-lakh-weddings-indian/
4. Shaadi Shop, Indian wedding reception seating: https://blog.shaadishop.co/2019/06/04/how-do-you-arrange-assigned-seating-for-an-indian-wedding-reception-a-detailed-review-with-pros-and-cons/
5. MySeatPlan, Indian wedding seating chart guide: https://myseatplan.com/en/blog/indian-wedding-seating-chart-guide
6. WeddingWire seating chart tool: https://www.weddingwire.com/wedding-planning/wedding-seating-tables.html
7. The Knot, wedding seating chart templates and free tools: https://www.theknot.com/content/wedding-seating-chart-template
8. Zola seating chart: https://www.zola.com/wedding-planning/seating-chart
9. PlanSeats pricing: https://www.planseats.com/pricing
10. PlanSeats Pro: https://www.planseats.com/pro
11. Canva wedding seating chart templates (title "Free custom printable wedding seating chart templates"; page body could not be fetched): https://www.canva.com/seating-charts/templates/wedding/
12. Etsy listing, wedding seating chart template set (USD 13.99): https://www.etsy.com/listing/539812372/wedding-seating-chart-template-set
13. PerfectTablePlan purchase page: https://www.perfecttableplan.com/html/purchase.html
14. SeatFlow, App Store: https://apps.apple.com/us/app/id6760965608
15. Cvent / Prismm pricing: https://www.cvent.com/en/event-marketing-management/cvent-event-design-software/prismm-pricing
16. Top Table Planner: https://www.toptableplanner.com/
17. Google autocomplete, queried 2026-11-14 for gl=us, gl=in and gl=uk: https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=wedding%20seating%20chart
18. WeddingWire forum, update to the seating chart tool (2018): https://www.weddingwire.com/wedding-forums/update-to-the-weddingwire-seating-chart-tool/9d9943a640a133db.html
19. planning.wedding seating chart: https://planning.wedding/seating-chart
20. YouWare seating chart maker: https://www.youware.com/features/seating-chart-maker
21. Free Wedding Seating, Product Hunt: https://www.producthunt.com/products/free-wedding-seating/launches
22. WeddingWire forum, seating charts (2022): https://www.weddingwire.com/wedding-forums/seating-charts/891157228c441a53.html
23. PlanSeats for event planners: https://www.planseats.com/for-event-planners
24. Zola app: https://www.zola.com/wedding-planning/app
25. Search results for "wedding seating chart maker no sign up phone" (Seatisfy, miniwebtool and others), 2026-11-14: https://seatisfy.pages.dev/ and https://miniwebtool.com/wedding-seating-chart-maker/
26. Wedding Seating Chart Maker, App Store: https://apps.apple.com/app/id6753326000
27. Seating-Chart, App Store: https://apps.apple.com/us/app/seating-chart/id1168889153
28. Anvaya seating chart: https://anvaya.love/features/seating-chart
29. Keywords Everywhere, top wedding keywords: https://keywordseverywhere.com/ctl/top/wedding-keywords
30. RankHero, "seating plan": https://www.rankhero.com/keywords/seating-plan
31. Search results for "wedding seating chart maker free", 2026-11-14, for example https://www.creativefabrica.com/pl/studio/features/wedding-seating-chart-builder, https://www.101planners.com/seating-chart/, https://venngage.com/ai-tools/seating-chart-generator, https://www.capcut.com/create/seating-chart-maker, https://www.wedibox.com/tools/wedding-seating-chart-maker, https://xmind.com/tools/wedding-seating-plan-maker, https://www.eventifai.com/wedding-seating-chart-maker
32. Razorpay, payment gateway pricing explained: https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/
33. Gumroad's fees: https://gumroad.com/help/article/66-gumroads-fees
34. Vercel Terms of Service, section 4 Hobby plan: https://vercel.com/legal/terms
35. Vercel Hobby plan docs (Pro developer seats USD 20 per user per month): https://vercel.com/docs/plans/hobby.md
- [spec] specs/seatwise.md in this repo (Out of scope: floor maps, sharing).
