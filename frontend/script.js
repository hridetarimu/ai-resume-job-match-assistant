
/* ==========================================
   AI Resume Job Match Assistant
   Frontend JavaScript
========================================== */

const analyzeButton = document.getElementById("analyzeBtn");
const themeToggle = document.getElementById("themeToggle");
const downloadButton = document.getElementById("downloadReportBtn");

let scoreChart = null;
let latestReportData = null;

/* ==========================================
   Analyze Resume
========================================== */

if (analyzeButton) {
    analyzeButton.addEventListener("click", async () => {
        const file = document.getElementById("resumeFile")?.files[0];
        const jobText = document.getElementById("jobText")?.value || "";

        if (!file || !jobText.trim()) {
            alert("Please upload a resume and enter a job description.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("job_text", jobText);

        analyzeButton.disabled = true;
        analyzeButton.textContent = "Analyzing...";

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/match",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!response.ok) {
                const details = await response.text();
                throw new Error(
                    `Backend error ${response.status}: ${details}`
                );
            }

            const data = await response.json();
            console.log("Analysis response:", data);

            latestReportData = {
                ...data,
                resumeFilename: file.name,
                generatedAt: new Date().toLocaleString()
            };

            displayResults(data);

            if (downloadButton) {
                downloadButton.disabled = false;
            }

        } catch (error) {
            console.error("Resume analysis failed:", error);
            alert("Analysis failed: " + error.message);
        } finally {
            analyzeButton.disabled = false;
            analyzeButton.textContent = "Analyze Resume";
        }
    });
}

/* ==========================================
   Display Results
========================================== */

function displayResults(data) {
    const overall = Number(data.overall_score ?? 0);
    const skill = Number(data.skill_match ?? 0);
    const semantic = Number(data.semantic_match ?? 0);

    const results = document.getElementById("results");
    if (!results) {
        throw new Error("Missing HTML element: results");
    }

    results.classList.remove("hidden");

    setText("overallScore", `${overall.toFixed(2)}%`);
    setText("skillMatch", `${skill.toFixed(2)}%`);
    setText("semanticMatch", `${semantic.toFixed(2)}%`);

    setProgress("overallBar", overall);
    setProgress("skillBar", skill);
    setProgress("semanticBar", semantic);

    fillList("matchedSkills", data.matched_skills);
    fillList("missingSkills", data.missing_skills);
    fillList("suggestions", data.suggestions);

    drawChart(overall);

    results.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    } else {
        console.warn("Missing HTML element:", id);
    }
}

function setProgress(id, score) {
    const element = document.getElementById(id);
    if (element) {
        element.style.width =
            `${Math.max(0, Math.min(score, 100))}%`;
    } else {
        console.warn("Missing progress bar:", id);
    }
}

/* ==========================================
   Populate Lists
========================================== */

function fillList(id, items) {
    const list = document.getElementById(id);

    if (!list) {
        console.warn("Missing list:", id);
        return;
    }

    list.innerHTML = "";

    if (!Array.isArray(items) || items.length === 0) {
        const li = document.createElement("li");
        li.textContent = "None";
        list.appendChild(li);
        return;
    }

    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = String(item);
        list.appendChild(li);
    });
}

/* ==========================================
   Score Chart
========================================== */

function drawChart(score) {
    const canvas = document.getElementById("scoreChart");

    if (!canvas) {
        console.warn("Score chart canvas not found.");
        return;
    }

    if (typeof Chart === "undefined") {
        console.warn("Chart.js library is not loaded.");
        return;
    }

    if (scoreChart) {
        scoreChart.destroy();
    }

    const safeScore = Math.max(
        0,
        Math.min(Number(score) || 0, 100)
    );

    let chartColor = "#ef4444";

    if (safeScore >= 80) {
        chartColor = "#22c55e";
    } else if (safeScore >= 60) {
        chartColor = "#eab308";
    } else if (safeScore >= 40) {
        chartColor = "#f97316";
    }

    scoreChart = new Chart(canvas, {
        type: "doughnut",
        data: {
            datasets: [{
                data: [safeScore, 100 - safeScore],
                backgroundColor: [chartColor, "#e5e7eb"],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutout: "75%",
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });
}

/* ==========================================
   Dark Mode
========================================== */

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        themeToggle.textContent = isDark
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
    });
}

