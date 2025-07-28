# injection_molding_simulator.py
import numpy as np
import os

RESULTS_DIR = os.path.join(os.path.dirname(__file__), "..", "results")

def simulate_process(control_signals: np.ndarray) -> dict:
    """
    Simulates the injection molding process using given control signals.
    Adds realistic noise and estimates energy consumption.
    """
    np.random.seed(42)
    cycles = control_signals.shape[0]

    # Simulated process outputs
    injection_pressure = control_signals + np.random.normal(0, 0.05, size=control_signals.shape)
    mold_temperature = 50 + 5 * np.tanh(control_signals) + np.random.normal(0, 0.5, size=control_signals.shape)
    fill_rate = 0.7 + 0.2 * np.sin(control_signals)
    
    # Energy calculations (mockup)
    heater_energy = np.abs(mold_temperature - 50) * 0.1
    pump_energy = np.abs(injection_pressure) * 0.05
    cooling_load = np.maximum(0, mold_temperature - 55) * 0.07
    total_cycle_energy = heater_energy + pump_energy + cooling_load

    return {
        "injection_pressure": injection_pressure,
        "mold_temperature": mold_temperature,
        "fill_rate": fill_rate,
        "heater_energy": heater_energy,
        "pump_energy": pump_energy,
        "cooling_load": cooling_load,
        "total_cycle_energy": total_cycle_energy
    }

def save_simulation_outputs(outputs: dict):
    for key, value in outputs.items():
        np.save(os.path.join(RESULTS_DIR, f"{key}.npy"), value)
    print("✅ Simulation outputs saved.")

if __name__ == "__main__":
    print("🔧 Running: Injection Molding Simulator")
    control_path = os.path.join(RESULTS_DIR, "control_outputs.npy")
    if not os.path.exists(control_path):
        raise FileNotFoundError(f"Missing control signal file: {control_path}")

    control_signals = np.load(control_path)
    outputs = simulate_process(control_signals)
    save_simulation_outputs(outputs)
