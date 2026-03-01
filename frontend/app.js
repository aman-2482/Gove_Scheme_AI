document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const userPromptEl = document.getElementById('user-prompt');
    // model selector removed — always uses DeepSeek Chat (fastest & cheapest) by default
    const loadingEl = document.getElementById('loading');
    const resultsEl = document.getElementById('results');
    const errorContainer = document.getElementById('error-container');
    const errorMsg = document.getElementById('error-msg');
    const newSearchBtn = document.getElementById('new-search-btn');

    // Result elements
    const resSummaryEl = document.getElementById('res-summary');
    const resEligibilityEl = document.getElementById('res-eligibility');
    const resActionsEl = document.getElementById('res-actions');
    const resRisksEl = document.getElementById('res-risks');
    const resTokensEl = document.getElementById('res-tokens');
    const resModelEl = document.getElementById('res-model');
    const applyLinksSection = document.getElementById('apply-links-section');
    const applyLinksContainer = document.getElementById('apply-links-container');

    // Loading step elements
    const steps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3'),
    ];

    // -----------------------------------------------
    // Chip quick-fill
    // -----------------------------------------------
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            userPromptEl.value = chip.getAttribute('data-prompt');
            userPromptEl.focus();
        });
    });

    // -----------------------------------------------
    // New Search
    // -----------------------------------------------
    newSearchBtn.addEventListener('click', () => {
        resultsEl.classList.add('hidden');
        errorContainer.classList.add('hidden');
        userPromptEl.value = '';
        userPromptEl.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // -----------------------------------------------
    // Main analyze handler
    // -----------------------------------------------
    analyzeBtn.addEventListener('click', handleAnalyze);
    userPromptEl.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 'Enter') handleAnalyze();
    });

    async function handleAnalyze() {
        const userPrompt = userPromptEl.value.trim();
        // model is not sent — backend defaults to ai_config.DEFAULT_LLM_MODEL (deepseek/deepseek-chat)

        if (!userPrompt) {
            showError("Please describe your situation or the scheme you are looking for.");
            return;
        }

        // Reset UI
        hideError();
        resultsEl.classList.add('hidden');
        applyLinksSection.classList.add('hidden');
        analyzeBtn.disabled = true;
        loadingEl.classList.remove('hidden');
        resetLoadingSteps();

        // Animate loading steps
        const stepTimer = animateLoadingSteps();

        try {
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_prompt: userPrompt,
                    temperature: 0.2
                })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || result.detail || "An error occurred while connecting to the AI service.");
            }

            clearInterval(stepTimer);
            markAllStepsDone();

            // Short pause so user sees all steps done
            await sleep(500);

            populateResults(result);

        } catch (error) {
            console.error(error);
            clearInterval(stepTimer);
            showError(error.message);
        } finally {
            loadingEl.classList.add('hidden');
            analyzeBtn.disabled = false;
        }
    }

    // -----------------------------------------------
    // Populate results
    // -----------------------------------------------
    function populateResults(result) {
        const data = result.data;

        // Text fields
        resSummaryEl.textContent = data.summary || "No summary provided.";
        resEligibilityEl.textContent = data.eligibility_reason || "No eligibility reasoning provided.";

        // Actions list
        resActionsEl.innerHTML = '';
        (data.recommended_actions?.length ? data.recommended_actions : ['No actions recommended.'])
            .forEach(action => {
                const li = document.createElement('li');
                li.textContent = action;
                resActionsEl.appendChild(li);
            });

        // Risks list
        resRisksEl.innerHTML = '';
        (data.risk_notes?.length ? data.risk_notes : ['No significant risks identified.'])
            .forEach(risk => {
                const li = document.createElement('li');
                li.textContent = risk;
                resRisksEl.appendChild(li);
            });

        // Meta
        resTokensEl.textContent = result.tokens_used || 0;
        resModelEl.textContent = result.model_used || '—';

        // Apply Links
        applyLinksContainer.innerHTML = '';
        const links = data.apply_links || [];
        if (links.length > 0) {
            links.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.className = 'apply-link-btn';
                a.innerHTML = `<span>🔗</span> <span>${link.name}</span> <span class="link-arrow">↗</span>`;
                applyLinksContainer.appendChild(a);
            });
            applyLinksSection.classList.remove('hidden');
        } else {
            applyLinksSection.classList.add('hidden');
        }

        resultsEl.classList.remove('hidden');
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // -----------------------------------------------
    // Loading step animation
    // -----------------------------------------------
    function resetLoadingSteps() {
        steps.forEach(s => { s.className = 'step'; });
        steps[0].classList.add('active');
    }

    function animateLoadingSteps() {
        let current = 0;
        return setInterval(() => {
            if (current < steps.length - 1) {
                steps[current].classList.remove('active');
                steps[current].classList.add('done');
                current++;
                steps[current].classList.add('active');
            }
        }, 3000);
    }

    function markAllStepsDone() {
        steps.forEach(s => { s.className = 'step done'; });
    }

    // -----------------------------------------------
    // Error helpers
    // -----------------------------------------------
    function showError(message) {
        errorMsg.textContent = message;
        errorContainer.classList.remove('hidden');
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function hideError() {
        errorContainer.classList.add('hidden');
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
