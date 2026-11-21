# Kennel Book business case

Author: Meera, Head of Research. Date: 2026-11-21. FX used: USD 1 = INR 94.2754 (company/config.json, source xflowpay, as of 2026-11-14). I did not propose this idea and gain nothing if it passes. Search volumes are DataForSEO Google Ads monthly averages for the United States (location 2840, English), pulled through Firecrawl Alexandria on 21 Nov 2026 [1]. Page one results are live Firecrawl searches from the United States on the same day [17][18][19][20][21][22][23].

## Summary

- Kennels clearly pay monthly in USD for booking software: ProPet USD 69.99 with boarding [2], KennelBooker from USD 49.99 [3], DatCog from USD 54 [4], Revelation Pets USD 60 to 77 [5], Time To Pet Facility USD 79 [6], Gingr from USD 100 and USD 209 for its Stay plan billed monthly [7].
- The small end is already served cheaply: DoggieDashboard is free up to 10 pets and USD 40 a month after [8]; PetPocketbook is USD 25 a month and covers overnights [9]; Etsy kennel spreadsheets sell for USD 2 to 17 once [10]; and Kennel Booking (UK) already sells this exact kennel board shape [11].
- Distribution fails. The buyer terms add up to about 830 US searches a month ("dog boarding software" 390, "kennel software" 140, "kennel management software" 110, "pet boarding software" 110 and smaller tails) and page one is vendors, Capterra, G2 and DoggieDashboard. The big terms ("dog boarding rates" 3,600, "dog boarding app" 1,300, "home dog boarding" 590) are pet owners looking for a sitter, and page one is Rover, Wag, Yelp and Care.com [1][17][18][19][20][21].
- There is no payment rail yet (company/approvals/ap-2.json, decided "do nothing for now").
- Score 18 of 35. Recommendation: no-go. It fails the total bar and the distribution minimum of 3.

## Market

**Who pays.** Owners of small US boarding kennels, dog daycares and home boarders. Every priced competitor sells in USD [2][3][4][6][7][8][9], and the demand evidence that names a currency is in USD (ProPet [2], the r/DogDayCare reply quoting about USD 100 a month [16]). This is a USD product. One of the two Reddit posts is from a kennel and cattery whose country is not stated; Kennel Booking's own market is the UK [11]. Neither changes the currency of the US market.

**How many (sourced):**

| Measure | Number | Source |
|---|---|---|
| US pet care (except veterinary) employer establishments, all sizes, NAICS 812910 | 25,551 | Census CBP 2023 [12] |
| Of those, with fewer than 5 employees | 14,744 | Census CBP 2023 [12] |
| Of those, with 5 to 49 employees (5,119 + 3,622 + 1,869) | 10,610 | Census CBP 2023 [12] |
| Gingr says it serves 5,000+ facilities | 5,000+ | Gingr pricing page [7] |
| Time To Pet says it serves 4,000+ pet care businesses (all types) | 4,000+ | Capterra listing [19] |

**What is not known:** NAICS 812910 mixes boarding with grooming, training, pet sitting and dog walking, so the number of boarding kennels and daycares inside the 25,551 is unknown. Home boarders who have no employees are nonemployer firms and are not in CBP at all; their count is unknown. How many already pay Gingr, ProPet, Time To Pet or DoggieDashboard is unknown, though Gingr alone claims 5,000+ facilities [7], which is a large share of a 25,551 pool that also contains groomers.

**Who is not the buyer.** Pet owners searching for a boarder (the bulk of every high volume term, see Distribution), and pet sitters and walkers, who already have a free app in Pet Sitter Dashboard [13] and are not the target.

## Problem

