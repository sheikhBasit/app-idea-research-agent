#!/usr/bin/env node

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

const DEFAULT_INPUT = "data/sample-prd-input.json";
const DEFAULT_OUTPUT = "docs/generated/sample-prd.docx";
const crcTable = createCrcTable();

const args = process.argv.slice(2);

if (args.includes("--check")) {
  const input = loadJson(DEFAULT_INPUT);
  validateInput(input);
  console.log("PRD generator check passed.");
  process.exit(0);
}

if (args.includes("--all")) {
  const inputDir = resolve("data/prd-inputs");
  const files = readdirSync(inputDir).filter((file) => file.endsWith(".json"));
  for (const file of files) {
    const input = loadJson(resolve(inputDir, file));
    validateInput(input);
    const slug = basename(file, ".json");
    const output = `docs/generated/${slug}-prd.docx`;
    writeDocx(input, output);
    console.log(`Generated ${output}`);
  }
  process.exit(0);
}

const inputPath = args[0] || DEFAULT_INPUT;
const outputPath = args[1] || DEFAULT_OUTPUT;
const prd = loadJson(inputPath);
validateInput(prd);
writeDocx(prd, outputPath);
console.log(`Generated ${outputPath}`);

function loadJson(path) {
  return JSON.parse(readFileSync(resolve(path), "utf8"));
}

function validateInput(input) {
  const required = ["productName", "oneLiner", "targetUsers", "problem", "solution", "mvpFeatures"];
  const missing = required.filter((key) => input[key] === undefined || input[key] === "");
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
}

function writeDocx(prd, outputPath) {
  const files = {
    "[Content_Types].xml": contentTypesXml(),
    "_rels/.rels": packageRelsXml(),
    "docProps/core.xml": coreXml(prd),
    "docProps/app.xml": appXml(),
    "word/document.xml": documentXml(prd),
    "word/styles.xml": stylesXml()
  };

  const output = resolve(outputPath);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, createZip(files));
}

function documentXml(prd) {
  const body = [];
  body.push(paragraph(prd.productName, "Title"));
  body.push(paragraph(prd.status || "Draft PRD", "Subtitle"));
  body.push(table([
    ["Date", prd.date || new Date().toISOString().slice(0, 10)],
    ["Owner", prd.owner || "App Idea Research Agent"],
    ["Status", prd.status || "Draft"],
    ["One-liner", prd.oneLiner]
  ]));

  section(body, "1. Executive Summary", [
    prd.oneLiner,
    `Target users: ${listInline(prd.targetUsers)}`
  ]);

  section(body, "2. Problem", [prd.problem]);
  section(body, "3. Proposed Solution", [prd.solution]);
  section(body, "4. Market Gap", [prd.marketGap || "To be validated."]);
  section(body, "5. Original Value Proposition", [prd.originalValue || "To be defined."]);
  section(body, "6. Revenue Opportunity", [prd.revenueOpportunity || "To be validated."]);
  section(body, "7. Why Now", [prd.whyNow || "To be validated."]);

  body.push(paragraph("8. Evidence", "Heading1"));
  body.push(tableRows(
    ["Signal", "Finding", "Source"],
    (prd.evidence || []).map((item) => [
      item.signal || "",
      item.finding || "",
      item.source || ""
    ])
  ));

  body.push(paragraph("9. Competitor Map", "Heading1"));
  body.push(tableRows(
    ["Competitor", "Strength", "Weakness", "Opportunity"],
    (prd.competitors || []).map((item) => [
      item.name || "",
      item.strength || "",
      item.weakness || "",
      item.opportunity || ""
    ])
  ));

  listSection(body, "10. Goals", prd.goals);
  listSection(body, "11. Non-Goals", prd.nonGoals);
  listSection(body, "12. MVP Scope", prd.mvpFeatures);
  listSection(body, "13. User Stories", prd.userStories);
  listSection(body, "14. Functional Requirements", prd.functionalRequirements);
  listSection(body, "15. Non-Functional Requirements", prd.nonFunctionalRequirements);
  listSection(body, "16. Monetization", prd.monetization);
  listSection(body, "17. What More Can Be Added", prd.addOns);
  listSection(body, "18. Success Metrics", prd.successMetrics);
  listSection(body, "19. Validation Plan", prd.validationPlan);
  listSection(body, "20. Risks", prd.risks);

  body.push(paragraph("21. Roadmap", "Heading1"));
  for (const phase of prd.roadmap || []) {
    body.push(paragraph(phase.phase || "Phase", "Heading2"));
    for (const item of phase.items || []) body.push(bullet(item));
  }

  listSection(body, "22. Open Questions", prd.openQuestions);
  body.push(sectionProperties());

  return xmlDocument(body.join(""));
}

function section(body, title, lines) {
  body.push(paragraph(title, "Heading1"));
  for (const line of lines.filter(Boolean)) body.push(paragraph(line));
}

function listSection(body, title, items = []) {
  body.push(paragraph(title, "Heading1"));
  if (!items || items.length === 0) {
    body.push(paragraph("None yet."));
    return;
  }
  for (const item of items) body.push(bullet(item));
}

function listInline(items = []) {
  return items.join("; ");
}

