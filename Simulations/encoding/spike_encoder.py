# neuromold/encoding/spike_encoder.py

import os
import numpy as np
import pandas as pd
import torch

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.normpath(os.path.join(BASE_DIR, "..", "data"))
ENCODING_DIR = os.path.normpath(os.path.join(BASE_DIR, "..", "encoding"))
os.makedirs(ENCODING_DIR, exist_ok=True)

# Spike encoding parameters
TIME_STEPS = 100  # total simulation steps per sample
MAX_RATE = 100    # Hz, max firing rate for normalization

def poisson_encode(data, time_steps=TIME_STEPS, max_rate=MAX_RATE):
    """
    Converts continuous input features into spike trains using Poisson encoding.
    """
    norm_data = (data - data.min()) / (data.max() - data.min())
    spike_trains = []

    for t in range(time_steps):
        rand_vals = np.random.rand(*norm_data.shape)
        spikes = (rand_vals < norm_data * (max_rate / 1000)).astype(float)
        spike_trains.append(spikes)

    return np.stack(spike_trains)  # Shape: [time_steps, samples, features]

def main():
    print("🔁 Loading dataset...")
    dataset_path = os.path.join(DATA_DIR, "synthetic_injection_molding_dataset.csv")
    df = pd.read_csv(dataset_path)
    data = df.values.astype(np.float32)

    print("⚡ Performing Poisson spike encoding...")
    spike_trains = poisson_encode(data)

    output_path = os.path.join(ENCODING_DIR, "spike_trains_poisson.npy")
    np.save(output_path, spike_trains)
    print(f"[✓] Spike trains saved to: {output_path}")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"❌ Spike Encoder failed: {e}")
        exit(1)