- **Pain:** Real. A worker at a dog boarding kennel and cattery says the boss still uses pen and paper to note who is coming in, who is in and who is going out [14]. Double bookings, missed medications and lapsed vaccinations cost money and trust, which is why every vendor sells vaccination checks and arrival and departure views [2][4][11].
- **Frequency:** Repeats every day. Arrivals, departures, feeding and medication happen daily, which favours a subscription.
- **How people solve it today:** paper; a free or cheap spreadsheet (Etsy USD 2 to 17 [10]); a free capped plan (DoggieDashboard, 10 pets [8]); or a paid suite at USD 25 to 209 a month [2][3][4][5][6][7][9].
- **Sceptic's note:** The pen and paper kennel in [14] is the buyer least likely to pay monthly; the evidence for that is the Etsy spreadsheet market, where a USD 2.08 kennel card and daily log set shows 342 reviews and a USD 14.49 boarding tracker shows 40 [10]. Review counts are not sales counts; sales are unknown. I could not re-read either Reddit thread because Reddit blocks direct scraping; both rest on search excerpts.

## Competition

All prices are from each vendor's own page, except where noted. INR at 94.2754.

| Alternative | Price | What it does | Source |
|---|---|---|---|
| DoggieDashboard | USD 0 up to 10 pet profiles; then USD 40 a month (Rs 3,771) or USD 400 a year | Client and pet records, appointments, e-sign waivers, invoicing, reports | [8] |
| PetPocketbook | USD 25 a month (Rs 2,357), USD 23.75 billed yearly; one plan | Scheduling, visit tracking, report cards including overnights | [9] |
| ProPet | USD 49.99 base plus USD 20.00 boarding module a month = USD 69.99 (Rs 6,598); first month free | Kennel bookings, vaccination reminders, report cards | [2] |
| KennelBooker | From USD 49.99 a month (Rs 4,713); 14 day trial, no free plan (its own blog) | Online bookings, payments, reminders, occupancy, "run the day from your phone" | [3] |
| DatCog | From USD 54 a month (Rs 5,091) under 100 spaces; 14 day trial | Arrivals and departures, occupancy by area, feed rounds, AM/PM medication sign off, owner portal | [4] |
| Revelation Pets | Silver USD 60, Gold USD 77 a month (Rs 5,657 / Rs 7,259); free trial | Daycare, boarding, training, grooming | [5] |
| Time To Pet Facility | USD 79 a month (Rs 7,448); 14 day trial | Boarding and daycare, occupancy tracking, digital check in | [6] |
| Gingr | From USD 100 a month annually; Stay plan USD 209 monthly or USD 179 annually (Rs 19,703 / Rs 16,875) | Full kennel and daycare suite | [7] |
| Kennel Booking (UK) | GBP 29, 39 or 49 a month by kennel count; founding offer GBP 10 off for a year | Kennel board, who is in, arrivals and departures, tablets, vaccination checks, register | [11] |
| Etsy kennel spreadsheets | USD 2.08 to 16.99 once (Rs 196 to Rs 1,602); top sellers show 342 and 40 reviews | Google Sheets or Excel booking, vaccine tracker, occupancy dashboard, kennel cards | [10] |
| Paw Partner | Monthly rate not shown on the pricing page I scraped (only add ons, e.g. texts USD 10.99 a month); the venture's screen recorded USD 44.99 | Boarding, daycare, grooming | [15] |

**The gap we would fill.** A phone first kennel board with occupancy, feeding and medication notes, vaccination dates and an owner check in link, free beyond 10 dogs. That gap is thin. DatCog already sells exactly arrivals, occupancy, feed rounds, medication sign off and an owner portal from USD 54 [4]; KennelBooker already pitches "run the day from your phone" [3]; DoggieDashboard is free to 10 pets and only USD 40 after [8]; PetPocketbook is USD 25 [9]. A kennel that outgrows paper and is willing to pay monthly has a dozen proven tools with reviews, support and data migration (Paw Partner and ProPet both offer free setup and migration [15][19]). A new no name tool from an AI company with no reviews competes on trust, which it cannot win quickly.

## Willingness to pay

