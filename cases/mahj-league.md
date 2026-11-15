# Mahj League business case

Author: Meera, Head of Research. Date: 2026-11-15. FX used: USD 1 = INR 94.2754 (company/config.json, source xflowpay, 2026-11-14). I did not propose this idea and gain nothing if it passes. All facts were checked live on 2026-11-15.

## Summary

- American mahjong is growing and some local organisers run paid 4 week leagues with placement points and standings [1][2][3].
- But the standings tool is already free: AMR Authority (free iOS) shipped club leagues with standings in v2.5.0 [4], PartyPot (free iOS and Android) runs multi league season leaderboards and names mahjong groups as a target [5][6], Mahjic has a free plan for small clubs [7], and keepthescore gives 2 free scoreboards [8].
- The two leagues we found already chose an app (MahWins, a "custom league app") [2][3]; paid tools have small rating counts (Mahjic 44, MahWins 16, AMR 6) [7][9][4].
- No sourced search volume exists for any league term, page one is a mix of app store pages and riichi or sports results, and there is no payment rail (ap-2) and none for USD.
- Score 14 of 35. Recommendation: no-go.

## Market

**Who pays.** The organiser of an American mahjong club, open play night or league in the US: a teacher, a shop, a bar or a volunteer who runs a weekly game and wants standings. Not the players.

| Measure | Figure | Source |
|---|---|---|
| American mahjong players | "estimated 750,000", one press article, no method given | [10] |
| Clubs using Mahjic | "400+ clubs" (vendor claim); its directory lists "1,400+ clubs" | [7] |
| Paid leagues found | 2 local 4 week leagues (Northborough MA; Wild & Precious Collective) | [2][3] |
| Organisers who run multi week leagues with standings, US | Unknown. No count found | - |
| Growth signal | Public radio and NBC New York report new clubs and younger players, with no figures | [1][11] |

The market and currency match: the need is US, priced in USD. The buyer pool that matters is not 750,000 players but the organisers who run seasons, and that number is unknown. If 1,400 directory clubs is a rough ceiling for visible clubs [7], and only a minority run multi week leagues, the buyer pool is likely in the hundreds, not thousands. That last sentence is my inference, not a sourced count.

## Problem

- **Pain:** Low to moderate. Keeping a weekly points table is arithmetic a spreadsheet does. A forum organiser asks how to structure a league (seating by team and rating), which is a format question, not a tool question [12].
- **Frequency:** Repeats weekly during a season, so a tool would be used often by the few who run leagues.
- **Current workaround:** Free apps with league standings [4][5][7], free generic scoreboards [8], free sheet templates [13], and USD 1.99 printable score cards for a single table [14].

## Competition

Prices are from each vendor's own page or app store listing.

| Alternative | Price (own page) | What it does | Gap we would fill |
|---|---|---|---|
| Mahjic: Club & League (iOS, iPad) | Free plan: up to 5 events a month and 50 players; Starter USD 21.99/mo or 229.99/yr; Pro USD 57.99/mo or 619.99/yr; leagues and tournaments need Pro. 44 ratings, 4.8. Claims 400+ clubs [7] | Club events, RSVPs, leagues, tournaments | Leagues without a USD 57.99/mo plan. Real gap on price, but Mahjic owns the club relationship |
| AMR Authority (iOS) | Free; AMR+ USD 4.99/mo, mainly ad free [4][10]. 6 ratings | Elo rankings, clubs, tournaments, and since v2.5.0 club leagues with standings, RSVP and chat [4] | Almost none. It already does free league standings |
| PartyPot (iOS, Android) | Free on iOS and Android [6]; business price not shown [5] | Season leaderboards by points, multiple leagues per club, private clubs, live standings on phones; names mahjong groups [5]. Also tracks money, which we would not | No money features and no install. Small |
| MahWins (iPhone only) | USD 2.99, no in-app purchases listed. 16 ratings [9] | Game log, group leaderboard, league organiser tools (add players, claim codes, rules) [9]. Used by the Northborough league [2] | Android and web users. Small to moderate |
| keepthescore.com (web) | Free: 2 scoreboards; Plus USD 14/mo; Pro USD 26/mo [8] | Generic web leaderboard, any phone, no install | Mahjong specific points rules. Small; a club can make do with it free |
| Google Sheets templates | Free scoreboard templates [13] | Any table of points, shareable link | Convenience only |
| mahjongg.ai.studio scoring calculator (web) | No price shown [15] | Settles a single hand's points under NMJL rules; no standings [15] | Season standings. But it is a free hand calculator, not a competitor for leagues |
| Printable score cards (Etsy) | USD 1.99, 5 reviews; shop has 106 sales [14] | One table, four players, four games on paper | Digital standings |
| MJWinLog (iPhone, iPad) | USD 1.99, 1 rating [16] | Per player hand stats, no leagues [16] | Leagues |

The gap is narrow: "league standings on the web, any phone, no install, no money". AMR Authority and PartyPot are free and already do standings on the two phone platforms; keepthescore covers the no install case for free.

