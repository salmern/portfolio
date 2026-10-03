import type { Project } from "@/types";

/*
 * DRAFT case studies for Betastack production systems — pending review.
 * ZainPay details are grounded in the ZainPOS integration (Zainboxes, virtual
 * accounts, signed webhooks, sandbox/production APIs). The Kano State entries
 * describe how these platforms typically work and need confirming.
 */

export const betastackStack = ["TypeScript", "Node.js", "Go", "Python", "Rust", "PostgreSQL", "Redis"];

const betastackTech = [
  { group: "Backend", items: ["TypeScript", "Node.js", "Go", "Rust"] },
  { group: "Data & automation", items: ["Python", "PostgreSQL", "Redis", "scheduled jobs"] },
  { group: "Security", items: ["JWT", "role-based access", "audit trail"] },
  { group: "Infrastructure", items: ["Docker", "AWS", "CI/CD"] },
];

export const productionCases: Project[] = [
  {
    slug: "zainpay",
    index: "02",
    title: "ZainPay",
    tagline: "Payment & multi-settlement infrastructure",
    summary:
      "Fintech infrastructure for businesses: virtual accounts, Zainbox settlement groups, card and online payments, transfers, and webhooks behind one banking API — the rail ZainPOS settles through.",
    role: "Senior Software Engineer",
    year: "2021 — present",
    status: "Production",
    statusTone: "live",
    stack: [...betastackStack, "Docker", "AWS"],
    problem: [
      "Businesses collect money through many channels — bank transfers, cards, POS terminals, online checkout — and each channel arrives through a different bank partner with its own formats and failure modes.",
      "Collected funds rarely belong to one destination. A business needs to group inflows by branch, product, or partner and settle each group to the right accounts on the right schedule.",
      "Integrators such as ZainPOS need a single API, a sandbox that behaves like production, and notifications they can trust before they release value to their own users.",
    ],
    approach: [
      "The Zainbox is the unit of grouping: a business creates Zainboxes, each with its own virtual accounts and settlement configuration, so inflows are attributed the moment they land.",
      "Every inbound payment is matched to its virtual account and Zainbox and recorded in the ledger before anything else happens. Balances are derived from the ledger.",
      "A settlement engine pays out each Zainbox according to its configured destinations and schedule, with Redis-backed queues carrying the work and scheduled jobs reconciling against bank partners.",
      "Integrators get the same API in sandbox and production, API credentials per business, and signed webhooks for deposits and settlements.",
    ],
    architecture: {
      caption:
        "Integrators call one API; payments land on virtual accounts, post to the ledger, and settle out per Zainbox, with webhooks reporting each step.",
      nodes: [
        { id: "clients", title: "Integrators", sub: "API · dashboard · ZainPOS", kind: "entry" },
        { id: "api", title: "Banking API", sub: "API keys · auth · validation", kind: "process" },
        { id: "zainbox", title: "Zainboxes", sub: "virtual accounts · settlement rules", kind: "process" },
        { id: "ledger", title: "Ledger", sub: "PostgreSQL · exact decimals", kind: "store" },
        { id: "settle", title: "Settlement engine", sub: "Redis queues · schedulers", kind: "process" },
        { id: "banks", title: "Bank partners", sub: "transfers · cards · POS", kind: "external" },
        { id: "payouts", title: "Payouts", sub: "to configured accounts", kind: "output" },
        { id: "hooks", title: "Webhooks", sub: "signed · retried", kind: "output" },
      ],
      edges: [
        { from: "clients", to: "api", label: "HTTPS" },
        { from: "api", to: "zainbox", label: "create · fund" },
        { from: "banks", to: "zainbox", label: "inflows" },
        { from: "zainbox", to: "ledger", label: "post" },
        { from: "ledger", to: "settle", label: "balances" },
        { from: "settle", to: "payouts", label: "settle" },
        { from: "settle", to: "hooks", label: "notify" },
      ],
    },
    decisions: [
      {
        title: "Ledger before notification",
        body: "A deposit or settlement is written to the ledger first; webhooks and dashboards read from what was recorded. An integrator is never told about money the ledger doesn't hold.",
      },
      {
        title: "Zainboxes as the settlement boundary",
        body: "Grouping inflows into Zainboxes keeps attribution and settlement rules in one place, so a business can run several revenue streams through one account without mixing them.",
      },
      {
        title: "Sandbox parity",
        body: "Sandbox and production expose the same API surface, so integrators like ZainPOS ship against sandbox and switch base URLs to go live.",
      },
      {
        title: "Signed, retried webhooks",
        body: "Webhook payloads are signed so receivers can verify them, and failed deliveries are retried; integrators can also query transaction status directly to reconcile.",
      },
    ],
    challenges: [
      {
        title: "Reconciling with bank partners",
        body: "Bank statements, settlement reports, and real-time notifications don't always agree on timing or format. Scheduled reconciliation surfaces mismatches for review.",
      },
      {
        title: "Exactness across many destinations",
        body: "Splitting one inflow across several settlement accounts has to sum exactly to the original amount, every time, in every language that touches it.",
      },
    ],
    result: [
      "A production payment platform at zainpay.ng serving businesses and integrators.",
      "ZainPOS creates virtual accounts and Zainboxes through the ZainPay API and settles terminal transactions over it, with settlement reconciliation running as a scheduled worker.",
    ],
    technologies: betastackTech,
    links: [{ label: "zainpay.ng", href: "https://zainpay.ng/" }],
    next: "kano-igr",
  },
  {
    slug: "kano-igr",
    index: "03",
    title: "Kano State IGR",
    tagline: "State revenue collection & reconciliation",
    summary:
      "Internally generated revenue platform for Kano State Government: payer and revenue-head records, assessments and bills, multi-channel collection, and reconciliation for revenue officials.",
    role: "Senior Software Engineer",
    year: "2021 — present",
    status: "Production",
    statusTone: "live",
    stack: [...betastackStack, "Docker", "AWS"],
    problem: [
      "State revenue is collected by many ministries, departments, and agencies (MDAs) through banks, POS terminals, and online payments. Without one system, collections are fragmented and hard to reconcile.",
      "Every naira has to be traceable to a payer, a revenue head, and the MDA that raised it — and officials need that view without waiting for month-end spreadsheets.",
    ],
    approach: [
      "One registry of payers, MDAs, and revenue heads. Assessments and bills are raised against it, each with a unique payment reference.",
      "Payments arrive through several channels; each channel adapter matches its notification to a payment reference and posts it to the revenue ledger.",
      "Scheduled reconciliation jobs compare channel settlement reports against the ledger and route mismatches to an exception queue for review.",
      "Access is scoped by role and MDA, so each agency sees its own collections while state-level officials see the whole picture.",
    ],
    architecture: {
      caption:
        "Bills carry payment references; every channel posts against a reference; reconciliation closes the loop against channel settlement reports.",
      nodes: [
        { id: "users", title: "Payers & MDAs", sub: "portal · back office", kind: "entry" },
        { id: "billing", title: "Assessment & billing", sub: "revenue heads · references", kind: "process" },
        { id: "channels", title: "Collection channels", sub: "banks · POS · online", kind: "external" },
        { id: "adapters", title: "Channel adapters", sub: "notifications · matching", kind: "process" },
        { id: "ledger", title: "Revenue ledger", sub: "PostgreSQL", kind: "store" },
        { id: "recon", title: "Reconciliation", sub: "Python · scheduled · exceptions", kind: "process" },
        { id: "reports", title: "Receipts & reports", sub: "per MDA · state-wide", kind: "output" },
      ],
      edges: [
        { from: "users", to: "billing", label: "assess" },
        { from: "billing", to: "channels", label: "reference" },
        { from: "channels", to: "adapters", label: "notify" },
        { from: "adapters", to: "ledger", label: "post" },
        { from: "ledger", to: "recon", label: "compare" },
        { from: "recon", to: "reports", label: "publish" },
      ],
    },
    decisions: [
      {
        title: "The payment reference is the key",
        body: "Every bill gets a unique reference and every channel must post against one. Unmatched payments are held as exceptions instead of being guessed into an account.",
      },
      {
        title: "Batch reconciliation with an exception queue",
        body: "Channel settlement reports are reconciled on a schedule; anything that doesn't match is surfaced for a human to resolve, with the evidence attached.",
      },
      {
        title: "MDA-scoped access",
        body: "Authorization follows the government's structure: agencies see their own revenue heads and collections, and state-level roles see consolidated views.",
      },
    ],
    challenges: [
      {
        title: "Channel diversity",
        body: "Banks, POS terminals, and online gateways all report payments differently and on different timelines; each needs its own adapter feeding one ledger.",
      },
      {
        title: "Audit expectations",
        body: "Government revenue is audited. Every assessment, payment, and adjustment needs a traceable history.",
      },
    ],
    result: [
      "A production revenue platform for Kano State Government, collecting and reconciling state revenue across payment channels.",
    ],
    technologies: betastackTech,
    next: "kano-blm",
  },
  {
    slug: "kano-blm",
    index: "04",
    title: "Kano State BLM",
    tagline: "Land administration & title workflows",
    summary:
      "Land management system for Kano State Government: parcel and ownership records, application and approval workflows for allocations and titles, and the fees and payments attached to them.",
    role: "Senior Software Engineer",
    year: "2021 — present",
    status: "Production",
    statusTone: "live",
    stack: [...betastackStack, "Docker", "AWS"],
    problem: [
      "Land administration traditionally runs on physical files: approvals are slow, records are hard to search, and the same plot can be at risk of conflicting allocations.",
      "Fees are paid separately from the application they belong to, so confirming payment and progressing an application are disconnected steps.",
    ],
    approach: [
      "A parcel registry gives every plot a unique identifier with its ownership history kept alongside it.",
      "Applications move through an explicit workflow — submission, review, approval, issuance — with each step restricted to the roles allowed to take it.",
      "Fees are billed against the application with a payment reference; a confirmed payment is what advances the workflow to its next stage.",
      "Supporting documents are stored with the application, and every state change is written to an audit trail.",
    ],
    architecture: {
      caption:
        "Applications move through a role-gated workflow; payments unlock progression; the parcel registry and audit trail record every change.",
      nodes: [
        { id: "users", title: "Applicants & staff", sub: "portal · back office", kind: "entry" },
        { id: "workflow", title: "Application workflow", sub: "state machine · approvals", kind: "process" },
        { id: "fees", title: "Fees & payments", sub: "bills · payment references", kind: "process" },
        { id: "channels", title: "Payment channels", sub: "banks · POS · online", kind: "external" },
        { id: "registry", title: "Parcel registry", sub: "plots · ownership history", kind: "store" },
        { id: "docs", title: "Document store", sub: "applications · scans", kind: "store" },
        { id: "out", title: "Approvals & audit trail", sub: "issued documents · history", kind: "output" },
      ],
      edges: [
        { from: "users", to: "workflow", label: "apply" },
        { from: "workflow", to: "fees", label: "bill" },
        { from: "channels", to: "fees", label: "confirm" },
        { from: "workflow", to: "registry", label: "update" },
        { from: "workflow", to: "docs", label: "attach" },
        { from: "workflow", to: "out", label: "issue" },
      ],
    },
    decisions: [
      {
        title: "An explicit state machine",
        body: "Each application has one current state and a fixed set of allowed transitions, so nothing skips review and the current status is always unambiguous.",
      },
      {
        title: "Payment gates progression",
        body: "An application only advances once its fee is confirmed against the payment reference, removing manual receipt checks from the process.",
      },
      {
        title: "Append-only ownership history",
        body: "Ownership changes are added as new records; earlier ones are never overwritten, so the history of a parcel can always be reconstructed.",
      },
    ],
    challenges: [
      {
        title: "Digitizing legacy records",
        body: "Existing land records come from paper files with inconsistent formats; bringing them in without losing provenance takes careful migration.",
      },
      {
        title: "Preventing conflicting allocations",
        body: "Allocation checks and updates on a parcel run in a single database transaction with uniqueness constraints, so two approvals can't claim the same plot.",
      },
    ],
    result: [
      "A production land management system for Kano State Government covering parcel records, application workflows, and fee payments.",
    ],
    technologies: betastackTech,
    next: "kano-water",
  },
  {
    slug: "kano-water",
    index: "05",
    title: "Kano State Water Board",
    tagline: "Water utility billing & collections",
    summary:
      "Water utility systems for the Kano State Water Board: customer accounts and connections, scheduled billing, payment collection across channels, and arrears tracking.",
    role: "Senior Software Engineer",
    year: "2021 — present",
    status: "Production",
    statusTone: "live",
    stack: [...betastackStack, "Docker", "AWS"],
    problem: [
      "A water utility bills a large customer base on a recurring cycle. When accounts and bills are managed by hand, payments are hard to match to customers and arrears go unnoticed.",
      "Customers pay through banks, POS terminals, and online channels, and each payment has to land on the right account.",
    ],
    approach: [
      "A customer and connection registry, organized by zone, gives every customer an account number.",
      "Scheduled billing runs apply the configured tariffs to each account and generate bills, with the account number doubling as the payment reference.",
      "Payments from every channel are matched to accounts and posted to an accounts ledger; balances and arrears are derived from it.",
      "Statements and reminders are generated from the ledger for customers and for collections staff.",
    ],
    architecture: {
      caption:
        "Billing runs generate bills from tariffs; payments match on account number; balances and arrears come from the ledger.",
      nodes: [
        { id: "staff", title: "Customers & staff", sub: "portal · back office", kind: "entry" },
        { id: "registry", title: "Customer registry", sub: "accounts · connections · zones", kind: "store" },
        { id: "billing", title: "Billing engine", sub: "tariffs · scheduled runs", kind: "process" },
        { id: "channels", title: "Payment channels", sub: "banks · POS · online", kind: "external" },
        { id: "matching", title: "Payment matching", sub: "account references", kind: "process" },
        { id: "ledger", title: "Accounts ledger", sub: "bills · payments · arrears", kind: "store" },
        { id: "out", title: "Statements & reminders", sub: "customers · collections", kind: "output" },
      ],
      edges: [
        { from: "staff", to: "registry", label: "manage" },
        { from: "registry", to: "billing", label: "accounts" },
        { from: "billing", to: "ledger", label: "bills" },
        { from: "channels", to: "matching", label: "payments" },
        { from: "matching", to: "ledger", label: "post" },
        { from: "ledger", to: "out", label: "generate" },
      ],
    },
    decisions: [
      {
        title: "Idempotent billing runs",
        body: "A billing run for a period can be re-run safely: it won't create duplicate bills for accounts that were already billed.",
      },
      {
        title: "Account number as payment reference",
        body: "Customers already know their account number, so every channel can attribute a payment to the right account without an extra lookup step.",
      },
      {
        title: "Tariffs as data",
        body: "Rates live in configuration so tariff changes are an update, not a deployment.",
      },
    ],
    challenges: [
      {
        title: "Customer data quality",
        body: "Long-lived utility records carry duplicates and incomplete addresses; cleaning them is part of making billing trustworthy.",
      },
      {
        title: "Partial payments and arrears",
        body: "Customers often pay part of a bill or several bills at once; allocation rules have to be predictable and visible on the statement.",
      },
    ],
    result: [
      "Production utility systems for the Kano State Water Board covering customer accounts, billing, and payment collection.",
    ],
    technologies: betastackTech,
  },
];
