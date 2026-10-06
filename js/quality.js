// ── Ultra-Fast In-Memory Commodity Scores Engine ────────
window.ALL_SCORES_DATA = [{"symbol": "COPPER", "company_name": "COPPER", "spot": "1414.8000", "signal": "LONG", "raw_score": 69.47, "total_score": 6.9, "percentile_score": 6.9, "q_score": 53.099999999999994, "g_score": 51.5, "v_score": 74.0, "t_score": 90.0, "neo_proxy": null, "oneliner": "Quantitative Signal: LONG | Price: 0.09% | OI: 0.31%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-copper-price?type=futures"}, {"symbol": "ZINC", "company_name": "ZINC", "spot": "414.5500", "signal": "LONG", "raw_score": 66.9, "total_score": 6.7, "percentile_score": 6.7, "q_score": 55.00000000000001, "g_score": 51.33333333333333, "v_score": 45.0, "t_score": 90.0, "neo_proxy": null, "oneliner": "Quantitative Signal: LONG | Price: 0.08% | OI: 0.5%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-zinc-price?type=futures"}, {"symbol": "ALUMINIUM", "company_name": "ALUMINIUM", "spot": "340.8500", "signal": "LONG", "raw_score": 66.85000000000001, "total_score": 6.7, "percentile_score": 6.7, "q_score": 50.0, "g_score": 49.833333333333336, "v_score": 59.0, "t_score": 90.0, "neo_proxy": null, "oneliner": "Quantitative Signal: LONG | Price: -0.01% | OI: 0.0%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-aluminium-price?type=futures"}, {"symbol": "SILVER", "company_name": "SILVER", "spot": "226308.0000", "signal": "LONG", "raw_score": 65.22, "total_score": 6.5, "percentile_score": 6.5, "q_score": 50.1, "g_score": 50.0, "v_score": 42.0, "t_score": 90.0, "neo_proxy": null, "oneliner": "Quantitative Signal: LONG | Price: 0.00% | OI: 0.01%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-silver-price?type=futures"}, {"symbol": "CRUDEOIL", "company_name": "CRUDEOIL", "spot": "8544.0000", "signal": "UNWIND", "raw_score": 50.16, "total_score": 5.0, "percentile_score": 5.0, "q_score": 36.8, "g_score": 50.0, "v_score": 78.0, "t_score": 50.0, "neo_proxy": null, "oneliner": "Quantitative Signal: UNWIND | Price: 0.00% | OI: -1.32%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-crudeoil-price?type=futures"}, {"symbol": "NATURALGAS", "company_name": "NATURALGAS", "spot": "298.2000", "signal": "UNWIND", "raw_score": 48.95, "total_score": 4.9, "percentile_score": 4.9, "q_score": 48.0, "g_score": 49.50000000000001, "v_score": 45.0, "t_score": 50.0, "neo_proxy": null, "oneliner": "Quantitative Signal: UNWIND | Price: -0.03% | OI: -0.2%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-naturalgas-price?type=futures"}, {"symbol": "GOLD", "company_name": "GOLD", "spot": "NA", "signal": "SHORT", "raw_score": 34.9325, "total_score": 3.5, "percentile_score": 3.5, "q_score": 50.0, "g_score": 53.108333333333334, "v_score": 50.0, "t_score": 10.0, "neo_proxy": null, "oneliner": "Quantitative Signal: SHORT | Price: 0.19% | OI: 0.0%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-gold-price?type=futures"}, {"symbol": "LEAD", "company_name": "LEAD", "spot": "193.5000", "signal": "SHORT", "raw_score": 31.560000000000002, "total_score": 3.2, "percentile_score": 3.2, "q_score": 53.800000000000004, "g_score": 50.0, "v_score": 18.0, "t_score": 10.0, "neo_proxy": null, "oneliner": "Quantitative Signal: SHORT | Price: 0.00% | OI: 0.38%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-lead-price?type=futures"}];
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