/* ==========================================
   Download PDF Report
========================================== */

if (downloadButton) {
    downloadButton.addEventListener("click", () => {
        console.log("PDF download button clicked.");

        if (!latestReportData) {
            alert("Please analyze a resume before downloading.");
            return;
        }

        if (!window.jspdf || !window.jspdf.jsPDF) {
            alert(
                "PDF library is not loaded. Check the jsPDF script in index.html."
            );
            console.error("jsPDF is unavailable.");
            return;
        }

        try {
            createPdfReport(latestReportData);
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("PDF generation failed: " + error.message);
        }
    });
}

/* ==========================================
   PDF Generation
========================================== */

function createPdfReport(data) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 18;
    const contentWidth = pageWidth - 2 * margin;

    let y = 20;

    function ensureSpace(height = 12) {
        if (y + height > pageHeight - 18) {
            pdf.addPage();
            y = 20;
        }
    }

    function addHeading(text) {
        ensureSpace(18);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(37, 99, 235);

        pdf.text(text, margin, y);
        y += 10;

        pdf.setTextColor(31, 41, 55);
    }

    function addParagraph(text, indent = 0) {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);

        const lines = pdf.splitTextToSize(
            String(text),
            contentWidth - indent
        );

        for (const line of lines) {
            ensureSpace(6);
            pdf.text(line, margin + indent, y);
            y += 5.5;
        }

        y += 3;
    }

    function addList(items) {
        if (!Array.isArray(items) || items.length === 0) {
            addParagraph("None");
            return;
        }

        items.forEach(item => {
            addParagraph("- " + String(item), 3);
        });
    }

    // Header
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(19);
    pdf.setTextColor(37, 99, 235);

    pdf.text(
        "AI Resume Job Match Report",
        pageWidth / 2,
        y,
        { align: "center" }
    );

    y += 12;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(75, 85, 99);

    addParagraph("Generated: " + data.generatedAt);
    addParagraph("Resume: " + data.resumeFilename);

    y += 5;

    // Score summary
    addHeading("Score Summary");

    addParagraph(
        "Overall Match: " +
        Number(data.overall_score ?? 0).toFixed(2) + "%"
    );

    addParagraph(
        "Skill Match: " +
        Number(data.skill_match ?? 0).toFixed(2) + "%"
    );

    addParagraph(
        "Semantic Match: " +
        Number(data.semantic_match ?? 0).toFixed(2) + "%"
    );

    y += 5;

    // Skills
    addHeading("Matched Skills");
    addList(data.matched_skills);

    addHeading("Missing Skills");
    addList(data.missing_skills);

    // Suggestions
    addHeading("Resume Improvement Suggestions");
    addList(data.suggestions);

    y += 5;

    addHeading("Important Note");

    addParagraph(
        "These scores estimate resume-to-job alignment. " +
        "They are not results from a specific employer's " +
        "Applicant Tracking System and do not guarantee " +
        "interview or hiring outcomes."
    );

    // Page numbers
    const totalPages = pdf.internal.getNumberOfPages();

    for (let page = 1; page <= totalPages; page++) {
        pdf.setPage(page);
        pdf.setFontSize(9);
        pdf.setTextColor(120, 120, 120);

        pdf.text(
            `Page ${page} of ${totalPages}`,
            pageWidth - margin,
            pageHeight - 10,
            { align: "right" }
        );
    }

    // Download
    pdf.save("ATS_Resume_Match_Report.pdf");

    console.log("PDF download requested successfully.");
}
