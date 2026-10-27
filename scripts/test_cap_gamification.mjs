// scripts/test_cap_gamification.mjs
// Rigorous verification test for CAP (國中教育會考) gamification in Quest

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { units as curriculumUnits } from '../dist/curriculum.js';

const rootDir = process.cwd();
const questDir = path.join(rootDir, 'dist', 'quest');
const courseDir = path.join(questDir, 'course');

const bCapPath = path.join(courseDir, 'b-cap.json');
const itemsPath = path.join(courseDir, 'items.json');
const indexPath = path.join(courseDir, 'index.json');
const capBankPath = path.join(rootDir, 'dist', 'cap-bank.json');

const validUnitIds = new Set(curriculumUnits.map(u => u.id));

test('1. CAP Course Structure & 7 Years Verification', () => {
  assert.ok(fs.existsSync(bCapPath), 'b-cap.json must exist');
  const bCap = JSON.parse(fs.readFileSync(bCapPath, 'utf8'));

  assert.equal(bCap.id, 'b-cap');
  const years = [109, 110, 111, 112, 113, 114, 115];
  for (const yr of years) {
    const yid = `cap-yr-${yr}`;
    assert.ok(bCap.units[yid], `b-cap must contain year unit ${yid}`);
    const u = bCap.units[yid];
    assert.ok(u.guide && u.guide.title, `${yid} must have a guide with title`);
    assert.ok(u.nodes, `${yid} must have nodes`);

    // Verify all 5 subjects + boss node
    const expectedNodes = [
      `${yid}:chinese`,
      `${yid}:english`,
      `${yid}:math`,
      `${yid}:science`,
      `${yid}:social`,
      `${yid}:cap`
    ];

    for (const nid of expectedNodes) {
      assert.ok(Array.isArray(u.nodes[nid]), `Node ${nid} must exist with an array of items`);
      assert.ok(u.nodes[nid].length > 0, `Node ${nid} item pool must not be empty`);
    }
  }
});

test('2. CAP Items Bank Completeness & Quality', () => {
  const itemsRaw = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
  const items = itemsRaw.items || itemsRaw;
  const bCap = JSON.parse(fs.readFileSync(bCapPath, 'utf8'));

  let capItemCount = 0;
  for (const [yid, u] of Object.entries(bCap.units)) {
    for (const [nid, pool] of Object.entries(u.nodes)) {
      for (const qId of pool) {
        capItemCount++;
        const it = items[qId];
        assert.ok(it, `Item ${qId} in node ${nid} must exist in items.json`);
        assert.equal(it.isCap, true, `Item ${qId} must have isCap: true`);
        assert.ok(it.prompt && it.prompt.length > 5, `Item ${qId} must have valid prompt`);
        assert.ok(Array.isArray(it.options) && it.options.length >= 2, `Item ${qId} must have >= 2 options`);
        assert.ok(it.answer, `Item ${qId} must have an answer`);
        assert.ok(it.options.includes(it.answer), `Item ${qId} answer must be in options`);

        // Check options are distinct
        const optSet = new Set(it.options);
        assert.equal(optSet.size, it.options.length, `Item ${qId} options must be unique`);

        // Check explanations
        assert.ok(it.why && it.why.length > 5, `Item ${qId} must have structured explanation`);
        assert.ok(it.hint && it.hint.length > 3, `Item ${qId} must have hint`);

        // Check unitId mapping
        assert.ok(validUnitIds.has(it.unitId), `Item ${qId} unitId "${it.unitId}" must map to valid 108 curriculum unit`);
      }
    }
  }

  assert.ok(capItemCount >= 200, `Expected at least 200 cap item references in b-cap, got ${capItemCount}`);
});

test('3. Stimulus Groups & Reading Text Rendering', () => {
  const itemsRaw = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
  const items = itemsRaw.items || itemsRaw;

  // Find questions with readingGroupText
  const groupItems = Object.values(items).filter(it => it.isCap && it.readingGroupText);
  assert.ok(groupItems.length > 0, 'Must have CAP questions with readingGroupText');
  for (const it of groupItems) {
    assert.ok(it.readingGroupText.length > 20, `Question ${it.id} readingGroupText must be substantial`);
  }
});

test('4. Question Crops & Image Links', () => {
  const itemsRaw = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
  const items = itemsRaw.items || itemsRaw;

  const cropItems = Object.values(items).filter(it => it.isCap && it.crops && it.crops.length > 0);
  assert.ok(cropItems.length > 0, 'Must have CAP questions with image crops');

  for (const it of cropItems.slice(0, 30)) {
    for (const crop of it.crops) {
      assert.ok(crop.src, `Crop in ${it.id} must have src`);
      const diskPath = path.join(rootDir, 'dist', crop.src);
      assert.ok(fs.existsSync(diskPath), `Crop file must exist on disk: ${diskPath}`);
    }
  }
});

test('5. Multi-Subject Representation across All 5 Disciplines', () => {
  const bCap = JSON.parse(fs.readFileSync(bCapPath, 'utf8'));
  const itemsRaw = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
  const items = itemsRaw.items || itemsRaw;

  const subjectsFound = new Set();
  for (const u of Object.values(bCap.units)) {
    for (const pool of Object.values(u.nodes)) {
      for (const qId of pool) {
        const it = items[qId];
        if (it && it.subject) {
          subjectsFound.add(it.subject);
        }
      }
    }
  }

  assert.ok(subjectsFound.has('chinese'), 'Must contain Chinese questions');
  assert.ok(subjectsFound.has('english') || subjectsFound.has('listening'), 'Must contain English questions');
  assert.ok(subjectsFound.has('math'), 'Must contain Math questions');
  assert.ok(subjectsFound.has('science'), 'Must contain Science questions');
  assert.ok(subjectsFound.has('social'), 'Must contain Social questions');
});
