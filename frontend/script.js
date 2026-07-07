console.log("script.js is loaded");

const button = document.getElementById("analyzeBtn");

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

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Something went wrong while analyzing the resume.");
        }

        document.getElementById("results").classList.remove("hidden");

        document.getElementById("overallScore").textContent = `${data.overall_score}%`;
        document.getElementById("skillMatch").textContent = `${data.skill_match}%`;
        document.getElementById("semanticMatch").textContent = `${data.semantic_match}%`;

        document.getElementById("overallBar").style.width = `${data.overall_score}%`;
        document.getElementById("skillBar").style.width = `${data.skill_match}%`;
        document.getElementById("semanticBar").style.width = `${data.semantic_match}%`;

        fillList("matchedSkills", data.matched_skills);
        fillList("missingSkills", data.missing_skills);
        fillList("suggestions", data.suggestions);

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