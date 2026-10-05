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
window.QUANT_STOCKS_DATA = {"SILVER":{"sym":"SILVER","comp":"SILVER","spot":"\u20b9228,277.00","basis":0.0,"lot":"30","intra":{"buy":77.5,"sell":15.0,"sig":"STRONG BUY","conf":86.0,"rs":0.81,"range_pos":92.3,"factors":["Breakout above Pivot R1 (Rs.227,717.7)","Trading near session highs (92% of range)","Short Covering Velocity (Short squeeze bounce)"]},"st":{"buy":38.5,"sell":31.0,"sig":"NEUTRAL","conf":33.8,"oi_yest":2867.8,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price base above Floor Pivot"]},"risk":{"level":"LOW","span":1.3,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":226659.33,"r1":227717.67,"s1":224818.67,"zone":"R1-R2"}},"GOLD":{"sym":"GOLD","comp":"GOLD","spot":"\u20b9147,170.00","basis":0.0,"lot":"1","intra":{"buy":34.5,"sell":53.5,"sig":"NEUTRAL","conf":51.1,"rs":-0.72,"range_pos":58.6,"factors":["Breakdown below Pivot S1 (Rs.147,210.0)","Aggressive Short Buildup (Price \u2193, OI \u2191)"]},"st":{"buy":18.5,"sell":60.0,"sig":"SELL","conf":71.3,"oi_yest":-35.5,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price breakdown below Floor Pivot","Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"LOW","span":0.5,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":147356.0,"r1":148012.0,"s1":147210.0,"zone":"S2-S1"}},"CRUDEOIL":{"sym":"CRUDEOIL","comp":"CRUDEOIL","spot":"\u20b98,731.00","basis":0.0,"lot":"100","intra":{"buy":29.5,"sell":64.0,"sig":"SELL","conf":72.0,"rs":-2.32,"range_pos":64.0,"factors":["Breakdown below Pivot S1 (Rs.8,757.0)","Long Unwinding Pressure (Buyer capitulation)","Solid Downside Momentum (-2.32%)","Dragging down despite buoyant market"]},"st":{"buy":23.5,"sell":51.0,"sig":"NEUTRAL","conf":51.8,"oi_yest":9174.8,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price breakdown below Floor Pivot","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"LOW","span":2.1,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":8776.0,"r1":8935.0,"s1":8757.0,"zone":"S2-S1"}},"ZINC":{"sym":"ZINC","comp":"ZINC","spot":"\u20b9411.85","basis":0.0,"lot":"5","intra":{"buy":82.0,"sell":11.5,"sig":"STRONG BUY","conf":86.0,"rs":0.05,"range_pos":81.2,"factors":["Trading above Central Pivot (Rs.410.2)","Trading near session highs (81% of range)","Institutional Long Buildup (Price \u2191, OI \u2191)","Intra-cycle OI accumulation (+30 contracts)"]},"st":{"buy":50.5,"sell":31.0,"sig":"NEUTRAL","conf":51.5,"oi_yest":392.9,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price base above Floor Pivot","Multi-day institutional accumulation (+392.9% DoD OI)"]},"risk":{"level":"LOW","span":1.4,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":410.22,"r1":413.33,"s1":407.48,"zone":"P-R1"}},"NATURALGAS":{"sym":"NATURALGAS","comp":"NATURALGAS","spot":"\u20b9293.60","basis":0.0,"lot":"1250","intra":{"buy":58.5,"sell":32.0,"sig":"BUY","conf":64.8,"rs":1.87,"range_pos":69.4,"factors":["Breakout above Pivot R1 (Rs.291.1)","Solid Upside Momentum (++1.87%)"]},"st":{"buy":30.5,"sell":51.0,"sig":"NEUTRAL","conf":45.5,"oi_yest":115372.1,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Persistent institutional short accumulation (+115372.1% DoD OI)","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"LOW","span":1.2,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":291.1,"r1":291.1,"s1":287.5,"zone":"R1-R2"}},"COPPER":{"sym":"COPPER","comp":"COPPER","spot":"\u20b91,405.80","basis":0.0,"lot":"2500","intra":{"buy":77.5,"sell":15.0,"sig":"STRONG BUY","conf":86.0,"rs":0.19,"range_pos":90.0,"factors":["Breakout above Pivot R1 (Rs.1,404.2)","Trading near session highs (90% of range)","Short Covering Velocity (Short squeeze bounce)"]},"st":{"buy":38.5,"sell":31.0,"sig":"NEUTRAL","conf":33.8,"oi_yest":249509.3,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price base above Floor Pivot"]},"risk":{"level":"LOW","span":0.5,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":1401.87,"r1":1404.23,"s1":1397.23,"zone":"R1-R2"}},"ALUMINIUM":{"sym":"ALUMINIUM","comp":"ALUMINIUM","spot":"\u20b9338.10","basis":0.0,"lot":"5","intra":{"buy":82.0,"sell":14.0,"sig":"STRONG BUY","conf":86.0,"rs":0.2,"range_pos":97.0,"factors":["Trading above Central Pivot (Rs.336.0)","Trading near session highs (97% of range)","Institutional Long Buildup (Price \u2191, OI \u2191)","Intra-cycle OI accumulation (+150 contracts)"]},"st":{"buy":55.5,"sell":31.0,"sig":"BUY","conf":56.0,"oi_yest":447.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price base above Floor Pivot","Multi-day institutional accumulation (+447.0% DoD OI)","Persistent Long buildup across cycles"]},"risk":{"level":"LOW","span":1.5,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":336.02,"r1":338.83,"s1":333.78,"zone":"P-R1"}},"LEAD":{"sym":"LEAD","comp":"LEAD","spot":"\u20b9192.50","basis":0.0,"lot":"5","intra":{"buy":51.0,"sell":38.0,"sig":"NEUTRAL","conf":45.7,"rs":-0.09,"range_pos":86.7,"factors":["Trading above Central Pivot (Rs.192.2)","Trading near session highs (87% of range)"]},"st":{"buy":30.5,"sell":56.0,"sig":"SELL","conf":50.0,"oi_yest":405.8,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Persistent institutional short accumulation (+405.8% DoD OI)","Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"LOW","span":0.4,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":192.22,"r1":192.58,"s1":191.83,"zone":"P-R1"}}};

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