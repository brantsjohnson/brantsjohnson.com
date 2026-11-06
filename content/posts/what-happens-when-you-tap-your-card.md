---
title: "What Happens When You Tap Your Card?"
summary: "A walk through what has to happen in the background when a payment card is tapped, from networks to processors."
releaseDate: 2026-10-29
written: 2026-10-29
tags: [crew, product, payments]
about: [work/crew]
draft: false
---

Let’s talk about what happens when you tap a debit card, and why building a fintech card program made me care about every company behind that little beep.

There is a little beep at the grocery store that represents a completely unreasonable amount of engineering.

You tap your card. The cashier hands you a receipt. Everyone moves on with their life.

When I was helping build the debit-card program for Willow and Crew, I found myself learning the systems that make those few seconds possible. Now I can't use a card without thinking about the companies involved. Very normal hobby.

## First, someone has to issue the thing

An app called Crew can provide the experience customers see without being the legal issuer of their bank accounts and cards.

Crew's debit card was issued by Bangor Savings Bank, on the Mastercard network. That relationship matters because the issuer is part of the regulated banking system. The fintech develops the product, but it needs partners for the infrastructure and obligations it cannot just conjure into existence.

The network, issuer processor, ledger, fraud controls, manufacturing provider, and fulfillment process all have their own jobs. Sometimes those functions are bundled. Sometimes they are delivered by separate companies. The exact contracts matter.

We explored options including Unit and i2c while building. My January 2023 journal even talks about evaluating i2c as a way to use an existing technology platform and move faster. Researching a vendor is different from proving it was the final processor, so I'll keep that distinction clear.

## The tap

A contactless card communicates with the terminal using NFC, a short-range radio technology. For EMV contactless transactions, the payment application can produce transaction-specific cryptographic data. That is one reason a chip card is different from a static number printed on plastic.

The terminal and merchant's payments infrastructure pass an authorization request toward the issuer. Usually this travels through an acquiring processor, a card network, and an issuer processor.

The issuer side checks whether the transaction should be approved according to account status, available funds, fraud rules, and card program controls. The decision then returns to the merchant.

That's the beep.

The exact route and who operates each piece depend on the program. The general architecture was something I had to understand while coordinating our own card work.

## Approved and settled are different words

This is the part that surprises people.

When the terminal says approved, the merchant has an authorization. The actual exchange and reconciliation of money generally follow through clearing and settlement.

That's why an authorization can be pending, adjusted, reversed, or eventually posted at a different amount. Think hotel deposits, gas stations, restaurant tips. A hold on your account is not automatically the same thing as a final settled charge.

When you're building the customer-facing experience, those distinctions become support questions. Why is my available balance lower? Why is the charge still pending? Why didn't my refund arrive immediately?

Somebody on the product team has to know enough about the payment lifecycle to make those screens and explanations accurate.

## And what about the PIN?

Now add ATM withdrawals and PIN-authorized debit transactions.

A PIN needs to be handled through secure cryptographic processes, typically involving processors, protected key management, and hardware security modules. It's not something an app team should see in plaintext or put in a customer database.

Our job wasn't to invent an encryption standard. We needed to understand who was responsible for PIN creation and management, how the customer would set or reset one, and what the program would support.

I find this part of fintech strangely satisfying. The best product architecture is often knowing which incredibly important thing your company *should not* handle directly.

## The card in your hand is also engineered

Even after you have an issuing relationship and authorization path, you still have to deliver a usable card.

The chip and contactless antenna need to work. The physical card needs to meet network and manufacturing requirements. Customer-specific data needs secure personalization. The card needs to reach the right person and activate correctly.

At Crew I researched those manufacturing options and had physical prototypes made. A few of our ideas, including a premium metal construction, raised interesting questions about contactless antenna compatibility.

A metal card is gorgeous until it can't talk to the terminal.

## The most useful part of learning all this

I wasn't writing cryptographic firmware or running the issuing bank. I was doing product work across specialized partners, commercial constraints, physical design, and the customer journey.

The reason I learned the anatomy of a payment wasn't because I wanted to sound impressive talking about EMV. I needed to understand what could go wrong, what we were paying for, and which partner we needed when something didn't work.

The next time you tap your card and hear that little beep, there are a whole lot of people you can silently thank.
