let currentChallengeData = null;

async function fetchChallenge() {
    const level = document.getElementById('difficulty-select').value;
    const url = `https://projex.napier.ac.uk/util/generate-code-example?secret=8f467f0282a7b9d3087581ce7d3b3944598d286518ce4a764809bf641b2ccaa5&difficulty=${level}`;

    // Show loading spinner
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.classList.add('active');

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const json = await response.json();
            alert(`Server error: ${json.error || 'Unknown error'}`);
            return;
        }

        const json = await response.json();

        if (json.success) {
            currentChallengeData = json.data;
            renderUI();
        } else {
            alert(`Failed to generate challenge: ${json.error || 'Unknown error'}`);
        }
    } catch (e) {
        console.error('Fetch error:', e);
        alert(`Error fetching challenge: ${e.message}\nCheck browser console for details.`);
    } finally {
        // Hide loading spinner
        loadingOverlay.classList.remove('active');
    }
}

function checkAnswers() {
    // 1. Collect selected checkboxes
    const selected = Array.from(document.querySelectorAll('input[name="problem"]:checked'))
                          .map(el => el.value);

    const correct = currentChallengeData.metadata.problems_included;

    // 2. Logic for messages (as per your requirements)
    const matches = selected.filter(p => correct.includes(p)).length;
    const score = (matches / correct.length) * 100;

    let feedback = "";
    if (score === 100) {
        feedback = "Congratulations! Perfect identification.";
    } else if (score > 0) {
        feedback = "Good start! You identified some issues. Keep refining.";
    } else {
        const suggestion = document.getElementById('difficulty-select').value > 1
            ? "Try dropping down a difficulty level."
            : "Try more familiarization exercises first.";
        feedback = `Not quite. ${suggestion}`;
    }

    // 3. Show Code & Results
    document.getElementById('fixed-code-area').innerText = currentChallengeData.fixed_code;
    document.getElementById('feedback-msg').innerHTML = `<b>${feedback}</b><br>${currentChallengeData.explanation}`;
    document.getElementById('result-section').style.display = "block";

    // 4. Hide options and submit button after submission
    document.getElementById('options-container').style.display = "none";
    document.getElementById('submit-btn').style.display = "none";

    // 5. Report to Moodle
    ScormProcess.setScore(score);
}

function renderUI() {
    // Show the problem code
    document.getElementById('problem-code').innerText = currentChallengeData.code_with_problem;

    // All possible problem types from the API
    const allProblems = [
        "single_responsibility",
        "open_closed",
        "liskov_substitution",
        "interface_segregation",
        "dependency_inversion",
        "yagni",
        "kiss",
        "dry",
        "law_of_demeter",
        "god_class",
        "long_method",
        "magic_numbers",
        "poor_naming",
        "primitive_obsession",
        "feature_envy"
    ];

    const container = document.getElementById('options-container');
    container.innerHTML = ""; // Clear old ones

    allProblems.forEach(prob => {
        const displayName = prob.replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        container.innerHTML += `
            <label style="display:block; margin-bottom: 5px;">
                <input type="checkbox" name="problem" value="${prob}"> ${displayName}
            </label>`;
    });

    // Show options and submit button for new challenge
    document.getElementById('options-container').style.display = "block";
    document.getElementById('submit-btn').style.display = "block";
    document.getElementById('result-section').style.display = "none";
}