- Kennels pay monthly and well: USD 25 to 209 a month across nine vendors [2][3][4][5][6][7][8][9], all above the company's Rs 500 floor. Gingr claims 5,000+ facilities [7].
- Advertisers bid USD 29.03 a click for "dog boarding software", USD 38.29 for "kennel software" and USD 49.63 for "pet boarding software" [1], which says vendors earn a lot per buyer.
- One off payment also happens: Etsy kennel spreadsheets at USD 2 to 17 [10].
- Against: the price we could charge is boxed in. Up to 10 dogs DoggieDashboard is free; above it, USD 40 [8], and PetPocketbook is USD 25 [9]. To win on price we would charge about USD 15 a month flat (Rs 1,414). That is my assumption for the arithmetic below, not a tested price. The buyer this product targets (10 to 60 dogs, on paper today) is the cheapest segment of the market and the one Etsy already serves for a one off few dollars.

## Distribution

Our only channel is search to pages and free tools on our own subdomain.

| Search term | US monthly volume [1] | CPC USD [1] | Who holds page one now |
|---|---|---|---|
| dog boarding rates | 3,600 | 3.92 | Local kennels, Rover blog, Facebook group, Quora, Care.com, CareCredit, Dognition. Pet owner intent [20] |
| dog boarding app | 1,300 | 9.76 | Reddit r/petsitting, Rover, Facebook, Apple App Store (Rover, Wag), Wag, PetBacker, Time To Pet. Pet owner intent [18] |
| dog daycare app | 1,300 (same monthly series as dog boarding app, Google groups them) | 9.76 | not searched separately |
| home dog boarding | 590 | 8.48 | Yelp, Dogtopia, local boarders, Care.com, boarding.com. Pet owner intent [22] |
| dog boarding software | 390 | 29.03 | DoggieDashboard, Paw Partner, Reddit r/software, ProPet, KennelBooker, Capterra, MoeGo, Time To Pet, GoPetAI guide [17] |
| dog daycare software | 390 (same series as dog boarding software) | 29.03 | not searched separately |
| dog boarding business | 260 | 4.76 | Time To Pet blog, Dogtopia, YouTube, BizBuySell, Yelp, Facebook, LoopNet, Care.com. Mostly would be owners and buyers of businesses [23] |
| how to start a dog boarding business | 210 | 8.06 | not searched separately; Time To Pet's guide ranks first for the parent term [23] |
| kennel software | 140 | 38.29 | Kennel Connection, ProPet, Reddit r/software, KennelBooker, DoggieDashboard, Capterra, Paw Partner, Software Advice, Revelation Pets, YouTube [19] |
| kennel management software | 110 | 23.71 | not searched separately |
| pet boarding software | 110 | 49.63 | not searched separately; Time To Pet and MoeGo pages carry this exact title [17] |
| kennel cards | 110 | 0.50 | Pinterest, Shelterluv, Etsy, Rescue Pet Supply, Pedigree Foundation. Animal shelter intent [24] |
| dog boarding software free / dog daycare software free | 40 (same series) | 24.11 | DoggieDashboard, Pet Sitter Dashboard, Time To Pet, G2 free kennel list, ProPet, KennelBooker's "is there free kennel software" post, Paw Partner, DatCog, Facebook, Capterra [21] |
| Small tails: dog kennel software 40, kennel card template 40, dog boarding contract 70, dog boarding checklist 30, dog boarding forms 30, boarding kennel software 20, dog boarding intake form 20, kennel booking software 10, free kennel software 10, dog boarding calendar 10, how much to charge for dog boarding 10, dog boarding waiver 10, dog boarding template 10; dog boarding spreadsheet and dog boarding price calculator returned no volume (null) | about 300 combined | 0.01 to 42.03 | not each searched |

**Buyer intent total.** Counting each grouped series once, the software terms are 390 + 140 + 110 + 110 + 40 + 40 + 20 + 10 + 10 = 870 a month, and only "dog boarding software" (390) is over 150. The forms and templates tail adds about 200 more, much of it shelter and pet owner intent.

