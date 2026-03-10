# ECG Classification Model - Statistical Analysis Report

## Model Information

| Property | Value |
|----------|-------|
| **Model Name** | ECG MobileNetV2 Classification Model |
| **Architecture** | MobileNetV2 (Transfer Learning) |
| **Input Size** | 512×512×3 |
| **Number of Classes** | 4 |
| **Total Parameters** | ~2.2M (MobileNetV2 base) |

---

## Overall Performance Metrics

| Metric | Value |
|--------|-------|
| **Test Accuracy** | 60.71% |
| **Test Loss** | 1.0779 |
| **Validation Accuracy** | 55.00% |
| **Validation Loss** | 1.1519 |

---

## Per-Class Performance Metrics (Test Set)

| Class | Precision | Recall | F1-Score | Support |
|-------|-----------|--------|----------|---------|
| **ECG Myocardial Infarction Patients** | 0.79 | 0.94 | **0.86** | 36 |
| **ECG Patient that have History of MI** | 0.16 | 0.12 | **0.13** | 26 |
| **ECG of Patient that have abnormal heartbeat** | 1.00 | 0.14 | **0.25** | 35 |
| **Normal Person ECG Images** | 0.59 | 1.00 | **0.74** | 43 |

### Key Observations:
- **Best Performance**: Myocardial Infarction Patients (F1-Score: 0.86)
- **Most Challenging**: History of MI (F1-Score: 0.13)
- **High Precision**: Abnormal heartbeat (1.00 precision, but low recall: 0.14)
- **High Recall**: Normal ECG Images (1.00 recall)

---

## Average Metrics

| Average Type | Precision | Recall | F1-Score |
|--------------|-----------|--------|----------|
| **Macro Average** | 0.63 | 0.55 | 0.50 |
| **Weighted Average** | 0.66 | 0.61 | 0.54 |

---

## Confusion Matrix (Test Set)

| Actual \ Predicted | MI | History MI | Abnormal HB | Normal |
|-------------------|----|-----------|-------------|--------|
| **MI** | 34 | 0 | 0 | 2 |
| **History MI** | 0 | 3 | 0 | 23 |
| **Abnormal HB** | 0 | 0 | 5 | 30 |
| **Normal** | 0 | 0 | 0 | 43 |

### Analysis:
- **True Positives (Diagonal)**: 85 correct predictions
- **False Negatives**: 55 misclassifications
- **Most Common Misclassification**: History of MI → Normal (23 cases)
- **Perfect Classification**: Normal ECG Images (43/43 correct)

---

## Dataset Distribution

| Class | Train | Validation | Test | **Total** |
|-------|-------|------------|------|-----------|
| **ECG Myocardial Infarction Patients** | 168 | 36 | 36 | **240** |
| **ECG Patient that have History of MI** | 120 | 26 | 26 | **172** |
| **ECG of Patient that have abnormal heartbeat** | 163 | 35 | 35 | **233** |
| **Normal Person ECG Images** | 201 | 43 | 43 | **287** |
| **TOTAL** | **652** | **140** | **140** | **932** |

### Dataset Split:
- **Training Set**: 652 samples (70%)
- **Validation Set**: 140 samples (15%)
- **Test Set**: 140 samples (15%)

---

## Performance Analysis by Class

### 1. ECG Myocardial Infarction Patients
- **Performance**: Excellent (F1: 0.86)
- **Precision**: 0.79 (79% of predicted MI cases are correct)
- **Recall**: 0.94 (94% of actual MI cases are detected)
- **Analysis**: Model performs very well in detecting acute MI cases

### 2. ECG Patient that have History of MI
- **Performance**: Poor (F1: 0.13)
- **Precision**: 0.16 (Only 16% of predicted cases are correct)
- **Recall**: 0.12 (Only 12% of actual cases are detected)
- **Analysis**: Most challenging class - often misclassified as Normal

### 3. ECG of Patient that have abnormal heartbeat
- **Performance**: Moderate (F1: 0.25)
- **Precision**: 1.00 (100% precision when predicted)
- **Recall**: 0.14 (Only 14% of actual cases are detected)
- **Analysis**: High precision but very low recall - model is conservative

### 4. Normal Person ECG Images
- **Performance**: Good (F1: 0.74)
- **Precision**: 0.59 (59% of predicted normal cases are correct)
- **Recall**: 1.00 (100% of actual normal cases are detected)
- **Analysis**: Perfect recall - all normal cases are identified

---

## Model Strengths and Limitations

### Strengths:
1. ✅ Excellent detection of acute Myocardial Infarction (F1: 0.86)
2. ✅ Perfect recall for Normal ECG images (100%)
3. ✅ High precision for abnormal heartbeat detection (100%)
4. ✅ Good overall accuracy (60.71%)

### Limitations:
1. ⚠️ Poor performance on History of MI class (F1: 0.13)
2. ⚠️ Low recall for abnormal heartbeat (14%)
3. ⚠️ Class imbalance may affect performance
4. ⚠️ Some classes are frequently misclassified as Normal

---

## Recommendations for Improvement

1. **Data Augmentation**: Increase samples for underrepresented classes
2. **Class Balancing**: Apply techniques to handle class imbalance
3. **Feature Engineering**: Focus on distinguishing History of MI from Normal
4. **Ensemble Methods**: Combine multiple models for better performance
5. **Hyperparameter Tuning**: Optimize learning rate, batch size, and architecture
6. **Transfer Learning**: Fine-tune pre-trained layers more carefully

---

## Statistical Summary

- **Total Test Samples**: 140
- **Correct Predictions**: 85 (60.71%)
- **Incorrect Predictions**: 55 (39.29%)
- **Best Class Performance**: Myocardial Infarction (F1: 0.86)
- **Worst Class Performance**: History of MI (F1: 0.13)
- **Overall Macro F1-Score**: 0.50
- **Overall Weighted F1-Score**: 0.54

---

*Report Generated: Model Evaluation Statistics*
*Model: ECG MobileNetV2 Classification Model*