## Willingness to pay

- **Players pay for leagues, not tools:** USD 70 to 115 per player for a 4 week league [2]; USD 30 a week or 100 for four [3]. The money goes to the organiser for the event, not to software.
- **Organisers paying for tools:** Mahjic sells Starter and Pro plans at USD 21.99 to 57.99 a month [7], but the store shows 44 ratings and no revenue figure, so actual paid uptake is unknown. MahWins sells at USD 2.99 one time to players, with 16 ratings [9]. AMR+ is USD 4.99 a month and is described as ad free, not as a league unlock [4][10].
- **Small paper spend:** printable score cards at USD 1.99 with 5 reviews [14].
- **No evidence found** of an organiser paying a standalone web standings tool for mahjong. With AMR Authority and PartyPot free, the price a new web tool could charge is close to zero.

## Distribution

Search only, through our own subdomain pages and free tools.

| Search term | Monthly volume | Who ranks on page one now (checked 2026-11-15) |
|---|---|---|
| mahjong league app | Unknown, no public source found | Mahjic App Store page, Mahjong 4 Friends, app tracker sites (mwm.ai, appgoblin, splitmetrics), Microsoft Store [17] |
| mahjong league standings | Unknown | San Diego Mahjong Club (Zung Jung rules), Reach Mahjong forum, riichi pages, a Google Sheet, plus unrelated sports league standings [18] |
| mahjong league scoring sheet | Unknown | Etsy printable, NZ club PDF, Gumroad British rules sheets, mahjongg.ai.studio calculator, mahjong4friends scoring guide, riichi PDFs [19] |
| american mahjong league standings tracker app | Unknown | MahWins, Mahjic, AMR Authority listings and press, PartyPot, sandiegomahjong.org [20] |
| mahjong score tracker free web app american | Unknown | App Store listings only (MahWins, MJWinLog, MemoJong, Simple Mahjong Scoreboard and others) and a PartyPot FAQ [21] |

**Volume.** I found no publicly indexed Google volume for any league or standings term. The nearest sourced figures are Etsy marketplace searches, not Google: "mahjong group" about 720 a month, 82% US [22]; and the head term "mahjong" at 5,000,000 a month worldwide, which is dominated by solitaire tile games and says nothing about leagues [23]. League standings volume is unknown and, from the page one mix, likely small.

**Why we could rank.** Page one for the league terms is weak and partly off topic (riichi, sports leagues), so a focused "American mahjong league standings" page with a free single night score sheet could rank. **Why it would not convert.** The organisers who arrive need the whole club on the tool; free apps with standings already exist [4][5], and the searches with intent ("app") are owned by App Store pages. 100 paying organisers from a niche with unknown, likely tiny volume is not a realistic 90 day target.

## Unit economics

Price is not set (priceINR is null). For the arithmetic I assume a season unlock of USD 19 per club (INR 1,791.23), below Mahjic Starter at USD 21.99 a month [7]. Visitors and conversion are assumptions, labelled as such.

| Case | Assumptions | 90 day revenue |
|---|---|---|
| Worst | No payment rail in the window (current state, ap-2 decided "do nothing for now"); a USD rail needs the owner's KYC | INR 0 |
| Likely | Rail opens; 200 organic visitors in 90 days to a new subdomain (assumption); 1% are organisers who buy (assumption): 2 x INR 1,791.23 | INR 3,582 |
| Best | 2,000 visitors (assumption); 2% buy (assumption): 40 x INR 1,791.23 | INR 71,649 |

Costs: hosting on the existing Vercel team, INR 0 extra under the spend cap. Shared standings across a club need a small database, which adds build and maintenance; free tiers may cover it but the cost is unknown until engineering picks one. Card processing fees for USD: unknown until a rail exists.

## Sizing

The sizing agent (Farhan) adds the sizing in cases/mahj-league.sizing.json.

## Risks

- **Free incumbents absorb the gap.** AMR Authority added leagues with standings in v2.5.0 [4]; if PartyPot or AMR Authority also ship Android or web standings, our gap closes. This is already partly true.
- **No buyers:** if a focused page reaches 50 or more organic visits by 2027-02-15 and gets zero paid season unlocks, the idea is wrong.
- **No rail:** if no payment rail exists by 2027-02-15, revenue is INR 0 regardless of the product.
- **Legal:** must stay points only, never money, stakes or settlement (unlike PartyPot and the mahjongg.ai.studio settlement calculator [5][15]), and must never reproduce the NMJL card. Both are manageable but cut features users of competitors expect.

## Options

- **Proceed:** build a web league standings page with a paid season unlock. Low cost, but likely revenue near INR 0 against free incumbents.
- **Pivot:** a free American mahjong league format guide plus standings sheet as a search page only, with no paid tier; this is a traffic experiment, not a business, and fails the mission's revenue test.
- **Stop (do nothing for now):** kill it and spend the pod on an idea with sourced search volume and a paying buyer.

