// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const clearBtn = document.getElementById('clearBtn');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const errorSection = document.getElementById('errorSection');
const downloadRxBtn = document.getElementById('downloadRxBtn');

// State
let selectedFile = null;
let imagePreview = null;
let lastPrediction = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    checkAPIHealth();
});

// Event Listeners
function initializeEventListeners() {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Upload area click
    uploadArea.addEventListener('click', () => fileInput.click());
    
    // Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // Button clicks
    analyzeBtn.addEventListener('click', analyzeECG);
    clearBtn.addEventListener('click', resetForm);
    if (downloadRxBtn) {
        downloadRxBtn.addEventListener('click', downloadPrescription);
    }
}

// Drag and Drop Handlers
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

// File Handling
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    // Validate file type
    if (!isValidImageFile(file)) {
        showError('Please select a valid image file (JPG, PNG, JPEG)');
        return;
    }
    
    // Validate file size (16MB max)
    if (file.size > 16 * 1024 * 1024) {
        showError('File size must be less than 16MB');
        return;
    }
    
    selectedFile = file;
    showImagePreview(file);
    updateButtons();
}

function isValidImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
}

function showImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview = e.target.result;
        previewImage.src = imagePreview;
        previewSection.style.display = 'block';
        previewSection.classList.add('fade-in');
    };
    reader.readAsDataURL(file);
}

function updateButtons() {
    analyzeBtn.disabled = false;
    clearBtn.disabled = false;
}

// API Functions
async function checkAPIHealth() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (!data.model_loaded) {
            showError('ECG analysis model is not available. Please try again later.');
        }
    } catch (error) {
        console.error('Health check failed:', error);
    }
}

async function analyzeECG() {
    if (!selectedFile) {
        showError('Please select an ECG image first');
        return;
    }
    
    showLoading();
    
    try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        
        const response = await fetch('/api/predict', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showResults(data.prediction);
        } else {
            showError(data.error || 'Analysis failed. Please try again.');
        }
    } catch (error) {
        console.error('Analysis error:', error);
        showError('Network error. Please check your connection and try again.');
    }
}

// UI Functions
function showLoading() {
    hideAllSections();
    loadingSection.style.display = 'block';
    loadingSection.classList.add('fade-in');
    
    // Animate progress bar
    const progressFill = document.querySelector('.progress-fill');
    progressFill.style.width = '0%';
    setTimeout(() => {
        progressFill.style.width = '100%';
    }, 100);
}

function showResults(prediction) {
    hideAllSections();
    
    // Update main results
    document.getElementById('diagnosisTitle').textContent = prediction.class;
    document.getElementById('diagnosisDescription').textContent = prediction.explanation.description;
    document.getElementById('confidenceValue').textContent = `${Math.round(prediction.confidence * 100)}%`;
    
    // Update severity badge
    const severityBadge = document.getElementById('severityBadge');
    const severityText = document.getElementById('severityText');
    severityBadge.className = `severity-badge ${prediction.explanation.severity.toLowerCase()}`;
    severityText.textContent = prediction.explanation.severity;
    
    // Update recommendations
    document.getElementById('actionText').textContent = prediction.explanation.action;
    document.getElementById('recommendationText').textContent = prediction.explanation.recommendation;

    // Populate explanation details lists
    renderList('whySection', 'whyList', prediction.explanation.why);
    renderList('preventionSection', 'preventionList', prediction.explanation.prevention);
    renderList('nextStepsSection', 'nextStepsList', prediction.explanation.next_steps);
    
    // Update detailed results grid
    updateResultsGrid(prediction.all_predictions);
    
    resultsSection.style.display = 'block';
    resultsSection.classList.add('slide-up');

    // Save and enable prescription download
    lastPrediction = prediction;
    if (downloadRxBtn) downloadRxBtn.disabled = false;
}

function renderList(sectionId, listId, items) {
    const section = document.getElementById(sectionId);
    const list = document.getElementById(listId);
    if (!Array.isArray(items) || items.length === 0) {
        section.style.display = 'none';
        list.innerHTML = '';
        return;
    }
    section.style.display = 'flex';
    list.innerHTML = '';
    items.forEach((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        list.appendChild(li);
    });
}

function updateResultsGrid(allPredictions) {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = '';
    
    // Sort predictions by probability (descending)
    const sortedPredictions = allPredictions.sort((a, b) => b.probability - a.probability);
    
    sortedPredictions.forEach((pred, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${index === 0 ? 'top-result' : ''}`;
        
        resultItem.innerHTML = `
            <h5>${pred.class}</h5>
            <div class="probability">${Math.round(pred.probability * 100)}%</div>
        `;
        
        resultsGrid.appendChild(resultItem);
    });
}

function showError(message) {
    hideAllSections();
    document.getElementById('errorMessage').textContent = message;
    errorSection.style.display = 'block';
    errorSection.classList.add('fade-in');
}

function hideAllSections() {
    const sections = [previewSection, loadingSection, resultsSection, errorSection];
    sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('fade-in', 'slide-up');
    });
}

function resetForm() {
    selectedFile = null;
    imagePreview = null;
    fileInput.value = '';
    
    hideAllSections();
    
    analyzeBtn.disabled = true;
    clearBtn.disabled = true;
    
    // Reset upload area
    uploadArea.classList.remove('dragover');

    if (downloadRxBtn) downloadRxBtn.disabled = true;
}

// Utility Functions
function formatClassName(className) {
    return className
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showError('An unexpected error occurred. Please try again.');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'Enter':
                if (!analyzeBtn.disabled) {
                    e.preventDefault();
                    analyzeECG();
                }
                break;
            case 'r':
                e.preventDefault();
                resetForm();
                break;
        }
    }
});

// Accessibility improvements
function addAccessibilityFeatures() {
    // Add ARIA labels
    uploadArea.setAttribute('role', 'button');
    uploadArea.setAttribute('aria-label', 'Upload ECG image');
    uploadArea.setAttribute('tabindex', '0');
    
    // Add keyboard support for upload area
    uploadArea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInput.click();
        }
    });
}

// Download prescription image rendered by backend
async function downloadPrescription() {
    try {
        if (!lastPrediction) return;
        const response = await fetch('/api/prescription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prediction: lastPrediction })
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            showError(error.error || 'Failed to generate prescription');
            return;
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ecg_prescription.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error('Download error', e);
        showError('Failed to download prescription');
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', addAccessibilityFeatures);
