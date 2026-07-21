---
date: '3'
title: 'Pneumonia Detection'
images:
  - './pneumonia.png'
github: 'https://github.com/wikporc/Pneumonia-challenge'
tech:
  - Python
  - Optuna
  - PyTorch
  - Gradio
  - PostgreSQL
  - Grad-CAM
---

One of my earliest computer vision projects — a pneumonia detection tool built on a ResNet-based CNN.

- Trained a ResNet-based CNN to classify pneumonia from chest X-rays.
- Used Optuna for hyperparameter optimization, tuning for F2 score to minimize false negatives (missed diagnoses).
- Implemented Grad-CAM heatmaps for model explainability, so clinicians can see which regions drove each prediction.