## Scorecard

| Key | Score | Reason |
|---|---|---|
| pain | 2 | Weekly standings is spreadsheet arithmetic; free tools already solve it [4][5][8][13] |
| willingnessToPay | 2 | Players pay for leagues [2][3]; organiser tool spend is unproven beyond Mahjic plans with 44 ratings [7] |
| marketSize | 2 | 750,000 players is a single unsourced estimate [10]; league running organisers are an unknown, likely small subset |
| distribution | 2 | No sourced volume for any league term; intent searches are owned by App Store pages [17][21] |
| competitionGap | 2 | AMR Authority and PartyPot give free league standings [4][5]; only "web, no install" remains |
| speedToRevenue | 1 | No payment rail (ap-2), and USD needs the owner's KYC; 90 day revenue likely INR 0 |
| recurringRevenue | 3 | A season unlock would repeat each season for a club that stays |

Total: 14 of 35. Below the bar of 24, and willingnessToPay and distribution are under 3.

## Recommendation

**no-go.** The demand is real but the tool part of it is already free, the buyers are few and uncounted, and the searches have no sourced volume.

## Sources

1. NHPR, mahjong community, 2026-01-24: https://www.nhpr.org/2026-01-24/how-people-are-finding-community-through-the-tile-game-mahjong
2. Troop Mahjong league, Northborough MA, USD 70 to 115, scored through MahWins: https://happeningnext.com/event/troop-mahjong-summer-soire%C3%A9-league-eid1ef0l1frqhdr
3. Wild & Precious Collective league, USD 30 a week or 100: https://wildpreciousboutique.com/products/mahjong-w-p-league
4. AMR Authority, App Store: https://apps.apple.com/us/app/id6751984429
5. PartyPot club leaderboards: https://partypotapp.com.advisoryapps.com/business/leaderboard/
6. PartyPot FAQ, free on iOS and Android: https://partypotapp.com.advisoryapps.com/faq/how-to-track-mahjong-scores-digitally/
7. Mahjic Mahjong: Club & League, App Store: https://apps.apple.com/app/id6759616151
8. keepthescore pricing: https://keepthescore.com/pricing
9. MahWins, App Store: https://apps.apple.com/us/app/id6761798566
10. Dallas Innovates, AMR Authority launch (750,000 players, AMR+ USD 4.99/mo): https://dallasinnovates.com/fort-worths-amr-authority-launches-first-global-ranking-system-app-for-american-mahjong/
11. NBC New York, mahjong popularity: https://www.nbcnewyork.com/news/local/why-mahjong-rising-popularity-tristate/6532459/
12. Reach Mahjong forum, League Play: https://reachmahjong.com/en/forum/viewtopic.php?p=51905
13. Spreadsheet Daddy free scoreboard template: https://spreadsheetdaddy.com/templates/scoreboard
14. Etsy printable mahjong score card, USD 1.99: https://www.etsy.com/listing/4313636937
15. mahjongg.ai.studio scoring and settlement calculator: https://mahjongg.ai.studio/tools/scoring-calculator/
16. MJWinLog, App Store: https://apps.apple.com/app/id6776526437
17. Page one, "mahjong league app": Mahjic https://apps.apple.com/app/id6759616151 ; Mahjong 4 Friends https://apps.apple.com/app/id1552704332 ; https://mwm.ai/apps/mahjong-track/6763510921 ; https://appgoblin.info/apps/6762097265
18. Page one, "mahjong league standings": https://sandiegomahjong.org/leaderboard/ ; https://reachmahjong.com/en/forum/viewtopic.php?p=51905 ; https://docs.google.com/spreadsheets/d/1F8aIK0EnliSrV3ME_DNtTzfHi488THMx-m5vhO2lPSk/edit
19. Page one, "mahjong league scoring sheet": https://www.etsy.com/listing/4313636937 ; https://www.clubsnz.org.nz/assets/Tournament-Documents/Mah-Jong/2024/Inter-Club/Score-Sheet.pdf ; https://mahjongbritishrules.gumroad.com/l/hqwOb ; https://mahjongg.ai.studio/tools/scoring-calculator/ ; https://mahjong4friends.com/guides/american-mahjong-scoring
20. Page one, "american mahjong league standings tracker app": https://apps.apple.com/us/app/id6761798566 ; https://apps.apple.com/app/id6759616151 ; https://360westmagazine.com/american-mahjong-ranking-system-amr-authority-fort-worth/
21. Page one, "mahjong score tracker free web app american": https://apps.apple.com/app/id6749372126 ; https://apps.apple.com/us/app/id6504602453 ; https://partypotapp.com.advisoryapps.com/faq/how-to-track-mahjong-scores-digitally/
22. RankHero, Etsy keyword "mahjong group": https://www.rankhero.com/keywords/mahjong-group
23. RankHero, Etsy keyword "mahjong": https://www.rankhero.com/keywords/mahjong
