"""
Script to generate comprehensive model statistics and tables for ECG Classification Model
"""

import json
from tabulate import tabulate

# Model Statistics based on evaluation results
model_stats = {
    "model_name": "ECG MobileNetV2 Classification Model",
    "architecture": "MobileNetV2 (Transfer Learning)",
    "input_size": "512x512x3",
    "num_classes": 4,
    "dataset_split": {
        "train": 652,
        "validation": 140,
        "test": 140
    }
}

# Overall Performance Metrics
overall_metrics = {
    "Test Accuracy": "60.71%",
    "Test Loss": "1.0779",
    "Validation Accuracy": "55.00%",
    "Validation Loss": "1.1519"
}

# Per-Class Performance Metrics (from test set)
class_metrics = [
    {
        "Class": "ECG Myocardial Infarction Patients",
        "Precision": "0.79",
        "Recall": "0.94",
        "F1-Score": "0.86",
        "Support": "36"
    },
    {
        "Class": "ECG Patient that have History of MI",
        "Precision": "0.16",
        "Recall": "0.12",
        "F1-Score": "0.13",
        "Support": "26"
    },
    {
        "Class": "ECG of Patient that have abnormal heartbeat",
        "Precision": "1.00",
        "Recall": "0.14",
        "F1-Score": "0.25",
        "Support": "35"
    },
    {
        "Class": "Normal Person ECG Images",
        "Precision": "0.59",
        "Recall": "1.00",
        "F1-Score": "0.74",
        "Support": "43"
    }
]

# Average Metrics
average_metrics = {
    "Macro Average": {
        "Precision": "0.63",
        "Recall": "0.55",
        "F1-Score": "0.50"
    },
    "Weighted Average": {
        "Precision": "0.66",
        "Recall": "0.61",
        "F1-Score": "0.54"
    }
}

# Confusion Matrix (from test set)
confusion_matrix = [
    ["", "MI", "History MI", "Abnormal HB", "Normal"],
    ["MI", "34", "0", "0", "2"],
    ["History MI", "0", "3", "0", "23"],
    ["Abnormal HB", "0", "0", "5", "30"],
    ["Normal", "0", "0", "0", "43"]
]

# Dataset Distribution
dataset_distribution = [
    {"Class": "ECG Myocardial Infarction Patients", "Train": "168", "Validation": "36", "Test": "36", "Total": "240"},
    {"Class": "ECG Patient that have History of MI", "Train": "120", "Validation": "26", "Test": "26", "Total": "172"},
    {"Class": "ECG of Patient that have abnormal heartbeat", "Train": "163", "Validation": "35", "Test": "35", "Total": "233"},
    {"Class": "Normal Person ECG Images", "Train": "201", "Validation": "43", "Test": "43", "Total": "287"}
]

def generate_statistics_report():
    """Generate a comprehensive statistics report"""
    
    print("=" * 80)
    print("ECG CLASSIFICATION MODEL - COMPREHENSIVE STATISTICS REPORT")
    print("=" * 80)
    print()
    
    # Model Information
    print("MODEL INFORMATION")
    print("-" * 80)
    print(f"Model Name: {model_stats['model_name']}")
    print(f"Architecture: {model_stats['architecture']}")
    print(f"Input Size: {model_stats['input_size']}")
    print(f"Number of Classes: {model_stats['num_classes']}")
    print()
    
    # Overall Performance
    print("OVERALL PERFORMANCE METRICS")
    print("-" * 80)
    overall_table = [[k, v] for k, v in overall_metrics.items()]
    print(tabulate(overall_table, headers=["Metric", "Value"], tablefmt="grid"))
    print()
    
    # Per-Class Performance
    print("PER-CLASS PERFORMANCE METRICS (Test Set)")
    print("-" * 80)
    class_table = [[m["Class"], m["Precision"], m["Recall"], m["F1-Score"], m["Support"]] 
                   for m in class_metrics]
    print(tabulate(class_table, headers=["Class", "Precision", "Recall", "F1-Score", "Support"], 
                  tablefmt="grid"))
    print()
    
    # Average Metrics
    print("AVERAGE METRICS")
    print("-" * 80)
    avg_table = [[k, v["Precision"], v["Recall"], v["F1-Score"]] 
                for k, v in average_metrics.items()]
    print(tabulate(avg_table, headers=["Average Type", "Precision", "Recall", "F1-Score"], 
                  tablefmt="grid"))
    print()
    
    # Confusion Matrix
    print("CONFUSION MATRIX (Test Set)")
    print("-" * 80)
    print(tabulate(confusion_matrix, headers="firstrow", tablefmt="grid"))
    print()
    
    # Dataset Distribution
    print("DATASET DISTRIBUTION")
    print("-" * 80)
    dist_table = [[d["Class"], d["Train"], d["Validation"], d["Test"], d["Total"]] 
                  for d in dataset_distribution]
    print(tabulate(dist_table, headers=["Class", "Train", "Validation", "Test", "Total"], 
                  tablefmt="grid"))
    print()
    
    # Summary Statistics
    print("SUMMARY STATISTICS")
    print("-" * 80)
    total_samples = sum([int(d["Total"]) for d in dataset_distribution])
    print(f"Total Samples: {total_samples}")
    print(f"Training Samples: {model_stats['dataset_split']['train']}")
    print(f"Validation Samples: {model_stats['dataset_split']['validation']}")
    print(f"Test Samples: {model_stats['dataset_split']['test']}")
    print()
    print("Best Performing Class: ECG Myocardial Infarction Patients (F1-Score: 0.86)")
    print("Most Challenging Class: ECG Patient that have History of MI (F1-Score: 0.13)")
    print()
    print("=" * 80)

if __name__ == "__main__":
    generate_statistics_report()