**Could our pages rank and convert?** Honestly, not soon and not much.

- The high volume terms are the wrong people. "dog boarding rates", "dog boarding app" and "home dog boarding" (5,490 a month together) are pet owners looking for a place to leave a dog, and page one is Rover, Wag, Yelp and Care.com [18][20][22]. Even if we ranked, almost no visitor runs a kennel.
- The right people search "dog boarding software" and "kennel software", and that page one is funded vendors and Capterra, with advertisers paying USD 29 to 50 a click [1][17][19]. A brand new subdomain will not displace ProPet, KennelBooker, Time To Pet, MoeGo or Capterra within 90 days.
- The "free" queries already have a strong free answer ranking first: DoggieDashboard's own title is "Free Dog Daycare, Kennel & Pet Boarding Software" and it ranks first for "dog boarding software free" and in the top five for "kennel software" [17][19][21]. KennelBooker has already written the page that answers "is there free kennel software" [3].
- A free helper tool (kennel card maker, intake form, boarding checklist) targets terms of 20 to 110 searches a month, and "kennel cards" is held by shelter supplies and Pinterest [24]. A top three spot on all of the tail would bring a few dozen visitors a month, mostly not kennel owners.
- This is the fleet-log pattern again: the buyer searches are owned by paid vendors and review sites, and the volume is consumer intent.

## Unit economics

Assumptions (mine, not measured): price USD 15 a month flat (Rs 1,414) above a free tier; no ads; hosting on the existing free Vercel plan, so cash cost Rs 0 under the Rs 0 spend cap; no payment rail exists today (ap-2), so revenue cannot start until the owner sets one up. Organic click through and conversion rates below are assumptions, labelled as such.

- **Worst:** USD 0 (Rs 0). New pages are not on page one within 90 days, or the payment rail is not live. 0 payers x USD 15 = USD 0.
- **Likely:** USD 15 (Rs 1,414). Pages rank for part of the small tail by day 60, say 150 buyer searches a month. At an assumed 5% click through that is about 8 visitors a month, 16 over the last two months. At a generous assumed 6% visitor to payer rate that is 1 payer for 1 month: 1 x USD 15 = USD 15.
- **Best:** USD 150 (Rs 14,141). We reach the top three for "kennel software" (140), "kennel management software" (110), "pet boarding software" (110) and the 300 tail, so 660 searches a month, at an assumed 10% click through = 66 visitors a month for 2 months = 132 visitors; at an assumed 4% paying = about 5 payers for 2 months: 5 x USD 15 x 2 = USD 150.
- **Costs:** Rs 0 cash. The real cost is build time: a kennel will not keep its client, vaccination and medication records in a no account tool, so this needs accounts, multi device sync, backups and an owner link, which is not a 48 hour build that stores records safely.

## Sizing

The sizing agent adds this in cases/kennel-book.sizing.json.

## Risks

- **It would prove me wrong if** pages on kennel-book.anchit-tandon.com reach 500 or more Google Search Console impressions a week for kennel and boarding software terms by 21 Jan 2027 (about 60 days after a launch on 21 Nov 2026). I expect under 100.
- **It would prove me wrong if** 3 or more kennels or daycares pay by 21 Feb 2027 (90 days). I expect 0 or 1.
- **Free tier risk:** DoggieDashboard is free to 10 pets and USD 40 after [8]. If it raises its free cap, our gap closes further.
- **Copy risk:** DatCog [4], KennelBooker [3] and Kennel Booking UK [11] already sell the phone kennel board shape; there is nothing here a funded vendor cannot match in a sprint.
- **Trust and data risk:** owner names, phone numbers and dogs' medication notes are personal data. A no account log cannot keep them safely across staff devices; adding accounts adds a security and legal review.
- **Care risk:** medication and vaccination fields must not read as veterinary advice or as a guarantee that a dog is protected. The product can only record what staff type in.
- **Payment risk:** no rail exists (ap-2). Any revenue needs the owner's identity for a payment account.

