// ── Ultra-Fast In-Memory Commodity Scores Engine ────────
window.ALL_SCORES_DATA = [{"symbol": "COPPER", "company_name": "COPPER", "spot": "1412.6000", "signal": "UNWIND", "raw_score": 53.72, "total_score": 5.4, "percentile_score": 5.4, "q_score": 46.1, "g_score": 50.0, "v_score": 95.0, "t_score": 50.0, "neo_proxy": null, "oneliner": "Quantitative Signal: UNWIND | Price: 0.00% | OI: -0.39%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-copper-price?type=futures"}, {"symbol": "LEAD", "company_name": "LEAD", "spot": "194.2000", "signal": "UNWIND", "raw_score": 48.900000000000006, "total_score": 4.9, "percentile_score": 4.9, "q_score": 50.0, "g_score": 55.666666666666664, "v_score": 22.0, "t_score": 50.0, "neo_proxy": null, "oneliner": "Quantitative Signal: UNWIND | Price: 0.34% | OI: 0.0%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-lead-price?type=futures"}, {"symbol": "ZINC", "company_name": "ZINC", "spot": "414.2000", "signal": "UNWIND", "raw_score": 47.78, "total_score": 4.8, "percentile_score": 4.8, "q_score": 47.9, "g_score": 50.0, "v_score": 32.0, "t_score": 50.0, "neo_proxy": null, "oneliner": "Quantitative Signal: UNWIND | Price: 0.00% | OI: -0.21%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-zinc-price?type=futures"}, {"symbol": "NATURALGAS", "company_name": "NATURALGAS", "spot": "298.0000", "signal": "COVER", "raw_score": 47.809999999999995, "total_score": 4.8, "percentile_score": 4.8, "q_score": 45.800000000000004, "g_score": 51.16666666666666, "v_score": 33.0, "t_score": 50.0, "neo_proxy": null, "oneliner": "Quantitative Signal: COVER | Price: 0.07% | OI: -0.42%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-naturalgas-price?type=futures"}, {"symbol": "CRUDEOIL", "company_name": "CRUDEOIL", "spot": "8635.0000", "signal": "UNWIND", "raw_score": 45.94, "total_score": 4.6, "percentile_score": 4.6, "q_score": 49.7, "g_score": 50.0, "v_score": 10.0, "t_score": 50.0, "neo_proxy": null, "oneliner": "Quantitative Signal: UNWIND | Price: 0.00% | OI: -0.03%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-crudeoil-price?type=futures"}, {"symbol": "ALUMINIUM", "company_name": "ALUMINIUM", "spot": "340.5500", "signal": "SHORT", "raw_score": 34.74, "total_score": 3.5, "percentile_score": 3.5, "q_score": 66.2, "g_score": 49.0, "v_score": 28.0, "t_score": 10.0, "neo_proxy": null, "oneliner": "Quantitative Signal: SHORT | Price: -0.06% | OI: 1.62%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-aluminium-price?type=futures"}, {"symbol": "SILVER", "company_name": "SILVER", "spot": "224662.0000", "signal": "SHORT", "raw_score": 33.84, "total_score": 3.4, "percentile_score": 3.4, "q_score": 53.2, "g_score": 47.333333333333336, "v_score": 50.0, "t_score": 10.0, "neo_proxy": null, "oneliner": "Quantitative Signal: SHORT | Price: -0.16% | OI: 0.32%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-silver-price?type=futures"}, {"symbol": "GOLD", "company_name": "GOLD", "spot": "NA", "signal": "SHORT", "raw_score": 33.171, "total_score": 3.3, "percentile_score": 3.3, "q_score": 50.0, "g_score": 47.236666666666665, "v_score": 50.0, "t_score": 10.0, "neo_proxy": null, "oneliner": "Quantitative Signal: SHORT | Price: -0.17% | OI: 0.0%", "mc_url": "https://www.moneycontrol.com/commodity/mcx-gold-price?type=futures"}];
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