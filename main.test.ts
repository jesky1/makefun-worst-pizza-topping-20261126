import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LINE } from "./main.ts";

test("entry is exactly one funny line of under 200 characters", () => {
  assert.equal(LINE.split("\n").length, 1, "must be exactly one line");
  assert.ok(LINE.length >= 1 && LINE.length < 200, `length ${LINE.length} must be 1..199`);
  assert.equal(LINE, LINE.trim(), "no leading/trailing whitespace");
  assert.match(LINE, /pizza/i, "must name a pizza");
  assert.match(LINE, /Gummy Bear/i, "must name the terrible topping");
  assert.match(LINE, /dog toy at a funeral/i, "punchline must land at the end");
  console.log(`LINE (${LINE.length} chars): ${LINE}`);
});

test("program writes the same line to /output/entry.txt", () => {
  const written = readFileSync("/output/entry.txt", "utf8");
  assert.equal(written, LINE, "entry.txt must hold exactly the line, no trailing newline");
  assert.ok(written.length < 200, `entry.txt is ${written.length} chars`);
});

test("line reads as a pitch, not a list or paragraph", () => {
  assert.ok(!LINE.includes("  "), "no double spaces");
  assert.ok(LINE.endsWith("."), "ends with a full stop");
});