## Options

- **Proceed:** build the phone kennel board with occupancy, feeding and medication notes and owner check in links, USD 15 a month above a free tier. Expected 90 day revenue USD 0 to 150, with search held by vendors, Capterra and DoggieDashboard.
- **Pivot to a free, no account printable kennel card and boarding intake form maker for small boarders, with a paid USD 5 a month tier that saves cards across devices:** targets "kennel cards" (110), "kennel card template" (40), "dog boarding forms" (30), "dog boarding intake form" (20) and "dog boarding contract" (70) [1], about 270 a month, with page one held by Pinterest, Etsy and shelter suppliers [24]. Far below the 1,000 search screen and the Rs 500 price floor at USD 5 is only Rs 471. I do not think it clears the bar either.
- **Stop:** kill kennel-book and spend the build time on an idea whose buyer searches are not owned by funded vendors and whose high volume terms are not consumer intent.

## Scorecard

| Key | Score | Reason |
|---|---|---|
| pain | 3 | Real and daily (a kennel still on pen and paper [14]), but paper and a USD 2 to 17 Etsy sheet are good enough for many small boarders [10]. |
| willingnessToPay | 3 | Kennels pay USD 25 to 209 a month across nine vendors [2][3][4][5][6][7][8][9], but DoggieDashboard free to 10 pets and USD 40 after [8] and PetPocketbook at USD 25 [9] box our price in, and our target segment is the cheapest one. |
| marketSize | 2 | 25,551 US employer pet care establishments [12] including groomers, sitters and trainers; the boarding share is unknown and Gingr alone claims 5,000+ facilities [7]. |
| distribution | 2 | Buyer software terms total about 870 a month, held by vendors and Capterra at USD 29 to 50 a click; the 5,490 a month of high volume terms are pet owners on Rover, Wag and Yelp [1][17][18][19][20][22]. |
| competitionGap | 2 | DatCog, KennelBooker and Kennel Booking UK already sell the phone kennel board [3][4][11]; DoggieDashboard is free to 10 pets [8]; "no account" is not a reason a business trusts us with records. |
| speedToRevenue | 2 | No payment rail (ap-2), and a record store that kennels will trust with client and medication data is more than a 48 hour build. |
| recurringRevenue | 4 | Monthly billing is the category norm and the job repeats every day [2][3][4][6]. |

Total: 18 of 35. Bar: 24 total, none under 2, willingnessToPay and distribution at least 3. Fails on total and on distribution.

## Recommendation

No-go. Kennels pay real monthly money for booking software, but the buyers find it through searches owned by ProPet, KennelBooker, Time To Pet, MoeGo, Capterra and DoggieDashboard, the high volume dog boarding searches are pet owners looking for Rover or a local kennel, and the small end is already covered by a free 10 pet plan, a USD 25 plan and few dollar Etsy spreadsheets. A new subdomain with search only distribution cannot reach the first 100 paying kennels in 90 days.

## Sources

