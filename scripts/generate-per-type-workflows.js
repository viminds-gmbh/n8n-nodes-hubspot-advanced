#!/usr/bin/env node
/**
 * Generate one n8n workflow per object type for association testing.
 * Uses SEARCH instead of CREATE to avoid property guessing.
 *
 * For each fromType with defined associations:
 *   1. Search for one existing "from" object
 *   2. For each available "to" type: search for target → associate → delete target
 *   3. Delete the "from" object
 *
 * Output: one JSON file per fromType in workflows/assoc-tests/
 *
 * Usage: node scripts/generate-per-type-workflows.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const uid = () => crypto.randomUUID();
const CRED = { id: '4dT92t5ZbzCVTCqH', name: 'Test HubSpot Sandbox' };

const CREATABLE_TYPES = new Set([
  'contacts','companies','deals','tickets',
  'calls','emails','meetings','notes','tasks',
  'communications','postal_mail','leads','orders','line_items','quotes',
  'invoices','subscriptions','carts','payments','payment_links',
  'discounts','fees','taxes',
  'appointments','courses','listings','services','projects',
  'feedback_submissions','marketing_events',
]);

const DEFAULT_PROPS = {};

const LABEL_MAP = {
  primary_company:'companies', billing_company:'companies', child_company:'companies',
  parent_company:'companies', primary_contact:'contacts', billing_contact:'contacts',
  primary_deal:'deals', primary_ticket:'tickets', primary_order:'orders',
  primary_lead:'leads', signer_contacts:'contacts', billing_contacts:'contacts',
  billing_companies:'companies', billing_quotes:'quotes', signer_quotes:'quotes',
  quote_templates:'quotes', discount_codes:'discounts', abandoned_carts:'carts',
  upcoming_subscriptions:'subscriptions', payment_schedule_installments:'invoices',
  data_sync_states:'invoices', data_syncs:'projects', conversation_sessions:'projects',
  goal_target_groups:'goals', campaigns:'marketing_events', engagements:'projects',
  commerce_payments:'payments', meeting_events:'meetings', publishing_tasks:'tasks',
  threads:'tickets', conversations:'tickets', deal_splits:'deals', line_items:'line_items',
};

function getActualToType(key) {
  const type = key.split(':')[1];
  return CREATABLE_TYPES.has(type) ? type : (LABEL_MAP[type] || null);
}

function parseAssocFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const map = {};
  const regex = /'([\w_]+):([\w_]+)':\s*(\d+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const fromType = match[1];
    const toType = match[2];
    const key = `${fromType}:${toType}`;
    map[key] = parseInt(match[3], 10);
  }
  return map;
}

function loadAllAssociations() {
  const assocDir = path.join(__dirname, '..', 'src', 'transport', 'associations');
  const files = fs.readdirSync(assocDir).filter(f => f.endsWith('Associations.ts'));
  const grouped = {};
  for (const file of files) {
    const map = parseAssocFile(path.join(assocDir, file));
    for (const [key, typeId] of Object.entries(map)) {
      const fromType = key.split(':')[0];
      if (!grouped[fromType]) grouped[fromType] = {};
      grouped[fromType][key] = typeId;
    }
  }
  return grouped;
}

function buildWorkflowFor(fromType, entries) {
  const nodes = [];
  const connections = {};
  const STEP_X = 300;
  const STEP_Y = 100;
  let x = 0;
  let y = 0;
  let prev = null;

  function add(name, node) {
    node.name = name;
    node.id = uid();
    nodes.push(node);
    return name;
  }

  function connect(from, to, oi = 0, ii = 0) {
    if (!from || !to) return;
    if (!connections[from]) connections[from] = { main: [] };
    if (!connections[from].main[oi]) connections[from].main[oi] = [];
    connections[from].main[oi].push({ node: to, type: 'main', index: ii });
  }

  // Start
  add('Start', {
    type: 'n8n-nodes-base.manualTrigger', typeVersion: 1,
    position: [x, y], parameters: {},
  });
  prev = 'Start';
  x += STEP_X;

  // Search From (limit 1)
  const searchFrom = add(`Search ${fromType}`, {
    type: 'n8n-nodes-hubspot-advanced.hubSpotCrm', typeVersion: 1,
    position: [x, y],
    parameters: {
      operation: 'search',
      ...(fromType !== 'contacts' ? { objectType: fromType } : {}),
      returnAll: false,
      limit: 1,
      filters: {},
    },
    credentials: { hubspotAppToken: CRED },
  });
  connect(prev, searchFrom);
  prev = searchFrom;
  x += STEP_X;

  // Gruppiere entries nach Zieltyp (dedupliziert)
  const toTypeGroups = new Map();
  for (const [key, typeId] of entries) {
    const toType = getActualToType(key);
    if (!toType || toType === fromType || !CREATABLE_TYPES.has(toType)) continue;
    const label = key.split(':')[1];
    if (!toTypeGroups.has(toType)) toTypeGroups.set(toType, []);
    toTypeGroups.get(toType).push({ key, typeId, label });
  }

  // For each valid to-type
  let lastDelete = null;
  for (const [toType, labelEntries] of toTypeGroups) {
    // Search To (limit 1)
    const searchTo = add(`Search ${toType}`, {
      type: 'n8n-nodes-hubspot-advanced.hubSpotCrm', typeVersion: 1,
      position: [x, y],
      parameters: {
        operation: 'search',
        ...(toType !== 'contacts' ? { objectType: toType } : {}),
        returnAll: false,
        limit: 1,
        filters: {},
      },
      credentials: { hubspotAppToken: CRED },
    });
    connect(prev, searchTo);
    prev = searchTo;
    x += STEP_X;

    // Associate — one node per label entry (typeId)
    for (const { key, typeId, label } of labelEntries) {
      const assocLabel = label === toType ? '' : ` (${label})`;
      const assoc = add(`Assoc ${fromType}→${toType}${assocLabel}`, {
        type: 'n8n-nodes-hubspot-advanced.hubSpotAssociations', typeVersion: 1,
        position: [x, y],
        parameters: {
          operation: 'createAssociation',
          fromObjectType: fromType, toObjectType: toType,
          fromObjectId: `={{ $('${searchFrom}').item.json.id }}`,
          toObjectId: `={{ $('${searchTo}').item.json.id }}`,
        },
        credentials: { hubspotAppToken: CRED },
      });
      connect(prev, assoc);
      prev = assoc;
      x += STEP_X;
    }

    // Delete To — only once per toType
    const delTo = add(`Delete ${toType}`, {
      type: 'n8n-nodes-hubspot-advanced.hubSpotCrm', typeVersion: 1,
      position: [x, y],
      parameters: {
        operation: 'delete',
        ...(toType !== 'contacts' ? { objectType: toType } : {}),
        objectId: `={{ $('${searchTo}').item.json.id }}`,
      },
      credentials: { hubspotAppToken: CRED },
    });
    connect(prev, delTo);
    lastDelete = delTo;
    prev = delTo;
    x += STEP_X;
  }

  // Delete From
  const delFrom = add(`Delete ${fromType}`, {
    type: 'n8n-nodes-hubspot-advanced.hubSpotCrm', typeVersion: 1,
    position: [x, y],
    parameters: {
      operation: 'delete',
      ...(fromType !== 'contacts' ? { objectType: fromType } : {}),
      objectId: `={{ $('${searchFrom}').item.json.id }}`,
    },
    credentials: { hubspotAppToken: CRED },
  });
  connect(prev, delFrom);

  return {
    name: `Assoc Test: ${fromType}`,
    id: uid().replace(/-/g, '').slice(0, 16),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: `Test all HUBSPOT_DEFINED associations from ${fromType}`,
    active: false,
    isArchived: false,
    nodes,
    connections,
    settings: { saveManualExecutions: true },
    tags: [],
  };
}

// === MAIN ===
const assocMap = loadAllAssociations();
const outDir = path.join(__dirname, '..', 'workflows', 'assoc-tests');
fs.mkdirSync(outDir, { recursive: true });

const fromTypes = Object.keys(assocMap).filter(t => CREATABLE_TYPES.has(t)).sort();

for (const fromType of fromTypes) {
  const entries = Object.entries(assocMap[fromType])
    .filter(([key]) => {
      const toType = getActualToType(key);
      return toType && toType !== fromType && CREATABLE_TYPES.has(toType);
    });

  if (entries.length === 0) continue;

  const workflow = buildWorkflowFor(fromType, entries);
  const filePath = path.join(outDir, `assoc-test-${fromType}.json`);
  fs.writeFileSync(filePath, JSON.stringify(workflow, null, 2));
  console.log(`✓ ${fromType} → ${entries.length} associations → ${workflow.nodes.length} nodes`);
}

console.log(`\nDone. ${fromTypes.length} workflows in ${outDir}/`);