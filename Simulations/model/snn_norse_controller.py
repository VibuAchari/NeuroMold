import os
import numpy as np
import torch
import torch.nn as nn
from sklearn.metrics import accuracy_score
from norse.torch.module.lif import LIFCell, LIFState

from norse.torch import ALIFCell, ALIFState

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENCODING_DIR = os.path.normpath(os.path.join(BASE_DIR, "..", "encoding"))
RESULTS_DIR = os.path.normpath(os.path.join(BASE_DIR, "..", "results"))
os.makedirs(RESULTS_DIR, exist_ok=True)

spike_file = os.path.join(ENCODING_DIR, "spike_trains_poisson.npy")
spike_train = np.load(spike_file)
print(f"Original spike tensor shape: {spike_train.shape}")
spike_tensor = torch.from_numpy(spike_train).float()

flat_spike_train = spike_train.reshape(-1, spike_train.shape[-1])
spike_sums = np.sum(flat_spike_train, axis=1)
ground_truth = (spike_sums > np.median(spike_sums)).astype(int)

class ImprovedSNNController(nn.Module):
    def __init__(self, input_size, hidden1, hidden2, output_size):
        super().__init__()
        self.fc1 = nn.Linear(input_size, hidden1)
        self.lif1 = LIFCell()
        self.fc2 = nn.Linear(hidden1, hidden2)
        self.alif = ALIFCell()
        self.readout = nn.Linear(hidden2, output_size)

    def forward(self, x, state1, state2):
        x = self.fc1(x)
        z1, state1 = self.lif1(x, state1)
        x = self.fc2(z1)
        z2, state2 = self.alif(x, state2)
        out = torch.sigmoid(self.readout(z2))
        return out, state1, state2, z2

timesteps, batch_size, input_size = spike_tensor.shape
hidden1, hidden2 = 64, 32
output_size = 1

model = ImprovedSNNController(input_size, hidden1, hidden2, output_size)
model.eval()

state1 = LIFState(torch.zeros(batch_size, hidden1), torch.zeros(batch_size, hidden1), torch.zeros(batch_size, hidden1))
state2 = ALIFState(torch.zeros(batch_size, hidden2), torch.zeros(batch_size, hidden2), torch.zeros(batch_size, hidden2), torch.zeros(batch_size, hidden2))

outputs, membrane_potentials, spike_counts = [], [], []

with torch.no_grad():
    for t in range(timesteps):
        input_t = spike_tensor[t]
        output, state1, state2, mem = model(input_t, state1, state2)
        outputs.extend(output.squeeze().tolist())
        membrane_potentials.append(mem.detach().cpu().numpy())
        spike_counts.append(torch.sum(input_t).item())

preds = (np.array(outputs) > 0.5).astype(int)
accuracy = accuracy_score(ground_truth, preds)

np.save(os.path.join(RESULTS_DIR, "control_outputs.npy"), np.array(outputs))
np.save(os.path.join(RESULTS_DIR, "spike_counts.npy"), np.array(spike_counts))
np.save(os.path.join(RESULTS_DIR, "membrane_potential.npy"), np.array(membrane_potentials))
np.save(os.path.join(RESULTS_DIR, "response_accuracy.npy"), np.array([accuracy]))

print("✅ Improved SNN Norse Controller completed successfully.")
print(f"📈 Response Accuracy: {accuracy:.4f}")