function xmlDocument(body) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${body}</w:body>
</w:document>`;
}

function paragraph(text, style) {
  const styleXml = style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : "";
  return `<w:p>${styleXml}<w:r><w:t xml:space="preserve">${escapeXml(text || "")}</w:t></w:r></w:p>`;
}

function bullet(text) {
  return paragraph(`- ${text || ""}`);
}

function table(rows) {
  return tableRows(null, rows);
}

function tableRows(header, rows) {
  const allRows = header ? [header, ...rows] : rows;
  if (allRows.length === 0) return paragraph("No data yet.");
  return `<w:tbl>
    <w:tblPr>
      <w:tblW w:w="0" w:type="auto"/>
      <w:tblBorders>
        <w:top w:val="single" w:sz="4" w:space="0" w:color="BFBFBF"/>
        <w:left w:val="single" w:sz="4" w:space="0" w:color="BFBFBF"/>
        <w:bottom w:val="single" w:sz="4" w:space="0" w:color="BFBFBF"/>
        <w:right w:val="single" w:sz="4" w:space="0" w:color="BFBFBF"/>
        <w:insideH w:val="single" w:sz="4" w:space="0" w:color="BFBFBF"/>
        <w:insideV w:val="single" w:sz="4" w:space="0" w:color="BFBFBF"/>
      </w:tblBorders>
    </w:tblPr>
    ${allRows.map((row, rowIndex) => `<w:tr>${row.map((cell) => tableCell(cell, rowIndex === 0 && Boolean(header))).join("")}</w:tr>`).join("")}
  </w:tbl>`;
}

function tableCell(text, isHeader) {
  const boldStart = isHeader ? "<w:b/>" : "";
  return `<w:tc>
    <w:tcPr><w:tcW w:w="2400" w:type="dxa"/></w:tcPr>
    <w:p><w:r><w:rPr>${boldStart}</w:rPr><w:t xml:space="preserve">${escapeXml(text || "")}</w:t></w:r></w:p>
  </w:tc>`;
}

function sectionProperties() {
  return `<w:sectPr>
    <w:pgSz w:w="12240" w:h="15840"/>
    <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
  </w:sectPr>`;
}

function stylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
    <w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/>
    <w:qFormat/>
    <w:rPr><w:b/><w:sz w:val="40"/><w:szCs w:val="40"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Subtitle">
    <w:name w:val="Subtitle"/>
    <w:qFormat/>
    <w:rPr><w:color w:val="666666"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:rPr><w:b/><w:sz w:val="30"/><w:szCs w:val="30"/></w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:rPr><w:b/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr>
  </w:style>
</w:styles>`;
}

function contentTypesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
}

function packageRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
}

function coreXml(prd) {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>${escapeXml(prd.productName)} PRD</dc:title>
  <dc:creator>${escapeXml(prd.owner || "App Idea Research Agent")}</dc:creator>
  <cp:lastModifiedBy>${escapeXml(prd.owner || "App Idea Research Agent")}</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified>
</cp:coreProperties>`;
}

function appXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>App Idea Research Agent</Application>
</Properties>`;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createZip(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const [name, content] of Object.entries(files)) {
    const nameBuffer = Buffer.from(name);
    const data = Buffer.from(content, "utf8");
    const crc = crc32(data);
    const localHeader = zipLocalHeader(nameBuffer, data.length, crc);
    localParts.push(localHeader, data);
    centralParts.push(zipCentralHeader(nameBuffer, data.length, crc, offset));
    offset += localHeader.length + data.length;
  }

  const centralStart = offset;
  const central = Buffer.concat(centralParts);
  const end = zipEndRecord(Object.keys(files).length, central.length, centralStart);
  return Buffer.concat([...localParts, central, end]);
}

function zipLocalHeader(nameBuffer, size, crc) {
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(0x0800, 6);
  header.writeUInt16LE(0, 8);
  header.writeUInt16LE(0, 10);
  header.writeUInt16LE(0, 12);
  header.writeUInt32LE(crc, 14);
  header.writeUInt32LE(size, 18);
  header.writeUInt32LE(size, 22);
  header.writeUInt16LE(nameBuffer.length, 26);
  header.writeUInt16LE(0, 28);
  return Buffer.concat([header, nameBuffer]);
}

function zipCentralHeader(nameBuffer, size, crc, offset) {
  const header = Buffer.alloc(46);
  header.writeUInt32LE(0x02014b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(20, 6);
  header.writeUInt16LE(0x0800, 8);
  header.writeUInt16LE(0, 10);
  header.writeUInt16LE(0, 12);
  header.writeUInt16LE(0, 14);
  header.writeUInt32LE(crc, 16);
  header.writeUInt32LE(size, 20);
  header.writeUInt32LE(size, 24);
  header.writeUInt16LE(nameBuffer.length, 28);
  header.writeUInt16LE(0, 30);
  header.writeUInt16LE(0, 32);
  header.writeUInt16LE(0, 34);
  header.writeUInt16LE(0, 36);
  header.writeUInt32LE(0, 38);
  header.writeUInt32LE(offset, 42);
  return Buffer.concat([header, nameBuffer]);
}

function zipEndRecord(fileCount, centralSize, centralOffset) {
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(fileCount, 8);
  end.writeUInt16LE(fileCount, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(centralOffset, 16);
  end.writeUInt16LE(0, 20);
  return end;
}

function createCrcTable() {
  return new Uint32Array(256).map((_, index) => {
  let c = index;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
  });
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
