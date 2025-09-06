import os

# Define the folder structure
structure = {
    "src": {
        "main.jsx": "",
        "index.css": "",
        "components": {
            "Layout": {
                "Layout.jsx": "",
            },
            "Navbar": {
                "Navbar.jsx": "",
            },
            "FileUpload": {
                "FileUpload.jsx": "",
            },
            "AudioRecorder": {
                "AudioRecorder.jsx": "",
            },
            "TranscriptionResult": {
                "TranscriptionResult.jsx": "",
            },
            "HistoryItem": {
                "HistoryItem.jsx": "",
            },
            "LoadingSpinner": {
                "LoadingSpinner.jsx": "",
            },
        },
        "pages": {
            "Home": {
                "Home.jsx": "",
            },
            "History": {
                "History.jsx": "",
            },
        },
    }
}

def create_structure(base_path, struct):
    """Recursively create folders and files with a placeholder comment."""
    for name, content in struct.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):  # Folder
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        else:  # File
            with open(path, "w", encoding="utf-8") as f:
                f.write(f"// {name} placeholder\n")

# Generate the structure in the current directory
create_structure(".", structure)

print("✅ src/ folder structure created successfully!")
