import os
import numpy as np
import matplotlib.pyplot as plt

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RESULTS_DIR = os.path.normpath(os.path.join(BASE_DIR, "..", "results"))
VIS_DIR = os.path.normpath(os.path.join(BASE_DIR, "..", "visualizations", "output_charts"))
os.makedirs(VIS_DIR, exist_ok=True)

# Load required results
membrane_potential = np.load(os.path.join(RESULTS_DIR, "membrane_potential.npy"))
spike_counts = np.load(os.path.join(RESULTS_DIR, "spike_counts.npy"))
control_outputs = np.load(os.path.join(RESULTS_DIR, "control_outputs.npy"))
response_accuracy = np.load(os.path.join(RESULTS_DIR, "response_accuracy.npy"))[0]

# Optional: Load baselines if present
pid_control = ann_control = None
try:
    pid_control = np.load(os.path.join(RESULTS_DIR, "pid_control_outputs.npy"))
    ann_control = np.load(os.path.join(RESULTS_DIR, "ann_control_outputs.npy"))
except FileNotFoundError:
    print("[!] PID/ANN outputs not found — skipping controller comparison.")

### 1. Membrane Dynamics ###
plt.figure(figsize=(10, 5))
mean_mem = np.mean(membrane_potential, axis=1)
plt.plot(mean_mem, label='Mean Membrane Potential')
plt.title("Membrane Potential Dynamics Over Time")
plt.xlabel("Timestep")
plt.ylabel("Potential (V)")
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.savefig(os.path.join(VIS_DIR, "membrane_dynamics.png"))
plt.close()

### 2. Spike Rate ###
plt.figure(figsize=(10, 4))
plt.plot(spike_counts, color='purple')
plt.title("Spike Count per Timestep")
plt.xlabel("Timestep")
plt.ylabel("Spike Count")
plt.tight_layout()
plt.savefig(os.path.join(VIS_DIR, "spike_rates.png"))
plt.close()

### 3. SNN Control Signal ###
plt.figure(figsize=(10, 4))
plt.plot(control_outputs, label="SNN Output", color="green")
plt.title("SNN Control Signal Output")
plt.xlabel("Timestep")
plt.ylabel("Control Output (0-1)")
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.savefig(os.path.join(VIS_DIR, "snn_control_signals.png"))
plt.close()

### 4. Controller Comparison ###
if pid_control is not None and ann_control is not None:
    plt.figure(figsize=(10, 4))
    plt.plot(control_outputs, label="SNN", color="green")
    plt.plot(pid_control, label="PID", color="blue", linestyle="--")
    plt.plot(ann_control, label="ANN", color="orange", linestyle=":")
    plt.title("Controller Output Comparison")
    plt.xlabel("Timestep")
    plt.ylabel("Control Output")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(os.path.join(VIS_DIR, "controller_comparison.png"))
    plt.close()

### 5. Energy vs Accuracy ###
ENERGY_PER_SPIKE = 0.02  # Simulated mJ per spike
total_energy = np.sum(spike_counts) * ENERGY_PER_SPIKE

plt.figure(figsize=(6, 4))
plt.bar(["SNN Controller"], [response_accuracy], color='skyblue', label="Accuracy")
plt.ylabel("Accuracy")
plt.twinx()
plt.plot(["SNN Controller"], [total_energy], color='red', marker='o', label="Energy (mJ)")
plt.ylabel("Estimated Energy (mJ)")
plt.title("Energy vs Accuracy")
plt.tight_layout()
plt.savefig(os.path.join(VIS_DIR, "energy_vs_accuracy.png"))
plt.close()

print("✅ All infographics generated and saved in output_charts/")
