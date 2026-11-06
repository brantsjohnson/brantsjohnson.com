---
title: "The Integration Work Behind a Banking App"
summary: "I once spent a surprising amount of time looking at a spreadsheet of banks and asking whether we could actually connect to them."
releaseDate: 2026-11-04
written: 2026-11-04
tags: [crew, product, integrations]
about: [work/crew]
draft: false
---

It had columns for account-owner verification, balance checks and account aggregation. Some institutions supported all three. Others had gaps, odd authentication requirements or connections that needed to be reset. We ended up researching 41 institutions across two MX compatibility sheets.

This was part of building Crew, and I loved it.

The customer sees a button that says "Connect your bank." I was looking at the collection of systems that could make that button succeed, fail or behave strangely.

## Linking an account is several different jobs

A startup might need to confirm that someone owns an external account, fetch balances and retrieve transaction data. Those sound similar when they're listed on a product roadmap. They aren't the same capability.

Account-owner verification helps establish who controls or owns the account. Balance data can help decide whether an external transfer is likely to have sufficient funds, though it isn't a guarantee. Aggregation provides transaction and account information used for features such as financial insights.

A provider might support one capability for a bank and not another. Authentication may happen through an OAuth connection, credential-based flow or an institution-specific route. An institution can change its login process or require a user to reauthenticate.

All of that becomes your problem when your interface tells the customer it should work.

We compared the support matrix rather than assuming that a familiar bank name meant full functionality. Navy Federal and USAA, for example, raised different capability questions in our research, while other institutions had reauthorization issues. Those were research observations at the time, not promises about what any institution supports today.

## Then the money has to move

A connected account doesn't automatically mean a transfer is instant.

Ordinary ACH is a batch-based payment system with banking-day settlement schedules. An ACH credit and an ACH debit have different operational risks. If a fintech allows a user to spend incoming money before that debit has settled, somebody has decided to advance availability and take on the possibility of a return.

Think about a Saturday transfer. The app can record your instruction immediately. The actual ACH settlement process doesn't operate like an always-on chat message.

That's why Venmo and other apps may distinguish a standard bank transfer from an instant one. Instant payouts commonly use eligible card push-payment rails or real-time payment infrastructure, with their own pricing and participation requirements. You can't simply mark a transfer "instant" in a user interface and wish the underlying system into it.

We had to think about that timing for a family banking product. A parent might move money into a child's spending balance. A family might move money into a designated savings pocket. A debit-card transaction might arrive while another transfer was still pending.

Every visible balance is an assertion about what money is available, and it had better be a defensible one.

## There are ledgers underneath the design

An internal ledger tracks balances and movements between accounts or categories. It's usually built around balanced accounting entries, with separate treatment for holds, pending transfers and settled transactions.

If you move $25 from a groceries pocket to a school-supplies pocket within the same underlying account, that may only require an internal ledger change. Move $25 to somebody else's bank, and you're involving an external rail.

Those two buttons might look almost identical.

The ledger also needs to agree with what the bank and processors report. Reconciliation is where a lot of apparently tiny integration mistakes become expensive.

I was learning the landscape of banking infrastructure from the ground up. Early on we evaluated providers such as i2c and discussed Unit's pricing and card-program capabilities. The later Crew banking product involved Bangor Savings Bank and Treasury Prime. Different providers occupied different positions in the stack, and the responsibilities mattered more than the marketing descriptions.

The job was to map what each could deliver, what the contract charged for and which handoff made the customer promise possible.

## The other parts everyone forgets

There are ATMs, PIN services, lost-card workflows, issuer authorization rules, card-personalization bureaus, disputes, returns and all the other things customers expect banks to handle.

PIN verification belongs in secure payment infrastructure, generally using encrypted PIN blocks, key management and hardware security modules. A startup product team shouldn't be collecting clear PINs in an ordinary application database. It still needs to build a safe customer flow for creating and resetting them.

ATM access carries its own network arrangements and potential surcharge or reimbursement economics. A "free ATM" promise needs somebody to pay the bill.

I liked having the actual dependency map in front of me. When the customer says a feature doesn't work, the important question is which system is failing and what responsibility we agreed each provider would carry.

The spreadsheet wasn't especially beautiful. But it was the kind of work that makes a banking app possible in the first place.
