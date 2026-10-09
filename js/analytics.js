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
window.QUANT_STOCKS_DATA = {"GOLD":{"sym":"GOLD","comp":"GOLD","spot":"\u20b9149,494.00","basis":1.11,"lot":"1","intra":{"buy":57.5,"sell":18.0,"sig":"BUY","conf":69.6,"rs":-0.28,"range_pos":50.0,"factors":["Institutional Long Buildup (Price \u2191, OI \u2191)","Intra-cycle OI accumulation (+23 contracts)","Futures carry premium (+1.11% basis)"]},"st":{"buy":46.5,"sell":26.0,"sig":"NEUTRAL","conf":45.5,"oi_yest":-0.6,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Persistent Long buildup across cycles"]},"risk":{"level":"LOW","span":2.0,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":149494.0,"r1":150988.94,"s1":147999.06,"zone":"P-R1"}},"CRUDEOIL":{"sym":"CRUDEOIL","comp":"CRUDEOIL","spot":"\u20b98,523.00","basis":2.96,"lot":"100","intra":{"buy":53.0,"sell":18.0,"sig":"NEUTRAL","conf":65.5,"rs":-0.28,"range_pos":50.0,"factors":["Institutional Long Buildup (Price \u2191, OI \u2191)","Futures carry premium (+2.96% basis)","Call option premium skew (CE > PE)"]},"st":{"buy":46.5,"sell":26.0,"sig":"NEUTRAL","conf":45.5,"oi_yest":-6.9,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Persistent Long buildup across cycles"]},"risk":{"level":"MODERATE","span":2.0,"flags":["Elevated futures basis dislocation (+2.96%)"]},"pivots":{"p":8523.0,"r1":8608.23,"s1":8437.77,"zone":"P-R1"}},"SILVER":{"sym":"SILVER","comp":"SILVER","spot":"\u20b9236,822.00","basis":-5.26,"lot":"30","intra":{"buy":25.0,"sell":46.0,"sig":"NEUTRAL","conf":45.9,"rs":-0.28,"range_pos":50.0,"factors":["Aggressive Short Buildup (Price \u2193, OI \u2191)","Futures backwardation discount (-5.26% basis)","Put hedging demand skew (PE > CE)"]},"st":{"buy":19.5,"sell":58.0,"sig":"SELL","conf":68.7,"oi_yest":-4.3,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)","Persistent futures backwardation discount (-5.26% basis)"]},"risk":{"level":"MODERATE","span":2.0,"flags":["Elevated futures basis dislocation (-5.26%)"]},"pivots":{"p":236822.0,"r1":239190.22,"s1":234453.78,"zone":"P-R1"}},"ZINC":{"sym":"ZINC","comp":"ZINC","spot":"\u20b9336.20","basis":24.42,"lot":"5","intra":{"buy":35.0,"sell":36.0,"sig":"NEUTRAL","conf":27.9,"rs":-0.28,"range_pos":50.0,"factors":["Aggressive Short Buildup (Price \u2193, OI \u2191)"]},"st":{"buy":29.5,"sell":43.0,"sig":"NEUTRAL","conf":39.1,"oi_yest":-0.3,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"ELEVATED","span":2.0,"flags":["Elevated futures basis dislocation (+24.42%)","Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":336.2,"r1":339.56,"s1":332.84,"zone":"P-R1"}},"NATURALGAS":{"sym":"NATURALGAS","comp":"NATURALGAS","spot":"\u20b9242.70","basis":25.55,"lot":"1250","intra":{"buy":35.0,"sell":43.0,"sig":"NEUTRAL","conf":34.2,"rs":-0.28,"range_pos":50.0,"factors":["Aggressive Short Buildup (Price \u2193, OI \u2191)","Intra-cycle Short additions (+310,000 contracts)"]},"st":{"buy":29.5,"sell":47.0,"sig":"NEUTRAL","conf":42.8,"oi_yest":3.7,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"ELEVATED","span":2.0,"flags":["Elevated futures basis dislocation (+25.55%)","Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":242.7,"r1":245.13,"s1":240.27,"zone":"P-R1"}},"COPPER":{"sym":"COPPER","comp":"COPPER","spot":"\u20b91,218.50","basis":16.5,"lot":"2500","intra":{"buy":35.0,"sell":36.0,"sig":"NEUTRAL","conf":27.9,"rs":-0.28,"range_pos":50.0,"factors":["Aggressive Short Buildup (Price \u2193, OI \u2191)"]},"st":{"buy":29.5,"sell":47.0,"sig":"NEUTRAL","conf":42.8,"oi_yest":1.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"ELEVATED","span":2.0,"flags":["Elevated futures basis dislocation (+16.50%)","Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":1218.5,"r1":1230.68,"s1":1206.32,"zone":"P-R1"}},"MENTHAOIL":{"sym":"MENTHAOIL","comp":"MENTHAOIL","spot":"\u20b91,123.00","basis":15.1,"lot":"360","intra":{"buy":32.5,"sell":38.5,"sig":"NEUTRAL","conf":32.4,"rs":-0.28,"range_pos":50.0,"factors":["Aggressive Short Buildup (Price \u2193, OI \u2191)"]},"st":{"buy":29.5,"sell":43.0,"sig":"NEUTRAL","conf":39.1,"oi_yest":-2.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"ELEVATED","span":2.0,"flags":["Elevated futures basis dislocation (+15.10%)","Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":1123.0,"r1":1134.23,"s1":1111.77,"zone":"P-R1"}},"NICKEL":{"sym":"NICKEL","comp":"NICKEL","spot":"\u20b91,662.10","basis":-8.54,"lot":"250","intra":{"buy":27.5,"sell":43.5,"sig":"NEUTRAL","conf":41.4,"rs":-0.28,"range_pos":50.0,"factors":["Aggressive Short Buildup (Price \u2193, OI \u2191)","Futures backwardation discount (-8.54% basis)"]},"st":{"buy":19.5,"sell":58.0,"sig":"SELL","conf":68.7,"oi_yest":-0.7,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)","Persistent futures backwardation discount (-8.54% basis)"]},"risk":{"level":"MODERATE","span":2.0,"flags":["Elevated futures basis dislocation (-8.54%)"]},"pivots":{"p":1662.1,"r1":1678.72,"s1":1645.48,"zone":"P-R1"}},"ALUMINIUM":{"sym":"ALUMINIUM","comp":"ALUMINIUM","spot":"\u20b9366.00","basis":-8.06,"lot":"5","intra":{"buy":27.5,"sell":43.5,"sig":"NEUTRAL","conf":41.4,"rs":-0.28,"range_pos":50.0,"factors":["Aggressive Short Buildup (Price \u2193, OI \u2191)","Futures backwardation discount (-8.06% basis)"]},"st":{"buy":19.5,"sell":58.0,"sig":"SELL","conf":68.7,"oi_yest":-3.4,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)","Persistent futures backwardation discount (-8.06% basis)"]},"risk":{"level":"MODERATE","span":2.0,"flags":["Elevated futures basis dislocation (-8.06%)"]},"pivots":{"p":366.0,"r1":369.66,"s1":362.34,"zone":"P-R1"}},"LEAD":{"sym":"LEAD","comp":"LEAD","spot":"\u20b9199.15","basis":-2.03,"lot":"5","intra":{"buy":27.5,"sell":43.5,"sig":"NEUTRAL","conf":41.4,"rs":-0.28,"range_pos":50.0,"factors":["Aggressive Short Buildup (Price \u2193, OI \u2191)","Futures backwardation discount (-2.03% basis)"]},"st":{"buy":19.5,"sell":58.0,"sig":"SELL","conf":68.7,"oi_yest":-0.5,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)","Persistent futures backwardation discount (-2.03% basis)"]},"risk":{"level":"MODERATE","span":2.0,"flags":["Elevated futures basis dislocation (-2.03%)"]},"pivots":{"p":199.15,"r1":201.14,"s1":197.16,"zone":"P-R1"}},"CARDAMOM":{"sym":"CARDAMOM","comp":"CARDAMOM","spot":"\u20b93,320.00","basis":0.0,"lot":"100","intra":{"buy":24.0,"sell":65.0,"sig":"SELL","conf":70.9,"rs":-0.52,"range_pos":0.0,"factors":["Breakdown below Pivot S1 (Rs.3,322.0)","Trading right at session lows (0% of range)","Aggressive Short Buildup (Price \u2193, OI \u2191)"]},"st":{"buy":18.5,"sell":60.0,"sig":"SELL","conf":71.3,"oi_yest":-9.1,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price breakdown below Floor Pivot","Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"LOW","span":0.3,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":3326.0,"r1":3332.0,"s1":3322.0,"zone":"S2-S1"}},"RUBBER":{"sym":"RUBBER","comp":"RUBBER","spot":"\u20b9100.00","basis":0.0,"lot":"NA","intra":{"buy":48.0,"sell":23.0,"sig":"NEUTRAL","conf":56.5,"rs":-0.28,"range_pos":50.0,"factors":["Institutional Long Buildup (Price \u2191, OI \u2191)"]},"st":{"buy":41.5,"sell":31.0,"sig":"NEUTRAL","conf":36.5,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Persistent Long buildup across cycles"]},"risk":{"level":"LOW","span":2.0,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":100.0,"r1":101.0,"s1":99.0,"zone":"P-R1"}},"KAPAS":{"sym":"KAPAS","comp":"KAPAS","spot":"\u20b91,662.50","basis":8.27,"lot":"4","intra":{"buy":50.5,"sell":20.5,"sig":"NEUTRAL","conf":61.0,"rs":-0.28,"range_pos":50.0,"factors":["Institutional Long Buildup (Price \u2191, OI \u2191)","Futures carry premium (+8.27% basis)"]},"st":{"buy":46.5,"sell":26.0,"sig":"NEUTRAL","conf":45.5,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Persistent Long buildup across cycles"]},"risk":{"level":"MODERATE","span":2.0,"flags":["Elevated futures basis dislocation (+8.27%)"]},"pivots":{"p":1662.5,"r1":1679.12,"s1":1645.88,"zone":"P-R1"}},"STEELREBAR":{"sym":"STEELREBAR","comp":"STEELREBAR","spot":"\u20b948,330.00","basis":6.46,"lot":"5","intra":{"buy":50.5,"sell":20.5,"sig":"NEUTRAL","conf":61.0,"rs":-0.28,"range_pos":50.0,"factors":["Institutional Long Buildup (Price \u2191, OI \u2191)","Futures carry premium (+6.46% basis)"]},"st":{"buy":46.5,"sell":26.0,"sig":"NEUTRAL","conf":45.5,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Persistent Long buildup across cycles"]},"risk":{"level":"MODERATE","span":2.0,"flags":["Elevated futures basis dislocation (+6.46%)"]},"pivots":{"p":48330.0,"r1":48813.3,"s1":47846.7,"zone":"P-R1"}},"COTTON":{"sym":"COTTON","comp":"COTTON","spot":"\u20b928,500.00","basis":12.28,"lot":"25","intra":{"buy":50.5,"sell":20.5,"sig":"NEUTRAL","conf":61.0,"rs":-0.28,"range_pos":50.0,"factors":["Institutional Long Buildup (Price \u2191, OI \u2191)","Futures carry premium (+12.28% basis)"]},"st":{"buy":46.5,"sell":26.0,"sig":"NEUTRAL","conf":45.5,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Persistent Long buildup across cycles"]},"risk":{"level":"MODERATE","span":2.0,"flags":["Elevated futures basis dislocation (+12.28%)"]},"pivots":{"p":28500.0,"r1":28785.0,"s1":28215.0,"zone":"P-R1"}},"CPO":{"sym":"CPO","comp":"CPO","spot":"\u20b91,337.00","basis":0.0,"lot":"NA","intra":{"buy":48.0,"sell":23.0,"sig":"NEUTRAL","conf":56.5,"rs":-0.28,"range_pos":50.0,"factors":["Institutional Long Buildup (Price \u2191, OI \u2191)"]},"st":{"buy":41.5,"sell":31.0,"sig":"NEUTRAL","conf":36.5,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Persistent Long buildup across cycles"]},"risk":{"level":"LOW","span":2.0,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":1337.0,"r1":1350.37,"s1":1323.63,"zone":"P-R1"}}};

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