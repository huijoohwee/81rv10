#!/usr/bin/env python3
"""Bounded documentation/source/math checks; never a product readiness verdict."""
from pathlib import Path
from decimal import Decimal
import csv
import hashlib
import json
import re
import subprocess
import sys
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parent
errors = []


def require(condition, message):
    if not condition:
        errors.append(message)


def slug(text):
    text = re.sub(r'[`*_]', '', text).lower()
    return re.sub(r'[^\w\- ]', '', text).replace(' ', '-')


documents = ['prd-tad-adr-mvp-gtm.md', 'tad-reuse.md', 'mvp-release.md', 'gtm-venture.md']
files = [p for p in ROOT.iterdir() if p.is_file()]
require(len(files) <= 10, 'More than 10 documentation files including the runtime handbook')
require(sum(p.stat().st_size for p in files) < 250_000, 'Package over byte cap')
for file in files:
    require(file.stat().st_size < 500_000, f'Chunk limit: {file.name}')
    require(len(file.read_text().splitlines()) < 600, f'Line limit: {file.name}')

required = ['title', 'doc_type', 'version', 'revision', 'date', 'lang', 'owner',
            'continuity_id', 'local_rung', 'delivered_rung', 'lane', 'universal_scope',
            'worktree_id', 'agent_id']
for name in documents:
    text = (ROOT / name).read_text()
    match = re.match(r'---\n(.*?)\n---\n', text, re.S)
    require(bool(match), f'Frontmatter missing: {name}')
    if not match:
        continue
    # This package deliberately uses only flat scalar frontmatter.
    values = dict(re.findall(r'^([A-Za-z_]+):\s*"?([^"\n]+)"?$', match[1], re.M))
    for key in required:
        require(key in values, f'Frontmatter key {key}: {name}')
    require(values.get('continuity_id') == 'agentic-drone-dashboard', f'Join ID: {name}')
    for key in ['revision', 'version', 'prd_revision', 'tad_revision', 'adr_revision', 'mvp_revision', 'gtm_revision']:
        require(values.get(key) == '0.2.0', f'Join revision {key}: {name}')
    require(values.get('local_rung') == 'spec-complete', f'Unexpected product rung: {name}')
    require(values.get('delivered_rung') == 'undocumented', f'Unexpected delivered rung: {name}')

links = 0
for file in ROOT.glob('*.md'):
    for target in re.findall(r'\]\(([^)]+)\)', file.read_text()):
        if re.match(r'^[a-z]+:', target):
            continue
        path, _, anchor = unquote(target).partition('#')
        destination = ROOT / path if path else file
        require(destination.is_file(), f'Broken file link: {file.name} -> {target}')
        if destination.is_file() and anchor:
            anchors = {slug(x) for x in re.findall(r'^#{1,6} (.+)$', destination.read_text(), re.M)}
            require(anchor in anchors, f'Broken anchor: {file.name} -> {target}')
        links += 1

main = (ROOT / documents[0]).read_text()
require(set(re.findall(r'\| (C\d\d) \|', main)) == {f'C{i:02}' for i in range(1, 17)}, 'C01–C16 coverage')
require(set(re.findall(r'\| PRD-(\d\d) ', main)) == {f'{i:02}' for i in range(1, 11)}, 'PRD-01–10 stories')
require(set(re.findall(r'VCC-(\d\d):', main)) == {f'{i:02}' for i in range(1, 11)}, 'VCC-01–10 criteria')

grounding = json.loads((ROOT / 'source-grounding.json').read_text())
require(grounding['authority'] is False, 'Source grounding cannot grant authority')
checked = 0
if '--sources' in sys.argv:
    for repo in grounding['repositories']:
        for artifact in repo['artifacts']:
            try:
                data = subprocess.check_output(['git', '-C', repo['root'], 'show',
                                                repo['revision'] + ':' + artifact['path']], stderr=subprocess.PIPE)
                require(hashlib.sha256(data).hexdigest() == artifact['sha256'], f'Source hash: {repo["id"]}/{artifact["path"]}')
                checked += 1
            except subprocess.CalledProcessError:
                require(False, f'Source unavailable: {repo["id"]}/{artifact["path"]}')

rows = list(csv.DictReader((ROOT / 'financial-scenarios.csv').open()))
require(len(rows) == 36, 'Financial row count')
totals = {}
for scenario in ['downside', 'base', 'upside']:
    schedule = [r for r in rows if r['scenario'] == scenario]
    require(len(schedule) == 12, f'Month count: {scenario}')
    prev_cash = prev_ar = prev_equity = prev_econ = Decimal(0)
    recognized = collected = units = Decimal(0)
    first_break_even = None
    for index, row in enumerate(schedule):
        require(row['continuity_id'] == 'agentic-drone-dashboard' and row['revision'] == '0.2.0', 'CSV continuity')
        require(row['basis'] == 'illustrative-unverified', 'CSV must label forecasts')
        month_index = 9 + index
        require(row['period'] == f'{2026 + month_index // 12:04}-{month_index % 12 + 1:02}', 'CSV periods')
        n = lambda key: Decimal(row[key])
        require(n('recognized_revenue') == n('units') * n('price'), 'Revenue formula')
        require(n('bookings') == n('billings') == n('recognized_revenue'), 'Illustrative booking/billing bridge')
        require(n('gross_profit') == n('recognized_revenue') - n('cash_cogs'), 'Gross profit')
        require(n('net_result') == n('gross_profit') - n('cash_opex') - n('income_tax'), 'Net result')
        require(n('opening_cash') == prev_cash, 'Opening cash bridge')
        require(n('ending_cash') == prev_cash + n('operating_cash') + n('investing_cash') + n('financing_cash'), 'Cash flow')
        require(n('receivables') == prev_ar + n('billings') - n('collected_cash'), 'Receivables bridge')
        require(n('assets') == n('ending_cash') + n('receivables'), 'Assets bridge')
        require(n('equity') == prev_equity + n('net_result'), 'Equity bridge')
        require(n('assets') - n('liabilities') - n('equity') == n('balance_check') == 0, 'Balance sheet')
        expected = n('net_result') - n('imputed_fulfilment') - n('imputed_acquisition') - n('imputed_development')
        require(n('economic_result') == expected and n('cumulative_economic_result') == prev_econ + expected, 'Economic cost allocation')
        prev_cash, prev_ar, prev_equity, prev_econ = n('ending_cash'), n('receivables'), n('equity'), n('cumulative_economic_result')
        if first_break_even is None and prev_econ >= 0:
            first_break_even = index + 1
        recognized += n('recognized_revenue'); collected += n('collected_cash'); units += n('units')
    totals[scenario] = {'units': int(units), 'revenue': str(recognized), 'collections': str(collected),
                        'receivables': str(prev_ar), 'economic_result': str(prev_econ), 'economic_break_even_month': first_break_even}

require([totals[s]['units'] for s in totals] == [0, 18, 30], 'Scenario units')
require([totals[s]['revenue'] for s in totals] == ['0', '1782', '4470'], 'Scenario revenue')
require([totals[s]['collections'] for s in totals] == ['0', '1584', '4470'], 'Scenario collections')
require([totals[s]['economic_break_even_month'] for s in totals] == [None, 7, 3], 'Break-even months')
print(json.dumps({'status': 'fail' if errors else 'pass', 'scope': 'bounded documentation/source/math only',
                  'files': len(files), 'bytes': sum(p.stat().st_size for p in files), 'relative_links': links,
                  'source_hashes_checked': checked, 'financial_rows': len(rows), 'scenario_totals': totals,
                  'errors': errors}, indent=2))
sys.exit(bool(errors))
