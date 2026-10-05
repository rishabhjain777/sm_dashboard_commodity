// ── Ultra-Fast In-Memory Commodity Scores Engine ────────
window.ALL_SCORES_DATA = [{"symbol": "ZINC", "company_name": "ZINC", "spot": "408.8500", "signal": "LONG", "raw_score": 66.68, "total_score": 6.7, "percentile_score": 6.7, "q_score": 53.400000000000006, "g_score": 50.0, "v_score": 50.0, "t_score": 90.0, "neo_proxy": null, "oneliner": "Quantitative Signal: LONG | Price: 0.00% | OI: 0.34%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-zinc-price?type=futures"}, {"symbol": "LEAD", "company_name": "LEAD", "spot": "192.2000", "signal": "LONG", "raw_score": 61.85000000000001, "total_score": 6.2, "percentile_score": 6.2, "q_score": 50.0, "g_score": 49.16666666666667, "v_score": 11.0, "t_score": 90.0, "neo_proxy": null, "oneliner": "Quantitative Signal: LONG | Price: -0.05% | OI: 0.0%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-lead-price?type=futures"}, {"symbol": "NATURALGAS", "company_name": "NATURALGAS", "spot": "292.3000", "signal": "UNWIND", "raw_score": 53.89, "total_score": 5.4, "percentile_score": 5.4, "q_score": 45.199999999999996, "g_score": 49.50000000000001, "v_score": 100.0, "t_score": 50.0, "neo_proxy": null, "oneliner": "Quantitative Signal: UNWIND | Price: -0.03% | OI: -0.48%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-naturalgas-price?type=futures"}, {"symbol": "ALUMINIUM", "company_name": "ALUMINIUM", "spot": "334.1000", "signal": "UNWIND", "raw_score": 52.36, "total_score": 5.2, "percentile_score": 5.2, "q_score": 48.8, "g_score": 50.0, "v_score": 76.0, "t_score": 50.0, "neo_proxy": null, "oneliner": "Quantitative Signal: UNWIND | Price: 0.00% | OI: -0.12%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-aluminium-price?type=futures"}, {"symbol": "CRUDEOIL", "company_name": "CRUDEOIL", "spot": "8659.0000", "signal": "UNWIND", "raw_score": 45.099999999999994, "total_score": 4.5, "percentile_score": 4.5, "q_score": 38.0, "g_score": 48.0, "v_score": 31.0, "t_score": 50.0, "neo_proxy": null, "oneliner": "Quantitative Signal: UNWIND | Price: -0.12% | OI: -1.2%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-crudeoil-price?type=futures"}, {"symbol": "GOLD", "company_name": "GOLD", "spot": "147238.0000", "signal": "SHORT", "raw_score": 37.0, "total_score": 3.7, "percentile_score": 3.7, "q_score": 50.0, "g_score": 50.0, "v_score": 80.0, "t_score": 10.0, "neo_proxy": null, "oneliner": "Quantitative Signal: SHORT | Price: 0.00% | OI: 0.0%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-gold-price?type=futures"}, {"symbol": "COPPER", "company_name": "COPPER", "spot": "1401.7000", "signal": "SHORT", "raw_score": 37.42, "total_score": 3.7, "percentile_score": 3.7, "q_score": 50.6, "g_score": 50.0, "v_score": 83.0, "t_score": 10.0, "neo_proxy": null, "oneliner": "Quantitative Signal: SHORT | Price: 0.00% | OI: 0.06%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-copper-price?type=futures"}, {"symbol": "SILVER", "company_name": "SILVER", "spot": "225950.0000", "signal": "SHORT", "raw_score": 34.86, "total_score": 3.5, "percentile_score": 3.5, "q_score": 50.3, "g_score": 50.0, "v_score": 58.0, "t_score": 10.0, "neo_proxy": null, "oneliner": "Quantitative Signal: SHORT | Price: 0.00% | OI: 0.03%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-silver-price?type=futures"}];
const ALL_SCORES_DATA = window.ALL_SCORES_DATA;
let filteredScoresData = ALL_SCORES_DATA.slice();
let scoresCurrentPage = 1;
let scoresPageSize = 50;
let scoresSearchDebounceTimer = null;

