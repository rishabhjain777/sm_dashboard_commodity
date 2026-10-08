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
window.QUANT_STOCKS_DATA = {"GOLD":{"sym":"GOLD","comp":"GOLD","spot":"\u20b9149,494.00","basis":-0.28,"lot":"1","intra":{"buy":35.0,"sell":32.5,"sig":"NEUTRAL","conf":29.2,"rs":0.57,"range_pos":59.2,"factors":["Trading above Central Pivot (Rs.149,302.7)"]},"st":{"buy":25.5,"sell":41.0,"sig":"NEUTRAL","conf":41.0,"oi_yest":13818.3,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)","Persistent futures backwardation discount (-0.28% basis)"]},"risk":{"level":"MODERATE","span":0.7,"flags":["Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":149302.67,"r1":149700.33,"s1":148705.33,"zone":"S1-P"}},"CRUDEOIL":{"sym":"CRUDEOIL","comp":"CRUDEOIL","spot":"\u20b98,523.00","basis":5.57,"lot":"100","intra":{"buy":19.0,"sell":52.0,"sig":"NEUTRAL","conf":63.7,"rs":-0.03,"range_pos":0.0,"factors":["Trading below Central Pivot (Rs.8,741.3)","Trading right at session lows (0% of range)","Aligned with broader market selloff"]},"st":{"buy":28.5,"sell":38.0,"sig":"NEUTRAL","conf":35.5,"oi_yest":30.3,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price breakdown below Floor Pivot","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"ELEVATED","span":4.6,"flags":["Moderate range expansion (4.6%)","Elevated futures basis dislocation (+5.57%)"]},"pivots":{"p":8741.33,"r1":8845.67,"s1":8447.67,"zone":"R1-R2"}},"SILVER":{"sym":"SILVER","comp":"SILVER","spot":"\u20b9236,822.00","basis":-6.98,"lot":"30","intra":{"buy":56.0,"sell":25.0,"sig":"BUY","conf":61.9,"rs":6.24,"range_pos":100.0,"factors":["Breakout above Pivot R1 (Rs.225,469.0)","Trading near session highs (100% of range)","High Upside Momentum (++6.24%)","Defying broader market downturn"]},"st":{"buy":25.5,"sell":46.0,"sig":"NEUTRAL","conf":45.5,"oi_yest":11.9,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)","Persistent futures backwardation discount (-6.98% basis)","Significant downside room to S2 support (-7.9%)"]},"risk":{"level":"ELEVATED","span":2.1,"flags":["Extended above R3: high exhaustion/mean-reversion risk","Elevated futures basis dislocation (-6.98%)"]},"pivots":{"p":222744.0,"r1":225469.0,"s1":220836.0,"zone":"S2-S1"}},"ZINC":{"sym":"ZINC","comp":"ZINC","spot":"\u20b9336.20","basis":23.02,"lot":"5","intra":{"buy":12.0,"sell":65.0,"sig":"SELL","conf":86.0,"rs":-19.57,"range_pos":0.0,"factors":["Breakdown below Pivot S1 (Rs.411.6)","Trading right at session lows (0% of range)","Severe Downside Momentum (-19.57%)","Aligned with broader market selloff"]},"st":{"buy":28.5,"sell":38.0,"sig":"NEUTRAL","conf":35.5,"oi_yest":-4.7,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price breakdown below Floor Pivot","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"HIGH","span":4.2,"flags":["Moderate range expansion (4.2%)","Extended below S3: oversold snapback risk","Elevated futures basis dislocation (+23.02%)"]},"pivots":{"p":420.7,"r1":428.75,"s1":411.55,"zone":"S1-P"}},"NATURALGAS":{"sym":"NATURALGAS","comp":"NATURALGAS","spot":"\u20b9242.70","basis":25.55,"lot":"1250","intra":{"buy":12.0,"sell":65.0,"sig":"SELL","conf":86.0,"rs":-21.37,"range_pos":0.0,"factors":["Breakdown below Pivot S1 (Rs.303.7)","Trading right at session lows (0% of range)","Severe Downside Momentum (-21.37%)","Aligned with broader market selloff"]},"st":{"buy":28.5,"sell":38.0,"sig":"NEUTRAL","conf":35.5,"oi_yest":-10.3,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price breakdown below Floor Pivot","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"HIGH","span":4.5,"flags":["Moderate range expansion (4.5%)","Extended below S3: oversold snapback risk","Elevated futures basis dislocation (+25.55%)"]},"pivots":{"p":311.27,"r1":317.43,"s1":303.73,"zone":"S1-P"}},"COPPER":{"sym":"COPPER","comp":"COPPER","spot":"\u20b91,218.50","basis":15.44,"lot":"2500","intra":{"buy":12.0,"sell":65.0,"sig":"SELL","conf":86.0,"rs":-13.85,"range_pos":0.0,"factors":["Breakdown below Pivot S1 (Rs.1,406.3)","Trading right at session lows (0% of range)","Severe Downside Momentum (-13.85%)","Aligned with broader market selloff"]},"st":{"buy":28.5,"sell":38.0,"sig":"NEUTRAL","conf":35.5,"oi_yest":-3.4,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price breakdown below Floor Pivot","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"ELEVATED","span":1.9,"flags":["Extended below S3: oversold snapback risk","Elevated futures basis dislocation (+15.44%)"]},"pivots":{"p":1419.65,"r1":1432.8,"s1":1406.3,"zone":"S1-P"}},"MENTHAOIL":{"sym":"MENTHAOIL","comp":"MENTHAOIL","spot":"\u20b91,123.00","basis":14.87,"lot":"360","intra":{"buy":9.5,"sell":67.5,"sig":"SELL","conf":86.0,"rs":-14.59,"range_pos":0.0,"factors":["Breakdown below Pivot S1 (Rs.1,298.7)","Trading right at session lows (0% of range)","Severe Downside Momentum (-14.59%)","Aligned with broader market selloff"]},"st":{"buy":28.5,"sell":38.0,"sig":"NEUTRAL","conf":35.5,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Multi-day price breakdown below Floor Pivot","Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"ELEVATED","span":2.3,"flags":["Extended below S3: oversold snapback risk","Elevated futures basis dislocation (+14.87%)"]},"pivots":{"p":1306.87,"r1":1327.73,"s1":1298.73,"zone":"S2-S1"}},"NICKEL":{"sym":"NICKEL","comp":"NICKEL","spot":"\u20b91,662.10","basis":-8.25,"lot":"250","intra":{"buy":58.5,"sell":22.5,"sig":"BUY","conf":66.4,"rs":7.97,"range_pos":100.0,"factors":["Breakout above Pivot R1 (Rs.1,548.9)","Trading near session highs (100% of range)","High Upside Momentum (++7.97%)","Defying broader market downturn"]},"st":{"buy":25.5,"sell":46.0,"sig":"NEUTRAL","conf":45.5,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)","Persistent futures backwardation discount (-8.25% basis)","Significant downside room to S2 support (-8.6%)"]},"risk":{"level":"ELEVATED","span":1.2,"flags":["Extended above R3: high exhaustion/mean-reversion risk","Elevated futures basis dislocation (-8.25%)"]},"pivots":{"p":1536.17,"r1":1548.93,"s1":1531.13,"zone":"S2-S1"}},"ALUMINIUM":{"sym":"ALUMINIUM","comp":"ALUMINIUM","spot":"\u20b9366.00","basis":-8.98,"lot":"5","intra":{"buy":58.5,"sell":22.5,"sig":"BUY","conf":66.4,"rs":8.07,"range_pos":100.0,"factors":["Breakout above Pivot R1 (Rs.342.9)","Trading near session highs (100% of range)","High Upside Momentum (++8.07%)","Defying broader market downturn"]},"st":{"buy":25.5,"sell":46.0,"sig":"NEUTRAL","conf":45.5,"oi_yest":2.2,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)","Persistent futures backwardation discount (-8.98% basis)","Significant downside room to S2 support (-10.0%)"]},"risk":{"level":"ELEVATED","span":2.5,"flags":["Extended above R3: high exhaustion/mean-reversion risk","Elevated futures basis dislocation (-8.98%)"]},"pivots":{"p":337.8,"r1":342.85,"s1":334.6,"zone":"S2-S1"}},"LEAD":{"sym":"LEAD","comp":"LEAD","spot":"\u20b9199.15","basis":-2.08,"lot":"5","intra":{"buy":53.5,"sell":22.5,"sig":"NEUTRAL","conf":61.9,"rs":2.26,"range_pos":100.0,"factors":["Breakout above Pivot R1 (Rs.196.2)","Trading near session highs (100% of range)","Solid Upside Momentum (++2.26%)","Defying broader market downturn"]},"st":{"buy":25.5,"sell":46.0,"sig":"NEUTRAL","conf":45.5,"oi_yest":15.9,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)","Persistent futures backwardation discount (-2.08% basis)","Significant downside room to S2 support (-2.5%)"]},"risk":{"level":"ELEVATED","span":0.7,"flags":["Extended above R3: high exhaustion/mean-reversion risk","Elevated futures basis dislocation (-2.08%)"]},"pivots":{"p":195.53,"r1":196.17,"s1":194.72,"zone":"S1-P"}},"CARDAMOM":{"sym":"CARDAMOM","comp":"CARDAMOM","spot":"\u20b93,370.00","basis":0.0,"lot":"100","intra":{"buy":56.0,"sell":20.0,"sig":"BUY","conf":66.4,"rs":1.75,"range_pos":100.0,"factors":["Breakout above Pivot R1 (Rs.3,361.0)","Trading near session highs (100% of range)","Solid Upside Momentum (++1.75%)","Defying broader market downturn"]},"st":{"buy":30.5,"sell":36.0,"sig":"NEUTRAL","conf":24.9,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)","Significant downside room to S2 support (-3.2%)"]},"risk":{"level":"LOW","span":2.1,"flags":["Normal trading volatility within standard pivot boundaries","Healthy basis and orderly flow"]},"pivots":{"p":3331.0,"r1":3361.0,"s1":3292.0,"zone":"R1-R2"}},"RUBBER":{"sym":"RUBBER","comp":"RUBBER","spot":"\u20b9100.00","basis":0.0,"lot":"NA","intra":{"buy":20.0,"sell":27.0,"sig":"NEUTRAL","conf":23.3,"rs":0.31,"range_pos":50.0,"factors":["Aligned with broader market selloff"]},"st":{"buy":18.5,"sell":31.0,"sig":"NEUTRAL","conf":31.2,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"MODERATE","span":0.0,"flags":["Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":"NA","r1":"NA","s1":"NA","zone":"NA"}},"KAPAS":{"sym":"KAPAS","comp":"KAPAS","spot":"\u20b91,662.50","basis":8.27,"lot":"4","intra":{"buy":22.5,"sell":24.5,"sig":"NEUTRAL","conf":18.8,"rs":0.31,"range_pos":50.0,"factors":["Aligned with broader market selloff"]},"st":{"buy":23.5,"sell":26.0,"sig":"NEUTRAL","conf":22.2,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"ELEVATED","span":0.0,"flags":["Elevated futures basis dislocation (+8.27%)","Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":"NA","r1":"NA","s1":"NA","zone":"NA"}},"STEELREBAR":{"sym":"STEELREBAR","comp":"STEELREBAR","spot":"\u20b948,330.00","basis":2.55,"lot":"5","intra":{"buy":22.5,"sell":24.5,"sig":"NEUTRAL","conf":18.8,"rs":0.31,"range_pos":50.0,"factors":["Aligned with broader market selloff"]},"st":{"buy":23.5,"sell":26.0,"sig":"NEUTRAL","conf":22.2,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"ELEVATED","span":0.0,"flags":["Elevated futures basis dislocation (+2.55%)","Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":"NA","r1":"NA","s1":"NA","zone":"NA"}},"COTTON":{"sym":"COTTON","comp":"COTTON","spot":"\u20b928,500.00","basis":12.28,"lot":"25","intra":{"buy":22.5,"sell":24.5,"sig":"NEUTRAL","conf":18.8,"rs":0.31,"range_pos":50.0,"factors":["Aligned with broader market selloff"]},"st":{"buy":23.5,"sell":26.0,"sig":"NEUTRAL","conf":22.2,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"ELEVATED","span":0.0,"flags":["Elevated futures basis dislocation (+12.28%)","Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":"NA","r1":"NA","s1":"NA","zone":"NA"}},"CPO":{"sym":"CPO","comp":"CPO","spot":"\u20b91,337.00","basis":0.0,"lot":"NA","intra":{"buy":20.0,"sell":27.0,"sig":"NEUTRAL","conf":23.3,"rs":0.31,"range_pos":50.0,"factors":["Aligned with broader market selloff"]},"st":{"buy":18.5,"sell":31.0,"sig":"NEUTRAL","conf":31.2,"oi_yest":0.0,"tech":50.0,"q":0.0,"g":0.0,"v":50.0,"oneliner":"Price Chg: 0%","factors":["Weak balance sheet / fundamental vulnerability (Q: 0)"]},"risk":{"level":"MODERATE","span":0.0,"flags":["Conflicting multi-factor indicators (low confidence)"]},"pivots":{"p":"NA","r1":"NA","s1":"NA","zone":"NA"}}};

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