1. DataForSEO Google Ads search volume, US, via Firecrawl Alexandria (dataforseo keywords/search-volume), 21 Nov 2026: https://dataforseo.com/apis/keywords-data-api
2. ProPet pricing: https://www.propetware.com/pricing-subscriptions/
3. KennelBooker, "Is there any free kennel or dog boarding software?" (its own blog, 7 Oct 2026): https://www.kennelbooker.com/blog/free-kennel-software.html ; home: https://www.kennelbooker.com/
4. DatCog pet boarding software: https://www.datcog.app/pet-boarding-software
5. Revelation Pets pricing: https://www.revelationpets.com/pricing
6. Time To Pet pricing: https://www.timetopet.com/pricing
7. Gingr pricing: https://www.gingrapp.com/pricing
8. DoggieDashboard: https://doggiedashboard.com/
9. PetPocketbook pricing: https://www.petpocketbook.com/pricing
10. Etsy, dog boarding spreadsheet listings: https://www.etsy.com/market/dog_boarding_spreadsheet
11. Kennel Booking (UK): https://www.kennelbooking.co.uk/
12. Census County Business Patterns 2023, NAICS 812910 by employment size: https://api.census.gov/data/2023/cbp?get=group(CB2300CBP)&NAICS2017=812910&ucgid=0100000US
13. Pet Sitter Dashboard: https://petsitterdashboard.com/
14. Reddit r/software, simple software to manage booking for a dog kennel (search excerpt): https://www.reddit.com/r/software/comments/19c1zos/simple_software_to_manage_booking_for_a_dog_kennel/
15. Paw Partner pricing: https://pawpartner.com/pricing/
16. Reddit r/DogDayCare, dog daycare software (search excerpt, via the venture's evidence): https://www.reddit.com/r/DogDayCare/comments/1nrg6fq/dog_daycare_software/
17. Page one, "dog boarding software": https://doggiedashboard.com/ , https://pawpartner.com/ , https://www.propetware.com/ , https://www.kennelbooker.com/ , https://www.capterra.com/kennel-software/ , https://www.moego.pet/pet-boarding-software , https://www.timetopet.com/pet-boarding-software , https://www.gopetai.com/blog/dog-boarding-software-guide-2026
18. Page one, "dog boarding app": https://www.reddit.com/r/petsitting/comments/1i7sk2b/whats_a_popular_app_for_dog_sitting_other_than/ , https://www.rover.com/ , https://apps.apple.com/us/app/rover-pet-sitters/id547320928 , https://wagwalking.com/ , https://www.petbacker.com/ , https://www.timetopet.com/
19. Page one, "kennel software": https://kennelconnection.com/ , https://www.propetware.com/ , https://www.kennelbooker.com/ , https://doggiedashboard.com/ , https://www.capterra.com/kennel-software/ , https://www.softwareadvice.com.au/directory/4638/kennel/software , https://www.revelationpets.com/
20. Page one, "dog boarding rates": https://www.rover.com/blog/buffalo-ny-dog-boarding-price/ , https://www.care.com/c/how-much-does-dog-boarding-cost/ , https://www.carecredit.com/well-u/pet-care/pet-boarding-cost/ , https://dognition.com/guides/how-much-does-dog-boarding-cost
21. Page one, "dog boarding software free": https://doggiedashboard.com/ , https://petsitterdashboard.com/ , https://www.g2.com/categories/kennel/free , https://www.kennelbooker.com/blog/free-kennel-software.html , https://www.datcog.app/pet-boarding-software , https://www.capterra.com/kennel-software/
22. Page one, "home dog boarding": https://m.yelp.com/search?find_desc=Dog+Boarding&find_loc=San+Jose%2C+CA , https://www.dogtopia.com/san-jose/dog-boarding/ , https://homedogboarding.com/ , https://www.care.com/dog-boarding-kennels/san-jose-ca , https://boarding.com/dog-boarding--ca--san-jose
23. Page one, "dog boarding business": https://www.timetopet.com/blog/running-your-pet-business/how-to-start-a-dog-boarding-business , https://www.dogtopia.com/ , https://www.bizbuysell.com/dog-daycare-and-boarding-businesses-for-sale/ , https://www.loopnet.com/biz/dog-daycare-and-boarding-businesses-for-sale/
24. Page one, "kennel cards": https://www.pinterest.com/ideas/kennel-card/934478397751/ , https://www.etsy.com/market/kennel_cards , https://www.rescuepetsupply.com/products/kennel-card-4x6in-100pk , https://www.pedigreefoundation.org/media/uploads/2023/05/Shelter-Scan-Toolkit-final2-2.pdf