function renderScoresPage() {
    const tbody = document.getElementById("scoresTableBody");
    const indicator = document.getElementById("scoresPageIndicator");
    const prevBtn = document.getElementById("scoresPrevBtn");
    const nextBtn = document.getElementById("scoresNextBtn");
    if (!tbody) return;

    const total = filteredScoresData.length;
    if (total === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding:30px; color:#888;">No matching stocks found in NSE universe.</td></tr>';
        if (indicator) indicator.textContent = 'Page 0 of 0 (0 stocks)';
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        return;
    }

    const totalPages = (scoresPageSize === "ALL" || scoresPageSize >= total) ? 1 : Math.ceil(total / scoresPageSize);
    if (scoresCurrentPage > totalPages) scoresCurrentPage = totalPages;
    if (scoresCurrentPage < 1) scoresCurrentPage = 1;

    const startIdx = (scoresPageSize === "ALL") ? 0 : (scoresCurrentPage - 1) * scoresPageSize;
    const endIdx = (scoresPageSize === "ALL") ? total : Math.min(startIdx + scoresPageSize, total);
    const slice = filteredScoresData.slice(startIdx, endIdx);

    let html = "";
    for (let i = 0; i < slice.length; i++) {
        const r = slice[i];
        const sym = r.symbol || "";
        const comp = r.company_name || sym;
        const sig = r.signal || "NA";
        const spot = (r.spot !== null && r.spot !== undefined && r.spot !== "NA") ? r.spot : "—";
        const score = (r.total_score !== null && r.total_score !== undefined) ? Number(r.total_score).toFixed(1) : "—";
        const q = (r.q_score !== null && r.q_score !== undefined) ? Math.round(r.q_score) : "—";
        const g = (r.g_score !== null && r.g_score !== undefined) ? Math.round(r.g_score) : "—";
        const v = (r.v_score !== null && r.v_score !== undefined) ? Math.round(r.v_score) : "—";
        const t = (r.t_score !== null && r.t_score !== undefined) ? Math.round(r.t_score) : "—";
        const oneliner = r.oneliner || "MCX Commodity";
        const mcUrl = r.mc_url || ("https://www.moneycontrol.com/commodity/mcx-" + sym);

        let scoreBadgeClass = "badge-score-na";
        if (r.total_score !== null && r.total_score !== undefined) {
            const sc = Number(r.total_score);
            if (sc >= 7.0) scoreBadgeClass = "badge-score-high";
            else if (sc >= 4.0) scoreBadgeClass = "badge-score-mid";
            else scoreBadgeClass = "badge-score-low";
        }

        function dimClass(val) {
            if (val === "—" || val === null || val === undefined) return "dim-na";
            const num = Number(val);
            if (num >= 70) return "dim-green";
            if (num >= 50) return "dim-blue";
            if (num >= 40) return "dim-amber";
            return "dim-red";
        }

        html += '<tr>' +
            '<td><div style="font-weight:700;">' + sym + '</div><div style="font-size:11px; color:#64748b;">' + comp + '</div></td>' +
            '<td><span class="signal-' + sig + ' sig-pill">' + sig + '</span></td>' +
            '<td style="text-align:right;">' + spot + '</td>' +
            '<td style="text-align:center;"><span class="badge-score ' + scoreBadgeClass + '">' + score + '</span></td>' +
            '<td style="text-align:center;"><span class="dim-badge ' + dimClass(q) + '">' + q + '</span></td>' +
            '<td style="text-align:center;"><span class="dim-badge ' + dimClass(g) + '">' + g + '</span></td>' +
            '<td style="text-align:center;"><span class="dim-badge ' + dimClass(v) + '">' + v + '</span></td>' +
            '<td style="text-align:center;"><span class="dim-badge ' + dimClass(t) + '">' + t + '</span></td>' +
            '<td><a href="' + mcUrl + '" target="_blank" style="color:#2563eb; text-decoration:none; font-weight:600;">' + oneliner + ' &#8599;</a></td>' +
            '</tr>';
    }

    tbody.innerHTML = html;
    if (indicator) {
        indicator.textContent = 'Page ' + scoresCurrentPage + ' of ' + totalPages + ' (' + total + ' stocks)';
    }
    if (prevBtn) prevBtn.disabled = (scoresCurrentPage <= 1);
    if (nextBtn) nextBtn.disabled = (scoresCurrentPage >= totalPages);
}

function changeScoresPage(delta) {
    scoresCurrentPage += delta;
    renderScoresPage();
    const container = document.getElementById("scoresTableContainer");
    if (container) container.scrollTop = 0;
}

function setScoresPageSize(sz) {
    scoresPageSize = (sz === "ALL") ? "ALL" : parseInt(sz, 10);
    scoresCurrentPage = 1;
    renderScoresPage();
}

function onScoresSearchInput(val) {
    clearTimeout(scoresSearchDebounceTimer);
    scoresSearchDebounceTimer = setTimeout(() => {
        applyScoresFilters();
    }, 100);
}

function applyScoresFilters() {
    const searchVal = (document.getElementById("scoresSearchInput")?.value || "").trim().toUpperCase();
    const filterVal = document.getElementById("scoresFilterSelect")?.value || "ALL";
    const sortVal = document.getElementById("scoresSortSelect")?.value || "total_score_desc";

    filteredScoresData = ALL_SCORES_DATA.filter(r => {
        if (searchVal) {
            const sym = (r.symbol || "").toUpperCase();
            const name = (r.company_name || "").toUpperCase();
            if (!sym.includes(searchVal) && !name.includes(searchVal)) return false;
        }

        const score = (r.total_score !== null && r.total_score !== undefined) ? Number(r.total_score) : null;
        const sig = (r.signal || "").toUpperCase();

        if (filterVal === "TOP_DECILE") return score !== null && score >= 7.0;
        if (filterVal === "MID_TIER") return score !== null && score >= 4.0 && score < 7.0;
        if (filterVal === "LOW_TIER") return score !== null && score < 4.0;
        if (filterVal === "BUY_SIGNALS") return sig === "LONG" || sig === "COVER";
        if (filterVal === "SELL_SIGNALS") return sig === "SHORT" || sig === "UNWIND";

        return true;
    });

    filteredScoresData.sort((a, b) => {
        function numOrMin(v) { return (v !== null && v !== undefined) ? Number(v) : -9999; }
        if (sortVal === "total_score_desc") return numOrMin(b.total_score) - numOrMin(a.total_score);
        if (sortVal === "total_score_asc") return numOrMin(a.total_score) - numOrMin(b.total_score);
        if (sortVal === "q_desc") return numOrMin(b.q_score) - numOrMin(a.q_score);
        if (sortVal === "g_desc") return numOrMin(b.g_score) - numOrMin(a.g_score);
        if (sortVal === "v_desc") return numOrMin(b.v_score) - numOrMin(a.v_score);
        if (sortVal === "t_desc") return numOrMin(b.t_score) - numOrMin(a.t_score);
        if (sortVal === "symbol_asc") return (a.symbol || "").localeCompare(b.symbol || "");
        return 0;
    });

    scoresCurrentPage = 1;
    renderScoresPage();
}

window.initQualityTab = function() {
    renderScoresPage();
};

// Initialize immediately if in DOM
if (document.getElementById("scoresTableBody")) {
    renderScoresPage();
}