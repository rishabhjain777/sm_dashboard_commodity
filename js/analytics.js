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
window.QUANT_STOCKS_DATA = {"SILVER":{"sym":"SILVER","comp":"SILVER","spot":"\u20b9220,964.00","basis":0.0,"lot":"30","intra":{"buy":48.0,"sell":50.5,"sig":"NEUTRAL","conf":36.2,"rs":-1.83,"range_pos":20.4,"factors":["Trading below Central Pivot (Rs.222,744.0)","Trading right at session lows (20% of range)","Solid Downside Momentum (-1.83%)","Dragging down despite buoyant market"]},"st":{"buy":43.5,"sell":43.0,"sig":"NEUTRAL","conf":27.4,"oi_yest":11.8,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day institutional accumulation (+11.8% DoD OI)","Substantial hurdle-free runway to R2 (+2.9%)"]},"risk":{"level":"MODERATE","span":2.1,"flags":["Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":222744.0,"r1":225469.0,"s1":220836.0,"zone":"S1-P"}},"GOLD":{"sym":"GOLD","comp":"GOLD","spot":"\u2014","basis":0.0,"lot":"1","intra":{"buy":27.0,"sell":20.0,"sig":"NEUTRAL","conf":23.3,"rs":-0.67,"range_pos":50.0,"factors":["Consolidating within narrow intraday pivot range","Balanced price-to-OI derivatives structure"]},"st":{"buy":18.5,"sell":31.0,"sig":"NEUTRAL","conf":21.2,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"MODERATE","span":0.0,"flags":["Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":"NA","r1":"NA","s1":"NA","zone":"NA"}},"CRUDEOIL":{"sym":"CRUDEOIL","comp":"CRUDEOIL","spot":"\u20b98,944.00","basis":0.0,"lot":"100","intra":{"buy":71.5,"sell":27.0,"sig":"STRONG BUY","conf":81.1,"rs":3.91,"range_pos":83.0,"factors":["Breakout above Pivot R1 (Rs.8,827.0)","Trading near session highs (83% of range)","High Upside Momentum (++3.91%)"]},"st":{"buy":30.5,"sell":44.0,"sig":"NEUTRAL","conf":32.1,"oi_yest":19.1,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)","Significant downside room to S2 support (-6.5%)"]},"risk":{"level":"MODERATE","span":4.3,"flags":["Moderate range expansion (4.3%)"]},"pivots":{"p":8732.0,"r1":8827.0,"s1":8457.0,"zone":"R1-R2"}},"ZINC":{"sym":"ZINC","comp":"ZINC","spot":"\u20b9417.70","basis":0.0,"lot":"5","intra":{"buy":20.5,"sell":73.0,"sig":"STRONG SELL","conf":79.0,"rs":-1.12,"range_pos":4.7,"factors":["Trading below Central Pivot (Rs.422.2)","Trading right at session lows (5% of range)","Aggressive Short Buildup (Price \u2193, OI \u2191)","Intra-cycle Short additions (+255 contracts)"]},"st":{"buy":23.5,"sell":64.0,"sig":"SELL","conf":70.5,"oi_yest":0.1,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price breakdown below Floor Pivot","Continuous Short buildup across cycles","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"MODERATE","span":3.1,"flags":["Moderate range expansion (3.1%)"]},"pivots":{"p":422.18,"r1":427.27,"s1":414.52,"zone":"S1-P"}},"NATURALGAS":{"sym":"NATURALGAS","comp":"NATURALGAS","spot":"\u20b9317.60","basis":0.0,"lot":"1250","intra":{"buy":82.5,"sell":11.0,"sig":"STRONG BUY","conf":93.0,"rs":1.81,"range_pos":93.2,"factors":["Breakout above Pivot R1 (Rs.314.6)","Trading near session highs (93% of range)","Short Covering Velocity (Short squeeze bounce)","Solid Upside Momentum (++1.81%)"]},"st":{"buy":42.5,"sell":36.0,"sig":"NEUTRAL","conf":32.9,"oi_yest":-15.8,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price base above Floor Pivot","Heavy short squeeze unwinding prior bears"]},"risk":{"level":"LOW","span":1.9,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":313.33,"r1":314.57,"s1":308.67,"zone":"R1-R2"}},"COPPER":{"sym":"COPPER","comp":"COPPER","spot":"\u20b91,420.40","basis":0.0,"lot":"2500","intra":{"buy":52.0,"sell":40.0,"sig":"NEUTRAL","conf":44.8,"rs":-0.6,"range_pos":30.0,"factors":["Institutional Long Buildup (Price \u2191, OI \u2191)","Intra-cycle OI accumulation (+22,500 contracts)"]},"st":{"buy":45.5,"sell":43.0,"sig":"NEUTRAL","conf":29.2,"oi_yest":1.5,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Persistent Long buildup across cycles"]},"risk":{"level":"MODERATE","span":1.3,"flags":["Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":1422.48,"r1":1429.97,"s1":1411.97,"zone":"S1-P"}},"ALUMINIUM":{"sym":"ALUMINIUM","comp":"ALUMINIUM","spot":"\u20b9336.40","basis":0.0,"lot":"5","intra":{"buy":40.0,"sell":60.0,"sig":"SELL","conf":52.0,"rs":-1.63,"range_pos":14.8,"factors":["Breakdown below Pivot S1 (Rs.336.5)","Trading right at session lows (15% of range)","Solid Downside Momentum (-1.63%)","Dragging down despite buoyant market"]},"st":{"buy":26.5,"sell":43.0,"sig":"NEUTRAL","conf":41.9,"oi_yest":-1.1,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price breakdown below Floor Pivot","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"LOW","span":1.6,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":338.75,"r1":341.9,"s1":336.5,"zone":"S2-S1"}},"LEAD":{"sym":"LEAD","comp":"LEAD","spot":"\u20b9195.55","basis":0.0,"lot":"5","intra":{"buy":46.0,"sell":43.0,"sig":"NEUTRAL","conf":36.7,"rs":-0.57,"range_pos":44.8,"factors":["Trading above Central Pivot (Rs.195.5)"]},"st":{"buy":30.5,"sell":39.0,"sig":"NEUTRAL","conf":27.6,"oi_yest":19.7,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"MODERATE","span":0.7,"flags":["Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":195.53,"r1":196.17,"s1":194.72,"zone":"P-R1"}}};

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