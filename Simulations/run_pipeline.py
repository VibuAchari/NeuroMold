import os
import sys
import traceback
import numpy as np
import subprocess

# Define directory paths relative to this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
RESULTS_DIR = os.path.join(BASE_DIR, "results")
VIS_DIR = os.path.join(BASE_DIR, "visualizations")
CHARTS_DIR = os.path.join(VIS_DIR, "output_charts")

# Ensure result directories exist
os.makedirs(RESULTS_DIR, exist_ok=True)
os.makedirs(CHARTS_DIR, exist_ok=True)

# Define all submodules to run in sequence
PIPELINE_STAGES = [
    {"name": "Spike Encoder", "script": os.path.join(BASE_DIR, "encoding", "spike_encoder.py")},
    {"name": "SNN Norse Controller", "script": os.path.join(BASE_DIR, "model", "snn_norse_controller.py")},
    {"name": "Injection Molding Simulator", "script": os.path.join(BASE_DIR, "simulator", "injection_molding_simulator.py")},
    {"name": "Infographic Generator", "script": os.path.join(VIS_DIR, "generate_infographics.py")}
]

def run_script(script_path, stage_name):
    print(f"\n🔧 Running: {stage_name}")
    if not os.path.isfile(script_path):
        print(f"❌ Script not found: {script_path}")
        return False
    try:
        result = subprocess.run([sys.executable, script_path], check=True)
        print(f"✅ {stage_name} completed successfully.")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {stage_name} failed with exit code {e.returncode}")
        return False
    except Exception as e:
        print(f"❌ Exception during {stage_name}: {str(e)}")
        traceback.print_exc()
        return False

def run_pipeline():
    print("🚀 Starting NeuroMold Pipeline Execution...\n")

    for stage in PIPELINE_STAGES:
        success = run_script(stage["script"], stage["name"])
        if not success:
            print(f"\n🛑 Pipeline halted at stage: {stage['name']}")
            return

    print("\n🎉 All stages completed successfully. Infographics are saved in:")
    print(f"📂 {CHARTS_DIR}")

if __name__ == "__main__":
    run_pipeline()
