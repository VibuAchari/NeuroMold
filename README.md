
# 🧠 NeuroMold: Bio-Inspired Neuromorphic Control for Injection Molding

NeuroMold is an intelligent, **neuromorphic edge computing framework** designed to optimize real-time control in plastic injection molding systems using **Spiking Neural Networks (SNNs)**. This project leverages bio-inspired computation to achieve ultra-low power, adaptive control on edge devices — mimicking the brain’s ability to respond dynamically to complex stimuli.

> ⚙️ Developed by Vibusha S Achari and team at Kalasalingam Academy of Research and Education

---

## 🧬 Project Motivation

Plastic injection molding industries face major bottlenecks such as:

- ❌ High defect rates (30%+ rework due to undetected flaws)
- ⚡ Inefficient energy usage and material waste
- 🧱 Rigid legacy systems (SCADA, PLC) with no predictive capacity
- 🧠 Traditional ML models (ANNs) too heavy for real-time, on-device inference

**NeuroMold** proposes a next-gen solution: biologically inspired SNNs embedded in edge devices for real-time anomaly detection, defect prediction, and closed-loop adaptive control.

---

## 🧠 Core Architecture

NeuroMold’s technical pipeline is modular and built for simulation and potential deployment:

### 🔸 1. Synthetic Sensor Module
Generates realistic time-series sensor data (pressure, temperature, etc.) to simulate factory conditions.

### 🔸 2. Spike Encoding Layer
Custom encoder transforms continuous data into spike trains using temporal Poisson encoding, designed to work with SNNs.

### 🔸 3. Spiking Neural Controller (SNN)
A Norse-based LIF (Leaky Integrate-and-Fire) SNN processes spike inputs and generates optimal control signals in an energy-efficient, event-driven fashion.

### 🔸 4. Injection Molding Simulator
A physics-informed model simulates actuator feedback loops, plastic flow, and thermal states to evaluate controller performance.

### 🔸 5. Feedback & Evaluation Layer
Quantitatively measures:
- Response latency
- Energy use (via spike counts)
- System stability & accuracy

---

## 📁 Project Structure

### 🔬 Simulation Backend (Python + PyTorch)

```
Simulations/
├── data/
│   └── synthetic_injection_molding_dataset.csv
├── encoding/
│   └── spike_encoder.py
├── model/
│   └── snn_norse_controller.py
├── simulator/
│   └── injection_molding_simulator.py
├── results/
│   └── *.npy  # Includes outputs from ANN, PID, SNN
├── visualizations/
│   └── output_charts/  # PNG graphs
├── run_pipeline.py
├── requirements.txt
└── NeuroMold_Report.md
```

### 🧑‍💻 Frontend Dashboard (Vite + TypeScript + Tailwind)

```
Dashboard/
├── src/
│   ├── components/
│   ├── charts/
│   ├── context/
│   └── utils/
├── public/
├── index.html
├── tailwind.config.js
└── vite.config.ts
```

---

## 🧠 Why Bio-Inspired?

NeuroMold leverages **Spiking Neural Networks**, which:
- Mimic real brain neurons firing only when needed (sparse computation)
- Encode time-dependent signals efficiently
- Are ideal for **event-driven**, real-time factory environments

This makes NeuroMold not just another AI controller — it’s **neuromorphic intelligence at the edge**.

---

## 🔬 Key Features

- 🧠 **SNN-based controller** using LIF neurons for adaptive control
- ⚡ **Energy-efficient inference** measured via spike counts
- 🧪 **Simulated real-world testbed** for evaluating control strategies
- 📊 **Dashboard visualization** of metrics like spike rate, energy vs accuracy
- 🔄 **Modular architecture** for future hardware integration (e.g. Intel Loihi)

---

## 🚀 Running the Simulation

### ⚙️ Prerequisites
- Python 3.9+
- PyTorch
- Norse
- NumPy, Matplotlib

### ▶️ To Run:

```bash
cd Simulations
python run_pipeline.py
```

### 📈 Output:
- `.npy` arrays with SNN/PID/ANN controller outputs
- Charts in `visualizations/output_charts/`

---

## 🖥️ Running the Dashboard

```bash
cd Dashboard
npm install
npm run dev
```

This starts the dashboard at `http://localhost:5173/` with live graphs for spike activity, controller comparison, and more.

---

## 🧪 Citation

```bibtex
@misc{achari2025neuromold,
  author       = {Vibusha S Achari},
  title        = {NeuroMold: Neuromorphic Adaptive Control for Injection Molding},
  year         = {2025},
  howpublished = {\url{https://github.com/VibuAchari/NeuroMold}},
}
```

---

---

## 🧭 Future Directions

- Integrating real-time sensor streaming via MQTT
- Optimizing spike encoding through self-adaptive schemes
- Porting to neuromorphic hardware (Intel Loihi, SpiNNaker)
- Filing a patent and industrial pilot deployment

---

NeuroMold aims to push the frontier of **bio-inspired intelligent manufacturing** — bringing brains to the factory floor, one spike at a time. ⚡🧠🏭
