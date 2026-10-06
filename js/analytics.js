// ── AI Analytics, Retrospective & Todos Engine ──────────────────────
function switchRetroDate(selectedDate) {
    document.querySelectorAll(".retro-date-panel").forEach(p => p.style.display = "none");
    const target = document.getElementById("retroPanel-" + selectedDate);
    if (target) {
        target.style.display = "block";
    }
}

const TODO_STORAGE_KEY = "fno_retrospective_todos_state_v1";
const CUSTOM_TODO_KEY = "fno_custom_todos_v1";
let currentStatusFilter = "all";

function getSavedTodoState() {
    try {
        const raw = localStorage.getItem(TODO_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch(e) {
        return {};
    }
}

function saveTodoState(state) {
    try {
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(state));
    } catch(e) {}
}

function getCustomTodos() {
    try {
        const raw = localStorage.getItem(CUSTOM_TODO_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch(e) {
        return [];
    }
}

function toggleTodoStatus(todoId) {
    const state = getSavedTodoState();
    state[todoId] = !state[todoId];
    saveTodoState(state);
    updateTodoItemUI(todoId, state[todoId]);
    updateTodoCounters();
}

function updateTodoItemUI(todoId, isDone) {
    const item = document.getElementById("todo-item-" + todoId);
    const cb = document.getElementById("todo-cb-" + todoId);
    if (!item) return;

    if (isDone) {
        item.classList.add("completed");
        if (cb) cb.checked = true;
    } else {
        item.classList.remove("completed");
        if (cb) cb.checked = false;
    }
}

function updateTodoCounters() {
    const items = document.querySelectorAll(".todo-item");
    let completed = 0;
    items.forEach(it => {
        if (it.classList.contains("completed")) completed++;
    });
    const total = items.length;
    const pending = total - completed;

    const navBadge = document.getElementById("nav-todos-badge");
    if (navBadge) navBadge.textContent = pending;
}

window.initAnalyticsTab = function() {
    // Quant UI hooks
};

window.initRetroTab = function() {
    // Retrospective tab hooks
};

window.initTodosTab = function() {
    // Restore saved todo states
    const state = getSavedTodoState();
    Object.keys(state).forEach(id => {
        if (state[id]) updateTodoItemUI(id, true);
    });
    updateTodoCounters();
};

// ── AI Quant Predictions Client Logic ──
window.QUANT_STOCKS_DATA = {"SILVER":{"sym":"SILVER","comp":"SILVER","spot":"\u20b9226,930.00","basis":0.0,"lot":"30","intra":{"buy":51.0,"sell":37.5,"sig":"NEUTRAL","conf":46.1,"rs":-0.21,"range_pos":69.0,"factors":["Trading above Central Pivot (Rs.226,179.7)"]},"st":{"buy":30.5,"sell":39.0,"sig":"NEUTRAL","conf":27.6,"oi_yest":1.3,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"MODERATE","span":1.6,"flags":["Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":226179.67,"r1":227982.33,"s1":224284.33,"zone":"P-R1"}},"GOLD":{"sym":"GOLD","comp":"GOLD","spot":"\u2014","basis":0.0,"lot":"1","intra":{"buy":27.0,"sell":20.0,"sig":"NEUTRAL","conf":23.3,"rs":-0.58,"range_pos":50.0,"factors":["Consolidating within narrow intraday pivot range","Balanced price-to-OI derivatives structure"]},"st":{"buy":18.5,"sell":31.0,"sig":"NEUTRAL","conf":21.2,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"MODERATE","span":0.0,"flags":["Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":"NA","r1":"NA","s1":"NA","zone":"NA"}},"CRUDEOIL":{"sym":"CRUDEOIL","comp":"CRUDEOIL","spot":"\u20b98,652.00","basis":0.0,"lot":"100","intra":{"buy":71.0,"sell":21.5,"sig":"STRONG BUY","conf":85.6,"rs":-0.78,"range_pos":86.3,"factors":["Trading above Central Pivot (Rs.8,583.7)","Trading near session highs (86% of range)","Short Covering Velocity (Short squeeze bounce)"]},"st":{"buy":43.5,"sell":42.0,"sig":"NEUTRAL","conf":28.4,"oi_yest":2.1,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price base above Floor Pivot","Substantial hurdle-free runway to R2 (+2.7%)"]},"risk":{"level":"MODERATE","span":3.6,"flags":["Moderate range expansion (3.6%)"]},"pivots":{"p":8583.67,"r1":8779.33,"s1":8473.33,"zone":"P-R1"}},"ZINC":{"sym":"ZINC","comp":"ZINC","spot":"\u20b9417.30","basis":0.0,"lot":"5","intra":{"buy":64.0,"sell":28.5,"sig":"BUY","conf":66.0,"rs":0.38,"range_pos":92.7,"factors":["Breakout above Pivot R1 (Rs.416.6)","Trading near session highs (93% of range)"]},"st":{"buy":30.5,"sell":43.0,"sig":"NEUTRAL","conf":31.2,"oi_yest":-7.8,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Exhaustion & heavy multi-day long unwinding","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"LOW","span":1.3,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":414.42,"r1":416.63,"s1":411.13,"zone":"R1-R2"}},"NATURALGAS":{"sym":"NATURALGAS","comp":"NATURALGAS","spot":"\u20b9300.80","basis":0.0,"lot":"1250","intra":{"buy":85.0,"sell":8.5,"sig":"STRONG BUY","conf":93.0,"rs":1.35,"range_pos":75.4,"factors":["Breakout above Pivot R1 (Rs.299.5)","Trading near session highs (75% of range)","Short Covering Velocity (Short squeeze bounce)","Solid Upside Momentum (++1.35%)"]},"st":{"buy":42.5,"sell":36.0,"sig":"NEUTRAL","conf":32.9,"oi_yest":-12.6,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price base above Floor Pivot","Heavy short squeeze unwinding prior bears"]},"risk":{"level":"LOW","span":2.1,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":297.87,"r1":299.53,"s1":293.43,"zone":"R1-R2"}},"COPPER":{"sym":"COPPER","comp":"COPPER","spot":"\u20b91,412.85","basis":0.0,"lot":"2500","intra":{"buy":42.0,"sell":45.5,"sig":"NEUTRAL","conf":30.1,"rs":-0.41,"range_pos":45.3,"factors":["Aggressive Short Buildup (Price \u2193, OI \u2191)","Intra-cycle Short additions (+5,000 contracts)"]},"st":{"buy":30.5,"sell":47.0,"sig":"NEUTRAL","conf":41.9,"oi_yest":0.9,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"MODERATE","span":0.5,"flags":["Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":1412.28,"r1":1414.82,"s1":1407.97,"zone":"P-R1"}},"ALUMINIUM":{"sym":"ALUMINIUM","comp":"ALUMINIUM","spot":"\u20b9341.25","basis":0.0,"lot":"5","intra":{"buy":80.0,"sell":15.0,"sig":"STRONG BUY","conf":86.0,"rs":0.23,"range_pos":82.3,"factors":["Breakout above Pivot R1 (Rs.340.6)","Trading near session highs (82% of range)","Short Covering Velocity (Short squeeze bounce)"]},"st":{"buy":38.5,"sell":31.0,"sig":"NEUTRAL","conf":33.8,"oi_yest":4.8,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price base above Floor Pivot"]},"risk":{"level":"LOW","span":0.9,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":339.67,"r1":340.63,"s1":337.53,"zone":"R1-R2"}},"LEAD":{"sym":"LEAD","comp":"LEAD","spot":"\u20b9193.75","basis":0.0,"lot":"5","intra":{"buy":45.0,"sell":27.0,"sig":"NEUTRAL","conf":50.2,"rs":-0.58,"range_pos":50.0,"factors":["Short Covering Velocity (Short squeeze bounce)"]},"st":{"buy":32.5,"sell":31.0,"sig":"NEUTRAL","conf":21.4,"oi_yest":1.7,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Equilibrium multi-day swing structure","Neutral fundamental valuation range"]},"risk":{"level":"MODERATE","span":0.5,"flags":["Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":193.75,"r1":194.2,"s1":193.3,"zone":"P-R1"}}};

let quantSortDirections = {};

function filterQuantTable() {
    const query = (document.getElementById("quantSearchInput") ? document.getElementById("quantSearchInput").value : "").trim().toLowerCase();
    const sigFilter = document.getElementById("quantSignalFilter") ? document.getElementById("quantSignalFilter").value : "ALL";
    const riskFilter = document.getElementById("quantRiskFilter") ? document.getElementById("quantRiskFilter").value : "ALL";
    
    const tbody = document.getElementById("quantTableBody");
    if (!tbody) return;
    const rows = tbody.querySelectorAll("tr");
    let visibleCount = 0;
    
    rows.forEach(row => {
        const sym = (row.getAttribute("data-symbol") || "").toLowerCase();
        const comp = (row.getAttribute("data-company") || "").toLowerCase();
        const isig = row.getAttribute("data-isig") || "";
        const stsig = row.getAttribute("data-stsig") || "";
        const risk = row.getAttribute("data-risk") || "";
        
        let matchSearch = !query || sym.includes(query) || comp.includes(query);
        
        let matchSig = true;
        if (sigFilter === "BUY_ANY") {
            matchSig = isig.includes("BUY") || stsig.includes("BUY");
        } else if (sigFilter === "SELL_ANY") {
            matchSig = isig.includes("SELL") || stsig.includes("SELL");
        } else if (sigFilter === "STRONG_ONLY") {
            matchSig = isig.includes("STRONG") || stsig.includes("STRONG");
        } else if (sigFilter === "INTRA_BUY") {
            matchSig = isig.includes("BUY");
        } else if (sigFilter === "INTRA_SELL") {
            matchSig = isig.includes("SELL");
        } else if (sigFilter === "ST_BUY") {
            matchSig = stsig.includes("BUY");
        } else if (sigFilter === "ST_SELL") {
            matchSig = stsig.includes("SELL");
        }
        
        let matchRisk = (riskFilter === "ALL") || (risk === riskFilter);
        
        if (matchSearch && matchSig && matchRisk) {
            row.style.display = "";
            visibleCount++;
        } else {
            row.style.display = "none";
        }
    });
    
    const countBadge = document.getElementById("quantVisibleCount");
    if (countBadge) {
        countBadge.innerText = `Showing ${visibleCount} of ${rows.length}`;
    }
}

function setQuantView(mode) {
    document.querySelectorAll(".quant-view-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById("btnView" + mode.charAt(0).toUpperCase() + mode.slice(1));
    if (activeBtn) activeBtn.classList.add("active");
    
    const table = document.getElementById("quantPredTable");
    if (!table) return;
    
    const intraCols = table.querySelectorAll(".col-intra");
    const stCols = table.querySelectorAll(".col-st");
    
    if (mode === "intra") {
        intraCols.forEach(el => el.style.display = "");
        stCols.forEach(el => el.style.display = "none");
    } else if (mode === "st") {
        intraCols.forEach(el => el.style.display = "none");
        stCols.forEach(el => el.style.display = "");
    } else {
        intraCols.forEach(el => el.style.display = "");
        stCols.forEach(el => el.style.display = "");
    }
}

function sortQuantTable(colIdx, isNumeric) {
    const tbody = document.getElementById("quantTableBody");
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    
    const currentDir = quantSortDirections[colIdx] || "asc";
    const newDir = currentDir === "asc" ? "desc" : "asc";
    quantSortDirections[colIdx] = newDir;
    
    rows.sort((a, b) => {
        let aVal = a.cells[colIdx] ? (a.cells[colIdx].getAttribute("data-val") || a.cells[colIdx].innerText) : "";
        let bVal = b.cells[colIdx] ? (b.cells[colIdx].getAttribute("data-val") || b.cells[colIdx].innerText) : "";
        
        if (isNumeric) {
            let aNum = parseFloat(aVal.replace(/[^0-9.-]/g, "")) || 0;
            let bNum = parseFloat(bVal.replace(/[^0-9.-]/g, "")) || 0;
            return newDir === "asc" ? aNum - bNum : bNum - aNum;
        } else {
            return newDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
    });
    
    rows.forEach(row => tbody.appendChild(row));
}

function openQuantModal(symbol) {
    const data = window.QUANT_STOCKS_DATA ? window.QUANT_STOCKS_DATA[symbol] : null;
    if (!data) return;
    
    document.getElementById("modalSymbol").innerText = data.sym;
    document.getElementById("modalSpot").innerText = data.spot;
    document.getElementById("modalCompany").innerText = data.comp + " | Lot: " + data.lot;
    
    const basisBadge = document.getElementById("modalBasisBadge");
    basisBadge.innerText = "Basis: " + (data.basis >= 0 ? "+" : "") + data.basis.toFixed(2) + "%";
    basisBadge.className = "quant-sig-pill " + (data.basis > 0 ? "sig-buy" : (data.basis < 0 ? "sig-sell" : "sig-neutral"));
    
    // Intraday
    document.getElementById("modalIntraBuy").innerText = data.intra.buy.toFixed(1) + " / 100";
    document.getElementById("modalIntraSell").innerText = data.intra.sell.toFixed(1) + " / 100";
    document.getElementById("modalIntraConf").innerText = data.intra.conf.toFixed(0) + "%";
    document.getElementById("modalIntraRS").innerText = (data.intra.rs >= 0 ? "+" : "") + data.intra.rs.toFixed(2) + "% vs NIFTY";
    document.getElementById("modalIntraRange").innerText = data.intra.range_pos.toFixed(0) + "% (0% Low - 100% High)";
    document.getElementById("modalIntraPivots").innerText = "P: ₹" + data.pivots.p + " | S1: ₹" + data.pivots.s1 + " | R1: ₹" + data.pivots.r1;
    
    const intraSigBadge = document.getElementById("modalIntraSignalBadge");
    intraSigBadge.innerText = data.intra.sig;
    intraSigBadge.className = "quant-sig-pill sig-" + data.intra.sig.toLowerCase().replace(" ", "-");
    
    const intraFactorsUl = document.getElementById("modalIntraFactors");
    intraFactorsUl.innerHTML = (data.intra.factors && data.intra.factors.length > 0)
        ? data.intra.factors.map(f => `<li>${f}</li>`).join("")
        : "<li>Balanced intraday metrics</li>";

    // Short-Term
    document.getElementById("modalSTBuy").innerText = data.st.buy.toFixed(1) + " / 100";
    document.getElementById("modalSTSell").innerText = data.st.sell.toFixed(1) + " / 100";
    document.getElementById("modalSTConf").innerText = data.st.conf.toFixed(0) + "%";
    document.getElementById("modalSTOI").innerText = (data.st.oi_yest >= 0 ? "+" : "") + data.st.oi_yest.toFixed(1) + "% DoD";
    document.getElementById("modalSTTech").innerText = data.st.tech + " / 100";
    document.getElementById("modalSTFund").innerText = `Q: ${data.st.q} | G: ${data.st.g} | V: ${data.st.v}`;
    
    const stSigBadge = document.getElementById("modalSTSignalBadge");
    stSigBadge.innerText = data.st.sig;
    stSigBadge.className = "quant-sig-pill sig-" + data.st.sig.toLowerCase().replace(" ", "-");
    
    const stFactorsUl = document.getElementById("modalSTFactors");
    stFactorsUl.innerHTML = (data.st.factors && data.st.factors.length > 0)
        ? data.st.factors.map(f => `<li>${f}</li>`).join("")
        : "<li>Equilibrium multi-day swing metrics</li>";

    // Risk
    const riskBadge = document.getElementById("modalRiskBadge");
    riskBadge.innerText = data.risk.level + " RISK";
    riskBadge.className = "quant-risk-badge risk-" + data.risk.level.toLowerCase();
    document.getElementById("modalRangeSpan").innerText = data.risk.span.toFixed(1) + "% of stock price";
    document.getElementById("modalOptSkew").innerText = "Zone: " + data.pivots.zone;
    
    const riskFlagsUl = document.getElementById("modalRiskFlags");
    riskFlagsUl.innerHTML = (data.risk.flags && data.risk.flags.length > 0)
        ? data.risk.flags.map(f => `<li>${f}</li>`).join("")
        : "<li>Normal parameters</li>";
        
    document.getElementById("quantModalBackdrop").classList.add("active");
}

function closeQuantModal() {
    const modal = document.getElementById("quantModalBackdrop");
    if (modal) modal.classList.remove("active");
}

function closeQuantModalOnBackdrop(e) {
    if (e.target.id === "quantModalBackdrop") {
        closeQuantModal();
    }
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeQuantModal();
});