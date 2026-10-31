const analyzeButton = document.getElementById("analyzeBtn");
const themeToggle = document.getElementById("themeToggle");
const downloadButton = document.getElementById("downloadReportBtn");

let scoreChart = null;
let latestReportData = null;


/* ==========================================
   Analyze Resume
========================================== */

analyzeButton.addEventListener("click", async () => {
    const file = document.getElementById("resumeFile").files[0];
    const jobText = document.getElementById("jobText").value;

    if (!file || !jobText.trim()) {
        alert("Please upload a resume and paste a job description.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_text", jobText);

    analyzeButton.textContent = "Analyzing...";
    analyzeButton.disabled = true;

    try {
        const response = await fetch("http://127.0.0.1:8000/match", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("The backend could not analyze the resume.");
        }

        const data = await response.json();

        latestReportData = {
            ...data,
            resumeFilename: file.name,
            generatedAt: new Date().toLocaleString()
        };

        displayResults(data);

    } catch (error) {
        console.error(error);
        alert(
            "Error analyzing resume. Please confirm that the FastAPI server is running."
        );
    } finally {
        analyzeButton.textContent = "Analyze Resume";
        analyzeButton.disabled = false;
    }
});


/* ==========================================
   Display Results
========================================== */

function displayResults(data) {
    const overall = Number(data.overall_score || 0);
    const skill = Number(data.skill_match || 0);
    const semantic = Number(data.semantic_match || 0);

    document.getElementById("results").classList.remove("hidden");

    document.getElementById("overallScore").textContent =
        `${overall.toFixed(2)}%`;

    document.getElementById("skillMatch").textContent =
        `${skill.toFixed(2)}%`;

    document.getElementById("semanticMatch").textContent =
        `${semantic.toFixed(2)}%`;

    document.getElementById("overallBar").style.width =
        `${Math.min(overall, 100)}%`;

    document.getElementById("skillBar").style.width =
        `${Math.min(skill, 100)}%`;

    document.getElementById("semanticBar").style.width =
        `${Math.min(semantic, 100)}%`;

    fillList("matchedSkills", data.matched_skills);
    fillList("missingSkills", data.missing_skills);
    fillList("suggestions", data.suggestions);

    drawChart(overall);

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
}


/* ==========================================
   Populate Lists
========================================== */

function fillList(id, items) {
    const list = document.getElementById(id);
    list.innerHTML = "";

    if (!Array.isArray(items) || items.length === 0) {
        const item = document.createElement("li");
        item.textContent = "None";
        list.appendChild(item);
        return;
    }

    items.forEach(value => {
        const item = document.createElement("li");
        item.textContent = value;
        list.appendChild(item);
    });
}


/* ==========================================
   Draw ATS Chart
========================================== */

function drawChart(score) {
    const canvas = document.getElementById("scoreChart");

    if (scoreChart) {
        scoreChart.destroy();
    }

    const safeScore = Math.max(0, Math.min(Number(score) || 0, 100));

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
            datasets: [
                {
                    data: [safeScore, 100 - safeScore],
                    backgroundColor: [chartColor, "#e5e7eb"],
                    borderWidth: 0
                }
            ]
        },
        options: {
            cutout: "75%",
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
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

        const darkModeEnabled =
            document.body.classList.contains("dark-mode");

        themeToggle.textContent = darkModeEnabled
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
    });
}


/* ==========================================
   Download PDF Report
========================================== */

downloadButton.addEventListener("click", () => {
    if (!latestReportData) {
        alert("Please analyze a resume before downloading the report.");
        return;
    }

    createPdfReport(latestReportData);
});


function createPdfReport(data) {
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();

    const margin = 18;
    const contentWidth = pageWidth - margin * 2;

    let y = 20;

    function checkPageSpace(requiredHeight = 15) {
        const pageHeight = pdf.internal.pageSize.getHeight();

        if (y + requiredHeight > pageHeight - 15) {
            pdf.addPage();
            y = 20;
        }
    }

    function addTitle(text) {
        checkPageSpace(18);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.text(text, margin, y);

        y += 9;
    }

    function addText(text, indent = 0) {
        checkPageSpace(12);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);

        const lines = pdf.splitTextToSize(
            String(text),
            contentWidth - indent
        );

        pdf.text(lines, margin + indent, y);

        y += lines.length * 5 + 3;
    }

    function addList(items) {
        if (!Array.isArray(items) || items.length === 0) {
            addText("• None");
            return;
        }

        items.forEach(item => {
            addText(`• ${item}`, 3);
        });
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);

    pdf.text(
        "AI Resume Job Match Report",
        pageWidth / 2,
        y,
        { align: "center" }
    );

    y += 12;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    pdf.text(
        `Generated: ${data.generatedAt}`,
        pageWidth / 2,
        y,
        { align: "center" }
    );

    y += 7;

    pdf.text(
        `Resume: ${data.resumeFilename}`,
        pageWidth / 2,
        y,
        { align: "center" }
    );

    y += 15;

    addTitle("Score Summary");

    addText(
        `Overall Match: ${Number(data.overall_score || 0).toFixed(2)}%`
    );

    addText(
        `Skill Match: ${Number(data.skill_match || 0).toFixed(2)}%`
    );

    addText(
        `Semantic Match: ${Number(data.semantic_match || 0).toFixed(2)}%`
    );

    y += 3;

    addTitle("Matched Skills");
    addList(data.matched_skills);

    y += 3;

    addTitle("Missing Skills");
    addList(data.missing_skills);

    y += 3;

    addTitle("Resume Improvement Suggestions");
    addList(data.suggestions);

    y += 6;

    checkPageSpace(20);

    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(9);

    const disclaimer =
        "This report provides an estimated resume-to-job alignment score. " +
        "It is not a guarantee of hiring outcomes or the behavior of any specific ATS.";

    const disclaimerLines = pdf.splitTextToSize(
        disclaimer,
        contentWidth
    );

    pdf.text(disclaimerLines, margin, y);

    pdf.save("ATS_Resume_Match_Report.pdf");
}