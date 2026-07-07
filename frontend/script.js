const button = document.getElementById("analyzeBtn");
let scoreChart = null;

button.addEventListener("click", async () => {
  const file = document.getElementById("resumeFile").files[0];
  const jobText = document.getElementById("jobText").value;

  if (!file || !jobText.trim()) {
    alert("Please upload a resume and paste a job description.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("job_text", jobText);

  button.textContent = "Analyzing...";
  button.disabled = true;

  try {
    const response = await fetch("http://127.0.0.1:8000/match", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Backend error");
    }

    const data = await response.json();

    const overall = Number(data.overall_score || 0);
    const skill = Number(data.skill_match || 0);
    const semantic = Number(data.semantic_match || 0);

    document.getElementById("results").classList.remove("hidden");

    document.getElementById("overallScore").textContent = `${overall.toFixed(2)}%`;
    document.getElementById("skillMatch").textContent = `${skill.toFixed(2)}%`;
    document.getElementById("semanticMatch").textContent = `${semantic.toFixed(2)}%`;

    document.getElementById("overallBar").style.width = `${overall}%`;
    document.getElementById("skillBar").style.width = `${skill}%`;
    document.getElementById("semanticBar").style.width = `${semantic}%`;

    fillList("matchedSkills", data.matched_skills);
    fillList("missingSkills", data.missing_skills);
    fillList("suggestions", data.suggestions);

    drawChart(overall);

  } catch (error) {
    console.error(error);
    alert("Error analyzing resume. Please check that your FastAPI server is running.");
  } finally {
    button.textContent = "Analyze Resume";
    button.disabled = false;
  }
});

function fillList(id, items) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";

  if (!items || items.length === 0) {
    const li = document.createElement("li");
    li.textContent = "None";
    ul.appendChild(li);
    return;
  }

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

function drawChart(score) {
  const ctx = document.getElementById("scoreChart");

  if (scoreChart) {
    scoreChart.destroy();
  }

  scoreChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [score, 100 - score],
        backgroundColor: ["#22c55e", "#e5e7eb"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "75%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });
}