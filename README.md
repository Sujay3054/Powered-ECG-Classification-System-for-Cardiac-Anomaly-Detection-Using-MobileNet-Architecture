# ECG Analysis System

A modern, AI-powered web application for analyzing Electrocardiogram (ECG) images using deep learning. This system can classify ECG images into four categories:

- **ECG Myocardial Infarction Patients** - Detects possible heart attacks
- **ECG Patient that have History of MI** - Shows signs of previous heart attacks  
- **ECG of Patient that have abnormal heartbeat** - Detects irregular heart rhythms
- **Normal Person ECG Images** - Normal ECG patterns

## Features

- 🎨 **Modern, Responsive UI** - Beautiful gradient design with medical theme
- 🚀 **AI-Powered Analysis** - Uses MobileNetV2 deep learning model
- 📱 **Mobile Friendly** - Works on all devices and screen sizes
- 🔒 **Secure Upload** - File validation and size limits
- 📊 **Detailed Results** - Confidence scores and medical recommendations
- ⚡ **Real-time Processing** - Fast analysis with loading animations

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **AI Model**: TensorFlow/Keras with MobileNetV2
- **Styling**: Custom CSS with gradients and animations
- **Icons**: Font Awesome

## Installation

1. **Clone or download the project files**

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Ensure your trained model files are in place**:
   - `ECG-data/ecg_mobilenet_final.h5` - The trained model
   - `ECG-data/class_indices.json` - Class mapping file

4. **Run the application**:
   ```bash
   python app.py
   ```

5. **Open your browser** and go to `http://localhost:5000`

## Usage

1. **Upload ECG Image**: Drag and drop or click to select an ECG image (JPG, PNG, JPEG)
2. **Analyze**: Click the "Analyze ECG" button to process the image
3. **View Results**: See the AI analysis with:
   - Diagnosis and confidence score
   - Severity level (Low/Moderate/High)
   - Medical recommendations
   - Detailed probability breakdown

## File Structure

```
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css     # Styling and animations
│   └── js/
│       └── script.js     # Frontend JavaScript
├── uploads/              # Temporary file storage
└── ECG-data/             # Model and data files
    ├── ecg_mobilenet_final.h5
    └── class_indices.json
```

## API Endpoints

- `GET /` - Main application page
- `POST /api/predict` - Analyze ECG image
- `GET /api/health` - Check system health

## Model Information

The system uses a fine-tuned MobileNetV2 model trained on ECG images:
- **Input Size**: 512x512 pixels
- **Classes**: 4 ECG categories
- **Architecture**: Transfer learning with MobileNetV2 backbone
- **Performance**: Optimized for medical image classification

## Medical Disclaimer

⚠️ **Important**: This system is for educational and research purposes only. It should not be used for actual medical diagnosis. Always consult qualified healthcare professionals for medical decisions.

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Troubleshooting

**Model not loading**: Ensure the model file path is correct and the file exists
**Upload errors**: Check file size (max 16MB) and format (JPG, PNG, JPEG)
**Analysis fails**: Verify the image is a valid ECG image

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is for educational purposes. Please ensure compliance with medical device regulations if used in clinical settings.

