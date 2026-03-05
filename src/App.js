// RIT Meal Plan Budget Tracker
import { useState } from "react";

const PLANS = {
  STRIPES: { label: "Stripes", total: 850, weekly: 53.13 },
  CLAWS: { label: "Claws", total: 1350, weekly: 84.38 },
  SPIRIT: { label: "Spirit", total: 2000, weekly: 125.0 },
  TIGER: { label: "Tiger", total: 3525, weekly: 220.31 },
  ORANGE: { label: "Orange", total: 3700, weekly: 231.25 },
  ROAR: { label: "Roar", total: 2500, weekly: 156.25, swipes: "3-4 Swipes/wk" },
  ROAR_PLUS: {
    label: "Roar Plus",
    total: 2300,
    weekly: 143.75,
    swipes: "6-7 Swipes/wk",
  },
};

const SCHEDULE = {
  STRIPES: [
    850, 796.88, 743.75, 690.63, 637.5, 584.38, 531.25, 478.13, 425, 371.88,
    318.75, 265.63, 212.5, 159.38, 106.25, 53.13, 0,
  ],
  CLAWS: [
    1350, 1265.63, 1181.25, 1096.88, 1012.5, 928.13, 843.75, 759.38, 675,
    590.63, 506.25, 421.88, 337.5, 253.13, 168.75, 84.38, 0,
  ],
  SPIRIT: [
    2000, 1875, 1750, 1625, 1500, 1375, 1250, 1125, 1000, 875, 750, 625, 500,
    375, 250, 125, 0,
  ],
  TIGER: [
    3525, 3304.69, 3084.38, 2864.06, 2643.75, 2423.44, 2203.13, 1982.81, 1762.5,
    1542.19, 1321.88, 1101.56, 881.25, 660.94, 440.63, 220.31, 0,
  ],
  ORANGE: [
    3700, 3468.75, 3237.5, 3006.25, 2775, 2543.75, 2312.5, 2081.25, 1850,
    1618.75, 1387.5, 1156.25, 925, 693.75, 462.5, 231.25, 0,
  ],
  ROAR: [
    2500, 2343.75, 2187.5, 2031.25, 1875, 1718.75, 1562.5, 1406.25, 1250,
    1093.75, 937.5, 781.25, 625, 468.75, 312.5, 156.25, 0,
  ],
  ROAR_PLUS: [
    2300, 2156.25, 2012.5, 1868.75, 1725, 1581.25, 1437.5, 1293.75, 1150,
    1006.25, 862.5, 718.75, 575, 431.25, 287.5, 143.75, 0,
  ],
};

export default function App() {
  const [plan, setPlan] = useState("TIGER");
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentBalance, setCurrentBalance] = useState("");
  const [balanceError, setBalanceError] = useState("");

  const planData = PLANS[plan];
  const idealBalance = SCHEDULE[plan][currentWeek];
  const balance = parseFloat(currentBalance) || 0;
  const diff = balance - idealBalance;
  const isOnTrack = Math.abs(diff) < 5;
  const isAhead = !isOnTrack && diff > 0;

  const weeksLeft = 16 - currentWeek;
  const projectedWeekly = weeksLeft > 0 ? balance / weeksLeft : 0;

  const statusColor = isOnTrack ? "#22c55e" : isAhead ? "#3b82f6" : "#ef4444";
  const statusBg = isOnTrack
    ? "#14532d33"
    : isAhead
    ? "#1e3a5f33"
    : "#7f1d1d33";
  const statusText = isOnTrack
    ? "✅ You're on track!"
    : isAhead
    ? `🟦 You're ahead by $${Math.abs(diff).toFixed(
        2
      )} — you can spend a little more`
    : `🔴 You're behind by $${Math.abs(diff).toFixed(2)} — time to cut back`;

  const handlePlanChange = (key) => {
    setPlan(key);
    setCurrentBalance("");
    setBalanceError("");
    setCurrentWeek(1);
  };

  const handleBalanceChange = (e) => {
    const val = e.target.value;
    const num = parseFloat(val);
    if (val !== "" && num > planData.total) {
      setBalanceError(
        `Max balance for ${
          planData.label
        } is $${planData.total.toLocaleString()}`
      );
    } else {
      setBalanceError("");
      setCurrentBalance(val);
    }
  };

  const spentAmount = planData.total - balance;
  const idealSpent = planData.total - idealBalance;
  const spentPct = Math.min(100, (spentAmount / planData.total) * 100);
  const idealSpentPct = Math.min(100, (idealSpent / planData.total) * 100);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1a1a",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "24px 16px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              background: "#F76902",
              color: "white",
              fontWeight: 900,
              fontSize: 28,
              padding: "4px 14px",
              borderRadius: 6,
              letterSpacing: 2,
            }}
          >
            RIT
          </span>
          <span style={{ color: "#F76902", fontWeight: 700, fontSize: 22 }}>
            Dining Dollar Tracker
          </span>
        </div>
        <p style={{ color: "#aaa", margin: 0, fontSize: 14 }}>
          Stay on track with your meal plan spending
        </p>
      </div>

      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          background: "#242424",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          border: "1px solid #333",
        }}
      >
        {/* Plan Selector */}
        <div style={{ marginBottom: 22 }}>
          <label
            style={{
              color: "#ccc",
              fontSize: 13,
              fontWeight: 600,
              display: "block",
              marginBottom: 8,
            }}
          >
            SELECT YOUR MEAL PLAN
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {Object.entries(PLANS).map(([key, p]) => (
              <button
                key={key}
                onClick={() => handlePlanChange(key)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: "2px solid",
                  borderColor: plan === key ? "#F76902" : "#444",
                  background: plan === key ? "#F76902" : "#2e2e2e",
                  color: plan === key ? "white" : "#bbb",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p
            style={{
              color: "#888",
              fontSize: 12,
              marginTop: 8,
              margin: "8px 0 0",
            }}
          >
            Starting balance:{" "}
            <strong style={{ color: "#F76902" }}>
              ${planData.total.toLocaleString()}
            </strong>
            {planData.swipes && (
              <>
                {" "}
                &nbsp;|&nbsp;{" "}
                <strong style={{ color: "#F76902" }}>
                  {planData.swipes}
                </strong>{" "}
                at Gracie's
              </>
            )}
          </p>
        </div>

        {/* Week Dropdown */}
        <div style={{ marginBottom: 22 }}>
          <label
            style={{
              color: "#ccc",
              fontSize: 13,
              fontWeight: 600,
              display: "block",
              marginBottom: 8,
            }}
          >
            CURRENT WEEK
          </label>
          <select
            value={currentWeek}
            onChange={(e) => setCurrentWeek(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "#1a1a1a",
              border: "2px solid #444",
              borderRadius: 10,
              color: "white",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              outline: "none",
            }}
          >
            {Array.from({ length: 16 }, (_, i) => i + 1).map((w) => (
              <option key={w} value={w}>
                Week {w} — Ideal balance: ${SCHEDULE[plan][w].toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {/* Balance Input */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              color: "#ccc",
              fontSize: 13,
              fontWeight: 600,
              display: "block",
              marginBottom: 8,
            }}
          >
            YOUR CURRENT BALANCE
            <span style={{ color: "#555", fontWeight: 400, marginLeft: 8 }}>
              (max: ${planData.total.toLocaleString()})
            </span>
          </label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#F76902",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              $
            </span>
            <input
              type="number"
              min={0}
              max={planData.total}
              step={0.01}
              value={currentBalance}
              onChange={handleBalanceChange}
              placeholder={`0.00 – ${planData.total.toLocaleString()}`}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px 14px 14px 34px",
                background: "#1a1a1a",
                border: `2px solid ${balanceError ? "#ef4444" : "#444"}`,
                borderRadius: 10,
                color: "white",
                fontSize: 22,
                fontWeight: 700,
                outline: "none",
              }}
            />
          </div>
          {balanceError && (
            <p style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}>
              ⚠️ {balanceError}
            </p>
          )}
        </div>

        {currentBalance !== "" && !balanceError && (
          <>
            {/* Status Banner */}
            <div
              style={{
                background: statusBg,
                border: `1px solid ${statusColor}44`,
                borderRadius: 10,
                padding: "12px 16px",
                marginBottom: 20,
                color: statusColor,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {statusText}
            </div>

            {/* Spend Bars */}
            <div
              style={{
                background: "#1a1a1a",
                borderRadius: 12,
                padding: 20,
                marginBottom: 16,
                border: "1px solid #333",
              }}
            >
              <p
                style={{
                  color: "#white",
                  fontSize: 13,
                  fontWeight: 600,
                  margin: "0 0 16px 0",
                  color: "#fff",
                }}
              >
                📊 HOW MUCH HAVE YOU SPENT?
              </p>

              {/* Your spend bar */}
              <div style={{ marginBottom: 18 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: "#fff", fontSize: 13 }}>
                    💳 <strong>You spent</strong>
                  </span>
                  <span style={{ fontSize: 13 }}>
                    <span style={{ color: statusColor, fontWeight: 700 }}>
                      ${spentAmount.toFixed(2)}
                    </span>
                    <span style={{ color: "#aaa" }}>
                      {" "}
                      / ${planData.total.toLocaleString()}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    background: "#2e2e2e",
                    borderRadius: 99,
                    height: 22,
                  }}
                >
                  <div
                    style={{
                      width: `${spentPct}%`,
                      height: "100%",
                      background: statusColor,
                      borderRadius: 99,
                      transition: "width 0.4s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: 8,
                    }}
                  >
                    {spentPct > 15 && (
                      <span
                        style={{
                          color: "white",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {spentPct.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Ideal spend bar */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: "#fff", fontSize: 13 }}>
                    🎯 <strong>Ideal spent by week {currentWeek}</strong>
                  </span>
                  <span style={{ fontSize: 13 }}>
                    <span style={{ color: "#facc15", fontWeight: 700 }}>
                      ${idealSpent.toFixed(2)}
                    </span>
                    <span style={{ color: "#aaa" }}>
                      {" "}
                      / ${planData.total.toLocaleString()}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    background: "#2e2e2e",
                    borderRadius: 99,
                    height: 22,
                  }}
                >
                  <div
                    style={{
                      width: `${idealSpentPct}%`,
                      height: "100%",
                      background: "#facc15",
                      borderRadius: 99,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: 8,
                    }}
                  >
                    {idealSpentPct > 15 && (
                      <span
                        style={{
                          color: "#1a1a1a",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {idealSpentPct.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p
                style={{
                  color: "#aaa",
                  fontSize: 11,
                  margin: "12px 0 0",
                  textAlign: "center",
                }}
              >
                Your bar should be <em>close to</em> the yellow ideal bar 🎯
              </p>
            </div>

            {/* Stats Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {[
                {
                  label: "Recommended Weekly Spend",
                  value: `$${planData.weekly.toFixed(2)}`,
                  sub: "to finish at $0",
                  highlight: false,
                },
                {
                  label: "Your Adjusted Weekly",
                  value: `$${projectedWeekly.toFixed(2)}`,
                  sub: `over ${weeksLeft} week${
                    weeksLeft !== 1 ? "s" : ""
                  } left`,
                  highlight: Math.abs(projectedWeekly - planData.weekly) > 10,
                },
                {
                  label: "Difference from Ideal",
                  value: `${diff >= 0 ? "+" : ""}$${diff.toFixed(2)}`,
                  sub:
                    diff >= 0
                      ? "more than you should have"
                      : "less than you should have",
                  highlight: diff < -5,
                },
                {
                  label: "Weeks Remaining",
                  value: `${weeksLeft}`,
                  sub: "weeks left in semester",
                  highlight: false,
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#1a1a1a",
                    borderRadius: 10,
                    padding: "14px",
                    border: s.highlight
                      ? "1px solid #ef444466"
                      : "1px solid #333",
                  }}
                >
                  <div style={{ color: "#ccc", fontSize: 11, marginBottom: 4 }}>
                    {s.label}
                  </div>
                  <div
                    style={{
                      color: s.highlight ? "#ef4444" : "#F76902",
                      fontWeight: 700,
                      fontSize: 20,
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ color: "#aaa", fontSize: 11 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {currentBalance === "" && (
          <div
            style={{
              textAlign: "center",
              color: "#aaa",
              fontSize: 14,
              padding: "20px 0",
            }}
          >
            👆 Enter your current balance to see your spending status
          </div>
        )}
      </div>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: 12,
          marginTop: 20,
        }}
      >
        Visit <span style={{ color: "#F76902" }}>tigerspend.rit.edu</span> to
        check your balance &nbsp;|&nbsp;{" "}
        <span style={{ color: "#F76902" }}>rit.edu/dining</span> for menus &
        hours
      </p>
    </div>
  );
}
